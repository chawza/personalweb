import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname == '/blog/article/upload') {
    const token = req.nextUrl.searchParams.get('token');

    // TODO: try to verify token. Right now middleware cannot use native NodeJS module.
    // if (!token || verifyToken(token)) {
    if (!token) {
      const redirecturl = `${req.nextUrl.origin}/auth/login`;
      return NextResponse.redirect(redirecturl);
    }
    //TODO: remote param token from url in /upload
  }
}