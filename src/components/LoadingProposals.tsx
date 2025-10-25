import { Loader2 } from "lucide-react";

export const LoadingProposals = () => {
  return (
    <div className="w-full max-w-md mx-auto text-center animate-in fade-in duration-500">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6 animate-pulse">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
      
      <h2 className="text-2xl font-bold mb-4">Buscando as melhores propostas</h2>
      
      <div className="space-y-3 text-muted-foreground">
        <div className="flex items-center justify-center gap-2 animate-in fade-in duration-700">
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
          <p>Analisando seu perfil de crédito</p>
        </div>
        
        <div className="flex items-center justify-center gap-2 animate-in fade-in duration-700 delay-300">
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
          <p>Consultando instituições financeiras</p>
        </div>
        
        <div className="flex items-center justify-center gap-2 animate-in fade-in duration-700 delay-500">
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
          <p>Comparando taxas e condições</p>
        </div>
      </div>

      <div className="mt-8 p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground">
          Aguarde um momento enquanto encontramos as melhores ofertas para você...
        </p>
      </div>
    </div>
  );
};
