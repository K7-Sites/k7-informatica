export const services = [
  {
    "slug": "manutencao-de-notebook",
    "title": "Manutenção de notebook",
    "description": "Diagnóstico de falhas, superaquecimento, lentidão e problemas de inicialização.",
    "benefits": [
      "Verificação de hardware e software",
      "Análise de temperatura e limpeza",
      "Reparo ou substituição após aprovação"
    ]
  },
  {
    "slug": "pc-gamer",
    "title": "Manutenção e upgrade de PC Gamer",
    "description": "Avaliação de desempenho, refrigeração, montagem e compatibilidade de componentes.",
    "benefits": [
      "Análise de desempenho e temperaturas",
      "Montagem e organização interna",
      "Upgrades compatíveis com sua configuração"
    ]
  },
  {
    "slug": "suporte-remoto",
    "title": "Suporte remoto para computadores",
    "description": "Orientação à distância para problemas de software que possam ser resolvidos com segurança.",
    "benefits": [
      "Análise inicial da solicitação",
      "Configuração de programas e sistema",
      "Atendimento remoto mediante autorização"
    ]
  },
  {
    "slug": "pasta-termica",
    "title": "Troca de pasta térmica",
    "description": "Avaliação térmica e renovação da pasta térmica quando indicada para o equipamento.",
    "benefits": [
      "Verificação de superaquecimento",
      "Limpeza da superfície de contato",
      "Aplicação adequada ao componente"
    ]
  },
  {
    "slug": "troca-de-tela",
    "title": "Troca de tela de notebook",
    "description": "Análise de telas quebradas, manchadas, com linhas ou sem imagem.",
    "benefits": [
      "Identificação do modelo da tela",
      "Verificação de cabo e conexões",
      "Substituição conforme compatibilidade"
    ]
  },
  {
    "slug": "instalacao-de-ssd",
    "title": "Instalação de SSD",
    "description": "Avaliação de compatibilidade e instalação de SSD para melhorar a resposta do computador.",
    "benefits": [
      "Verificação do padrão SATA ou NVMe",
      "Instalação e configuração",
      "Migração de dados quando viável"
    ]
  },
  {
    "slug": "upgrade-de-ram",
    "title": "Upgrade de memória RAM",
    "description": "Avaliação de expansão de memória para multitarefa e programas exigentes.",
    "benefits": [
      "Análise de slots e capacidade",
      "Compatibilidade de módulos",
      "Instalação e testes"
    ]
  },
  {
    "slug": "formatacao",
    "title": "Formatação de computador e notebook",
    "description": "Reinstalação e configuração do sistema após avaliação do equipamento e dos dados.",
    "benefits": [
      "Avaliação prévia dos arquivos",
      "Instalação do sistema",
      "Drivers e configurações essenciais"
    ]
  },
  {
    "slug": "backup",
    "title": "Backup de arquivos",
    "description": "Orientação e cópia de arquivos quando o estado do armazenamento permite.",
    "benefits": [
      "Avaliação da unidade",
      "Seleção de dados importantes",
      "Cópia para mídia adequada"
    ]
  },
  {
    "slug": "limpeza-interna",
    "title": "Limpeza interna de notebook e PC",
    "description": "Remoção de poeira e inspeção de ventilação e refrigeração.",
    "benefits": [
      "Inspeção de ventoinhas",
      "Limpeza de componentes acessíveis",
      "Verificação térmica"
    ]
  },
  {
    "slug": "remocao-de-virus",
    "title": "Remoção de vírus e malware",
    "description": "Análise de programas maliciosos e medidas para recuperar a segurança do sistema.",
    "benefits": [
      "Verificação de ameaças",
      "Remoção e correções possíveis",
      "Orientação de prevenção"
    ]
  },
  {
    "slug": "troca-de-bateria",
    "title": "Troca de bateria de notebook",
    "description": "Diagnóstico de autonomia e carregamento e avaliação de substituição compatível.",
    "benefits": [
      "Análise de carregamento",
      "Compatibilidade da bateria",
      "Substituição após orçamento"
    ]
  },
  {
    "slug": "reparo-de-dobradica",
    "title": "Reparo de dobradiça de notebook",
    "description": "Avaliação de articulações, tampa e carcaça com dificuldade para abrir ou fechar.",
    "benefits": [
      "Inspeção de danos estruturais",
      "Análise de peças compatíveis",
      "Reparo após aprovação"
    ]
  },
  {
    "slug": "instalacao-de-sistemas",
    "title": "Instalação de sistemas operacionais",
    "description": "Instalação e configuração de sistema operacional adequado ao equipamento.",
    "benefits": [
      "Verificação de requisitos",
      "Instalação do sistema",
      "Atualizações e drivers"
    ]
  },
  {
    "slug": "upgrade-de-gpu",
    "title": "Upgrade de placa de vídeo",
    "description": "Avaliação de compatibilidade de GPU para computadores desktop.",
    "benefits": [
      "Análise de fonte e gabinete",
      "Compatibilidade de placa-mãe",
      "Instalação e testes"
    ]
  }
];
export function findService(slug:string){return services.find(s=>s.slug===slug)};
