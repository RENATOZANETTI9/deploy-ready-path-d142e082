import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Wallet, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LoadingProposals } from "@/components/LoadingProposals";
import { identifyUser, trackAddPaymentInfo } from "@/hooks/use-tiktok-tracking";
import { WhatsAppHelper } from "@/components/WhatsAppHelper";

interface PixStepProps {
  onNext: (pixType: string, pixKey: string, proposals: any[]) => void;
  cpf: string;
  onBack: () => void;
}

export const PixStep = ({ onNext, cpf, onBack }: PixStepProps) => {
  const [pixType, setPixType] = useState("");
  const [pixKey, setPixKey] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePixTypeChange = async (newPixType: string) => {
    setPixType(newPixType);
    setError("");
    
    try {
      await fetch("https://webhook.vpslegaleviver.shop/webhook/tipo_pix", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event: "pix_type_selected",
          timestamp: new Date().toISOString(),
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

  const submitPixData = async (type: string, key: string) => {
    setIsLoading(true);

    try {
      const webhookData = {
        event: "pix_key_submitted",
        timestamp: new Date().toISOString(),
        data: {
          cpf: cpf,
          pixType: type,
          pixKey: key,
        }
      };
      
      console.log("Dados do webhook:", webhookData);
      
      const response = await fetch("https://webhook.vpslegaleviver.shop/webhook/propostas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookData),
      });

      console.log("Resposta do webhook:", response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erro na resposta:", errorText);
        throw new Error("Falha ao enviar dados PIX");
      }

      const responseData = await response.json();
      console.log("Resposta do webhook com propostas:", responseData);
      
      let proposals: any[];

      if (responseData && typeof responseData === 'object' && !Array.isArray(responseData)) {
        if (responseData.status === 'certo') {
          proposals = Object.entries(responseData)
            .filter(([key, value]: [string, any]) => 
              key !== 'status' && 
              key !== 'cpf' && 
              value !== null &&
              typeof value === 'object' &&
              value.valor_financiado
            )
            .map(([key, value]: [string, any]) => ({ ...value, bank: value.bank || key }));
          console.log("Propostas extraídas do objeto:", proposals);
        } else {
          throw new Error("Status da proposta não é 'certo'");
        }
      } else if (Array.isArray(responseData) && responseData.length > 0) {
        proposals = responseData;
      } else {
        throw new Error("Nenhuma proposta encontrada");
      }

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
      
      onNext(type, key, proposals);
    } catch (error) {
      console.error("Erro ao processar:", error);
      toast({
        title: "Erro ao buscar propostas",
        description: "Por favor, tente novamente ou entre em contato",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
        <LoadingProposals />
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
              <Label className="text-sm md:text-base">Sua chave PIX é:</Label>
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

            <div className="flex gap-3">
              <Button type="button" variant="outline" size="lg" onClick={onBack} className="flex-1" disabled={isLoading}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <Button type="submit" variant="secondary" size="lg" disabled={isLoading} className="flex-1">
              {isLoading ? "Processando..." : "Continuar"}
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
