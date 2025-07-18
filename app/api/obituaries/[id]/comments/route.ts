import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Comment from '@/models/Comment';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const comments = await Comment.find({
      obituary: params.id,
      isApproved: true,
    }).sort({ createdAt: -1 });

    return NextResponse.json({ comments });
  } catch (error) {
    console.error('Comments fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const commentData = await request.json();

    await connectToDatabase();

    const comment = await Comment.create({
      ...commentData,
      obituary: params.id,
    });

    return NextResponse.json(
      { comment, message: 'Comment submitted for approval' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Comment creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}