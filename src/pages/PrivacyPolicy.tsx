import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-legal-e-viver.webp";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-primary/10">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <Link to="/">
            <img 
              src={logo} 
              alt="Legal é Viver" 
              className="h-20 w-auto mb-6"
            />
          </Link>
          <h1 className="text-2xl md:text-4xl font-black text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent uppercase font-visby">
            Política de Privacidade
          </h1>
        </div>

        {/* Content Placeholder */}
        <div className="bg-card rounded-2xl shadow-lg p-6 md:p-10 border space-y-6 text-card-foreground">
          <p className="text-muted-foreground leading-relaxed text-center py-12">
            Conteúdo em breve...
          </p>

          <div className="pt-6 border-t border-border/50">
            <p className="text-xs text-muted-foreground text-center">
              <strong>LEGAL É VIVER</strong> - JCR2 SOLUÇÕES E CONSULTORIA LTDA - CNPJ: 13.238.960/0001-36
            </p>
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-center mt-8">
          <Button asChild variant="outline" className="gap-2">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Voltar para o início
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
