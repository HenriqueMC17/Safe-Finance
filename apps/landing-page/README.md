# 🌐 Safe Finance Landing Page (ELand-Page)

A **Landing Page (ELand-Page)** do Safe Finance é a vitrine institucional e portal de conversão SaaS do ecossistema Safe Finance. Projetada para proporcionar uma experiência visual premium com UX/UI cinematográfica, ela combina alta performance, animações fluidas e acessibilidade completa.

Esta aplicação faz parte do monorepo orquestrado com **Turborepo** e gerenciado pelo **PNPM Workspaces**, consumindo componentes compartilhados do pacote `@repo/ui` e utilitários de `@repo/shared`.

---

## 🏗️ Arquitetura do Projeto

A estrutura de pastas adota um modelo modular organizado de forma pragmática para Next.js:

- **`app/`**: Roteamento e orquestração de páginas utilizando o **Next.js App Router**.
- **`components/`**: Componentes reutilizáveis da interface:
  - **`sections/`**: Seções da página institucional (Hero, Features, Pricing, etc.).
  - **`interactive/`**: Componentes dinâmicos com otimização de renderização.
  - **`layout/`**: Cabeçalho, rodapé e estruturas de grid.
  - **`ui/`**: Componentes de interface locais complementares ao design system.
- **`config/copywriting.ts`**: **Fonte Única de Verdade (Single Source of Truth)** para todo o copywriting (textos, títulos, labels) da aplicação.
- **`lib/`**: Inicialização de bibliotecas de terceiros e utilitários globais.

---

## ✦ Principais Diferenciais e Recursos

*   **UX Cinematográfica:** Utilização do **Framer Motion** para micro-interações, transições fluidas e efeitos de *glassmorphism* avançados.
*   **Lenis Smooth Scroll:** Integração com **Lenis** para rolagem suave contínua e imersiva de alto desempenho.
*   **Design System Consistente:** Estilização integrada com **Tailwind CSS** herdando os tokens visuais definidos no `@repo/ui`.
*   **Gerenciador de Estado Reativo:** Integração com o banco de dados em tempo real **Convex** para dinâmicas reativas (como formulários de agendamento).
*   **Acessibilidade Completa (a11y):** Tags semânticas HTML5 corretas, suporte para navegação por teclado e atributos ARIA.
*   **SEO Otimizado:** Metadados dinâmicos estruturados por página, OpenGraph, Twitter Cards, robots.ts e geração automática de sitemap.ts.

---

## 🧪 Qualidade, Testes e Linting

A estabilidade e robustez da Landing Page são garantidas por uma suíte completa de testes e análise estática:

*   **Testes Unitários e de Componente (Vitest + React Testing Library):**
    Valida a lógica dos hooks, formatação de dados e comportamento isolado de componentes.
    ```bash
    # Executar testes unitários uma vez
    pnpm test
    
    # Executar em modo Watch (desenvolvimento interativo)
    pnpm test:watch
    ```

*   **Testes End-to-End (Playwright):**
    Simula fluxos inteiros do usuário em navegadores Chromium, Firefox e WebKit (ex: envio de formulário de agendamento de demo).
    ```bash
    # Executar testes E2E
    pnpm test:e2e
    ```

*   **Qualidade de Código (ESLint & TypeScript):**
    Execução de linting estrito e verificação estática de tipos.
    ```bash
    pnpm lint
    ```

---

## 🚀 Guia de Desenvolvimento

### 1. Inicializando no Workspace
Por ser parte de um monorepo, as dependências devem ser instaladas a partir da raiz:
```bash
# Na pasta raiz do monorepo (c:\Dev\Safe-Finance)
pnpm install
```

### 2. Rodar o Servidor de Desenvolvimento
Inicie o projeto localmente (por padrão na porta `3001`):
```bash
# Rodar a partir da pasta apps/landing-page
pnpm dev

# Alternativamente, a partir da raiz do monorepo:
pnpm --filter saas-landing-page dev
```

### 3. Edição de Conteúdo
Para atualizar qualquer texto, preço, depoimento ou conteúdo promocional na Landing Page, **não é necessário modificar os componentes de UI**. Toda a informação textual está centralizada no arquivo:
👉 [copywriting.ts](file:///c:/Dev/Safe-Finance/apps/landing-page/config/copywriting.ts)

---

*Refatorado para os mais altos padrões de Engenharia Senior Fullstack — Antigravity AI*
