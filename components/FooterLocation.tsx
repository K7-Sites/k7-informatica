import { businessAddress, mapsDirectionsUrl, mapsEmbedUrl } from "@/lib/service-area";
import styles from "./FooterLocation.module.css";

export function FooterLocation() {
  return (
    <div className={styles.location}>
      <div className={styles.details}>
        <p className={styles.eyebrow}><i className="fa-solid fa-location-dot" aria-hidden="true" /> LOCALIZAÇÃO K7 INFORMÁTICA</p>
        <h2>Endereço e mapa</h2>
        <address>
          {businessAddress.streetAddress}<br />
          {businessAddress.neighborhood}<br />
          {businessAddress.city} — {businessAddress.state}
        </address>
        <p>Entre em contato para combinar seu atendimento antes de visitar o endereço.</p>
        <a href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer">
          Ver localização no Google Maps <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
        </a>
      </div>
      <div className={styles.map}>
        <iframe
          src={mapsEmbedUrl}
          title="Mapa da K7 Informática, Rua Francisco Bagatti, 381, Associação Sobradinho, São Paulo"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </div>
  );
}
