import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Lock, ArrowLeft, ArrowRight } from "lucide-react";
import { Confetti } from "@/components/Confetti";
import { identifyUser, trackCompleteRegistration } from "@/hooks/use-tiktok-tracking";
import { WhatsAppHelper } from "@/components/WhatsAppHelper";
import { getUtmData } from "@/hooks/use-utm-tracking";

interface CpfStepProps {
  onNext: (cpf: string) => void;
  onBack: () => void;
}

export const CpfStep = ({ onNext, onBack }: CpfStepProps) => {
  const [cpf, setCpf] = useState("");
  const [error, setError] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [showSuccess, setShowSuccess] = useState(false);

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.slice(0, 11);
  };

  const validateCPF = (cpf: string) => {
    if (cpf.length !== 11) {
      setError("CPF deve conter 11 dígitos");
      return false;
    }
    setError("");
    return true;
  };

  useEffect(() => {
    if (isValidating && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isValidating && countdown === 0) {
      validateCpfWithBackend();
    }
  }, [isValidating, countdown]);

  const getOrigem = (utmSource: string | null | undefined): string => {
    if (!utmSource) return "SITE";
    const source = utmSource.toLowerCase();
    if (source === "tiktok") return "TIK TOK";
    if (source === "instagram") return "INSTAGRAM";
    if (source === "manychat") return "MANY CHAT";
    return "SITE";
  };

  const validateCpfWithBackend = async () => {
    try {
      const utmData = getUtmData();
      
      const response = await fetch('https://webhook.vpslegaleviver.shop/webhook/nova_vida', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cpf: cpf,
          origem: getOrigem(utmData?.utm_source),
          utm_source: utmData?.utm_source || null,
          utm_medium: utmData?.utm_medium || null,
          utm_campaign: utmData?.utm_campaign || null,
          utm_content: utmData?.utm_content || null
        }),
      });

      const data = await response.json();

      const resposta = data[0]?.resposta?.toLowerCase?.() || "";
      
      if (resposta === "existe") {
        // TikTok: Identify user and track registration
        await identifyUser({ cpf });
        trackCompleteRegistration({
          contentId: 'cpf_validation',
          contentName: 'CPF Validado',
        });
        
        setShowSuccess(true);
        setTimeout(() => {
          onNext(cpf);
        }, 2500);
      } else if (resposta.includes("consultado")) {
        setError("Este CPF já foi consultado anteriormente. Não é possível realizar uma nova consulta. Entraremos em contato em breve!");
        setIsValidating(false);
        setCountdown(6);
      } else {
        setError("CPF inválido. Por favor, verifique os dados e tente novamente.");
        setIsValidating(false);
        setCountdown(6);
      }
    } catch (err) {
      setError("Erro ao validar CPF. Por favor, tente novamente.");
      setIsValidating(false);
      setCountdown(6);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateCPF(cpf)) {
      setError("");
      setIsValidating(true);
      setCountdown(6);
    }
  };

  return (
    <>
      {showSuccess && <Confetti />}
      <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 scale-[0.8] md:scale-100 origin-top">
      {showSuccess ? (
          <div className="text-center space-y-3 md:space-y-6 animate-in fade-in scale-in duration-500">
            <div className="relative inline-flex items-center justify-center w-16 h-16 md:w-24 md:h-24 mb-2 md:mb-4">
              <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" />
              <div className="relative flex items-center justify-center w-16 h-16 md:w-24 md:h-24 rounded-full bg-green-500/10">
                <span className="text-4xl md:text-6xl animate-bounce">🎉</span>
              </div>
            </div>
            
            <h2 className="text-xl md:text-3xl font-bold text-green-600 dark:text-green-400">
              CPF Validado!
            </h2>
            
            <p className="text-sm md:text-lg text-muted-foreground">
              Ótimas notícias! Vamos continuar...
            </p>
            
            <div className="flex items-center justify-center gap-2 md:gap-3">
              <span className="text-2xl md:text-4xl animate-bounce" style={{ animationDelay: "0ms" }}>✨</span>
              <span className="text-2xl md:text-4xl animate-bounce" style={{ animationDelay: "100ms" }}>🎊</span>
              <span className="text-2xl md:text-4xl animate-bounce" style={{ animationDelay: "200ms" }}>✨</span>
            </div>
          </div>
        ) : isValidating ? (
        <div className="text-center space-y-3 md:space-y-6">
          <div className="inline-flex items-center justify-center w-14 h-14 md:w-20 md:h-20 rounded-full bg-primary/10 mb-2 md:mb-4 animate-pulse">
            <Loader2 className="w-7 h-7 md:w-10 md:h-10 text-primary animate-spin" />
          </div>
          <h2 className="text-lg md:text-2xl font-bold">Validando seu CPF...</h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Aguarde enquanto verificamos seus dados
          </p>
          {/* Countdown */}
          <div className="mb-3 md:mb-6 p-4 md:p-8 bg-muted/30 rounded-lg">
            <div className="text-4xl md:text-6xl font-bold text-secondary mb-2">{countdown}</div>
            <p className="text-sm md:text-base text-muted-foreground">Aguarde, estamos finalizando...</p>
          </div>
          <div className="mt-3 md:mt-6 flex items-center justify-center gap-2">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      ) : (
        <>
      <div className="text-center mb-4 md:mb-8">
        <div className="relative inline-flex items-center justify-center w-16 h-16 md:w-24 md:h-24 mb-2 md:mb-4">
          <div className="absolute inset-0 rounded-full bg-secondary/20 animate-pulse" />
          <div className="absolute inset-0 rounded-full bg-secondary/10 animate-ping" />
          <div className="relative flex items-center justify-center w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-secondary/20 to-secondary/10 shadow-lg">
            <Lock className="w-8 h-8 md:w-12 md:h-12 text-secondary animate-pulse" strokeWidth={2.5} />
          </div>
        </div>
            <h2 className="text-lg md:text-2xl font-bold mb-1 md:mb-2">Vamos começar</h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Para iniciar, preciso apenas do seu CPF:
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                type="text"
                inputMode="numeric"
                placeholder="Digite apenas números (ex: 12345678900)"
                value={cpf}
                onChange={(e) => {
                  const formatted = formatCPF(e.target.value);
                  setCpf(formatted);
                  if (error) setError("");
                }}
                className={error ? "border-destructive" : ""}
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
              <p className="text-xs text-muted-foreground">
                Digite apenas números, sem pontos ou traços
              </p>
            </div>

        <div className="flex flex-col gap-3">
          <div className="relative inline-block w-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-secondary via-[hsl(15,100%,50%)] to-secondary rounded-2xl blur-md opacity-60 animate-pulse" />
            <Button type="submit" size="lg" className="relative group w-full px-8 py-5 md:py-6 text-base md:text-lg font-black uppercase tracking-wide bg-gradient-to-r from-secondary to-[hsl(15,100%,50%)] hover:from-secondary/90 hover:to-[hsl(15,100%,45%)] text-secondary-foreground rounded-2xl shadow-[0_0_30px_hsl(25,100%,55%,0.5)] hover:shadow-[0_0_50px_hsl(25,100%,55%,0.7)] transition-all duration-300 hover:scale-105 border-2 border-secondary/50">
              ✨ Continuar
              <ArrowRight className="!size-5 md:!size-6 ml-2 transition-transform group-hover:translate-x-2 animate-bounce" />
            </Button>
          </div>
          <Button type="button" variant="ghost" size="sm" onClick={onBack} className="self-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Voltar
          </Button>
        </div>
          </form>
          
          <div className="mt-6 text-center">
            <WhatsAppHelper />
          </div>
        </>
        )}
      </div>
    </>
  );
};
