import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const cookies = request.cookies
  const accessToken = cookies.get("accessToken");


  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/products/:path*']
}