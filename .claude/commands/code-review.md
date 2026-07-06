---
description: Revisa o diff atual quanto a correção e convenções do projeto
---

# code-review

Revisa as mudanças atuais antes de finalizar ou abrir PR.

## Passos

1. **Delimite o diff.** `git diff` (não commitado) ou `git diff <base>...HEAD` (branch inteiro). Confirme com o usuário o escopo se houver dúvida.
2. **Despache o subagent `code-reviewer`** sobre esse diff. Ele cobre correção (lógica, hooks, async, validação, tipos) e convenções (`.claude/rules/`).
3. **Para mudanças com peso visual**, rode também a skill `design-review`.
4. **Consolide os achados** por severidade: 🔴 bug/correção · 🟠 convenção · 🔵 sugestão. Cada item com `arquivo:linha → problema → correção`.
5. **Pergunte** ao usuário se quer que você aplique as correções 🔴/🟠 antes de seguir.

Não afirme que está tudo certo sem ter olhado o diff de fato. Se não houver nada a corrigir, diga isso.
