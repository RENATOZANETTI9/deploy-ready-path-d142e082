import { Button } from "@/components/ui/button";
import {
  Shield,
  Lock,
  CheckCircle2,
  Clock,
  TrendingUp,
  Smartphone,
  UserCheck,
  FileText,
  UserCircle,
  CreditCard,
  Banknote,
  Percent,
  Calendar,
  BadgeCheck,
  Zap,
  DollarSign,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import logo from "@/assets/logo-legal-e-viver.webp";
import heroImage from "@/assets/luciana-hero.png";
import sideLine from "@/assets/side-line.png";
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface WelcomeStepProps {
  onStart: () => void;
}

export const WelcomeStep = ({ onStart }: WelcomeStepProps) => {
  const [salary, setSalary] = useState(1518);
  const minSalary = 1518;
  const maxSalary = 20000;

  // Scroll animations
  const aboutSection = useScrollAnimation();
  const howItWorksSection = useScrollAnimation();
  const benefitsSection = useScrollAnimation();
  const faqSection = useScrollAnimation();

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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Decorative Line - Left Side */}
      <div className="fixed left-0 top-0 h-screen w-8 md:w-16 pointer-events-none overflow-hidden opacity-30 z-0">
        <img 
          src={sideLine} 
          alt="" 
          className="h-full w-full object-fill scale-y-110"
        />
      </div>

      {/* Decorative Line - Right Side (mirrored) */}
      <div className="fixed right-0 top-0 h-screen w-8 md:w-16 pointer-events-none overflow-hidden opacity-30 z-0 scale-x-[-1]">
        <img 
          src={sideLine} 
          alt="" 
          className="h-full w-full object-fill scale-y-110"
        />
      </div>

      <div className="relative w-full max-w-2xl md:max-w-5xl lg:max-w-6xl mx-auto space-y-5 animate-fade-in z-10">
        {/* Header with Logo only */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Legal é Viver" className="h-12 md:h-14 w-auto animate-fade-in" />
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

        {/* Mobile Layout */}
        <div className="md:hidden space-y-0 -mt-12">
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

          {/* Hero Image - Mobile - Full width */}
          <div className="flex justify-center -mx-4">
            <img
              src={heroImage}
              alt="Crédito Consignado"
              className="w-full h-auto shadow-2xl object-cover"
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
          className="w-full md:w-auto md:max-w-md px-12 py-6 text-lg font-bold bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-normal text-center leading-tight"
        >
          Simule Agora
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

      {/* CTA after testimonials */}
      <section className="text-center py-12 px-4 sm:px-6">
        <Button
          onClick={onStart}
          disabled={!isValidSalary}
          className="w-full md:w-auto md:max-w-md px-8 py-6 text-lg font-bold bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-normal text-center leading-tight"
        >
          Faça igual elas, simule agora!
        </Button>
      </section>

      {/* Tópico 1: O que é o consignado para trabalhadores */}
      <div 
        id="sobre" 
        className="mt-16 space-y-4 scroll-mt-20"
        ref={aboutSection.elementRef}
      >
        <div className={`text-center transition-all duration-700 ${aboutSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl md:text-3xl font-black text-foreground uppercase font-visby">
            O que é o consignado para trabalhadores?
          </h3>
        </div>
        
        <div className={`p-6 md:p-8 bg-card/50 rounded-2xl border border-border/50 backdrop-blur-sm transition-all duration-700 delay-150 ${aboutSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            O consignado privado é uma solução financeira exclusiva para profissionais com carteira assinada.
          </p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-4">
            Os valores são descontados diretamente da folha de pagamento, o que garante condições mais vantajosas, com taxas reduzidas e sem burocracia. Assim, você tem acesso rápido e seguro ao crédito que precisa, com total praticidade.
          </p>
        </div>
      </div>

      {/* Tópico 2: Como funciona */}
      <div 
        className="mt-16 space-y-6"
        ref={howItWorksSection.elementRef}
      >
        <div className={`text-center transition-all duration-700 ${howItWorksSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl md:text-3xl font-black text-foreground uppercase font-visby">
            Como funciona
          </h3>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-700 delay-150 ${howItWorksSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-start gap-4 p-5 bg-primary/10 rounded-xl border border-primary/30">
            <div className="bg-primary/50 p-3 rounded-full flex-shrink-0">
              <Smartphone className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm md:text-base font-medium text-foreground">
                A solicitação é feita de forma totalmente digital.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 bg-secondary/10 rounded-xl border border-secondary/30">
            <div className="bg-secondary/50 p-3 rounded-full flex-shrink-0">
              <UserCircle className="h-6 w-6 text-secondary-foreground" />
            </div>
            <div>
              <p className="text-sm md:text-base font-medium text-foreground">
                A avaliação considera o seu vínculo empregatício.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 bg-primary/10 rounded-xl border border-primary/30">
            <div className="bg-primary/50 p-3 rounded-full flex-shrink-0">
              <Banknote className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm md:text-base font-medium text-foreground">
                Após a aprovação, o valor é liberado diretamente na sua conta.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 bg-secondary/10 rounded-xl border border-secondary/30">
            <div className="bg-secondary/50 p-3 rounded-full flex-shrink-0">
              <CreditCard className="h-6 w-6 text-secondary-foreground" />
            </div>
            <div>
              <p className="text-sm md:text-base font-medium text-foreground">
                Os pagamentos são descontados automaticamente do seu contracheque.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tópico 3: Benefícios */}
      <div 
        id="vantagens" 
        className="mt-16 space-y-6 scroll-mt-20"
        ref={benefitsSection.elementRef}
      >
        <div className={`text-center space-y-2 transition-all duration-700 ${benefitsSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl md:text-3xl font-black text-foreground uppercase font-visby">
            Benefícios do novo consignado privado
          </h3>
          <p className="text-sm text-muted-foreground">Por que escolher essa modalidade?</p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-700 delay-150 ${benefitsSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col items-center gap-3 p-5 bg-card/50 rounded-xl border border-border/50 hover:border-primary/50 transition-colors">
            <div className="bg-primary/60 p-3 rounded-full">
              <Percent className="h-6 w-6 text-primary-foreground" />
            </div>
            <h4 className="text-base font-bold text-foreground">Juros Baixos</h4>
            <p className="text-xs text-center text-muted-foreground">
              Condições muito mais acessíveis que as opções tradicionais de mercado.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 p-5 bg-card/50 rounded-xl border border-border/50 hover:border-secondary/50 transition-colors">
            <div className="bg-secondary/60 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-secondary-foreground" />
            </div>
            <h4 className="text-base font-bold text-foreground">Pagamento Facilitado</h4>
            <p className="text-xs text-center text-muted-foreground">
              Parcelas fixas e automáticas, debitadas direto da folha de pagamento.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 p-5 bg-card/50 rounded-xl border border-border/50 hover:border-primary/50 transition-colors">
            <div className="bg-primary/60 p-3 rounded-full">
              <BadgeCheck className="h-6 w-6 text-primary-foreground" />
            </div>
            <h4 className="text-base font-bold text-foreground">Aprovação de Negativados</h4>
            <p className="text-xs text-center text-muted-foreground">
              Disponível também para quem possui restrições no nome.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 p-5 bg-card/50 rounded-xl border border-border/50 hover:border-secondary/50 transition-colors">
            <div className="bg-secondary/60 p-3 rounded-full">
              <Zap className="h-6 w-6 text-secondary-foreground" />
            </div>
            <h4 className="text-base font-bold text-foreground">Agilidade no Processo</h4>
            <p className="text-xs text-center text-muted-foreground">
              Atendimento 100% online, simples e sem burocracia.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 p-5 bg-card/50 rounded-xl border border-border/50 hover:border-primary/50 transition-colors">
            <div className="bg-primary/60 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-primary-foreground" />
            </div>
            <h4 className="text-base font-bold text-foreground">Limite Disponível</h4>
            <p className="text-xs text-center text-muted-foreground">
              A parcela pode comprometer até 35% da sua renda mensal.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 p-5 bg-card/50 rounded-xl border border-border/50 hover:border-secondary/50 transition-colors">
            <div className="bg-secondary/60 p-3 rounded-full">
              <Shield className="h-6 w-6 text-secondary-foreground" />
            </div>
            <h4 className="text-base font-bold text-foreground">Segurança e Praticidade</h4>
            <p className="text-xs text-center text-muted-foreground">
              Todo o processo é digital, protegido e transparente — você acompanha cada etapa com total controle.
            </p>
          </div>
        </div>
      </div>

      {/* Tópico 4: FAQ */}
      <div 
        id="faq" 
        className="mt-16 space-y-6 scroll-mt-20"
        ref={faqSection.elementRef}
      >
        <div className={`text-center transition-all duration-700 ${faqSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl md:text-3xl font-black text-foreground uppercase font-visby">
            Perguntas Frequentes
          </h3>
        </div>

        <div className={`p-6 md:p-8 bg-card/50 rounded-2xl border border-border/50 backdrop-blur-sm transition-all duration-700 delay-150 ${faqSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border border-border/50 rounded-lg px-4 bg-background/50">
              <AccordionTrigger className="text-left text-sm md:text-base font-semibold text-foreground hover:text-primary">
                Quem pode contratar o consignado privado?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Trabalhadores com carteira assinada (CLT), maiores de 18 anos, registrados no e-Social e com margem consignável disponível no salário.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border border-border/50 rounded-lg px-4 bg-background/50">
              <AccordionTrigger className="text-left text-sm md:text-base font-semibold text-foreground hover:text-primary">
                Quais empresas aceitam esse tipo de operação?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Todas as empresas privadas que utilizam o e-Social e autorizam o desconto direto na folha de pagamento.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border border-border/50 rounded-lg px-4 bg-background/50">
              <AccordionTrigger className="text-left text-sm md:text-base font-semibold text-foreground hover:text-primary">
                Como funciona o desconto em folha?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Até 35% do salário pode ser reservado para a operação. O valor é retido automaticamente pelo RH da empresa no momento do pagamento.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border border-border/50 rounded-lg px-4 bg-background/50">
              <AccordionTrigger className="text-left text-sm md:text-base font-semibold text-foreground hover:text-primary">
                Em quanto tempo o valor é liberado?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Após a aprovação, o depósito é realizado em poucas horas — normalmente em menos de 2 horas úteis.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border border-border/50 rounded-lg px-4 bg-background/50">
              <AccordionTrigger className="text-left text-sm md:text-base font-semibold text-foreground hover:text-primary">
                Quais documentos são necessários?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Documento oficial com foto, como RG ou CNH.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border border-border/50 rounded-lg px-4 bg-background/50">
              <AccordionTrigger className="text-left text-sm md:text-base font-semibold text-foreground hover:text-primary">
                Como são realizados os pagamentos das parcelas?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                A própria empresa realiza o repasse, descontando o valor diretamente do salário do colaborador e enviando via Guia do FGTS.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* CTA after FAQ */}
      <section className="text-center py-12 px-4 sm:px-6">
        <Button
          onClick={onStart}
          disabled={!isValidSalary}
          className="w-full md:w-auto md:max-w-md px-8 py-6 text-lg font-bold bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-normal text-center leading-tight"
        >
          Simule agora! É rápido e gratuito
        </Button>
      </section>

      </div>
    </>
  );
};