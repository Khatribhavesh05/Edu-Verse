import { ChatbotForm } from '@/components/chatbot-form';

export default function AITutorPage() {
  return (
    <div className="flex flex-col gap-8 max-w-3xl mx-auto h-[calc(100vh-10rem)]">
      <section className="text-center">
        <div className="inline-block p-5 bg-blue-200 rounded-full mb-4 animate-pulse">
          <span className="text-6xl">🪐</span>
        </div>
        <h1 className="text-5xl font-extrabold tracking-tighter">Orbi – Your AI Assistant</h1>
        <p className="text-xl text-foreground/80 mt-2">
          Ask me anything! I'm here to help you on your learning journey.
        </p>
      </section>

      <ChatbotForm />
    </div>
  );
}
