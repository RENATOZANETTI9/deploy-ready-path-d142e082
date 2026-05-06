import { ProposalsStep } from "@/components/steps/ProposalsStep";

const mockProposals = [
  {
    banco: "UY3",
    status: "ok",
    valor_financiado: "5.120,00",
    iof: "128,40",
    valor_liquido_liberado: "4.815,60",
    valor_parcela: "182,30",
    prazo: 36,
    data_primeiro_vencimento: "15/06/2026",
    taxa_juros_mensal: "1,95",
    taxa_juros_anual: "26,10",
    cet_mensal: "2,18",
    cet_anual: "29,40",
    contract_url: "https://exemplo.com/contrato-uy3",
  },
  {
    banco: "V8",
    status: "ok",
    valor_financiado: "5.050,00",
    iof: "126,80",
    valor_liquido_liberado: "4.752,20",
    valor_parcela: "179,90",
    prazo: 36,
    data_primeiro_vencimento: "18/06/2026",
    taxa_juros_mensal: "1,99",
    taxa_juros_anual: "26,70",
    cet_mensal: "2,22",
    cet_anual: "29,90",
    contract_url: "https://exemplo.com/contrato-v8",
  },
  {
    banco: "MERCANTIL",
    status: "ok",
    valor_financiado: "4.980,00",
    iof: "124,90",
    valor_liquido_liberado: "4.687,40",
    valor_parcela: "177,50",
    prazo: 36,
    data_primeiro_vencimento: "20/06/2026",
    taxa_juros_mensal: "2,02",
    taxa_juros_anual: "27,10",
    cet_mensal: "2,25",
    cet_anual: "30,20",
    contract_url: "https://exemplo.com/contrato-mercantil",
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
