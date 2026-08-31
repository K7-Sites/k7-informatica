export const site = {
  name: "K7 Informática",
  url: "https://k7informatica.com",
  phone: "(11) 94921-4071",
  phoneRaw: "5511949214071",
  email: "atendimento@k7informatica.com",
  instagram: "https://www.instagram.com/kassiokennedy_/",
};

export function whatsappUrl(message = "Olá, vim pelo site e gostaria de solicitar um orçamento.") {
  return `https://wa.me/${site.phoneRaw}?text=${encodeURIComponent(message)}`;
}
