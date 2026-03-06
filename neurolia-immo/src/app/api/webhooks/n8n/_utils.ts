import { NextResponse } from "next/server";
import { z } from "zod";

export const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
export const ISO_TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/;

export const nullableTrimmedString = z
  .union([z.string(), z.null(), z.undefined()])
  .transform((value) => {
    if (value === null || value === undefined) return null;
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
  });

export function authorizeWebhook(request: Request): NextResponse | null {
  const expectedApiKey = process.env.N8N_WEBHOOK_API_KEY;
  const providedApiKey = request.headers.get("x-api-key");

  if (!expectedApiKey) {
    return NextResponse.json(
      { error: "Server misconfigured: N8N_WEBHOOK_API_KEY missing" },
      { status: 500 }
    );
  }

  if (!providedApiKey || providedApiKey !== expectedApiKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}

export async function parseJsonBody<T>(
  request: Request,
  schema: z.ZodType<T>
): Promise<{ data: T } | { response: NextResponse }> {
  let rawBody: unknown;

  try {
    rawBody = await request.json();
  } catch {
    return {
      response: NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      ),
    };
  }

  const parsed = schema.safeParse(rawBody);
  if (!parsed.success) {
    return {
      response: NextResponse.json(
        {
          error: "Invalid payload",
          issues: parsed.error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 }
      ),
    };
  }

  return { data: parsed.data };
}
