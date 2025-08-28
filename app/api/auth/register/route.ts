import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }
    
    // In a real app, this would:
    // 1. Check if email already exists
    // 2. Hash the password
    // 3. Save the user to a database
    
    // For now, we'll just return a success message
    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}