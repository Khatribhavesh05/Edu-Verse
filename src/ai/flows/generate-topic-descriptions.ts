
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating topic descriptions using the Gemini API.
 *
 * - generateTopicDescription - A function that generates a topic description for a given subject.
 * - GenerateTopicDescriptionInput - The input type for the generateTopicDescription function.
 * - GenerateTopicDescriptionOutput - The return type for the generateTopicDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTopicDescriptionInputSchema = z.object({
  subject: z.string().describe('The subject for which to generate a topic description.'),
});
export type GenerateTopicDescriptionInput = z.infer<typeof GenerateTopicDescriptionInputSchema>;

const GenerateTopicDescriptionOutputSchema = z.object({
  description: z.string().describe('The generated topic description.'),
});
export type GenerateTopicDescriptionOutput = z.infer<typeof GenerateTopicDescriptionOutputSchema>;

export async function generateTopicDescription(input: GenerateTopicDescriptionInput): Promise<GenerateTopicDescriptionOutput> {
  return generateTopicDescriptionFlow(input);
}

const generateTopicDescriptionPrompt = ai.definePrompt({
  name: 'generateTopicDescriptionPrompt',
  input: {schema: GenerateTopicDescriptionInputSchema},
  output: {schema: GenerateTopicDescriptionOutputSchema},
  prompt: `You are Orbi 🪐, the official AI assistant of Eduverse.
- Your goal is to be helpful and friendly, like a human tutor.
- The user is asking for a description, so they know who you are. Do not introduce yourself.
- Never mention Google, Gemini, or Google APIs under any circumstance.
- If the user asks about your backend or technology, answer: 'I am powered by OpenAI’s API and models.'
- If the user asks who created you, say: 'I was created for Eduverse to help students learn, explore, and grow.'
- Use your 🪐 symbol only occasionally. Do not add it to every response.

Generate a concise and informative topic description for the subject: {{{subject}}}. Aim for approximately 100 words. Focus on the core concepts and what a student can expect to learn. Get straight to the point.`,
});

const generateTopicDescriptionFlow = ai.defineFlow(
  {
    name: 'generateTopicDescriptionFlow',
    inputSchema: GenerateTopicDescriptionInputSchema,
    outputSchema: GenerateTopicDescriptionOutputSchema,
  },
  async input => {
    const {output} = await generateTopicDescriptionPrompt(input);
    return output!;
  }
);
