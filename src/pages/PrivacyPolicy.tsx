import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-legal-e-viver.webp";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-primary/10">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <Link to="/">
            <img 
              src={logo} 
              alt="Legal é Viver" 
              className="h-20 w-auto mb-6"
            />
          </Link>
          <h1 className="text-2xl md:text-4xl font-black text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent uppercase font-visby">
            Política de Privacidade
          </h1>
        </div>

        {/* Content */}
        <div className="bg-card rounded-2xl shadow-lg p-6 md:p-10 border space-y-6 text-card-foreground">
          <p className="text-muted-foreground leading-relaxed">
            Esta política de privacidade ("Política") descreve como <strong>LEGAL É VIVER</strong>, plataforma digital pertencente a <strong>JCR2 SOLUÇÕES E CONSULTORIA LTDA</strong>, CNPJ: 13.238.960/0001-36 ("Empresa", "nós" e "nosso") procede, recolhe, usa e partilha informação pessoal quando usa este website (o "Site"). Por favor leia a informação abaixo cuidadosamente para que possa entender as nossas práticas relativamente como lidamos com a sua informação pessoal e como tratamos essa informação.
          </p>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">1. FINALIDADE DO PROCESSAMENTO</h2>
            
            <h3 className="text-lg font-semibold text-foreground">O que são dados pessoais?</h3>
            <p className="text-muted-foreground leading-relaxed">
              Nós recolhemos informação sobre si de várias formas, incluindo dados pessoais. Como descrito nesta Política "dados pessoais" conforme é definido no regulamento geral de proteção de dados (LGPD), inclui qualquer informação, que combinada com mais dados, ou não que recolhemos sobre você identifica você como um indivíduo, incluindo por exemplo o seu nome, CPF, código postal, email e telefone.
            </p>

            <h3 className="text-lg font-semibold text-foreground">Por que precisamos desta informação pessoal?</h3>
            <p className="text-muted-foreground leading-relaxed">
              Somente processaremos os seus dados pessoais de acordo com as leis de proteção de dados e privacidade aplicáveis. Precisamos de certos dados pessoais para fornecer-lhe acesso ao site. Se você se registrou conosco, terá sido solicitado que você concordasse em fornecer essas informações para acessar aos nossos serviços, como consultar propostas de crédito consignado ou visualizar o nosso conteúdo. Este consentimento nos fornece a base legal que exigimos sob a lei aplicável para processar os seus dados. Você mantém o direito de retirar tal consentimento a qualquer momento. Se você não concordar com o uso dos seus dados pessoais de acordo com esta Política, por favor, não use o nosso website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">2. RECOLHENDO OS SEUS DADOS PESSOAIS</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nós recolhemos informações das seguintes formas:
            </p>
            <p className="text-muted-foreground leading-relaxed font-semibold">Informações que você nos dá. Inclui:</p>
            <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-2 ml-4">
              <li>Os dados pessoais que você fornece quando se registra para usar o nosso website, incluindo seu nome, CPF, e-mail, número de telefone, chave PIX e informações demográficas;</li>
              <li>Os dados pessoais que podem estar contidos em qualquer comentário ou outra publicação que você faz no nosso website;</li>
              <li>Os dados pessoais que você fornece quando reporta um problema no nosso website ou quando necessita de suporte ao cliente;</li>
              <li>Os dados pessoais que você fornece quando nos contacta por telefone, email ou de outra forma.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed font-semibold mt-4">Informações que recolhemos automaticamente:</p>
            <p className="text-muted-foreground leading-relaxed">
              Registramos automaticamente informações sobre si e o seu computador, ou dispositivo móvel quando você acessa o nosso website. Por exemplo, ao visitar o nosso website, registramos o nome e a versão do seu computador, ou dispositivo móvel, o fabricante e o modelo, o tipo de navegador, o idioma do navegador, a resolução do ecrã, o website visitado antes de entrar no nosso website, as páginas visualizadas e por quanto tempo você esteve em uma página, tempos de acesso e informações sobre o seu uso e ações no nosso website. Recolhemos informações sobre si usando cookies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">3. COOKIES</h2>
            
            <h3 className="text-lg font-semibold text-foreground">O que são cookies?</h3>
            <p className="text-muted-foreground leading-relaxed">
              Podemos recolher informação sua usando "cookies". Cookies são pequenos arquivos de dados armazenados no disco rígido do seu computador, ou dispositivo móvel no seu browser. Podemos usar tanto cookies (que expiram depois de fechar o browser) como cookies sem data de expiração (que ficam no seu computador, ou dispositivo móvel até que você os apague) para fornecer-lhe uma experiência mais pessoal e interativa no nosso website.
            </p>

            <h3 className="text-lg font-semibold text-foreground">Cookies que utilizamos</h3>
            <div className="space-y-4">
              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="font-semibold text-foreground">Cookies essenciais</p>
                <p className="text-muted-foreground text-sm">
                  Estes cookies são necessários para fornecer os serviços disponíveis no nosso website, para que você seja capaz de utilizar algumas das suas funcionalidades. Sem estes cookies muitos dos serviços disponíveis no nosso website poderão não funcionar corretamente.
                </p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="font-semibold text-foreground">Cookies de funções</p>
                <p className="text-muted-foreground text-sm">
                  Este cookie permite recordar as escolhas que você já fez no nosso website. O propósito destes cookies é relembrar todas as escolhas que você fez de forma a criar uma experiência mais personalizada sem ter que inserir novamente os seus dados no nosso website.
                </p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="font-semibold text-foreground">Cookies de análise e performance</p>
                <p className="text-muted-foreground text-sm">
                  Estes cookies servem para recolher a informações sobre o tráfego do nosso website e como os utilizadores navegam no website. A informação recolhida não identifica em particular nenhum utilizador. Nós utilizamos estas informações para melhorar e monitorar a atividade do nosso website.
                </p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="font-semibold text-foreground">Cookies de publicidade</p>
                <p className="text-muted-foreground text-sm">
                  Estes cookies analisam a forma como navega para podermos mostrar-lhe anúncios que provavelmente serão do seu interesse. Você pode desabilitar cookies que guardam o histórico da sua navegação visitando as configurações do seu navegador.
                </p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="font-semibold text-foreground">Cookies de redes sociais</p>
                <p className="text-muted-foreground text-sm">
                  Estes cookies são utilizados quando você partilha informação nas redes sociais, ou de alguma forma tem acesso aos nossos conteúdos através das redes sociais como o Facebook, Instagram, ou Google.
                </p>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground">Desabilitando os cookies</h3>
            <p className="text-muted-foreground leading-relaxed">
              Você pode remover, ou rejeitar cookies através das configurações do browser. Para fazer isso recomendamos que siga as instruções do seu browser (normalmente pode encontrar estas informações nas "configurações" do seu browser em "ajuda", ou "ferramentas"). Se não aceitar os nossos cookies, a sua experiência no nosso site não será tão agradável.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">4. PUBLICIDADE</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nós poderemos utilizar terceiros para apresentar anúncios quando visita o nosso website. Estas empresas poderão recolher informações como, tipo de browser, hora e dia, tipo de anúncio foi clicado, neste e outros websites de forma a mostrar os anúncios mais relevantes a você. Estas empresas normalmente utilizam o seu sistema para recolher estes dados, que estão sujeitos às suas políticas de privacidade.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">5. USANDO OS SEUS DADOS PESSOAIS</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nós poderemos utilizar os seus dados pessoais da seguinte forma:
            </p>
            <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-2 ml-4">
              <li>Para manter e melhorar o nosso website, produtos e serviços;</li>
              <li>Para gerir a sua conta, incluindo comunicações que temos consigo relativamente à sua conta;</li>
              <li>Para responder aos seus comentários e perguntas e para prestar apoio ao cliente;</li>
              <li>Para enviar informações, incluindo informação técnica, atualizações, alertas de segurança e suporte;</li>
              <li>Com o seu consentimento, fazemos marketing sobre promoções e outras novidades, incluindo informação sobre os nossos produtos ou serviços. Você poderá deixar de receber estas informações a qualquer momento;</li>
              <li>Quando acharmos necessário e apropriado para cumprir com a lei, pedidos e processo legais, incluindo pedidos de autoridades públicas e governamentais;</li>
              <li>Para proteger os direitos, privacidade, segurança, seus e de outros;</li>
              <li>Para analisar e estudar serviços.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">6. PARTILHAR OS SEUS DADOS PESSOAIS</h2>
            <p className="text-muted-foreground leading-relaxed">
              Podemos partilhar os seus dados pessoais das seguintes formas:
            </p>
            <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-2 ml-4">
              <li><strong>A terceiros designados por você:</strong> Podemos partilhar os seus dados com terceiros em que você tenha dado o seu consentimento, como instituições financeiras parceiras para análise de crédito consignado.</li>
              <li><strong>Serviços prestados por terceiros:</strong> Poderemos partilhar os seus dados pessoais com terceiros que realizam alguns serviços como análise de dados, processamento de pagamentos, suporte ao cliente, envio de e-mail marketing e outros serviços similares.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">7. WEBSITES DE TERCEIROS</h2>
            <p className="text-muted-foreground leading-relaxed">
              O nosso website poderá conter links de terceiros. Esta Política não cobre as Políticas de privacidade de terceiros. Estes websites de terceiros têm as suas próprias políticas de privacidade e não aceitamos qualquer responsabilidade sobre esses websites, suas funções, ou políticas de privacidade. Por favor leia as políticas de privacidade destes websites de terceiros antes de submeter qualquer informação.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">8. CONTEÚDO GERADO PELO UTILIZADOR</h2>
            <p className="text-muted-foreground leading-relaxed">
              Poderá partilhar os seus dados pessoais conosco quando submete e gera conteúdo no nosso website, incluindo comentários e mensagens de suporte. Por favor tenha noção que qualquer informação que você publique no nosso website poderá tornar-se de conhecimento público. Sugerimos que tenha muito cuidado quando decidir tornar público os seus dados pessoais, ou qualquer outra informação no nosso website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">9. TRANSFERÊNCIA DE DADOS INTERNACIONAL</h2>
            <p className="text-muted-foreground leading-relaxed">
              As suas informações incluindo dados pessoais que recolhemos de você, poderão ser transferidos para, guardado em, e processado por nós fora do país onde você reside, onde proteção de dados e regulamentos de privacidade poderão não ter o mesmo nível de proteção como em outros países. Ao aceitar esta política de privacidade você concorda em transferir, guardar e processar os seus dados. Nós iremos tomar todas as medidas necessárias para assegurar que os seus dados são tratados da forma mais segura e de acordo com as nossas políticas.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">10. SEGURANÇA</h2>
            <p className="text-muted-foreground leading-relaxed">
              Procuramos tomar sempre todas as medidas, técnicas e administrativas para proteger todos os seus dados da forma mais segura possível. Infelizmente nenhum sistema é 100% seguro e poderá garantir completamente a segurança dos seus dados. Se você pensa que os seus dados já não estão seguros conosco (por exemplo o acesso à sua conta foi comprometido), por favor entre em contato conosco imediatamente e relate-nos o seu problema.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">11. RETENÇÃO</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nós apenas guardaremos a sua informação pessoal enquanto for necessário e permitido por você para que você possa utilizar o nosso website, a não ser que um período mais longo seja necessário, ou permitido por lei.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">12. NOSSA POLÍTICA COM CRIANÇAS</h2>
            <p className="text-muted-foreground leading-relaxed">
              O nosso website não é direcionado para crianças abaixo dos 18 anos. Se um pai, ou um encarregado de educação verificar que o seu, ou a sua filha forneceu dados pessoais no nosso website sem o seu consentimento, deverá contactar-nos imediatamente. Nós iremos apagar todos esses dados o mais rápido possível.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">13. OS SEUS DIREITOS</h2>
            <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-2 ml-4">
              <li><strong>Sair da lista:</strong> Você pode contactar-nos a qualquer momento para sair da nossa lista de comunicações de marketing, da nossa recolha de dados pessoais sensíveis, ou qualquer novo processamento de dados pessoais que poderemos realizar.</li>
              <li><strong>Acesso:</strong> Você poderá ter acesso às informações que nós possuímos de você a qualquer momento ao contactar-nos.</li>
              <li><strong>Alterar:</strong> Você também poderá contactar-nos para atualizar ou corrigir qualquer informação pessoal que tenhamos sua.</li>
              <li><strong>Portabilidade:</strong> A sua informação pessoal pode ser transferida. Você tem a flexibilidade de mover os seus dados para outro serviço se assim desejar.</li>
              <li><strong>Apagar:</strong> Em algumas situações, por exemplo quando a informação que temos sobre si já não é relevante, ou é incorreta, você poderá pedir para apagarmos os seus dados.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Se você quiser exercer qualquer um destes direitos por favor contacte-nos. Nós iremos atender ao seu pedido o mais breve possível, não mais que 30 dias.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">14. QUEIXAS</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nós estamos empenhados em resolver qualquer queixa sobre a forma como recolhemos os seus dados pessoais. Se tiver alguma queixa que queira fazer sobre a nossa política de privacidade, ou as nossas práticas relacionadas com os seus dados pessoais, por favor contacte-nos através do nosso Instagram: <a href="https://www.instagram.com/legal_viver" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">@legal_viver</a>. Nós iremos responder ao seu contacto o mais rápido possível, no máximo de 30 dias. Em todo o caso, se verificarmos que a sua queixa não foi adequadamente resolvida, você está no seu direito de contactar a autoridade local de proteção de dados (ANPD - Autoridade Nacional de Proteção de Dados).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">15. INFORMAÇÃO DE CONTATO</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nós agradecemos os seus comentários e questões que tenha sobre a nossa política de privacidade. Poderá contactar-nos através do nosso Instagram: <a href="https://www.instagram.com/legal_viver" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">@legal_viver</a>.
            </p>
          </section>

          <div className="pt-6 border-t border-border/50">
            <p className="text-xs text-muted-foreground text-center">
              <strong>LEGAL É VIVER</strong> - JCR2 SOLUÇÕES E CONSULTORIA LTDA - CNPJ: 13.238.960/0001-36
            </p>
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-center mt-8">
          <Button asChild variant="outline" className="gap-2">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Voltar para o início
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
