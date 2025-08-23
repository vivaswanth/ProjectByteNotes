// app/api/folder-cards/route.ts

import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const folder = searchParams.get('folder');
  if (!folder) return NextResponse.json([], { status: 400 });

  const folderPath = path.join(process.cwd(), 'content/docs', folder);
  if (!fs.existsSync(folderPath)) return NextResponse.json([], { status: 404 });

  const files = fs.readdirSync(folderPath).filter((file) =>
    file.endsWith('.mdx') && file !== 'index.mdx'
  );

  const items = files.map((file) => {
    const fileContent = fs.readFileSync(path.join(folderPath, file), 'utf-8');
    const { data } = matter(fileContent);
    return {
      slug: file.replace(/\.mdx$/, ''),
      title: data.title || file.replace(/\.mdx$/, ''),
      description: data.description || '',
    };
  });

  return NextResponse.json(items);
}
