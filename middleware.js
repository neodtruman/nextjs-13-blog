import { NextResponse } from 'next/server';
import * as jose from 'jose';

export async function middleware(request) {
  const token = request.cookies.get('next-jwt')?.value;

  if (request.nextUrl.pathname.startsWith('/api')) {
    // API guard
    if (!token) {
      return NextResponse.json({ errorMessage: 'Not authenticated' }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    try {
      const result = await jose.jwtVerify(token, secret);
    } catch (error) {
      return NextResponse.json({ errorMessage: 'Not authenticated' }, { status: 401 });
    }
  } else {
    // Page guard
    const url = request.nextUrl.origin + '/login?callbackUrl=' + encodeURIComponent(request.nextUrl.pathname);
    if (!token) {
      return NextResponse.redirect(url);
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    try {
      const result = await jose.jwtVerify(token, secret);
    } catch (error) {
      return NextResponse.redirect(url);
    }
  }
}

export const config = {
  matcher: ['/admin/:path*', '/user/:path*', '/api/admin/:path*', '/api/user/:path*'],
};
