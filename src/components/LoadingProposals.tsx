import { useState, useEffect, useRef } from "react";
import { MessageCircle, AlertTriangle, Phone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUtmData } from "@/hooks/use-utm-tracking";


const isDataprevClosingPeriod = () => {
  // Desabilitado temporariamente - sempre retorna false para seguir fluxo normal
  return false;
};

interface DataprevMessageProps {
  cpf: string;
  pixType: string;
  pixKey: string;
  onSubmitSuccess: () => void;
}

const formatPhoneDataprev = (value: string) => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  if (numbers.length <= 11) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
};

const DataprevMessage = ({ cpf, pixType, pixKey, onSubmitSuccess }: DataprevMessageProps) => {
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    const cleanNumber = phone.replace(/\D/g, '');
    if (cleanNumber.length < 10) return;

    setIsSubmitting(true);

    try {
      await fetch("https://webhook.vpslegaleviver.shop/webhook/salvar_wpp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cpf,
          whatsapp: cleanNumber
        })
      });

      onSubmitSuccess();
    } catch (error) {
      console.error("Erro ao enviar telefone:", error);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Card de atenção */}
        <div className="p-4 md:p-6 bg-card border-2 border-secondary/30 rounded-xl shadow-lg">
        <div className="flex items-start gap-3 mb-5">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary/15 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-secondary" />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-foreground text-base md:text-lg mb-2">Atenção</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A Dataprev está no período de fechamento de folha (20 a 24) e pode demorar para retornar a liberação de margem.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mt-2">
              Para não te deixar esperando, deixe seu telefone (com DDD) aqui embaixo que <strong>a partir do dia 24 a gente te chama</strong> com as novidades dos valores liberados.
            </p>
          </div>
        </div>
        
        {/* Campo de telefone chamativo */}
        <div className="bg-popover rounded-lg p-4 border-2 border-secondary shadow-md animate-pulse-subtle">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
              <Phone className="w-4 h-4 text-secondary" />
            </div>
            <p className="text-sm font-medium text-success">
              Digite seu WhatsApp no campo abaixo
            </p>
          </div>
          <Input
            id="dataprev-phone"
            type="text"
            inputMode="numeric"
            placeholder="(00) 00000-0000"
            value={phone}
            onChange={(e) => setPhone(formatPhoneDataprev(e.target.value))}
            className="text-center text-lg h-14 font-semibold border-2 border-secondary/50 focus:border-secondary bg-secondary/5 text-popover-foreground caret-popover-foreground"
            maxLength={15}
            autoFocus />
          
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Prometemos ser rápidos: é só pra te retornar sobre essa avaliação. Sem spam.
          </p>
        </div>
        
        <Button
          onClick={handleSubmit}
          variant="secondary"
          size="lg"
          className="w-full mt-4 gap-2 h-12 text-base font-semibold shadow-lg"
          disabled={phone.replace(/\D/g, '').length < 10 || isSubmitting}>
          
          {isSubmitting ? "Enviando..." : "Enviar"}
        </Button>
      </div>
    </div>);

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
  const [countdown, setCountdown] = useState(10);
  const [countdownDone, setCountdownDone] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showDataprevConfirmation, setShowDataprevConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isClosingPeriod = isDataprevClosingPeriod();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Countdown timer - only when not timed out and not in closing period
  useEffect(() => {
    if (isTimedOut || isClosingPeriod || countdownDone) return;
    if (countdown <= 0) {
      setCountdownDone(true);
      return;
    }
    const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, isTimedOut, isClosingPeriod, countdownDone]);

  const handleWhatsAppSubmit = async () => {
    const cleanNumber = whatsappNumber.replace(/\D/g, '');
    if (cleanNumber.length < 10) return;

    setIsSubmitting(true);

    try {
      await fetch("https://webhook.vpslegaleviver.shop/webhook/salvar_wpp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cpf,
          whatsapp: cleanNumber
        })
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
    window.location.href = '/obrigado';
  };

  // Tela de confirmação após enviar WhatsApp
  if (showConfirmation) {
    return (
      <div className="w-full">
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
            onClick={handleConfirmationClose}>
            
            Entendido
          </Button>
        </div>
      </div>);

  }

  // Tela de coleta de WhatsApp após timeout
  if (isTimedOut) {
    return (
      <div className="w-full">
        <div className="w-full max-w-md mx-auto text-center animate-in fade-in duration-300">
          <div className="relative inline-flex items-center justify-center w-16 h-16 mb-4">
            <div className="absolute inset-0 rounded-full bg-secondary/20 animate-pulse" />
            <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-secondary/30 to-secondary/10">
              <Phone className="w-8 h-8 text-secondary" strokeWidth={2} />
            </div>
          </div>
        
          <h2 className="text-lg font-bold mb-3 text-foreground">
            ⏳ Atualização da sua simulação
          </h2>
        
          <div className="text-muted-foreground text-sm mb-5 leading-relaxed space-y-3">
            <p>
              Sua proposta está sendo analisada para aprovação em <strong className="text-foreground">9 bancos ao mesmo tempo</strong>.<br />
              Alguns retornos podem levar um pouco mais, mas seguimos acompanhando tudo automaticamente.
            </p>
            <p>
              <strong className="text-foreground">Deixe seu WhatsApp</strong><br />
              Assim que finalizarmos a análise, falamos com você em até 24 horas.
            </p>
          </div>
        
          <div className="space-y-2 text-left">
            <Label htmlFor="whatsapp" className="text-sm font-medium">
              Informe seu WhatsApp aqui
            </Label>
            <Input
              id="whatsapp"
              type="tel"
              placeholder="(00) 00000-0000"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(formatPhone(e.target.value))}
              className="text-center text-base h-11"
              maxLength={15} />
            
          </div>
        
          <Button
            size="lg"
            className="w-full mt-4 gap-2 bg-success hover:bg-success/90 text-success-foreground animate-blink"
            onClick={handleWhatsAppSubmit}
            disabled={whatsappNumber.replace(/\D/g, '').length < 10 || isSubmitting}>
            
            <MessageCircle className="w-4 h-4" />
            {isSubmitting ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </div>);

  }

  // Renderização quando é período Dataprev - tela focada apenas no formulário
  if (isClosingPeriod) {
    return (
      <div className="w-full max-w-2xl mx-auto text-center animate-in fade-in duration-500">
        {showDataprevConfirmation ?
        <div className="w-full max-w-md mx-auto p-4 md:p-6 bg-card border border-success/30 rounded-lg text-center">
            <div className="relative inline-flex items-center justify-center w-12 h-12 mb-3">
              <div className="absolute inset-0 rounded-full bg-secondary/20 animate-pulse" />
              <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-secondary/30 to-secondary/10">
                <CheckCircle2 className="w-6 h-6 text-secondary" strokeWidth={2} />
              </div>
            </div>
            <h3 className="font-semibold text-success text-sm md:text-base mb-2">Telefone salvo! 💚</h3>
            <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
              A partir do dia 24 entraremos em contato pelo WhatsApp com as novidades dos valores liberados.
            </p>
          </div> :

        <DataprevMessage
          cpf={cpf}
          pixType={pixType}
          pixKey={pixKey}
          onSubmitSuccess={() => setShowDataprevConfirmation(true)} />

        }
      </div>);

  }

  // If countdown finished and not yet timed out externally, show WhatsApp form
  if (countdownDone && !isTimedOut) {
    return (
      <div className="w-full">
        <div className="w-full max-w-md mx-auto text-center animate-in fade-in duration-300">
          <div className="relative inline-flex items-center justify-center w-16 h-16 mb-4">
            <div className="absolute inset-0 rounded-full bg-secondary/20 animate-pulse" />
            <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-secondary/30 to-secondary/10">
              <MessageCircle className="w-8 h-8 text-secondary" strokeWidth={2} />
            </div>
          </div>
        
          <h2 className="text-sm md:text-base font-semibold text-white bg-secondary border border-secondary/80 rounded-lg px-4 py-2 inline-block mb-3">Monitoramento em tempo real ativado</h2>
        
          <div className="text-muted-foreground text-sm mb-5 leading-relaxed space-y-3">
            <p>
              Sua proposta está sendo analisada para aprovação em <strong className="text-foreground">9 bancos ao mesmo tempo</strong>.<br />
              Alguns retornos podem levar um pouco mais, mas seguimos acompanhando tudo automaticamente.
            </p>
            <p>
              <strong className="text-foreground">Deixe seu WhatsApp</strong><br />
              Assim que finalizarmos a análise, falamos com você em até 24 horas.
            </p>
          </div>
        
          <div className="space-y-2 text-left">
            <Label htmlFor="whatsapp" className="text-sm font-medium">
              Informe seu WhatsApp aqui
            </Label>
            <Input
              id="whatsapp"
              type="tel"
              placeholder="(00) 00000-0000"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(formatPhone(e.target.value))}
              className="text-center text-base h-11"
              maxLength={15} />
            
          </div>
        
          <Button
            size="lg"
            className="w-full mt-4 gap-2 bg-success hover:bg-success/90 text-success-foreground animate-blink"
            onClick={handleWhatsAppSubmit}
            disabled={whatsappNumber.replace(/\D/g, '').length < 10 || isSubmitting}>
            
            <MessageCircle className="w-4 h-4" />
            {isSubmitting ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </div>);

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
      
      {/* Countdown */}
      <div className="mb-3 md:mb-6 p-4 md:p-8 bg-muted/30 rounded-lg">
        <div className="text-4xl md:text-6xl font-bold text-secondary mb-2">{countdown}</div>
        <p className="text-sm md:text-base text-muted-foreground">Aguarde, estamos finalizando...</p>
      </div>
    </div>);

};