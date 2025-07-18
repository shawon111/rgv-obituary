import { NextRequest } from 'next/server';
import { connectToDatabase } from './mongodb';
import User from '@/models/User';
import { verifyToken } from './token';

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  [key: string]: unknown;
}

// Get current user from request
export async function getCurrentUser(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) return null;

    const decoded = await verifyToken(token);
    if (!decoded) return null;

    await connectToDatabase();
    const user = await User.findById(decoded.userId).select('-password');

    return user;
  } catch (error) {
    return null;
  }
}
