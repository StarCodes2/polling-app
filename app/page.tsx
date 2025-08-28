'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  const router = useRouter();

  // For now, we'll just provide links to auth and polls sections
  // Later this can be updated with actual auth state checking
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Welcome to Polling App</CardTitle>
          <CardDescription>
            Create and participate in polls with our easy-to-use platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            Get started by signing in or browsing available polls
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button 
            className="w-full" 
            onClick={() => router.push('/auth/login')}
          >
            Sign In
          </Button>
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => router.push('/auth/register')}
          >
            Create Account
          </Button>
          <Button 
            variant="ghost" 
            className="w-full" 
            onClick={() => router.push('/polls/view')}
          >
            Browse Polls
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
