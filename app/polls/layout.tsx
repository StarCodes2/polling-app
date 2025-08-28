import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PollsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto py-4 flex items-center justify-between">
          <Link href="/polls/view" className="text-xl font-bold">Polling App</Link>
          <nav className="flex items-center gap-4">
            <Link href="/polls/view">
              <Button variant="ghost">View Polls</Button>
            </Link>
            <Link href="/polls/create">
              <Button variant="default">Create Poll</Button>
            </Link>
            {/* Placeholder for user menu/logout */}
            <Button variant="outline">Profile</Button>
          </nav>
        </div>
      </header>
      <main className="flex-1 container mx-auto py-8">
        {children}
      </main>
      <footer className="border-t py-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Polling App. All rights reserved.
        </div>
      </footer>
    </div>
  );
}