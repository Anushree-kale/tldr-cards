import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const token = req.cookies.get("firebaseAuthToken")?.value
  const { pathname } = req.nextUrl

  // Redirect to login if not authenticated and trying to access protected routes
  if (!token && (pathname.startsWith("/dashboard") || pathname.startsWith("/profile"))) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // Redirect to dashboard if authenticated and trying to access login
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/login"],
}
