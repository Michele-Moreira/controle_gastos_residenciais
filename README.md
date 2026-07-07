# 💰 Controle de Gastos Residenciais

## Estrutura principal

```text
.
├── .claude/              # regras, skills, agents e commands do assistente
├── backend/              # API .NET 8 com Minimal APIs
├── docs/                 # documentação de convenções e estrutura
├── frontend/             # app React + TypeScript + Vite
└── template-react/       # workspace React/Vite importado como template
```

## Visão geral do monorepo

Este repositório é um monorepo com múltiplos pacotes JavaScript gerenciados por `pnpm`.

- `frontend/`: app principal React + TypeScript.
- `template-react/`: workspace React + Vite importado como template.
- `backend/`: API em C# .NET 8.

A configuração do workspace está em `pnpm-workspace.yaml`.

---

## Backend

O backend é uma Web API desenvolvida em **C#** com **.NET 8** (Minimal APIs), projetada para controlar finanças residenciais.

A aplicação oferece:

- cadastro e listagem de pessoas
- lançamento de transações (receitas e despesas)
- validações de tipo, valor e integridade referencial
- relatórios consolidados de receita, despesa e saldo

A orquestração para desenvolvimento é feita com **Docker** e **Docker Compose**.

---

## 🚀 Como executar com Docker

Certifique-se de ter o **Docker** instalado.

1. Na raiz do repositório, execute:

```bash
docker compose up --build
```

2. O serviço `controle-gastos-api` builda usando o contexto `./backend`.
3. O volume `./backend/Data:/app/Data` preserva os dados entre reinícios.

---

## Frontend

O app principal está em `frontend/` e usa **Vite**, **React** e **TypeScript**.

### Estrutura do frontend

```text
frontend/src/
├── components/
├── hooks/
├── lib/
├── pages/
├── styles/
└── types/
```

### Executar o frontend

```bash
cd frontend
npm install
npm run dev
```

Abra `http://localhost:5173` no navegador.

---

## Template React

O workspace adicional `template-react/` contém um template React + Vite pré-configurado com:

- ESLint
- Prettier
- EditorConfig
- configuração de build Vite

Para usar ou testar esse template:

```bash
cd template-react
pnpm install
pnpm run dev
```

---

## Monorepo e `pnpm`

O projeto usa `pnpm` para gerenciar workspaces.

### Workspaces configurados

- `frontend`
- `template-react`

### Comandos úteis na raiz

```bash
pnpm install        # instala dependências em todos os workspaces
pnpm -w -r run dev  # executa dev em todos os workspaces
pnpm -w -r run build
pnpm -w -r run lint
```

> Para adicionar outro workspace, crie a pasta com `package.json` e inclua-a em `pnpm-workspace.yaml`.

---

## Observações

- O `docker-compose.yml` foi adicionado na raiz para permitir `docker compose up` a partir do diretório principal.
- A pasta `template-react/` foi importada como um workspace React independente, sem afetar o app `frontend/`.

