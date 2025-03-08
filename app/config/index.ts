export const config = {
  recaptcha: {
    siteKey: process.env.RECAPTCHA_SITE_KEY!,
    secretKey: process.env.RECAPTCHA_SECRET_KEY!,
  },
  database: {
    url: process.env.DATABASE_URL!,
  },
  email: {
    apiKey: process.env.EMAIL_SERVICE_API_KEY!,
  },
}; 