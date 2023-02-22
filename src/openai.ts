import { Configuration, OpenAIApi } from "openai";
import { CONFIG } from "./config";

const configuration = new Configuration({
  apiKey: CONFIG.OPEN_AI_KEY,
});

export const openai = () => {
  const ai =  new OpenAIApi(configuration);
  return ai;
} 