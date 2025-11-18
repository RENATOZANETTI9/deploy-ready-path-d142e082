import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExternalLink, TrendingDown, Calendar, DollarSign, Percent, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { parseWebhookProposals, type Proposal } from "@/lib/proposalParser";

interface ProposalsStepProps {
  onFinish: () => void;
  proposals: any[];
}

export const ProposalsStep = ({ onFinish, proposals: rawProposals }: ProposalsStepProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [phone, setPhone] = useState("");
  const { toast } = useToast();

  // Parsear propostas do webhook
  console.log("📥 ProposalsStep recebeu rawProposals:", rawProposals);
  const proposals: Proposal[] = parseWebhookProposals(rawProposals);
  console.log("📊 Propostas após parsing:", proposals);

  // Validação: se não houver propostas
  if (!proposals || proposals.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center space-y-6">
          <div className="relative inline-flex items-center justify-center w-24 h-24 mb-4">
            <div className="absolute inset-0 rounded-full bg-destructive/20 animate-pulse" />
            <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-destructive/20 to-destructive/10 shadow-lg">
              <span className="text-5xl">😔</span>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-foreground">Não aprovado desta vez</h2>
          
          <div className="bg-card rounded-lg p-6 shadow-sm border space-y-4">
            <p className="text-base text-muted-foreground leading-relaxed">
              Passamos por <strong className="text-foreground">mais de 5 bancos</strong>, mas infelizmente não conseguimos aprovação em nenhum.
            </p>
            
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <p className="text-sm text-foreground">
                📅 Nós continuaremos acompanhando sua análise e, <strong>a cada 30 dias</strong>, realizamos uma nova tentativa.
              </p>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Assim que houver aprovação, <strong className="text-foreground">avisamos você</strong>! 💚
            </p>
          </div>

          <Button onClick={onFinish} variant="secondary" size="lg" className="w-full max-w-sm">
            Entendido
          </Button>
        </div>
      </div>
    );
  }

  const handleContractClick = (proposal: Proposal) => {
    setSelectedProposal(proposal);
    setIsDialogOpen(true);
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
            installmentValue: selectedProposal?.installmentValue,
            rate: selectedProposal?.rate,
            contractUrl: selectedProposal?.contractUrl,
          }
        }),
      });

      console.log("Webhook de telefone enviado com sucesso");
      
      // Abre o contrato diretamente em nova aba
      if (selectedProposal?.contractUrl) {
        window.open(selectedProposal.contractUrl, '_blank');
      }
      
      // Fecha o dialog e finaliza
      setIsDialogOpen(false);
      onFinish();
    } catch (error) {
      console.error("Erro ao enviar webhook:", error);
      toast({
        title: "Erro",
        description: "Erro ao processar solicitação",
        variant: "destructive",
      });
    }
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
    <Card className={`relative overflow-hidden ${isBest ? "border-secondary border-2 shadow-xl" : ""}`}>
      {isBest && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground text-center py-2 text-sm font-bold tracking-wide">
          ⭐ MELHOR PROPOSTA ⭐
        </div>
      )}
      <CardContent className={`p-6 ${isBest ? "pt-14" : ""}`}>
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold">🏦 {proposal.bank}</h3>
            {isBest && <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary">Recomendado</Badge>}
          </div>

          {/* DESTAQUE PRINCIPAL: Valor Líquido Liberado */}
          <div className="bg-gradient-to-br from-secondary/20 to-secondary/10 border-2 border-secondary rounded-xl p-6 text-center shadow-lg">
            <p className="text-sm font-semibold text-secondary uppercase tracking-wide mb-2">💰 Valor Liberado no seu PIX</p>
            <p className="text-5xl font-black text-secondary mb-1">R$ {proposal.netAmount}</p>
            <p className="text-xs text-muted-foreground">Valor líquido que você recebe</p>
          </div>

          {/* Botão de Contratação - DESTAQUE */}
          <Button 
            className={`w-full group font-bold py-6 ${isBest ? 'bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-2xl animate-pulse hover:animate-none' : 'bg-primary hover:bg-primary/90'}`}
            size="lg"
            onClick={() => handleContractClick(proposal)}
          >
            <span className="flex-1 text-sm md:text-lg">{isBest ? "🚀 Contratar e Receber" : "Contratar proposta"}</span>
            <ExternalLink className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </Button>

          {/* Dados Secundários - Discretos e Pequenos */}
          <div className="pt-4 border-t border-border/50">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-3 font-semibold">Detalhes da Proposta</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div className="flex items-start gap-1.5">
                <Calendar className="w-3 h-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[9px] text-muted-foreground">1ª Parcela</p>
                  <p className="text-[11px] font-medium">{proposal.firstDueDate}</p>
                </div>
              </div>

              <div className="flex items-start gap-1.5">
                <Calendar className="w-3 h-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[9px] text-muted-foreground">Prazo</p>
                  <p className="text-[11px] font-medium">{proposal.installments} parcelas</p>
                </div>
              </div>

              <div className="flex items-start gap-1.5">
                <DollarSign className="w-3 h-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[9px] text-muted-foreground">Valor Parcela</p>
                  <p className="text-[11px] font-medium">R$ {proposal.installmentValue}</p>
                </div>
              </div>

              <div className="flex items-start gap-1.5">
                <DollarSign className="w-3 h-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[9px] text-muted-foreground">Valor Financiado</p>
                  <p className="text-[11px] font-medium">R$ {proposal.amount}</p>
                </div>
              </div>

              <div className="flex items-start gap-1.5">
                <DollarSign className="w-3 h-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[9px] text-muted-foreground">IOF</p>
                  <p className="text-[11px] font-medium">R$ {proposal.iof}</p>
                </div>
              </div>

              <div className="flex items-start gap-1.5">
                <Percent className="w-3 h-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[9px] text-muted-foreground">Taxa Mensal</p>
                  <p className="text-[11px] font-medium">{proposal.rate}%</p>
                </div>
              </div>

              <div className="flex items-start gap-1.5">
                <Percent className="w-3 h-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[9px] text-muted-foreground">Taxa Anual</p>
                  <p className="text-[11px] font-medium">{proposal.annualRate}%</p>
                </div>
              </div>

              <div className="flex items-start gap-1.5">
                <Percent className="w-3 h-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[9px] text-muted-foreground">CET Mensal</p>
                  <p className="text-[11px] font-medium">{proposal.cetMonthly}%</p>
                </div>
              </div>

              <div className="flex items-start gap-1.5">
                <Percent className="w-3 h-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[9px] text-muted-foreground">CET Anual</p>
                  <p className="text-[11px] font-medium">{proposal.cetAnnual}%</p>
                </div>
              </div>
            </div>
          </div>
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
              Informe seu telefone para receber o link de formalização do contrato
            </DialogDescription>
          </DialogHeader>

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
        </DialogContent>
      </Dialog>
    </div>
  );
};
