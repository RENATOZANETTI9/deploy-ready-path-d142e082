import { Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo-legal-e-viver.webp";

export const Footer = () => {
  return (
    <footer className="w-full bg-card/50 border-t border-border/50 backdrop-blur-sm mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <div className="flex justify-center">
            <img 
              src={logo} 
              alt="Legal é Viver" 
              className="h-16 w-auto"
            />
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/legal_viver"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:opacity-90 transition-opacity"
              aria-label="Instagram Legal é Viver"
            >
              <Instagram className="h-5 w-5" />
              <span className="font-medium">Instagram</span>
            </a>
          </div>

          {/* Legal Links */}
          <div className="flex gap-4 text-sm">
            <Link 
              to="/termos-e-condicoes" 
              className="text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
            >
              Termos e Condições
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link 
              to="/politica-de-privacidade" 
              className="text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
            >
              Política de Privacidade
            </Link>
          </div>

          {/* Company Info */}
          <div className="text-center space-y-2 max-w-4xl">
            <p className="text-xs text-muted-foreground leading-relaxed text-justify">
              LEGAL É VIVER é uma plataforma digital pertencente a JCR2 SOLUCOES E CONSULTORIA LTDA CNPJ: 13.238.960/0001-36. É correspondente bancário credenciado em diversas instituições financeiras. O crédito é sujeito a margem disponível e adequação à política de concessão estabelecida por cada instituição. Valores de parcelas, prazos, taxa de juros, tarifas e CET (Custo Efetivo Total) podem variar conforme regras e a qualquer tempo. Todas as operações de crédito têm incidência de IOF, conforme legislação vigente. É direito ao mutuário o pagamento antecipado a qualquer tempo.
            </p>
          </div>

          {/* Copyright */}
          <div className="text-xs text-muted-foreground text-center pt-4 border-t border-border/50 w-full">
            <p>© {new Date().getFullYear()} Legal é Viver. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
