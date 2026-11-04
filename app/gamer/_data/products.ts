export type GamerProduct = {
  id: string;
  name: string;
  processor: string;
  processorBrand: "AMD" | "Intel";
  graphics: string;
  memoryGB: number;
  storage: string;
  image: string;
  imageAlt: string;
  price?: number;
  description: string;
};

// Os produtos reais são cadastrados e publicados no módulo de PC Gamer do K7 Gestão.

// Exemplos de interface: nunca são exibidos como estoque ou ofertas reais.
export const demoProducts: GamerProduct[] = [
  { id: "demo-01", name: "PC Gamer Essential", processor: "AMD Ryzen 5", processorBrand: "AMD", graphics: "Vídeo integrado", memoryGB: 16, storage: "SSD 500 GB", image: "/images/servicos/pc-gamer.png", imageAlt: "Ilustração de gabinete gamer com iluminação azul; não representa o produto", description: "Configuração demonstrativa para visualizar o catálogo. Componentes, fotos, preço e disponibilidade precisam ser cadastrados antes da venda." },
  { id: "demo-02", name: "PC Gamer Performance", processor: "Intel Core i5", processorBrand: "Intel", graphics: "GeForce RTX", memoryGB: 16, storage: "SSD 1 TB", image: "/images/servicos/pc-gamer.png", imageAlt: "Imagem ilustrativa de PC gamer; não representa o produto", description: "Exemplo de card com placa de vídeo dedicada. O modelo e a geração exatos dos componentes serão informados no cadastro do produto real." },
  { id: "demo-03", name: "PC Gamer Advanced", processor: "AMD Ryzen 7", processorBrand: "AMD", graphics: "GeForce RTX", memoryGB: 32, storage: "SSD 1 TB", image: "/images/servicos/pc-gamer.png", imageAlt: "Imagem ilustrativa de PC gamer; não representa o produto", description: "Exemplo de configuração para demonstração da interface. Não é uma oferta comercial nem uma indicação de disponibilidade." },
  { id: "demo-04", name: "PC Gamer Creator", processor: "Intel Core i7", processorBrand: "Intel", graphics: "GeForce RTX", memoryGB: 32, storage: "SSD 2 TB", image: "/images/servicos/pc-gamer.png", imageAlt: "Imagem ilustrativa de PC gamer; não representa o produto", description: "Modelo demonstrativo para conferir fotos e especificações no catálogo. O produto real terá seu próprio cadastro e imagens." },
];
