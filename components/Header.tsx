"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { site, whatsappUrl } from "@/lib/site";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";

const nav = [["Início", "#inicio"], ["Serviços", "#servicos"], ["Como funciona", "#como-funciona"], ["Dicas", "#dicas"], ["Regiões", "#regioes"], ["Sobre", "#sobre"], ["Dúvidas", "#duvidas"]];
const tickerItems = ["Informática", "Tucuruvi", "São Paulo", "Zona Norte", "Assistência Técnica", "Manutenção de Notebook", "Manutenção de Computadores", "Suporte Técnico", "Upgrade SSD", "Memória RAM", "Formatação", "Limpeza Interna", "PC Gamer", "Suporte Remoto"];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
        <WhatsAppLink className="button button-sm mobile-cta" href={whatsappUrl()} location="header">Falar no WhatsApp</WhatsAppLink>
      </nav>
      <WhatsAppLink className="button button-sm desktop-cta" href={whatsappUrl()} location="header"><i className="fa-brands fa-whatsapp" aria-hidden="true" /> WhatsApp</WhatsAppLink>
      <button className="menu-toggle" type="button" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /><span /></button>
    </div>
  </header>;
}
