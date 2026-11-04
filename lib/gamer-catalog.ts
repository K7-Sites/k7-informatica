import type { GamerProduct } from "@/app/gamer/_data/products";

type CatalogResult = { products: GamerProduct[]; available: boolean };

export async function getGamerCatalog(): Promise<CatalogResult> {
  const token = process.env.K7_GESTAO_LEAD_TOKEN;
  if (!token) return { products: [], available: false };

  try {
    const endpoint = new URL("/api/site/pc-gamer", process.env.K7_GESTAO_LEAD_URL || "https://gestao.k7sites.com.br/api/site/leads");
    const response = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(6000),
    });
    if (!response.ok) return { products: [], available: false };
    const body: unknown = await response.json();
    if (!body || typeof body !== "object" || !("data" in body) || !Array.isArray(body.data)) return { products: [], available: false };

    const products: GamerProduct[] = [];
    for (const item of body.data) {
      if (!item || typeof item !== "object" || !["id", "name", "processor", "graphics", "storage", "description", "image", "imageAlt"].every(key => typeof item[key] === "string") || !["AMD", "Intel"].includes(item.processorBrand) || !Number.isInteger(item.memoryGB) || item.memoryGB < 1 || (item.price !== null && item.price !== undefined && (typeof item.price !== "number" || !Number.isFinite(item.price) || item.price < 0))) {
        return { products: [], available: false };
      }
      const image = new URL(item.image);
      if (image.origin !== endpoint.origin || !["https:", "http:"].includes(image.protocol)) return { products: [], available: false };
      products.push({
        id: item.id, name: item.name, processor: item.processor, processorBrand: item.processorBrand,
        graphics: item.graphics, memoryGB: item.memoryGB, storage: item.storage,
        description: item.description, image: image.toString(), imageAlt: item.imageAlt,
        ...(item.price !== null && item.price !== undefined ? { price: item.price } : {}),
      });
    }
    return { products, available: true };
  } catch {
    return { products: [], available: false };
  }
}
