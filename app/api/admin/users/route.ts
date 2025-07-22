import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import User from '@/models/User';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  await connectToDatabase();
  const user = await getCurrentUser(request);
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const users = await User.find().select('-password');
  return NextResponse.json({ users });
}

export async function POST(request: NextRequest) {
  await connectToDatabase();
  const user = await getCurrentUser(request);
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { firstName, lastName, email, password, role } = await request.json();
  if (!firstName || !lastName || !email || !password || !role) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }
  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json({ error: 'User already exists' }, { status: 409 });
  }
  const newUser = await User.create({ firstName, lastName, email, password, role });
  return NextResponse.json({ user: { id: newUser._id, firstName, lastName, email, role } });
} 