import { useState, useEffect } from "react";
import { TetrisGame } from "./TetrisGame";
import { MessageCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const isDataprevClosingPeriod = () => {
  const today = new Date();
  const day = today.getDate();
  return day >= 20 && day <= 23;
};

const DataprevMessage = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Olá, gostaria de saber quando a margem será liberada");
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
  };

  return (
    <div className="mb-3 md:mb-6 p-4 md:p-6 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg">
      <div className="flex items-start gap-3 mb-4">
        <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
        <div className="text-left">
          <h3 className="font-semibold text-amber-800 dark:text-amber-400 text-sm md:text-base mb-2">Atenção</h3>
          <p className="text-amber-700 dark:text-amber-300 text-xs md:text-sm leading-relaxed">
            A Dataprev que cuida das liberações de margem (valor que você poderá pagar de parcela), está no período de fechamento de folha e com isso demoram de responder.
          </p>
          <p className="text-amber-700 dark:text-amber-300 text-xs md:text-sm leading-relaxed mt-2">
            Eles ficam até dia 24 de cada mês, chame aqui no WhatsApp que assim que chegar a resposta, te avisaremos.
          </p>
        </div>
      </div>
      <Button
        onClick={handleWhatsAppClick}
        variant="secondary"
        size="sm"
        className="w-full gap-2"
      >
        <MessageCircle className="w-4 h-4" />
        Falar pelo WhatsApp
      </Button>
    </div>
  );
};

export const LoadingProposals = () => {
  const [showGame, setShowGame] = useState(true);
  const isClosingPeriod = isDataprevClosingPeriod();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleWait = () => {
    setShowGame(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full max-w-2xl mx-auto text-center animate-in fade-in duration-500">
      <h2 className="text-lg md:text-2xl font-bold mb-2 md:mb-4">Buscando as melhores propostas</h2>
      
      <div className="space-y-1.5 md:space-y-3 text-muted-foreground mb-3 md:mb-6">
        <div className="flex items-center justify-center gap-2 animate-in fade-in duration-700">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
          <p className="text-xs md:text-base">Analisando seu perfil de crédito</p>
        </div>
        
        <div className="flex items-center justify-center gap-2 animate-in fade-in duration-700 delay-300">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
          <p className="text-xs md:text-base">Consultando instituições financeiras</p>
        </div>
        
        <div className="flex items-center justify-center gap-2 animate-in fade-in duration-700 delay-500">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
          <p className="text-xs md:text-base">Comparando taxas e condições</p>
        </div>
      </div>
      
      {isClosingPeriod ? (
        <DataprevMessage />
      ) : showGame ? (
        <div className="mb-3 md:mb-6 scale-[0.75] md:scale-100 origin-top">
          <TetrisGame key={Date.now()} onWait={handleWait} />
        </div>
      ) : (
        <div className="mb-3 md:mb-6 p-4 md:p-8 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-2 md:mb-4">
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-secondary animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-secondary animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-secondary animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
          <p className="text-sm md:text-base text-muted-foreground">Aguarde, estamos finalizando...</p>
        </div>
      )}
    </div>
  );
};
