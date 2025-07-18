import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Obituary from '@/models/Obituary';
import { getCurrentUser } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const obituary = await Obituary.findById(params.id)
      .populate('author', 'firstName lastName');

    if (!obituary) {
      return NextResponse.json(
        { error: 'Obituary not found' },
        { status: 404 }
      );
    }

    // Increment view count
    await Obituary.findByIdAndUpdate(params.id, {
      $inc: { viewCount: 1 }
    });

    return NextResponse.json({ obituary });
  } catch (error) {
    console.error('Obituary fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const obituaryData = await request.json();

    await connectToDatabase();

    const obituary = await Obituary.findById(params.id);
    
    if (!obituary) {
      return NextResponse.json(
        { error: 'Obituary not found' },
        { status: 404 }
      );
    }

    if (obituary.author.toString() !== user._id.toString()) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    const updatedObituary = await Obituary.findByIdAndUpdate(
      params.id,
      obituaryData,
      { new: true }
    ).populate('author', 'firstName lastName');

    return NextResponse.json({ obituary: updatedObituary });
  } catch (error) {
    console.error('Obituary update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const obituary = await Obituary.findById(params.id);
    
    if (!obituary) {
      return NextResponse.json(
        { error: 'Obituary not found' },
        { status: 404 }
      );
    }

    if (obituary.author.toString() !== user._id.toString()) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    await Obituary.findByIdAndDelete(params.id);

    return NextResponse.json({ message: 'Obituary deleted successfully' });
  } catch (error) {
    console.error('Obituary deletion error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}