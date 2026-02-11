import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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

export async function POST(req: NextRequest) {
  const { count } = await req.json();
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
}
