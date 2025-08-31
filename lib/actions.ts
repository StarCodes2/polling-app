'use server';

import { createClient } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPoll(formData: FormData) {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const options = formData.getAll('option') as string[];

  // Basic validation
  if (!title || options.length < 2 || options.some(option => !option)) {
    // In a real app, you'd handle this more gracefully, e.g., return errors
    console.error('Validation failed: Title and at least two options are required.');
    return;
  }

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    console.error('User not authenticated:', userError?.message);
    redirect('/auth/login'); // Redirect to login if not authenticated
  }

  const user_id = userData.user.id;

  try {
    const { data: poll, error: pollError } = await supabase
      .from('polls')
      .insert({ title, description, user_id })
      .select()
      .single();

    if (pollError) throw pollError;

    const poll_id = poll.id;

    const voteOptions = options.map(option => ({
      poll_id,
      option_text: option,
    }));

    const { error: optionsError } = await supabase
      .from('options') // 'options' table is used to store poll options
      .insert(voteOptions);

    if (optionsError) throw optionsError;

    revalidatePath('/dashboard'); // Revalidate dashboard to show new poll
    redirect(`/polls/view/${poll_id}`); // Redirect to the new poll's view page

  } catch (error) {
    console.error('Error creating poll:', error);
    // In a real app, you'd show a user-friendly error message
  }
}