import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import lucianaHeroAsset from "@/assets/luciana-hero-v2.png.asset.json";
import legalCapitalLogoAsset from "@/assets/legal-capital-logo.png.asset.json";
const lucianaHero = lucianaHeroAsset.url;
const legalCapitalLogo = legalCapitalLogoAsset.url;
import {
  Wallet,
  Car,
  Home as HomeIcon,
  Building2,
  Briefcase,
  ShieldCheck,
  Sparkles,
  Headphones,
  Award,
  MessageCircle,
  Menu,
  X,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";

const WHATSAPP_NUMBER = "558005914153";
const waLink = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

const products = [
  {
    id: "consorcio",
    icon: Briefcase,
    title: "Consórcio",
    text:
      "Planeje a conquista do seu imóvel, veículo ou outro objetivo com parcelas acessíveis, sem juros de financiamento e com acompanhamento especializado da LEGAL.",
    bullets: [
      "Simulação personalizada",
      "Planejamento de carta de crédito",
      "Orientação sobre prazos, parcelas e contemplação",
      "Atendimento humanizado do início ao fim",
    ],
    cta: "Simular Consórcio",
    waMsg: "Olá LEGAL, quero simular um Consórcio.",
  },
  {
    id: "veiculos",
    icon: Car,
    title: "Financiamento de Veículos",
    text:
      "Conte com a LEGAL para encontrar alternativas de financiamento para comprar seu carro, moto ou veículo comercial com segurança e atendimento próximo.",
    bullets: [
      "Simulação de parcelas",
      "Análise de crédito",
      "Apoio na escolha da melhor condição",
      "Atendimento rápido pelo WhatsApp",
    ],
    cta: "Simular Veículo",
    waMsg: "Olá LEGAL, quero simular um Financiamento de Veículo.",
  },
  {
    id: "imobiliario",
    icon: HomeIcon,
    title: "Financiamento Imobiliário",
    text:
      "Realize o sonho da casa própria com orientação especializada para entender valores, prazos, entrada, parcelas e possibilidades de aprovação.",
    bullets: [
      "Simulação de imóvel",
      "Orientação sobre documentação",
      "Apoio na análise de crédito",
      "Atendimento consultivo",
    ],
    cta: "Simular Imóvel",
    waMsg: "Olá LEGAL, quero simular um Financiamento Imobiliário.",
  },
  {
    id: "conta",
    icon: Wallet,
    title: "Abertura de Conta",
    text:
      "Abra sua conta com praticidade, segurança e suporte da equipe LEGAL, com orientação em todo o processo.",
    bullets: [
      "Processo simples",
      "Atendimento assistido",
      "Conta para movimentação financeira",
      "Suporte pelo WhatsApp",
    ],
    cta: "Abrir Conta",
    waMsg: "Olá LEGAL, quero abrir uma conta.",
  },
  {
    id: "clt",
    icon: Building2,
    title: "Crédito CLT",
    text:
      "Para trabalhadores CLT que desejam consultar oportunidades de crédito de forma prática, rápida e segura.",
    bullets: [
      "Simulação online",
      "Atendimento pelo WhatsApp",
      "Consulta rápida",
      "Crédito sujeito à análise",
    ],
    cta: "Simular Crédito CLT",
    internalLink: "/clt",
  },
];

const numbers = [
  { value: "+13", label: "anos de mercado" },
  { value: "+650k", label: "clientes atendidos" },
  { value: "+2 Bi", label: "simulações realizadas" },
  { value: "+20", label: "parceiros financeiros" },
];

const Logo = ({ className = "" }: { className?: string }) => (
  <Link to="/" className={`flex items-center ${className}`}>
    <img
      src={legalCapitalLogo}
      alt="LEGAL CAPITAL"
      className="h-10 md:h-12 w-auto object-contain"
    />
  </Link>
);

const Header = () => {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        <Logo />

        <nav className="hidden lg:flex items-center gap-8">
          <a href="#inicio" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
            Início
          </a>
          <div className="relative group">
            <button className="text-sm text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1">
              Soluções LEGAL <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <div className="absolute top-full left-0 pt-3 hidden group-hover:block">
              <div className="bg-card border border-border/50 rounded-xl shadow-strong p-2 min-w-[240px]">
                {products.map((p) => (
                  <a
                    key={p.id}
                    href={`#${p.id}`}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/20 text-sm text-foreground/90"
                  >
                    <p.icon className="w-4 h-4 text-secondary" />
                    {p.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <a href="#quem-somos" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
            Quem Somos
          </a>
          <a href="#numeros" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
            Números da LEGAL
          </a>
          <a href="#contato" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
            Fale Conosco
          </a>
        </nav>

        <a
          href={waLink("Olá LEGAL, quero falar com um consultor.")}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:inline-flex"
        >
          <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-5">
            <MessageCircle className="w-4 h-4" /> Falar com especialista agora
          </Button>
        </a>

        <button
          className="lg:hidden text-foreground p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            <a href="#inicio" onClick={() => setOpen(false)} className="py-2 text-foreground/90">Início</a>
            <button
              onClick={() => setProductsOpen(!productsOpen)}
              className="py-2 text-foreground/90 flex items-center justify-between"
            >
              Soluções LEGAL <ChevronDown className={`w-4 h-4 transition-transform ${productsOpen ? "rotate-180" : ""}`} />
            </button>
            {productsOpen && (
              <div className="pl-4 flex flex-col gap-1 border-l border-border/40">
                {products.map((p) => (
                  <a
                    key={p.id}
                    href={`#${p.id}`}
                    onClick={() => setOpen(false)}
                    className="py-1.5 text-sm text-foreground/80"
                  >
                    {p.title}
                  </a>
                ))}
              </div>
            )}
            <a href="#quem-somos" onClick={() => setOpen(false)} className="py-2 text-foreground/90">Quem Somos</a>
            <a href="#numeros" onClick={() => setOpen(false)} className="py-2 text-foreground/90">Números da LEGAL</a>
            <a href="#contato" onClick={() => setOpen(false)} className="py-2 text-foreground/90">Fale Conosco</a>
            <a
              href={waLink("Olá LEGAL, quero falar com um consultor.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2"
            >
              <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full">
                <MessageCircle className="w-4 h-4" /> Falar com especialista agora
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/10 to-background">
      <Header />

      {/* HERO */}
      <section id="inicio" className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-secondary/20 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-primary/40 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 pt-12 md:pt-20 pb-16 md:pb-24 relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/50 bg-card/40 backdrop-blur">
                <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
                <span className="text-xs tracking-wider uppercase text-foreground/80">
                  Correspondente Autorizado
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-[1.05] tracking-tight">
                Conectando você às melhores oportunidades financeiras do mercado
              </h1>

              <p className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-xl">
                Na LEGAL CAPITAL, unimos inteligência consultiva, segurança e agilidade digital para viabilizar seus projetos de vida e de negócios.
              </p>

              <div className="flex flex-wrap gap-2">
                {products.map((p) => (
                  <span
                    key={p.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/60 border border-border/40 text-xs text-foreground/90 backdrop-blur"
                  >
                    <p.icon className="w-3.5 h-3.5 text-secondary" />
                    {p.title}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={waLink("Olá LEGAL, quero falar com a equipe agora.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-7 h-12 shadow-strong">
                    <MessageCircle className="w-5 h-5" /> Falar com especialista agora
                  </Button>
                </a>
                <a href="#produtos">
                  <Button size="lg" variant="outline" className="rounded-full px-7 h-12 border-border/60 bg-card/30 backdrop-blur">
                    Ver Soluções
                  </Button>
                </a>
              </div>

              <p className="text-xs text-muted-foreground pt-2">
                by Legal Capital · +13 anos de mercado
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 -m-6 bg-gradient-to-tr from-secondary/30 via-primary/20 to-transparent rounded-[2rem] blur-2xl" />
              <div className="relative rounded-[2rem] overflow-hidden border border-border/40 bg-card/30 backdrop-blur-sm">
                <img
                  src={lucianaHero}
                  alt="Luciana Grande, especialista LEGAL"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUTOS */}
      <section id="produtos" className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-secondary mb-3">Soluções LEGAL</p>
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Produtos pensados para o seu momento
            </h2>
            <p className="text-foreground/70">
              Atendimento consultivo, análise personalizada e múltiplos parceiros financeiros em um só lugar.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p) => (
              <Card
                key={p.id}
                id={p.id}
                className="group relative overflow-hidden border-border/40 bg-card/50 backdrop-blur p-6 flex flex-col hover:border-secondary/50 transition-all duration-300 hover:shadow-strong"
              >
                <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-secondary/10 blur-2xl group-hover:bg-secondary/20 transition-colors" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-secondary/15 border border-secondary/20 flex items-center justify-center mb-4">
                    <p.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                  <p className="text-sm text-foreground/75 leading-relaxed mb-4">{p.text}</p>
                  <ul className="space-y-2 mb-6">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-foreground/80">
                        <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto">
                  {p.internalLink ? (
                    <Link to={p.internalLink}>
                      <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full">
                        {p.cta}
                      </Button>
                    </Link>
                  ) : (
                    <a href={waLink(p.waMsg!)} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full">
                        <MessageCircle className="w-4 h-4" /> {p.cta}
                      </Button>
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-8 max-w-2xl mx-auto">
            Produtos sujeitos à análise, aprovação e condições das instituições parceiras.
          </p>
        </div>
      </section>

      {/* QUEM SOMOS */}
      <section id="quem-somos" className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-secondary mb-3">Quem Somos</p>
              <h2 className="text-3xl md:text-4xl font-black mb-5">Quem é a LEGAL</h2>
              <p className="text-foreground/80 leading-relaxed mb-6">
                A LEGAL é uma empresa com mais de 13 anos de atuação no mercado, oferecendo soluções financeiras com responsabilidade, transparência e atendimento próximo. Atuamos como correspondente autorizado, seguindo as normas aplicáveis do Banco Central do Brasil, conectando clientes às melhores alternativas financeiras disponíveis.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                <div className="rounded-xl border border-border/40 bg-card/40 backdrop-blur p-4">
                  <p className="text-xs text-muted-foreground">Razão Social</p>
                  <p className="text-sm font-semibold">Legal Capital Correspondente Bancária LTDA</p>
                </div>
                <div className="rounded-xl border border-border/40 bg-card/40 backdrop-blur p-4">
                  <p className="text-xs text-muted-foreground">CNPJ</p>
                  <p className="text-sm font-semibold">13.238.960/0001-36</p>
                </div>
              </div>

              <a href={waLink("Olá LEGAL, quero falar com um consultor.")} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-7">
                  <MessageCircle className="w-4 h-4" /> Falar com um consultor
                </Button>
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: ShieldCheck, title: "Correspondente Autorizado", text: "Conformidade com as normas do BCB" },
                { icon: Sparkles, title: "Tecnologia Financeira", text: "Processos digitais e seguros" },
                { icon: Headphones, title: "Atendimento Consultivo", text: "Equipe próxima e humanizada" },
                { icon: Award, title: "+13 anos de mercado", text: "Experiência consolidada" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border/40 bg-card/40 backdrop-blur p-5 hover:border-secondary/40 transition-colors"
                >
                  <item.icon className="w-7 h-7 text-secondary mb-3" />
                  <p className="font-bold text-sm mb-1">{item.title}</p>
                  <p className="text-xs text-foreground/70">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NÚMEROS */}
      <section id="numeros" className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/10 to-primary/20" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-secondary mb-3">Autoridade</p>
            <h2 className="text-3xl md:text-4xl font-black">Números da LEGAL</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {numbers.map((n) => (
              <div
                key={n.label}
                className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur p-6 text-center"
              >
                <p className="text-3xl md:text-4xl font-black text-secondary mb-1">{n.value}</p>
                <p className="text-xs md:text-sm text-foreground/80">{n.label}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-foreground/80 mt-8">
            Atendimento em todo o Brasil
          </p>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-secondary mb-3">Como Funciona</p>
            <h2 className="text-3xl md:text-4xl font-black">Simples, rápido e consultivo</h2>
          </div>
          <div className="grid md:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {[
              "Escolha o produto",
              "Fale com a LEGAL pelo WhatsApp",
              "Faça sua simulação ou solicitação",
              "Receba orientação personalizada",
              "Avance com segurança",
            ].map((step, i) => (
              <div
                key={step}
                className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur p-5 relative"
              >
                <div className="w-9 h-9 rounded-full bg-secondary text-secondary-foreground font-bold flex items-center justify-center mb-3">
                  {i + 1}
                </div>
                <p className="text-sm font-medium leading-snug">{step}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href={waLink("Olá LEGAL, quero começar agora.")} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-7 h-12">
                <MessageCircle className="w-5 h-5" /> Começar agora pelo WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="contato" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden border border-border/40 bg-gradient-to-br from-primary/40 via-card to-primary/20 p-8 md:p-16 text-center">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-secondary/10 blur-3xl" />
            <div className="relative max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-black mb-4">
                Pronto para encontrar a melhor solução financeira para você?
              </h2>
              <p className="text-foreground/80 text-base md:text-lg mb-8">
                Fale agora com a LEGAL e escolha o produto que melhor combina com o seu momento.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href={waLink("Olá LEGAL, quero falar agora.")} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-8 h-12">
                    <MessageCircle className="w-5 h-5" /> Falar no WhatsApp
                  </Button>
                </a>
                <a href="#produtos">
                  <Button size="lg" variant="outline" className="rounded-full px-8 h-12 border-border/60 bg-card/40 backdrop-blur">
                    Ver Produtos
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/40 bg-card/30 backdrop-blur">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <Logo />
              <p className="text-xs text-muted-foreground mt-3">by Legal Capital</p>
              <p className="text-sm text-foreground/80 mt-4 max-w-xs">
                Soluções financeiras com responsabilidade, transparência e atendimento próximo.
              </p>
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-secondary mb-3">Navegação</p>
              <ul className="space-y-2 text-sm">
                <li><a href="#inicio" className="text-foreground/80 hover:text-foreground">Início</a></li>
                <li><a href="#produtos" className="text-foreground/80 hover:text-foreground">Produtos</a></li>
                <li><a href="#quem-somos" className="text-foreground/80 hover:text-foreground">Quem Somos</a></li>
                <li><Link to="/clt" className="text-foreground/80 hover:text-foreground">Crédito CLT</Link></li>
                <li><Link to="/politica-de-privacidade" className="text-foreground/80 hover:text-foreground">Política de Privacidade</Link></li>
                <li><a href={waLink("Olá LEGAL, quero falar com a equipe.")} target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-foreground">Fale Conosco</a></li>
              </ul>
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-secondary mb-3">Institucional</p>
              <p className="text-sm text-foreground/80">Legal Capital Correspondente Bancária LTDA</p>
              <p className="text-sm text-foreground/80 mt-1">CNPJ: 13.238.960/0001-36</p>
              <p className="text-xs text-muted-foreground mt-3">
                Correspondente autorizado. Produtos sujeitos à análise e condições das instituições parceiras.
              </p>
            </div>
          </div>
          <div className="border-t border-border/40 pt-6 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} LEGAL · by Legal Capital. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
