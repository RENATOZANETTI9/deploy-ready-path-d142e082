import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-2">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={stepNumber} className="flex items-center flex-1">
              <div className="flex flex-col items-center relative">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                    transition-all duration-300
                    ${
                      isCompleted
                        ? "bg-accent text-accent-foreground shadow-md"
                        : isCurrent
                        ? "bg-primary text-primary-foreground shadow-md scale-110"
                        : "bg-muted text-muted-foreground"
                    }
                  `}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : stepNumber}
                </div>
                <span className="text-xs mt-2 text-muted-foreground font-medium">
                  Etapa {stepNumber}
                </span>
              </div>
              {stepNumber < totalSteps && (
                <div className="flex-1 h-1 mx-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      isCompleted ? "w-full bg-accent" : "w-0 bg-primary"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
