import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { score, completedAt } = body;

    // Generate a simple signed trial token (mock for now)
    const token = Buffer.from(JSON.stringify({ score, timestamp: Date.now() })).toString('base64');

    return NextResponse.json({
      success: true,
      token,
      message: 'Game validated successfully',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
