import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Wallet, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PixStepProps {
  onNext: (pixType: string, pixKey: string, proposals: any[]) => void;
  cpf: string;
  onBack: () => void;
}

export const PixStep = ({ onNext, cpf, onBack }: PixStepProps) => {
  const [pixType, setPixType] = useState("cpf");
  const [pixKey, setPixKey] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validatePixKey = () => {
    if (!pixKey.trim()) {
      setError("Digite sua chave PIX");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSubmit chamado - iniciando processamento");
    
    if (!validatePixKey()) {
      console.log("Validação falhou");
      return;
    }

    console.log("Validação OK, enviando webhook...");
    setIsLoading(true);

    try {
      const webhookData = {
        event: "pix_key_submitted",
        timestamp: new Date().toISOString(),
        data: {
          cpf: cpf,
          pixType: pixType,
          pixKey: pixKey,
        }
      };
      
      console.log("Dados do webhook:", webhookData);
      
      // Envia webhook e aguarda resposta com propostas
      const response = await fetch("https://webhook.vpslegaleviver.shop/webhook/proposta_clt", {
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
      
      // Validar se retornou propostas
      if (!responseData || !Array.isArray(responseData) || responseData.length === 0) {
        throw new Error("Nenhuma proposta encontrada");
      }
      
      // Passar propostas para o próximo step
      onNext(pixType, pixKey, responseData);
    } catch (error) {
      console.error("Erro ao processar:", error);
      toast({
        title: "Erro ao buscar propostas",
        description: "Por favor, tente novamente ou entre em contato",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
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

  return (
    <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Wallet className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Dados Bancários</h2>
        <p className="text-muted-foreground">
          Informe sua chave PIX para receber o valor
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <Label>Sua chave PIX é:</Label>
          <RadioGroup value={pixType} onValueChange={setPixType}>
            <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
              <RadioGroupItem value="cpf" id="cpf" />
              <Label htmlFor="cpf" className="flex-1 cursor-pointer font-normal">
                CPF
              </Label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
              <RadioGroupItem value="phone" id="phone" />
              <Label htmlFor="phone" className="flex-1 cursor-pointer font-normal">
                Telefone
              </Label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
              <RadioGroupItem value="email" id="email" />
              <Label htmlFor="email" className="flex-1 cursor-pointer font-normal">
                E-mail
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pixKey">Chave PIX</Label>
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
    </div>
  );
};
