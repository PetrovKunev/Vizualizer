export interface AlgorithmStep {
  type: 'compare' | 'swap' | 'set' | 'highlight' | 'complete' | 'remove';
  indices: number[];
  values?: number[];
  description: string;
}

export interface AlgorithmInfo {
  id: string;
  name: string;
  category: 'sorting' | 'searching' | 'graph' | 'tree' | 'data-structure';
  description: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  stable?: boolean;
  inPlace?: boolean;
}

export interface VisualizationState {
  data: number[];
  currentStep: number;
  steps: AlgorithmStep[];
  isPlaying: boolean;
  speed: number;
}

export interface AlgorithmImplementation {
  info: AlgorithmInfo;
  generateSteps: (data: number[]) => AlgorithmStep[];
  code: Record<string, string>; // Maps language keys to code strings
}