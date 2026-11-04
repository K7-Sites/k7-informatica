"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import s from "./catalog.module.css";

const slides = [
  { image: "/images/servicos/pc-gamer.png", alt: "PC Gamer com gabinete de vidro e iluminação interna", fit: "cover" },
  { image: "/images/servicos/upgrade-gpu.png", alt: "Placa de vídeo dedicada em montagem de PC Gamer", fit: "cover" },
  { image: "/images/servicos/manutencao-upgrade-pc-gamer-service.png", alt: "Gabinete gamer, placa de vídeo, memória e SSD", fit: "contain" },
] as const;

export function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (paused || hovered || focused || motion.matches) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive(current => (current + 1) % slides.length);
    }, 6000);
    const stopOnReducedMotion = () => { if (motion.matches) window.clearInterval(timer); };
    motion.addEventListener("change", stopOnReducedMotion);
    return () => { window.clearInterval(timer); motion.removeEventListener("change", stopOnReducedMotion); };
  }, [paused, hovered, focused]);

  return <section className={s.hero} aria-labelledby="gamer-title" aria-roledescription="carrossel" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false); }}>
    <div className={s.slides}>{slides.map((slide, index) => <div key={slide.image} className={`${s.slide} ${active === index ? s.slideActive : ""}`} aria-hidden={active !== index} role="group" aria-roledescription="slide" aria-label={`${index + 1} de ${slides.length}`}><Image src={slide.image} alt={slide.alt} fill priority={index === 0} sizes="100vw" className={slide.fit === "contain" ? s.heroImageContain : s.heroImage} /></div>)}</div>
    <div className={s.heroInner}><p className={s.kicker}>K7 INFORMÁTICA • LINHA GAMER</p><h1 id="gamer-title">Seu próximo setup<br />começa <em>aqui.</em></h1><p>Encontre o PC para o seu jeito de jogar.<br />Compare configurações e fale com quem entende.</p><a href="#gamer-products" className={s.primary}>Explorar PCs Gamer <i className="fa-solid fa-arrow-down" aria-hidden="true" /></a><small>Imagens ilustrativas</small></div>
    <div className={s.slideControls}><button onClick={() => setActive(current => (current + slides.length - 1) % slides.length)} aria-label="Banner anterior"><i className="fa-solid fa-chevron-left" aria-hidden="true" /></button><div className={s.slideDots}>{slides.map((slide, index) => <button key={slide.image} onClick={() => setActive(index)} aria-label={`Mostrar banner ${index + 1}`} aria-current={active === index ? "true" : undefined} />)}</div><button onClick={() => setActive(current => (current + 1) % slides.length)} aria-label="Próximo banner"><i className="fa-solid fa-chevron-right" aria-hidden="true" /></button><button onClick={() => setPaused(!paused)} aria-label={paused ? "Reproduzir banners automaticamente" : "Pausar banners"} aria-pressed={paused}><i className={`fa-solid fa-${paused ? "play" : "pause"}`} aria-hidden="true" /></button></div>
  </section>;
}
