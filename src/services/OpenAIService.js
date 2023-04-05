import Constants from 'expo-constants';
import { Configuration, OpenAIApi } from 'openai';

class OpenAIService {
  constructor() {
    this.configuration = new Configuration({
      apiKey: Constants.expoConfig.extra.OPEN_AI_KEY,
    });
    this.openai = new OpenAIApi(this.configuration);
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
            content: `I am a tourist. Can you give me the most interesting information and history about the ${prompt} in 200 words and then suggest 4 follow-up question that will give me more information about the history of ${prompt}. Each follow up question should be no more than 10 words. Please put the description and follow up questions in a json object with the keys description and questions.`,
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
