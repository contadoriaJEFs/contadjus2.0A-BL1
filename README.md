# ContadJus B105

Ajuste exclusivamente vertical de paginação e rodapé do PDF. Os tamanhos tipográficos existentes foram preservados.


> **Versão B102:** ajuste final de paginação do PDF e aumento exclusivo da tabela de Diferenças na visualização em tela. Motores de cálculo preservados.
# ContadJus B97

Ajuste visual das tabelas dos relatórios. A B96 permanece como base visual. O corpo da tabela da Guia 5 passa a 8,0 px, sem alteração dos demais tamanhos. Linhas normais ficam sem R$ e sem negrito; totalizadores preservam R$ e negrito. Motores e funções de cálculo não foram alterados.

## B96 — Ajuste visual da Guia 5

- A memória da Guia 5 passa a exibir o coeficiente com **8 casas decimais** no relatório e na impressão/PDF, mantendo a precisão interna usada pelo cálculo.
- Preservada a distribuição das 11 colunas e a identidade visual atual.
- Linha de totais protegida contra quebra de página.
- Escopo exclusivo de UX/UI e apresentação; motores, fórmulas e funções de cálculo não foram alterados.

## B93 — Relatório profissional da Guia 5

- A Guia 5 — Atualização passa a integrar o relatório profissional da Guia 8.
- Incluído quadro de parâmetros, totais consolidados e memória institucional da atualização.
- A tabela reproduz as competências e os valores já calculados pelo motor da Guia 5, sem reexecutar o cálculo.
- Mantida a identidade visual do Master B79, com adaptação da tabela extensa ao conteúdo da Guia 5.
- As demais guias e motores permanecem preservados.

## B90 — rastreabilidade da base até a sentença

- No critério **Até a sentença**, a Data da Sentença passa a funcionar exclusivamente como limite das competências incluídas na base.
- As competências incluídas continuam sendo atualizadas até a **Data de Atualização geral do cálculo**, preservando a mesma referência temporal da Guia 5.
- O modal de conferência passa a informar também a Data de Atualização utilizada.
- Mantido o layout do modal de conferência aprovado na B88/B89.
- O botão de acesso ao modal permanece compacto, exibindo somente a lupa.
- Motores de cálculo dos demais critérios e módulos preservados.

# ContadJus — B90

Versão B90, derivada da B89, com correção da regra temporal do detalhamento e da base de honorários no critério **Até a sentença**.

**Base:** B89
**Escopo:** a sentença limita a seleção das competências; a data-base do cálculo determina até quando essas competências são atualizadas.

## B88 — Conferência mês a mês da base até a sentença

A versão B88 acrescenta, na Guia 7 — Requisitório/Honorários Sucumbenciais, um modal de conferência para o critério **Até a sentença**. O usuário pode visualizar, competência por competência, a data da sentença considerada e os valores que compõem a base: valor original, coeficiente, valor corrigido, juros, SELIC e total.

A funcionalidade utiliza o mesmo cálculo da base dos honorários para evitar divergência entre o detalhamento apresentado e o valor efetivamente considerado. Os demais motores e módulos permanecem preservados.


## B91 — proporcionalidade da competência no mês da sentença

- No critério **Até a sentença**, a Data da Sentença continua definindo quais competências entram na base.
- Quando a data contém o dia (DD/MM/AAAA), a competência do mês da sentença passa a ser considerada proporcionalmente aos dias transcorridos, contando o próprio dia informado.
- Exemplo: sentença em 15/09, em mês de 30 dias → 15/30 = 50,00% da parcela de 09/2022.
- As parcelas selecionadas continuam sendo atualizadas até a Data de Atualização geral do cálculo.
- O modal de conferência mantém seu layout e passa a mostrar o fator de pró-rata da competência proporcional.
- Data informada apenas como MM/AAAA continua considerando a competência integral.
- Nenhum outro motor de cálculo foi alterado.


## B92 — Honorários e Precatório

- Correção do pró-rata da competência da Data da Sentença: a comparação agora é feita por competência (mês/ano), permitindo aplicar corretamente o dia informado.
- Mantida a regra: mês/ano considera a competência integral; dia/mês/ano considera proporcionalmente os dias, contando o próprio dia da sentença.
- Após o pró-rata, a parcela é atualizada até a data-base geral do cálculo.
- Quando o bloco de Precatório estiver disponível, o painel de cálculo é aberto por padrão.


## B94 — Relatórios

Integração efetiva da Guia 5 — Atualização ao relatório profissional e à impressão/PDF. Alterações restritas à camada de apresentação. Os motores e funções de cálculo permanecem inalterados.


### B96 — UX/UI e PDF da Guia 5
Ajustes exclusivamente de apresentação: memória da Guia 5 ampliada na tela, coeficiente exibido com 8 casas decimais, TOTAL das linhas sem negrito e totalizador final protegido contra quebra entre páginas no relatório/PDF. A mesma regra de exibição com 8 casas foi aplicada à tabela operacional da Guia 5. Motores e funções de cálculo preservados.


## B103
- Correção exclusiva da renderização das tabelas no PDF.
- Modelo nativo de tabela forçado apenas em `@media print`.
- Larguras das colunas da Guia 4 e Guia 5 fixadas em 100%.
- Nenhum tamanho de fonte foi alterado.
- Nenhum motor ou função de cálculo foi alterado.
