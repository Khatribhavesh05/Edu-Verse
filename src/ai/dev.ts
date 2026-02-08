import { config } from 'dotenv';
config();

import '@/ai/flows/generate-topic-descriptions.ts';
import '@/ai/flows/chatbot.ts';
import '@/ai/flows/generate-hint.ts';
import '@/ai/flows/text-to-speech.ts';
