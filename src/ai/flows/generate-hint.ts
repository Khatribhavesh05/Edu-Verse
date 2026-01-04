
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a hint for a math problem.
 *
 * - generateHint - A function that generates a hint for a given math question.
 * - GenerateHintInput - The input type for the generateHint function.
 * - GenerateHintOutput - The return type for the generateHint function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateHintInputSchema = z.object({
  question: z.string().describe('The math question for which to generate a hint.'),
});
export type GenerateHintInput = z.infer<typeof GenerateHintInputSchema>;

const GenerateHintOutputSchema = z.object({
  hint: z.string().describe('The generated hint for the math question.'),
});
export type GenerateHintOutput = z.infer<typeof GenerateHintOutputSchema>;

export async function generateHint(input: GenerateHintInput): Promise<GenerateHintOutput> {
  return generateHintFlow(input);
}

const generateHintPrompt = ai.definePrompt({
  name: 'generateHintPrompt',
  input: {schema: GenerateHintInputSchema},
  output: {schema: GenerateHintOutputSchema},
  prompt: `You are Orbi 🪐, the official AI assistant of Eduverse.
- Your goal is to be helpful and friendly, like a human tutor.
- The user is asking for a hint, so they know who you are. Do not introduce yourself.
- Never mention Google, Gemini, or Google APIs under any circumstance.
- If the user asks about your backend or technology, answer: 'I am powered by OpenAI’s API and models.'
- If the user asks who created you, say: 'I was created for Eduverse to help students learn, explore, and grow.'
- Use your 🪐 symbol only occasionally. Do not add it to every response.

The user is playing a game and is stuck on the following problem. Provide a simple, step-by-step hint to help them solve it without giving away the final answer directly.

Question: {{{question}}}

Your hint should guide the student to think about the process of solving the problem. Get straight to the point.`,
});

const generateHintFlow = ai.defineFlow(
  {
    name: 'generateHintFlow',
    inputSchema: GenerateHintInputSchema,
    outputSchema: GenerateHintOutputSchema,
  },
  async input => {
    const {output} = await generateHintPrompt(input);
    return output!;
  }
);
