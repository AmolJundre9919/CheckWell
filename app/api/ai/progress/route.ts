import { NextResponse } from 'next/server';
import { redis } from '@/app/api/ai/queue';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const progress = await redis.get(`progress:${params.id}`);
  
  if (!progress) {
    return NextResponse.json(
      { error: 'Generation ID not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(progress);
}
