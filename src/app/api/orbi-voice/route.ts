import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || 'dummy-key' });

export async function POST(req: NextRequest) {
  try {
    const { transcript } = await req.json();
    // Get Orbi's response from OpenAI chat
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are Orbi, a friendly AI tutor for kids.' },
        { role: 'user', content: transcript },
      ],
      temperature: 0.7,
      max_tokens: 256,
    });
    const orbiReply = completion.choices[0]?.message?.content || '';
    // Get TTS audio from OpenAI
    const ttsResponse = await openai.audio.speech.create({
      model: 'tts-1',
      input: orbiReply,
      voice: 'alloy',
      response_format: 'mp3',
    });
    const buffer = Buffer.from(await ttsResponse.arrayBuffer());
    const audioUrl = 'data:audio/mp3;base64,' + buffer.toString('base64');
    return NextResponse.json({ reply: orbiReply, audio: audioUrl });
  } catch {
    return NextResponse.json({
      reply: "🪐 I'm running in demo mode! Connect an OpenAI API key to hear Orbi's voice.",
      audio: '',
    });
  }
}
