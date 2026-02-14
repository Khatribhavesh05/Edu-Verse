import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

if (!process.env.OPENAI_API_KEY) {
  console.warn('⚠️ OPENAI_API_KEY not set - running in demo mode');
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || 'dummy-key' });

function parseQuestions(text: string) {
  // Expecting: "1. The cat is _____ under the table. | Correct: sitting | Options: running, sitting, drinking"
  return text.split('\n').map(line => {
    const [sentence, correct, opts] = line.split('|').map(s => s.trim());
    return {
      sentence: sentence.replace(/^\d+\.\s*/, ''),
      correctWord: correct.replace('Correct:', '').trim(),
      options: opts.replace('Options:', '').split(',').map(s => s.trim()),
    };
  });
}

const DEMO_QUESTIONS = [
  { sentence: 'She _____ to school every day.', correctWord: 'goes', options: ['go', 'goes', 'going'] },
  { sentence: 'The dog _____ in the garden.', correctWord: 'is', options: ['is', 'are', 'am'] },
  { sentence: 'They _____ playing football.', correctWord: 'are', options: ['is', 'are', 'was'] },
  { sentence: 'He _____ his homework yesterday.', correctWord: 'did', options: ['do', 'did', 'does'] },
  { sentence: 'We _____ going to the park.', correctWord: 'are', options: ['is', 'are', 'am'] },
];

export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ questions: DEMO_QUESTIONS });
    }
    const body = await req.json();
    const count = body?.count || 5;
    const prompt = `Generate ${count} simple grammar fill-in-the-blank questions for kids. Only generate questions that are logical, answerable, and make sense in context. Do NOT generate questions that are ambiguous, nonsensical, or have multiple possible answers. Each question must have only one grammatically correct answer, not just factual answers. For example, do NOT generate questions like 'I have ____ apples in my bag' with options 'two', 'three', 'four', because all are possible. Only generate questions where the correct answer is clear from grammar, not from guessing facts. Format each as: <sentence with blank> | Correct: <correct word> | Options: <comma separated options including correct word>.`;
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a grammar game question generator for kids.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 512,
    });
    const text = completion.choices[0]?.message?.content || '';
    const questions = parseQuestions(text);
    return NextResponse.json({ questions });
  } catch {
    return NextResponse.json({ questions: DEMO_QUESTIONS });
  }
}
