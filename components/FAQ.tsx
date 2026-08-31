const faqs = [
  ["Existe alguma taxa de diagnóstico?", "A análise pode variar conforme o tipo de problema e o equipamento. Antes de deixar seu aparelho, fale conosco para entender como funciona a avaliação no seu caso."],
  ["Formatar o computador apaga meus arquivos?", "A formatação pode remover arquivos. Antes do procedimento, avaliamos com você a necessidade e a possibilidade de backup."],
  ["Quanto tempo demora o serviço?", "O prazo depende do diagnóstico, da disponibilidade de peças e da complexidade do reparo. A estimativa é informada após a avaliação."],
  ["Vocês fazem orçamento antes do serviço?", "Sim. O problema e os procedimentos recomendados são explicados antes da execução, para que você possa decidir com clareza."],
  ["Atendem notebook e computador?", "Sim. A K7 Informática trabalha com manutenção de notebooks, desktops, MacBook, iMac e computadores gamer, conforme o defeito e a disponibilidade técnica."],
  ["Fazem instalação de SSD e memória?", "Sim. Primeiro verificamos a compatibilidade do equipamento e recomendamos a configuração adequada ao seu uso."],
  ["Há suporte remoto?", "Sim, para situações que podem ser resolvidas com segurança à distância. Problemas físicos e de hardware exigem avaliação presencial."],
  ["Atendem na Zona Norte de São Paulo?", "A atuação principal é no Tucuruvi e bairros próximos da Zona Norte. Consulte pelo WhatsApp a disponibilidade para sua região."],
];

export function FAQ() { return <div className="faq-grid">{faqs.map(([q, a]) => <details key={q}><summary>{q}<i className="fa-solid fa-plus" /></summary><p>{a}</p></details>)}</div>; }
