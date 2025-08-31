import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import UserMenu from '@/components/UserMenu';

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  const { data: { user } } = await supabase.auth.getUser();
  const { data: polls, error } = await supabase.from('polls').select('*');

  if (error) {
    console.error('Error fetching polls:', error);
    return <div className="text-center text-red-500">Error loading polls.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Welcome to Polling App</CardTitle>
          <CardDescription>
            Create and participate in polls with our easy-to-use platform
          </CardDescription>
          {user && (
            <div className="absolute top-4 right-4">
              <UserMenu />
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {user ? (
            <div className="text-center">
              <p className="text-lg font-semibold mb-4">Hello, {user.email}!</p>
              <Button asChild className="w-full mb-2">
                <Link href="/polls/create">Create New Poll</Link>
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                Get started by signing in or browsing available polls
              </p>
              <Button asChild className="w-full mb-2">
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/auth/register">Create Account</Link>
              </Button>
            </div>
          )}

          <h2 className="text-2xl font-bold mt-8 mb-4 text-center">Available Polls</h2>
          {polls.length === 0 ? (
            <p className="text-center text-muted-foreground">No polls available yet. Be the first to create one!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {polls.map((poll) => (
                <Card key={poll.id}>
                  <CardHeader>
                    <CardTitle>{poll.title}</CardTitle>
                    <CardDescription>{poll.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Created by: {poll.user_id}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button asChild size="sm">
                      <Link href={`/polls/view/${poll.id}`}>View Poll</Link>
                    </Button>
                    {user && user.id === poll.user_id && (
                      <div className="space-x-2">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/polls/edit/${poll.id}`}>Edit</Link>
                        </Button>
                        <Button variant="destructive" size="sm">
                          Delete
                        </Button>
                      </div>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
