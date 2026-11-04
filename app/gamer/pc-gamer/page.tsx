import type { Metadata } from "next";
import { GamerCatalog } from "../_components/GamerCatalog";
import { products } from "../_data/products";

export const metadata: Metadata = {
  title: "PC Gamer | Catálogo K7 Informática",
  description: "Explore o catálogo de PCs Gamer da K7 Informática. Confira fotos, processador, placa de vídeo, memória e armazenamento e solicite seu orçamento.",
  alternates: { canonical: "/gamer/pc-gamer" },
  openGraph: { title: "PC Gamer | K7 Informática", description: "Seu próximo setup começa aqui. Conheça o catálogo de PCs Gamer da K7.", url: "/gamer/pc-gamer", images: [{ url: "/images/servicos/pc-gamer.png", alt: "PC gamer com iluminação azul" }] },
  twitter: { card: "summary_large_image", title: "PC Gamer | K7 Informática", description: "Conheça o catálogo de PCs Gamer da K7 Informática.", images: ["/images/servicos/pc-gamer.png"] },
};

export default function GamerPage() {
  return <GamerCatalog products={products} />;
}
