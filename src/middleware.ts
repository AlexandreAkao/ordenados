import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get("user_token");
  const userName = request.cookies.get("user_name");

  if (!userName) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const res = NextResponse.next();
  if (!isAuthenticated) {
    res.cookies.set("user_token", uuidv4(), { path: "/", httpOnly: true });
  }

  return res;
}

export const config = {
  matcher: ["/room/:roomId"],
};
