export interface FruitAnalysis {
  fruitType: string;
  ripenessPercentage: number;
  ripenessStage: 'Unripe' | 'Ripe' | 'Overripe';
  qualityGrade: 'A' | 'B' | 'C';
  defects: string[];
  sugarContentLevel: 'Low' | 'Medium' | 'High';
  estimatedShelfLife: string;
  nutritionalHighlights: string[];
  colorScore: number; // 0-100
  textureScore: number; // 0-100
  shapeScore: number; // 0-100
  recommendation: string;
}

export interface AnalysisState {
  isLoading: boolean;
  data: FruitAnalysis | null;
  error: string | null;
}
