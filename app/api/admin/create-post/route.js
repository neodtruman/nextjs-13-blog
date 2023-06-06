import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { writeFile } from 'fs/promises';
import CONSTANTS from '@/app/constants';

async function saveFile(file, folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  // Read the content of the temporary file
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Write the file in a specific folder
  const filePath = path.join(folderPath, file.name);
  await writeFile(filePath, buffer);
}

export async function POST(request) {
  const data = await request.formData();

  const slug = data.get('slug');
  const title = data.get('title');
  const thumb = data.get('thumb');
  const excerpt = data.get('excerpt');
  const content = data.get('content');
  const isFeatured = data.get('isFeatured') === 'on' ? 'true' : 'false';

  const files = data.getAll('file');
  if (files?.length) {
    const folderPath = path.join(process.cwd(), 'public', 'images', 'posts', slug);
    for (const file of files) {
      await saveFile(file, folderPath);
    }
  }

  const fileName = slug + '.md';
  const filePath = path.join(process.cwd(), 'data', 'posts', fileName);

  const writer = fs.createWriteStream(filePath);

  const writeLine = (line) => writer.write(`\n${line}`);

  writer.write('---');
  writeLine(`title: ${title}`);
  writeLine(`image: ${thumb}`);
  writeLine(`excerpt: ${excerpt}`);
  const createdDate = new Date().toLocaleString();
  writeLine(`date: "${createdDate}"`);
  writeLine(`isFeatured: ${isFeatured}`);
  writeLine('---');
  writeLine(content);
  writer.end(); // close stream

  return NextResponse.json({
    status: CONSTANTS.RESPONSE_STATUS.OK,
    data: 'Post was created successfully.',
  });
}
