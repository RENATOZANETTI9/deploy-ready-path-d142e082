import { Button } from "@/components/ui/button";
import { Shield, Lock, CheckCircle2, Clock, TrendingUp, Zap, DollarSign, Calendar, Smartphone, UserCheck } from "lucide-react";
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
    const numValue = parseInt(value) || 0;
    setSalary(numValue);
  };

  const isValidSalary = salary >= minSalary;

  return (
    <div className="w-full max-w-2xl md:max-w-5xl lg:max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <img src={logo} alt="Legal é Viver" className="h-24 w-auto animate-fade-in" />
      </div>

      {/* Hero Section - Responsive Layout */}
      <div className="flex flex-col space-y-6 md:flex-row-reverse md:items-center md:gap-8 lg:gap-12 md:space-y-0">
        {/* Hero Title and Text - Above image on mobile, Left side on tablet/desktop */}
        <div className="text-center md:text-left space-y-3 md:flex-1 order-1 md:order-2">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground uppercase font-visby leading-tight">
            CRÉDITO CONSIGNADO CLT
          </h1>
          <h2 className="text-base sm:text-lg md:text-2xl font-bold text-secondary uppercase font-visby">
            O CRÉDITO DO TRABALHADOR
          </h2>
          
          {/* Support Text - Below Hero as normal text */}
          <p className="text-sm md:text-base text-muted-foreground pt-3 text-center md:text-left">
            Coloque <strong>mais de 5 bancos</strong> para competirem entre si e garantir a <strong>melhor taxa</strong> e as <strong>melhores condições</strong> exclusivas para você
          </p>
        </div>

        {/* Hero Image - Below text on mobile, Right side on tablet/desktop */}
        <div className="flex justify-center md:justify-end md:flex-shrink-0 order-2 md:order-1">
          <img 
            src="https://legaleviver.com.br/wp-content/uploads/2025/10/Luciana-1.webp" 
            alt="Crédito Consignado" 
            className="w-full max-w-[240px] md:max-w-[280px] lg:max-w-[320px] rounded-2xl shadow-2xl object-cover"
          />
        </div>
      </div>

      {/* Salary Input - Show below image on mobile */}
      <div className="md:hidden">
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
          className="w-full mt-4"
        />
      </div>

      {/* Salary Slider Section - Hide on mobile (shown inline above), show on tablet/desktop */}
      <div className="hidden md:block space-y-6 p-6 bg-card/50 rounded-2xl border border-border/50 backdrop-blur-sm">
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

        {/* Results Cards - Show on both mobile and desktop */}
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

      {/* Mobile: Results Cards Below Salary Input */}
      <div className="md:hidden grid grid-cols-1 gap-4 pt-4">
        <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
          <p className="text-xs text-muted-foreground mb-1">Valor máximo da parcela (35%)</p>
          <p className="text-xl font-bold text-primary">{formatCurrency(maxInstallment)}</p>
        </div>
        <div className="p-4 bg-secondary/10 rounded-lg border border-secondary/30">
          <p className="text-xs text-muted-foreground mb-1">Você pode receber até</p>
          <p className="text-xl font-bold text-secondary">{formatCurrency(availableCredit)}</p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center space-y-4 pt-4">
        {!isValidSalary && (
          <p className="text-sm font-medium text-destructive">
            O salário mínimo deve ser de R$ 1.518,00
          </p>
        )}
        <Button
          onClick={onStart}
          disabled={!isValidSalary}
          size="lg"
          className="w-full md:w-auto px-12 text-lg font-bold bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continuar
        </Button>
        <p className="text-xs text-muted-foreground">
          🔒 Seus dados estão protegidos e não serão compartilhados
        </p>
      </div>

      {/* Trust Indicators - 6 Topics at the end */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-8">
        <div className="flex flex-col items-center gap-2 p-3 bg-muted/30 rounded-lg border border-border/50">
          <div className="bg-secondary/20 p-2 rounded-full">
            <Zap className="h-4 w-4 text-secondary" />
          </div>
          <p className="text-xs font-medium text-foreground text-center">Contrate e receba em minutos</p>
        </div>

        <div className="flex flex-col items-center gap-2 p-3 bg-muted/30 rounded-lg border border-border/50">
          <div className="bg-primary/20 p-2 rounded-full">
            <DollarSign className="h-4 w-4 text-primary" />
          </div>
          <p className="text-xs font-medium text-foreground text-center">Taxas de juros reduzidas</p>
        </div>

        <div className="flex flex-col items-center gap-2 p-3 bg-muted/30 rounded-lg border border-border/50">
          <div className="bg-secondary/20 p-2 rounded-full">
            <Calendar className="h-4 w-4 text-secondary" />
          </div>
          <p className="text-xs font-medium text-foreground text-center">Prazos longos e flexíveis</p>
        </div>

        <div className="flex flex-col items-center gap-2 p-3 bg-muted/30 rounded-lg border border-border/50">
          <div className="bg-primary/20 p-2 rounded-full">
            <Smartphone className="h-4 w-4 text-primary" />
          </div>
          <p className="text-xs font-medium text-foreground text-center">Processo 100% digital</p>
        </div>

        <div className="flex flex-col items-center gap-2 p-3 bg-muted/30 rounded-lg border border-border/50">
          <div className="bg-secondary/20 p-2 rounded-full">
            <UserCheck className="h-4 w-4 text-secondary" />
          </div>
          <p className="text-xs font-medium text-foreground text-center">Disponível para negativados</p>
        </div>

        <div className="flex flex-col items-center gap-2 p-3 bg-muted/30 rounded-lg border border-border/50">
          <div className="bg-primary/20 p-2 rounded-full">
            <Shield className="h-4 w-4 text-primary" />
          </div>
          <p className="text-xs font-medium text-foreground text-center">Segurança certificada</p>
        </div>
      </div>
    </div>
  );
};
