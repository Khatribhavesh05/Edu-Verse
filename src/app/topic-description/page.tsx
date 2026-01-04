import { TopicDescriptionForm } from '@/components/topic-description-form';
import { BrainCircuit } from 'lucide-react';

export default function TopicDescriptionPage() {
  return (
    <div className="flex flex-col gap-8 max-w-2xl mx-auto">
      <section className="text-center">
        <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
          <BrainCircuit className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter">Topic Description Generator</h1>
        <p className="text-muted-foreground mt-2">
          Enter a subject and let our AI generate a concise and informative description for you.
        </p>
      </section>

      <TopicDescriptionForm />
    </div>
  );
}
