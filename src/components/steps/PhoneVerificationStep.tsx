import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";

interface PhoneVerificationStepProps {
  cpf: string;
  onConfirm: (whatsapp: string) => void;
  onBack: () => void;
}

export const PhoneVerificationStep = ({ cpf, onConfirm, onBack }: PhoneVerificationStepProps) => {
  const [phones, setPhones] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPhone, setSelectedPhone] = useState("");
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualPhone, setManualPhone] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await fetch("https://webhook.vpslegaleviver.shop/webhook/buscar_telefones", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cpf }),
        });

        if (response.ok) {
          const data = await response.json();
          // Handle various response formats
          const phoneList = Array.isArray(data) ? data : data?.telefones || data?.phones || [];
          // Flatten if nested - extract string phone numbers
          const extracted: string[] = [];
          for (const item of phoneList) {
            if (typeof item === "string") extracted.push(item);
            else if (typeof item === "object" && item !== null) {
              const val = item.telefone || item.phone || item.numero || item.whatsapp;
              if (val) extracted.push(String(val));
            }
          }
          setPhones(extracted);
        }
      } catch (err) {
        console.error("Erro ao buscar telefones:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhones();
  }, [cpf]);

  const maskPhone = (phone: string) => {
    const digits = phone.replace(/\D/g, "");
    if (digits.length >= 10) {
      const ddd = digits.slice(0, 2);
      const last4 = digits.slice(-4);
      return `(${ddd}) *****-${last4}`;
    }
    return phone;
  };

  const formatManualPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const handleConfirm = () => {
    if (showManualInput) {
      const digits = manualPhone.replace(/\D/g, "");
      if (digits.length < 10) {
        setError("Digite um número de WhatsApp válido");
        return;
      }
      onConfirm(digits);
    } else if (selectedPhone) {
      onConfirm(selectedPhone.replace(/\D/g, ""));
    } else {
      setError("Selecione seu número de WhatsApp");
    }
  };

  const handleSelectPhone = (phone: string) => {
    setSelectedPhone(phone);
    setShowManualInput(false);
    setManualPhone("");
    setError("");
  };

  const handleShowManual = () => {
    setShowManualInput(true);
    setSelectedPhone("");
    setError("");
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center py-12 animate-in fade-in duration-500">
        <div className="relative inline-flex items-center justify-center w-16 h-16 md:w-24 md:h-24 mb-4">
          <div className="absolute inset-0 rounded-full bg-secondary/20 animate-pulse" />
          <div className="relative flex items-center justify-center w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-secondary/20 to-secondary/10 shadow-lg">
            <ShieldCheck className="w-8 h-8 md:w-12 md:h-12 text-secondary animate-pulse" strokeWidth={2.5} />
          </div>
        </div>
        <Loader2 className="w-6 h-6 text-secondary animate-spin mb-2" />
        <p className="text-muted-foreground text-sm">Verificando dados de segurança...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 scale-[0.8] md:scale-100 origin-top">
      <div className="text-center mb-4 md:mb-6">
        <div className="relative inline-flex items-center justify-center w-16 h-16 md:w-24 md:h-24 mb-2 md:mb-4">
          <div className="absolute inset-0 rounded-full bg-secondary/20 animate-pulse" />
          <div className="absolute inset-0 rounded-full bg-secondary/10 animate-ping" />
          <div className="relative flex items-center justify-center w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-secondary/20 to-secondary/10 shadow-lg">
            <ShieldCheck className="w-8 h-8 md:w-12 md:h-12 text-secondary animate-pulse" strokeWidth={2.5} />
          </div>
        </div>

        <span className="text-sm md:text-base font-semibold text-white bg-secondary border border-secondary/80 rounded-lg px-4 py-2 inline-block mb-3">
          🔒 Verificação de Segurança
        </span>

        <h2 className="text-base md:text-xl font-bold mb-1 md:mb-2">
          Para garantir que é realmente você realizando a consulta, qual desses números é seu WhatsApp?
        </h2>
        <p className="text-xs md:text-sm text-[hsl(45,100%,50%)] font-medium">
          ⚠️ Fique atento em escolher o WhatsApp correto, pois enviamos validação para respeitar a LGPD.
        </p>
      </div>

      <div className="space-y-2 md:space-y-3 mb-4">
        {phones.map((phone, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleSelectPhone(phone)}
            className={`w-full p-3 md:p-4 rounded-lg border-2 transition-all text-left flex items-center gap-3 ${
              selectedPhone === phone && !showManualInput
                ? "bg-secondary/20 border-secondary shadow-[0_0_15px_hsl(var(--secondary)/0.3)]"
                : "border-border hover:border-secondary/50 hover:bg-muted/50"
            }`}
          >
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              selectedPhone === phone && !showManualInput
                ? "border-secondary bg-secondary"
                : "border-muted-foreground"
            }`}>
              {selectedPhone === phone && !showManualInput && (
                <div className="w-2 h-2 rounded-full bg-secondary-foreground" />
              )}
            </div>
            <span className="text-sm md:text-base font-mono font-semibold">
              {maskPhone(phone)}
            </span>
          </button>
        ))}

        {/* Option for manual entry */}
        <button
          type="button"
          onClick={handleShowManual}
          className={`w-full p-3 md:p-4 rounded-lg border-2 transition-all text-left flex items-center gap-3 ${
            showManualInput
              ? "bg-secondary/20 border-secondary shadow-[0_0_15px_hsl(var(--secondary)/0.3)]"
              : "border-border hover:border-secondary/50 hover:bg-muted/50"
          }`}
        >
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
            showManualInput
              ? "border-secondary bg-secondary"
              : "border-muted-foreground"
          }`}>
            {showManualInput && (
              <div className="w-2 h-2 rounded-full bg-secondary-foreground" />
            )}
          </div>
          <span className="text-sm md:text-base">
            Nenhum desses é meu WhatsApp atual
          </span>
        </button>

        {showManualInput && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300 pl-8">
            <Label htmlFor="manualPhone" className="text-sm mb-1 block">
              Digite seu WhatsApp atual:
            </Label>
            <Input
              id="manualPhone"
              type="tel"
              placeholder="(11) 99999-9999"
              value={manualPhone}
              onChange={(e) => {
                setManualPhone(formatManualPhone(e.target.value));
                if (error) setError("");
              }}
              className={error ? "border-destructive" : ""}
            />
          </div>
        )}
      </div>

      {error && <p className="text-sm text-destructive mb-3 text-center">{error}</p>}

      <div className="flex flex-col gap-3">
        <div className="relative inline-block w-full">
          <div className="absolute -inset-1 bg-gradient-to-r from-secondary via-[hsl(15,100%,50%)] to-secondary rounded-2xl blur-md opacity-60 animate-pulse" />
          <Button
            type="button"
            size="lg"
            onClick={handleConfirm}
            className="relative group w-full px-8 py-5 md:py-6 text-base md:text-lg font-black uppercase tracking-wide bg-gradient-to-r from-secondary to-[hsl(15,100%,50%)] hover:from-secondary/90 hover:to-[hsl(15,100%,45%)] text-secondary-foreground rounded-2xl shadow-[0_0_30px_hsl(25,100%,55%,0.5)] hover:shadow-[0_0_50px_hsl(25,100%,55%,0.7)] transition-all duration-300 hover:scale-105 border-2 border-secondary/50"
          >
            ✨ Confirmar
            <ArrowRight className="!size-5 md:!size-6 ml-2 transition-transform group-hover:translate-x-2 animate-bounce" />
          </Button>
        </div>
        <Button type="button" variant="ghost" size="sm" onClick={onBack} className="self-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Voltar
        </Button>
      </div>
    </div>
  );
};
