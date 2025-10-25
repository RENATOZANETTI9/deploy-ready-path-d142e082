import { useState } from "react";
import { StepIndicator } from "@/components/StepIndicator";
import { CpfStep } from "@/components/steps/CpfStep";
import { AuthorizationStep } from "@/components/steps/AuthorizationStep";
import { PixStep } from "@/components/steps/PixStep";
import { ProposalsStep } from "@/components/steps/ProposalsStep";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  cpf: string;
  pixType: string;
  pixKey: string;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    cpf: "",
    pixType: "",
    pixKey: "",
  });
  const { toast } = useToast();

  const totalSteps = 4;

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
    setCurrentStep(4);
    toast({
      title: "Dados bancários confirmados",
      description: "Buscando as melhores propostas para você...",
    });
  };

  const handleFinish = () => {
    toast({
      title: "Processo concluído",
      description: "Obrigado por utilizar nossos serviços!",
    });
    // Em produção, aqui redirecionaria ou resetaria o fluxo
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              Solicitação de Crédito
            </h1>
            <p className="text-muted-foreground">
              Processo rápido, seguro e 100% digital
            </p>
          </div>

          {/* Step Indicator */}
          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

          {/* Steps Content */}
          <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8 lg:p-12 border">
            {currentStep === 1 && <CpfStep onNext={handleCpfNext} />}
            {currentStep === 2 && <AuthorizationStep onNext={handleAuthorizationNext} />}
            {currentStep === 3 && <PixStep onNext={handlePixNext} />}
            {currentStep === 4 && <ProposalsStep onFinish={handleFinish} />}
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-muted-foreground">
            <p>🔒 Seus dados estão protegidos e seguros</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
