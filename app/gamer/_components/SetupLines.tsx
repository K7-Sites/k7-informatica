import Image from "next/image";
import { setupLines } from "../_data/setupLines";
import s from "./catalog.module.css";

export function SetupLines() {
  return <section className={s.setupLines} aria-label="Linhas de computadores K7">
    {setupLines.map(line => <article className={s.setupLine} key={line.id} data-line={line.id}>
      <div className={s.setupFrame} aria-hidden="true" />
      <div className={s.setupMedia}>
        {line.image ? <Image src={line.image} alt={line.imageAlt} fill sizes="(max-width: 600px) 55vw, (max-width: 1200px) 28vw, 15vw" /> : <span className={s.setupPlaceholder} aria-hidden="true">IMAGEM DO PC</span>}
      </div>
      <div className={s.setupCopy}><p>MONTE O SEU PC</p><h2>{line.name}</h2>{line.subtitle && <span>{line.subtitle}</span>}</div>
    </article>)}
  </section>;
}
