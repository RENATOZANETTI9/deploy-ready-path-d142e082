import { useState, useEffect } from "react";
import { TetrisGame } from "./TetrisGame";

export const LoadingProposals = () => {
  const [showGame, setShowGame] = useState(true);

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
      
      {showGame ? (
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
