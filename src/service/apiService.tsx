import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY, BASE_URL } from './API';
import axios from 'axios';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const askAI = async (prompt: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-001' });
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    return response;
  } catch (error) {
    throw error;
  }
};

export const registerToken = async (device_token: string) => {
  try {
    const res = await axios.post(`${BASE_URL}/notifications/register-token`, {
      device_token,
    });
    console.log(' response ', res);
  } catch (error) {
    console.log(error);
  }
};
