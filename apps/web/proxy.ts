import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const PUBLIC_PATHS = ["/login", "/register", "/forgot-password"]

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.some((p) => pathname.startsWith(p))
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get("taskflow-token")?.value

  if (!token && !isPublicPath(pathname)) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("from", pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (token && isPublicPath(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|ico|webp)$).*)"],
}
