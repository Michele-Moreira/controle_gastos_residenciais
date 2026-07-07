# shadcn/ui

Guidelines to add or customize shadcn/ui components. Use `npx shadcn@latest add <component>` and place generated files in `src/components/ui/`.
---

name: shadcn
description: Use ao adicionar, atualizar ou customizar componentes shadcn/ui neste projeto. Cobre o fluxo do CLI (npx shadcn add), onde os componentes vivem, como customizar variantes com cva e como combinar classes com cn(). Use quando o usuário pedir um componente de UI comum (botão, dialog, dropdown, form, etc.) antes de escrever do zero.
---

# shadcn/ui

Fluxo para usar shadcn/ui neste projeto.

## Regra de ouro

Antes de escrever um componente de UI comum do zero (botão, input, dialog, dropdown, tabs, toast...), verifique se o shadcn já oferece. Quase sempre oferece — adicione em vez de reimplementar.

## Adicionar um componente

```bash
npx shadcn@latest add <componente>
```

Os arquivos aterrissam em `src/components/ui/`. Eles são **código do projeto**: versionados e customizáveis.

## Onde as coisas vivem

- Componentes gerados: `src/components/ui/`
- Utilitário `cn()`: `src/lib/utils.ts`
- Configuração: `components.json` na raiz

## Customizar

- Ajuste variantes pela API `cva` já presente no componente — não crie um wrapper só para mudar classe.
- Para variar estilo no ponto de uso, passe `className`; o `cn()` interno mescla corretamente.
- Mantenha os tokens semânticos do tema (`bg-primary`, `text-muted-foreground`) para não quebrar dark mode.

## Não fazer

- Não edite `src/components/ui/` para regra de negócio. Componha por cima, em `src/components/<feature>/`.
- Não duplique um componente shadcn para "ter a minha versão"; estenda via variante ou composição.
