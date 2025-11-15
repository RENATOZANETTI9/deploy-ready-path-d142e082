import { useState, useEffect } from "react";
import { StepIndicator } from "@/components/StepIndicator";
import { WelcomeStep } from "@/components/steps/WelcomeStep";
import { CpfStep } from "@/components/steps/CpfStep";
import { AuthorizationStep } from "@/components/steps/AuthorizationStep";
import { PixStep } from "@/components/steps/PixStep";
import { ProposalsStep } from "@/components/steps/ProposalsStep";
import { LoadingProposals } from "@/components/LoadingProposals";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  cpf: string;
  pixType: string;
  pixKey: string;
  proposals: any[];
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    cpf: "",
    pixType: "",
    pixKey: "",
    proposals: [],
  });
  const { toast } = useToast();

  const totalSteps = 4;

  const handleStart = () => {
    setCurrentStep(1);
  };

  const handleCpfNext = (cpf: string) => {
    setFormData((prev) => ({ ...prev, cpf }));
    setCurrentStep(2);
    toast({
      title: "CPF confirmado",
      description: "Vamos para a próxima etapa",
      duration: 3000,
    });
  };

  const handleAuthorizationNext = () => {
    setCurrentStep(3);
    toast({
      title: "Autorização concedida",
      description: "Obrigado pela confiança",
      duration: 3000,
    });
  };

  const handlePixNext = (pixType: string, pixKey: string, proposals: any[]) => {
    setFormData((prev) => ({ ...prev, pixType, pixKey, proposals }));
    setIsLoading(true);
    
    toast({
      title: "Dados bancários confirmados",
      description: "Buscando as melhores propostas para você...",
      duration: 3000,
    });

    // Pequeno delay para melhor UX
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(4);
    }, 1500);
  };

  // Scroll to top whenever step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  useEffect(() => {
    if (currentStep === 4 && !isLoading) {
      toast({
        title: "Propostas encontradas! 🎉",
        description: "Encontramos 3 excelentes opções para você",
        duration: 3000,
      });
    }
  }, [currentStep, isLoading, toast]);

  const handleFinish = () => {
    toast({
      title: "Processo concluído",
      description: "Obrigado por utilizar nossos serviços!",
      duration: 3000,
    });
    // Em produção, aqui redirecionaria ou resetaria o fluxo
  };

  const handleStepClick = (step: number) => {
    if (step < currentStep) {
      setCurrentStep(step);
      toast({
        title: "Voltando para etapa anterior",
        description: `Você está na Etapa ${step}`,
        duration: 3000,
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-primary/10 flex flex-col">
      <div className="container mx-auto px-4 py-8 md:py-12 flex-1">
        <div className="max-w-4xl mx-auto">
          {/* Header - Only show after welcome */}
          {currentStep > 0 && (
            <>
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2 uppercase font-visby">
                  CRÉDITO CONSIGNADO CLT
                </h1>
                <p className="text-muted-foreground uppercase font-visby font-bold">
                  PROCESSO RÁPIDO, SEGURO E 100% DIGITAL
                </p>
              </div>

              {/* Step Indicator */}
              <StepIndicator currentStep={currentStep} totalSteps={totalSteps} onStepClick={handleStepClick} />
            </>
          )}

          {/* Steps Content */}
          <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8 lg:p-12 border min-h-[500px] flex items-center justify-center">
            {currentStep === 0 && <WelcomeStep onStart={handleStart} />}
            {currentStep === 1 && <CpfStep onNext={handleCpfNext} onBack={handleBack} />}
            {currentStep === 2 && <AuthorizationStep onNext={handleAuthorizationNext} onBack={handleBack} />}
            {currentStep === 3 && !isLoading && <PixStep onNext={handlePixNext} cpf={formData.cpf} onBack={handleBack} />}
            {isLoading && <LoadingProposals />}
            {currentStep === 4 && !isLoading && <ProposalsStep proposals={formData.proposals} onFinish={handleFinish} />}
          </div>

          {/* Footer */}
          {currentStep > 0 && (
            <div className="text-center mt-8 text-sm text-muted-foreground">
              <p>🔒 Seus dados estão protegidos e seguros</p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
