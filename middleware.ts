import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  console.log("[Middleware] Processing request for:", request.nextUrl.pathname);

  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          const cookie = request.cookies.get(name);
          console.log(
            `[Middleware] Getting cookie ${name}:`,
            cookie?.value ? "exists" : "not found"
          );
          return cookie?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          console.log(`[Middleware] Setting cookie ${name}`);
          response.cookies.set({
            name,
            value,
            ...options,
            path: "/",
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 1 week
          });
        },
        remove(name: string, options: CookieOptions) {
          console.log(`[Middleware] Removing cookie ${name}`);
          response.cookies.set({
            name,
            value: "",
            ...options,
            path: "/",
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 0,
          });
        },
      },
    }
  );

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  console.log("[Middleware] Session check:", {
    hasSession: !!session,
    path: request.nextUrl.pathname,
    error: sessionError,
    cookies: request.cookies.getAll().map((c) => c.name),
  });

  // If user is not signed in and trying to access a protected route
  if (!session && !request.nextUrl.pathname.startsWith("/auth/")) {
    console.log(
      "[Middleware] Unauthenticated user trying to access protected route"
    );
    const redirectUrl = new URL("/auth/login", request.url);
    redirectUrl.searchParams.set("redirectedFrom", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // If user is signed in and trying to access auth routes
  if (session && request.nextUrl.pathname.startsWith("/auth/")) {
    console.log("[Middleware] Authenticated user trying to access auth route");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  console.log("[Middleware] Request allowed to proceed");
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
