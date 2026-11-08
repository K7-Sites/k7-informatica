"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ContactModal } from "@/components/ContactModal";
import { site } from "@/lib/site";
import { demoProducts, type GamerProduct } from "../_data/products";
import s from "./catalog.module.css";
import type { CatalogProduct, CatalogCategory } from "@/lib/informatica-catalog";
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
      {!demo && <button type="button" className={`${s.primary} ${s.quoteButton}`} onClick={() => { close(); openContact(`Gostaria de um orçamento para o ${product.name} (código ${product.id}). Configuração: ${product.processor}, ${product.graphics}, ${product.memoryGB} GB RAM, ${product.storage}.`); }}><i className="fa-brands fa-whatsapp" aria-hidden="true" /> Solicitar orçamento</button>}
      {product.description && <p className={s.productDescription}>{product.description}</p>}
      {demo && <p className={s.demoText}>Este exemplo não é um produto à venda. Os PCs reais aparecerão após o cadastro.</p>}
    </div>
  </dialog>;
}

function CatalogDetails({ product, close }: { product: CatalogProduct; close: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { const el = dialog.current; el?.showModal(); return () => { el?.close(); }; }, []);
  const photo = product.images[0];
  const details = [["barcode", "Código", product.sku], ...(product.brand ? [["copyright", "Marca", product.brand.name]] : []), ...(product.model ? [["microchip", "Modelo", product.model]] : []), ...(product.computer_specs ? [["microchip", "Processador", product.computer_specs.processor], ["memory", "Memória RAM", `${product.computer_specs.ram_gb} GB`], ["hard-drive", "Armazenamento", `${product.computer_specs.storage_type} ${product.computer_specs.storage_gb} GB`], ["display", "Placa de vídeo", product.computer_specs.gpu]].filter(item => item[2]) : [])];
  return <dialog ref={dialog} className={s.dialog} onCancel={close} onClick={e => { if (e.target === e.currentTarget) close(); }} aria-labelledby="gamer-product-title">
    <button className={s.close} onClick={close} aria-label="Fechar detalhes"><Icon name="xmark" /></button>
    <div className={s.detailsImage}>{photo && <Image src={photo.url} unoptimized alt={photo.alt || product.name} width={720} height={480} />}<small>Fotos do produto</small></div>
    <div className={s.detailsBody}><span className={s.kicker}>K7 INFORMÁTICA</span><h2 id="gamer-product-title">{product.name}</h2>
      <dl className={s.specs}>{details.map(([icon,label,value]) => <div key={label}><Icon name={icon} /><div><dt>{label}</dt><dd>{value}</dd></div></div>)}</dl>
      {product.warranty_months != null && product.warranty_months > 0 && <span className={s.warrantyBadge}><Icon name="shield-halved" /> Garantia de {product.warranty_months === 12 ? "1 ano" : product.warranty_months % 12 === 0 ? `${product.warranty_months / 12} anos` : `${product.warranty_months} meses`}</span>}
      <strong className={s.price}>{product.price !== null ? money(product.price) : "Sob consulta"}</strong>
      {product.availability !== "unavailable" ? <button type="button" className={`${s.primary} ${s.quoteButton}`} onClick={() => { close(); openContact(`Gostaria de consultar o produto ${product.name} (código ${product.sku}).`); }}><i className="fa-brands fa-whatsapp" aria-hidden="true" /> Solicitar orçamento</button> : <p>Produto temporariamente indisponível.</p>}
      {product.description && <section className={s.productDescriptionSection} aria-label="Descrição do produto"><h3>Descrição do produto</h3><div className={s.richDescription} dangerouslySetInnerHTML={{__html:product.description}} /></section>}
    </div>
  </dialog>;
}

function Specs({ product }: { product: GamerProduct }) {
  return <dl className={s.specs}>{[["microchip", "Processador", product.processor], ["display", "Placa de vídeo", product.graphics], ["memory", "Memória", `${product.memoryGB} GB RAM`], ["hard-drive", "Armazenamento", product.storage]].map(([icon, label, value]) => <div key={label}><Icon name={icon} /><div><dt>{label}</dt><dd>{value}</dd></div></div>)}</dl>;
}

export function GamerCatalog({ products, catalogUnavailable = false, allProducts = [], categories = [] }: { products: GamerProduct[]; catalogUnavailable?: boolean; allProducts?: CatalogProduct[]; categories?: CatalogCategory[] }) {
  const [demo, setDemo] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [memory, setMemory] = useState("");
  const [budget, setBudget] = useState("");
  const [order, setOrder] = useState("name");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selected, setSelected] = useState<GamerProduct | null>(null);
  const [selectedCatalog, setSelectedCatalog] = useState<CatalogProduct | null>(null);
  const source = demo ? demoProducts : products;
  const categoryIds = new Map(categories.map(item => [item.slug,item.id]));
  const chosenId = categoryIds.get(category);
  const selectedIds = new Set<number>();
  if (chosenId !== undefined) { selectedIds.add(chosenId); let changed=true; while(changed){ changed=false; for(const item of categories) if(item.parent_id!==null && selectedIds.has(item.parent_id) && !selectedIds.has(item.id)){selectedIds.add(item.id);changed=true;} } }
  const allowedSlugs = new Set(categories.filter(item=>selectedIds.has(item.id)).map(item=>item.slug));
  const catalogResults = allProducts.filter(p => (!category || allowedSlugs.has(p.category.slug)) && (!search || `${p.name} ${p.sku} ${p.model||""} ${p.brand?.name||""}`.toLocaleLowerCase("pt-BR").includes(search.trim().toLocaleLowerCase("pt-BR"))) && (!budget || (p.price !== null && p.price <= Number(budget))) && (!brand || p.availability === brand)).sort((a,b)=>order==="name"?a.name.localeCompare(b.name,"pt-BR"):a.price===null?1:b.price===null?-1:order==="asc"?a.price-b.price:b.price-a.price);
  const results = source.filter(p => `${p.name} ${p.processor} ${p.graphics} ${p.memoryGB} GB ${p.storage}`.toLocaleLowerCase("pt-BR").includes(search.trim().toLocaleLowerCase("pt-BR")) && (!brand || p.processorBrand === brand) && (!memory || p.memoryGB === Number(memory)) && (!budget || (p.price !== undefined && p.price <= Number(budget)))).sort((a, b) => order === "name" ? a.name.localeCompare(b.name, "pt-BR") : a.price === undefined ? b.price === undefined ? 0 : 1 : b.price === undefined ? -1 : order === "asc" ? a.price - b.price : b.price - a.price);
  const hasFilters = Boolean(search || brand || memory || budget);
  function clearFilters() { setSearch(""); setBrand(""); setMemory(""); setBudget(""); setCategory(""); }
  function switchDemo() { setDemo(!demo); clearFilters(); setSelected(null); }

  return <div className={s.catalog}>
    <a className={s.skip} href="#gamer-products">Ir para os produtos</a>
    <header className={s.header}><div className={s.headerInner}>
      <Link href="/gamer/pc-gamer" aria-label="K7 Informática, loja" className={s.logo}><Image src="/images/logo-k7-informatica.png" alt="K7 Informática" width={200} height={105} priority /></Link>
      <form className={s.search} role="search" onSubmit={e => { e.preventDefault(); document.getElementById("gamer-products")?.scrollIntoView({ behavior: "smooth" }); }}><label className={s.srOnly} htmlFor="gamer-search">Buscar produtos por nome, marca ou código</label><input id="gamer-search" type="search" placeholder="Busque mouses, teclados, PCs Gamer e mais" value={search} onChange={e => setSearch(e.target.value)} /><button aria-label="Buscar produtos"><Icon name="magnifying-glass" /></button></form>
      <button type="button" className={s.headerContact} onClick={() => openContact("Quero ajuda para escolher um produto.")}><i className="fa-brands fa-whatsapp" aria-hidden="true" /><span>Precisa de ajuda?<strong>Fale com a K7</strong></span></button>
    </div><nav className={s.nav} aria-label="Navegação da loja"><div><a href="#gamer-products" className={s.active}><Icon name="boxes-stacked" /> Produtos</a><button type="button" onClick={() => openContact("Quero montar um PC Gamer personalizado.")}>Monte seu PC</button><Link href="/" target="_blank" rel="noopener noreferrer">Assistência técnica <Icon name="arrow-up-right-from-square" /></Link><div className={s.headerBadges}><WarrantyBadge /><span className={s.securePaymentBadge}><Icon name="lock" /> Pagamento seguro</span></div><span>TECNOLOGIA QUE ACOMPANHA VOCÊ.</span></div></nav></header>
    <main>
      <HeroSlider />
      <SetupLines />
      <section id="gamer-products" className={s.productsSection} aria-labelledby="gamer-catalog-title">
        <div className={s.breadcrumb}><Link href="/gamer/pc-gamer">K7 Informática</Link><span>/</span><strong>Produtos</strong></div>
        <div className={s.sectionHeading}><div className={s.headingWithWarranty}><div><p className={s.kicker}>ENCONTRE O QUE VOCÊ PRECISA</p><h2 id="gamer-catalog-title">Produtos</h2></div><WarrantyBadge /></div><p>Computadores, notebooks, periféricos e componentes.<br/>Escolha sua categoria e consulte a K7.</p></div>
        <div className={s.toolbar}><span role="status" aria-live="polite">{catalogResults.length} {catalogResults.length===1?"produto encontrado":"produtos encontrados"}</span><button className={s.filterToggle} aria-expanded={filtersOpen} aria-controls="gamer-filters" onClick={()=>setFiltersOpen(!filtersOpen)}><Icon name="sliders"/> Filtros</button><label>Ordenar por <select value={order} onChange={e=>setOrder(e.target.value)}><option value="name">Nome</option><option value="asc">Menor preço</option><option value="desc">Maior preço</option></select></label></div>
        <div className={s.catalogGrid}><aside id="gamer-filters" className={`${s.filters} ${filtersOpen?s.filtersOpen:""}`} aria-label="Filtros de produtos"><h3><Icon name="sliders"/> Filtros</h3>
          <div className={s.categoryFilter}><h4>Escolha uma categoria</h4><p>Selecione um grupo ou uma categoria específica.</p><div className={s.categoryOptions}><button type="button" aria-pressed={!category} className={!category ? s.categorySelected : ""} onClick={() => setCategory("")}>Todos os produtos</button>{categories.filter(item => item.parent_id === null).map(root => <div key={root.id} className={s.categoryGroup}><button type="button" aria-pressed={category === root.slug} className={category === root.slug ? s.categorySelected : ""} onClick={() => setCategory(root.slug)}><Icon name="folder" /> {root.name}</button>{categories.filter(item => item.parent_id === root.id).map(child => <button type="button" key={child.id} aria-pressed={category === child.slug} className={`${s.categoryChild} ${category === child.slug ? s.categorySelected : ""}`} onClick={() => setCategory(child.slug)}><Icon name="angle-right" /> {child.name}</button>)}</div>)}</div></div>
          <label>Preço máximo<select value={budget} onChange={e=>setBudget(e.target.value)}><option value="">Todos os valores</option>{[3000,5000,8000,12000].map(value=><option key={value} value={value}>Até {money(value)}</option>)}</select></label>
          <label>Disponibilidade<select value={brand} onChange={e=>setBrand(e.target.value)}><option value="">Todas</option><option value="available">Disponível</option><option value="on_request">Sob consulta</option><option value="unavailable">Indisponível</option></select></label>
          <p>Produtos sob consulta não entram no filtro de preço.</p>
          {(category||search||budget||brand)&&<button className={s.clear} onClick={clearFilters}>Limpar filtros</button>}
          <div className={s.filterHelp}><Icon name="headset"/><h4>Não sabe qual escolher?</h4><p>Conte o que você procura. A K7 ajuda a encontrar o produto ideal.</p><button type="button" onClick={()=>openContact("Quero ajuda para escolher um produto de informática.")}>Conversar com a K7 <Icon name="arrow-right"/></button></div>
        </aside><div className={s.productGrid}>{catalogResults.map(p => <article className={s.card} key={p.sku}><div className={s.cardImage}><span className={s.tag}>{p.availability === "available" ? "Até durar estoque" : p.availability === "unavailable" ? "Indisponível" : "Sob consulta"}</span>{p.images[0] && <Image src={p.images[0].url} unoptimized alt={p.images[0].alt || p.name} width={600} height={400} sizes="(max-width: 600px) 90vw, (max-width: 1000px) 40vw, 25vw" />}<small>Código: {p.sku}</small></div><div className={s.cardBody}><span className={s.cardEyebrow}>K7 INFORMÁTICA</span><h3>{p.name}</h3><dl className={s.specs}>{p.brand && <div><Icon name="copyright"/><div><dt>Marca</dt><dd>{p.brand.name}</dd></div></div>}{p.model && <div><Icon name="microchip"/><div><dt>Modelo</dt><dd>{p.model}</dd></div></div>}{p.computer_specs && <><div><Icon name="memory"/><div><dt>Memória RAM</dt><dd>{p.computer_specs.ram_gb} GB</dd></div></div><div><Icon name="hard-drive"/><div><dt>Armazenamento</dt><dd>{p.computer_specs.storage_type} {p.computer_specs.storage_gb} GB</dd></div></div>{p.computer_specs.processor && <div><Icon name="microchip"/><div><dt>Processador</dt><dd>{p.computer_specs.processor}</dd></div></div>}{p.computer_specs.gpu && <div><Icon name="display"/><div><dt>Placa de vídeo</dt><dd>{p.computer_specs.gpu}</dd></div></div>}</>}</dl><div className={s.cardBottom}><span>VALOR DO PRODUTO</span><strong className={s.price}>{p.price !== null ? money(p.price) : "Sob consulta"}</strong><button type="button" className={`${s.primary} ${s.viewProductButton}`} onClick={() => setSelectedCatalog(p)}>Ver produto <Icon name="arrow-right"/></button></div></div></article>)}{catalogResults.length===0&&<div className={s.empty}><Icon name="boxes-stacked"/><h3>{catalogUnavailable?"Catálogo temporariamente indisponível":"Nenhum produto encontrado"}</h3><p>{catalogUnavailable?"Não foi possível carregar os produtos. Fale com a K7 para consultar.":"Tente outra categoria ou limpe os filtros."}</p><button className={s.primary} onClick={clearFilters}>Limpar filtros</button></div>}</div></div>
      </section>
    </main>
    <footer className={s.footer}>
      <div className={s.footerColumns}>
        <div className={s.footerBrand}><Link href="/gamer/pc-gamer" aria-label="K7 Informática, PCs Gamer"><Image src="/images/logo-k7-informatica.png" alt="K7 Informática" width={200} height={105} /></Link><p>Seu setup começa com uma boa escolha.</p></div>
        <div className={s.footerPayments}><h3>Pagamento</h3><div className={s.paymentLogos}>{[["pix", "Pix"], ["mercado-pago", "Mercado Pago"], ["mastercard", "Mastercard"], ["visa", "Visa"], ["boleto", "Boleto"]].map(([file, label]) => <span className={s.paymentLogo} key={file} title={label}><Image src={`/images/gamer/payments/${file}.svg`} alt={label} width={80} height={40} /></span>)}</div></div>
        <div className={s.footerSecurity}><h3>Segurança</h3><div className={s.googleSecurity}><Image src="/images/gamer/payments/google.svg" alt="Google" width={90} height={30} /><span><Icon name="shield-halved" /> Navegação segura</span></div></div>
        <div className={s.footerContact}><h3>Atendimento</h3><button type="button" onClick={() => openContact("Gostaria de falar sobre um PC Gamer.")}>{site.phone}</button><button type="button" onClick={() => openContact()}>{site.email}</button></div>
      </div>
      <div className={s.footerBottom}><p>SOMOS E-COMMERCE - NÃO TEMOS ATENDIMENTO LOCAL</p><small>© {new Date().getFullYear()} K7 Informática.</small></div>
    </footer>
    <div className={s.gamerContact}><ContactModal variant="gamer" /></div>
    {selected && <ProductDetails product={selected} demo={demo} close={() => setSelected(null)} />}
    {selectedCatalog && <CatalogDetails product={selectedCatalog} close={() => setSelectedCatalog(null)} />}
  </div>;
}
