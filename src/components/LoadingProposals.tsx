import { useState, useEffect } from "react";
import { TetrisGame } from "./TetrisGame";
import { MessageCircle, AlertTriangle, Phone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUtmData } from "@/hooks/use-utm-tracking";

const isDataprevClosingPeriod = () => {
  const today = new Date();
  const day = today.getDate();
  return day >= 20 && day <= 23;
};

const DataprevMessage = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Olá, gostaria de saber quando a margem será liberada");
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
  };

  return (
    <div className="mb-3 md:mb-6 p-4 md:p-6 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg">
      <div className="flex items-start gap-3 mb-4">
        <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
        <div className="text-left">
          <h3 className="font-semibold text-amber-800 dark:text-amber-400 text-sm md:text-base mb-2">Atenção</h3>
          <p className="text-amber-700 dark:text-amber-300 text-xs md:text-sm leading-relaxed">
            A Dataprev que cuida das liberações de margem (valor que você poderá pagar de parcela), está no período de fechamento de folha e com isso demoram de responder.
          </p>
          <p className="text-amber-700 dark:text-amber-300 text-xs md:text-sm leading-relaxed mt-2">
            Eles ficam até dia 24 de cada mês, chame aqui no WhatsApp que assim que chegar a resposta, te avisaremos.
          </p>
        </div>
      </div>
      <Button
        onClick={handleWhatsAppClick}
        variant="secondary"
        size="sm"
        className="w-full gap-2"
      >
        <MessageCircle className="w-4 h-4" />
        Falar pelo WhatsApp
      </Button>
    </div>
  );
};

interface LoadingProposalsProps {
  isTimedOut?: boolean;
  cpf?: string;
  pixType?: string;
  pixKey?: string;
  onWhatsAppSubmit?: (phone: string) => void;
}

const formatPhone = (value: string) => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  if (numbers.length <= 11) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
};

export const LoadingProposals = ({ 
  isTimedOut = false, 
  cpf = "", 
  pixType = "", 
  pixKey = "",
  onWhatsAppSubmit 
}: LoadingProposalsProps) => {
  const [showGame, setShowGame] = useState(true);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isClosingPeriod = isDataprevClosingPeriod();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleWait = () => {
    setShowGame(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppSubmit = async () => {
    const cleanNumber = whatsappNumber.replace(/\D/g, '');
    if (cleanNumber.length < 10) return;

    setIsSubmitting(true);
    
    try {
      const utmData = getUtmData();
      
      await fetch("https://webhook.vpslegaleviver.shop/webhook/timeout_whatsapp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event: "timeout_whatsapp_collected",
          timestamp: new Date().toISOString(),
          origem: utmData,
          data: {
            cpf,
            pixType,
            pixKey,
            whatsapp: cleanNumber,
          }
        }),
      });
    } catch (error) {
      console.error("Erro ao enviar WhatsApp:", error);
    }

    setIsSubmitting(false);
    setShowConfirmation(true);
    
    if (onWhatsAppSubmit) {
      onWhatsAppSubmit(cleanNumber);
    }
  };

  const handleConfirmationClose = () => {
    window.location.href = '/';
  };

  // Tela de confirmação após enviar WhatsApp
  if (showConfirmation) {
    return (
      <div className="w-full max-w-md mx-auto text-center animate-in fade-in duration-300">
        <div className="relative inline-flex items-center justify-center w-16 h-16 mb-4">
          <div className="absolute inset-0 rounded-full bg-secondary/20 animate-pulse" />
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-secondary/30 to-secondary/10">
            <CheckCircle2 className="w-8 h-8 text-secondary" strokeWidth={2} />
          </div>
        </div>
        
        <h2 className="text-lg font-bold mb-3 text-secondary">Muito obrigado! 💚</h2>
        
        <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
          <p>
            Entraremos em contato em <strong className="text-foreground">no máximo 24 horas</strong> via WhatsApp para te informar as opções disponíveis.
          </p>
          <p>
            Caso não entremos em contato dentro deste período, infelizmente significa que ainda não teremos valores liberados para você.
          </p>
          <p className="text-secondary font-medium">
            Mas fique tranquilo! Faremos de tudo para te dar um retorno positivo.
          </p>
        </div>
        
        <Button 
          variant="secondary" 
          size="lg" 
          className="w-full mt-6"
          onClick={handleConfirmationClose}
        >
          Entendido
        </Button>
      </div>
    );
  }

  // Tela de coleta de WhatsApp após timeout
  if (isTimedOut) {
    return (
      <div className="w-full max-w-md mx-auto text-center animate-in fade-in duration-300">
        <div className="relative inline-flex items-center justify-center w-16 h-16 mb-4">
          <div className="absolute inset-0 rounded-full bg-secondary/20 animate-pulse" />
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-secondary/30 to-secondary/10">
            <Phone className="w-8 h-8 text-secondary" strokeWidth={2} />
          </div>
        </div>
        
        <h2 className="text-lg font-bold mb-3 text-foreground">
          Não vamos deixar você esperando aqui.
        </h2>
        
        <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
          Estamos fazendo o melhor e aguardando a resposta de todos os bancos para trazer pra você a melhor opção dentro dos cinco. 
          Assim que tivermos retorno, <strong className="text-foreground">entraremos em contato pelo WhatsApp</strong>.
        </p>
        
        <div className="space-y-2 text-left">
          <Label htmlFor="whatsapp" className="text-sm font-medium">
            Informe seu WhatsApp
          </Label>
          <Input
            id="whatsapp"
            type="tel"
            placeholder="(00) 00000-0000"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(formatPhone(e.target.value))}
            className="text-center text-base h-11"
            maxLength={15}
          />
        </div>
        
        <Button 
          variant="secondary" 
          size="lg" 
          className="w-full mt-4 gap-2"
          onClick={handleWhatsAppSubmit}
          disabled={whatsappNumber.replace(/\D/g, '').length < 10 || isSubmitting}
        >
          <MessageCircle className="w-4 h-4" />
          {isSubmitting ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto text-center animate-in fade-in duration-500">
      <h2 className="text-lg md:text-2xl font-bold mb-2 md:mb-4">Buscando as melhores propostas</h2>
      
      <div className="space-y-1.5 md:space-y-3 text-muted-foreground mb-3 md:mb-6">
        <div className="flex items-center justify-center gap-2 animate-in fade-in duration-700">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
          <p className="text-xs md:text-base">Analisando seu perfil de crédito</p>
        </div>
        
        <div className="flex items-center justify-center gap-2 animate-in fade-in duration-700 delay-300">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
          <p className="text-xs md:text-base">Consultando instituições financeiras</p>
        </div>
        
        <div className="flex items-center justify-center gap-2 animate-in fade-in duration-700 delay-500">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
          <p className="text-xs md:text-base">Comparando taxas e condições</p>
        </div>
      </div>
      
      {isClosingPeriod ? (
        <DataprevMessage />
      ) : showGame ? (
        <div className="mb-3 md:mb-6 scale-[0.75] md:scale-100 origin-top">
          <TetrisGame key={Date.now()} onWait={handleWait} />
        </div>
      ) : (
        <div className="mb-3 md:mb-6 p-4 md:p-8 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-2 md:mb-4">
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-secondary animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-secondary animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-secondary animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
          <p className="text-sm md:text-base text-muted-foreground">Aguarde, estamos finalizando...</p>
        </div>
      )}
    </div>
  );
};