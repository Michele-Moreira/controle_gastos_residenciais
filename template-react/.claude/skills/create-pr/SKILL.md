# create-pr

Opens Pull Requests with title in Conventional Commits and body using Summary + Test plan template. Do not add reviewers or draft.
---

name: create-pr
description: Opens Pull Requests in this repo with a lowercase Conventional Commits English title, an English body using the Summary + Test plan template, and labels auto-suggested from the branch's commit types. Use this skill whenever the user wants to open or create a pull request — phrasings like "abre o PR", "cria um pull request", "sobe pra review", "manda o PR", "open a PR". Targets the repo's integration branch, never assigns reviewers, never opens as draft, and never mentions Cursor / AI / Claude / Copilot / any IDE and never adds a co-author or "Generated with" trailer.
---

# create-pr

## Por que esta skill existe

Abrir PR à mão erra detalhes fáceis de padronizar:

- Título em **Conventional Commits**, **minúsculo**, em **inglês**, com **escopo obrigatório**.
- Corpo em **inglês** com o template **Summary + Test plan**.
- **Sem reviewers** atribuídos — review é puxado, não empurrado.
- **Sem draft** — o PR abre pronto para review.
- **Nenhuma menção** a Cursor, IA, Claude, Copilot ou IDE, e **nenhum** co-author/rodapé "Generated with ...".

Esta skill mantém essas invariantes independentemente de como o pedido foi formulado.

## Steps

### 1. Confirme que o branch está pronto

```bash
git branch --show-current
git status
```

- Tudo relevante precisa estar commitado. Se houver mudança pendente, pare e use a skill `git-commit` antes.
- Publique o branch se ainda não estiver no remoto: `git push -u origin <branch>`.

### 2. Escolha a base

```bash
gh repo view --json defaultBranchRef --jq .defaultBranchRef.name
```

- **Default:** o branch de integração do repo (normalmente `main`).
- Se o projeto usa um branch intermediário (ex: `develop`, `staging`), mire nele e confirme com o usuário, pois pode ser um evento de release.
- Nunca abra um feature branch direto contra um branch protegido se o projeto exige passar pela integração.

### 3. Título — lowercase Conventional Commits, inglês

Formato: `<type>(<scope>): <description>` — as mesmas regras da skill `git-commit` (type válido, **escopo único obrigatório**, tudo minúsculo, imperativo, sem ponto final, ~60 chars). O título reflete o conjunto da mudança do branch, não um commit isolado.

- Em **inglês**, mesmo que a conversa esteja em português.
- Sem marcador de ticket no título (a chave, se houver, fica no commit).
- **Nunca** mencione Cursor, IA, Claude, Copilot ou IDE.

**Bons títulos**

- `feat(checkout): add coupon validation`
- `fix(ci): align deploy trigger with branch flow`
- `refactor(uploads): extract storage adapter`

**Títulos ruins — não faça isso**

- `Feat(Checkout): Add coupon validation` — maiúsculas
- `update checkout` — sem type e sem scope
- `feat: add coupon validation` — sem scope (obrigatório)

### 4. Corpo — use exatamente este template

```markdown
## Summary

- <1–3 bullets: o que mudou e por quê, no nível que o reviewer precisa>

## Test plan

- [ ] <verificação específica ligada a esta mudança>
- [ ] <outra verificação específica>
- [ ] Unit tests pass
- [ ] Manual testing completed
```

- **Summary** foca no _porquê_ (motivação, contexto do bug, constraint). O diff já mostra o _o quê_.
- **Test plan**: as primeiras checagens são concretas e específicas da mudança, não frases genéricas.
- Corpo em **inglês**, mesmo com a conversa em português.
- **Nunca** inclua co-author trailer, rodapé de IA ou nota "Generated with ...".

Passe o corpo via HEREDOC para preservar a formatação:

```bash
gh pr create --base <base> --title "<title>" --body "$(cat <<'EOF'
## Summary
- ...

## Test plan
- [ ] ...
- [ ] Unit tests pass
- [ ] Manual testing completed
EOF
)"
```

### 5. Sugira labels (opcional)

Mapeie os tipos de commit do branch para labels e intersecte com as que existem no repo:

```bash
git log <base>..HEAD --format='%s' | grep -oE '^[a-z]+' | sort -u   # tipos presentes
gh label list --json name --jq '.[].name'                            # labels do repo
```

Mapeamento: `feat`→`enhancement`, `fix`→`bug`, `docs`→`documentation`, `test`→`tests`, `refactor`→`refactor`, `perf`→`performance`, `ci`/`build`/`chore`→`maintenance`. Use só labels que **existem** no repo (`--label <nome>`). Se nenhuma corresponder, abra sem label — não invente.

### 6. Crie o PR

```bash
gh pr create --base <base> --title "<title>" --body "<body>" [--label ...]
```

Hard rules:

- **Sem** `--reviewer`.
- **Sem** `--draft`.
- **Sem** co-author, rodapé de IA ou menção a IDE em qualquer lugar do título ou corpo.

### 7. Retorne a URL e pare

Reporte a URL do PR ao usuário. Não dê push adicional, não faça merge nem inicie follow-up sem o usuário pedir.

## Bom corpo de PR

```markdown
## Summary

- Coupons were validated only on the server, so the form accepted an invalid code and waited a full round-trip to show the error.
- Added client-side validation with the same zod schema used on the backend, sharing one source of truth.

## Test plan

- [ ] Submit an invalid coupon and confirm the inline error shows without a request.
- [ ] Submit a valid coupon and confirm the discount applies.
- [ ] Unit tests pass
- [ ] Manual testing completed
```

## Corpo ruim — não faça isso

```markdown
This PR updates the checkout.

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>
```

Motivos: summary vazio de contexto, emoji/menção de IA, co-author trailer. Os três são proibidos.

## Regras relacionadas

- `.claude/skills/git-commit/SKILL.md` — mesmas regras de título Conventional Commits
- `.claude/rules/conventional-commits.md` — spec do formato
