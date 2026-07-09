# 🤖 AGENTS.md — Regras de Governança Agêntica (`Safe-Finance`)

> [!IMPORTANT]
> **Submissão à Constituição Suprema:**
> Qualquer agente cognitivo de IA (Antigravity, Claude, Moltbot, etc.) operando no projeto `Safe-Finance` deve submeter-se estritamente à [Constituição Suprema do Projeto (AGENTS.md)](file:///c:/Dev/agente-core/AGENTS.md) do repositório central `agente-core`. Qualquer divergência ou conflito técnico deve ser decidido em favor da constituição central.
>
> Princípios e Guias específicos aplicados a esta base:
> * **Design Engineering Premium:** [design-engineering-premium.md](file:///c:/Dev/agente-core/standards/design-engineering-premium.md) (Uso da fonte Geist Sans/Mono, Dark Mode Tri-Layer sem preto puro, Crisp Borders de 1px, tabular-nums para dados numéricos).
> * **Diretrizes de Frontend:** [frontend-rules.md](file:///c:/Dev/agente-core/rules/frontend-rules.md).
> * **Diretrizes de Backend e Banco de Dados:** [backend-rules.md](file:///c:/Dev/agente-core/rules/backend-rules.md) e [database-rules.md](file:///c:/Dev/agente-core/rules/database-rules.md) (Prevenção e eliminação absoluta de consultas assíncronas sequenciais N+1).

Este documento serve como a **Single Source of Truth (SSOT)** local para reger o desenvolvimento, padrões de codificação, nomenclatura e segurança do projeto `Safe-Finance`.

---

## 🏛️ 1. Princípios Arquiteturais e Padrões

1. **Clean/Hexagonal Architecture (Ports & Adapters):**
   * O domínio de regras puras e entidades de negócios reside em `packages/core/`. Ele deve ser mantido agnóstico a bancos de dados, frameworks web e bibliotecas externas.
   * Adaptadores de infraestrutura e banco de dados residem em `packages/infrastructure/` e utilizam o Convex.
2. **Feature-Sliced Design (FSD):**
   * O frontend Next.js em `apps/web/` adota o padrão FSD (`app`, `widgets`, `features`, `entities`, `shared`). Os agentes de desenvolvimento devem respeitar os limites de importação de cada fatia lógica.
3. **Reatividade e Segurança:**
   * Mutação e consultas reativas via Convex.
   * Inexistência de segredos trafegados em texto puro nos fontes.

---

## 📐 2. Convenções de Nomenclatura

* **Arquivos e Diretórios:** kebab-case para arquivos de rotina/configurações (ex: `tsconfig.json`, `financial-forecasts.ts`).
* **Componentes React:** PascalCase (ex: `budget-tracker.tsx`).
* **Funções e Variáveis:** camelCase.
* **Variáveis de Ambiente:** UPPER_SNAKE_CASE.
