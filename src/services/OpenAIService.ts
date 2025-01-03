import Constants from "expo-constants";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";

interface AskQuestionsParams {
  followUpQuestion: string;
  city: string;
  name: string;
}

interface AskQuestionsResponse {
  message?: ChatCompletionMessageParam;
  error?: string;
}

export interface OpenAIResponse {
  question: string;
  message: string;
}

class OpenAIService {
  private JSONFormatInstructions: string;
  private openai: OpenAI;

  constructor() {
    if (!Constants.expoConfig.extra.OPEN_AI_KEY) {
      throw new Error(
        "Please provide an OpenAI API key in your app.json or app.config.js file."
      );
    }
    this.openai = new OpenAI({
      apiKey: Constants.expoConfig.extra.OPEN_AI_KEY,
    });

    this.JSONFormatInstructions = `
     Return this data in a json object. Use the key "answer" to store the answer data and the key "followUpQuestions" to store the follow-up questions data.

     DO NOT add any response text before or after the json object.

     For example:
     {"answer": "description data", "followUpQuestion": ["question 1", "question 2", "question 3", "question 4"]}`;
  }

  askQuestion = async ({
    followUpQuestion,
    city,
    name,
  }: AskQuestionsParams): Promise<AskQuestionsResponse> => {
    try {
      const chatCompletions = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Your a friendly and knowledgeable tour guide",
          },
          {
            role: "user",
            content: `I am a tourist at ${name} in ${city}. Can you please tell me ${followUpQuestion} in 1000 words and then please suggest 4 follow-up question that will give me more information about the history of ${followUpQuestion}. Each follow up question should be no more than 10 words. ${this.JSONFormatInstructions}`,
          },
        ],
      });

      return { message: chatCompletions.choices[0].message };
    } catch (error) {
      console.error("Error in getDescription:", error);
      return {
        error:
          "An error occurred while fetching the description. Please try again.",
      };
    }
  };
}

export default new OpenAIService();
