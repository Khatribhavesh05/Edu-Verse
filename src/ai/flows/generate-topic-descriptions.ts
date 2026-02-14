
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating topic descriptions using the Gemini API.
 *
 * - generateTopicDescription - A function that generates a topic description for a given subject.
 * - GenerateTopicDescriptionInput - The input type for the generateTopicDescription function.
 * - GenerateTopicDescriptionOutput - The return type for the generateTopicDescription function.
 */


import { openai } from '@/ai/genkit';

export type GenerateTopicDescriptionInput = { subject: string };
export type GenerateTopicDescriptionOutput = { description: string };

const SYSTEM_PROMPT = `You are Orbi 🪐, the official AI assistant of Eduverse.
- Your goal is to be helpful and friendly, like a human tutor.
- The user is asking for a description, so they know who you are. Do not introduce yourself.
- Never mention Google, Gemini, or Google APIs under any circumstance.
- If the user asks about your backend or technology, answer: 'I am powered by OpenAI's API and models.'
- If the user asks who created you, say: 'I was created for Eduverse to help students learn, explore, and grow.'
- Use your 🪐 symbol only occasionally. Do not add it to every response.

Generate a concise and informative topic description for the subject provided. Aim for approximately 100 words. Focus on the core concepts and what a student can expect to learn. Get straight to the point.`;

export async function generateTopicDescription(input: GenerateTopicDescriptionInput): Promise<GenerateTopicDescriptionOutput> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Subject: ${input.subject}` },
      ],
      temperature: 0.7,
      max_tokens: 256,
    });
    return { description: completion.choices[0]?.message?.content || '' };
  } catch {
    return { description: `🪐 Demo mode: "${input.subject}" is a fascinating topic! In the full version, Orbi will generate a detailed, kid-friendly description for you. Connect an OpenAI API key to unlock this feature.` };
  }
}
