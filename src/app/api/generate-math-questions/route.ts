import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || 'dummy-key' });

function parseQuestions(text: string) {
  // Expecting: "1. 5 + 3 = ? | Answer: 8 | Options: 6, 8, 9"
  return text.split('\n').map(line => {
    const [q, a, opts] = line.split('|').map(s => s.trim());
    return {
      question: q.replace(/^\d+\.\s*/, ''),
      answer: Number(a.replace('Answer:', '').trim()),
      options: opts.replace('Options:', '').split(',').map(s => Number(s.trim())),
    };
  });
}

const DEMO_QUESTIONS = [
  { question: '5 + 3 = ?', answer: 8, options: [6, 8, 9] },
  { question: '12 - 4 = ?', answer: 8, options: [7, 8, 10] },
  { question: '3 × 4 = ?', answer: 12, options: [10, 12, 14] },
  { question: '15 ÷ 3 = ?', answer: 5, options: [3, 5, 7] },
  { question: '7 + 6 = ?', answer: 13, options: [11, 13, 15] },
];

export async function POST(req: NextRequest) {
  try {
    const { count } = await req.json();
    const prompt = `Generate ${count} simple math questions for kids. Only generate questions that are logical, answerable, and make sense in context. Do NOT generate questions that are ambiguous, nonsensical, or have multiple possible answers. Each question must have only one clear, logical answer and should be suitable for children. Do NOT generate questions based on facts or guesses (e.g., 'How many apples do I have?'). Only generate questions where the correct answer is clear from the math, not from guessing facts. Format each as: <question> | Answer: <answer> | Options: <comma separated options including answer>.`;
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a math game question generator for kids.' },
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
