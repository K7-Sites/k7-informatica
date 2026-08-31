# AGENTS.md

## Objetivo do projeto

Este projeto é o novo site oficial da K7 Informática.

O site deve ser desenvolvido do zero, com foco em:
 
- conversão em contatos pelo WhatsApp;
- SEO local;
- performance;
- acessibilidade;
- responsividade;
- visual premium;
- manutenção simples;
- código limpo e organizado.

A referência visual principal é a identidade da K7 Sites, adaptada para o nicho de assistência técnica em informática.

---

## Identidade visual

Usar como base:

- Azul metálico: `#1565FF`
- Preto fosco: `#050814`
- Azul/preto profundo: `#0A0F1F`
- Branco: `#FFFFFF`
- Prata cromado: `#D8DDE6`

Estética:

- premium;
- tecnológica;
- sofisticada;
- moderna;
- dark;
- alto contraste;
- glow azul controlado;
- glassmorphism leve;
- reflexos metálicos sutis;
- sombras suaves;
- bordas elegantes;
- profundidade visual.

Evitar:

- roxo;
- rosa;
- laranja;
- dourado;
- excesso de RGB;
- visual gamer exagerado;
- aparência de template genérico.

---

## Direção de design

O site deve parecer uma assistência técnica premium e confiável.

A K7 Informática NÃO deve parecer uma agência de sites.

A comunicação visual deve reforçar:

- confiança;
- tecnologia;
- profissionalismo;
- agilidade;
- clareza;
- segurança;
- qualidade técnica.

Elementos visuais podem incluir:

- notebooks;
- computadores;
- SSD;
- memória RAM;
- placas;
- ferramentas;
- interfaces de diagnóstico;
- cards técnicos;
- ícones de hardware.

---

## Stack

Preferir:

- Next.js
- App Router
- TypeScript
- Tailwind CSS

Estrutura sugerida:

```text
app/
components/
components/sections/
components/ui/
lib/
public/
public/images/
public/icons/

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
