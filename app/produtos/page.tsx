import { redirect } from "next/navigation";

// O catálogo fica exclusivamente na home da loja gamer.
export default function ProductsRedirect() {
  redirect("/gamer/pc-gamer#\u0067amer-products");
}
