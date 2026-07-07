# CLAUDE.md

Instruções do projeto para o assistente. Estas regras valem para todo o repositório.

## Stack

- **Build:** Vite
- **UI:** React + TypeScript
- **Estilo:** Tailwind CSS + shadcn/ui
- **Testes:** Vitest (unit) + Playwright (e2e)
- **Idioma:** respostas e documentação em Português (Brasil)

## Princípios

- Tom direto e prático, sem enrolação.
- Código segue boas práticas e **não leva comentários** — o nome e a estrutura explicam.
- Priorizar o ecossistema JS/TS já em uso; não introduzir dependência nova sem necessidade clara.
- Antes de criar algo, procurar padrão existente no repo e seguir.

## Convenções

As regras detalhadas vivem em `.claude/rules/` e devem ser consultadas conforme a tarefa.

## Estrutura de pastas

Resumo do layout esperado em `src/` (veja `docs/estrutura.md` para detalhes).

```
src/
├── components/ui/
├── components/
├── hooks/
├── lib/
├── pages/
├── types/
└── styles/
```

## Fluxo de trabalho

- **Commits:** Conventional Commits (see `.claude/rules/conventional-commits.md`).
- **Pull requests:** title in Conventional Commits + Summary/Test plan template.
- **Revisão:** use `/code-review` antes de abrir PR.
- **Testes:** Vitest + Playwright; run test-runner when relevant.

# CLAUDE.md

Instruções do projeto para o assistente. Estas regras valem para todo o repositório.

## Stack

- **Build:** Vite
- **UI:** React + TypeScript
- **Estilo:** Tailwind CSS + shadcn/ui
- **Testes:** Vitest (unit) + Playwright (e2e)
- **Idioma:** respostas e documentação em Português (Brasil)

## Princípios

- Tom direto e prático, sem enrolação.
- Código segue boas práticas e **não leva comentários** — o nome e a estrutura explicam.
- Priorizar o ecossistema JS/TS já em uso; não introduzir dependência nova sem necessidade clara.
- Antes de criar algo, procurar padrão existente no repo e seguir.

## Convenções

As regras detalhadas vivem em `.claude/rules/` e são carregadas como contexto. Consulte conforme a tarefa:

- `.claude/rules/typescript.md` — tipagem, `strict`, sem `any`, imports type-only.
- `.claude/rules/react.md` — componentes de função, regras de hooks, props, onde mora o estado.
- `.claude/rules/styling.md` — Tailwind, `cn()`, tokens, uso de shadcn/ui.
- `.claude/rules/naming-conventions.md` — nomes de arquivos, componentes, hooks.
- `.claude/rules/conventional-commits.md` — formato de commit.

## Estrutura de pastas

Layout de `src/` documentado em `docs/estrutura.md`. Resumo:

```
src/
├── components/ui/   # componentes shadcn
├── components/      # componentes da aplicação
├── hooks/           # hooks reutilizáveis (useX)
├── lib/             # cn(), utils, clients
├── pages/           # páginas / rotas
├── types/           # tipos compartilhados
└── styles/          # globals, tokens
```

## Fluxo de trabalho

- **Commits:** skill `git-commit` (Conventional Commits, lowercase em inglês, escopo obrigatório, sem co-author/IA).
- **Pull requests:** skill `create-pr` (título Conventional Commits, corpo Summary + Test plan em inglês, sem reviewers/draft/IA).
- **Revisão:** use `/code-review` antes de abrir PR; o subagent `code-reviewer` cobre correção + convenções.
- **Testes:** o subagent `test-runner` roda Vitest/Playwright e reporta.
- **Bugs:** o subagent `debugger` faz debugging sistemático antes de propor correção.
