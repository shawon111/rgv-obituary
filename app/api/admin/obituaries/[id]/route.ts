import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import Obituary from '@/models/Obituary';
import { connectToDatabase } from '@/lib/mongodb';

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const user = await getCurrentUser(request);
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await Obituary.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Obituary deleted' });
} 