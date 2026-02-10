

## Atualizar parsing do webhook de propostas

O webhook retorna um formato diferente do esperado atualmente. Precisamos atualizar duas partes do codigo.

### Formato real do webhook

**Sucesso (com bancos):**
```json
[{"Bancos liberados": "{\"cpf\":\"...\",\"status\":\"ok\",\"banco\":\"v8\",\"contract_url\":\"...\", ...}"}]
```

**Sem propostas:**
```json
[{"response": "Nenhum banco liberado"}]
```

### O que muda

1. **PixStep.tsx** - Reescrever a logica de parsing da resposta (linhas 142-166):
   - Verificar se o array retornado contem `response: "Nenhum banco liberado"` e, nesse caso, ir para o fluxo de fallback (coleta de WhatsApp)
   - Se contem `"Bancos liberados"`, usar o parser atualizado para extrair as propostas
   - Importar e utilizar o `parseWebhookResponse` do proposalParser ao inves de fazer parsing manual

2. **proposalParser.ts** - Atualizar `parseWebhookResponse` (linha 53):
   - Trocar a chave `bancos` por `"Bancos liberados"` no acesso ao objeto
   - O valor e uma string JSON que contem um unico objeto de banco (nao um array), entao tratar ambos os casos: se for string de objeto unico, colocar em array; se ja for array, usar direto
   - Manter o filtro de `status === 'ok'` e validacao de `contract_url` existente

### Detalhes tecnicos

**proposalParser.ts:**
- Linha 53: `webhookData[0]?.bancos` vira `webhookData[0]?.["Bancos liberados"]`
- O valor pode ser um objeto unico stringificado (como no exemplo), nao necessariamente um array. Apos o parse, verificar se e array; se nao, encapsular em `[parsed]`

**PixStep.tsx:**
- Apos `response.json()`, checar primeiro se `responseData[0]?.response` contem "Nenhum banco liberado" - se sim, ir para fallback
- Caso contrario, passar `responseData` para `parseWebhookResponse` e usar o resultado
- Se o resultado tiver 0 propostas validas (sem `contract_url` ou sem `valor_financiado`), tambem ir para fallback
- Remover o bloco que checa `responseData.status === 'certo'` pois esse formato nao e mais usado

