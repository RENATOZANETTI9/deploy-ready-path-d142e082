const UTM_STORAGE_KEY = 'utm_tracking_data';

interface UtmData {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  referrer: string;
  landing_page: string;
  timestamp: string;
}

export const captureUtmData = (): void => {
  // Só captura se ainda não tiver dados salvos (primeira visita)
  if (sessionStorage.getItem(UTM_STORAGE_KEY)) {
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  
  const utmData: UtmData = {
    utm_source: urlParams.get('utm_source'),
    utm_medium: urlParams.get('utm_medium'),
    utm_campaign: urlParams.get('utm_campaign'),
    utm_content: urlParams.get('utm_content'),
    utm_term: urlParams.get('utm_term'),
    referrer: document.referrer || '',
    landing_page: window.location.href,
    timestamp: new Date().toISOString(),
  };

  sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utmData));
  console.log('📊 UTM data captured:', utmData);
};

export const getUtmData = (): UtmData | null => {
  const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
  if (!stored) {
    return null;
  }
  
  try {
    return JSON.parse(stored) as UtmData;
  } catch {
    return null;
  }
};

export const useUtmTracking = (): void => {
  // Captura UTM data ao montar o componente
  captureUtmData();
};
