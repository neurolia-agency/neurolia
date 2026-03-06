import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Database } from "@/types/database";
import {
  authorizeWebhook,
  ISO_DATE_REGEX,
  nullableTrimmedString,
  parseJsonBody,
} from "../_utils";

const TaskCreatedWebhookSchema = z.object({
  reservation_id: z.string().uuid(),
  property_id: z.string().uuid().optional(),
  guest_name: nullableTrimmedString.optional(),
  tasks_created: z
    .array(
      z.object({
        id: z.string().uuid(),
        type: z.enum([
          "checkin_prep",
          "checkout_clean",
          "check_in_greeting",
          "ad_hoc",
        ]),
        date: z.string().regex(ISO_DATE_REGEX, "Expected YYYY-MM-DD"),
      })
    )
    .default([]),
  assignments: z
    .array(
      z.object({
        task_id: z.string().uuid(),
        task_type: z.string(),
        task_date: z.string().regex(ISO_DATE_REGEX).optional(),
        staff_id: z.string().uuid(),
        staff_name: nullableTrimmedString.optional(),
        staff_email: z
          .union([z.string().email(), z.string().length(0), z.null(), z.undefined()])
          .transform((value) => {
            if (value === null || value === undefined) return null;
            const trimmed = value.trim();
            return trimmed.length > 0 ? trimmed : null;
          })
          .optional(),
      })
    )
    .default([]),
  no_staff_available: z.boolean().default(false),
});

type TaskCreatedWebhookPayload = z.infer<typeof TaskCreatedWebhookSchema>;

async function resolveOwnerContext(payload: TaskCreatedWebhookPayload) {
  const supabase = createAdminClient();

  const { data: reservation } = await supabase
    .from("reservations")
    .select("id,owner_id,property_id,guest_name")
    .eq("id", payload.reservation_id)
    .maybeSingle();

  if (reservation?.owner_id) {
    return {
      ownerId: reservation.owner_id,
      propertyId: reservation.property_id,
      guestName: reservation.guest_name,
    };
  }

  const firstTaskId = payload.tasks_created[0]?.id;
  if (!firstTaskId) {
    return { ownerId: null, propertyId: null, guestName: null };
  }

  const { data: firstTask } = await supabase
    .from("cleaning_tasks")
    .select("owner_id,property_id")
    .eq("id", firstTaskId)
    .maybeSingle();

  return {
    ownerId: firstTask?.owner_id ?? null,
    propertyId: firstTask?.property_id ?? payload.property_id ?? null,
    guestName: payload.guest_name ?? null,
  };
}

async function syncAssignments(payload: TaskCreatedWebhookPayload) {
  const supabase = createAdminClient();

  if (payload.assignments.length === 0) {
    return { updated: 0, failed: 0 };
  }

  let updated = 0;
  let failed = 0;

  for (const assignment of payload.assignments) {
    const { error } = await supabase
      .from("cleaning_tasks")
      .update({ assigned_to: assignment.staff_id })
      .eq("id", assignment.task_id);

    if (error) {
      failed += 1;
      continue;
    }
    updated += 1;
  }

  return { updated, failed };
}

async function createTaskNotification(params: {
  ownerId: string;
  reservationId: string;
  propertyId: string | null;
  guestName: string | null;
  tasksCount: number;
  assignmentsCount: number;
  noStaffAvailable: boolean;
}) {
  const supabase = createAdminClient();

  const title = params.noStaffAvailable
    ? "Taches creees sans assignation"
    : "Nouvelles taches assignees";

  const body = params.noStaffAvailable
    ? `${params.tasksCount} tache(s) creee(s) pour la reservation ${params.reservationId}, mais aucun staff actif n'est disponible.`
    : `${params.assignmentsCount} tache(s) assignee(s) pour la reservation ${params.reservationId}.`;

  const payloadData = {
    reservation_id: params.reservationId,
    property_id: params.propertyId,
    guest_name: params.guestName,
    tasks_count: params.tasksCount,
    assignments_count: params.assignmentsCount,
    no_staff_available: params.noStaffAvailable,
  };

  const { error } = await supabase.from("notifications").insert({
    user_id: params.ownerId,
    type: "task_assigned" satisfies Database["public"]["Enums"]["notification_type"],
    title,
    body,
    data: payloadData,
  });

  return { sent: !error, error };
}

export async function POST(request: Request) {
  const authError = authorizeWebhook(request);
  if (authError) return authError;

  const parsedBody = await parseJsonBody(request, TaskCreatedWebhookSchema);
  if ("response" in parsedBody) return parsedBody.response;

  const payload = parsedBody.data;
  const { ownerId, propertyId, guestName } = await resolveOwnerContext(payload);

  if (!ownerId) {
    return NextResponse.json(
      {
        error:
          "Unable to resolve owner for task-created webhook (reservation/tasks not found)",
      },
      { status: 400 }
    );
  }

  const assignmentSync = await syncAssignments(payload);
  const notification = await createTaskNotification({
    ownerId,
    reservationId: payload.reservation_id,
    propertyId,
    guestName,
    tasksCount: payload.tasks_created.length,
    assignmentsCount: payload.assignments.length,
    noStaffAvailable: payload.no_staff_available,
  });

  if (notification.error) {
    console.error("Failed to create task-created notification", notification.error);
  }

  return NextResponse.json({
    success: true,
    reservation_id: payload.reservation_id,
    tasks_created: payload.tasks_created.length,
    assignments_received: payload.assignments.length,
    assignments_synced: assignmentSync.updated,
    assignments_failed: assignmentSync.failed,
    notification_sent: notification.sent,
  });
}
