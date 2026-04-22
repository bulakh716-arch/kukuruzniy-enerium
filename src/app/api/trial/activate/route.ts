import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, token } = body;

    if (!email || !token) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    // Mock validation and activation
    const expiration = new Date();
    expiration.setDate(expiration.getDate() + 3);

    return NextResponse.json({
      success: true,
      expiration: expiration.toISOString(),
      message: '3-Day Trial Activated',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
