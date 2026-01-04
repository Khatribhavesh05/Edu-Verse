'use server';

import { generateTopicDescription } from '@/ai/flows/generate-topic-descriptions';
import { z } from 'zod';

const schema = z.object({
  subject: z.string().min(3, { message: 'Subject must be at least 3 characters long.' }),
});

type FormState = {
  message: string;
  errors: { subject?: string[] } | null;
  data: string | null;
}

export async function generateDescriptionAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = schema.safeParse({
    subject: formData.get('subject'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation failed',
      errors: validatedFields.error.flatten().fieldErrors,
      data: null,
    };
  }

  try {
    const result = await generateTopicDescription({ subject: validatedFields.data.subject });
    return {
      message: 'Success',
      errors: null,
      data: result.description,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'An unexpected error occurred.',
      errors: null,
      data: null,
    };
  }
}
