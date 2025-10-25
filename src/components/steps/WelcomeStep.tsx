import { Button } from "@/components/ui/button";
import { Shield, Lock, CheckCircle2, Clock } from "lucide-react";
import logo from "@/assets/logo-legal-e-viver.webp";

interface WelcomeStepProps {
  onStart: () => void;
}

export const WelcomeStep = ({ onStart }: WelcomeStepProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 animate-fade-in">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <img src={logo} alt="Legal é Viver" className="h-24 w-auto" />
      </div>

      {/* Hero Title */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Saque seu FGTS de forma{" "}
          <span className="text-primary">rápida</span> e{" "}
          <span className="text-secondary">segura</span>
        </h2>
        <p className="text-lg text-muted-foreground">
          100% online. Sem custo. Em até 30 minutos.
        </p>
      </div>

      {/* Trust Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border">
          <div className="bg-primary/10 p-2 rounded-full">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Segurança Total</h3>
            <p className="text-sm text-muted-foreground">
              Seus dados são protegidos com criptografia de ponta
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border">
          <div className="bg-secondary/10 p-2 rounded-full">
            <Clock className="h-5 w-5 text-secondary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Rápido e Fácil</h3>
            <p className="text-sm text-muted-foreground">
              Processo 100% digital em poucos minutos
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border">
          <div className="bg-primary/10 p-2 rounded-full">
            <CheckCircle2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Sem Custo</h3>
            <p className="text-sm text-muted-foreground">
              Consulta grátis e sem compromisso
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border">
          <div className="bg-secondary/10 p-2 rounded-full">
            <Lock className="h-5 w-5 text-secondary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Dados Protegidos</h3>
            <p className="text-sm text-muted-foreground">
              Conforme Lei Geral de Proteção de Dados (LGPD)
            </p>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center space-y-4 pt-4">
        <Button
          onClick={onStart}
          size="lg"
          className="w-full md:w-auto px-12 text-lg font-bold bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg hover:shadow-xl transition-all"
        >
          Iniciar Solicitação
        </Button>
        <p className="text-xs text-muted-foreground">
          🔒 Seus dados estão protegidos e não serão compartilhados
        </p>
      </div>
    </div>
  );
};
