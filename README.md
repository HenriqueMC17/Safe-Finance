<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=timeGradient&height=250&section=header&text=Safe%20Finance&fontSize=50&fontAlignY=35&desc=Premium%20Financial%20Management%20Ecosystem&descAlignY=55&descAlign=50" alt="Safe Finance Banner" />
  
  <br />
  
  <blockquote>
    <p><b>Ecossistema financeiro premium modular e escalável, desenvolvido em um monorepo de alta performance com Turborepo e PNPM.</b></p>
  </blockquote>

  <p>
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
    <img alt="React 19" src="https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
    <img alt="Next.js 16" src="https://img.shields.io/badge/Next.js%2016-black?style=for-the-badge&logo=next.js&logoColor=white">
    <img alt="Turborepo" src="https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white">
    <img alt="PNPM" src="https://img.shields.io/badge/PNPM-F69220?style=for-the-badge&logo=pnpm&logoColor=white">
  </p>
</div>

---

## ✦ Sobre o Safe Finance

O **Safe Finance** é um ecossistema financeiro de ponta, projetado para fornecer aos usuários uma plataforma segura, moderna e visualmente impactante para gestão de ativos, contabilidade pessoal e projeções financeiras. 

A arquitetura do projeto foi estruturada como um **Monorepo** gerenciado com **PNPM Workspaces** e orquestrado por **Turborepo** para garantir builds rápidos, cache inteligente de tarefas, compartilhamento eficiente de código de UI e configurações centralizadas.

---

## ✦ Estrutura do Monorepo

O ecossistema é dividido em aplicações executáveis (`apps/`) e pacotes compartilhados locais (`packages/`):

```text
Safe-Finance/
├── apps/
│   ├── dashboard/          # 📈 @safe-finance/dashboard: Painel financeiro interativo de alta complexidade
│   └── landing-page/       # 🌐 saas-landing-page: Portal de conversão com UX Cinematográfica
│
├── packages/
│   ├── ui/                 # 🎨 @repo/ui: Design System compartilhado de componentes atômicos
│   ├── shared/             # ⚙️ @repo/shared: Tipagens, constantes e utilitários compartilhados
│   └── config-eslint/      # 🚨 Configurações padronizadas de linting do ESLint
│
├── pnpm-workspace.yaml     # Configuração de escopo de pacotes do PNPM
├── turbo.json              # Pipeline de tarefas e estratégias de cache do Turborepo
└── package.json            # Ponto de entrada do monorepo e scripts globais
```

---

## ✦ Detalhamento dos Projetos

### 📈 [Financial Dashboard](file:///c:/Dev/Safe-Finance/apps/dashboard)
O painel administrativo e financeiro central do usuário. Segue a metodologia **Feature-Sliced Design (FSD)** e inclui 18 módulos funcionais independentes:

* **Auth & Security:** Fluxo local de registro, login e sessões protegidas por JSON Web Tokens (JWT) com encriptação BcryptJS.
* **Accessibility (a11y):** Painel interno de ajustes visuais (contraste, modo leitor de tela, ajuste de fontes e navegação por teclado).
* **AI Assistant:** Chat interativo com assistente financeiro inteligente para recomendações e análises.
* **Analytics & Forecasts:** Gráficos interativos em **Recharts** para monitorar categorias de despesas, tendências e projeções futuras de gastos.
* **Transações & Contas:** Ledger detalhado para adicionar, editar, filtrar e paginar transações financeiras agregadas por contas bancárias, cartões ou dinheiro físico.
* **Orçamento (Budget):** Definição de limites mensais por categorias e alertas visuais de teto de gastos.
* **Sustainability (ESG):** Cálculo estimado da pegada de carbono com base nas despesas categorizadas do usuário.
* **PWA & Offline:** Configurado como Progressive Web App com indicadores e suporte a uso em modo offline.
* **Exportação de Dados:** Geração instantânea de relatórios financeiros em **PDF** (`jspdf` & `jspdf-autotable`) e planilhas **CSV**.

### 🌐 [Landing Page](file:///c:/Dev/Safe-Finance/apps/landing-page)
O portal institucional e vitrine do produto SaaS.
* **Cinematic View:** Efeitos modernos de design com glassmorphism avançado e micro-interações do **Framer Motion**.
* **Smooth Scrolling:** Rolagem ultra suave integrada nativamente com a biblioteca **Lenis Scroll**.
* **Testes Integrados:** Cobertura de testes unitários com **Vitest** + **Testing Library**, e testes de ponta a ponta (E2E) com **Playwright**.

---

## ✦ Stack Tecnológica

| Camada | Tecnologias Utilizadas |
| :--- | :--- |
| **Core** | React 19, Next.js 16 (App Router), TypeScript, Node.js |
| **Estilização & UI** | Tailwind CSS, Framer Motion, Radix UI primitives, Lucide Icons |
| **Visualização de Dados** | Recharts (Gráficos interativos e responsivos) |
| **Banco de Dados / Cache** | Convex BaaS (Banco Reativo), Upstash Redis (Cache de métricas de alta velocidade) |
| **Autenticação & Cripto** | BcryptJS, jsonwebtoken, jose (JWT nativo Edge) |
| **Testes & Qualidade** | Vitest, Playwright, Testing Library, JSDOM, ESLint, Prettier |
| **Orquestração** | PNPM Workspaces, Turborepo |

---

## ✦ Como Iniciar o Monorepo Localmente

O monorepo centraliza as tarefas no arquivo `package.json` raiz. Não é necessário rodar `npm install` de forma isolada em cada subpasta.

### 1. Pré-requisitos
Certifique-se de ter instalado em sua máquina:
- Node.js (v20 ou superior)
- **PNPM** (Gerenciador de pacotes global recomendado)
  ```bash
  npm install -g pnpm
  ```

### 2. Instalar Dependências (Global)
Execute o comando na raiz do projeto. O PNPM irá resolver os links simbólicos das dependências do workspace (`@repo/ui` e `@repo/shared`):
```bash
pnpm install
```

### 3. Rodar em Modo de Desenvolvimento
Inicie todas as aplicações (`apps/dashboard` e `apps/landing-page`) concorrentemente com cache do Turborepo:
```bash
pnpm dev
```

O Turborepo inicializará:
- O Dashboard financeiro em `http://localhost:3000` (ou próxima porta disponível)
- A Landing Page em `http://localhost:3001` (ou próxima porta disponível)

### 4. Build de Produção
Para compilar e otimizar todas as aplicações do workspace:
```bash
pnpm build
```

---

## ✦ Comandos de Testes e Qualidade

* **Rodar Testes de Unidade (Vitest na Landing Page):**
  ```bash
  # Executa testes em modo único
  pnpm --filter saas-landing-page test
  
  # Executa testes em modo watch
  pnpm --filter saas-landing-page test:watch
  ```
* **Rodar Testes End-to-End (Playwright):**
  ```bash
  pnpm --filter saas-landing-page test:e2e
  ```
* **Executar Linter em todo o Workspace:**
  ```bash
  pnpm lint
  ```
* **Formatar Código com Prettier:**
  ```bash
  pnpm format
  ```

---

## 🛡️ Licença

Este projeto está sob a licença MIT.

---

<p align="center">
  Desenvolvido por <b>HenriqueMC17</b>
</p>
