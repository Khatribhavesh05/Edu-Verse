import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

if (!process.env.OPENAI_API_KEY) {
  console.warn('⚠️ OPENAI_API_KEY not set - running in demo mode');
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || 'dummy-key' });

export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        reply: "🪐 I'm running in demo mode! Connect an OpenAI API key to hear Orbi's voice.",
        audio: '',
      });
    }
    const body = await req.json();
    const transcript = body?.transcript || '';
    
    if (!transcript) {
      return NextResponse.json({ reply: 'No transcript provided', audio: '' }, { status: 400 });
    }
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
