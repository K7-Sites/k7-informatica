export const site = {
  name: "K7 Informática",
  url: "https://k7informatica.com",
  phone: "(11) 94921-4071",
  phoneRaw: "5511949214071",
  email: "atendimento@k7informatica.com",
  instagram: "https://www.instagram.com/kassiokennedy_/",
};

export function whatsappUrl(message = "Gostaria de solicitar um orçamento.") {
  const cleanMessage = message.replace(/^Olá,\s*/i, "").replace(/^vim pelo site(?: da K7 Informática)? e\s*/i, "");
  const attributedMessage = `Olá, vim pelo site da K7 Informática. ${cleanMessage}`;

  return `https://wa.me/${site.phoneRaw}?text=${encodeURIComponent(attributedMessage)}`;
}
