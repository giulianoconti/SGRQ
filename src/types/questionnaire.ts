export interface QuestionOption {
  value: number;
  label: string;
}

export interface Question {
  id: number;
  titles?: string[];
  question: string;
  options: QuestionOption[];
}

export interface Section {
  id: number;
  title: string;
  questions: Question[];
}
