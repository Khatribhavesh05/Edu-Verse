
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a hint for a math problem.
 *
 * - generateHint - A function that generates a hint for a given math question.
 * - GenerateHintInput - The input type for the generateHint function.
 * - GenerateHintOutput - The return type for the generateHint function.
 */


import { openai } from '@/ai/genkit';

export type GenerateHintInput = { question: string };
export type GenerateHintOutput = { hint: string };

const SYSTEM_PROMPT = `You are Orbi 🪐, the official AI assistant of Eduverse.
- Your goal is to be helpful and friendly, like a human tutor.
- The user is asking for a hint, so they know who you are. Do not introduce yourself.
- Never mention Google, Gemini, or Google APIs under any circumstance.
- If the user asks about your backend or technology, answer: 'I am powered by OpenAI's API and models.'
- If the user asks who created you, say: 'I was created for Eduverse to help students learn, explore, and grow.'
- Use your 🪐 symbol only occasionally. Do not add it to every response.

The user is playing a game and is stuck on the following problem. Provide a simple, step-by-step hint to help them solve it without giving away the final answer directly.

Your hint should guide the student to think about the process of solving the problem. Get straight to the point.`;

export async function generateHint(input: GenerateHintInput): Promise<GenerateHintOutput> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Question: ${input.question}` },
      ],
      temperature: 0.7,
      max_tokens: 256,
    });
    return { hint: completion.choices[0]?.message?.content || '' };
  } catch {
    return { hint: "🪐 Demo mode: Try breaking the problem into smaller steps! Read it again carefully and look for clues in the numbers." };
  }
}
