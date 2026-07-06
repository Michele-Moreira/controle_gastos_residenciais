---
name: design-review
description: Use ao revisar uma mudança de UI antes de finalizar ou abrir PR. Avalia responsividade (mobile-first), acessibilidade (foco, rótulos, contraste, teclado), consistência com os tokens do tema e aderência às regras de estilo do projeto. Use quando o usuário pedir "revisa o visual", "ficou bom?", "design review", ou após implementar tela/componente com peso visual.
---

# design-review

Revisa uma mudança de UI sob três lentes. Reporte achados concretos (arquivo + o que muda), não elogios genéricos.

## Lente 1 — Responsividade

- Layout é mobile-first? Classe base atende o menor breakpoint e os prefixos (`md:`, `lg:`) sobem a partir dali.
- Quebra em telas estreitas (texto estourando, overflow horizontal, toque pequeno demais)?
- Imagens/grids se adaptam em vez de ter largura fixa?

## Lente 2 — Acessibilidade

- Todo elemento interativo é alcançável por teclado e tem estado de foco visível.
- Botões/inputs têm rótulo acessível (texto, `aria-label` ou `<label>` associado).
- Contraste de texto suficiente sobre o fundo.
- Imagem com conteúdo tem `alt`; imagem decorativa tem `alt=""`.
- Ordem de foco segue a ordem visual.

## Lente 3 — Consistência

- Usa tokens semânticos do tema (`bg-background`, `text-muted-foreground`) e não cores cruas.
- Espaçamento/raio/tipografia saem da escala do Tailwind, sem valores arbitrários sem motivo.
- Reaproveita componentes existentes (incl. shadcn) em vez de recriar.
- Segue `.claude/rules/styling.md`.

## Saída

Para cada problema: **arquivo:linha → o que está errado → correção sugerida**, agrupado por lente. Se possível, valide com Playwright em mais de um viewport e reporte o resultado real.
