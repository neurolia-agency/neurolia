import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Database, TablesInsert } from "@/types/database";
import { authorizeWebhook, nullableTrimmedString, parseJsonBody } from "../_utils";

const IcalAnomalySchema = z
  .object({
    type: z.string().min(1),
    message: nullableTrimmedString.optional(),
    description: nullableTrimmedString.optional(),
    severity: nullableTrimmedString.optional(),
    reservation_a_id: z.string().uuid().nullable().optional(),
    reservation_b_id: z.string().uuid().nullable().optional(),
    db_reservation: z
      .object({
        id: z.string().uuid().optional(),
      })
      .passthrough()
      .optional(),
    ical_event: z.unknown().optional(),
  })
  .passthrough();

const IcalAlertWebhookSchema = z
  .object({
    property_id: z.string().uuid(),
    synced_at: z.string().datetime().nullable().optional(),
    anomalies: z.array(IcalAnomalySchema).optional(),
    type: z.string().optional(),
    description: z.string().optional(),
    severity: z.string().optional(),
    reservation_a_id: z.string().uuid().nullable().optional(),
    reservation_b_id: z.string().uuid().nullable().optional(),
  })
  .superRefine((value, ctx) => {
    const hasArray = Array.isArray(value.anomalies) && value.anomalies.length > 0;
    const hasSingle = Boolean(value.type);
    if (!hasArray && !hasSingle) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["anomalies"],
        message: "Provide either anomalies[] or type/description payload",
      });
    }
  });

type IcalAlertWebhookPayload = z.infer<typeof IcalAlertWebhookSchema>;
type NormalizedAnomaly = z.infer<typeof IcalAnomalySchema>;

function normalizeAnomalies(payload: IcalAlertWebhookPayload): NormalizedAnomaly[] {
  if (payload.anomalies && payload.anomalies.length > 0) {
    return payload.anomalies;
  }

  return [
    {
      type: payload.type ?? "sync_failure",
      description: payload.description ?? "Anomalie iCal detectee",
      severity: payload.severity ?? null,
      reservation_a_id: payload.reservation_a_id ?? null,
      reservation_b_id: payload.reservation_b_id ?? null,
    },
  ];
}

function mapAnomalyType(
  rawType: string
): Database["public"]["Enums"]["anomaly_type"] {
  switch (rawType) {
    case "double_reservation":
      return "double_reservation";
    case "missing_reservation":
    case "missing_ical_block":
      return "missing_reservation";
    case "date_mismatch":
      return "date_mismatch";
    case "sync_failure":
    case "fetch_error":
    default:
      return "sync_failure";
  }
}

function buildAnomalyDescription(anomaly: NormalizedAnomaly): string {
  const primaryText =
    anomaly.message ??
    anomaly.description ??
    "Anomalie detectee pendant la synchronisation iCal";

  if (anomaly.severity) {
    return `[${anomaly.severity}] ${primaryText}`;
  }

  return primaryText;
}

export async function POST(request: Request) {
  const authError = authorizeWebhook(request);
  if (authError) return authError;

  const parsedBody = await parseJsonBody(request, IcalAlertWebhookSchema);
  if ("response" in parsedBody) return parsedBody.response;

  const payload = parsedBody.data;
  const anomalies = normalizeAnomalies(payload);

  if (anomalies.length === 0) {
    return NextResponse.json({ success: true, anomalies_logged: 0 });
  }

  const supabase = createAdminClient();
  const { data: property, error: propertyError } = await supabase
    .from("properties")
    .select("owner_id,name")
    .eq("id", payload.property_id)
    .maybeSingle();

  if (propertyError || !property?.owner_id) {
    return NextResponse.json(
      {
        error: "Property not found or owner_id missing",
        details: propertyError?.message,
      },
      { status: 400 }
    );
  }

  const anomalyRows: TablesInsert<"anomalies">[] = anomalies.map((anomaly) => ({
    property_id: payload.property_id,
    owner_id: property.owner_id,
    type: mapAnomalyType(anomaly.type),
    reservation_a_id: anomaly.reservation_a_id ?? anomaly.db_reservation?.id ?? null,
    reservation_b_id: anomaly.reservation_b_id ?? null,
    description: buildAnomalyDescription(anomaly),
    status: "pending",
  }));

  const { data: insertedAnomalies, error: insertError } = await supabase
    .from("anomalies")
    .insert(anomalyRows)
    .select("id,type");

  if (insertError) {
    return NextResponse.json(
      { error: "Failed to insert anomalies", details: insertError.message },
      { status: 500 }
    );
  }

  const anomalyCount = insertedAnomalies?.length ?? 0;
  const distinctTypes = Array.from(
    new Set((insertedAnomalies ?? []).map((row) => row.type))
  );

  const notificationBody =
    anomalyCount === 1
      ? `1 anomalie iCal detectee pour ${property.name}.`
      : `${anomalyCount} anomalies iCal detectees pour ${property.name}.`;

  const { error: notificationError } = await supabase.from("notifications").insert({
    user_id: property.owner_id,
    type: "anomaly",
    title: "Alerte synchronisation iCal",
    body: notificationBody,
    data: {
      property_id: payload.property_id,
      synced_at: payload.synced_at ?? null,
      anomalies_count: anomalyCount,
      anomaly_types: distinctTypes,
      anomaly_ids: (insertedAnomalies ?? []).map((row) => row.id),
    },
  });

  if (notificationError) {
    console.error("Failed to create iCal alert notification", notificationError);
  }

  return NextResponse.json({
    success: true,
    anomalies_logged: anomalyCount,
    notification_sent: !notificationError,
  });
}
