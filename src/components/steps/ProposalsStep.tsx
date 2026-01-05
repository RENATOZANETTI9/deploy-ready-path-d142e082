import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExternalLink, TrendingDown, Calendar, DollarSign, Percent, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { parseWebhookResponse, parseWebhookProposals, parseWebhookObject, type Proposal } from "@/lib/proposalParser";
import { identifyUser, trackInitiateCheckout, trackPlaceAnOrder, trackPurchase } from "@/hooks/use-tiktok-tracking";
import { WhatsAppHelper } from "@/components/WhatsAppHelper";
import { getUtmData } from "@/hooks/use-utm-tracking";

interface ProposalsStepProps {
  onFinish: () => void;
  proposals: any[];
  formData: {
    cpf: string;
    pixType: string;
    pixKey: string;
  };
}

export const ProposalsStep = ({ onFinish, proposals: rawProposals, formData }: ProposalsStepProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [phone, setPhone] = useState("");
  const { toast } = useToast();

  // Parsear propostas do webhook - detectar formato automaticamente
  console.log("📥 ProposalsStep recebeu rawProposals:", rawProposals);
  
  let proposals: Proposal[] = [];
  
  if (Array.isArray(rawProposals) && rawProposals.length > 0) {
    const firstItem = rawProposals[0];
    
    // Verificar se é o novo formato com "bancos" como string JSON
    if (typeof firstItem === 'object' && firstItem !== null && firstItem.bancos) {
      console.log("🔄 Detectado formato com 'bancos' como string JSON");
      proposals = parseWebhookResponse(rawProposals);
    } else if (typeof firstItem === 'object' && firstItem !== null && !firstItem.valor_financiado) {
      // Formato de objeto com múltiplos bancos como chaves
      console.log("🔄 Detectado formato de objeto com múltiplos bancos");
      proposals = rawProposals.flatMap(item => parseWebhookObject(item));
    } else {
      // Formato antigo: array de propostas diretas
      console.log("🔄 Detectado formato de array de propostas diretas");
      proposals = parseWebhookProposals(rawProposals);
    }
  }
  
  // Filtrar propostas sem link de contrato válido
  proposals = proposals.filter(p => 
    p.contractUrl && 
    p.contractUrl !== "Sem link de contrato" && 
    p.contractUrl.trim() !== ""
  );
  
  console.log("📊 Propostas após parsing e filtro:", proposals);

  // TikTok: Track InitiateCheckout when proposals are shown
  useEffect(() => {
    if (proposals && proposals.length > 0) {
      const bestProposal = proposals[0];
      const netValue = parseFloat(bestProposal.netAmount.replace(/\./g, '').replace(',', '.')) || 0;
      
      trackInitiateCheckout({
        contentId: 'proposals_shown',
        contentName: 'Propostas Exibidas',
        value: netValue,
      });
    }
  }, []);

  // Validação: se não houver propostas
  if (!proposals || proposals.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 scale-[0.8] md:scale-100 origin-top">
        <div className="text-center space-y-3 md:space-y-6">
          <div className="relative inline-flex items-center justify-center w-16 h-16 md:w-24 md:h-24 mb-2 md:mb-4">
            <div className="absolute inset-0 rounded-full bg-destructive/20 animate-pulse" />
            <div className="relative flex items-center justify-center w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-destructive/20 to-destructive/10 shadow-lg">
              <span className="text-3xl md:text-5xl">😔</span>
            </div>
          </div>
          
          <h2 className="text-lg md:text-2xl font-bold text-foreground">Não aprovado desta vez</h2>
          
          <div className="bg-card rounded-lg p-3 md:p-6 shadow-sm border space-y-2 md:space-y-4">
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Passamos por <strong className="text-foreground">mais de 5 bancos</strong>, mas infelizmente não conseguimos aprovação em nenhum.
            </p>
            
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-2 md:p-4">
              <p className="text-xs md:text-sm text-foreground">
                📅 Nós continuaremos acompanhando sua análise e, <strong>a cada 30 dias</strong>, realizamos uma nova tentativa.
              </p>
            </div>
            
            <p className="text-xs md:text-sm text-muted-foreground">
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
    
    // TikTok: Track PlaceAnOrder when user selects a proposal
    const netValue = parseFloat(proposal.netAmount.replace(/\./g, '').replace(',', '.')) || 0;
    trackPlaceAnOrder({
      contentId: `proposal_${proposal.bank.toLowerCase().replace(/\s/g, '_')}`,
      contentName: `Proposta ${proposal.bank}`,
      value: netValue,
      bank: proposal.bank,
    });
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
      const utmData = getUtmData();
      
      // Envia webhook com todas as informações do formulário
      await fetch("https://webhook.vpslegaleviver.shop/webhook/FINALIZAR", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cpf: formData.cpf,
          pixType: formData.pixType,
          pixKey: formData.pixKey,
          phone: phone,
          origem: utmData,
          selectedProposal: {
            bank: selectedProposal?.bank,
            amount: selectedProposal?.amount,
            netAmount: selectedProposal?.netAmount,
            installments: selectedProposal?.installments,
            installmentValue: selectedProposal?.installmentValue,
            rate: selectedProposal?.rate,
            annualRate: selectedProposal?.annualRate,
            iof: selectedProposal?.iof,
            cetMonthly: selectedProposal?.cetMonthly,
            cetAnnual: selectedProposal?.cetAnnual,
            firstDueDate: selectedProposal?.firstDueDate,
            contractUrl: selectedProposal?.contractUrl,
          },
          timestamp: new Date().toISOString(),
        }),
      });

      console.log("Webhook de finalização enviado com sucesso");
      
      // TikTok: Identify with phone and track Purchase
      await identifyUser({ 
        cpf: formData.cpf, 
        phone: phone,
        email: formData.pixType === 'email' ? formData.pixKey : undefined 
      });
      
      const netValue = parseFloat(selectedProposal?.netAmount.replace(/\./g, '').replace(',', '.') || '0') || 0;
      trackPurchase({
        contentId: `contract_${selectedProposal?.bank.toLowerCase().replace(/\s/g, '_')}`,
        contentName: `Contrato ${selectedProposal?.bank}`,
        value: netValue,
        bank: selectedProposal?.bank || '',
      });
      
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
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground text-center py-1 md:py-2 text-[10px] md:text-sm font-bold tracking-wide">
          ⭐ MELHOR PROPOSTA ⭐
        </div>
      )}
      <CardContent className={`p-2 md:p-6 ${isBest ? "pt-8 md:pt-14" : ""}`}>
        <div className="space-y-2 md:space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs md:text-lg font-bold">🏦 {proposal.bank}</h3>
            {isBest && <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary text-[8px] md:text-xs px-1 md:px-2">Recomendado</Badge>}
          </div>

          {/* DESTAQUE PRINCIPAL: Valor Líquido Liberado */}
          <div className="bg-gradient-to-br from-secondary/20 to-secondary/10 border-2 border-secondary rounded-lg p-2 md:p-6 text-center shadow-lg">
            <p className="text-[10px] md:text-sm font-semibold text-secondary uppercase tracking-wide mb-0.5 md:mb-2">💰 Valor Liberado no seu PIX</p>
            <p className="text-xl md:text-5xl font-black text-secondary">R$ {proposal.netAmount}</p>
            <p className="text-[8px] md:text-xs text-muted-foreground">Valor líquido que você recebe</p>
          </div>

          {/* TODAS as informações visíveis */}
          <div className="bg-muted/30 rounded-lg p-2 md:p-4">
            <p className="text-[8px] md:text-xs text-muted-foreground uppercase tracking-wide mb-1.5 md:mb-3 font-semibold">Detalhes da Proposta</p>
            <div className="grid grid-cols-3 gap-1 md:gap-3">
              <div className="flex items-start gap-1 bg-background/50 rounded p-1 md:p-2">
                <Calendar className="w-2.5 h-2.5 md:w-3 md:h-3 text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[7px] md:text-[9px] text-muted-foreground">1ª Parcela</p>
                  <p className="text-[8px] md:text-xs font-semibold">{proposal.firstDueDate}</p>
                </div>
              </div>

              <div className="flex items-start gap-1 bg-background/50 rounded p-1 md:p-2">
                <Calendar className="w-2.5 h-2.5 md:w-3 md:h-3 text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[7px] md:text-[9px] text-muted-foreground">Prazo</p>
                  <p className="text-[8px] md:text-xs font-semibold">{proposal.installments}x</p>
                </div>
              </div>

              <div className="flex items-start gap-1 bg-background/50 rounded p-1 md:p-2">
                <DollarSign className="w-2.5 h-2.5 md:w-3 md:h-3 text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[7px] md:text-[9px] text-muted-foreground">Parcela</p>
                  <p className="text-[8px] md:text-xs font-semibold">R$ {proposal.installmentValue}</p>
                </div>
              </div>

              <div className="flex items-start gap-1 bg-background/50 rounded p-1 md:p-2">
                <DollarSign className="w-2.5 h-2.5 md:w-3 md:h-3 text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[7px] md:text-[9px] text-muted-foreground">Financiado</p>
                  <p className="text-[8px] md:text-xs font-semibold">R$ {proposal.amount}</p>
                </div>
              </div>

              <div className="flex items-start gap-1 bg-background/50 rounded p-1 md:p-2">
                <DollarSign className="w-2.5 h-2.5 md:w-3 md:h-3 text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[7px] md:text-[9px] text-muted-foreground">IOF</p>
                  <p className="text-[8px] md:text-xs font-semibold">R$ {proposal.iof}</p>
                </div>
              </div>

              <div className="flex items-start gap-1 bg-background/50 rounded p-1 md:p-2">
                <Percent className="w-2.5 h-2.5 md:w-3 md:h-3 text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[7px] md:text-[9px] text-muted-foreground">Taxa Mensal</p>
                  <p className="text-[8px] md:text-xs font-semibold">{proposal.rate}%</p>
                </div>
              </div>

              <div className="flex items-start gap-1 bg-background/50 rounded p-1 md:p-2">
                <Percent className="w-2.5 h-2.5 md:w-3 md:h-3 text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[7px] md:text-[9px] text-muted-foreground">Taxa Anual</p>
                  <p className="text-[8px] md:text-xs font-semibold">{proposal.annualRate}%</p>
                </div>
              </div>

              <div className="flex items-start gap-1 bg-background/50 rounded p-1 md:p-2">
                <Percent className="w-2.5 h-2.5 md:w-3 md:h-3 text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[7px] md:text-[9px] text-muted-foreground">CET Mensal</p>
                  <p className="text-[8px] md:text-xs font-semibold">{proposal.cetMonthly}%</p>
                </div>
              </div>

              <div className="flex items-start gap-1 bg-background/50 rounded p-1 md:p-2">
                <Percent className="w-2.5 h-2.5 md:w-3 md:h-3 text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[7px] md:text-[9px] text-muted-foreground">CET Anual</p>
                  <p className="text-[8px] md:text-xs font-semibold">{proposal.cetAnnual}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Botão de Contratação - DESTAQUE */}
          <Button 
            className={`w-full group font-bold py-3 md:py-6 ${isBest ? 'bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-2xl animate-pulse hover:animate-none' : 'bg-primary hover:bg-primary/90'}`}
            size="lg"
            onClick={() => handleContractClick(proposal)}
          >
            <span className="flex-1 text-[10px] md:text-lg">{isBest ? "🚀 Contratar e Receber" : "Contratar proposta"}</span>
            <ExternalLink className="w-3 h-3 md:w-5 md:h-5 ml-1 md:ml-2 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const formatCPF = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 scale-[0.8] md:scale-100 origin-top">
      {/* Exibição do CPF */}
      <div className="bg-muted/50 rounded-lg p-3 border mb-4 text-center">
        <span className="text-sm text-muted-foreground">CPF: </span>
        <span className="text-sm font-semibold">{formatCPF(formData.cpf)}</span>
      </div>

      <div className="text-center mb-4 md:mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-accent/10 mb-2 md:mb-4">
          <span className="text-2xl md:text-3xl">🎉</span>
        </div>
        <h2 className="text-xl md:text-3xl font-bold mb-1 md:mb-2">Encontramos as melhores propostas!</h2>
        <p className="text-xs md:text-base text-muted-foreground">
          Selecione a opção que melhor se adequa às suas necessidades
        </p>
      </div>

      <div className="space-y-3 md:space-y-6 mb-4 md:mb-8">
        {proposals.map((proposal, index) => (
          <div key={index} className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 150}ms` }}>
            <ProposalCard 
              proposal={proposal} 
              isBest={index === 0}
            />
          </div>
        ))}
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-2 md:p-4 mb-3 md:mb-6">
        <p className="text-xs md:text-sm text-center">
          💡 <span className="font-semibold">Dica:</span> A melhor proposta oferece o menor custo total!
        </p>
      </div>

      <Button onClick={onFinish} variant="outline" className="w-full" size="lg">
        Fechar
      </Button>
      
      <div className="mt-6 text-center">
        <WhatsAppHelper />
      </div>

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
