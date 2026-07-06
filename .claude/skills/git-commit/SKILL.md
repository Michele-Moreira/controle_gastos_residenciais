---
name: git-commit
description: Creates git commits in this repo following Conventional Commits — lowercase English subject ≤72 chars with a mandatory single scope, one cohesive intent per commit. Use this skill whenever the user wants to commit changes — phrasings like "commita isso", "faz o commit", "cria um commit", "sobe esse fix", "salvar essas alterações", "stage and commit", "commit this". Reviews the diff first, splits unrelated changes into separate commits, optionally prefixes an issue key from the branch name, never pushes on its own, and strictly forbids any Co-authored-by trailer (including ones injected by hooks) and any mention of Cursor / AI / Claude / Copilot / any IDE.
---

# git-commit

## Por que esta skill existe

Commits deste projeto seguem regras fixas, fáceis de quebrar na pressa:

- **Conventional Commits**, subject **inteiramente minúsculo**, em **inglês**, com **escopo obrigatório** e **≤72 caracteres**.
- **Uma intenção coesa por commit** — diff misturado quebra bisect e review.
- **Nunca** um `Co-authored-by` trailer. Hooks às vezes injetam um; a skill remove e verifica.
- **Nenhuma menção** a Cursor, IA, Claude, Copilot ou qualquer IDE. O código é autoria do dono do repo.
- A skill **commita, mas não dá push** — push é decisão explícita.

Esta skill mantém essas invariantes independentemente de como o pedido foi formulado. Spec do formato em `.claude/rules/conventional-commits.md`.

## Steps

### 1. Inspecione o diff

```bash
git status
git diff --cached    # se já houver algo staged
git diff             # mudanças ainda não staged
```

Leia de fato. Você precisa entender o que mudou para escolher type e scope corretamente.

### 2. Cheque concerns misturados

Se o diff toca áreas não relacionadas (ex: um fix em `auth` + uma feature em `checkout` + docs soltos), **não commite**. Mostre ao usuário a divisão natural e pergunte qual grupo entra primeiro. Uma unidade revisável por commit mantém o histórico bisectável. Só siga quando a mudança for coesa.

### 3. Escolha o type

Um de: `feat`, `fix`, `refactor`, `style`, `test`, `docs`, `chore`, `perf`, `build`, `ci`.

Breaking change: acrescente `!` após o escopo — `feat(api)!: ...`.

### 4. Escolha o scope — obrigatório e único

Um único escopo, a área afetada. Nunca combine com vírgula; se a mudança abrange escopos diferentes, ela pertence a commits diferentes (ver passo 2).

Vocabulário sugerido para projetos React (não é lista fechada — use o nome da feature/módulo quando fizer mais sentido):

`ui`, `components`, `hooks`, `lib`, `pages`, `routes`, `styles`, `types`, `api`, `auth`, `deps`, `config`, `ci`, `tests`, `docs`

Omita o escopo só se a mudança for ampla demais para um escopo honesto.

### 5. (Opcional) issue key do branch

Se o projeto referencia tickets pelo nome do branch (ex: `feat/POW-123-coupons`), extraia a chave e prefixe o subject. Caso contrário, pule.

```bash
git rev-parse --abbrev-ref HEAD | grep -oE '[A-Z]{2,}-[0-9]+' | head -1
```

Com chave: `POW-123: <type>(<scope>): <description>`. Não invente chave; só use a que estiver no branch.

### 6. Escreva o subject

Formato: `<type>(<scope>): <description>` (ou com a chave do passo 5 como prefixo).

- **≤72 caracteres** no total (incluindo o prefixo de chave).
- **Tudo minúsculo** — type, scope e description. Nem a primeira palavra da description leva maiúscula. Única exceção: a issue key e nomes próprios/acrônimos inevitáveis.
- **Imperativo**, em inglês: "add", "fix", "update" — não "added"/"fixed".
- **Sem ponto final**.
- **Corpo opcional**, só quando o *porquê* não for óbvio pelo diff. Explique motivação/contexto, não o que o diff já mostra.

### 7. Stage, commite e remova qualquer co-author

Stage só o que pertence a esta intenção (`git add <arquivos>`); se tudo na árvore for deste commit, `git add -A`. Mostre a mensagem final ao usuário antes de commitar.

Commite com `-m` simples (HEREDOC se houver corpo ou caracteres a escapar). **Nunca** passe `-s`, `--signoff`, `--trailer` ou qualquer flag de co-author.

```bash
git commit -m "feat(checkout): add coupon validation"
```

Se houver hook que injeta um `Co-authored-by`, remova reescrevendo o commit:

```bash
git commit --amend -m "<mesmo subject>"
```

Verifique que ficou limpo:

```bash
git log -1 --format=%B | grep -i 'co-authored-by' && echo "STILL PRESENT"
```

Sem saída = limpo. Se a linha persistir, refaça ignorando os hooks só neste commit:

```bash
git -c core.hooksPath=/dev/null commit --amend -m "<mesmo subject>"
```

Um commit com qualquer `Co-authored-by`, emoji de IA ou rodapé "Generated with ..." nunca é aceitável aqui.

### 8. Confirme e pare

`git log --oneline -1`. **Não** dê push e não inicie trabalho adicional, salvo se o usuário pedir.

## Bons subjects

- `feat(checkout): add coupon validation`
- `fix(auth): refresh expired token before retry`
- `refactor(lib): extract cn() into utils`
- `chore(deps): bump vite to 5.4`
- `POW-123: feat(tags): add attach endpoint`
- `feat(api)!: drop legacy v1 response shape`

## Subjects ruins — não faça isso

- `commits stuff` — sem type, sem scope
- `feat: add coupon validation` — sem scope (obrigatório)
- `feat(ui,checkout): ...` — múltiplos escopos
- `Feat(Checkout): Add coupon validation` — type/scope/description em maiúscula
- `feat(checkout): Add coupon validation` — description começa com maiúscula
- `feat(checkout): add coupon validation.` — ponto final
- qualquer subject acima de 72 chars
- qualquer commit com `Co-authored-by: ...` ou rodapé de IA

## Regras relacionadas

- `.claude/rules/conventional-commits.md` — spec do formato
- `.claude/rules/naming-conventions.md` — nomes que dispensam comentário
