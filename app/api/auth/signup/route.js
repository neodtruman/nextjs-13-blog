import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import path from 'path';
import fs from 'fs';
import * as jose from 'jose';
import { hashPassword } from '@/utils/password-util';
import CONSTANTS from '@/app/constants';

export async function POST(req, res) {
  const requestBody = await req.json();
  const { email, password, name } = requestBody;

  if (!email || !email.includes('@') || !password || password.trim().length < 8) {
    return NextResponse.json(
      {
        status: CONSTANTS.RESPONSE_STATUS.ERROR,
        data: 'Invalid email or password! Minimum password length is 8',
      },
      { status: 422 }
    );
  }

  // connect db and get all users
  const filePath = path.join(process.cwd(), 'data', 'users.json');
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  // Check if user existed
  const user = data.find((u) => u.email === email);
  if (user) {
    return NextResponse.json(
      {
        status: CONSTANTS.RESPONSE_STATUS.ERROR,
        data: 'User existed!',
      },
      { status: 422 }
    );
  }

  // Store new user in the database
  const hashedPassword = await hashPassword(password);
  data.push({ email, password: hashedPassword, name });
  fs.writeFileSync(filePath, JSON.stringify(data));

  // Create JWT
  const alg = 'HS256';
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new jose.SignJWT({ email }).setProtectedHeader({ alg }).setExpirationTime('48h').sign(secret);

  // Store the JWT in cookies
  cookies().set('next-jwt', token, {
    maxAge: 60 * 60 * 24 * 2, // 2 days
  });

  return NextResponse.json(
    {
      status: CONSTANTS.RESPONSE_STATUS.OK,
      data: 'Created user successfully',
    },
    { status: 201 }
  );
}
