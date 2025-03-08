import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const RECAPTCHA_SECRET_KEY = '6Ld_0-sqAAAAANH6EXrEPLpQhqpLk1yGGcvWDwKs';
const VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    const response = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: RECAPTCHA_SECRET_KEY,
        response: token,
      }),
    });

    const data = await response.json();

    return NextResponse.json({
      success: data.success,
      score: data.score,
      action: data.action,
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to verify reCAPTCHA' },
      { status: 500 }
    );
  }
} 