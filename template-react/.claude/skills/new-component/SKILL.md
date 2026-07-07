# new-component

Scaffold a new React component following project conventions: kebab-case filename, PascalCase component, typed props, export named, co-located test.
---

name: new-component
description: Use ao criar um novo componente React neste projeto. Scaffolda o arquivo do componente, o teste co-localizado e (quando faz sentido) promove para pasta de feature, seguindo as convenções do repo (naming kebab-case, export nomeado, props tipadas, Tailwind + cn).
---

# new-component

Cria um componente React novo seguindo as convenções do projeto.

## Quando usar

Sempre que for adicionar um componente — seja um avulso em `src/components/`, um de feature, ou um wrapper sobre shadcn/ui.

## Passos

1. **Decida o local** (ver `docs/estrutura.md`):
   - Componente isolado → `src/components/nome-componente.tsx`
   - Componente com subcomponentes/hooks próprios → pasta de feature `src/components/<feature>/`
2. **Confirme o nome** com o usuário se houver ambiguidade. Arquivo em kebab-case, componente em PascalCase.
3. **Crie o componente** com props tipadas e export nomeado:

   ```tsx
   import { cn } from '@/lib/utils';

   type Props = {
     className?: string;
   };

   export function NomeComponente({ className }: Props) {
     return <div className={cn('', className)} />;
   }
   ```

4. **Crie o teste co-localizado** (`nome-componente.test.tsx`) com Vitest + Testing Library, cobrindo o comportamento observável (render, interação principal). Não teste detalhe de implementação.
5. **Verifique:** rode `npm run type-check` e o teste do componente novo. Reporte o resultado real.

## Regras que valem aqui

- Sem comentários no código.
- Sem `export default`.
- Estilo só com Tailwind + `cn()`; tokens semânticos do tema.
- Não introduza dependência nova para resolver algo que o projeto já faz.
