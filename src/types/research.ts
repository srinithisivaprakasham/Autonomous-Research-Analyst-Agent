export type ResearchPhase = 'initializing' | 'searching' | 'analyzing' | 'synthesizing' | 'generating' | 'complete';

export interface ResearchSource {
  id: string;
  title: string;
  author: string;
  date: string;
  type: 'academic' | 'industry' | 'documentation';
  url: string;
  description: string;
  credibilityScore: number;
}

export interface ResearchReport {
  title: string;
  executiveSummary: string;
  keyFindings: string[];
  sections: {
    title: string;
    content: string;
  }[];
  recommendations: string[];
  conclusion: string;
}

export interface ResearchState {
  phase: ResearchPhase;
  progress: number;
  sources: ResearchSource[];
  report: ResearchReport | null;
  currentStep: string;
}
