import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";

interface AuthorizationStepProps {
  onNext: () => void;
}

export const AuthorizationStep = ({ onNext }: AuthorizationStepProps) => {
  const [accepted, setAccepted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accepted) {
      onNext();
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
              <span className="text-primary font-semibold">(i)</span>
              <span>
                concorda que seus dados serão tratados conforme a Política de
                Privacidade dos bancos/fintech;
              </span>
            </p>
            <p className="flex gap-2">
              <span className="text-primary font-semibold">(ii)</span>
              <span>
                permite que os bancos/fintech consultem as informações no Sistema
                de Informações de Crédito do Banco Central;
              </span>
            </p>
            <p className="flex gap-2">
              <span className="text-primary font-semibold">(iii)</span>
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

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={!accepted}
        >
          Autorizo e Continuar
        </Button>
      </form>
    </div>
  );
};
