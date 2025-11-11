import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExternalLink, TrendingDown, Calendar, DollarSign, Percent, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Proposal {
  bank: string;
  amount: string;
  installments: string;
  installmentValue: string;
  rate: string;
  total: string;
  contractUrl: string;
  iof: string;
  netAmount: string;
  firstDueDate: string;
  annualRate: string;
  cetMonthly: string;
  cetAnnual: string;
}

interface ProposalsStepProps {
  onFinish: () => void;
}

export const ProposalsStep = ({ onFinish }: ProposalsStepProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [phone, setPhone] = useState("");
  const [showContractLink, setShowContractLink] = useState(false);
  const { toast } = useToast();

  // Propostas de exemplo (em produção viriam do backend)
  const proposals: Proposal[] = [
    {
      bank: "UY3",
      amount: "8.500,00",
      installments: "18",
      installmentValue: "520,00",
      rate: "1,99",
      total: "9.360,00",
      contractUrl: "https://nubank.com.br/emprestimo",
      iof: "255,00",
      netAmount: "8.245,00",
      firstDueDate: "15/12/2025",
      annualRate: "26,51",
      cetMonthly: "2,15",
      cetAnnual: "29,12",
    },
    {
      bank: "Banco Inter",
      amount: "8.500,00",
      installments: "18",
      installmentValue: "545,00",
      rate: "2,25",
      total: "9.810,00",
      contractUrl: "https://inter.co/emprestimo",
      iof: "255,00",
      netAmount: "8.245,00",
      firstDueDate: "15/12/2025",
      annualRate: "30,42",
      cetMonthly: "2,42",
      cetAnnual: "33,28",
    },
    {
      bank: "Banco PAN",
      amount: "8.500,00",
      installments: "18",
      installmentValue: "565,00",
      rate: "2,49",
      total: "10.170,00",
      contractUrl: "https://bancopan.com.br/emprestimo",
      iof: "255,00",
      netAmount: "8.245,00",
      firstDueDate: "15/12/2025",
      annualRate: "34,18",
      cetMonthly: "2,68",
      cetAnnual: "37,05",
    },
  ];

  const handleContractClick = (proposal: Proposal) => {
    setSelectedProposal(proposal);
    setIsDialogOpen(true);
    setShowContractLink(false);
    setPhone("");
  };

  const handlePhoneSubmit = async () => {
    if (!phone || phone.length < 10) {
      toast({
        title: "Telefone inválido",
        description: "Por favor, informe um telefone válido",
        variant: "destructive",
      });
      return;
    }

    try {
      // Envia webhook com telefone e proposta selecionada
      await fetch("https://webhook.vpslegaleviver.shop/webhook/nova_vida", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event: "contract_phone_submitted",
          timestamp: new Date().toISOString(),
          data: {
            phone: phone,
            bank: selectedProposal?.bank,
            amount: selectedProposal?.amount,
            installments: selectedProposal?.installments,
            rate: selectedProposal?.rate,
          }
        }),
      });

      console.log("Webhook de telefone enviado com sucesso");
    } catch (error) {
      console.error("Erro ao enviar webhook:", error);
    }

    toast({
      title: "Telefone confirmado",
      description: "Gerando link de formalização...",
    });

    setShowContractLink(true);
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers
        .replace(/^(\d{2})(\d)/g, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
    }
    return phone;
  };

  const ProposalCard = ({ proposal, isBest }: { proposal: Proposal; isBest?: boolean }) => (
    <Card className={`relative overflow-hidden ${isBest ? "border-accent border-2" : ""}`}>
      {isBest && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-accent to-accent/80 text-accent-foreground text-center py-2 font-semibold text-sm">
          ⭐ MELHOR PROPOSTA ⭐
        </div>
      )}
      <CardContent className={`p-6 ${isBest ? "pt-14" : ""}`}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">🏦 {proposal.bank}</h3>
            {isBest && <Badge variant="outline" className="bg-accent/10">Recomendado</Badge>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Primeira linha: Valor Líquido Liberado e Data 1ª Parcela */}
            <div className="col-span-1 bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Valor Líquido Liberado</p>
                  <p className="font-bold text-xl text-primary">R$ {proposal.netAmount}</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-muted/30 rounded-lg p-4">
              <Calendar className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Data 1ª Parcela</p>
                <p className="font-semibold text-sm">{proposal.firstDueDate}</p>
              </div>
            </div>

            {/* Segunda linha: Prazo e Valor da Parcela */}
            <div className="flex items-start gap-2">
              <Calendar className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Prazo</p>
                <p className="font-semibold text-sm">{proposal.installments} parcelas</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <DollarSign className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Valor da Parcela</p>
                <p className="font-semibold text-sm">R$ {proposal.installmentValue}</p>
              </div>
            </div>

            {/* Demais informações */}
            <div className="flex items-start gap-2">
              <DollarSign className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Valor Financiado</p>
                <p className="font-semibold text-sm">R$ {proposal.amount}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <DollarSign className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">IOF</p>
                <p className="font-semibold text-sm">R$ {proposal.iof}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Percent className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Taxa Juros Mensal</p>
                <p className="font-semibold text-sm">{proposal.rate}%</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Percent className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Taxa Juros Anual</p>
                <p className="font-semibold text-sm">{proposal.annualRate}%</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Percent className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">CET Mensal</p>
                <p className="font-semibold text-sm">{proposal.cetMonthly}%</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Percent className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">CET Anual</p>
                <p className="font-semibold text-sm">{proposal.cetAnnual}%</p>
              </div>
            </div>

          </div>

          <Button 
            className="w-full group" 
            variant={isBest ? "default" : "outline"}
            size="lg"
            onClick={() => handleContractClick(proposal)}
          >
            <span className="flex-1">{isBest ? "Contrate e receba no seu PIX💸" : "Contrate esta proposta"}</span>
            <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
          <span className="text-3xl">🎉</span>
        </div>
        <h2 className="text-3xl font-bold mb-2">Encontramos as melhores propostas para você!</h2>
        <p className="text-muted-foreground">
          Selecione a opção que melhor se adequa às suas necessidades
        </p>
      </div>

      <div className="space-y-6 mb-8">
        {proposals.map((proposal, index) => (
          <div key={index} className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 150}ms` }}>
            <ProposalCard 
              proposal={proposal} 
              isBest={index === 0}
            />
          </div>
        ))}
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
        <p className="text-sm text-center">
          💡 <span className="font-semibold">Dica:</span> A melhor proposta (destacada acima) oferece o menor custo total para você!
        </p>
      </div>

      <Button onClick={onFinish} variant="outline" className="w-full" size="lg">
        Fechar
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Finalizar Contratação</DialogTitle>
            <DialogDescription>
              {!showContractLink ? (
                "Informe seu telefone para receber o link de formalização do contrato"
              ) : (
                "Link de formalização gerado com sucesso!"
              )}
            </DialogDescription>
          </DialogHeader>

          {!showContractLink ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone com DDD</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    placeholder="(11) 98765-4321"
                    value={phone}
                    onChange={(e) => setPhone(formatPhone(e.target.value))}
                    maxLength={15}
                    className="pl-10"
                  />
                </div>
              </div>

              <Button onClick={handlePhoneSubmit} className="w-full" size="lg">
                Confirmar Telefone
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-center">
                <p className="text-sm mb-3">
                  📱 Enviaremos o link por WhatsApp e SMS
                </p>
                <p className="font-semibold text-lg mb-1">
                  {selectedProposal?.bank}
                </p>
                <p className="text-sm text-muted-foreground">
                  R$ {selectedProposal?.amount} em {selectedProposal?.installments}x
                </p>
              </div>

              <Button 
                onClick={() => {
                  window.open(selectedProposal?.contractUrl, '_blank');
                  setIsDialogOpen(false);
                }}
                className="w-full group"
                size="lg"
              >
                <span className="flex-1">Acessar Link de Formalização</span>
                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button 
                onClick={() => setIsDialogOpen(false)}
                variant="outline"
                className="w-full"
              >
                Fechar
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
