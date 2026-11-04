"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import s from "./catalog.module.css";

const slides = [
  { image: "/images/gamer/pc-gamer-banner1.webp", alt: "Banner de PCs Gamer personalizados", fit: "banner" },
  { image: "/images/servicos/upgrade-gpu.png", alt: "Placa de vídeo dedicada em montagem de PC Gamer", fit: "cover" },
  { image: "/images/servicos/manutencao-upgrade-pc-gamer-service.png", alt: "Gabinete gamer, placa de vídeo, memória e SSD", fit: "contain" },
] as const;

export function HeroSlider() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive(current => (current + 1) % slides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [active]);

  return <section className={s.hero} aria-labelledby="gamer-title" aria-roledescription="carrossel">
    <h1 id="gamer-title" className={s.srOnly}>PCs Gamer K7 Informática</h1>
    <div className={s.slides}>{slides.map((slide, index) => <div key={slide.image} className={`${s.slide} ${active === index ? s.slideActive : ""}`} aria-hidden={active !== index} role="group" aria-roledescription="slide" aria-label={`${index + 1} de ${slides.length}`}><Image src={slide.image} alt={slide.alt} fill priority={index === 0} sizes="100vw" className={slide.fit === "banner" ? s.heroBannerImage : slide.fit === "contain" ? s.heroImageContain : s.heroImage} /></div>)}</div>
    <div className={s.slideControls}><div className={s.slideDots}>{slides.map((slide, index) => <button key={slide.image} onClick={() => setActive(index)} aria-label={`Mostrar banner ${index + 1}`} aria-current={active === index ? "true" : undefined} />)}</div></div>
  </section>;
}
