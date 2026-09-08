# B81 — Correção da impressão dos relatórios

## Causa identificada
A prévia da Guia 8 usa `#previewRelatorio.relatorio-documento` como container. O botão de impressão copiava apenas o `innerHTML` para `#relatorioImpressaoPortal`, perdendo a classe `relatorio-documento`. Como o CSS profissional é ancorado nessa classe, o PDF recebia apenas estilos genéricos.

## Correção
O portal de impressão agora recebe `className = "relatorio-documento"` antes de receber o conteúdo da prévia. Assim, a impressão usa a mesma estrutura visual da prévia.

## Correção adicional
Valores monetários da Guia 3 digitados no padrão brasileiro (`1.200,00`) agora são interpretados corretamente no relatório, evitando `R$ 0,00` quando o valor é uma string formatada.

## Regra
Nenhum motor de cálculo, ID, vínculo entre guias, JSON ou regra previdenciária foi alterado.
