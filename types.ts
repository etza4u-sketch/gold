
export interface Section {
  id: string;
  title: string;
  content: string;
}

export interface GameStep {
  id: number;
  type: 'question' | 'outcome';
  text: string;
  options?: { text: string; nextStep: number; feedback?: string; }[];
  isGoodEnding?: boolean;
}
