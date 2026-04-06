import whatsappLogo from '@/assets/whatsapp-logo.png';

const WHATSAPP_NUMBER = "558005914153";
const WHATSAPP_MESSAGE = "Olá, preciso de ajuda com minha proposta";

export const WhatsAppFloatingButton = () => {
  const handleClick = () => {
    const encoded = encodeURIComponent(WHATSAPP_MESSAGE);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Fale conosco pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-20 h-20 rounded-full bg-[hsl(142,72%,40%)] hover:bg-[hsl(142,72%,35%)] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-pulse-subtle"
    >
      <img src={whatsappLogo} alt="WhatsApp" className="w-12 h-12" />
    </button>
  );
};
