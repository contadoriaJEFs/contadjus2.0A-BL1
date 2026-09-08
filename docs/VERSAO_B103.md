# ContadJus B103

## Objetivo
Correção exclusiva da renderização das tabelas no PDF.

## Alterações
- Forçado o comportamento nativo de `table`, `thead`, `tbody`, `tr` e `td` somente em `@media print`.
- `table-layout: fixed` nas tabelas impressas.
- Larguras explícitas para as 6 colunas de Resultado das Diferenças e 11 colunas da Memória da Atualização.
- Distribuição da Guia 5 corrigida para totalizar 100%, eliminando o conflito anterior de larguras que somavam 110%.
- Mantida a paginação/rodapé da B102.

## Regra de ouro
Nenhum tamanho de fonte foi alterado, na tela ou no PDF.
Nenhum motor ou função de cálculo foi alterado.
