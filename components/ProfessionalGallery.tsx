"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const photos = [
  { src: "/images/kassio-informatica.webp", alt: "Profissional da K7 Informática trabalhando com hardware" },
  { src: "/images/infokaess.jpg", alt: "Profissional da K7 Informática - foto 2" },
  { src: "/images/infoKaess2.jpg", alt: "Profissional da K7 Informática - foto 3" },
];

export function ProfessionalGallery() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = window.setInterval(() => setActive((current) => (current + 1) % photos.length), 4500);
    return () => window.clearInterval(interval);
  }, [paused]);

  return (
    <div className="professional-gallery" aria-label="Fotos do profissional" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)}>
      <div className="professional-gallery-viewport">
        {photos.map((photo, index) => (
          <div key={photo.src} className={`professional-gallery-slide${index === active ? " is-active" : ""}`} aria-hidden={index !== active}>
            <Image src={photo.src} alt={index === active ? photo.alt : ""} fill sizes="(max-width: 780px) 100vw, 42vw" className="professional-gallery-image" priority={index === 0} />
          </div>
        ))}
      </div>
      <div className="professional-gallery-controls" aria-label="Controles das fotos">
        <button type="button" aria-label="Foto anterior" onClick={() => setActive((current) => (current - 1 + photos.length) % photos.length)}>‹</button>
        <div className="professional-gallery-dots">
          {photos.map((photo, index) => <button key={photo.src} type="button" aria-label={`Mostrar foto ${index + 1}`} aria-current={index === active ? "true" : undefined} className={index === active ? "is-active" : ""} onClick={() => setActive(index)} />)}
        </div>
        <button type="button" aria-label="Próxima foto" onClick={() => setActive((current) => (current + 1) % photos.length)}>›</button>
      </div>
    </div>
  );
}
