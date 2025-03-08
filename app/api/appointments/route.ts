import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const RECAPTCHA_SECRET_KEY = '6Ld_0-sqAAAAANH6EXrEPLpQhqpLk1yGGcvWDwKs'; // Your reCAPTCHA secret key
const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';

interface AppointmentData {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  serviceType: string;
  description?: string;
  recaptchaToken: string;
  _csrf: string;
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const response = await fetch(RECAPTCHA_VERIFY_URL, {
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

    // For v3, you might want to check the score
    if (data.success && data.score >= 0.5) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('reCAPTCHA verification failed:', error);
    return false;
  }
}

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 10;
const requestCounts = new Map<string, { count: number; timestamp: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userRequests = requestCounts.get(ip);

  if (!userRequests) {
    requestCounts.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (now - userRequests.timestamp > RATE_LIMIT_WINDOW) {
    // Reset if window has passed
    requestCounts.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (userRequests.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  userRequests.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Verify CSRF token
    const csrfToken = request.headers.get('X-CSRF-Token');
    if (!csrfToken) {
      return NextResponse.json(
        { error: 'CSRF token missing' },
        { status: 403 }
      );
    }

    // Get request data
    const data: AppointmentData = await request.json();

    // Verify reCAPTCHA
    const isRecaptchaValid = await verifyRecaptcha(data.recaptchaToken);
    if (!isRecaptchaValid) {
      return NextResponse.json(
        { error: 'Invalid reCAPTCHA' },
        { status: 400 }
      );
    }

    // Basic validation
    if (!data.fullName || !data.email || !data.phone || !data.date || !data.timeSlot || !data.serviceType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Sanitize the input data
    // 2. Validate the appointment date and time slot availability
    // 3. Save to your database
    // 4. Send confirmation emails
    // For this example, we'll just simulate a successful save:

    // Simulate database save
    await saveAppointment(data);

    // Send confirmation email
    await sendConfirmationEmail(data);

    return NextResponse.json(
      { 
        success: true,
        message: 'Appointment scheduled successfully' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Appointment scheduling error:', error);
    return NextResponse.json(
      { error: 'Failed to schedule appointment' },
      { status: 500 }
    );
  }
}

// Helper function to save appointment to database
async function saveAppointment(data: AppointmentData) {
  // Implementation depends on your database
  // Example with Prisma:
  /*
  await prisma.appointment.create({
    data: {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      date: new Date(data.date),
      timeSlot: data.timeSlot,
      serviceType: data.serviceType,
      description: data.description,
    },
  });
  */
}

// Helper function to send confirmation email
async function sendConfirmationEmail(data: AppointmentData) {
  // Implementation depends on your email service
  // Example with NodeMailer:
  /*
  const transporter = nodemailer.createTransport({
    // your email configuration
  });

  await transporter.sendMail({
    from: 'your@email.com',
    to: data.email,
    subject: 'Appointment Confirmation',
    html: `
      <h1>Appointment Confirmation</h1>
      <p>Dear ${data.fullName},</p>
      <p>Your appointment has been scheduled for ${data.date} at ${data.timeSlot}.</p>
      <p>Service: ${data.serviceType}</p>
      <!-- Add more details as needed -->
    `,
  });
  */
} 