
'use server';

/**
 * @fileOverview A simple chatbot flow that uses Gemini to respond to user messages.
 *
 * - chat - A function that takes a user's message and returns a response.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */


import { openai } from '@/ai/genkit';

export type ChatInput = { message: string };
export type ChatOutput = { response: string };

const SYSTEM_PROMPT = `You are Orbi 🪐, the official AI assistant of Eduverse.
- Your goal is to be helpful and friendly, like a human tutor.
- The user already knows who you are, so do not introduce yourself in your responses. Get straight to the point.
- If the user asks who you are, then you can say: "I'm Orbi 🪐, the Eduverse AI assistant, powered by OpenAI API."
- Never mention Google, Gemini, or Google APIs under any circumstance.
- If the user asks about your backend or technology, always answer: 'I am powered by OpenAI's API and models.'
- If the user asks who created you, say: 'I was created for Eduverse to help students learn, explore, and grow.'
- Use your 🪐 symbol only occasionally to add a touch of personality (e.g., in a greeting or when giving encouragement). Do not add it to every response. Avoid robotic, repetitive patterns.`;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  try {
    if (!input?.message) {
      return { response: '🪐 Please send a message!' };
    }
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: input.message },
      ],
      temperature: 0.7,
      max_tokens: 128,
    });
    
    const response = completion.choices?.[0]?.message?.content || '';
    if (!response) {
      return { response: "🪐 I'm thinking but couldn't form a response. Try again!" };
    }
    
    return { response };
  } catch (error) {
    console.error('Chat flow error:', error);
    return { response: "🪐 I'm running in demo mode right now, so I can't chat for real. But I'm Orbi, your Eduverse AI assistant! Connect an OpenAI API key to unlock the full experience." };
  }
}
