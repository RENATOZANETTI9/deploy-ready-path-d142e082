import { Instagram } from "lucide-react";
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

          {/* Company Info */}
          <div className="text-center space-y-2">
            <p className="text-sm font-medium text-foreground">
              A Legal é viver
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p><strong>Mais de 14 anos</strong> de atuação.</p>
              <p><strong>95 mil clientes atendidos</strong> por mês.</p>
              <p><strong>+ 300 milhões de saques FGTS</strong> realizados até agora.</p>
              <p><strong>Atendimento em todo Brasil.</strong></p>
              <p><strong>Simulação 24 horas / Plataforma sempre ativa.</strong></p>
            </div>
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
