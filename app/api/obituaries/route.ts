import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Obituary from '@/models/Obituary';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    await connectToDatabase();

    const query: any = { isPublished: true };
    
    if (search) {
      query.$text = { $search: search };
    }

    const sort: any = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const obituaries = await Obituary.find(query)
      .populate('author', 'firstName lastName')
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Obituary.countDocuments(query);

    return NextResponse.json({
      obituaries,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Obituaries fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
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

    const obituary = await Obituary.create({
      ...obituaryData,
      author: user._id,
    });

    const populatedObituary = await Obituary.findById(obituary._id)
      .populate('author', 'firstName lastName');

    return NextResponse.json(
      { obituary: populatedObituary },
      { status: 201 }
    );
  } catch (error) {
    console.error('Obituary creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}