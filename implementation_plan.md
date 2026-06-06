# Plano de Melhoria: Reorganização e Estabilização do Safe Finance

Este plano detalha as melhorias arquiteturais, correções de compilação e padronizações necessárias para estabilizar o monorepo Safe Finance.

## Ações Propostas

### 1. Limpeza do Monorepo (Workspace Setup)
Remover lockfiles locais redundantes que quebram a resolução correta de dependências do `pnpm`.
- **Excluir**: `apps/dashboard/package-lock.json`
- **Excluir**: `apps/dashboard/pnpm-lock.yaml`
- **Excluir**: `apps/landing-page/package-lock.json`
- **Excluir**: `apps/landing-page/pnpm-lock.yaml`
- **Ação**: Executar `pnpm install` na raiz para consolidar o lockfile global.

### 2. Alinhamento das Dependências de Tipos (React 19)
Atualizar as definições de tipo nos pacotes que ainda utilizam referências ao React 18, resolvendo erros do TypeScript como `TS2786` (componentes do Lucide e `next/image` sendo interpretados de forma inválida no JSX).
- **Modificar `apps/landing-page/package.json`**: Atualizar `@types/react` e `@types/react-dom` para `^19.0.0`.
- **Modificar `packages/ui/package.json`**: Atualizar `@types/react` e `@types/react-dom` para `^19.0.0`.

### 3. Correção de Imports Pós-Migração FSD no Dashboard
No `apps/dashboard`, após a migração para Feature-Sliced Design (`src/shared/ui/`), os imports nos componentes UI continuam referenciando caminhos antigos (como `@/lib/utils` e `@/components/ui/`).
- **Ação**: Corrigir importações de `cn` de `@/lib/utils` para `@/shared/lib/utils` em `apps/dashboard/src/shared/ui/` e `apps/dashboard/src/widgets/`.
- **Ação**: Atualizar referências cruzadas de componentes (por exemplo, importar `buttonVariants` de `./button` ou `@/shared/ui/button` em vez de `@/components/ui/button`).

### 4. Correção do Componente Calendar (react-day-picker v9 vs v8)
A propriedade `caption` no objeto `classNames` do componente `DayPicker` foi descontinuada na versão 9 do `react-day-picker`. Como os calendários do dashboard e landing-page foram escritos usando a API da versão 8, vamos redefinir a dependência para garantir retrocompatibilidade.
- **Modificar `apps/landing-page/package.json`**: Alterar `"react-day-picker": "latest"` para `"react-day-picker": "^8.10.1"`.
- **Modificar `apps/dashboard/package.json`**: Alterar `"react-day-picker": "latest"` para `"react-day-picker": "^8.10.1"`.

### 5. Organização de Pastas no Landing-Page
Padronizar a estrutura do landing-page para evitar a coexistência de `apps/landing-page/components` e `apps/landing-page/app/components`.
- **Ação**: Mover componentes interativos específicos (ex: `carbon-calculator.tsx`, `esg-investments.tsx`, etc.) que estão em `app/components/` para a pasta de componentes da raiz do projeto (`components/interactive/` ou similar).
- **Ação**: Deletar a pasta redundante `apps/landing-page/app/components` após a realocação.

---

## Plano de Verificação

### Testes Automatizados
Para validar que o monorepo está estável e compila sem erros:
1. Instalar dependências limpas:
   ```powershell
   pnpm install --ignore-scripts
   ```
2. Validar TypeScript no Landing Page:
   ```powershell
   pnpm --filter saas-landing-page exec tsc --noEmit
   ```
3. Validar TypeScript no Dashboard:
   ```powershell
   pnpm --filter @safe-finance/dashboard exec tsc --noEmit
   ```
4. Construir todo o monorepo:
   ```powershell
   pnpm build
   ```
