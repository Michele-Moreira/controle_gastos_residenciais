# TypeScript

- `strict` ligado. Nunca use `any`.
- Prefira `type` para uniões e `interface` para contratos extensíveis.
- Valide dados externos com `zod`.

# TypeScript

- `strict` ligado. Trate erros do compilador como bloqueantes, não como aviso.
- **Nunca use `any`.** Quando o tipo é incerto, use `unknown` e refine com narrowing.
- Prefira `type` para uniões/composição e `interface` para contratos de objeto estendíveis. Seja consistente dentro de um módulo.
- Imports de tipo são explícitos: `import type { Foo } from './foo'`.
- Não anote o que o compilador já infere. Anote fronteiras públicas (parâmetros, retorno de funções exportadas).
- Valide dados externos (API, formulário, `localStorage`) em runtime com `zod`. O tipo vem do schema (`z.infer`), não o contrário.
- Evite asserção `as`. Se precisar, isole num único ponto e comente o porquê apenas se não for óbvio pelo schema.
- Funções pequenas, com early return. Sem comentários: o nome do símbolo carrega a intenção.
