import { SignJWT, jwtVerify } from 'jose';

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  [key: string]: unknown;
}

// Encode the secret
const JWT_SECRET = process.env.JWT_SECRET;
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