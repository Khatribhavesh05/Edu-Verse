'use server';

import { chat } from '@/ai/flows/chatbot';
import { z } from 'zod';

const schema = z.object({
  message: z.string().min(1, { message: 'Message cannot be empty.' }),
});

export type FormState = {
  message: string;
  response: string | null;
  errors: { message?: string[] } | null;
}

export async function chatAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = schema.safeParse({
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation failed',
      response: null,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const userMessage = validatedFields.data.message;

  try {
    const result = await chat({ message: userMessage });
    return {
      message: 'Success',
      response: result.response,
      errors: null,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'An unexpected error occurred.',
      response: null,
      errors: null,
    };
  }
}
