import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  onStepClick?: (step: number) => void;
}

export const StepIndicator = ({ currentStep, totalSteps, onStepClick }: StepIndicatorProps) => {
  return (
    <div className="w-full mb-3 md:mb-8 flex justify-center translate-x-[15px] md:translate-x-[65px] lg:translate-x-[95px]">
      <div className="flex items-center justify-center mb-2 w-full">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={stepNumber} className="flex items-center flex-1">
              <div className="flex flex-col items-center relative">
                <div
                  onClick={() => isCompleted && onStepClick?.(stepNumber)}
                  className={`
                    w-8 h-8 md:w-14 md:h-14 rounded-full flex items-center justify-center font-bold text-xs md:text-base
                    transition-all duration-300
                    ${
                      isCompleted
                        ? "bg-secondary text-secondary-foreground shadow-xl cursor-pointer hover:scale-125"
                        : isCurrent
                        ? "bg-primary text-primary-foreground shadow-lg md:scale-110"
                        : "bg-muted text-muted-foreground"
                    }
                  `}
                >
                  {isCompleted ? <Check className="w-4 h-4 md:w-7 md:h-7" strokeWidth={3} /> : stepNumber}
                </div>
                <span className="text-[10px] md:text-xs mt-1 md:mt-2 text-muted-foreground font-medium">
                  Etapa {stepNumber}
                </span>
              </div>
              {stepNumber < totalSteps && (
                <div className="flex-1 h-0.5 md:h-1 mx-1 md:mx-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      isCompleted ? "w-full bg-secondary" : "w-0 bg-primary"
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
