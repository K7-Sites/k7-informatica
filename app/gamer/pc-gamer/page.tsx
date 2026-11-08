import type { Metadata } from "next";
import UnifiedProducts from "@/app/produtos/UnifiedProducts";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Produtos | K7 Informática",
  description: "Explore todos os produtos K7 Informática: PCs Gamer, computadores, mouses, teclados, notebooks e acessórios. Filtre por categoria e consulte pelo WhatsApp.",
  alternates: { canonical: "/gamer/pc-gamer" },
  openGraph: { title: "Produtos | K7 Informática", description: "Todos os produtos de informática em um só lugar.", url: "/gamer/pc-gamer" },
};

export default function GamerPage({ searchParams }: { searchParams: Promise<Record<string,string|undefined>> }) {
  return <UnifiedProducts searchParams={searchParams} basePath="/gamer/pc-gamer" />;
}
