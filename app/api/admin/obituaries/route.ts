import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import Obituary from '@/models/Obituary';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  await connectToDatabase();
  const user = await getCurrentUser(request);
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const query: any = {};
  if (userId) query.author = userId;
  const obituaries = await Obituary.find(query).populate('author', 'firstName lastName email').sort({ createdAt: -1 });
  return NextResponse.json({ obituaries });
} 