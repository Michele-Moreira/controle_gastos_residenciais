# React

- Apenas componentes de função.
- Um componente por arquivo, export nomeado.
- Props sempre tipadas; extraia lógica para `useX` quando repetida.
- Regras de hooks: só no topo do componente ou de outro hook.

# React

- Apenas componentes de função. Nada de classes.
- Um componente por arquivo, exportado nomeadamente (sem `export default`).
- Props sempre tipadas. Para componentes simples, declare o tipo inline ou como `type Props`.
- **Regras de hooks são inegociáveis:** só chame hooks no topo do componente ou de outro hook, nunca em condicional/loop.
- Extraia lógica com estado para um hook `useX` quando ela passa de trivial ou se repete.
- Estado mora no nível mais baixo que ainda atende todos os consumidores. Suba só quando precisar compartilhar.
- Derive em vez de duplicar: o que dá para calcular a partir de props/estado não vira novo estado.
- Efeitos (`useEffect`) são para sincronizar com o mundo externo, não para reagir a mudança de estado que poderia ser derivada ou tratada no handler.
- Listas usam `key` estável e única (o id do dado, nunca o índice quando a lista reordena).
- Composição acima de configuração: prefira `children` e slots a props booleanas que ligam/desligam pedaços de markup.
- Sem comentários no JSX: se ficou difícil de ler, extraia um subcomponente nomeado.
