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
  bank?: string;
  cpf?: string;
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

// Nova função para parsear objeto com múltiplos bancos
export const parseWebhookObject = (webhookData: Record<string, any>): Proposal[] => {
  console.log("🔍 Parseando objeto do webhook:", webhookData);
  
  const proposals: Proposal[] = [];
  
  for (const [key, value] of Object.entries(webhookData)) {
    // Ignorar campos que não são propostas
    if (key === 'status' || key === 'cpf' || typeof value !== 'object' || value === null) continue;
    
    const bankName = value.bank || key;
    
    proposals.push({
      bank: bankName.toUpperCase(),
      amount: cleanCurrency(value.valor_financiado),
      installments: value.prazo?.toString() || "0",
      installmentValue: cleanCurrency(value.valor_parcela),
      rate: cleanPercentage(value.taxa_juros_mensal),
      total: "0",
      contractUrl: value.contract_url || "Sem link de contrato",
      iof: cleanCurrency(value.iof),
      netAmount: cleanCurrency(value.valor_liquido_liberado),
      firstDueDate: value.data_primeiro_vencimento || "A definir",
      annualRate: cleanPercentage(value.taxa_juros_anual),
      cetMonthly: cleanPercentage(value.cet_mensal),
      cetAnnual: cleanPercentage(value.cet_anual),
    });
  }
  
  console.log("✅ Propostas parseadas do objeto:", proposals);
  return proposals;
};

export const parseWebhookProposals = (webhookData: WebhookProposal[]): Proposal[] => {
  console.log("🔍 Parseando propostas do webhook:", webhookData);
  
  const parsed = webhookData.map((item) => ({
    bank: item.bank?.toUpperCase() || "BANCO",
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