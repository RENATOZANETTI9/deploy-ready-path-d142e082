import { useState, useEffect, useRef } from "react";
import { parseWebhookResponse } from "@/lib/proposalParser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Wallet, ArrowLeft, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LoadingProposals } from "@/components/LoadingProposals";
import { identifyUser, trackAddPaymentInfo } from "@/hooks/use-tiktok-tracking";
import { WhatsAppHelper } from "@/components/WhatsAppHelper";
import { getUtmData } from "@/hooks/use-utm-tracking";

interface PixStepProps {
  onNext: (pixType: string, pixKey: string, proposals: any[]) => void;
  cpf: string;
  onBack: () => void;
}

const TIMEOUT_MS = 90000; // 1 minuto e 30 segundos

export const PixStep = ({ onNext, cpf, onBack }: PixStepProps) => {
  const [pixType, setPixType] = useState("");
  const [pixKey, setPixKey] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const { toast } = useToast();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handlePixTypeChange = async (newPixType: string) => {
    setPixType(newPixType);
    setError("");
    
    const utmData = getUtmData();
    
    try {
      await fetch("https://webhook.vpslegaleviver.shop/webhook/tipo_pix", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event: "pix_type_selected",
          timestamp: new Date().toISOString(),
          origem: utmData,
          data: {
            cpf: cpf,
            pixType: newPixType,
          }
        }),
      });
    } catch (error) {
      console.error("Erro ao enviar tipo PIX:", error);
    }
    
    // Se for CPF, vai direto para a próxima etapa
    if (newPixType === "cpf") {
      setPixKey(cpf);
      await submitPixData(newPixType, cpf);
    } else {
      setPixKey("");
    }
  };

  // Verifica se estamos no período de fechamento da Dataprev (20 a 24)
  // Desabilitado temporariamente - sempre retorna false para seguir fluxo normal
  const isDataprevClosingPeriod = () => {
    return false;
  };

  const submitPixData = async (type: string, key: string) => {
    setIsLoading(true);
    setIsTimedOut(false);

    // Se estamos no período de fechamento da Dataprev, não fazer chamada ao webhook
    // Apenas mostrar a tela de coleta de telefone
    if (isDataprevClosingPeriod()) {
      console.log("Período de fechamento Dataprev - pulando chamada de propostas");
      return; // Não faz nada, apenas mostra o LoadingProposals com o card Dataprev
    }

    // Criar AbortController para cancelar a requisição se necessário
    abortControllerRef.current = new AbortController();

    // Iniciar timer de 1:30
    timeoutRef.current = setTimeout(() => {
      console.log("Timeout de 1:30 atingido");
      setIsTimedOut(true);
      // Cancelar a requisição em andamento
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    }, TIMEOUT_MS);

    try {
      const webhookData = {
        data: {
          cpf: cpf,
          pixType: type,
          pixKey: key,
        }
      };
      
      console.log("Dados do webhook propostas:", webhookData);
      
      const response = await fetch("https://webhook.vpslegaleviver.shop/webhook/propostas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookData),
        signal: abortControllerRef.current.signal,
      });

      // Limpar timeout se a resposta chegou a tempo
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      console.log("Resposta do webhook:", response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erro na resposta:", errorText);
        throw new Error("Falha ao enviar dados PIX");
      }

      const responseData = await response.json();
      console.log("Resposta do webhook com propostas:", responseData);
      
      // Checar se não há bancos liberados
      if (Array.isArray(responseData) && responseData[0]?.response && 
          responseData[0].response.toLowerCase().includes("nenhum banco liberado")) {
        console.log("Nenhum banco liberado - indo para fallback");
        setIsTimedOut(true);
        return;
      }

      // Usar o parser atualizado
      const parsedProposals = parseWebhookResponse(responseData);
      
      if (parsedProposals.length === 0) {
        console.log("Nenhuma proposta válida encontrada - indo para fallback");
        setIsTimedOut(true);
        return;
      }

      // Converter para o formato esperado pelo onNext
      const proposals = parsedProposals;

      if (proposals.length === 0) {
        throw new Error("Nenhuma proposta encontrada");
      }
      
      const identifyData: { cpf: string; email?: string; phone?: string } = { cpf };
      if (type === 'email') {
        identifyData.email = key;
      } else if (type === 'phone') {
        identifyData.phone = key;
      }
      await identifyUser(identifyData);
      
      trackAddPaymentInfo({
        contentId: 'pix_submitted',
        contentName: 'PIX Informado',
        pixType: type,
      });
      
      setIsLoading(false);
      onNext(type, key, proposals);
    } catch (error: any) {
      // Limpar timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      // Se foi abortado pelo timeout, não mostrar erro (já está mostrando tela de WhatsApp)
      if (error.name === 'AbortError') {
        console.log("Requisição cancelada por timeout");
        return;
      }

      console.error("Erro ao processar:", error);
      
      // Se ainda não deu timeout, mostrar a tela de coleta de WhatsApp também
      setIsTimedOut(true);
    }
  };

  const handleWhatsAppSubmit = (phone: string) => {
    console.log("WhatsApp coletado:", phone);
    // O componente LoadingProposals já cuida do redirecionamento
  };

  const validatePixKey = () => {
    if (!pixType) {
      setError("Selecione o tipo de chave PIX");
      return false;
    }
    // Para CPF, o valor já está preenchido automaticamente
    if (pixType !== "cpf" && !pixKey.trim()) {
      setError("Digite sua chave PIX");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePixKey()) {
      return;
    }

    await submitPixData(pixType, pixKey);
  };

  const getPlaceholder = () => {
    switch (pixType) {
      case "cpf":
        return "Digite seu CPF (apenas números)";
      case "phone":
        return "Digite seu telefone com DDD";
      case "email":
        return "Digite seu e-mail";
      default:
        return "";
    }
  };

  const formatCPF = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  return (
    <>
      {isLoading ? (
        <LoadingProposals 
          isTimedOut={isTimedOut}
          cpf={cpf}
          pixType={pixType}
          pixKey={pixKey}
          onWhatsAppSubmit={handleWhatsAppSubmit}
        />
      ) : (
        <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 scale-[0.8] md:scale-100 origin-top">
          {/* Exibição do CPF */}
          <div className="bg-muted/50 rounded-lg p-3 border mb-4 text-center">
            <span className="text-sm text-muted-foreground">CPF: </span>
            <span className="text-sm font-semibold">{formatCPF(cpf)}</span>
          </div>

          <div className="text-center mb-4 md:mb-8">
            <div className="relative inline-flex items-center justify-center w-16 h-16 md:w-24 md:h-24 mb-2 md:mb-4">
              <div className="absolute inset-0 rounded-full bg-secondary/20 animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-secondary/10 animate-ping" />
              <div className="relative flex items-center justify-center w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-secondary/20 to-secondary/10 shadow-lg">
                <Wallet className="w-8 h-8 md:w-12 md:h-12 text-secondary animate-pulse" strokeWidth={2.5} />
              </div>
            </div>
            <h2 className="text-lg md:text-2xl font-bold mb-1 md:mb-2">Informe sua chave Pix</h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Usaremos sua chave Pix para confirmar sua identidade e fazer a simulação, respeitando a lei de proteção de dados
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-6">
            <div className="space-y-2 md:space-y-4">
              <Label className="text-sm md:text-base font-semibold text-white bg-secondary border border-secondary/80 rounded-lg px-4 py-2 inline-block">Escolha sua chave PIX:</Label>
              <RadioGroup value={pixType} onValueChange={handlePixTypeChange}>
                <div 
                  className={`flex items-center space-x-2 md:space-x-3 p-2 md:p-3 rounded-lg border transition-all cursor-pointer ${
                    pixType === "cpf" 
                      ? "bg-secondary/20 border-secondary text-secondary-foreground" 
                      : "hover:bg-muted/50"
                  }`}
                >
                  <RadioGroupItem value="cpf" id="cpf" className="data-[state=checked]:border-secondary data-[state=checked]:text-secondary" />
                  <Label htmlFor="cpf" className={`flex-1 cursor-pointer font-normal text-sm md:text-base ${pixType === "cpf" ? "font-semibold text-secondary" : ""}`}>
                    CPF
                  </Label>
                </div>
                <div 
                  className={`flex items-center space-x-2 md:space-x-3 p-2 md:p-3 rounded-lg border transition-all cursor-pointer ${
                    pixType === "phone" 
                      ? "bg-secondary/20 border-secondary text-secondary-foreground" 
                      : "hover:bg-muted/50"
                  }`}
                >
                  <RadioGroupItem value="phone" id="phone" className="data-[state=checked]:border-secondary data-[state=checked]:text-secondary" />
                  <Label htmlFor="phone" className={`flex-1 cursor-pointer font-normal text-sm md:text-base ${pixType === "phone" ? "font-semibold text-secondary" : ""}`}>
                    Telefone
                  </Label>
                </div>
                <div 
                  className={`flex items-center space-x-2 md:space-x-3 p-2 md:p-3 rounded-lg border transition-all cursor-pointer ${
                    pixType === "email" 
                      ? "bg-secondary/20 border-secondary text-secondary-foreground" 
                      : "hover:bg-muted/50"
                  }`}
                >
                  <RadioGroupItem value="email" id="email" className="data-[state=checked]:border-secondary data-[state=checked]:text-secondary" />
                  <Label htmlFor="email" className={`flex-1 cursor-pointer font-normal text-sm md:text-base ${pixType === "email" ? "font-semibold text-secondary" : ""}`}>
                    E-mail
                  </Label>
                </div>
              </RadioGroup>
            </div>


            {/* Campo de input apenas para Telefone e E-mail */}
            {(pixType === "phone" || pixType === "email") && (
              <div className="space-y-1 md:space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <Label htmlFor="pixKey" className="text-sm md:text-base">Chave PIX</Label>
                <Input
                  id="pixKey"
                  type="text"
                  placeholder={getPlaceholder()}
                  value={pixKey}
                  onChange={(e) => {
                    setPixKey(e.target.value);
                    if (error) setError("");
                  }}
                  className={error ? "border-destructive" : ""}
                />
                {error && <p className="text-sm text-destructive">{error}</p>}
                <p className="text-xs text-muted-foreground">
                  Digite sua chave conforme o tipo selecionado
                </p>
              </div>
            )}

            {error && pixType === "" && <p className="text-sm text-destructive">{error}</p>}

            <div className="flex flex-col gap-3">
              <div className="relative inline-block w-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-secondary via-[hsl(15,100%,50%)] to-secondary rounded-2xl blur-md opacity-60 animate-pulse" />
                <Button type="submit" size="lg" disabled={isLoading} className="relative group w-full px-8 py-5 md:py-6 text-base md:text-lg font-black uppercase tracking-wide bg-gradient-to-r from-secondary to-[hsl(15,100%,50%)] hover:from-secondary/90 hover:to-[hsl(15,100%,45%)] text-secondary-foreground rounded-2xl shadow-[0_0_30px_hsl(25,100%,55%,0.5)] hover:shadow-[0_0_50px_hsl(25,100%,55%,0.7)] transition-all duration-300 hover:scale-105 border-2 border-secondary/50 disabled:opacity-50">
                  {isLoading ? "Processando..." : "✨ Continuar"}
                  <ArrowRight className="!size-5 md:!size-6 ml-2 transition-transform group-hover:translate-x-2 animate-bounce" />
                </Button>
              </div>
              <Button type="button" variant="ghost" size="sm" onClick={onBack} className="self-center text-muted-foreground hover:text-foreground" disabled={isLoading}>
                <ArrowLeft className="w-4 h-4 mr-1" />
                Voltar
              </Button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <WhatsAppHelper />
          </div>
        </div>
      )}
    </>
  );
};
