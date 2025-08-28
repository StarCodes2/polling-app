'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Mock data for polls
const MOCK_POLLS = [
  {
    id: '1',
    title: 'Favorite Programming Language',
    description: 'What is your favorite programming language?',
    options: ['JavaScript', 'Python', 'Java', 'C#', 'Go'],
    votes: [42, 35, 28, 15, 10],
    createdBy: 'John Doe',
    createdAt: '2023-06-15',
  },
  {
    id: '2',
    title: 'Best Frontend Framework',
    description: 'Which frontend framework do you prefer?',
    options: ['React', 'Vue', 'Angular', 'Svelte'],
    votes: [50, 30, 15, 25],
    createdBy: 'Jane Smith',
    createdAt: '2023-06-10',
  },
  {
    id: '3',
    title: 'Preferred Database',
    description: 'What database do you use most often?',
    options: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite', 'Redis'],
    votes: [22, 18, 40, 12, 8],
    createdBy: 'Alex Johnson',
    createdAt: '2023-06-05',
  },
];

export default function ViewPollsPage() {
  const [polls, setPolls] = useState(MOCK_POLLS);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Available Polls</h1>
        <Link href="/polls/create">
          <Button>Create New Poll</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {polls.map((poll) => (
          <Card key={poll.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{poll.title}</CardTitle>
              <CardDescription>{poll.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-2">
                {poll.options.map((option, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{option}</span>
                    <span className="font-medium">{poll.votes[index]} votes</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-2">
              <div className="text-sm text-muted-foreground">
                Created by {poll.createdBy} on {poll.createdAt}
              </div>
              <Button variant="outline" className="w-full">
                Vote on this poll
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}