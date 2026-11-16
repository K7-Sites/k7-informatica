import { serviceAreaGroups } from "@/lib/service-area";
import { RegionContactButton } from "@/components/RegionContactButton";
import styles from "./ServiceArea.module.css";

type Props = { theme?: "dark" | "light" };

const technicalServices = [
  "Conserto e manutenção de notebooks",
  "Manutenção de computadores e PC gamer",
  "Troca de tela e bateria de notebook",
  "Instalação de SSD e upgrade de memória RAM",
  "Formatação, Windows e remoção de vírus",
  "Limpeza interna e suporte técnico",
];

export function ServiceArea({ theme = "dark" }: Props) {
  return (
    <section id="area-atendida" className={`${styles.section} ${theme === "light" ? styles.light : ""}`} aria-labelledby="service-area-title">
      <div className={styles.container}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}><span aria-hidden="true" /> COBERTURA EM SÃO PAULO</p>
          <h2 id="service-area-title">Assistência técnica em <em>toda a Zona Norte</em> de São Paulo</h2>
          <p>
            A K7 Informática atende todos os bairros da Zona Norte de SP com serviços de assistência técnica
            para notebooks, computadores e PCs gamer. Realizamos diagnóstico, manutenção, reparos e upgrades,
            com orientação e agendamento pelo WhatsApp.
          </p>
        </div>

        <div className={styles.services} aria-label="Serviços de informática disponíveis na Zona Norte">
          <h3>Qual atendimento você encontra na K7?</h3>
          <ul>
            {technicalServices.map(service => <li key={service}><i className="fa-solid fa-check" aria-hidden="true" />{service}</li>)}
          </ul>
        </div>

        <div className={styles.areaHeader}>
          <div>
            <p className={styles.eyebrow}>BAIRROS E REGIÕES ATENDIDOS</p>
            <h3>Atendimento do Tucuruvi a Perus, em toda a Zona Norte</h3>
          </div>
          <p>Confira os principais bairros e distritos atendidos em São Paulo:</p>
        </div>

        <div className={styles.grid}>
          {serviceAreaGroups.map(group => (
            <article className={styles.group} key={group.name}>
              <h4><RegionContactButton region={group.name} className={styles.groupHeading}><i className="fa-solid fa-location-dot" aria-hidden="true" /> {group.name}</RegionContactButton></h4>
              <ul>{group.neighborhoods.map(name => <li key={name}><RegionContactButton region={name} className={styles.neighborhood}>{name}</RegionContactButton></li>)}</ul>
            </article>
          ))}
        </div>

        <div className={styles.contact}>
          <div>
            <strong>Precisa de assistência no seu bairro?</strong>
            <p>Informe sua região e o problema do equipamento. Confirme a modalidade e a disponibilidade antes de se deslocar.</p>
          </div>
          <RegionContactButton region="Zona Norte de São Paulo" className={styles.contactButton}>
            <i className="fa-brands fa-whatsapp" aria-hidden="true" /> Consultar atendimento <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </RegionContactButton>
        </div>
      </div>
    </section>
  );
}
