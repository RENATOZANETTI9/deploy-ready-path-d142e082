import { Button } from "@/components/ui/button";
import { Shield, Lock, CheckCircle2, Clock, TrendingUp } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo-legal-e-viver.webp";
import { useState } from "react";

interface WelcomeStepProps {
  onStart: () => void;
}

export const WelcomeStep = ({ onStart }: WelcomeStepProps) => {
  const [salary, setSalary] = useState(1518);
  const minSalary = 1518;
  const maxSalary = 20000;
  
  // Cálculo da parcela máxima (35% do salário)
  const maxInstallment = salary * 0.35;
  
  // Cálculo do crédito disponível (180% do salário = salário + 80%)
  const availableCredit = salary * 1.8;
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const numValue = parseInt(value) || minSalary;
    const clampedValue = Math.min(Math.max(numValue, minSalary), maxSalary);
    setSalary(clampedValue);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 animate-fade-in">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <img src={logo} alt="Legal é Viver" className="h-24 w-auto animate-fade-in" />
      </div>

      {/* Hero Image and Title */}
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
        <div className="w-full md:w-auto md:flex-shrink-0">
          <img 
            src="https://legaleviver.com.br/wp-content/uploads/2025/10/Luciana-1.webp" 
            alt="Crédito Consignado" 
            className="w-full max-w-xs mx-auto md:mx-0 md:w-64 lg:w-80 rounded-2xl shadow-2xl object-cover"
          />
        </div>
        <div className="flex-1 space-y-4 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Crédito Consignado CLT de forma{" "}
            <span className="text-secondary">rápida</span> e{" "}
            <span className="text-secondary">segura</span>
          </h1>
          <div className="flex items-start gap-3 p-4 bg-secondary/10 rounded-lg border border-secondary/30 mt-4">
            <div className="bg-secondary/20 p-2 rounded-full">
              <TrendingUp className="h-6 w-6 text-secondary" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-foreground text-lg">Aqui você é quem manda!</h3>
              <p className="text-base text-muted-foreground">
                Coloque <strong>mais de 5 bancos</strong> para competirem entre si e garantir a <strong>melhor taxa</strong> e as <strong>melhores condições</strong> exclusivas para você
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
        <div className="flex flex-col items-center gap-2 p-3 bg-muted/30 rounded-lg border border-border/50">
          <div className="bg-primary/20 p-2 rounded-full">
            <Shield className="h-4 w-4 text-primary" />
          </div>
          <p className="text-xs font-medium text-foreground text-center">Segurança Total</p>
        </div>

        <div className="flex flex-col items-center gap-2 p-3 bg-muted/30 rounded-lg border border-border/50">
          <div className="bg-secondary/20 p-2 rounded-full">
            <Clock className="h-4 w-4 text-secondary" />
          </div>
          <p className="text-xs font-medium text-foreground text-center">Rápido e Fácil</p>
        </div>

        <div className="flex flex-col items-center gap-2 p-3 bg-muted/30 rounded-lg border border-border/50">
          <div className="bg-primary/20 p-2 rounded-full">
            <CheckCircle2 className="h-4 w-4 text-primary" />
          </div>
          <p className="text-xs font-medium text-foreground text-center">Melhores Taxas</p>
        </div>

        <div className="flex flex-col items-center gap-2 p-3 bg-muted/30 rounded-lg border border-border/50">
          <div className="bg-secondary/20 p-2 rounded-full">
            <Lock className="h-4 w-4 text-secondary" />
          </div>
          <p className="text-xs font-medium text-foreground text-center">Proteção LGPD</p>
        </div>
      </div>

      {/* Salary Slider Section */}
      <div className="space-y-6 p-6 bg-card/50 rounded-2xl border border-border/50 backdrop-blur-sm">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Qual o valor do seu salário?
          </label>
          <div className="flex items-center gap-4">
            <div className="text-3xl font-bold text-secondary">
              {formatCurrency(salary)}
            </div>
            <Input
              type="text"
              value={salary}
              onChange={handleInputChange}
              placeholder="R$ 1.518"
              className="max-w-[150px] text-lg font-semibold"
            />
          </div>
        </div>

        <Slider
          value={[salary]}
          onValueChange={(value) => setSalary(value[0])}
          min={minSalary}
          max={maxSalary}
          step={10}
          className="w-full"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
            <p className="text-xs text-muted-foreground mb-1">Valor máximo da parcela (35%)</p>
            <p className="text-xl font-bold text-primary">{formatCurrency(maxInstallment)}</p>
          </div>
          <div className="p-4 bg-secondary/10 rounded-lg border border-secondary/30">
            <p className="text-xs text-muted-foreground mb-1">Você pode receber até</p>
            <p className="text-xl font-bold text-secondary">{formatCurrency(availableCredit)}</p>
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
          Continuar
        </Button>
        <p className="text-xs text-muted-foreground">
          🔒 Seus dados estão protegidos e não serão compartilhados
        </p>
      </div>
    </div>
  );
};
