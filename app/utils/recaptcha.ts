export async function verifyRecaptchaToken(token: string): Promise<boolean> {
  try {
    const response = await fetch('/api/verify-recaptcha', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();
    return data.success && data.score >= 0.5; // Adjust threshold as needed
  } catch (error) {
    console.error('reCAPTCHA verification failed:', error);
    return false;
  }
} 