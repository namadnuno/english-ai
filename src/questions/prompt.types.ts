import { VERBS } from './prompt.const';
export type Verbs = typeof VERBS[keyof typeof VERBS];
export type Level = 1 | 2 | 3 | 4 | 5;
export type OptionNumbers = 4 | 5;
export type Question = {
  question: string,
  options: string[],
  correctAnswerIndex: number
}