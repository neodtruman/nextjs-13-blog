import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import CONSTANTS from '@/app/constants';

export async function POST(request) {
  const requestBody = await request.json();

  const createdDate = new Date().toLocaleString();

  const newPost = {
    ...requestBody,
    date: createdDate,
  };

  const filePath = path.join(process.cwd(), 'data', 'posts.json');
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  data.push(newPost);
  fs.writeFileSync(filePath, JSON.stringify(data));

  return NextResponse.json({
    status: CONSTANTS.RESPONSE_STATUS.OK,
    data: {
      post: newPost,
    },
  });
}
