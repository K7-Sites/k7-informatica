import type { Metadata } from "next";
import { GamerCatalog } from "../_components/GamerCatalog";
import { getGamerCatalog } from "@/lib/gamer-catalog";
import { catalogCategories, catalogProducts } from "@/lib/informatica-catalog";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Produtos | K7 Informática",
  description: "Explore todos os produtos da K7 Informática: PCs Gamer, computadores, mouses, teclados, notebooks e acessórios.",
  alternates: { canonical: "/gamer/pc-gamer" },
};

export default async function GamerPage() {
  const [legacy, categories, catalog] = await Promise.all([
    getGamerCatalog(),
    catalogCategories(),
    catalogProducts({ per_page: "48" }),
  ]);
  return <GamerCatalog products={legacy.products} allProducts={catalog?.data ?? []} categories={categories} catalogUnavailable={!catalog} />;
}
