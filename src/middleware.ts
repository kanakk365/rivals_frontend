import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that don't require authentication
const publicRoutes = ["/", "/login", "/signup"];

// Routes that definitely require authentication
const protectedRoutePrefixes = ["/dashboard"];

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Check if this is an SSO login attempt (has token query param)
  const hasSsoToken = searchParams.has("token");

  const isPublicRoute = publicRoutes.some(
    (r) => pathname === r || pathname.startsWith(r + "/"),
  );
  const isProtectedRoute = protectedRoutePrefixes.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );

  // Read auth state from cookie (set by Zustand custom storage)
  const authStorage = request.cookies.get("auth-storage");
  let isAuthenticated = false;

  if (authStorage?.value) {
    try {
      const parsed = JSON.parse(decodeURIComponent(authStorage.value));
      isAuthenticated = parsed?.state?.isAuthenticated === true;
    } catch {
      isAuthenticated = false;
    }
  }

  // Redirect unauthenticated users trying to access protected routes
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // IMPORTANT: Allow SSO tokens through even if already authenticated
  // (so re-authentication from external portal works)
  if (
    isPublicRoute &&
    isAuthenticated &&
    pathname === "/login" &&
    !hasSsoToken
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
