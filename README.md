# 💰 Controle de Gastos Residenciais

## Estrutura principal

```text
.
├── .claude/              # regras, skills, agents e commands para o assistente
├── backend/              # API .NET 8 com Minimal APIs
├── docs/                 # documentação de convenções do projeto
├── frontend/             # app React + TypeScript + Vite
└── README.md
```

## Backend

Esta é uma Web API robusta desenvolvida em **C#** utilizando **.NET 8** (Minimal APIs), projetada para gerenciar as finanças de um grupo residencial. O sistema permite o cadastro de pessoas, lançamento de movimentações financeiras (receitas e despesas) e fornece relatórios consolidados com validações rígidas de regras de negócio.

O ambiente de desenvolvimento e persistência é totalmente isolado e orquestrado utilizando **Docker** e **Docker Compose**.

---

## 🚀 Funcionalidades & Regras de Negócio Implementadas

### 👥 Gerenciamento de Pessoas
* **Cadastro de Pessoas:** Registro com validações de campos obrigatórios.
* **Listagem Completa:** Retorno de todos os usuários integrados ao sistema.
* **Exclusão Segura:** Ao deletar uma pessoa, o sistema limpa automaticamente todas as transações associadas a ela (Cascade Delete em memória).

### 💸 Controle de Transações (Movimentações)
* **Validação de Tipo:** Aceita estritamente os tipos `receita` ou `despesa`.
* **Validação de Valor:** Bloqueio de valores negativos ou zerados.
* **Trava de Idade (Regra Crítica):** Menores de 18 anos são impedidos pelo sistema de registrar `receitas`, sendo permitido apenas o lançamento de `despesas`.
* **Integridade Referencial:** Uma transação só pode ser criada se vinculada a um ID de pessoa válido e previamente cadastrado.

### 📊 Relatórios Consolidados
* **Consulta de Totais:** Endpoint que processa e agrupa o total de receitas, despesas e o saldo individual ($\text{receita} - \text{despesa}$) de cada pessoa, além de exibir um resumo geral com o saldo líquido de todo o sistema.

---

## 🛠️ Tecnologias Utilizadas

* **Linguagem:** C# (.NET 8)
* **Arquitetura:** Minimal APIs (para alta performance e código enxuto)
* **Validação de Dados:** Data Transfer Objects (DTOs) com validação de esquema
* **Containerização:** Docker & Docker Compose
* **Ferramenta de Testes:** Insomnia 

---

## 📦 Como Executar o Projeto com Docker

Certifique-se de ter o **Docker** instalado em sua máquina.

1. Clone o repositório para o seu ambiente local.
2. Certifique-se de estar na raiz do repositório (onde `docker-compose.yml` foi adicionado).
3. Execute o comando abaixo no terminal para buildar e iniciar a aplicação a partir da raiz:

```bash
docker compose up --build
```

Observações:
- O `docker-compose.yml` na raiz usa o contexto `./backend` para buildar a imagem. Isso permite rodar `docker compose up` na raiz ao invés de dentro de `backend/`.
- O diretório `backend/Data` é montado como volume em `/app/Data` dentro do container, preservando os dados entre reinícios.

---

## 🧩 Frontend (React + TypeScript)

O frontend está localizado em `frontend/` e usa **Vite** com **React** e **TypeScript**. A organização foi padronizada em pastas como:

```text
frontend/src/
├── components/
├── hooks/
├── lib/
├── pages/
├── styles/
└── types/
```

### Como executar o frontend

1. Navegue até a pasta do frontend:

```bash
cd frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Abra o aplicativo no navegador em:

```text
http://localhost:5173
```

---

## 🧭 Monorepo

Este repositório foi preparado como um monorepo para gerenciar múltiplos pacotes JavaScript em workspaces.

- **Gerenciador recomendado:** `pnpm` (workspaces configuradas).
- **Workspaces atuais:** `frontend`, `template-react` (ambos registrados em `pnpm-workspace.yaml`).

Comandos úteis na raiz do repositório:

```bash
pnpm install    # instala dependências em todos os workspaces
pnpm dev        # roda `dev` em todos os workspaces (pnpm -w -r run dev)
pnpm build      # roda `build` em todos os workspaces
pnpm -w -r run lint
```

Para adicionar outros pacotes, crie um `package.json` na pasta desejada (por exemplo `template-react`) ou mova projetos para uma pasta `packages/` e atualize `pnpm-workspace.yaml`.

