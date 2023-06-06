import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';
import CONSTANTS from '@/app/constants';

export function GET(request) {
  let token = request.cookies.get('next-jwt')?.value;

  // The middleware will protect this API, ensuring a valid token exists
  const payload = jwt.decode(token);

  const email = payload.email;
  if (!email) {
    return NextResponse.json(
      {
        status: CONSTANTS.RESPONSE_STATUS.ERROR,
        data: 'Not authenticated',
      },
      { status: 401 }
    );
  }

  // connect db and get all users
  const filePath = path.join(process.cwd(), 'data', 'users.json');
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  // Check if user's email is valid
  const user = data.find((u) => u.email === email);
  if (!user) {
    return NextResponse.json(
      {
        status: CONSTANTS.RESPONSE_STATUS.ERROR,
        data: 'User not found',
      },
      { status: 401 }
    );
  }

  user.password = undefined;
  return NextResponse.json({
    status: CONSTANTS.RESPONSE_STATUS.OK,
    data: {
      user,
    },
  });
}
