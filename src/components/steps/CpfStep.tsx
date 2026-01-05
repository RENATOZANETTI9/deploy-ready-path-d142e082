import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Lock, ArrowLeft } from "lucide-react";
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
  const [countdown, setCountdown] = useState(6);
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

  const validateCpfWithBackend = async () => {
    try {
      const utmData = getUtmData();
      
      const response = await fetch('https://webhook.vpslegaleviver.shop/webhook/nova_vida', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          origem: utmData,
          nodes: [
            {
              parameters: {
                method: "POST",
                url: "https://wsnv.novavidati.com.br/WSLocalizador.asmx/PesquisaAtributosTK",
                sendHeaders: true,
                headerParameters: {
                  parameters: [
                    {
                      name: "Accept",
                      value: "application/xml"
                    }
                  ]
                },
                sendBody: true,
                contentType: "form-urlencoded",
                bodyParameters: {
                  parameters: [
                    {
                      name: "documento",
                      value: cpf
                    },
                    {
                      name: "token",
                      value: "={{ $json.token }}"
                    }
                  ]
                },
                options: {}
              },
              id: "780a1396-b813-426c-83d2-b51ca8c0ea5a",
              name: "HTTP Request",
              type: "n8n-nodes-base.httpRequest",
              typeVersion: 4.2,
              position: [-1200, 192]
            }
          ],
          connections: {
            "HTTP Request": {
              main: [[]]
            }
          },
          pinData: {},
          meta: {
            templateCredsSetupCompleted: true,
            instanceId: "8da124da9390e319ebf6d6e518c7a607dd54130f85103c271531362fdde4ffdd"
          }
        }),
      });

      const data = await response.json();

      if (data[0]?.resposta === "existe") {
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

        <div className="flex gap-3">
          <Button type="button" variant="outline" size="lg" onClick={onBack} className="flex-1">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <Button type="submit" variant="secondary" size="lg" className="flex-1">
            Continuar
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
