import Constants from 'expo-constants';
import { Configuration, OpenAIApi } from 'openai';

class OpenAIService {
  constructor() {
    this.configuration = new Configuration({
      apiKey: Constants.expoConfig.extra.OPEN_AI_KEY,
    });
    this.openai = new OpenAIApi(this.configuration);

    this.JSONFormatInstructions = `
     Return this data in a json object. Use the key "description" to store the description data and the key "questions" to store the follow-up questions data.

     For example:
     {"description": "description data", "questions": ["question 1", "question 2", "question 3", "question 4"]}`;
  }

  getDescription = async (prompt) => {
    try {
      const completion = await this.openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Your a friendly and knowledgeable tour guide',
          },
          {
            role: 'user',
            content: `I am a tourist. Can you give me the most interesting information and history about the ${prompt} in 200 words and then suggest 4 follow-up question that will give me more information about the history of ${prompt}. Each follow up question should be no more than 10 words. ${this.JSONFormatInstructions}`,
          },
        ],
      });

      return completion.data.choices[0].message;
    } catch (error) {
      console.error('Error in getDescription:', error);
      return {
        error:
          'An error occurred while fetching the description. Please try again.',
      };
    }
  };

  askNewQuestions = async (prompt) => {
    try {
      const completion = await this.openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Your a friendly and knowledgeable tour guide',
          },
          {
            role: 'user',
            content: `I am a tourist. Can you please tell me ${prompt} and then please suggest 4 follow-up question that will give me more information about the history of ${prompt}. Each follow up question should be no more than 10 words. ${this.JSONFormatInstructions}`,
          },
        ],
      });

      return completion.data.choices[0].message;
    } catch (error) {
      console.error('Error in getDescription:', error);
      return {
        error:
          'An error occurred while fetching the description. Please try again.',
      };
    }
  };
}

export default new OpenAIService();
