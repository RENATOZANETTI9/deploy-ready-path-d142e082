import { Button } from "@/components/ui/button";
import {
  Shield,
  Lock,
  CheckCircle2,
  Clock,
  TrendingUp,
  Zap,
  DollarSign,
  Calendar,
  Smartphone,
  UserCheck,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo-legal-e-viver.webp";
import heroImage from "@/assets/luciana-hero.png";
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

  // Cálculo do crédito disponível (parcela máxima / 0,055)
  const availableCredit = maxInstallment / 0.055;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const numValue = parseInt(value) || 0;
    setSalary(numValue);
  };

  const isValidSalary = salary >= minSalary;

  return (
    <div className="w-full max-w-2xl md:max-w-5xl lg:max-w-6xl mx-auto space-y-5 animate-fade-in">
      {/* Logo */}
      <div className="flex justify-center mb-4">
        <img src={logo} alt="Legal é Viver" className="h-14 md:h-16 w-auto animate-fade-in" />
      </div>

      {/* Hero Section - Responsive Layout */}
      <div className="flex flex-col space-y-4 md:space-y-0">
        {/* Desktop/Tablet Layout */}
        <div className="hidden md:flex md:gap-5 md:items-start">
          {/* Left Side: Title, Text and Slider */}
          <div className="flex-1 space-y-5">
            {/* Title and Text */}
            <div className="text-left space-y-1.5">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-black text-foreground uppercase font-visby leading-tight">
                CRÉDITO CONSIGNADO CLT
              </h1>
              <h2 className="text-sm sm:text-base md:text-lg font-bold text-secondary uppercase font-visby">
                O CRÉDITO DO TRABALHADOR
              </h2>

              {/* Support Text */}
              <p className="text-xs md:text-sm text-muted-foreground pt-1.5 text-left">
                Coloque <strong>mais de 5 bancos</strong> para competirem entre si e garantir a <strong>melhor taxa</strong>{" "}
                e as <strong>melhores condições</strong> exclusivas para você
              </p>
            </div>

            {/* Salary Slider Section */}
            <div className="space-y-3 p-4 bg-card/50 rounded-2xl border border-border/50 backdrop-blur-sm">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Qual o valor do seu salário?</label>
                <div className="flex items-center gap-3">
                  <div className="text-xl font-bold text-secondary">{formatCurrency(salary)}</div>
                  <Input
                    type="text"
                    value={salary}
                    onChange={handleInputChange}
                    placeholder="R$ 1.518"
                    className="max-w-[130px] text-base font-semibold"
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

              {/* Results Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-primary/10 rounded-lg border border-primary/30">
                  <p className="text-xs font-medium text-foreground mb-0.5">Valor da parcela</p>
                  <p className="text-lg font-bold text-primary">{formatCurrency(maxInstallment)}</p>
                  <p className="text-[9px] text-muted-foreground mt-1">*Valor máximo da parcela (35%)</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded-lg border border-secondary/30">
                  <p className="text-[10px] text-muted-foreground mb-1">Você pode receber até</p>
                  <p className="text-lg font-bold text-secondary">{formatCurrency(availableCredit)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Hero Image */}
          <div className="flex-shrink-0">
            <img
              src={heroImage}
              alt="Crédito Consignado"
              className="w-[300px] lg:w-[360px] rounded-2xl shadow-2xl object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
            />
          </div>
        </div>

        {/* Mobile Layout - Keep as is */}
        <div className="md:hidden space-y-4">
          {/* Hero Title and Text */}
          <div className="text-center space-y-1.5">
            <h1 className="text-xl sm:text-2xl font-black text-foreground uppercase font-visby leading-tight">
              CRÉDITO CONSIGNADO CLT
            </h1>
            <h2 className="text-sm sm:text-base font-bold text-secondary uppercase font-visby">
              O CRÉDITO DO TRABALHADOR
            </h2>

            {/* Support Text */}
            <p className="text-xs text-muted-foreground pt-1.5 text-center">
              Coloque <strong>mais de 5 bancos</strong> para competirem entre si e garantir a <strong>melhor taxa</strong>{" "}
              e as <strong>melhores condições</strong> exclusivas para você
            </p>
          </div>

          {/* Hero Image - Mobile */}
          <div className="flex justify-center">
            <img
              src={heroImage}
              alt="Crédito Consignado"
              className="w-full max-w-[240px] rounded-2xl shadow-2xl object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
            />
          </div>

          {/* Salary Input - Mobile */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Qual o valor do seu salário?</label>
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-secondary">{formatCurrency(salary)}</div>
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
      </div>

      {/* Mobile: Results Cards Below Salary Input */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
          <p className="text-sm font-medium text-foreground mb-0.5">Valor da parcela</p>
          <p className="text-xl font-bold text-primary">{formatCurrency(maxInstallment)}</p>
          <p className="text-[10px] text-muted-foreground mt-1">*Valor máximo da parcela (35%)</p>
        </div>
        <div className="p-4 bg-secondary/10 rounded-lg border border-secondary/30">
          <p className="text-xs text-muted-foreground mb-1">Você pode receber até</p>
          <p className="text-xl font-bold text-secondary">{formatCurrency(availableCredit)}</p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center space-y-4 pt-4">
        {!isValidSalary && (
          <p className="text-sm font-medium text-destructive">O salário mínimo deve ser de R$ 1.518,00</p>
        )}
        <Button
          onClick={onStart}
          disabled={!isValidSalary}
          size="lg"
          className="w-full md:w-auto px-12 text-lg font-bold bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continuar
        </Button>
        <p className="text-xs text-muted-foreground">Contratação sujeita a análise. Os valores aqui presentes podem variar no leilão conforme as respostas dos bancos.</p>
      </div>

      {/* Depoimentos Section */}
      <div className="mt-12 space-y-6">
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-black text-foreground uppercase font-visby">
            Depoimentos
          </h3>
          <p className="text-sm text-muted-foreground mt-2">Veja o que nossos clientes têm a dizer</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Video 1 */}
          <div className="bg-muted/30 rounded-lg overflow-hidden border border-border/50">
            <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/cItwT8Gws4g"
                title="Depoimento 1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Video 2 */}
          <div className="bg-muted/30 rounded-lg overflow-hidden border border-border/50">
            <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/MJink-JZHV4"
                title="Depoimento 2"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Video 3 */}
          <div className="bg-muted/30 rounded-lg overflow-hidden border border-border/50">
            <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/4pRNBTypGgQ"
                title="Depoimento 3"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators - 3 Topics below testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-8">
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
      </div>
    </div>
  );
};