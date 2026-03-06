import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import type {
  TablesInsert,
  TablesUpdate,
  Database,
  Json,
} from "@/types/database";
import {
  authorizeWebhook,
  ISO_DATE_REGEX,
  ISO_TIME_REGEX,
  nullableTrimmedString,
  parseJsonBody,
} from "../_utils";

const nullableEmail = z
  .union([z.string().email(), z.string().length(0), z.null(), z.undefined()])
  .transform((value) => {
    if (value === null || value === undefined) return null;
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
  });

const nullableNumber = z.preprocess(
  (value) => {
    if (value === null || value === undefined || value === "") return null;
    const asNumber = Number(value);
    return Number.isFinite(asNumber) ? asNumber : value;
  },
  z.number().nonnegative().nullable()
);

const ReservationWebhookSchema = z
  .object({
    property_id: z.string().uuid(),
    owner_id: z.string().uuid().nullable().optional(),
    platform: z.enum(["airbnb", "booking", "manual"]),
    platform_ref_id: nullableTrimmedString.optional(),
    status: z
      .enum(["pending", "confirmed", "modified", "cancelled"])
      .default("confirmed"),
    source: z.enum(["ical", "email", "manual"]).default("manual"),
    guest_name: nullableTrimmedString.optional(),
    guest_email: nullableEmail.optional(),
    nb_guests: z.coerce.number().int().min(1).max(50).default(1),
    check_in: z.string().regex(ISO_DATE_REGEX, "Expected YYYY-MM-DD"),
    check_out: z.string().regex(ISO_DATE_REGEX, "Expected YYYY-MM-DD"),
    check_in_time: z
      .union([z.string().regex(ISO_TIME_REGEX), z.null(), z.undefined()])
      .transform((value) => value ?? null),
    check_out_time: z
      .union([z.string().regex(ISO_TIME_REGEX), z.null(), z.undefined()])
      .transform((value) => value ?? null),
    arrival_time: z
      .union([z.string().regex(ISO_TIME_REGEX), z.null(), z.undefined()])
      .transform((value) => value ?? null),
    guest_message: nullableTrimmedString.optional(),
    special_requests: nullableTrimmedString.optional(),
    amount: nullableNumber.optional(),
    ical_uid: nullableTrimmedString.optional(),
    email_message_id: nullableTrimmedString.optional(),
    raw_ical_data: z.unknown().nullable().optional().default(null),
    raw_email_data: z.unknown().nullable().optional().default(null),
  })
  .superRefine((value, ctx) => {
    if (value.check_out < value.check_in) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["check_out"],
        message: "check_out must be on or after check_in",
      });
    }
  });

type ReservationWebhookPayload = z.infer<typeof ReservationWebhookSchema>;
type ReservationRow = Database["public"]["Tables"]["reservations"]["Row"];

async function resolveOwnerId(
  payload: ReservationWebhookPayload
): Promise<{ ownerId: string | null; error: string | null }> {
  if (payload.owner_id) {
    return { ownerId: payload.owner_id, error: null };
  }

  const supabase = createAdminClient();
  const { data: property, error } = await supabase
    .from("properties")
    .select("owner_id")
    .eq("id", payload.property_id)
    .maybeSingle();

  if (error) {
    return { ownerId: null, error: error.message };
  }

  if (!property?.owner_id) {
    return { ownerId: null, error: "Property owner not found" };
  }

  return { ownerId: property.owner_id, error: null };
}

async function findExistingReservation(
  payload: ReservationWebhookPayload
): Promise<ReservationRow | null> {
  const supabase = createAdminClient();

  if (payload.platform_ref_id) {
    const { data } = await supabase
      .from("reservations")
      .select("*")
      .eq("property_id", payload.property_id)
      .eq("platform", payload.platform)
      .eq("platform_ref_id", payload.platform_ref_id)
      .maybeSingle();
    if (data) return data;
  }

  if (payload.ical_uid) {
    const { data } = await supabase
      .from("reservations")
      .select("*")
      .eq("property_id", payload.property_id)
      .eq("ical_uid", payload.ical_uid)
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (data) return data;
  }

  if (payload.email_message_id) {
    const { data } = await supabase
      .from("reservations")
      .select("*")
      .eq("property_id", payload.property_id)
      .eq("email_message_id", payload.email_message_id)
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (data) return data;
  }

  const fallbackQuery = supabase
    .from("reservations")
    .select("*")
    .eq("property_id", payload.property_id)
    .eq("platform", payload.platform)
    .eq("check_in", payload.check_in)
    .eq("check_out", payload.check_out)
    .order("updated_at", { ascending: false })
    .limit(1);

  if (payload.guest_name) {
    fallbackQuery.eq("guest_name", payload.guest_name);
  }

  const { data } = await fallbackQuery.maybeSingle();
  return data ?? null;
}

function buildReservationMutation(
  payload: ReservationWebhookPayload,
  ownerId: string,
  existingReservation: ReservationRow | null
): TablesInsert<"reservations"> | TablesUpdate<"reservations"> {
  const rawIcalData = (payload.raw_ical_data ?? null) as Json | null;
  const rawEmailData = (payload.raw_email_data ?? null) as Json | null;

  const mutation: TablesInsert<"reservations"> | TablesUpdate<"reservations"> = {
    property_id: payload.property_id,
    owner_id: ownerId,
    platform: payload.platform,
    platform_ref_id: payload.platform_ref_id ?? null,
    status: payload.status,
    source: payload.source,
    guest_name: payload.guest_name ?? null,
    guest_email: payload.guest_email ?? null,
    nb_guests: payload.nb_guests,
    check_in: payload.check_in,
    check_out: payload.check_out,
    check_in_time: payload.check_in_time ?? null,
    check_out_time: payload.check_out_time ?? null,
    arrival_time: payload.arrival_time ?? null,
    guest_message: payload.guest_message ?? null,
    special_requests: payload.special_requests ?? null,
    amount: payload.amount ?? null,
    ical_uid: payload.ical_uid ?? null,
    email_message_id: payload.email_message_id ?? null,
    raw_ical_data: rawIcalData,
    raw_email_data: rawEmailData,
  };

  if (
    existingReservation &&
    existingReservation.source !== payload.source &&
    payload.status !== "cancelled"
  ) {
    mutation.reconciliation_status = "matched";
  }

  return mutation;
}

async function createReservationNotification(params: {
  ownerId: string;
  reservation: ReservationRow;
  action: "created" | "updated";
  status: ReservationWebhookPayload["status"];
  idempotencyKey: string | null;
}) {
  const supabase = createAdminClient();
  const isCancellation = params.status === "cancelled";
  const notificationType: Database["public"]["Enums"]["notification_type"] =
    isCancellation ? "cancellation" : "new_reservation";

  const title = isCancellation
    ? "Reservation annulee"
    : params.action === "created"
      ? "Nouvelle reservation"
      : "Reservation mise a jour";

  const body = isCancellation
    ? `Reservation ${params.reservation.platform.toUpperCase()} annulee du ${params.reservation.check_in} au ${params.reservation.check_out}.`
    : `Reservation ${params.reservation.platform.toUpperCase()} du ${params.reservation.check_in} au ${params.reservation.check_out}.`;

  const { error } = await supabase.from("notifications").insert({
    user_id: params.ownerId,
    type: notificationType,
    title,
    body,
    data: {
      reservation_id: params.reservation.id,
      property_id: params.reservation.property_id,
      platform: params.reservation.platform,
      status: params.reservation.status,
      action: params.action,
      idempotency_key: params.idempotencyKey,
    },
  });

  return { sent: !error, error };
}

export async function POST(request: Request) {
  const authError = authorizeWebhook(request);
  if (authError) return authError;

  const parsedBody = await parseJsonBody(request, ReservationWebhookSchema);
  if ("response" in parsedBody) return parsedBody.response;

  const payload = parsedBody.data;
  const idempotencyKey = request.headers.get("x-idempotency-key");

  const { ownerId, error: ownerResolutionError } = await resolveOwnerId(payload);
  if (!ownerId) {
    return NextResponse.json(
      { error: ownerResolutionError ?? "Unable to resolve owner_id" },
      { status: 400 }
    );
  }

  const existingReservation = await findExistingReservation(payload);
  const mutation = buildReservationMutation(payload, ownerId, existingReservation);
  const supabase = createAdminClient();

  let reservationResult: ReservationRow | null = null;
  let action: "created" | "updated" = "created";

  if (existingReservation) {
    action = "updated";
    const { data, error } = await supabase
      .from("reservations")
      .update(mutation)
      .eq("id", existingReservation.id)
      .select("*")
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Failed to update reservation", details: error.message },
        { status: 500 }
      );
    }
    reservationResult = data;
  } else {
    const { data, error } = await supabase
      .from("reservations")
      .insert(mutation as TablesInsert<"reservations">)
      .select("*")
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Failed to insert reservation", details: error.message },
        { status: 500 }
      );
    }
    reservationResult = data;
  }

  const notification = await createReservationNotification({
    ownerId,
    reservation: reservationResult,
    action,
    status: payload.status,
    idempotencyKey,
  });

  if (notification.error) {
    console.error("Failed to create reservation notification", notification.error);
  }

  return NextResponse.json({
    action,
    reservation: reservationResult,
    notification_sent: notification.sent,
    idempotency_key: idempotencyKey,
  });
}
