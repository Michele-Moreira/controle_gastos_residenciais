# Conventional Commits

Formato: `<type>(<scope>): <description>` — minúsculo, em inglês, imperativo.

## Type

- `feat` — nova funcionalidade
- `fix` — correção de bug
- `refactor` — mudança de código sem alterar comportamento
- `style` — formatação, sem efeito em lógica
- `test` — adiciona ou ajusta testes
- `docs` — documentação
- `chore` — build, deps, config, tooling
- `perf` — melhoria de performance
- `build` / `ci` — empacotamento e pipeline

## Regras

- Tudo minúsculo; escopo obrigatório; ≤72 caracteres; sem ponto final.
- Corpo (opcional) explica o porquê, não o que o diff já mostra.

# Conventional Commits

Formato: `<type>(<scope>): <description>` — minúsculo, em inglês, imperativo.

```
feat(checkout): add coupon validation
fix(auth): refresh expired token before retry
refactor(lib): extract cn() into utils
```

## Type

- `feat` — nova funcionalidade
- `fix` — correção de bug
- `refactor` — mudança de código sem alterar comportamento
- `style` — formatação, sem efeito em lógica
- `test` — adiciona ou ajusta testes
- `docs` — documentação
- `chore` — build, deps, config, tooling
- `perf` — melhoria de performance
- `build` / `ci` — empacotamento e pipeline

## Regras

- **Tudo minúsculo** — type, scope e description. Nem a primeira palavra da description leva maiúscula. Exceção: issue key e nomes próprios/acrônimos inevitáveis.
- **Em inglês**, no imperativo: "add", "fix", "update" — não "added"/"fixed".
- **Escopo obrigatório e único** (a área afetada). Omita só se a mudança for ampla demais para um escopo honesto; nunca combine escopos com vírgula.
- **≤72 caracteres** no subject, incluindo prefixo de issue key se houver.
- **Sem ponto final.**
- **Uma intenção por commit.** Não misture refactor com feature.
- Corpo (opcional) explica o **porquê**, não o que o diff já mostra.
- Breaking change: `!` após o escopo (`feat(api)!: ...`) e detalhe no corpo.
- **Proibido:** `Co-authored-by` trailer, rodapé "Generated with ...", emoji ou menção a IA/Cursor/Claude/Copilot/IDE.

O fluxo de commit está na skill `git-commit`; o de PR, na skill `create-pr`.
