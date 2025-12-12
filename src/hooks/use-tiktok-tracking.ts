// TikTok Pixel Tracking Hook with SHA-256 hashing

declare global {
  interface Window {
    ttq: {
      identify: (data: {
        email?: string;
        phone_number?: string;
        external_id?: string;
      }) => void;
      track: (event: string, data?: Record<string, unknown>) => void;
      page: () => void;
    };
  }
}

// SHA-256 hash function
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message.toLowerCase().trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// Identify user with hashed PII
export async function identifyUser(data: {
  email?: string;
  phone?: string;
  cpf?: string;
}) {
  if (typeof window === 'undefined' || !window.ttq) return;

  const identifyData: {
    email?: string;
    phone_number?: string;
    external_id?: string;
  } = {};

  if (data.email) {
    identifyData.email = await sha256(data.email);
  }

  if (data.phone) {
    // Remove formatting from phone
    const cleanPhone = data.phone.replace(/\D/g, '');
    identifyData.phone_number = await sha256(cleanPhone);
  }

  if (data.cpf) {
    // Remove formatting from CPF
    const cleanCpf = data.cpf.replace(/\D/g, '');
    identifyData.external_id = await sha256(cleanCpf);
  }

  if (Object.keys(identifyData).length > 0) {
    window.ttq.identify(identifyData);
  }
}

// Track ViewContent event
export function trackViewContent(data: {
  contentId: string;
  contentName: string;
  value?: number;
}) {
  if (typeof window === 'undefined' || !window.ttq) return;

  window.ttq.track('ViewContent', {
    contents: [
      {
        content_id: data.contentId,
        content_type: 'product',
        content_name: data.contentName,
      },
    ],
    value: data.value || 0,
    currency: 'BRL',
  });
}

// Track CompleteRegistration event (CPF validated)
export function trackCompleteRegistration(data: {
  contentId: string;
  contentName: string;
}) {
  if (typeof window === 'undefined' || !window.ttq) return;

  window.ttq.track('CompleteRegistration', {
    contents: [
      {
        content_id: data.contentId,
        content_type: 'product',
        content_name: data.contentName,
      },
    ],
    value: 0,
    currency: 'BRL',
  });
}

// Track AddPaymentInfo event (PIX submitted)
export function trackAddPaymentInfo(data: {
  contentId: string;
  contentName: string;
  pixType: string;
}) {
  if (typeof window === 'undefined' || !window.ttq) return;

  window.ttq.track('AddPaymentInfo', {
    contents: [
      {
        content_id: data.contentId,
        content_type: 'product',
        content_name: data.contentName,
      },
    ],
    value: 0,
    currency: 'BRL',
  });
}

// Track InitiateCheckout event (proposals shown)
export function trackInitiateCheckout(data: {
  contentId: string;
  contentName: string;
  value: number;
}) {
  if (typeof window === 'undefined' || !window.ttq) return;

  window.ttq.track('InitiateCheckout', {
    contents: [
      {
        content_id: data.contentId,
        content_type: 'product',
        content_name: data.contentName,
      },
    ],
    value: data.value,
    currency: 'BRL',
  });
}

// Track PlaceAnOrder event (proposal selected)
export function trackPlaceAnOrder(data: {
  contentId: string;
  contentName: string;
  value: number;
  bank: string;
}) {
  if (typeof window === 'undefined' || !window.ttq) return;

  window.ttq.track('PlaceAnOrder', {
    contents: [
      {
        content_id: data.contentId,
        content_type: 'product',
        content_name: data.contentName,
      },
    ],
    value: data.value,
    currency: 'BRL',
  });
}

// Track Purchase event (contract finalized)
export function trackPurchase(data: {
  contentId: string;
  contentName: string;
  value: number;
  bank: string;
}) {
  if (typeof window === 'undefined' || !window.ttq) return;

  window.ttq.track('Purchase', {
    contents: [
      {
        content_id: data.contentId,
        content_type: 'product',
        content_name: data.contentName,
      },
    ],
    value: data.value,
    currency: 'BRL',
  });
}
