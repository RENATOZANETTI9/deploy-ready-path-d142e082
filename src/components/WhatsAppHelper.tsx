import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WhatsAppHelperProps {
  delay?: number;
  phoneNumber?: string;
  message?: string;
}

export const WhatsAppHelper = ({ 
  delay = 15000,
  phoneNumber = "5511999999999",
  message = "Olá, preciso de ajuda com minha proposta"
}: WhatsAppHelperProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className="animate-fade-in">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleClick}
        className="text-muted-foreground hover:text-primary text-xs gap-1.5"
      >
        <MessageCircle className="w-3.5 h-3.5" />
        Se preferir, fale conosco pelo WhatsApp
      </Button>
    </div>
  );
};
