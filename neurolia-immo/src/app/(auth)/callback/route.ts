import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const redirect = searchParams.get("redirect") || "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const role = (user?.app_metadata?.role as string) || "owner";
      const defaultRedirect =
        role === "cleaning_staff" ? "/planning" : "/dashboard";
      const finalRedirect = redirect === "/" ? defaultRedirect : redirect;
      return NextResponse.redirect(new URL(finalRedirect, origin));
    }
  }

  // Auth error — redirect to login
  return NextResponse.redirect(new URL("/login?error=auth", origin));
}
