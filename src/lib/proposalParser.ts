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

// Função para parsear o novo formato com "bancos" como string JSON
export const parseWebhookResponse = (webhookData: any): Proposal[] => {
  console.log("🔍 Parseando resposta do webhook:", webhookData);
  
  const proposals: Proposal[] = [];
  
  try {
    // Formato: [{ "bancos": "[{...}]" }]
    if (Array.isArray(webhookData) && webhookData[0]?.["Bancos liberados"]) {
      const bancosString = webhookData[0]["Bancos liberados"];
      const parsed = typeof bancosString === 'string' ? JSON.parse(bancosString) : bancosString;
      const bancos = Array.isArray(parsed) ? parsed : [parsed];
      
      console.log("🏦 Bancos parseados:", bancos);
      
      for (const banco of bancos) {
        if (!banco || banco.status !== 'ok') continue;
        
        proposals.push({
          bank: (banco.banco || "BANCO").toUpperCase(),
          amount: cleanCurrency(banco.valor_financiado),
          installments: banco.prazo?.toString() || "0",
          installmentValue: cleanCurrency(banco.valor_parcela),
          rate: cleanPercentage(banco.taxa_juros_mensal),
          total: "0",
          contractUrl: banco.contract_url || "Sem link de contrato",
          iof: cleanCurrency(banco.iof),
          netAmount: cleanCurrency(banco.valor_liquido_liberado),
          firstDueDate: banco.data_primeiro_vencimento || "A definir",
          annualRate: cleanPercentage(banco.taxa_juros_anual),
          cetMonthly: cleanPercentage(banco.cet_mensal),
          cetAnnual: cleanPercentage(banco.cet_anual),
        });
      }
    }
  } catch (error) {
    console.error("❌ Erro ao parsear resposta do webhook:", error);
  }
  
  console.log("✅ Propostas parseadas:", proposals);
  return proposals;
};

// Nova função para parsear objeto com múltiplos bancos (formato antigo)
export const parseWebhookObject = (webhookData: Record<string, any>): Proposal[] => {
  console.log("🔍 Parseando objeto do webhook:", webhookData);
  
  const proposals: Proposal[] = [];
  
  for (const [key, value] of Object.entries(webhookData)) {
    if (key === 'status' || key === 'cpf' || typeof value !== 'object' || value === null || !value.valor_financiado) continue;
    
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
  
  // Filtrar itens nulos ou inválidos antes do map
  const validItems = webhookData.filter(item => 
    item !== null && 
    typeof item === 'object' && 
    item.valor_financiado
  );
  
  const parsed = validItems.map((item) => ({
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