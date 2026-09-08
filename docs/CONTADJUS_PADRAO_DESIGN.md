# CONTADJUS — PADRÃO OFICIAL DE DESIGN

**Versão:** 1.4 — B96  
**Data:** 27/08/2026  
**Status:** documento permanente do projeto

## 1. Regra-mãe

O **relatório da B79 da Guia 2** permanece como **MASTER VISUAL e referência histórica da identidade institucional** dos relatórios ContadJus. A **B92 representa a evolução visual atual e aprovada da interface do sistema (UX/UI)**.

Novas guias e novas seções devem adaptar seu conteúdo a esse padrão. Não se deve redesenhar o relatório aprovado para acomodar uma nova guia.

> **B79 estabelece o Master Visual e a identidade institucional. B92 representa a evolução atual da UX/UI. Novos relatórios expandem esse padrão; não o substituem.**

## 2. Identidade visual

- Azul institucional: `#002b66`
- Ciano/teal: `#00a8b5`
- Teal alternativo: `#008080`
- Grafite: `#475569`
- Texto: `#1e293b`
- Fundo claro: `#f8fafc`
- Bordas: `#cbd5e1`
- Zebra de tabela: `#f1f5f9`

## 3. Estrutura do relatório

1. Logo ContadJus e identificação do documento.
2. Linha divisória ciano.
3. Quadro de identificação processual.
4. Título de seção em azul com linha ciano.
5. Quadro de parâmetros.
6. Destaque moderado da RMA.
7. Título da memória.
8. Tabela institucional.
9. Nota técnica discreta.

## 4. Guia 2

Título da seção: **Resultado da Evolução Previdenciária**.

Memória oficial: **MEMÓRIA DA EVOLUÇÃO DO BENEFÍCIO DEVIDO**.

A aparência da B79 deve ser preservada quando somente a Guia 2 for selecionada.

## 5. Guia 3

A Guia 3 é outra evolução previdenciária e deve utilizar a mesma linguagem visual da Guia 2.

Título da seção: **Resultado da Evolução do Benefício Recebido**.

Memória oficial: **MEMÓRIA DA EVOLUÇÃO DO BENEFÍCIO RECEBIDO**.

Os dados próprios da Guia 3 podem variar, mas não a identidade visual.

## 6. Guia 4 — Diferenças

A Guia 4 passa a integrar o relatório profissional e deve utilizar a mesma linguagem visual das Guias 2 e 3.

Estrutura obrigatória:

1. título **Resultado das Diferenças**;
2. quadro de parâmetros (termo inicial, competência final, modo de compensação e quantidade de competências);
3. quadro de totais (devido, recebido e diferença total);
4. tabela consolidada das diferenças, preservando as colunas efetivamente exibidas na Guia 4;
5. nota técnica informando que o relatório reproduz resultados consolidados e não reexecuta os motores.

A tabela deve manter cabeçalho azul institucional `#002b66`, texto branco, bordas discretas, zebra `#f1f5f9` e valores de diferença destacados em azul institucional.

## 7. PDF e impressão

A impressão deve reproduzir o modelo B79 em A4, com:

- margens e proporções equivalentes ao modelo aprovado;
- logo proporcional;
- tipografia legível;
- tabelas dentro das margens;
- cores institucionais preservadas;
- quebra de página controlada;
- Guia 3 em nova página quando a Guia 2 também estiver selecionada.

A prévia da Guia 8 e o PDF devem representar o mesmo documento, com adaptação apenas às dimensões do papel.

## 8. Separação entre visual e motor

Alterações de design não devem modificar:

- motores de cálculo;
- fórmulas;
- IDs existentes;
- vínculos entre guias;
- JSON;
- importação/exportação;
- regras previdenciárias.

## 9. Nomenclatura

Não utilizar novamente **MEMÓRIA DE CÁLCULO COMPLETA** para as evoluções previdenciárias.

Usar:

- Guia 2: **MEMÓRIA DA EVOLUÇÃO DO BENEFÍCIO DEVIDO**
- Guia 3: **MEMÓRIA DA EVOLUÇÃO DO BENEFÍCIO RECEBIDO**

## 10. Regra para futuras versões

Antes de alterar qualquer relatório ou componente visual, comparar a proposta com:

1. **B79**, para preservar a identidade institucional e o Master Visual;
2. **B92**, para preservar a evolução atual e aprovada da UX/UI do sistema.

Se uma mudança fizer o relatório ou a interface parecer pertencer a outro sistema, ela deve ser rejeitada ou revista.

A referência prática deve ser sempre a **versão visual mais atual e aprovada**, sem abandonar os princípios estabelecidos pelo Master Visual B79.

## 11. Estado atual do projeto — B92

A B92 é a versão de referência atual dos motores do ContadJus nesta etapa do projeto e, visualmente, representa a evolução atual e aprovada da UX/UI do sistema.

Os motores de cálculo encontram-se em fase de estabilização. As próximas alterações devem concentrar-se prioritariamente na geração, apresentação, conferência e rastreabilidade dos relatórios, preservando os motores já validados.

A construção dos relatórios deve observar simultaneamente:

- o **Master Visual da B79**, como referência de identidade visual;
- a necessidade de adaptação de cada guia ao seu volume e natureza de dados;
- a legibilidade em tela e em PDF;
- a rastreabilidade dos valores apresentados;
- a preservação dos motores e regras de cálculo já estabilizados.

A Guia de Atualização merece tratamento específico, pois pode conter grande quantidade de competências. Não é obrigatório condensá-la em poucas páginas; deve-se priorizar a legibilidade, a conferência e a reprodução fiel dos dados.

Nos cálculos que utilizem uma base derivada de outras guias, sempre que tecnicamente aplicável, o relatório deve permitir rastrear o resultado até seus componentes de origem.

### 11.1 Honorários — rastreabilidade

Na Guia 7, quando utilizado o critério **“Até a sentença”**, a apresentação dos valores deve permitir a conferência mês a mês.

A regra funcional estabelecida na B92 é:

- a **Data da Sentença** define o limite das competências consideradas;
- se informada apenas como mês/ano, a competência é considerada integralmente;
- se informada com dia, a competência do mês da sentença é considerada proporcionalmente aos dias, contando o próprio dia informado;
- os valores das competências consideradas são atualizados até a **Data de Atualização do cálculo**;
- o detalhamento deve permitir identificar os valores que efetivamente compõem a base dos honorários.

Esse detalhamento tem finalidade de **rastreabilidade e conferência**, não apenas de apresentação.

### 11.2.1 Hierarquia das referências visuais

A evolução visual do ContadJus deve ser entendida como uma continuidade:

**B79 → Master Visual e identidade institucional**

**B92 → evolução atual da UX/UI e referência prática vigente**

A B92 não substitui os princípios do Master Visual; ela os aprimora e os adapta à interface atual do sistema. Novos relatórios, componentes e telas podem evoluir a composição, desde que permaneçam reconhecíveis como ContadJus e respeitem a identidade institucional.

### 11.2 Princípio para as próximas versões

A partir da B92, novas melhorias de relatório devem preservar a separação entre:

**motor de cálculo → dados calculados → apresentação → relatório/PDF.**

Uma melhoria visual ou de relatório não deve alterar silenciosamente o resultado dos motores.


## 12. B95 — Refinamento visual da Guia 5

A Guia 5 passa a apresentar coeficientes com 8 casas decimais na camada de relatório/PDF, sem alterar a precisão interna dos cálculos. A linha de totais é tratada como bloco indivisível na paginação.

Estas alterações são exclusivamente de apresentação e impressão.


### B96 — UX/UI e PDF da Guia 5
Ajustes exclusivamente de apresentação: memória da Guia 5 ampliada na tela, coeficiente exibido com 8 casas decimais, TOTAL das linhas sem negrito e totalizador final protegido contra quebra entre páginas no relatório/PDF. Motores e funções de cálculo preservados.


### B96 — refinamento da Guia 5

A Guia 5 deve manter a linguagem visual atual da B92 na tela e no PDF. A memória não deve ser comprimida a ponto de prejudicar a leitura. Coeficientes/índices podem ser apresentados com **8 casas decimais**, sem alterar a precisão interna do cálculo. Valores por competência não devem receber negrito desnecessário; o destaque de peso fica reservado à linha totalizadora final. No PDF, a linha totalizadora deve permanecer como bloco indivisível e aparecer somente após a última competência.
