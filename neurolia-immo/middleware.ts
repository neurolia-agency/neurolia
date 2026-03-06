import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const PUBLIC_PATHS = [
  "/login",
  "/register",
  "/register-staff",
  "/magic-link-sent",
  "/callback",
  "/livret",
];

const OWNER_PATHS = [
  "/dashboard",
  "/cleaning-status",
  "/reservations",
  "/anomalies",
  "/calendar",
  "/management",
];

const STAFF_PATHS = ["/planning", "/task", "/property-info", "/profile"];

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  );
}

function isApiPath(pathname: string): boolean {
  return pathname.startsWith("/api/");
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip API routes and static files
  if (isApiPath(pathname) || pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  const { user, supabaseResponse } = await updateSession(request);

  // Public paths: allow access
  if (isPublicPath(pathname)) {
    // If authenticated, redirect away from auth pages
    if (user && pathname !== "/livret" && !pathname.startsWith("/livret/")) {
      const role = (user.app_metadata?.role as string) || "owner";
      const redirectUrl =
        role === "cleaning_staff" ? "/planning" : "/dashboard";
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
    return supabaseResponse;
  }

  // Protected paths: require auth
  if (!user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const role = (user.app_metadata?.role as string) || "owner";

  // Role-based access control
  const isOwnerPath = OWNER_PATHS.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  );
  const isStaffPath = STAFF_PATHS.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  );

  if (role === "cleaning_staff" && isOwnerPath) {
    return NextResponse.redirect(new URL("/planning", request.url));
  }

  if (role === "owner" && isStaffPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|fonts/|icons/|manifest.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
