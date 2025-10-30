import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface CpfStepProps {
  onNext: (cpf: string) => void;
}

export const CpfStep = ({ onNext }: CpfStepProps) => {
  const [cpf, setCpf] = useState("");
  const [error, setError] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [countdown, setCountdown] = useState(6);

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

  useEffect(() => {
    if (isValidating && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isValidating && countdown === 0) {
      validateCpfWithBackend();
    }
  }, [isValidating, countdown]);

  const validateCpfWithBackend = async () => {
    try {
      // Aqui será feita a chamada ao N8N para validar o CPF
      const response = await fetch('YOUR_N8N_WEBHOOK_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cpf }),
      });

      const data = await response.json();

      if (data.valid) {
        // CPF válido, prosseguir
        onNext(cpf);
      } else {
        // CPF inválido, mostrar erro e resetar
        setError("CPF inválido. Por favor, verifique os dados e tente novamente.");
        setIsValidating(false);
        setCountdown(6);
      }
    } catch (err) {
      setError("Erro ao validar CPF. Por favor, tente novamente.");
      setIsValidating(false);
      setCountdown(6);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateCPF(cpf)) {
      setError("");
      setIsValidating(true);
      setCountdown(6);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      {isValidating ? (
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-4">
            <span className="text-6xl font-bold text-primary">{countdown}</span>
          </div>
          <h2 className="text-2xl font-bold">Validando seu CPF...</h2>
          <p className="text-muted-foreground">
            Aguarde enquanto verificamos seus dados
          </p>
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};
