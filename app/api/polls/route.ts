import { NextResponse } from 'next/server';

// Mock data for polls
const MOCK_POLLS = [
  {
    id: '1',
    title: 'Favorite Programming Language',
    description: 'What is your favorite programming language?',
    options: [
      { text: 'JavaScript', votes: 42 },
      { text: 'Python', votes: 35 },
      { text: 'Java', votes: 28 },
      { text: 'C#', votes: 15 },
      { text: 'Go', votes: 10 },
    ],
    createdBy: 'John Doe',
    createdAt: '2023-06-15',
  },
  {
    id: '2',
    title: 'Best Frontend Framework',
    description: 'Which frontend framework do you prefer?',
    options: [
      { text: 'React', votes: 50 },
      { text: 'Vue', votes: 30 },
      { text: 'Angular', votes: 15 },
      { text: 'Svelte', votes: 25 },
    ],
    createdBy: 'Jane Smith',
    createdAt: '2023-06-10',
  },
  {
    id: '3',
    title: 'Preferred Database',
    description: 'What database do you use most often?',
    options: [
      { text: 'PostgreSQL', votes: 22 },
      { text: 'MySQL', votes: 18 },
      { text: 'MongoDB', votes: 40 },
      { text: 'SQLite', votes: 12 },
      { text: 'Redis', votes: 8 },
    ],
    createdBy: 'Alex Johnson',
    createdAt: '2023-06-05',
  },
];

export async function GET() {
  // In a real app, this would fetch from a database
  return NextResponse.json({ polls: MOCK_POLLS });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.options || body.options.length < 2) {
      return NextResponse.json(
        { error: 'Title and at least 2 options are required' },
        { status: 400 }
      );
    }
    
    // In a real app, this would save to a database
    // For now, we'll just return the created poll with a mock ID
    const newPoll = {
      id: `${Date.now()}`,
      title: body.title,
      description: body.description || '',
      options: body.options.map((option: string) => ({ text: option, votes: 0 })),
      createdBy: body.createdBy || 'Anonymous',
      createdAt: new Date().toISOString().split('T')[0],
    };
    
    return NextResponse.json({ poll: newPoll }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}