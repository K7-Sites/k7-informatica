"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ContactModal } from "@/components/ContactModal";
import { site } from "@/lib/site";
import { demoProducts, type GamerProduct } from "../_data/products";
import s from "./catalog.module.css";
import { HeroSlider } from "./HeroSlider";
import { SetupLines } from "./SetupLines";

function openContact(message = "") {
  window.dispatchEvent(new CustomEvent("k7:open-contact", { detail: { message } }));
}

const money = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
function Icon({ name }: { name: string }) { return <i className={`fa-solid fa-${name}`} aria-hidden="true" />; }

function WarrantyBadge() {
  return <span className={s.warrantyBadge}><Icon name="shield-halved" /> Garantia de 1 ano</span>;
}

function ProductDetails({ product, demo, close }: { product: GamerProduct; demo: boolean; close: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { const el = dialog.current; el?.showModal(); return () => { el?.close(); }; }, []);
  return <dialog ref={dialog} className={s.dialog} onCancel={close} onClick={e => { if (e.target === e.currentTarget) close(); }} aria-labelledby="gamer-product-title">
    <button className={s.close} onClick={close} aria-label="Fechar detalhes"><Icon name="xmark" /></button>
    <div className={s.detailsImage}><Image src={product.image} unoptimized={product.image.startsWith("https://")} alt={product.imageAlt} width={720} height={480} /><small>{demo ? "Imagem ilustrativa · exemplo de layout" : "Fotos do produto"}</small></div>
    <div className={s.detailsBody}><span className={s.kicker}>{demo ? "MODELO DEMONSTRATIVO" : "K7 INFORMÁTICA / PC GAMER"}</span><h2 id="gamer-product-title">{product.name}</h2>
      <Specs product={product} />
      <WarrantyBadge />
      <strong className={s.price}>{demo ? "Exemplo sem preço de venda" : product.price !== undefined ? money(product.price) : "Sob consulta"}</strong>
      {!demo && <button type="button" className={s.primary} onClick={() => { close(); openContact(`Gostaria de um orçamento para o ${product.name} (código ${product.id}). Configuração: ${product.processor}, ${product.graphics}, ${product.memoryGB} GB RAM, ${product.storage}.`); }}><i className="fa-brands fa-whatsapp" aria-hidden="true" /> Solicitar orçamento</button>}
      {product.description && <p className={s.productDescription}>{product.description}</p>}
      {demo && <p className={s.demoText}>Este exemplo não é um produto à venda. Os PCs reais aparecerão após o cadastro.</p>}
    </div>
  </dialog>;
}

function Specs({ product }: { product: GamerProduct }) {
  return <dl className={s.specs}>{[["microchip", "Processador", product.processor], ["display", "Placa de vídeo", product.graphics], ["memory", "Memória", `${product.memoryGB} GB RAM`], ["hard-drive", "Armazenamento", product.storage]].map(([icon, label, value]) => <div key={label}><Icon name={icon} /><div><dt>{label}</dt><dd>{value}</dd></div></div>)}</dl>;
}

export function GamerCatalog({ products, catalogUnavailable = false }: { products: GamerProduct[]; catalogUnavailable?: boolean }) {
  const [demo, setDemo] = useState(false);
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [memory, setMemory] = useState("");
  const [budget, setBudget] = useState("");
  const [order, setOrder] = useState("name");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selected, setSelected] = useState<GamerProduct | null>(null);
  const source = demo ? demoProducts : products;
  const results = source.filter(p => `${p.name} ${p.processor} ${p.graphics} ${p.memoryGB} GB ${p.storage}`.toLocaleLowerCase("pt-BR").includes(search.trim().toLocaleLowerCase("pt-BR")) && (!brand || p.processorBrand === brand) && (!memory || p.memoryGB === Number(memory)) && (!budget || (p.price !== undefined && p.price <= Number(budget)))).sort((a, b) => order === "name" ? a.name.localeCompare(b.name, "pt-BR") : a.price === undefined ? b.price === undefined ? 0 : 1 : b.price === undefined ? -1 : order === "asc" ? a.price - b.price : b.price - a.price);
  const hasFilters = Boolean(search || brand || memory || budget);
  function clearFilters() { setSearch(""); setBrand(""); setMemory(""); setBudget(""); }
  function switchDemo() { setDemo(!demo); clearFilters(); setSelected(null); }

  return <div className={s.catalog}>
    <a className={s.skip} href="#gamer-products">Ir para os produtos</a>
    <header className={s.header}><div className={s.headerInner}>
      <Link href="/" aria-label="K7 Informática, página inicial" className={s.logo}><Image src="/images/logo-k7-informatica.png" alt="K7 Informática" width={200} height={105} priority /></Link>
      <form className={s.search} role="search" onSubmit={e => { e.preventDefault(); document.getElementById("gamer-products")?.scrollIntoView({ behavior: "smooth" }); }}><label className={s.srOnly} htmlFor="gamer-search">Buscar PCs por nome ou configuração</label><input id="gamer-search" type="search" placeholder="Encontre seu próximo PC Gamer" value={search} onChange={e => setSearch(e.target.value)} /><button aria-label="Buscar PCs"><Icon name="magnifying-glass" /></button></form>
      <button type="button" className={s.headerContact} onClick={() => openContact("Quero ajuda para escolher um PC Gamer.")}><i className="fa-brands fa-whatsapp" aria-hidden="true" /><span>Precisa de ajuda?<strong>Fale com a K7</strong></span></button>
    </div><nav className={s.nav} aria-label="Navegação gamer"><div><a href="#gamer-products" className={s.active}><Icon name="desktop" /> PCs Gamer</a><button type="button" onClick={() => openContact("Quero montar um PC Gamer personalizado.")}>Monte seu PC</button><Link href="/" target="_blank" rel="noopener noreferrer">Assistência técnica <Icon name="arrow-up-right-from-square" /></Link><WarrantyBadge /><span>TECNOLOGIA QUE ACOMPANHA VOCÊ.</span></div></nav></header>
    <main>
      <HeroSlider />
      <SetupLines />
      <section id="gamer-products" className={s.productsSection} aria-labelledby="gamer-catalog-title"><div className={s.breadcrumb}><Link href="/">K7 Informática</Link><span>/</span><span>Gamer</span><span>/</span><strong>PC Gamer</strong></div>
        <div className={s.sectionHeading}><div className={s.headingWithWarranty}><div><p className={s.kicker}>ESCOLHA SUA CONFIGURAÇÃO</p><h2 id="gamer-catalog-title">PCs Gamer</h2></div><WarrantyBadge /></div><p>Mais clareza para escolher.<br />Mais possibilidades para jogar.</p></div>
        {demo && <div className={s.notice} role="status"><Icon name="circle-info" /><p><strong>Prévia demonstrativa do catálogo.</strong> Fotos e configurações ilustrativas, sem ofertas ou estoque real.</p><button onClick={switchDemo}>Sair da prévia</button></div>}
        <div className={s.toolbar}><span role="status" aria-live="polite">{results.length} {results.length === 1 ? "PC encontrado" : "PCs encontrados"}{demo ? " na prévia" : ""}</span><button className={s.filterToggle} aria-expanded={filtersOpen} aria-controls="gamer-filters" onClick={() => setFiltersOpen(!filtersOpen)}><Icon name="sliders" /> Filtros</button><label>Ordenar por <select value={order} onChange={e => setOrder(e.target.value)}><option value="name">Nome</option><option value="asc">Menor preço</option><option value="desc">Maior preço</option></select></label></div>
        <div className={s.catalogGrid}><aside id="gamer-filters" className={`${s.filters} ${filtersOpen ? s.filtersOpen : ""}`} aria-label="Filtros de PCs"><h3><Icon name="sliders" /> Filtros</h3><label>Processador<select value={brand} onChange={e => setBrand(e.target.value)}><option value="">Todos</option><option>AMD</option><option>Intel</option></select></label><label>Memória RAM<select value={memory} onChange={e => setMemory(e.target.value)}><option value="">Todas</option>{Array.from(new Set(source.map(p => p.memoryGB))).sort((a, b) => a - b).map(value => <option key={value} value={value}>{value} GB</option>)}</select></label><label>Preço máximo<select value={budget} onChange={e => setBudget(e.target.value)}><option value="">Todos os valores</option>{[3000, 5000, 8000, 12000].map(value => <option key={value} value={value}>Até {money(value)}</option>)}</select></label><p>Produtos sob consulta não entram no filtro de preço.</p>{hasFilters && <button className={s.clear} onClick={clearFilters}>Limpar filtros</button>}<div className={s.filterHelp}><Icon name="headset" /><h4>Não sabe qual escolher?</h4><p>Conte o que você quer jogar. A K7 ajuda com a configuração.</p><button type="button" onClick={() => openContact("Preciso de ajuda para escolher a configuração do meu PC Gamer.")}>Conversar com a K7 <Icon name="arrow-right" /></button></div></aside>
        <div className={s.productGrid}>{results.map(p => <article className={s.card} key={p.id}><div className={s.cardImage}><span className={s.tag}>{demo ? "Demonstrativo" : "Até durar estoque"}</span><Image src={p.image} unoptimized={p.image.startsWith("https://")} alt={p.imageAlt} width={600} height={400} sizes="(max-width: 600px) 90vw, (max-width: 1000px) 40vw, 25vw" /><small>{demo ? "Imagem ilustrativa" : `Código: ${p.id}`}</small></div><div className={s.cardBody}><span className={s.cardEyebrow}>K7 INFORMÁTICA</span><h3>{p.name}</h3><Specs product={p} /><WarrantyBadge /><div className={s.cardBottom}><span>{demo ? "EXEMPLO DE CONFIGURAÇÃO" : "VALOR DO PC"}</span><strong className={s.price}>{demo ? "Prévia do catálogo" : p.price !== undefined ? money(p.price) : "Sob consulta"}</strong><button className={s.primary} onClick={() => setSelected(p)}>Ver configuração <Icon name="arrow-right" /></button></div></div></article>)}
          {results.length === 0 && <div className={s.empty}><Icon name={hasFilters ? "magnifying-glass" : "desktop"} /><h3>{hasFilters ? "Nenhum PC com esses filtros" : catalogUnavailable && !demo ? "Catálogo temporariamente indisponível" : "Seu próximo PC está chegando"}</h3><p>{hasFilters ? "Tente outro termo ou remova os filtros para encontrar mais configurações." : catalogUnavailable && !demo ? "Não foi possível carregar os PCs agora. Tente novamente em instantes ou fale com a K7 para consultar uma configuração." : "Estamos preparando nosso catálogo de PCs Gamer. Enquanto isso, fale com a K7 para consultar uma configuração personalizada."}</p>{hasFilters ? <button className={s.primary} onClick={clearFilters}>Limpar filtros</button> : <><button type="button" className={s.primary} onClick={() => openContact("Quero consultar uma configuração de PC Gamer.")}>Consultar pelo WhatsApp</button><button className={s.demoButton} onClick={switchDemo}>Visualizar exemplo do catálogo <Icon name="arrow-right" /></button></>}</div>}
        </div></div>
      </section>
    </main>
    <footer className={s.footer}><div><strong>K7 INFORMÁTICA <span>/ GAMER</span></strong><p>Seu setup começa com uma boa escolha.</p><Link href="/">Voltar ao site principal <Icon name="arrow-right" /></Link></div><div><button type="button" onClick={() => openContact("Gostaria de falar sobre um PC Gamer.")}>{site.phone}</button><button type="button" onClick={() => openContact()}>{site.email}</button><small>© {new Date().getFullYear()} K7 Informática.</small></div></footer>
    <div className={s.gamerContact}><ContactModal variant="gamer" /></div>
    {selected && <ProductDetails product={selected} demo={demo} close={() => setSelected(null)} />}
  </div>;
}
