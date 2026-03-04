import { ProposalsStep } from "@/components/steps/ProposalsStep";

const mockProposals = [
  {
    banco: "BANCO PAN",
    status: "ok",
    valor_financiado: "5.230,45",
    iof: "132,50",
    valor_liquido_liberado: "4.897,95",
    valor_parcela: "189,90",
    prazo: 36,
    data_primeiro_vencimento: "15/04/2026",
    taxa_juros_mensal: "1,89",
    taxa_juros_anual: "25,20",
    cet_mensal: "2,15",
    cet_anual: "28,90",
    contract_url: "https://exemplo.com/contrato-pan",
  },
  {
    banco: "BMG",
    status: "ok",
    valor_financiado: "4.980,00",
    iof: "125,30",
    valor_liquido_liberado: "4.654,70",
    valor_parcela: "175,50",
    prazo: 36,
    data_primeiro_vencimento: "20/04/2026",
    taxa_juros_mensal: "2,05",
    taxa_juros_anual: "27,50",
    cet_mensal: "2,30",
    cet_anual: "31,20",
    contract_url: "https://exemplo.com/contrato-bmg",
  },
  {
    banco: "SAFRA",
    status: "ok",
    valor_financiado: "4.750,00",
    iof: "118,90",
    valor_liquido_liberado: "4.431,10",
    valor_parcela: "168,00",
    prazo: 36,
    data_primeiro_vencimento: "18/04/2026",
    taxa_juros_mensal: "2,10",
    taxa_juros_anual: "28,30",
    cet_mensal: "2,40",
    cet_anual: "32,50",
    contract_url: "https://exemplo.com/contrato-safra",
  },
];

const wrappedProposals = [{ "Bancos liberados": JSON.stringify(mockProposals), bancos: JSON.stringify(mockProposals) }];

const TestProposals = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-primary/10 flex flex-col">
      <div className="container mx-auto px-2 md:px-4 pt-2 md:pt-6 pb-4 md:pb-8 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8 lg:p-12 border min-h-[500px] flex items-center justify-center overflow-hidden">
            <div className="w-full">
              <ProposalsStep
                proposals={wrappedProposals}
                onFinish={() => alert("Finalizado!")}
                formData={{ cpf: "12345678901", pixType: "cpf", pixKey: "12345678901" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestProposals;
