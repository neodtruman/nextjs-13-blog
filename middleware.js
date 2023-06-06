import { NextResponse } from 'next/server';
import * as jose from 'jose';
import CONSTANTS from '@/app/constants';

export async function middleware(request, res) {
  const token = request.cookies.get('next-jwt')?.value;

  if (request.nextUrl.pathname.startsWith('/api')) {
    // API guard
    if (!token) {
      return NextResponse.json({ errorMessage: 'Not authenticated' }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    try {
      const result = await jose.jwtVerify(token, secret);

      if (request.nextUrl.pathname.startsWith('/api/admin') && result.payload.role !== CONSTANTS.USER_ROLE.ADMIN) {
        return NextResponse.json({ status: CONSTANTS.RESPONSE_STATUS.ERROR, data: 'Forbidden' }, { status: 403 });
      }
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
      if (request.nextUrl.pathname.startsWith('/admin') && result.payload.role !== CONSTANTS.USER_ROLE.ADMIN) {
        return NextResponse.redirect(request.nextUrl.origin + '/403');
      }
    } catch (error) {
      return NextResponse.redirect(url);
    }
  }
}

export const config = {
  matcher: ['/admin/:path*', '/user/:path*', '/api/admin/:path*', '/api/user/:path*'],
};
