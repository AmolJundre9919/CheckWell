export interface WebsiteRequest {
    businessName: string;
    businessDescription: string;
    industry: string;
    style: 'modern' | 'classic' | 'minimal' | 'bold';
    primaryColor?: string;
    features: string[];
    pages: string[];
    templateId?: string;
  }
  
  export interface GenerationProgress {
    id: string;
    status: 'queued' | 'processing' | 'completed' | 'failed';
    progress: number;
    currentStep: string;
    error?: string;
    result?: {
      previewUrl: string;
      downloadUrl: string;
    };
  }