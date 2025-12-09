import { useState, useEffect } from "react";
import { StepIndicator } from "@/components/StepIndicator";
import { WelcomeStep } from "@/components/steps/WelcomeStep";
import { CpfStep } from "@/components/steps/CpfStep";
import { AuthorizationStep } from "@/components/steps/AuthorizationStep";
import { PixStep } from "@/components/steps/PixStep";
import { ProposalsStep } from "@/components/steps/ProposalsStep";
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCpfNext = (cpf: string) => {
    setFormData((prev) => ({ ...prev, cpf }));
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toast({
      title: "CPF confirmado",
      description: "Vamos para a próxima etapa",
      duration: 3000,
    });
  };

  const handleAuthorizationNext = () => {
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toast({
      title: "Autorização concedida",
      description: "Obrigado pela confiança",
      duration: 3000,
    });
  };

  const handlePixNext = (pixType: string, pixKey: string, proposals: any[]) => {
    setFormData((prev) => ({ ...prev, pixType, pixKey, proposals }));
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (currentStep === 4) {
      toast({
        title: "Propostas encontradas! 🎉",
        description: "Encontramos 3 excelentes opções para você",
        duration: 3000,
      });
    }
  }, [currentStep, toast]);

  const handleFinish = () => {
    setCurrentStep(0);
    setFormData({
      cpf: "",
      pixType: "",
      pixKey: "",
      proposals: [],
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toast({
      title: "Processo concluído",
      description: "Obrigado por utilizar nossos serviços!",
      duration: 3000,
    });
  };

  const handleStepClick = (step: number) => {
    if (step < currentStep) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-primary/10 flex flex-col">
      <div className="container mx-auto px-2 md:px-4 pt-2 md:pt-6 pb-4 md:pb-8 flex-1">
        <div className="max-w-4xl mx-auto">
          {/* Header - Only show after welcome */}
          {currentStep > 0 && (
            <>
              <div className="text-center mb-4 md:mb-12">
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-1 md:mb-2 uppercase font-visby">
                  CRÉDITO CONSIGNADO CLT
                </h1>
                <p className="text-xs md:text-base text-muted-foreground uppercase font-visby font-bold">
                  PROCESSO RÁPIDO, SEGURO E 100% DIGITAL
                </p>
              </div>

              {/* Step Indicator */}
              <StepIndicator currentStep={currentStep} totalSteps={totalSteps} onStepClick={handleStepClick} />
            </>
          )}

          {/* Steps Content */}
          <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8 lg:p-12 border min-h-[500px] flex items-center justify-center overflow-hidden">
            <div 
              key={currentStep} 
              className="w-full animate-in fade-in slide-in-from-right-4 duration-300"
            >
              {currentStep === 0 && <WelcomeStep onStart={handleStart} />}
              {currentStep === 1 && <CpfStep onNext={handleCpfNext} onBack={handleBack} />}
              {currentStep === 2 && <AuthorizationStep onNext={handleAuthorizationNext} onBack={handleBack} cpf={formData.cpf} />}
              {currentStep === 3 && <PixStep onNext={handlePixNext} cpf={formData.cpf} onBack={handleBack} />}
              {currentStep === 4 && <ProposalsStep proposals={formData.proposals} onFinish={handleFinish} formData={formData} />}
            </div>
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
