import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function SplashPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const role = (user.app_metadata?.role as string) || "owner";

  if (role === "cleaning_staff") {
    redirect("/planning");
  }

  redirect("/dashboard");
}
