import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuthorizationStepProps {
  onNext: () => void;
  onBack: () => void;
  cpf: string;
}

export const AuthorizationStep = ({ onNext, onBack, cpf }: AuthorizationStepProps) => {
  const [accepted, setAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAccept = () => {
    setAccepted(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accepted) return;

    setIsLoading(true);

    try {
      // Envia webhook de autorização
      const response = await fetch("https://webhook.vpslegaleviver.shop/webhook/permissao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event: "authorization_accepted",
          timestamp: new Date().toISOString(),
          data: {
            accepted: true,
            cpf: cpf,
          }
        }),
      });

      if (!response.ok) {
        throw new Error("Falha ao enviar confirmação");
      }

      console.log("Webhook de autorização enviado com sucesso");
      onNext();
    } catch (error) {
      console.error("Erro ao enviar webhook:", error);
      toast({
        title: "Erro ao processar autorização",
        description: "Por favor, tente novamente",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatCPF = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 scale-[0.8] md:scale-100 origin-top">
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
            <Shield className="w-8 h-8 md:w-12 md:h-12 text-secondary animate-pulse" strokeWidth={2.5} />
          </div>
        </div>
        <h2 className="text-lg md:text-2xl font-bold mb-1 md:mb-2">Autorização de Consulta</h2>
        <p className="text-sm md:text-base text-muted-foreground">
          Para continuar, precisamos que você autorize a consulta de dados. 🔒
        </p>
      </div>

      <div className="space-y-3 md:space-y-6">
        <div className="bg-card rounded-lg p-3 md:p-6 shadow-sm border space-y-2 md:space-y-4">
          <p className="text-sm md:text-base font-medium">Ao autorizar, você:</p>
          
          <div className="space-y-2 md:space-y-3 text-xs md:text-sm text-muted-foreground">
            <p className="flex gap-2">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-secondary mt-1 md:mt-1.5 flex-shrink-0"></span>
              <span>
                concorda que seus dados serão tratados conforme a Política de
                Privacidade dos bancos/fintech;
              </span>
            </p>
            <p className="flex gap-2">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-secondary mt-1 md:mt-1.5 flex-shrink-0"></span>
              <span>
                permite que os bancos/fintech consultem as informações no Sistema
                de Informações de Crédito do Banco Central;
              </span>
            </p>
            <p className="flex gap-2">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-secondary mt-1 md:mt-1.5 flex-shrink-0"></span>
              <span>
                autoriza os bancos/fintech a consultar informações dos seus
                contratos de trabalho.
              </span>
            </p>
          </div>

          <div className="pt-2 md:pt-4 border-t">
            <p className="text-[10px] md:text-xs text-muted-foreground">
              E fica ciente que nosso atendimento segue todas as regras da Lei
              Geral de Proteção de Dados (LGPD).
            </p>
          </div>
        </div>

        {!accepted ? (
          <div className="flex gap-3">
            <Button type="button" variant="outline" size="lg" onClick={onBack} className="flex-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <Button
              type="button"
              variant="default"
              size="lg"
              onClick={handleAccept}
              className="flex-1 bg-muted hover:bg-secondary hover:text-secondary-foreground transition-all"
            >
              Selecionar
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex gap-3">
              <Button type="button" variant="outline" size="lg" onClick={onBack} className="flex-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <Button
                type="submit"
                variant="secondary"
                size="lg"
                disabled={isLoading}
                className="flex-1 bg-secondary text-secondary-foreground shadow-lg"
              >
                {isLoading ? "Processando..." : "Continuar"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
