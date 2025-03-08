import { sanitizeInput } from '../../../utils/security';
import { validateEmail, validatePhone, validateDate } from '../../../utils/validation';

interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

interface ServiceType {
  id: string;
  name: string;
}

interface AppointmentFormProps {
  availableTimeSlots?: TimeSlot[];
  serviceTypes?: ServiceType[];
  recaptchaSiteKey: string;
  csrfToken: string;
}

interface FormField {
  id: string;
  label: string;
  type: string;
  required: boolean;
  placeholder: string;
  validate?: (value: string) => string | null;
}

export class AppointmentFormAtom extends HTMLElement implements AppointmentFormProps {
  private _shadowRoot: ShadowRoot;
  private formFields: FormField[] = [
    {
      id: 'fullName',
      label: 'Full Name',
      type: 'text',
      required: true,
      placeholder: 'Enter your full name',
      validate: (value) => !value ? 'Full name is required' : null
    },
    {
      id: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      placeholder: 'your.email@example.com',
      validate: (value) => !validateEmail(value) ? 'Valid email address is required' : null
    },
    {
      id: 'phone',
      label: 'Phone Number',
      type: 'tel',
      required: true,
      placeholder: '+1 (555) 000-0000',
      validate: (value) => !validatePhone(value) ? 'Valid phone number is required' : null
    }
  ];

  availableTimeSlots: TimeSlot[] = [
    { start: '09:00', end: '10:00', available: true },
    { start: '10:00', end: '11:00', available: true },
    { start: '11:00', end: '12:00', available: true },
    { start: '13:00', end: '14:00', available: true },
    { start: '14:00', end: '15:00', available: true },
    { start: '15:00', end: '16:00', available: true }
  ];

  serviceTypes: ServiceType[] = [
    { id: '1', name: 'Consultation' },
    { id: '2', name: 'Follow-up' },
    { id: '3', name: 'General Checkup' },
    { id: '4', name: 'Specialist Visit' }
  ];

  recaptchaSiteKey: string = '6Ld_0-sqAAAAAEzyTtxGId5iSHUXE3e9qO9AOtxH';
  csrfToken: string = '';
  private isLoading: boolean = false;
  private formErrors: Record<string, string> = {};
  private recaptchaToken: string = '';
  private recaptchaLoaded: boolean = false;
  private recaptchaWidgetId?: number;

  static get observedAttributes(): string[] {
    return ['available-time-slots', 'service-types', 'recaptcha-site-key', 'csrf-token'];
  }

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this.initializeComponent();
  }

  private initializeComponent(): void {
    this.setupStyles();
    this.setupReCAPTCHA();
    this.render();
    this.setupEventListeners();
  }

  private setupStyles(): void {
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(`
      :host {
        display: block;
        font-family: system-ui, sans-serif;
      }

      .form-container {
        max-width: 600px;
        margin: 0 auto;
        padding: 2rem;
      }

      .form-group {
        margin-bottom: 1.5rem;
      }

      .form-label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: var(--text-primary, #374151);
      }

      .required::after {
        content: "*";
        color: var(--error, #DC2626);
        margin-left: 0.25rem;
      }

      .form-input,
      .form-select,
      .form-textarea {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid var(--border, #D1D5DB);
        border-radius: 0.375rem;
        background-color: var(--background, white);
        font-size: 1rem;
        transition: all 0.15s ease-in-out;
      }

      .form-input:focus,
      .form-select:focus,
      .form-textarea:focus {
        outline: none;
        border-color: var(--primary, #3B82F6);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }

      .error {
        border-color: var(--error, #DC2626);
      }

      .error-message {
        color: var(--error, #DC2626);
        font-size: 0.875rem;
        margin-top: 0.25rem;
      }

      .submit-button {
        background-color: var(--primary, #3B82F6);
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 0.375rem;
        font-weight: 500;
        border: none;
        cursor: pointer;
        transition: background-color 0.15s ease-in-out;
      }

      .submit-button:hover {
        background-color: var(--primary-dark, #2563EB);
      }

      .submit-button:disabled {
        background-color: var(--disabled, #9CA3AF);
        cursor: not-allowed;
      }

      .loading {
        opacity: 0.7;
        pointer-events: none;
      }

      @media (max-width: 640px) {
        .form-container {
          padding: 1rem;
        }
      }

      /* Accessibility improvements */
      .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
      }

      .form-select {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid var(--border, #D1D5DB);
        border-radius: 0.375rem;
        background-color: white;
        font-size: 1rem;
        appearance: auto; /* Show default select dropdown arrow */
      }

      .recaptcha-wrapper {
        margin: 1rem 0;
        min-height: 78px;
        display: flex;
        justify-content: center;
      }

      .form-container {
        position: relative;
      }

      .form-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        visibility: hidden;
      }

      .loading .form-overlay {
        visibility: visible;
      }
    `);
    this._shadowRoot.adoptedStyleSheets = [styleSheet];
  }

  private setupReCAPTCHA(): void {
    if (this.recaptchaLoaded) return;

    const existingScript = document.querySelector('script[src*="recaptcha"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Define the callback function
    window.onRecaptchaLoad = () => {
      this.recaptchaLoaded = true;
      this.initializeRecaptcha();
    };

    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }

  private initializeRecaptcha(): void {
    if (this.recaptchaWidgetId) return;

    const recaptchaElement = this._shadowRoot.querySelector('#recaptcha-element') as HTMLDivElement;
    
    if (recaptchaElement && window.grecaptcha && !recaptchaElement.hasChildNodes()) {
      try {
        this.recaptchaWidgetId = window.grecaptcha.render(recaptchaElement, {
          sitekey: this.recaptchaSiteKey,
          size: 'normal',
          callback: (token: string) => {
            this.handleRecaptchaToken(token);
          }
        });
      } catch (error) {
        console.error('Error rendering reCAPTCHA:', error);
      }
    }
  }

  private handleRecaptchaToken(token: string): void {
    this.recaptchaToken = token;
  }

  private setupEventListeners(): void {
    const form = this._shadowRoot.querySelector('form');
    if (form) {
      // Remove existing listeners first to prevent duplicates
      const newForm = form.cloneNode(true) as HTMLFormElement;
      form.parentNode?.replaceChild(newForm, form);
      
      // Add submit event listener with correct type
      newForm.addEventListener('submit', (e: Event) => {
        e.preventDefault(); // Prevent default form submission
        this.handleSubmit(e as SubmitEvent);
      });

      // Add input event listeners for validation
      this.formFields.forEach(field => {
        const input = newForm.querySelector(`#${field.id}`) as HTMLInputElement;
        if (input) {
          input.addEventListener('input', () => this.validateField(field.id));
          input.addEventListener('blur', () => this.validateField(field.id));
        }
      });
    }
  }

  private validateField(fieldId: string): void {
    const field = this.formFields.find(f => f.id === fieldId);
    const input = this._shadowRoot.querySelector(`#${fieldId}`) as HTMLInputElement;
    
    if (field && input) {
      const value = sanitizeInput(input.value);
      const error = field.validate?.(value) || null;
      
      if (error) {
        this.formErrors[fieldId] = error;
        input.classList.add('error');
      } else {
        delete this.formErrors[fieldId];
        input.classList.remove('error');
      }
      
      this.updateFieldError(fieldId);
    }
  }

  private updateFieldError(fieldId: string): void {
    const errorDiv = this._shadowRoot.querySelector(`#${fieldId}-error`);
    if (errorDiv) {
      errorDiv.textContent = this.formErrors[fieldId] || '';
    }
  }

  private async handleSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    
    if (this.isLoading) return;
    
    this.isLoading = true;
    this.render();

    try {
      // Validate all fields
      this.formFields.forEach(field => this.validateField(field.id));
      
      if (Object.keys(this.formErrors).length > 0) {
        throw new Error('Please correct the form errors');
      }

      if (!this.recaptchaToken) {
        throw new Error('Please complete the reCAPTCHA verification');
      }

      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);
      
      // Prepare sanitized data
      const appointmentData = {
        fullName: formData.get('fullName') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        date: formData.get('date') as string,
        timeSlot: formData.get('timeSlot') as string,
        serviceType: formData.get('serviceType') as string,
        description: formData.get('description') as string,
        recaptchaToken: this.recaptchaToken,
        _csrf: this.csrfToken
      };

      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': this.csrfToken
        },
        body: JSON.stringify(appointmentData)
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      this.dispatchEvent(new CustomEvent('appointment-scheduled', {
        detail: { success: true }
      }));

      // Reset form and recaptcha token
      form.reset();
      this.recaptchaToken = '';
      
    } catch (error: unknown) {
      this.dispatchEvent(new CustomEvent('appointment-scheduled', {
        detail: {
          success: false,
          error: error instanceof Error ? error.message : 'An unknown error occurred'
        }
      }));
    } finally {
      this.isLoading = false;
      this.render();
    }
  }

  protected render(): void {
    // Store the current form state before re-rendering
    const currentForm = this._shadowRoot.querySelector('form');
    const formData = currentForm ? new FormData(currentForm as HTMLFormElement) : null;

    const today = new Date().toISOString().split('T')[0];
    const formClass = this.isLoading ? 'form-container loading' : 'form-container';

    // Create a temporary container for the new content
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = `
      <style>
        /* ... previous styles remain the same ... */
        
        .recaptcha-wrapper {
          margin: 1rem 0;
          min-height: 78px;
          display: flex;
          justify-content: center;
        }

        .form-container {
          position: relative;
        }

        .form-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          visibility: hidden;
        }

        .loading .form-overlay {
          visibility: visible;
        }
      </style>

      <form class="${formClass}" novalidate>
        ${this.formFields.map(field => this.renderField(field)).join('')}
        
        <div class="form-group">
          <label class="form-label required" for="date">Preferred Date</label>
          <input
            type="date"
            id="date"
            name="date"
            class="form-input ${this.formErrors['date'] ? 'error' : ''}"
            min="${today}"
            required
            aria-required="true"
          />
          <div id="date-error" class="error-message" role="alert" aria-live="polite">
            ${this.formErrors['date'] || ''}
          </div>
        </div>

        <div class="form-group">
          <label class="form-label required" for="timeSlot">Preferred Time</label>
          <select
            id="timeSlot"
            name="timeSlot"
            class="form-select ${this.formErrors['timeSlot'] ? 'error' : ''}"
            required
          >
            <option value="">Select a time slot</option>
            ${this.availableTimeSlots.map(slot => `
              <option 
                value="${slot.start}-${slot.end}" 
                ${!slot.available ? 'disabled' : ''}
              >
                ${slot.start} - ${slot.end} ${!slot.available ? '(Unavailable)' : ''}
              </option>
            `).join('')}
          </select>
          ${this.formErrors['timeSlot'] ? 
            `<div class="error-message">${this.formErrors['timeSlot']}</div>` : 
            ''}
        </div>

        <div class="form-group">
          <label class="form-label required" for="serviceType">Service Type</label>
          <select
            id="serviceType"
            name="serviceType"
            class="form-select ${this.formErrors['serviceType'] ? 'error' : ''}"
            required
          >
            <option value="">Select a service</option>
            ${this.serviceTypes.map(service => `
              <option value="${service.id}">${service.name}</option>
            `).join('')}
          </select>
          ${this.formErrors['serviceType'] ? 
            `<div class="error-message">${this.formErrors['serviceType']}</div>` : 
            ''}
        </div>

        <div class="form-group">
          <label class="form-label" for="description">Description</label>
          <textarea
            id="description"
            name="description"
            class="form-textarea"
            placeholder="Please provide any additional details about your appointment"
            rows="4"
            aria-label="Appointment description"
          ></textarea>
        </div>

        <div class="recaptcha-wrapper">
          <div id="recaptcha-element"></div>
        </div>

        <button
          type="submit"
          class="submit-button"
          ${this.isLoading ? 'disabled' : ''}
        >
          ${this.isLoading ? 'Scheduling...' : 'Schedule Appointment'}
        </button>

        <div class="form-overlay">
          <div>Processing...</div>
        </div>
      </form>
    `;

    // Preserve the reCAPTCHA element if it exists
    const oldRecaptchaElement = this._shadowRoot.querySelector('#recaptcha-element');
    const recaptchaContent = oldRecaptchaElement?.firstElementChild;

    // Update the shadow DOM
    this._shadowRoot.innerHTML = tempContainer.innerHTML;

    // Restore the reCAPTCHA if it existed
    if (recaptchaContent) {
      const newRecaptchaElement = this._shadowRoot.querySelector('#recaptcha-element');
      if (newRecaptchaElement) {
        newRecaptchaElement.appendChild(recaptchaContent);
      }
    } else if (this.recaptchaLoaded) {
      // If no existing reCAPTCHA but script is loaded, initialize it
      this.initializeRecaptcha();
    }

    // Restore form data if it existed
    if (formData) {
      const newForm = this._shadowRoot.querySelector('form');
      if (newForm && newForm instanceof HTMLFormElement) {
        formData.forEach((value, key) => {
          const input = newForm.querySelector(`[name="${key}"]`) as HTMLInputElement | HTMLSelectElement | null;
          if (input) {
            input.value = value.toString();
          }
        });
      }
    }

    this.setupEventListeners();
  }

  private renderField(field: FormField): string {
    return `
      <div class="form-group">
        <label class="form-label ${field.required ? 'required' : ''}" for="${field.id}">
          ${field.label}
        </label>
        <input
          type="${field.type}"
          id="${field.id}"
          name="${field.id}"
          class="form-input ${this.formErrors[field.id] ? 'error' : ''}"
          placeholder="${field.placeholder}"
          ${field.required ? 'required' : ''}
          aria-required="${field.required}"
        />
        <div id="${field.id}-error" class="error-message" role="alert" aria-live="polite">
          ${this.formErrors[field.id] || ''}
        </div>
      </div>
    `;
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string): void {
    switch (name) {
      case 'available-time-slots':
        try {
          this.availableTimeSlots = JSON.parse(newValue);
        } catch {
          console.warn('Invalid time slots format');
        }
        break;
      case 'service-types':
        try {
          this.serviceTypes = JSON.parse(newValue);
        } catch {
          console.warn('Invalid service types format');
        }
        break;
      case 'recaptcha-site-key':
        this.recaptchaSiteKey = newValue;
        break;
      case 'csrf-token':
        this.csrfToken = newValue;
        break;
    }
    this.render();
  }

  connectedCallback(): void {
    this.setupReCAPTCHA();
  }

  disconnectedCallback(): void {
    if (this.recaptchaWidgetId !== undefined) {
      try {
        window.grecaptcha.reset(this.recaptchaWidgetId);
      } catch (error) {
        console.error('Error resetting reCAPTCHA:', error);
      }
    }

    if ('onRecaptchaLoad' in window) {
      (window as any).onRecaptchaLoad = undefined;
    }
  }

  // When replacing nodes, ensure proper type casting
  private replaceNode(oldNode: Node, newNode: Node): void {
    if (oldNode.parentNode && newNode instanceof HTMLElement) {
      oldNode.parentNode.replaceChild(newNode, oldNode);
    }
  }

  // Helper method to safely query elements
  private getElement<T extends HTMLElement>(selector: string): T | null {
    return this._shadowRoot.querySelector(selector) as T | null;
  }

  // Helper method to safely query form elements
  private getFormElement(selector: string): HTMLFormElement | null {
    const element = this.getElement<HTMLFormElement>(selector);
    return element instanceof HTMLFormElement ? element : null;
  }
}

// Update the global type declaration
declare global {
  interface Window {
    grecaptcha: {
      render(
        element: HTMLElement,
        options: {
          sitekey: string;
          size: 'normal' | 'compact' | 'invisible';
          callback: (token: string) => void;
        }
      ): number;
      reset(widgetId?: number): void;
      getResponse(widgetId?: number): string;
    };
    onRecaptchaLoad?: () => void;
  }
}

customElements.define('ui-appointment-form', AppointmentFormAtom); 