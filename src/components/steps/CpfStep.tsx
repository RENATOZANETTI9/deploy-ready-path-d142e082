import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CpfStepProps {
  onNext: (cpf: string) => void;
}

export const CpfStep = ({ onNext }: CpfStepProps) => {
  const [cpf, setCpf] = useState("");
  const [error, setError] = useState("");

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.slice(0, 11);
  };

  const validateCPF = (cpf: string) => {
    if (cpf.length !== 11) {
      setError("CPF deve conter 11 dígitos");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateCPF(cpf)) {
      onNext(cpf);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <span className="text-3xl">🔐</span>
        </div>
        <h2 className="text-2xl font-bold mb-2">Vamos começar</h2>
        <p className="text-muted-foreground">
          Para iniciar, preciso apenas do seu CPF:
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="cpf">CPF</Label>
          <Input
            id="cpf"
            type="text"
            inputMode="numeric"
            placeholder="Digite apenas números (ex: 12345678900)"
            value={cpf}
            onChange={(e) => {
              const formatted = formatCPF(e.target.value);
              setCpf(formatted);
              if (error) setError("");
            }}
            className={error ? "border-destructive" : ""}
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <p className="text-xs text-muted-foreground">
            Digite apenas números, sem pontos ou traços
          </p>
        </div>

        <Button type="submit" className="w-full" size="lg">
          Continuar
        </Button>
      </form>
    </div>
  );
};
