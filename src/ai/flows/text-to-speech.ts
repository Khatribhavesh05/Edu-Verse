
'use server';

/**
 * @fileOverview This file defines a Genkit flow for converting text to speech.
 *
 * - textToSpeech - A function that takes a string of text and returns a WAV audio data URI.
 * - TextToSpeechInput - The input type for the textToSpeech function.
 * - TextToSpeechOutput - The return type for the textToSpeech function.
 */

import { openai } from '@/ai/genkit';
import { z } from 'zod';

const TextToSpeechInputSchema = z.object({
  text: z.string().describe('The text to convert to speech.'),
});
export type TextToSpeechInput = z.infer<typeof TextToSpeechInputSchema>;

const TextToSpeechOutputSchema = z.object({
  audio: z.string().describe('The audio data URI of the generated speech.'),
});
export type TextToSpeechOutput = z.infer<typeof TextToSpeechOutputSchema>;

  // OpenAI TTS API call
  const response = await openai.audio.speech.create({
    model: 'tts-1',
    input: input.text,
    voice: 'alloy', // You can choose from 'alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'
    response_format: 'mp3',
  });
  // response is a ReadableStream, convert to base64
  const buffer = Buffer.from(await response.arrayBuffer());
  return {
    audio: 'data:audio/mp3;base64,' + buffer.toString('base64'),
  };
}
}


