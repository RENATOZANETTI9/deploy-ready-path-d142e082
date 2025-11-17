import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuthorizationStepProps {
  onNext: () => void;
  onBack: () => void;
}

export const AuthorizationStep = ({ onNext, onBack }: AuthorizationStepProps) => {
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
      const response = await fetch("https://webhook.vpslegaleviver.shop/webhook/nova_vida", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event: "authorization_accepted",
          timestamp: new Date().toISOString(),
          data: {
            accepted: true,
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

  return (
    <div className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-4 md:mb-8">
        <div className="relative inline-flex items-center justify-center w-12 h-12 md:w-20 md:h-20 mb-2 md:mb-4">
          <div className="absolute inset-0 rounded-full bg-secondary/20 animate-pulse" />
          <div className="absolute inset-0 rounded-full bg-secondary/10 animate-ping" />
          <div className="relative flex items-center justify-center w-12 h-12 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-secondary/20 to-secondary/10 shadow-lg">
            <Shield className="w-6 h-6 md:w-10 md:h-10 text-secondary animate-pulse" strokeWidth={2.5} />
          </div>
        </div>
        <h2 className="text-xl md:text-2xl font-bold mb-2">Autorização de Consulta</h2>
        <p className="text-sm md:text-base text-muted-foreground">
          Para continuar, precisamos que você autorize a consulta de dados. 🔒
        </p>
      </div>

      <div className="space-y-4 md:space-y-6">
        <div className="bg-card rounded-lg p-4 md:p-6 shadow-sm border space-y-3 md:space-y-4">
          <p className="font-medium text-sm md:text-base">Ao autorizar, você:</p>
          
          <div className="space-y-3 text-sm text-muted-foreground">
            <p className="flex gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary mt-1.5 flex-shrink-0"></span>
              <span>
                concorda que seus dados serão tratados conforme a Política de
                Privacidade dos bancos/fintech;
              </span>
            </p>
            <p className="flex gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary mt-1.5 flex-shrink-0"></span>
              <span>
                permite que os bancos/fintech consultem as informações no Sistema
                de Informações de Crédito do Banco Central;
              </span>
            </p>
            <p className="flex gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary mt-1.5 flex-shrink-0"></span>
              <span>
                autoriza os bancos/fintech a consultar informações dos seus
                contratos de trabalho.
              </span>
            </p>
          </div>

          <div className="pt-4 border-t">
            <p className="text-xs text-muted-foreground">
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
