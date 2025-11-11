interface WebhookProposal {
  valor_financiado: string;
  iof: string;
  valor_liquido_liberado: string;
  valor_parcela: string;
  prazo: number;
  data_primeiro_vencimento: string;
  taxa_juros_mensal: string;
  taxa_juros_anual: string;
  cet_mensal: string;
  cet_anual: string;
  contract_url: string;
}

export interface Proposal {
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

// Remove "R$ " se existir e retorna apenas números com vírgula
const cleanCurrency = (value: string): string => {
  if (!value) return "0,00";
  return value.replace('R$ ', '').replace('R$', '').trim();
};

// Remove "%" se existir e retorna apenas números
const cleanPercentage = (value: string): string => {
  if (!value) return "0";
  return value.replace('%', '').trim();
};

export const parseWebhookProposals = (webhookData: WebhookProposal[]): Proposal[] => {
  console.log("🔍 Parseando propostas do webhook:", webhookData);
  
  const parsed = webhookData.map((item) => ({
    bank: "UY3",
    amount: cleanCurrency(item.valor_financiado),
    installments: item.prazo ? item.prazo.toString() : "0",
    installmentValue: cleanCurrency(item.valor_parcela),
    rate: cleanPercentage(item.taxa_juros_mensal),
    total: "0",
    contractUrl: item.contract_url || "Sem link de contrato",
    iof: cleanCurrency(item.iof),
    netAmount: cleanCurrency(item.valor_liquido_liberado),
    firstDueDate: item.data_primeiro_vencimento || "A definir",
    annualRate: cleanPercentage(item.taxa_juros_anual),
    cetMonthly: cleanPercentage(item.cet_mensal),
    cetAnnual: cleanPercentage(item.cet_anual),
  }));
  
  console.log("✅ Propostas parseadas:", parsed);
  return parsed;
};