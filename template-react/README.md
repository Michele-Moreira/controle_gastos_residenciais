# template-react

Template de projeto React com a pasta `.claude` já configurada: rules de convenção, skills, subagents e commands prontos para acelerar o desenvolvimento assistido por IA.

Stack-alvo das convenções: **Vite + React + TypeScript + Tailwind + shadcn/ui**, com **Vitest** e **Playwright** para testes.

## Como usar

### Opção 1: GitHub template

Clique em **Use this template** no GitHub para criar um repositório novo a partir deste.

### Opção 2: clonar só o `.claude`

Se você já tem um projeto React, copie a pasta `.claude/` para a raiz dele:

```bash
cp -r template-react/.claude seu-projeto/
```

## O que vem dentro

```
.claude/
├── rules/        # convenções carregadas como contexto (TS, React, estilo, naming, commits)
├── skills/       # capacidades invocáveis (git-commit, create-pr, new-component, shadcn, design-review)
├── agents/       # subagents (code-reviewer, test-runner, debugger)
└── commands/     # slash-commands (code-review)
```

## Plugando o Vite

Este template traz só o esqueleto de pastas e a configuração do assistente, sem `package.json`. Para transformar em app rodando:

```bash
npm create vite@latest . -- --template react-ts
npm install
npx shadcn@latest init
```

Veja `docs/estrutura.md` para o layout de `src/` que as convenções assumem.

# template-react

Template de projeto React com a pasta `.claude` já configurada: rules de convenção, skills, subagents e commands prontos para acelerar o desenvolvimento assistido por IA.

Stack-alvo das convenções: **Vite + React + TypeScript + Tailwind + shadcn/ui**, com **Vitest** e **Playwright** para testes.

## Como usar

### Opção 1: GitHub template

Clique em **Use this template** no GitHub para criar um repositório novo a partir deste.

### Opção 2: clonar só o `.claude`

Se você já tem um projeto React, copie a pasta `.claude/` para a raiz dele:

```bash
cp -r template-react/.claude seu-projeto/
```

## O que vem dentro

```
.claude/
├── rules/        # convenções carregadas como contexto (TS, React, estilo, naming, commits)
├── skills/       # capacidades invocáveis (git-commit, create-pr, new-component, shadcn, design-review)
├── agents/       # subagents (code-reviewer, test-runner, debugger)
└── commands/     # slash-commands (code-review)
```

- **rules/** declaram como o código deve ser escrito. O `CLAUDE.md` aponta para elas.
- **skills/** são fluxos que o assistente invoca quando a tarefa combina.
- **agents/** são subagents especializados despachados para tarefas isoladas.
- **commands/** são atalhos de fluxo de trabalho disparados com `/`.

## Plugando o Vite

Este template traz só o esqueleto de pastas e a configuração do assistente, sem `package.json`. Para transformar em app rodando:

```bash
npm create vite@latest . -- --template react-ts
npm install
npx shadcn@latest init
```

Veja `docs/estrutura.md` para o layout de `src/` que as convenções assumem.
