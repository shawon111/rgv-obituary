// lib/auth.ts
import { SignJWT, jwtVerify } from 'jose';
import { NextRequest } from 'next/server';
import { connectToDatabase } from './mongodb';
import User from '@/models/User';

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  [key: string]: unknown;
}

// Encode the secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
const encoder = new TextEncoder();
const secret = encoder.encode(JWT_SECRET);

// Generate a JWT token
export async function generateToken(payload: TokenPayload): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secret);
}

// Verify token
export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as TokenPayload;
  } catch (err) {
    console.error('token verify error', err);
    return null;
  }
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
