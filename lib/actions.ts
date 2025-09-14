'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function createPoll(prevState: any, formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const options: string[] = [];
  for (let i = 0; ; i++) {
    const option = formData.get(`option-${i}`);
    if (option === null) break;
    options.push(option as string);
  }

  const cookieStore = await cookies();
  const supabase = createServerActionClient({ cookies: async () => cookieStore });

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, message: 'User not authenticated.' };
  }

  // Basic validation
  if (!title || options.length < 2 || options.some(option => !option)) {
    return { success: false, message: 'Validation failed: Title and at least two options are required.' };
  }

  try {
    const { data: poll, error: pollError } = await supabase
      .from('polls')
      .insert({ title, description, user_id: user.id })
      .select()
      .single();

    if (pollError) {
      console.error('Error creating poll:', pollError);
      return { success: false, message: 'Failed to create poll.' };
    }

    const pollOptions = options.filter(option => option.trim() !== '').map(option => ({
      poll_id: poll.id,
      option_text: option,
    }));

    const { error: optionsError } = await supabase
      .from('poll_options') // 'options' table is used to store poll options
      .insert(pollOptions);

    if (optionsError) {
      console.error('Error creating poll options:', optionsError);
      return { success: false, message: 'Failed to create poll options.' };
    }

    revalidatePath('/dashboard'); // Revalidate dashboard to show new poll
    return { success: true, message: 'Poll created successfully!', pollId: poll.id };

  } catch (error: any) {
    console.error('Error creating poll:', error);
    return { success: false, message: error.message || 'An unexpected error occurred.' };
  }
}