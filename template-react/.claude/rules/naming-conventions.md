# Naming

## Arquivos e pastas

- Arquivos e pastas em **kebab-case**: `user-card.tsx`, `use-checkout.ts`, `components/checkout/`.
- Teste co-localizado com sufixo `.test`: `user-card.test.tsx`.
- E2e em `e2e/` com sufixo `.spec`: `checkout.spec.ts`.

## Símbolos

- Componentes: PascalCase — `UserCard`.
- Hooks: `useX` camelCase.
- Funções/variáveis: camelCase.

# Naming

## Arquivos e pastas

- Arquivos e pastas em **kebab-case**: `user-card.tsx`, `use-checkout.ts`, `components/checkout/`.
- Teste co-localizado com sufixo `.test`: `user-card.test.tsx`.
- E2e em `e2e/` com sufixo `.spec`: `checkout.spec.ts`.

## Símbolos

- **Componentes:** PascalCase — `UserCard`, `CheckoutForm`.
- **Hooks:** camelCase com prefixo `use` — `useCheckout`, `useDebounce`.
- **Funções e variáveis:** camelCase — `formatCurrency`, `isLoading`.
- **Constantes de módulo:** UPPER_SNAKE_CASE — `MAX_RETRIES`.
- **Tipos e interfaces:** PascalCase — `User`, `CheckoutState`. Sem prefixo `I`.
- **Booleanos:** prefixo de intenção — `isOpen`, `hasError`, `canSubmit`.

## Handlers e eventos

- Handler interno: `handleX` — `handleSubmit`, `handleClick`.
- Prop de callback: `onX` — `onSubmit`, `onValueChange`.

O nome deve dispensar comentário. Se precisar comentar para explicar o que é, renomeie.
