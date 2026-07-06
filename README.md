# 💰 Controle de Gastos Residenciais - Backend API

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
2. Navegue até a pasta raiz onde se encontra o arquivo `docker-compose.yml`.
3. Execute o comando abaixo no terminal para buildar e iniciar a aplicação:

```bash
docker compose up --build