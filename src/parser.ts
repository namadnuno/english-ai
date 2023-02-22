import { Question } from "./questions/prompt.types";

export const parse = (response: string) => {
  const jsonString = JSON.stringify(response) as string;
  const regex = /{[\s\S]*}/gm;
  const appliedRegex = regex.exec(jsonString);
  // @ts-ignore
   const validJsonString = appliedRegex[0];
  return JSON.parse(validJsonString.replace(/\\n/g, '').replace(/\\/g, '')) as Question;
}