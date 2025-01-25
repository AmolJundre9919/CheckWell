import { WebsiteGenerator, OpenAIService } from './generator';
import { websiteQueue, redis } from './queue';
import { GenerationProgress } from '@/types/generator';

const generator = new WebsiteGenerator(
  new OpenAIService(process.env.OPENAI_API_KEY!),
  defaultTheme
);

websiteQueue.process('generate-website', async (job) => {
  const { generationId, request } = job.data;

  const updateProgress = async (progress: number, step: string) => {
    const currentProgress = await redis.get(`progress:${generationId}`);
    if (currentProgress) {
      const updatedProgress: GenerationProgress = {
        ...JSON.parse(currentProgress as string),
        status: 'processing',
        progress,
        currentStep: step
      };
      await redis.set(`progress:${generationId}`, JSON.stringify(updatedProgress));
    }
  };

  try {
    await updateProgress(20, 'Generating content');
    const website = await generator.generateWebsite(request.businessDescription, {
      template: request.templateId ? await loadTemplate(request.templateId) : undefined,
      style: request.style,
      primaryColor: request.primaryColor
    });

    await updateProgress(50, 'Processing assets');
    await processAssets(website);

    await updateProgress(80, 'Building website');
    const { previewUrl, downloadUrl } = await buildAndDeploy(website);

    const finalProgress: GenerationProgress = {
      id: generationId,
      status: 'completed',
      progress: 100,
      currentStep: 'Generation completed',
      result: {
        previewUrl,
        downloadUrl
      }
    };

    await redis.set(`progress:${generationId}`, JSON.stringify(finalProgress));
  } catch (error) {
    const failedProgress: GenerationProgress = {
      id: generationId,
      status: 'failed',
      progress: 0,
      currentStep: 'Generation failed',
      error: error.message
    };
    await redis.set(`progress:${generationId}`, JSON.stringify(failedProgress));
    throw error;
  }
});