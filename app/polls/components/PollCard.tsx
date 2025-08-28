'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type PollOption = {
  text: string;
  votes: number;
};

type PollCardProps = {
  id: string;
  title: string;
  description: string;
  options: PollOption[];
  createdBy: string;
  createdAt: string;
  onVote?: (pollId: string, optionIndex: number) => void;
};

export default function PollCard({
  id,
  title,
  description,
  options,
  createdBy,
  createdAt,
  onVote,
}: PollCardProps) {
  // Calculate total votes
  const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-3">
          {options.map((option, index) => {
            const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
            
            return (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{option.text}</span>
                  <span className="font-medium">{option.votes} votes ({percentage}%)</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2">
        <div className="text-sm text-muted-foreground">
          Created by {createdBy} on {createdAt}
        </div>
        {onVote && (
          <Button variant="outline" className="w-full" onClick={() => onVote(id, 0)}>
            Vote on this poll
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}