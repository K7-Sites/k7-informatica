export type SetupLine = {
  id: string;
  name: string;
  subtitle?: string;
  image: string | null;
  imageAlt: string;
};

// Adicione apenas o caminho da imagem transparente do PC e acessórios.
// Fundo, moldura e textos são renderizados pelo componente, fora da imagem.
export const setupLines: SetupLine[] = [
  { id: "custom", name: "CUSTOM", subtitle: "DO SEU JEITO", image: "/images/gamer/pc-gamer-montagem.webp", imageAlt: "PC customizado e acessórios" },
  { id: "gamer", name: "GAMER", image: "/images/gamer/pc-gamer.webp", imageAlt: "PC gamer e acessórios" },
  { id: "moba", name: "MOBA", image: "/images/gamer/pc-gamer-custom.webp", imageAlt: "PC para jogos MOBA e acessórios" },
  { id: "home", name: "HOME", image: "/images/gamer/pc-gamer-loja.webp", imageAlt: "PC para uso doméstico e acessórios" },
];
