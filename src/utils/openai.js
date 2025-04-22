import axios from 'axios';

const openaiApiKey = process.env.VUE_APP_OPENAI_API_KEY;

export const getRecommendations = async (process, description) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          {
            role: 'user',
            content: `Provide recommendations for optimizing the following business process: ${process}. Description: ${description}`
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching recommendations from OpenAI:', error);
    throw error;
  }
};