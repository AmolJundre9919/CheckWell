import { NextResponse } from 'next/server';
import { websiteQueue, redis } from '@/app/api/ai/queue';
import { WebsiteRequest, GenerationProgress } from '@/app/api/ai/types';

export async function POST(request: Request) {
  const data: WebsiteRequest = await request.json();
  const generationId = crypto.randomUUID();

  // Initialize progress in Redis
  const initialProgress: GenerationProgress = {
    id: generationId,
    status: 'queued',
    progress: 0,
    currentStep: 'Queued for generation'
  };

  await redis.set(`progress:${generationId}`, JSON.stringify(initialProgress));

  // Add to queue
  await websiteQueue.add('generate-website', {
    generationId,
    request: data
  });

  return NextResponse.json({ generationId });
}