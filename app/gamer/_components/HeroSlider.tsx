"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import s from "./catalog.module.css";

const slides = [
  { image: "/images/gamer/pc-gamer-banner1.webp", alt: "Banner de PCs Gamer personalizados", width: 2170, height: 295, fit: "banner" },
  { image: "/images/gamer/pc-gamer-banner2.webp", alt: "PC Gamer com parcelamento em até 12 vezes", width: 2172, height: 340, fit: "banner" },
  { image: "/images/gamer/pc-gamer-banner3.webp", alt: "Seu setup, suas regras: monte um PC Gamer do seu jeito", width: 2172, height: 394, fit: "banner" },
];

export function HeroSlider() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (slides.length < 2) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive(current => (current + 1) % slides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [active]);

  return <section className={s.hero} aria-labelledby="gamer-title" aria-roledescription="carrossel">
    <h1 id="gamer-title" className={s.srOnly}>PCs Gamer K7 Informática</h1>
    <div className={s.slides}>{slides.map((slide, index) => <div key={slide.image} className={`${s.slide} ${active === index ? s.slideActive : ""}`} aria-hidden={active !== index} role="group" aria-roledescription="slide" aria-label={`${index + 1} de ${slides.length}`}><Image src={slide.image} alt={slide.alt} width={slide.width} height={slide.height} priority={index === 0} sizes="100vw" className={slide.fit === "banner" ? s.heroBannerImage : slide.fit === "contain" ? s.heroImageContain : s.heroImage} /></div>)}</div>
    {slides.length > 1 && <div className={s.slideControls}><div className={s.slideDots}>{slides.map((slide, index) => <button key={slide.image} onClick={() => setActive(index)} aria-label={`Mostrar banner ${index + 1}`} aria-current={active === index ? "true" : undefined} />)}</div></div>}
  </section>;
}
