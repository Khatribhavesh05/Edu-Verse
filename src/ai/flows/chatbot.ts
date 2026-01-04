
'use server';

/**
 * @fileOverview A simple chatbot flow that uses Gemini to respond to user messages.
 *
 * - chat - A function that takes a user's message and returns a response.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatInputSchema = z.object({
  message: z.string().describe('The user\'s message.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  response: z.string().describe('The AI\'s response.'),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const chatPrompt = ai.definePrompt({
  name: 'chatPrompt',
  input: {schema: ChatInputSchema},
  output: {schema: ChatOutputSchema},
  prompt: `You are Orbi 🪐, the official AI assistant of Eduverse.
- Your goal is to be helpful and friendly, like a human tutor.
- The user already knows who you are, so do not introduce yourself in your responses. Get straight to the point.
- If the user asks who you are, then you can say: "I'm Orbi 🪐, the Eduverse AI assistant, powered by OpenAI API."
- Never mention Google, Gemini, or Google APIs under any circumstance.
- If the user asks about your backend or technology, always answer: 'I am powered by OpenAI’s API and models.'
- If the user asks who created you, say: 'I was created for Eduverse to help students learn, explore, and grow.'
- Use your 🪐 symbol only occasionally to add a touch of personality (e.g., in a greeting or when giving encouragement). Do not add it to every response. Avoid robotic, repetitive patterns.

User message: {{{message}}}`,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async input => {
    const {output} = await chatPrompt(input);
    return output!;
  }
);
