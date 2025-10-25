import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, TrendingDown, Calendar, DollarSign, Percent } from "lucide-react";

interface Proposal {
  bank: string;
  amount: string;
  installments: string;
  installmentValue: string;
  rate: string;
  total: string;
  contractUrl: string;
}

interface ProposalsStepProps {
  onFinish: () => void;
}

export const ProposalsStep = ({ onFinish }: ProposalsStepProps) => {
  // Propostas de exemplo (em produção viriam do backend)
  const proposals: Proposal[] = [
    {
      bank: "Nubank",
      amount: "8.500,00",
      installments: "18",
      installmentValue: "520,00",
      rate: "1,99",
      total: "9.360,00",
      contractUrl: "https://nubank.com.br/emprestimo",
    },
    {
      bank: "Banco Inter",
      amount: "8.500,00",
      installments: "18",
      installmentValue: "545,00",
      rate: "2,25",
      total: "9.810,00",
      contractUrl: "https://inter.co/emprestimo",
    },
    {
      bank: "Banco PAN",
      amount: "8.500,00",
      installments: "18",
      installmentValue: "565,00",
      rate: "2,49",
      total: "10.170,00",
      contractUrl: "https://bancopan.com.br/emprestimo",
    },
  ];

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

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <DollarSign className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Valor</p>
                <p className="font-semibold">R$ {proposal.amount}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Calendar className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Parcelas</p>
                <p className="font-semibold">{proposal.installments}x de R$ {proposal.installmentValue}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Percent className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Taxa ao mês</p>
                <p className="font-semibold">{proposal.rate}%</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <TrendingDown className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Total</p>
                <p className="font-semibold">R$ {proposal.total}</p>
              </div>
            </div>
          </div>

          <Button 
            className="w-full group" 
            variant={isBest ? "default" : "outline"}
            size="lg"
            onClick={() => window.open(proposal.contractUrl, '_blank')}
          >
            <span className="flex-1">{isBest ? "Contrate agora e receba na sua chave PIX 💸" : "Contrate esta proposta"}</span>
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
    </div>
  );
};
