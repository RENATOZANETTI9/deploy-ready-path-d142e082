import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "O que é o Crédito Consignado CLT?",
    answer:
      "O Crédito Consignado CLT é uma modalidade de empréstimo destinada a trabalhadores com carteira assinada (CLT). As parcelas são descontadas diretamente da folha de pagamento, o que garante taxas de juros mais baixas em comparação a outras linhas de crédito pessoal.",
  },
  {
    question: "Quem pode contratar o Consignado CLT?",
    answer:
      "Qualquer trabalhador registrado sob o regime CLT que possua margem consignável disponível pode solicitar. Basta ter vínculo empregatício ativo e a empresa estar conveniada com as instituições financeiras parceiras.",
  },
  {
    question: "Estou negativado, posso contratar?",
    answer:
      "Sim! No empréstimo consignado CLT não há consulta ao SPC/SERASA. Como o desconto é feito diretamente na folha de pagamento, o risco para o banco é menor, permitindo a aprovação mesmo para quem está com o nome negativado.",
  },
  {
    question: "Qual a taxa de juros do Consignado CLT?",
    answer:
      "As taxas variam conforme a instituição financeira e o convênio da empresa. Em geral, as taxas do consignado CLT são significativamente menores do que as de empréstimo pessoal ou cartão de crédito, podendo partir de 1,80% ao mês.",
  },
  {
    question: "Como funciona o processo pela Legal é Viver?",
    answer:
      "O processo é 100% digital e rápido. Basta informar seu CPF, autorizar a consulta, escolher sua chave PIX e verificar seu WhatsApp. Em poucos minutos, apresentamos as melhores propostas disponíveis para o seu perfil.",
  },
  {
    question: "Quanto tempo leva para o dinheiro cair na conta?",
    answer:
      "Após a aprovação e assinatura do contrato, o valor pode ser creditado em até 24 horas úteis diretamente na sua conta via PIX ou transferência bancária.",
  },
  {
    question: "Qual o valor máximo que posso contratar?",
    answer:
      "O valor depende da sua margem consignável disponível, que corresponde a até 35% do seu salário líquido. Nossa plataforma calcula automaticamente e apresenta as melhores opções dentro da sua margem.",
  },
  {
    question: "É seguro fazer o processo online?",
    answer:
      "Sim, totalmente seguro. A Legal é Viver é correspondente bancário credenciado e segue todas as normas do Banco Central e da LGPD (Lei Geral de Proteção de Dados). Seus dados são criptografados e protegidos em todo o processo.",
  },
];

export const FaqSection = () => {
  return (
    <section className="w-full max-w-4xl mx-auto mt-16 px-2 md:px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="text-sm font-bold uppercase tracking-widest text-secondary">
          FAQ
        </span>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground mt-2">
          Perguntas Frequentes
        </h2>
        <p className="text-muted-foreground mt-2 text-sm md:text-base">
          Tire suas dúvidas sobre o Consignado CLT
        </p>
      </div>

      {/* Accordion */}
      <Accordion type="single" collapsible className="space-y-3">
        {faqItems.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border border-border/50 rounded-xl bg-card/60 backdrop-blur-sm px-5 md:px-6 overflow-hidden"
          >
            <AccordionTrigger className="text-left text-sm md:text-base font-semibold text-foreground hover:no-underline py-5 gap-4">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed pb-5">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
