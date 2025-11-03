import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Shield className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Autorização de Consulta</h2>
        <p className="text-muted-foreground">
          Para continuar, precisamos que você autorize a consulta de dados. 🔒
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-card rounded-lg p-6 shadow-sm border space-y-4">
          <p className="font-medium">Ao autorizar, você:</p>
          
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

        <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg">
          <Checkbox
            id="authorization"
            checked={accepted}
            onCheckedChange={(checked) => setAccepted(checked as boolean)}
            className="mt-1"
          />
          <Label
            htmlFor="authorization"
            className="text-sm font-medium leading-relaxed cursor-pointer"
          >
            Li e autorizo a consulta de dados conforme descrito acima
          </Label>
        </div>

        <div className="flex gap-3">
          <Button type="button" variant="outline" size="lg" onClick={onBack} className="flex-1">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <Button
            type="submit"
            variant="secondary"
            size="lg"
            disabled={!accepted || isLoading}
            className="flex-1"
          >
            {isLoading ? "Processando..." : "Autorizo e Continuar"}
          </Button>
        </div>
      </form>
    </div>
  );
};
