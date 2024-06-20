import { db, ResponseWrapper } from '@/lib';
import { IExampleData } from '@/types';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

// GET 请求 /api/example
export async function GET() {
  const res = (await db.prepare('SELECT * FROM Example').all()).results;

  // 错误返回
  // return NextResponse.json(ResponseWrapper.fail('client error'));

  // 正常返回
  return NextResponse.json(ResponseWrapper.success<IExampleData>(res as IExampleData));
}

// POST 请求 /api/example
export async function POST() {
  return NextResponse.json({ message: 'post example' });
}
