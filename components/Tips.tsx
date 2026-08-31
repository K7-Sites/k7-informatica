"use client";

import { useState } from "react";
import Image from "next/image";

const tips = {
  SSD: { image: "/images/ssd-troca-instalacao.webp", alt: "Instalação de SSD em notebook", title: "Seu computador está lento?", text: "O SSD reduz o tempo de inicialização, acelera a abertura de programas e deixa as tarefas do dia a dia mais fluidas. Em muitos casos, é uma melhoria eficiente para prolongar o uso do equipamento sem trocar a máquina inteira.", bullets: ["Inicialização mais rápida", "Programas mais ágeis", "Menos espera no dia a dia"] },
  "Memória RAM": { image: "/images/troca-de-memoria-ram.webp", alt: "Troca de memória RAM em notebook", title: "Muitas abas e programas travando?", text: "A memória RAM dá espaço para o sistema trabalhar com várias tarefas ao mesmo tempo. Um upgrade adequado pode reduzir travamentos em chamadas, navegadores, planilhas e aplicativos mais pesados.", bullets: ["Multitarefa mais fluida", "Menos travamentos", "Mais fôlego para aplicativos"] },
  "Placa de vídeo": { image: "/images/placa-de-video-instalacao.webp", alt: "Instalação de placa de vídeo em computador", title: "Precisa de mais desempenho gráfico?", text: "Para jogos, edição e renderização, a placa de vídeo pode ser decisiva. Avaliamos compatibilidade, fonte, gabinete e objetivo de uso antes de recomendar um upgrade.", bullets: ["Mais desempenho em jogos", "Aceleração em edição", "Upgrade com compatibilidade"] },
  "Limpeza interna": { image: "/images/limpeza-notebook-interna.webp", alt: "Limpeza interna de notebook", title: "A máquina esquenta ou faz barulho?", text: "Poeira dificulta a ventilação e pode elevar a temperatura. A limpeza interna e a avaliação do sistema térmico ajudam a recuperar o fluxo de ar e a estabilidade do equipamento.", bullets: ["Melhor ventilação", "Menos ruído", "Prevenção de superaquecimento"] },
};

export function Tips() {
  const [active, setActive] = useState<keyof typeof tips>("SSD"); const item = tips[active];
  return <div className="tips-panel">
    <div className="tabs" role="tablist" aria-label="Dicas de desempenho">{Object.keys(tips).map((key) => <button role="tab" aria-selected={active === key} key={key} onClick={() => setActive(key as keyof typeof tips)}>{key}</button>)}</div>
    <div className="tip-content" role="tabpanel"><div className="tip-image"><Image src={item.image} alt={item.alt} width={658} height={651} sizes="(max-width: 780px) 100vw, 42vw" /></div><div><p className="eyebrow">GUIA K7</p><h3>{item.title}</h3><p>{item.text}</p><ul>{item.bullets.map((bullet) => <li key={bullet}><i className="fa-solid fa-check" />{bullet}</li>)}</ul></div></div>
  </div>;
}
