# Área gamer

Rota pública: `/gamer/pc-gamer`.

Este módulo mantém componentes, dados e CSS próprios. Não altera o header, o layout ou os estilos das páginas existentes. O layout raiz continua responsável pelo idioma, fonte, ícones e Analytics.

## Produtos

Cadastre os produtos reais no array `products` de `_data/products.ts`. Campos: `id` único, `name`, `processor`, `processorBrand` (AMD ou Intel), `graphics`, `memoryGB`, `storage`, `image`, `imageAlt` e `description`. `price` é opcional, em reais; quando ausente aparece “Sob consulta”. Use os modelos e gerações exatos dos componentes.

Salve fotos reais em `public/images/gamer/` e informe `/images/gamer/nome.webp` no campo `image`. A descrição alternativa deve descrever o produto. Não use imagens ilustrativas como fotos de produto.

O catálogo inicia vazio para não publicar configurações, preços ou disponibilidade inventados. O botão “Visualizar exemplo do catálogo” abre quatro exemplos identificados como demonstrativos, sem orçamento ou preço comercial. Esses exemplos não fazem parte de `products` e não aparecem por padrão.

Busca, filtros, ordenação e detalhes funcionam sobre o cadastro. Preços ausentes ficam no final das ordenações por preço e são excluídos ao selecionar preço máximo. O orçamento abre o WhatsApp comercial já definido em `lib/site.ts`, incluindo nome, código e configuração do PC.

Esta entrega não inclui painel administrativo nem persistência de uploads. A edição atual é pelo arquivo de dados. Um painel requer definir autenticação e armazenamento durável antes de aceitar cadastros.
