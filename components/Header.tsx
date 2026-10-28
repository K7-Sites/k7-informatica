"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { services } from "@/lib/services";
import { site, whatsappUrl } from "@/lib/site";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";

const nav = [["Início", "#inicio"], ["Como funciona", "#como-funciona"], ["Dicas", "#dicas"], ["Regiões", "#regioes"], ["Sobre", "#sobre"], ["Dúvidas", "#duvidas"]];
const tickerItems = ["Informática", "Tucuruvi", "São Paulo", "Zona Norte", "Assistência Técnica", "Manutenção de Notebook", "Manutenção de Computadores", "Suporte Técnico", "Upgrade SSD", "Memória RAM", "Formatação", "Limpeza Interna", "PC Gamer", "Suporte Remoto"];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [pendingServicePath, setPendingServicePath] = useState<string | null>(null);
  useEffect(() => {
    if (pendingServicePath !== null && pathname === pendingServicePath) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      setPendingServicePath(null);
    }
  }, [pathname, pendingServicePath]);
  useEffect(() => { const onScroll = () => setScrolled(scrollY > 20); onScroll(); addEventListener("scroll", onScroll, { passive: true }); return () => removeEventListener("scroll", onScroll); }, []);
  return <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
    <div className="top-ticker" aria-label="Serviços e região de atendimento">
      <div className="top-ticker-track">
        {[0, 1].map((group) => <div className="top-ticker-group" aria-hidden={group === 1} key={group}>{tickerItems.map((item) => <span key={`${group}-${item}`}>{item}<b>•</b></span>)}</div>)}
      </div>
    </div>
    <div className="container header-inner">
      <a className="brand brand-logo" href="/" aria-label={`${site.name}, início`}><Image src="/images/logo-k7-informatica.svg" alt="Logo K7 Informática" width={471} height={267} priority sizes="(max-width: 780px) 142px, 176px" /></a>
      <nav className={`nav ${open ? "open" : ""}`} aria-label="Navegação principal">
        {nav.map(([label, href]) => <a key={href} href={`/${href}`} onClick={() => setOpen(false)}>{label}</a>)}
        <label className="nav-services-select-wrap"><span className="sr-only">Escolher serviço</span><select aria-label="Serviços da K7 Informática" className="nav-services-select" value={pathname.startsWith("/servicos/") ? pathname : ""} onChange={e => { if (e.target.value) { const destination = e.target.value; setOpen(false); window.scrollTo({ top: 0, left: 0, behavior: "instant" }); if (pathname === destination) { setPendingServicePath(null); } else { setPendingServicePath(destination); router.push(destination, { scroll: true }); } } }}><option value="">Serviços ▾</option>{services.map(service => <option key={service.slug} value={`/servicos/${service.slug}`}>{service.title}</option>)}</select></label>
        <WhatsAppLink className="button button-sm mobile-cta" href={whatsappUrl()} location="header">Falar no WhatsApp</WhatsAppLink>
      </nav>
      <WhatsAppLink className="button button-sm desktop-cta" href={whatsappUrl()} location="header"><i className="fa-brands fa-whatsapp" aria-hidden="true" /> WhatsApp</WhatsAppLink>
      <button className="menu-toggle" type="button" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /><span /></button>
    </div>
  </header>;
}
