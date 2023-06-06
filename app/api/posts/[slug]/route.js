import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import CONSTANTS from '@/app/constants';

export function GET(request, { params }) {
  const slug = params.slug;

  const filePath = path.join(process.cwd(), 'data', 'posts.json');
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  const post = data.find((p) => p.slug === slug);

  return NextResponse.json({
    status: CONSTANTS.RESPONSE_STATUS.OK,
    data: {
      post,
    },
  });
}
