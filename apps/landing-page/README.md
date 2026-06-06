# Safe Finance Landing Page - Senior Fullstack Handbook

Este repositório foi refatorado para atender aos mais altos padrões de engenharia de software (Senior Fullstack) utilizando o framework `@agente-core`.

## 🏗️ Arquitetura

Adotamos uma abordagem modular baseada em **Feature-Sliced Design (FSD)** simplificado:

- **`app/`**: Roteamento e orquestração (Next.js App Router).
- **`components/sections/`**: Seções da página principal, isoladas e sem estado pesado.
- **`components/interactive/`**: Componentes dinâmicos com carregamento otimizado (`next/dynamic`).
- **`config/copywriting.ts`**: Fonte única de verdade para todo o conteúdo textual.
- **`lib/`**: Utilitários e configurações de terceiros.

## 🧪 Qualidade e Testes

A infraestrutura de testes está configurada para garantir a estabilidade do produto:

- **Unitários (Vitest + Testing Library)**: Testes de lógica e renderização de componentes.
  ```bash
  npm run test
  ```
- **E2E (Playwright)**: Testes de fluxo crítico do usuário em navegadores reais.
  ```bash
  npm run test:e2e
  ```

## ♿ Acessibilidade e SEO

- **a11y**: Todos os componentes seguem padrões ARIA e semântica HTML5.
- **SEO**: Metadados dinâmicos, OpenGraph, Twitter Cards, `sitemap.xml` e `robots.txt` configurados.

## 🚀 Como Desenvolver

1.  **Instalação**: Utilize `pnpm install` na raiz do monorepo.
2.  **Desenvolvimento**: `npm run dev` dentro de `apps/landing-page`.
3.  **Conteúdo**: Para alterar qualquer texto, edite apenas `config/copywriting.ts`.

---
*Refatorado por Antigravity AI - Sistema Operacional Executivo*
