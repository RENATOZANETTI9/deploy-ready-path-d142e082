import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-primary/10 flex flex-col">
      <div className="container mx-auto px-4 pt-8 pb-8 flex-1 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center animate-in fade-in duration-500">
          <div className="bg-card rounded-2xl shadow-lg p-8 border">
            <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
              <div className="absolute inset-0 rounded-full bg-secondary/20 animate-pulse" />
              <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-secondary/30 to-secondary/10">
                <Heart className="w-10 h-10 text-secondary" strokeWidth={2} fill="currentColor" />
              </div>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              A Legal é Viver agradece pela preferência!
            </h1>
            
            <p className="text-muted-foreground text-lg mb-8">
              Até logo! 👋
            </p>
            
            <Button 
              variant="secondary" 
              size="lg" 
              className="w-full"
              onClick={() => navigate("/")}
            >
              Voltar ao início
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ThankYou;