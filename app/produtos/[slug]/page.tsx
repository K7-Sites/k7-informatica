import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {catalogProduct} from "@/lib/informatica-catalog";
import {whatsappUrl} from "@/lib/site";
import styles from "../products.module.css";
export const dynamic="force-dynamic";
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const p=await catalogProduct(slug);return {title:p?`${p.name} | K7 Informática`:"Produto | K7 Informática",description:p?.description?.slice(0,150)||"Confira produtos de informática na K7.",robots:p?undefined:{index:false}};}
export default async function ProductPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const p=await catalogProduct(slug);if(!p)notFound();
 const message=`Gostaria de consultar o produto ${p.name} (código ${p.sku}). Página: https://www.k7informatica.com/produtos/${p.slug}`;
 return <main className={styles.page}><header className={styles.header}><Link href="/" className={styles.logo}>K7 INFORMÁTICA</Link><nav><Link href="/gamer/pc-gamer#gamer-products">Todos os produtos</Link><Link href="/gamer/pc-gamer">PC Gamer</Link></nav></header><div className={styles.crumb}><Link href="/gamer/pc-gamer#gamer-products">Produtos</Link> / <Link href={`/gamer/pc-gamer?category=${encodeURIComponent(p.category.slug)}#gamer-products`}>{p.category.name}</Link> / {p.name}</div><div className={styles.detail}><div className={styles.gallery}>{p.images.map((image,i)=><img key={i} src={image.url} alt={image.alt} loading={i?"lazy":"eager"}/>)}</div><div className={styles.info}><p>{p.category.name} · {p.sku}</p><h1>{p.name}</h1>{p.brand&&<p>Marca: {p.brand.name}</p>}{p.model&&<p>Modelo: {p.model}</p>}<strong>{p.price!==null?p.price.toLocaleString("pt-BR",{style:"currency",currency:"BRL"}):"Sob consulta"}</strong><p className={styles.status}>{p.availability==="available"?"Disponível":p.availability==="unavailable"?"Indisponível":"Disponibilidade sob consulta"}</p>{p.availability!=="unavailable"&&<a className={styles.button} href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer">Consultar pelo WhatsApp</a>}{p.availability==="unavailable"&&<p>Produto temporariamente indisponível.</p>}{p.description&&<div className={styles.description}><h2>Descrição</h2><p>{p.description}</p></div>}</div></div></main>;
}
