import { useState, useEffect } from "react";
import { StepIndicator } from "@/components/StepIndicator";
import { WelcomeStep } from "@/components/steps/WelcomeStep";
import { CpfStep } from "@/components/steps/CpfStep";
import { AuthorizationStep } from "@/components/steps/AuthorizationStep";
import { PixStep } from "@/components/steps/PixStep";
import { ProposalsStep } from "@/components/steps/ProposalsStep";
import { LoadingProposals } from "@/components/LoadingProposals";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  cpf: string;
  pixType: string;
  pixKey: string;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    cpf: "",
    pixType: "",
    pixKey: "",
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
    });
  };

  const handleAuthorizationNext = () => {
    setCurrentStep(3);
    toast({
      title: "Autorização concedida",
      description: "Obrigado pela confiança",
    });
  };

  const handlePixNext = (pixType: string, pixKey: string) => {
    setFormData((prev) => ({ ...prev, pixType, pixKey }));
    setIsLoading(true);
    
    toast({
      title: "Dados bancários confirmados",
      description: "Buscando as melhores propostas para você...",
    });

    // Simula busca de propostas (em produção seria uma chamada de API)
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(4);
    }, 3000);
  };

  useEffect(() => {
    if (currentStep === 4 && !isLoading) {
      toast({
        title: "Propostas encontradas! 🎉",
        description: "Encontramos 3 excelentes opções para você",
      });
    }
  }, [currentStep, isLoading, toast]);

  const handleFinish = () => {
    toast({
      title: "Processo concluído",
      description: "Obrigado por utilizar nossos serviços!",
    });
    // Em produção, aqui redirecionaria ou resetaria o fluxo
  };

  const handleStepClick = (step: number) => {
    if (step < currentStep) {
      setCurrentStep(step);
      toast({
        title: "Voltando para etapa anterior",
        description: `Você está na Etapa ${step}`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-primary/10">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header - Only show after welcome */}
          {currentStep > 0 && (
            <>
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  Crédito Consignado CLT
                </h1>
                <p className="text-muted-foreground">
                  Processo rápido, seguro e 100% digital
                </p>
              </div>

              {/* Step Indicator */}
              <StepIndicator currentStep={currentStep} totalSteps={totalSteps} onStepClick={handleStepClick} />
            </>
          )}

          {/* Steps Content */}
          <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8 lg:p-12 border min-h-[500px] flex items-center justify-center">
            {currentStep === 0 && <WelcomeStep onStart={handleStart} />}
            {currentStep === 1 && <CpfStep onNext={handleCpfNext} />}
            {currentStep === 2 && <AuthorizationStep onNext={handleAuthorizationNext} />}
            {currentStep === 3 && !isLoading && <PixStep onNext={handlePixNext} />}
            {isLoading && <LoadingProposals />}
            {currentStep === 4 && !isLoading && <ProposalsStep onFinish={handleFinish} />}
          </div>

          {/* Footer */}
          {currentStep > 0 && (
            <div className="text-center mt-8 text-sm text-muted-foreground">
              <p>🔒 Seus dados estão protegidos e seguros</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
