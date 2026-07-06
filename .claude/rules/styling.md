# Estilo (Tailwind + shadcn/ui)

- Estilização via classes Tailwind. **Sem `style` inline** e sem CSS solto, salvo tokens globais em `src/styles/`.
- Componha classes condicionais com `cn()` (de `src/lib/utils`), nunca com template string concatenando à mão.

  ```tsx
  <button className={cn("rounded px-3 py-2", isActive && "bg-primary text-primary-foreground")} />
  ```

- Use os tokens semânticos do tema (`bg-background`, `text-muted-foreground`, `border-border`) em vez de cores cruas (`bg-gray-900`). Isso mantém dark mode e theming coerentes.
- Espaçamento, raio e tipografia saem da escala do Tailwind. Não invente valores arbitrários (`p-[13px]`) sem motivo real.
- Componentes shadcn/ui vivem em `src/components/ui/`. Customize-os ali, mantendo a API de variantes (`cva`) consistente.
- Responsividade é mobile-first: classe base para o menor breakpoint, prefixos (`md:`, `lg:`) para subir.
- Acessibilidade não é opcional: elementos interativos são focáveis, têm rótulo acessível e estado visível de foco.
