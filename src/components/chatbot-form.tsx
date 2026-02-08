'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { chatAction, type FormState } from '@/app/ai-tutor/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Loader2, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const initialState: FormState = {
  message: '',
  response: null,
  errors: null,
};

type ChatMessage = {
    role: 'user' | 'bot';
    content: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="icon"
      disabled={pending}
      className="rounded-full w-12 h-12"
    >
      {pending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
      <span className="sr-only">Send message</span>
    </Button>
  );
}

export function ChatbotForm() {
  const [state, formAction] = useActionState(chatAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  const clientAction = (formData: FormData) => {
    const message = formData.get('message');
    if (typeof message === 'string' && message.trim().length > 0) {
        setMessages(prev => [...prev, {role: 'user', content: message}]);
    }
    formAction(formData);
  }

  useEffect(() => {
    if (state.message) {
      if (state.message === 'Success' && state.response) {
        setMessages(prev => [...prev, {role: 'bot', content: state.response as string}]);
        formRef.current?.reset();
      } else if (state.message !== 'Validation failed' && state.message !== 'Success') {
         toast({
            variant: 'destructive',
            title: 'Error',
            description: state.message,
        });
      }
    }
  }, [state, toast]);

  useEffect(() => {
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);


  return (
    <div className="space-y-4 flex flex-col flex-1 h-full w-full">
       <Card ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-blue-50/50 rounded-2xl border-blue-200 w-full">
        {messages.length === 0 && (
            <div className="flex items-center justify-center h-full text-foreground/70 text-center p-4">
                Hi, I’m Orbi 🪐, your AI learning assistant! Ask me anything!
            </div>
        )}
        {messages.map((msg, index) => (
            <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                {msg.role === 'bot' && <span className="w-8 h-8 text-3xl flex-shrink-0 mt-1">🪐</span>}
                <div className={`rounded-2xl px-4 py-2 max-w-[80%] shadow-sm ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-white'}`}>
                    <p className="text-base whitespace-pre-wrap">{msg.content}</p>
                </div>
                {msg.role === 'user' && <User className="w-8 h-8 text-gray-400 flex-shrink-0 mt-1"/>}
            </div>
        ))}
      </Card>

      <form ref={formRef} action={clientAction} className="flex gap-2">
        <Input
            name="message"
            placeholder="Type your message..."
            required
            className="text-lg flex-1 rounded-full h-12 px-5 border-2 border-gray-300 focus:border-blue-500"
            autoComplete='off'
          />
        <SubmitButton />
      </form>
       {state.errors?.message && (
            <p className="text-sm text-destructive -mt-2 ml-4">{state.errors.message[0]}</p>
        )}
    </div>
  );
}
