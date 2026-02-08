'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { generateDescriptionAction } from '@/app/topic-description/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const initialState = {
  message: '',
  errors: null,
  data: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
      Generate Description
    </Button>
  );
}

export function TopicDescriptionForm() {
  const [state, formAction] = useActionState(generateDescriptionAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message && state.message !== 'Success' && state.message !== 'Validation failed') {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <div className="space-y-6">
      <form ref={formRef} action={formAction} className="space-y-4">
        <div>
          <Input
            name="subject"
            placeholder="e.g., Quantum Physics"
            required
            className="text-lg p-6"
          />
          {state.errors?.subject && (
            <p className="text-sm text-destructive mt-2">{state.errors.subject[0]}</p>
          )}
        </div>
        <SubmitButton />
      </form>

      {state.data && (
        <Card className="bg-muted/50 animate-in fade-in-50">
          <CardContent className="p-6">
            <p className="text-foreground/90 whitespace-pre-wrap">{state.data}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
