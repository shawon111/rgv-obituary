import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import User from '@/models/User';
import Obituary from '@/models/Obituary';
import { connectToDatabase } from '@/lib/mongodb';

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const user = await getCurrentUser(request);
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // Prevent admin from deleting their own account
  if (user._id.toString() === params.id) {
    return NextResponse.json({ error: "You can't delete your own admin account." }, { status: 400 });
  }
  // Delete all obituaries authored by this user
  await Obituary.deleteMany({ author: params.id });
  await User.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'User and related obituaries deleted' });
} 