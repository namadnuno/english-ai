import { Level, OptionNumbers, Verbs } from "./prompt.types";



export const generatePrompt = (verb: Verbs, level: Level, numberOfOptions: OptionNumbers) => {

  const exercise = {
    question: `question`,
    options: ['option x', 'option x', 'option x', 'option x'],
    correctAnswerIndex: 'x'
  };
  
  const responseFormat = JSON.stringify(exercise);
  
  const prompt = `Exercise for people learning English
  Type of exercise: Fill in the blank with the correct verb conjugation
  Options: ${numberOfOptions}
  verb tenses: ${verb}
  difficulty(1-5): ${level}
  Json Response format: ${responseFormat}`;

  return prompt;
}