import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() { return [{"source":"/servicos/pasta-termica","destination":"/servicos/troca-de-pasta-termica-notebook-pc","permanent":true},{"source":"/servicos/troca-de-tela","destination":"/servicos/troca-de-tela-de-notebook","permanent":true},{"source":"/servicos/instalacao-de-ssd","destination":"/servicos/instalacao-de-ssd-notebook-computador","permanent":true},{"source":"/servicos/upgrade-de-ram","destination":"/servicos/upgrade-memoria-ram-notebook-pc","permanent":true},{"source":"/servicos/formatacao","destination":"/servicos/formatacao-de-notebook-e-computador","permanent":true},{"source":"/servicos/backup","destination":"/servicos/backup-de-arquivos-notebook-pc","permanent":true},{"source":"/servicos/limpeza-interna","destination":"/servicos/limpeza-interna-notebook-pc-gamer","permanent":true},{"source":"/servicos/remocao-de-virus","destination":"/servicos/remocao-de-virus-notebook-pc","permanent":true},{"source":"/servicos/instalacao-de-sistemas","destination":"/servicos/instalacao-windows-linux-notebook-pc","permanent":true},{"source":"/servicos/upgrade-de-gpu","destination":"/servicos/upgrade-placa-de-video-pc-gamer","permanent":true}]; },
  images: { formats: ["image/avif", "image/webp"] },
};

export default nextConfig;
