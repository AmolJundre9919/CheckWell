export interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

export interface ServiceType {
  id: string;
  name: string;
}

export interface AppointmentData {
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

export interface AppointmentResponse {
  success: boolean;
  message?: string;
  error?: string;
} 