import type {Metadata} from "next";
import UnifiedProducts from "./UnifiedProducts";
export const dynamic="force-dynamic";
export const metadata:Metadata={title:"Produtos de Informática | K7 Informática",description:"Computadores, notebooks, teclados, mouses, fontes e acessórios.",alternates:{canonical:"/produtos"}};
export default function ProductsPage({searchParams}:{searchParams:Promise<Record<string,string|undefined>>}){return <UnifiedProducts searchParams={searchParams}/>;}
