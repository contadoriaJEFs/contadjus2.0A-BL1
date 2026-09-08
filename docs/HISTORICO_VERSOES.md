# B96 — 2026-08-27
- Guia 5: memória da atualização ampliada na tela para preservar legibilidade.
- Coeficiente/índice exibido com 8 casas decimais na Guia 5 e no relatório/PDF, preservando a precisão interna.
- Valores TOTAL por competência deixam de usar negrito; permanecem em azul. A linha totalizadora final continua em destaque.
- Totalizador final da memória foi separado do corpo da tabela para impedir que a linha de totais seja quebrada entre páginas no PDF.
- Alterações exclusivamente de UX/UI e apresentação. Motores, fórmulas e funções de cálculo preservados.

# B95 — 2026-08-27
- Guia 5: coeficientes exibidos com 8 casas decimais na camada de relatório/PDF; precisão interna preservada.
- Linha de totais da memória protegida contra quebra de página.
- Nenhum motor, fórmula ou função de cálculo alterado.

## B94 — Relatórios: Guia 5

- Inclusão efetiva da Guia 5 — Atualização na geração do relatório profissional e no PDF/impressão.
- Ajustes exclusivos de UX/UI e apresentação da tabela para impressão.
- Motores, fórmulas e funções de cálculo preservados.

# B93 — 2026-08-27
- Guia 5 passa a integrar o relatório profissional.
- Criada memória da atualização com identificação da data-base, parâmetros, totais e tabela completa das competências.
- A apresentação adapta a identidade visual do Master B79 ao volume de colunas da atualização, preservando legibilidade e repetição de cabeçalho na impressão.
- O relatório apenas reproduz os resultados consolidados da Guia 5; não reexecuta o motor de cálculo.
- Motores, índices, fórmulas e persistência preservados.

# B91 — proporcionalidade da competência no mês da sentença

- A Data da Sentença passa a usar o dia informado para aplicar pró-rata somente à competência do próprio mês.
- A contagem é inclusiva: dia da sentença incluído.
- Fórmula: dias considerados ÷ dias do mês.
- Exemplo: 15/09/2022 em setembro de 30 dias = 15/30 = 50,00%.
- O valor proporcional segue sendo atualizado até a Data de Atualização geral do cálculo.
- Modal preservado e enriquecido com a informação do pró-rata.

# B89 — 2026-08-27
- Honorários sucumbenciais: acesso ao detalhamento mês a mês da base `Até a sentença` corrigido para aparecer ao selecionar o critério.
- Data da Sentença: máscara automática para entrada sem barras, aceitando `MM/AAAA` e `DD/MM/AAAA`.
- Mantido o detalhamento para rastreabilidade da base, com competência, valor original, coeficiente, valor corrigido, juros, SELIC e total.
- Guia 5: incluído letreiro discreto, móvel e exclusivamente informativo com INPC, IPCA-E, SELIC, Taxa Legal e Taxa Legal Previdenciária.
- Motores de cálculo, fórmulas e parâmetros selecionados não são alterados pelo letreiro informativo.

# B86 — 2026-08-26
- Base diretamente derivada da B85.
- Relatório: `PRO RATA/FALLBACK` passa a ser exibido apenas como `PRO RATA`, preservando o valor interno do cálculo.
- Títulos das memórias passam a seguir o tratamento leve dos títulos de resultado do sistema: regular, navy e linha teal inferior.
- Vlr. Final das Guias 2 e 3 recebe destaque mais leve, evitando aparência excessivamente pesada.
- Diferença Devida da Guia 4 mantém seu destaque atual.
- Ajuste fino das larguras de Tipo, Status e Vlr. Final nas memórias das Guias 2 e 3.
- Notas do relatório deixam de expor `Guia 2`, `Guia 3`, `Guia 4` e `motores de cálculo` ao usuário final.
- Mantida a linha teal discreta e o rodapé institucional da B85.
- Motores, índices, regras matemáticas, persistência e cálculos preservados.

# B85 — 2026-08-25
- Base integralmente preservada da B84.
- Relatórios profissionais: `Competência` passa a `Comp.` nas memórias.
- Redistribuídas as larguras das colunas, preservando `Vlr. Teórico` e `Vlr. Evoluído` e ampliando o espaço de `Vlr. Final`.
- Valores monetários finais impedidos de quebra de linha.
- Guia 4 recebe pequeno ganho de respiro e legibilidade sem alteração de conteúdo ou cálculo.
- Incluído rodapé institucional na impressão: `ContadJus • Liquidação de Sentenças e Cálculos Judiciais`.
- Motores de cálculo, dados, JSON e regras preservados.

# CONTADJUS — HISTÓRICO CONSOLIDADO DE VERSÕES

Este arquivo consolida os antigos changelogs individuais do projeto. A partir da B83, novos registros devem ser acrescentados aqui, evitando a proliferação de arquivos pequenos no repositório.



# CHANGELOG.md

# B44 — 2026-08-24
- Guia 3: correção da evolução mensal consumida pela Guia 4 (RMI antes do primeiro reajuste; marco passa a valer somente na competência correta).
- Guia 3: botão para copiar dados do benefício devido para o benefício recebido, sem copiar RMI.


## B29 — Índice inferior a 1,00
- Corrigido o tratamento de coeficientes acumulados inferiores a 1,00.
- O índice continua compondo o acumulado, mas não reduz o valor monetário da própria parcela abaixo do original.
- Aplicado na Guia 5 e no cálculo mensal reutilizado pela Guia 6.

## B25 — MC GERAL 2026 – SELIC
- Criado preset alternativo `MC-ACOES-GERAL-2026-SELIC`.
- 01/2003–06/2009: SELIC como juros e sem correção monetária.
- Preset `MC-ACOES-GERAL-2026` original permanece inalterado.


## B19 — Correção dos encadeamentos de juros da Guia 5

- Encadeamentos oficiais passaram a ser carregados integralmente, sem corte pela primeira competência do caso.
- Corrigidos os juros dos modelos MC-PREVID-2026 e MC-PREVID-2022 conforme os respectivos Manuais.
- Corrigida a aplicação da Taxa Legal Previdenciária no mês seguinte à competência.
- Sincronização de Início dos Juros da Guia 1 com a Guia 5 reforçada.
- Incluída a competência 05/2012 na série histórica de poupança.
- Auditoria dos modelos de Ações em Geral permanece como próxima etapa, devido às regras distintas para Fazenda Pública e devedor não enquadrado como Fazenda Pública.

## B16 — UX Guia 6 — Parcelas vincendas recolhíveis
- Bloco `Parcelas vincendas` transformado em painel recolhível.
- Removido o ícone `📊`.
- Fechado por padrão, com quantidade de parcelas visível no cabeçalho.
- Sem alteração no motor de cálculo.
# B12 — 1.9A
- Corrigida vincenda proporcional no mesmo mês da DIB/ajuizamento.
- Ajustada tipografia e ações globais.
- Compactada a Guia 1.

# Changelog

Todas as alterações relevantes do **ContadJus** e do módulo **LiquidaCalc** são registradas neste arquivo.

O projeto utiliza fases funcionais para documentar a evolução incremental. Cada fase somente é marcada como **homologada** após os testes de aceitação e regressão correspondentes.

## Convenções

- **Adicionado:** nova funcionalidade, estrutura ou arquivo.
- **Alterado:** mudança intencional de comportamento ou apresentação.
- **Corrigido:** resolução de erro ou regressão.
- **Preservado:** componentes que não sofreram alteração na fase.
- **Homologação:** testes executados e resultados aprovados.
- **Pendente:** funcionalidade preparada estruturalmente, mas ainda não implementada matematicamente.

---

## [3.5-alpha] Fase 1.8F-F1B.1: correção do fluxo dos modelos da Guia 5

**Data:** 11/08/2026  
**Status:** Homologada

### Corrigido

- restabelecida a aplicação automática dos modelos oficiais da Guia 5;
- correção da vinculação do botão Aplicar;
- atualização automática dos encadeamentos visuais após aplicação do modelo;
- sincronização entre seleção do modelo e renderização da legenda dos encadeamentos.

### Diagnóstico homologado

A investigação isolou o problema no fluxo de aplicação do modelo.

Foi confirmado que:

- os parâmetros eram carregados normalmente;
- os modelos oficiais eram carregados corretamente;
- `carregarEncadeamentoOficial()` funcionava corretamente;
- os encadeamentos oficiais estavam corretos;
- o container dos encadeamentos estava correto;
- `atualizarEncadeamentosVisuais()` funcionava corretamente;
- a renderização dos encadeamentos e de suas legendas funcionava corretamente;
- o problema estava exclusivamente no fluxo de disparo do botão `Aplicar`.

Assim, não houve necessidade de alteração do motor de carregamento,
dos parâmetros, da estrutura dos encadeamentos ou da rotina de
renderização. A correção concentrou-se na vinculação e no disparo
do fluxo do botão `Aplicar`.

### Preservado

- motor de correção monetária;
- motor previdenciário;
- filtros dos encadeamentos;
- Guia 2;
- Guia 4;
- cálculos homologados;
- modelos oficiais.

---

### Observação técnica — divergências residuais de arredondamento

Foram observadas, em cenários específicos, diferenças residuais de
centavos entre os resultados do ContadJus e sistemas de referência
externos.

A investigação indicou compatibilidade com diferenças de estratégia
de arredondamento, truncamento ou quantidade de casas decimais
utilizadas em etapas intermediárias.

Não foi identificada divergência material nos resultados homologados.

**Decisão técnica:** não alterar os motores matemáticos já homologados
exclusivamente para eliminar diferenças residuais de centavos cuja
origem esteja associada a estratégias distintas de precisão,
arredondamento ou truncamento.

---

## [3.5-alpha] Fase 1.8F-B4: arquivos personalizados e status detalhados

**Data:** 06/08/2026  
**Status:** Homologada

### Adicionado

- Extensão `.corr` para encadeamentos de correção monetária.
- Extensão `.jur` para pacotes unificados de Juros e SELIC.
- Extensão `.contadjus` para casos completos.
- Novos padrões de nomes:

```text
CORRE-NOME.corr
JUROS-NOME.jur
DADOS-AUTOR-IDENTIFICADOR.contadjus
```

- Identificador do caso obtido dos últimos seis algarismos do primeiro bloco do processo CNJ.
- Sanitização de nomes com remoção de acentos, uso de maiúsculas e separação por hífens.
- Tratamento de apóstrofos na sanitização.
- Valores substitutos:

```text
SEM-NOME
SEM-AUTOR
SEM-PROCESSO
```

- Exibição dos intervalos de cada indexador nos cartões da Guia 5.
- Nomes amigáveis dos índices nos status.
- Símbolo `►` para identificar visualmente cada novo período.
- Quebra automática dos blocos de períodos conforme a largura disponível.
- Exibição de período sem data final como `MM/AAAA em diante`.

### Alterado

- Botão `Carregar JSON de Correção` renomeado para `Carregar Parâmetros de Correção`.
- Botão `Carregar JSON de Juros e SELIC` renomeado para `Carregar Parâmetros de Juros e SELIC`.
- Cartões de status ampliados para ocupar o espaço disponível ao lado dos botões.
- Layout responsivo com empilhamento do botão e do status em telas menores.
- Informações principais mantidas em fonte normal e intervalos exibidos em fonte menor.
- Juros e SELIC mantidos em blocos visuais separados.
- Status restaurados com a mesma apresentação após importação do caso ou criação de novo caso.

### Compatibilidade

Continuam aceitos:

```text
.json
.corr
.jur
.contadjus
```

O reconhecimento permanece baseado no conteúdo interno, e não apenas na extensão.

### Segurança

- Dados provenientes dos arquivos são renderizados com `document.createElement()` e `textContent`.
- Nenhum nome, descrição, índice ou período importado é executado como HTML.

### Homologação

- Exportação de `CORRE-PREVID-2026.corr` aprovada.
- Exportação de `JUROS-PACOTE-JUROS-05-AM.jur` aprovada.
- Exportação de `DADOS-JOAO-DA-SILVA-001234.contadjus` aprovada.
- Sanitização de `Maria d'Ávila Neto` para `MARIA-D-AVILA-NETO` aprovada.
- Importação de `.corr`, `.jur` e `.contadjus` aprovada.
- Compatibilidade com arquivos antigos `.json` aprovada.
- Cartões ampliados e responsivos aprovados.
- Intervalos dos encadeamentos aprovados.
- Restauração dos parâmetros pelo caso completo aprovada.
- Todos os testes de aceitação passaram.

---

## [3.5-alpha] Fase 1.8F-B3: corte temporal pela data da conta

**Data:** 06/08/2026  
**Status:** Homologada

### Adicionado

- Corte temporal da memória da Guia 5 pela Data de Atualização.
- Contagem informativa das parcelas posteriores desconsideradas.
- Tratamento controlado para competência inválida durante a filtragem.
- Tratamento do caso em que nenhuma parcela é igual ou anterior à data da conta.

### Alterado

Somente parcelas com:

```text
competência <= Data de Atualização
```

passam a integrar:

- `window.resultadosAtualizacao.itens`;
- Total original;
- Total corrigido;
- Total dos Juros de Mora;
- memória renderizada na Guia 5.

As diferenças importadas permanecem integralmente preservadas em:

```javascript
window.diferencasAtualizacaoAtual
```

### Homologação

Cenário testado:

```text
Diferenças importadas: 418
Itens calculados:      358
Parcelas excluídas:     60
```

Foi confirmado que nenhum item calculado possuía competência posterior à Data de Atualização.

O tratamento atual do 13º foi preservado:

```text
13º/AAAA = competência 12/AAAA
```

Todos os testes de aceitação passaram.

---

## [3.5-alpha] Fase 1.8F-B2: exibição auditável dos juros

**Data:** 06/08/2026  
**Status:** Homologada

### Adicionado

Quatro colunas na memória da Guia 5:

1. `% Juros antes da SELIC`;
2. `Taxa Legal`;
3. `% Juros até a atualização`;
4. `Juros de Mora (R$)`.

Adicionado ao resumo:

```text
Total dos Juros de Mora
```

### Alterado

- Percentuais exibidos com quatro casas decimais.
- Valores monetários exibidos com duas casas decimais.
- Precisão interna preservada.
- Taxa Legal exibida como `-` enquanto o motor correspondente não estiver implementado.
- Tabela mantida em contêiner com rolagem horizontal.

### Homologação

- Percentuais visuais coincidiram com os resultados internos.
- Valores dos juros por parcela coincidiram com a incidência sobre o valor corrigido.
- Total registrado coincidiu com a soma de `item.valorJuros`.
- Total visual coincidiu com o total interno arredondado para centavos.
- Correção monetária isolada permaneceu funcional.
- Todos os testes de aceitação passaram.

---

## [3.5-alpha] Fase 1.8F-B1: motor de juros determinísticos

**Data:** 06/08/2026  
**Status:** Homologada

### Adicionado

Motor interno dos critérios:

```text
SEM_JUROS
JUROS_05_AM
JUROS_1_AM
JUROS_2_AA_EC136
```

Novos campos por parcela:

```javascript
inicioJurosEfetivoISO
inicioJurosEfetivo
fimJurosISO
criteriosJuros
quantidadeMesesJuros
percentualJurosAntesSelic
percentualTaxaLegal
percentualJurosTotal
valorJuros
detalhamentoJuros
```

Novo total global:

```javascript
window.resultadosAtualizacao.totalJuros
```

### Regras homologadas

- Juros simples.
- Incidência sobre o valor corrigido.
- Exclusão do mês inicial.
- Inclusão do mês da conta.
- Início efetivo pelo maior valor entre a competência da parcela e o campo Início dos Juros.
- Repetição do percentual para parcelas anteriores ou iguais ao início da mora.
- Redução mensal para parcelas posteriores.
- Lacuna no encadeamento tratada como erro.
- `SEM_JUROS` tratado como período expresso com taxa zero.

### Taxas

```text
SEM_JUROS        = 0% ao mês
JUROS_05_AM      = 0,5% ao mês
JUROS_1_AM       = 1% ao mês
JUROS_2_AA_EC136 = 2% ao ano ÷ 12, linearmente
```

### Testes homologados

#### Juros de 0,5% ao mês

```text
12/2019 → 23 meses → 11,5%
01/2020 → 23 meses → 11,5%
02/2020 → 22 meses → 11,0%
03/2020 → 21 meses → 10,5%
10/2021 →  2 meses →  1,0%
11/2021 →  1 mês   →  0,5%
12/2021 →  0 meses →  0,0%
```

#### Juros de 1% ao mês

```text
12/2019 → 23 meses → 23%
01/2020 → 23 meses → 23%
02/2020 → 22 meses → 22%
03/2020 → 21 meses → 21%
10/2021 →  2 meses →  2%
11/2021 →  1 mês   →  1%
12/2021 →  0 meses →  0%
```

#### Juros de 2% ao ano

```text
12/2019 → 12 meses → 2,0000%
01/2020 → 12 meses → 2,0000%
02/2020 → 11 meses → 1,8333333333%
12/2020 →  1 mês   → 0,1666666667%
01/2021 →  0 meses → 0%
```

#### Sem juros

- Quantidade de meses preservada para auditoria.
- Percentual igual a zero.
- Valor dos juros igual a zero.
- `criteriosJuros` contendo `SEM_JUROS` quando houve percurso mensal.

Todos os testes de aceitação passaram.

---

## [3.5-alpha] Fase 1.8F-A2: pacote unificado de Juros e SELIC

**Data:** 05/08/2026  
**Status:** Homologada

### Adicionado

- Tipo administrativo principal `Juros e SELIC`.
- Tabela interna de Juros de Mora.
- Tabela interna de SELIC.
- Pacote único com blocos independentes `juros` e `selic`.
- Carregamento unificado na Guia 5.
- Status unificado `statusJurosSelic`.
- Metadados `nomePacote`, `descricaoPacote` e `dataCriacaoPacote` nos blocos internos.
- Validação estrutural dos períodos com `Array.isArray()`.
- Bloqueio do pacote totalmente vazio.

### Combinações permitidas

- somente Juros;
- somente SELIC;
- Juros e SELIC.

### Alterado

- Taxa Legal e Taxa Legal Previdenciária mantidas como índices de Juros de Mora.
- SELIC mantida como índice exclusivo da tabela SELIC.
- Parâmetros preservados separadamente em:

```javascript
window.parametrosCorrecaoAtual
window.parametrosJurosAtual
window.parametrosSelicAtual
```

- Persistência do caso preservada em:

```json
{
  "parametros": {
    "correcao": {},
    "juros": {},
    "selic": {}
  }
}
```

### Compatibilidade

Mantida importação dos formatos:

```text
parametros_atualizacao + correcao_monetaria
parametros_atualizacao + juros_mora
parametros_atualizacao + selic
parametros_juros_selic + juros_selic
```

### Homologação

- Pacote somente com Juros aprovado.
- Pacote somente com SELIC aprovado.
- Pacote com Juros e SELIC aprovado.
- Pacote vazio bloqueado.
- Carregamento unificado aprovado.
- Importação de formatos antigos aprovada.
- Correção monetária preservada.
- Todos os testes de aceitação passaram.

---

## [3.5-alpha] Fase 1.8F-A: infraestrutura de Juros e SELIC

**Data:** 05/08/2026  
**Status:** Homologada

### Adicionado

- Arquivo `data/indexadores-juros.js`.
- Catálogo `window.CATALOGO_INDEXADORES_JUROS`.
- Base `window.BASE_INDEXADORES_JUROS`.
- Critérios determinísticos, históricos e mistos.
- Estrutura inicial de carregamento e persistência dos parâmetros.

### Critérios cadastrados

```text
SEM_JUROS
JUROS_05_AM
JUROS_1_AM
JUROS_2_AA_EC136
JUROS_POUPANCA
TAXA_LEGAL
TAXA_LEGAL_PREVIDENCIARIA
SELIC
```

### Observação

Nesta fase foi criada a infraestrutura. Os cálculos foram implementados gradualmente nas fases posteriores.

---

## [3.5-alpha] Fase 1.8E: motor de correção monetária e plataforma ContadJus

**Período:** 02/08/2026 a 04/08/2026  
**Status:** Homologada para os cenários operacionais testados

### Plataforma ContadJus

#### Adicionado

- domínio oficial `contadjus.com.br`;
- hospedagem no GitHub Pages;
- autenticação por Supabase Auth;
- login, logout, persistência de sessão e recuperação de senha;
- arquivos `js/auth.js`, `js/supabase.js` e `css/auth.css`;
- namespace global `CONTADJUS`.

#### Preservado

- processamento dos cálculos no navegador;
- independência entre autenticação e motores matemáticos;
- motor previdenciário e regras existentes.

### Motor de correção monetária

#### Adicionado

- primeira versão funcional do motor genérico da Guia 5;
- leitura de encadeamentos de correção;
- acumulação de fatores mensais;
- índice operacional UFIR;
- índice histórico `UFIR_NOMINAL` para auditoria;
- índice especial opcional `IPCAE_CJF_2000` para transição;
- suporte a diferentes encadeamentos sem alteração do motor.

#### Homologação

- coeficientes a partir de 07/1994 compatíveis com os sistemas de referência utilizados;
- resultados finais compatíveis com ProjefWeb e Fábrica de Cálculos nos cenários testados;
- encadeamentos configurados conforme diferentes manuais reproduzidos pelo mesmo motor genérico;
- diferenças residuais limitadas a precisão, arredondamento ou truncamento, sem divergência material nos resultados finais testados.

### Pendência histórica

O intervalo entre `01/1992` e `06/1994` permanece registrado para validação histórica complementar da UFIR.

> Encadeamentos configurados segundo diferentes edições de manuais não são motores separados. Todos são interpretados pelo mesmo motor genérico de correção monetária.

---

## [3.4-alpha] Fase 1.8D: espelho das diferenças na Guia 5

**Data:** 30/07/2026  
**Status:** Homologada

### Adicionado

- seção Diferenças da Guia 4 na Guia 5;
- botão Importar Diferenças da Guia 4;
- `window.diferencasAtualizacaoAtual`;
- tabela inicial de Competência e Diferença Original;
- reset automático após alterações nas Guias 1, 3 ou 4.

### Preservado

- parâmetros carregados na Guia 5;
- lógica da Guia 4;
- motor previdenciário;
- estrutura do caso.

---

## [3.4-alpha] Fase 1.8C: integração administrativa com a base de indexadores

**Data:** 30/07/2026  
**Status:** Homologada

### Adicionado

- consulta dinâmica ao catálogo de indexadores;
- filtro por tipo de parâmetro;
- preservação auditável de índices inexistentes ou incompatíveis em arquivos antigos;
- nomes amigáveis e códigos técnicos nos seletores.

### Corrigido

- substituição silenciosa de índice importado;
- incompatibilidades entre correção e juros;
- erro de sintaxe após ajuste da importação;
- abertura do modal administrativo.

---

## [3.4-alpha] Fase 1.8B: base de indexadores de atualização

**Data:** 29/07/2026  
**Status:** Homologada estruturalmente

### Adicionado

- `data/indexadores.js`;
- `window.BASE_INDEXADORES_ATUALIZACAO`;
- `window.CATALOGO_INDEXADORES_ATUALIZACAO`;
- `window.INDEXADORES_ATUALIZACAO`;
- dados iniciais de INPC, IPCA-E e IPCA;
- estrutura preparada para expansão dos demais índices.

---

## [3.4-alpha] Fase 1.8A: infraestrutura de parâmetros da Guia 5

**Data:** 29/07/2026  
**Status:** Homologada

### Adicionado

- infraestrutura inicial da Guia 5;
- modal administrativo aberto por `Ctrl + Shift + E`;
- criação, validação, importação e exportação de encadeamentos;
- variáveis globais de correção, Juros e SELIC;
- sincronização das datas entre as Guias 1 e 5;
- validação de sobreposição e período aberto.

---

## [3.3] Fase 1.7D2: abono anual e ano final aberto

**Data:** 28/07/2026  
**Status:** Homologada

### Adicionado

- linhas `13º/AAAA` na Guia 4;
- cálculo de avos pela regra dos 15 dias;
- suporte ao primeiro 13º;
- suporte a benefícios baseados em salário mínimo;
- opção de 13º proporcional no ano final aberto;
- persistência da nova opção no caso;
- cálculo individualizado do 13º devido e recebido.

### Corrigido

- base do primeiro 13º em memórias resumidas;
- tratamento do ano final aberto;
- DCB de benefícios recebidos;
- uso indevido da DIP como DCB;
- restauração das competências de 13º;
- recursão em relatórios;
- compatibilidade visual entre navegadores.

---

## Funcionalidades pendentes

Os seguintes motores ainda não estão implementados:

```text
JUROS_POUPANCA
TAXA_LEGAL
TAXA_LEGAL_PREVIDENCIARIA
SELIC
```

Também permanecem pendentes:

- não cumulação entre juros e SELIC;
- valor e total da SELIC;
- total geral da condenação;
- integração completa da atualização aos relatórios;
- implementação matemática da Guia 6;
- parâmetros avançados de exibição das tabelas.

---

## Política de compatibilidade

O projeto preserva, sempre que possível:

- casos nas versões 3.1, 3.2 e 3.3;
- encadeamentos administrativos antigos em `.json`;
- justificativas antigas armazenadas como texto;
- campos novos com valores padrão em casos antigos;
- separação entre parâmetros de Correção, Juros e SELIC;
- cálculos já homologados durante a evolução das fases.

## B24 — MC-ACOES-GERAL-2022 após teste
- IPCAE: 01/2001–11/2021; SEM_CORRECAO a partir de 12/2021.
- Juros: 01/2003–06/2009 = JUROS_05_AM.
- Removida SELIC de 01/2003–06/2009; mantida no bloco SELIC a partir de 12/2021.

## B28 — Correção da competência da Taxa Legal

- Corrigido o deslocamento indevido da `TAXA_LEGAL` e da `TAXA_LEGAL_PREVIDENCIARIA` para o mês seguinte.
- A taxa passa a ser consultada diretamente na competência da parcela.
- A vigência da base permanece dinâmica e aberta: a data de atualização limita o período do cálculo, mas não desloca a competência da taxa.
- Exemplo de validação: 07/2026 utiliza a taxa de 07/2026; 08/2026 utiliza a taxa de 08/2026.
- Não foram alterados os encadeamentos homologados.

## B33 — Simplificação da Guia 1
- Removido o bloco "Fonte dos Índices de Reajuste" da Guia de Entradas.
- Removido o seletor de comportamento para competência final; a data de atualização volta a ser sempre o termo final informado pelo usuário.
- Removido o botão "Limpar" inferior, mantendo o botão "Novo caso / Limpar" do bloco Ações do Caso.
- Mantido o botão azul "Calcular Evolução" para atualização explícita da Guia 2 após carregamento/alteração de dados.
- Quando a última competência não possuir índice de correção disponível, a competência permanece no cálculo com coeficiente neutro, quando aplicável, em vez de ser automaticamente excluída.


## B34 — Campos de entrada manual da Guia 1 com fundo branco
- Padronizados inputs, selects e textareas editáveis da Guia 1 com fundo branco.
- Campos `readonly`/automáticos permanecem com a aparência diferenciada.
- Checkboxes, radios, arquivos e campos ocultos não foram afetados.

## B49 — Guia 6: atualização do valor renunciado
- Atualização da renúncia até a mesma data/critério da Guia 5 e abatimento no total atualizado.

## B52 — 24/08/2026
- Nova Guia 7: Requisitório; Relatórios passa a Guia 8.
## B58 — Guia 6: Acordo sem sobrescrita e rótulo dinâmico
- Controles do acordo deixam de disparar o recálculo global, evitando que o resultado apareça e seja zerado em seguida.
- O acordo é recalculado sobre os componentes já apurados em "Total após renúncia".
- O rótulo passa a informar o percentual aplicado, por exemplo: "Total após acordo no percentual de 95%".


## B59 — Guia 7 / Requisitório — simplificação visual
- Removido o bloco superior de quatro cartões da seção de honorários contratuais.
- A tabela permanece como a fonte principal de apresentação dos valores e percentuais.
- Mantida a estrutura funcional dos elementos necessários ao cálculo.

## B60 — Guia 7 / Requisitório — regras de RPV, Precatório e honorários
- Reestruturada a Guia 7 para apuração automática de RPV com limite de 60 salários mínimos na data-base da Guia 5.
- A data-base do requisitório passa a ser carregada automaticamente de `window.resultadosAtualizacao.dataAtualizacao`.
- Quando a base supera 60 salários mínimos, a Guia 7 apresenta RPV limitada ao teto e Precatório pelo valor integral da base.
- NME passou a representar quantidade de parcelas: anteriores ao ano-base e no ano-base; para Precatório, o NME atual é zero.
- Honorários contratuais passaram a usar controle Sim/Não, bloco recolhível e faixas iniciais de 0%, 10%, 20% e 30%, editáveis, removíveis e ampliáveis.
- Honorários de sucumbência passaram a usar controle Sim/Não e bloco recolhível, com bases Valor da causa, Valor da condenação e Até a sentença.
- A base "Até a sentença" aceita `MM/AAAA` ou `DD/MM/AAAA` e calcula a composição pelas parcelas até a competência informada.
- Majoração da sucumbência mantém as modalidades aditiva e multiplicativa.
- A sucumbência passou a ser discriminada em Principal, Juros, SELIC e Total na composição final.
- Removida a duplicidade de `id` existente na estrutura anterior da Guia 7.


# CHANGELOG_B07.md

# Changelog — B07

- Corrigida SELIC indevida na competência do ajuizamento nas vencidas.
- Corrigida proporcionalidade da competência do ajuizamento na memória das vencidas.
- Corrigida origem da parcela-base das vincendas: valor integral da evolução, sem SELIC.
- Eliminada dupla aplicação da proporcionalidade.
- Mantida a regra de 13º incorporado a dezembro no método Até 12.


# CHANGELOG_B31.md

# B31 — 21/08/2026

- Adicionado em Entradas o parâmetro **Até qual competência calcular?**.
- Opção padrão: **Última competência com índices disponíveis**.
- Opção alternativa: **Até a data de atualização**.
- B30 deixou de ser uma regra obrigatória do motor e passou a ser o comportamento padrão selecionável.
- Critério salvo/carregado no JSON.
- Nenhuma data específica foi fixada no código.


# CHANGELOG_B32.md

# B32 — Comportamento diante de índice indisponível + INPC 07/2026

- Removido da seção Datas Processuais o seletor que parecia definir o termo final.
- Adicionado em Fonte dos Índices o parâmetro **Quando faltar índice para a competência final**:
  - Usar a última competência disponível (padrão);
  - Informar indisponibilidade e não calcular.
- A data de atualização permanece como a data final solicitada pelo usuário.
- Mantida compatibilidade de importação com o parâmetro legado `criterioCompetenciaFinal`.
- Atualizado `INPC 07/2026` em `data/indexadores.js` para `0.9999`.


# CHANGELOG_B35.md

# B35 — Identidade visual no cabeçalho

- Adicionada versão horizontal da marca ContadJus no cabeçalho principal.
- Mantido o fundo azul e a altura geral do cabeçalho.
- Marca adaptada para contraste em fundo azul, com símbolo e identificação "ContadJus / Liquidação de Sentenças".
- Título do módulo e subtítulo preservados.
- Adicionado divisor vertical em telas médias/grandes.
- Layout responsivo mantido para telas menores.
- Nenhuma lógica de cálculo foi alterada nesta versão.


# CHANGELOG_B36.md

# B36 — Identidade visual na tela de login

- Substituída a identificação textual CONTADJUS pela logo completa ContadJus.
- Incluída a versão completa da marca em `assets/contadjus-login.png`.
- Mantido o texto "Plataforma de Cálculos Judiciais" abaixo da marca.
- Ajustado o CSS para preservar proporção e responsividade da logo.
- Nenhuma lógica de cálculo ou regra funcional foi alterada.


# CHANGELOG_B37.md

# B37 — Ajuste visual da logo no cabeçalho

- Substituída a versão anterior da logo horizontal por uma composição horizontal com:
  - símbolo ContadJus em azul/turquesa;
  - “Contad” em branco para alto contraste;
  - “Jus” preservando o tom turquesa da identidade;
  - “Liquidação de Sentenças” em tom claro;
- Altura da logo no cabeçalho ajustada de `h-12` para `h-14`.
- Divisor vertical ajustado para acompanhar a nova altura.
- Nenhuma lógica de cálculo foi alterada.


# CHANGELOG_B39.md


## B40 — Corte da Taxa Legal na competência da atualização

- Corrigida a aplicação da `TAXA_LEGAL` para não incluir a taxa da própria competência da Data de Atualização.
- A conta continua incluindo a competência final informada; apenas a Taxa Legal é encerrada na competência anterior.
- A regra é dinâmica: atualização 08/2026 → Taxa Legal até 07/2026; atualização 09/2026 → até 08/2026.
- SELIC e os demais critérios de juros não foram alterados.
- `admin-encadeamentos.js` validado com `node --check`.

# B39 — Presets por ano com diferenciação visual

## Alteração
- A lista de presets da Guia 5 foi organizada visualmente em grupos **2026** e **2022**.
- Presets de 2026 recebem identificação visual em azul suave.
- Presets de 2022 recebem identificação visual em amarelo suave.
- O preset selecionado também recebe uma tonalidade discreta correspondente.

## Segurança do motor
- Nenhum `value` de preset foi alterado.
- Nenhum objeto de encadeamento foi alterado.
- Nenhuma regra de correção, juros ou SELIC foi alterada.
- O listener existente continua chamando `carregarEncadeamentoOficial(this.value)` com exatamente o mesmo valor de antes.
- A alteração é exclusivamente de apresentação/organização da lista.


# CHANGELOG_B41.md

# B41 — Evolução por vigência mensal do salário mínimo

## Correção
A Guia 2 passa a registrar alterações intraperíodo do salário mínimo quando a base `VIGENCIAS` possuir mais de uma vigência dentro do intervalo entre dois reajustes previdenciários.

### Exemplo validado
- 01/2023: R$ 1.302,00
- 05/2023: R$ 1.320,00

Quando o benefício estiver sujeito ao piso, a memória da Guia 2 passa a registrar 05/2023 e as Guias 4/5 passam a consultar o valor correto a partir dessa competência.

## Regras preservadas
- A base `VIGENCIAS` não foi alterada.
- Os reajustes previdenciários de `BASE_INTERNA` não foram alterados.
- Nenhum novo índice previdenciário é criado.
- Alterações de teto sem alteração do salário mínimo não geram linha adicional de piso.
- Uma eventual redução do salário mínimo não reduz o benefício já calculado.
- Benefícios acima do piso não recebem linhas desnecessárias quando a alteração do salário mínimo não os afeta.


# CHANGELOG_B42.md

# B42 — Correção definitiva do corte da Taxa Legal no fluxo pós-SELIC

## Problema
A B40 havia corrigido o corte da Taxa Legal em `guia5CalcularJurosDeterministicos`, mas o MC-ACOES-GERAL-2026 possui um fluxo diferente: após o período da SELIC, o motor utiliza `guia5CalcularJurosIntervalo`. Esse caminho ainda percorria a competência da própria data de atualização e aplicava a Taxa Legal do mês corrente.

## Correção
`guia5CalcularJurosIntervalo` agora recebe a `dataAtualizacaoISO` e interrompe o intervalo quando encontra a competência da própria atualização e o índice do período é `TAXA_LEGAL` ou `TAXA_LEGAL_PREVIDENCIARIA`.

## Regra
- Atualização 08/2026: Taxa Legal até 07/2026.
- 08/2026 permanece na tabela.
- 08/2026 não recebe a Taxa Legal de 08/2026.
- SELIC não foi alterada.
- Demais juros não foram alterados.

## Causa da reincidência
A mesma regra existia em dois caminhos de cálculo. A correção anterior atingiu somente o caminho determinístico; o caminho pós-SELIC permaneceu com a regra antiga.


# CHANGELOG_B44.md

# B44 — Guia 3: evolução dos benefícios recebidos + cópia do benefício devido

## Correções

- Corrigido o consumo da memória pela Guia 4: competências anteriores ao primeiro reajuste agora usam a **RMI do benefício recebido**, e não o RMA final.
- O último valor evoluído passa a ser utilizado somente a partir da competência do respectivo marco de reajuste.
- Mantida a assinatura de `obterValorIntegral(..., rmaFinal)` por compatibilidade com os chamadores existentes.

## Melhoria

Na Guia 3 foi incluído o botão **“Usar dados do benefício devido”** em cada bloco de benefício recebido. Ele copia, do benefício devido:

- NB;
- Espécie;
- Tipo;
- Baseado em salário mínimo;
- DIB;
- DIP;
- Direito ao 13º;
- Benefício transformado;
- DIB antecedente, quando aplicável;
- Percentual de desdobramento/cota;
- Adicional;
- Percentual do adicional.

### Não copia

- **RMI** — permanece independente e deve ser informada no benefício recebido;
- DCB;
- Identificador;
- Tratamento da DIP;
- Observações.

Ao copiar os dados, o cálculo anterior do benefício recebido é invalidado para impedir que a Guia 4 consuma uma memória desatualizada.

## Base

B44 foi construída sobre a B43, preservando as alterações anteriores.


# CHANGELOG_B45.md

# CONTADJUS — B45

## Guia 3 → Guia 4: recálculo automático dos benefícios recebidos

### Problema corrigido
Após o preenchimento das Guias 1 e 3, a Guia 4 podia permanecer com os valores da RMI dos benefícios recebido/devido durante todo o período até que o usuário clicasse manualmente em **Calcular Evolução**.

Isso criava risco de o usuário esquecer o cálculo individual da Guia 3 e alimentar a Guia 4 com uma evolução desatualizada.

### Alterações
- O recálculo global agora executa, nesta ordem:
  1. evolução do benefício devido;
  2. evolução de todos os benefícios recebidos completos;
  3. montagem da Guia 4;
  4. atualização das guias posteriores, quando aplicável.
- Campos relevantes dos benefícios recebidos passaram a disparar o recálculo global automaticamente.
- Durante o recálculo automático, cadastros ainda incompletos são ignorados silenciosamente até ficarem aptos ao cálculo.
- O botão manual **Calcular Evolução** da Guia 3 continua funcionando.
- O botão **Calcular Todos** continua funcionando e continua sendo manual.
- O botão **Usar dados do benefício devido** também dispara o encadeamento automático.
- Benefícios restaurados por JSON passam a solicitar o recálculo automático das guias dependentes.
- A RMI do benefício recebido permanece independente da RMI do benefício devido.

### Regra preservada
O valor recebido é evoluído por competência. Exemplo:

- 01/2007 a 03/2007 → RMI recebida;
- a partir de 04/2007 → valor após o reajuste de 04/2007.

O valor final não é retroativamente aplicado às competências anteriores.

### Escopo
Nenhuma alteração no motor previdenciário da Guia 2, nos encadeamentos de SELIC/Taxa Legal ou na lógica da Guia 4 de cálculo da diferença.


# CHANGELOG_B46.md

# CONTADJUS — B46

## Guia 4 — edição individual dos benefícios recebidos

### Correções
- Preservada a B45 como base.
- Corrigida a comparação entre valor calculado e valor digitado na célula de Benefício Recebido.
- A edição manual passa a ser registrada em `dadosDiferencas.celulasEditadas`.
- A célula recebe a indicação visual de edição.
- Ao sair do campo, o valor é normalizado para o padrão numérico da tabela (ex.: `1250` → `1.250,00`).
- A diferença da linha e o resumo geral são recalculados após a edição.
- Mantida a evolução automática Guia 1 → Guia 2 e Guia 3 → Guia 4.

### Regra
A edição manual altera somente aquela competência/benefício. As demais competências continuam utilizando os valores evoluídos automaticamente.


# CHANGELOG_B47.md

# CONTADJUS — B47

## Guia 4 — edição individual dos benefícios recebidos

### Correções
- Preservada a B46/B45 como base funcional.
- Corrigida a comparação entre o valor calculado e o valor digitado na célula de Benefício Recebido.
- A edição manual passa a ser registrada corretamente em `dadosDiferencas.celulasEditadas`.
- A célula passa a receber a indicação visual de edição.
- Ao sair do campo, o valor é normalizado para o padrão da tabela (ex.: `1250` → `1.250,00`).
- A diferença da linha e o resumo geral são recalculados após a edição.
- Mantida a evolução automática Guia 1 → Guia 2 e Guia 3 → Guia 4.

### Regra
A edição manual altera somente aquela competência/benefício. As demais competências continuam utilizando os valores evoluídos automaticamente.


# CHANGELOG_B48.md

# CONTADJUS — B48

## Guia 6 — Renúncia: data-base e rastreabilidade da SELIC

### Correções

- A atualização das parcelas vencidas na Guia 6 passa a utilizar como **data-base dos índices o mês anterior ao mês do ajuizamento**.
- Exemplo: ajuizamento em `01/2024` → data-base da atualização das vencidas = `12/2023`.
- A Guia 6 continua reutilizando os mesmos critérios e encadeamentos definidos na Guia 5; a diferença é somente a data-base específica da renúncia.
- A SELIC deixa de receber silenciosamente a taxa da competência do ajuizamento nas parcelas anteriores.
- A memória da Guia 6 passa a exibir a coluna **% SELIC**, com o percentual acumulado efetivamente utilizado em cada competência.
- A coluna monetária passa a ser identificada como **SELIC (valor)**.
- A memória exibe uma nota explícita com a data-base adotada para a atualização das vencidas.

### Exemplo de auditoria

Com ajuizamento em `01/2024`:

- `11/2023`: SELIC acumulada até `12/2023` = `1,81%`;
- `12/2023`: SELIC = `0,89%`;
- `01/2024`: permanece na tabela, mas não recebe SELIC nem contamina as parcelas anteriores.

## Controle de versão

- Pacote: `CONTADJUS-GUIA6-FASE-1.9A-B48`
- Pasta interna: `contadjus-b48`
- Base: B47 FIX


# CHANGELOG_B49.md

# CONTADJUS — B49

## Guia 6 — Renúncia: atualização do valor renunciado

- A renúncia agora parte do valor da demanda no ajuizamento e do limite do Juizado calculado com o salário mínimo da competência do ajuizamento.
- O valor renunciado no ajuizamento é atualizado até a mesma Data de Atualização utilizada na Guia 5.
- A atualização utiliza os mesmos motores/encadeamentos da Guia 5 para correção monetária, juros e SELIC.
- A Guia 6 passa a exibir a memória rastreável do valor renunciado: competência-base, valor, coeficiente, principal corrigido, % de juros, juros, % SELIC, SELIC e total.
- Foi acrescentado o abatimento do valor renunciado atualizado sobre o total atualizado da Guia 5.
- A conta passa a apresentar: total atualizado da Guia 5, valor renunciado atualizado e total atualizado após a renúncia.
- A lógica existente da Guia 5 não foi alterada.


# CHANGELOG_B50.md

# CONTADJUS — B49

## Guia 6 — Renúncia: atualização do valor renunciado

- A renúncia agora parte do valor da demanda no ajuizamento e do limite do Juizado calculado com o salário mínimo da competência do ajuizamento.
- O valor renunciado no ajuizamento é atualizado até a mesma Data de Atualização utilizada na Guia 5.
- A atualização utiliza os mesmos motores/encadeamentos da Guia 5 para correção monetária, juros e SELIC.
- A Guia 6 passa a exibir a memória rastreável do valor renunciado: competência-base, valor, coeficiente, principal corrigido, % de juros, juros, % SELIC, SELIC e total.
- Foi acrescentado o abatimento do valor renunciado atualizado sobre o total atualizado da Guia 5.
- A conta passa a apresentar: total atualizado da Guia 5, valor renunciado atualizado e total atualizado após a renúncia.
- A lógica existente da Guia 5 não foi alterada.

# B50 — Sincronização automática após edição da Guia 4

- Edição manual de **Benefício Devido** na Guia 4 agora agenda o recálculo global automaticamente após o `blur`.
- Edição manual de **Benefício Recebido** também agenda o recálculo global automaticamente após o `blur`.
- Fluxo automático: **Guia 4 → importar diferenças → Guia 5 → formação da demanda/renúncia da Guia 6**.
- A edição continua preservada em `dadosDiferencas.celulasEditadas` e o recálculo ocorre somente após a conclusão da edição, evitando perda de foco/cursor.
- Não foi alterado o motor de correção monetária, juros, SELIC ou renúncia; foi corrigida apenas a sincronização dos dados alterados.


# CHANGELOG_B51.md

# CONTADJUS – B51

## Guia 6 – Renúncia / Formação da Demanda

- Compactado o bloco de limitação/renúncia em uma única linha responsiva com quatro itens principais.
- Removido o conjunto de cards redundantes da atualização do valor renunciado.
- Mantida a tabela de memória como elemento principal e rastreável, com base, coeficiente, principal, % juros, juros, % SELIC, SELIC e total.
- Criada demonstração final por componentes: Guia 5 (principal/juros/SELIC/total), menos renúncia atualizada (principal/juros/SELIC/total), resultando no total após renúncia.
- A subtração final é feita componente a componente e o total é a soma dos componentes remanescentes.
- Preservada a lógica dos motores e dos encadeamentos da Guia 5.


# CHANGELOG_B52.md

# ContadJus — B52

## Nova Guia 7 — Requisitório

- Inserida nova guia **7. Requisitório**.
- Guia de Relatórios passou a ser **8. Relatórios**.
- Estrutura inicial para **Precatório/RPV**, com o detalhamento específico de RPV reservado para a próxima etapa.
- Para Precatório, a base do requisitório observa o **valor final após a renúncia da Guia 6**.
- Campo para percentual de **honorários contratuais** e cálculo do valor destacado.
- Cálculo do **valor da parte autora** após o destaque dos honorários contratuais.
- Campo informativo para parcelas anteriores ao ano-base.
- Bloco recolhível de **honorários de sucumbência**.
- Se sucumbência = Sim, são habilitados:
  - critério da base (até data informada / Súmula 111 ou até data-base / total da condenação);
  - data para cálculo;
  - percentual de sucumbência;
  - majoração;
  - percentual da majoração;
  - forma aditiva ou multiplicativa.
- Composição final apresentada por **Principal, Juros, SELIC e Total**, acompanhando o resultado da Guia 6.
- Dados da nova guia incluídos no JSON de exportação/importação.
- A nova guia não altera o motor das Guias 5 e 6.

## Observação

O tratamento específico da RPV será implementado após a definição das regras pelo usuário.


# CHANGELOG_B53.md

# CONTADJUS — B53

## Guia 7 — Requisitório

- Honorários contratuais agora são apresentados em linhas padrão de 0%, 10%, 20% e 30%.
- Percentuais podem ser editados, excluídos e adicionados.
- É possível desativar o cálculo de honorários contratuais.
- Percentual considerado para o valor da parte autora pode ser selecionado entre as linhas cadastradas.
- Para Precatório, NME atual permanece zerado; NME anterior acompanha o valor da parte autora.
- Honorários de sucumbência podem utilizar o valor da causa como base.
- Guia 1 recebeu os campos Valor da causa e Vara de origem.
- Dados novos incluídos na exportação/importação JSON.
- RPV permanece sem regra específica nesta etapa.


# CHANGELOG_B54.md

# B54 — Ajuste do bloco de Acordo e base do Requisitório

- O percentual do acordo passa a incidir sobre cada componente do **Total após renúncia**: Principal, Juros e SELIC.
- Criado o **Total após acordo**, discriminado por componente e total.
- O **Total após acordo** passa a ser a base da Guia 7 — Requisitório quando o acordo estiver ativo.
- Removido o bloco destacado de “Conta Final” da Guia 6.
- O bloco de Acordo ficou mais discreto.
- O campo “Percentual personalizado” só aparece quando o acordo está ativo e a opção Personalizado é selecionada.
- Removidos da interface os cards “Percentual aplicado” e “Valor do acordo”, substituídos pela linha de composição “Total após acordo”.
- Mantida a lógica das Guias 5 e 6 sem alteração no motor de atualização.


## B55
- Corrigida a sincronização do bloco Acordo na Guia 6. Alterações em Aplicar?, percentual preset ou percentual personalizado agora recalculam imediatamente a Formação da Demanda e a linha Total após acordo, incidindo sobre os componentes do Total após renúncia.

### B56 — Correção do cálculo imediato do acordo
- Corrigido o recálculo do bloco **Acordo** da Guia 6.
- Alterar "Aplicar acordo?", percentual ou percentual personalizado agora recalcula imediatamente a linha **Total após acordo**.
- O cálculo usa diretamente os componentes já apurados em **Total após renúncia** (Principal, Juros e SELIC), evitando corrida com o recálculo global.
- O valor atualizado é sincronizado com o módulo de requisitório.


# CHANGELOG_B57.md

# ContadJus — B57

## Guia 6 — Renúncia / Acordo

### Correção
Corrigido o recálculo imediato do acordo. Ao selecionar **Acordo = Sim** e um percentual (ex.: 95%), a interface podia executar o cálculo antes de os componentes de **Total após renúncia** estarem disponíveis, gravando temporariamente `R$ 0,00`.

### Comportamento ajustado
- Recalcula a base da renúncia antes de aplicar o acordo quando necessário.
- Usa os componentes discriminados da Guia 5/renúncia como base do acordo.
- Mantém Principal, Juros, SELIC e Total após acordo consistentes.
- Evita sobrescrever um acordo válido com zeros durante a transição entre eventos síncronos e o recálculo automático.

### Teste previsto
Com **Acordo = Sim** e **95%**, o sistema deve aplicar 95% sobre cada componente do **Total após renúncia**, sem zerar os valores.


# CHANGELOG_B60.md

# CONTADJUS — B60

## Guia 7 — Requisitório

### RPV / Precatório
- A data-base é sincronizada automaticamente com a data de atualização da Guia 5.
- O salário mínimo é localizado na vigência correspondente à data-base.
- O limite de RPV é calculado como 60 salários mínimos.
- A RPV é sempre apurada.
- Quando a base excede o limite, o sistema apresenta também o Precatório pelo valor integral e informa o excedente da RPV.

### NME
- O NME passou a ser calculado por quantidade de parcelas.
- Para RPV: parcelas anteriores ao ano-base e parcelas do ano-base.
- Para Precatório: todas as parcelas ficam no NME anterior e o NME atual é zero.

### Honorários contratuais
- Controle padrão: Sim.
- Bloco recolhível.
- Faixas iniciais: 0%, 10%, 20% e 30%.
- Percentuais editáveis, removíveis e ampliáveis.
- Cada faixa discrimina Principal, Juros, SELIC, total dos honorários e composição da parte autora.

### Honorários de sucumbência
- Controle padrão: Não.
- Bloco recolhível.
- Bases: Valor da causa, Valor da condenação e Até a sentença.
- A data é exigida somente para o critério Até a sentença.
- Aceita MM/AAAA ou DD/MM/AAAA.
- Majoração aditiva ou multiplicativa.
- Resultado discriminado em Principal, Juros, SELIC e Total.

### Preservação
- Mantida a base da Guia 6: Total após renúncia ou Total após acordo quando o acordo estiver ativo.
- Guias 1–6 e motores de atualização não foram alterados nesta fase.


# CHANGELOG_B61.md

# CHANGELOG — B61 — Guia 7 Requisitório

## Correções desta versão

- Removido o conceito de **enquadramento automático** RPV/Precatório. A modalidade permanece selecionável pelo usuário.
- Mantido o padrão **RPV / Precatório** no campo de modalidade.
- Base do requisitório passa a ser demonstrada por **Principal, Juros, SELIC e Total**.
- O quadro verde de enquadramento foi reduzido e passou a apresentar apenas os parâmetros essenciais: salário mínimo e limite de 60 salários mínimos, além da disponibilidade das modalidades.
- Criado bloco específico de **Cálculo — RPV**, com Principal, Juros, SELIC e Total da RPV.
- Criado bloco específico de **Cálculo — Precatório**, exibido somente quando a base supera 60 salários mínimos.
- Quando a base supera o teto, os componentes da RPV são distribuídos proporcionalmente ao limite de 60 salários mínimos, garantindo que Principal + Juros + SELIC = Total RPV.
- NME atual aparece somente no cálculo da RPV.
- No Precatório, todas as parcelas são consideradas NME anterior e NME atual permanece zero.
- Honorários contratuais passaram a funcionar primeiro como **parâmetro**; a tabela detalhada de cálculo foi deslocada para os blocos de RPV/Precatório.
- Ao selecionar **Não** em honorários contratuais, o editor é fechado e os valores contratuais são zerados.
- Mantidas as faixas iniciais de 0%, 10%, 20% e 30%, com edição, exclusão e inclusão de novas faixas.
- Honorários de sucumbência continuam opcionais e são apresentados antes dos blocos finais de cálculo.
- Os blocos finais de cálculo permanecem recolhíveis.


# CHANGELOG_B63.md

# CONTADJUS — B63

## Guia 7 — Requisitório

- Honorários contratuais iniciam recolhidos/fechados.
- Bloco de honorários de sucumbência compactado em uma única linha de parâmetros.
- Aplicação da sucumbência passou para o cabeçalho, mantendo Sim/Não.
- Percentual de sucumbência assume 10,00% automaticamente quando a aplicação é ativada, permanecendo editável.
- "Calcular até" fica automático e bloqueado para Valor da causa e Valor da condenação, herdando a data-base da Guia 5; permanece editável para Até a sentença.
- Para Valor da causa, criada atualização automática do ajuizamento até a data-base, usando os mesmos motores de correção/juros/SELIC da Guia 5.
- Criado resumo compacto da atualização do valor da causa dentro da sucumbência.
- Enquadramento e informações da base do requisitório foram compactados, removendo a duplicidade do campo "Base do requisitório".
- Criado modal informativo sobre a proporcionalidade de Principal, Juros e SELIC na composição da RPV; conteúdo exclusivamente informativo e fora do relatório.


# CHANGELOG_B64.md

# ContadJus — Guia 7 — B64

## Ajustes

- Honorários contratuais: o controle **Aplicar — Sim/Não** foi movido para o cabeçalho do recolhível, seguindo o mesmo padrão visual dos honorários de sucumbência.
- Removido o controle duplicado de Sim/Não de dentro do conteúdo dos honorários contratuais.
- Mantido o recolhível de honorários contratuais fechado por padrão.
- Corrigido o enquadramento para apresentar **RPV: disponível** e **Precatório: disponível**, sem sugerir divisão do pagamento entre as duas modalidades.
- Corrigida duplicidade de marcação no campo de majoração da sucumbência encontrada no HTML da B63.

## Preservado

- Demais regras e cálculos da B63 foram mantidos sem alteração deliberada nesta fase.


# CHANGELOG_B65.md

# B65 — Ajustes de sucumbência e tabela de requisitório

- Removida a coluna `Sucumbência` das tabelas de cálculo de RPV e Precatório; a sucumbência permanece discriminada exclusivamente na linha final.
- Criado o parâmetro `Sucumbência da RPV` com as opções `Valor integral` e `Aplicar redutor da RPV`.
- Quando aplicado, o redutor da RPV usa o coeficiente `Total RPV / Total da base integral do requisitório` e aplica o mesmo fator separadamente sobre Principal, Juros e SELIC da sucumbência.
- A sucumbência do Precatório permanece integral.
- Mantida a composição discriminada em Principal, Juros, SELIC e Total.


# CHANGELOG_B66.md

# B66 — Correção do início efetivo da Taxa Legal após a SELIC

## Problema identificado

Na Guia 6 e em fluxos que reutilizam o mesmo motor para repercussões, quando o encadeamento possuía SELIC seguida de `TAXA_LEGAL` ou `TAXA_LEGAL_PREVIDENCIARIA`, o trecho posterior à SELIC começava sempre na primeira competência posterior à SELIC (`09/2025`).

Isso fazia com que, se o usuário informasse um **Início dos Juros posterior a 09/2025**, o sistema pudesse aplicar indevidamente competências anteriores ao início efetivo dos juros.

## Correção

O início do trecho de juros posterior à SELIC passa a ser:

> **maior entre a primeira competência posterior à SELIC e o Início dos Juros informado.**

Com a configuração atual, a primeira competência posterior à SELIC é `09/2025`, que também corresponde ao início da vigência da Taxa Legal e da Taxa Legal Previdenciária.

Assim:

- Início dos Juros anterior a `09/2025` → Taxa Legal começa em `09/2025`;
- Início dos Juros em `09/2025` → começa em `09/2025`;
- Início dos Juros posterior a `09/2025` → começa na competência informada.

A Data de Atualização continua limitando a Taxa Legal à competência anterior à atualização.

## Alcance

A correção foi aplicada aos fluxos que utilizam o trecho pós-SELIC:

- Guia 5 / motor de atualização;
- Guia 6 / atualização do valor renunciado;
- repercussões que reutilizam o motor;
- atualização do valor da causa na Guia 7.

`TAXA_LEGAL` e `TAXA_LEGAL_PREVIDENCIARIA` seguem a mesma regra.


# CHANGELOG_B67.md

# CHANGELOG — B67

## Guia 6 — Parcelas vencidas até o ajuizamento

- Corrigida a fração proporcional da competência do ajuizamento: o próprio dia do ajuizamento passa a integrar as parcelas vencidas.
- Exemplo: ajuizamento em 01/01/2026 com tratamento proporcional gera 1/30 da competência 01/2026 nas vencidas.
- A parte vincenda passa a começar no dia seguinte ao ajuizamento, mantendo a soma das frações em 100%.
- Para a competência do ajuizamento, permanece a regra de atualização monetária até o mês anterior ao ajuizamento; a competência do ajuizamento é apresentada com a fração proporcional, sem SELIC nessa competência.
- Mantidas as demais regras de atualização da Guia 5 e a correção anterior da Taxa Legal/Taxa Legal Previdenciária.


# CHANGELOG_B68.md

# B68 — Correção do marco da atualização das parcelas vencidas até o ajuizamento

## Correção

Na Guia 6, bloco **Valores até o Ajuizamento (Vencidas)**, corrigido o termo final utilizado pelo motor de correção monetária.

### Regra
- O **ajuizamento** continua sendo o marco para selecionar as parcelas vencidas.
- A última competência integral de atualização continua sendo o **mês anterior ao ajuizamento**.
- O motor de correção monetária recebe como termo final exclusivo a **competência do ajuizamento**, permitindo incluir efetivamente o mês anterior.

### Exemplo validado conceitualmente
- Ajuizamento: `01/2026`
- Última competência integral: `12/2025`
- `12/2025` passa a receber o índice de correção correspondente.
- `13º/2025`, normalizado para `12/2025`, acompanha a mesma atualização.
- A competência `01/2026` continua podendo existir para o cálculo proporcional dos dias, sem receber índice mensal de `01/2026`.

A correção preserva a regra de proporcionalidade implementada na B67.


# CHANGELOG_B69.md

# B69 — Ajustes visuais da Guia 6 e comportamento dos recolhíveis da Guia 7

- Guia 6: os blocos recolhíveis **Valores até o Ajuizamento (Vencidas)** e **Parcelas vincendas** passam a usar tonalidade vermelha, identificando visualmente os valores relacionados à renúncia, sem alterar os motores de cálculo.
- Guia 6: mantida a tonalidade de destaque vermelha no campo **Renúncia no ajuizamento**.
- Guia 7: o seletor **Aplicar Sim/Não** dos Honorários de Sucumbência não interfere mais na abertura/fechamento do bloco recolhível.
- O bloco de Sucumbência permanece aberto/fechado exclusivamente pelo cabeçalho/controle do recolhível.
- Preservado o comportamento já existente dos Honorários Contratuais.


# CHANGELOG_B70.md

# B70 — Contraste dos campos editáveis

- Guia 5: campos editáveis da seção Datas de Referência com fundo branco, incluindo Observações.
- Guia 6: Método de vincendas, Tratamento do mês do ajuizamento, Incluir 13º, Limitar ao teto, Quantidade de salários mínimos e controles do Acordo com fundo branco.
- Percentual do Acordo fica branco somente quando habilitado; quando desabilitado, permanece cinza.
- Bloco Acordo passa para fundo cinza.
- Renúncia no ajuizamento passa para destaque vermelho claro.
- Guia 7: Tipo de requisitório fica branco como campo editável; Data-base permanece cinza como campo herdado.
- Nenhuma lógica de cálculo foi alterada.


# CHANGELOG_B71.md

# B71 — Guia 3 + origem consolidada da Guia 6

- Guia 6 / Renúncia: parcelas vincendas passam a usar exclusivamente a coluna Diferença Devida consolidada da Guia 4, antes de correção, juros e SELIC.
- Edições manuais/zeramentos da Guia 4 passam a ser respeitados na contagem das vincendas.
- 13º das vincendas, quando existente na Guia 4, também usa o valor consolidado da Guia 4.
- Guia 3: campos editáveis em branco e campos bloqueados em cinza.
- Guia 3: botão único para importar NB, Espécie e DIB da Guia 1; campos importados ficam em amarelo sutil.
- Guia 6: Renúncia no ajuizamento reforçada visualmente em vermelho.
- Motores de cálculo anteriores preservados.


# CHANGELOG_B75.md

# ContadJus — B75
## Fase 1 — Relatórios profissionais

### Implementado
- Reestruturação do projeto em pastas funcionais:
  - `assets/`
  - `css/`
  - `data/`
  - `docs/`
  - `js/`
  - `changelog/`
  - `testes/`
  - `planejamento/`
- Guia 8 transformada em central de seleção das seções do relatório.
- Seções 2 a 8 disponíveis para seleção, todas marcadas por padrão.
- Guias 2 e 3 e suas opções de relatório condicionadas ao tipo de ação previdenciária.
- Cabeçalho do sistema atualizado para `ContadJus — Cálculos Judiciais`.
- Subtítulo atualizado para `Previdenciários • Atualização de Valores • Renúncia e Requisitório`.
- Selo atualizado para `Base RGPS • Atualizada até 2026`.
- Rodapé atualizado para `Evolução histórica do RGPS desde 07/1994 • Base de índices atualizada até 2026`.
- Primeira seção de relatório profissional implementada: `2. Resultado da Evolução Previdenciária`.
- Relatório utiliza os dados consolidados da memória da Guia 2, sem reexecutar ou modificar os motores de cálculo.
- Impressão/PDF utiliza uma estrutura própria de relatório, separada da aparência operacional da tela.

### Preservação
- Motores de cálculo e bases de dados existentes não foram alterados.
- A fase não implementa ainda os conteúdos profissionais das Guias 3 a 8; a central já está preparada para receber essas seções nas próximas fases.


# CHANGELOG_B76.md

# CHANGELOG — B76

## Guia 2 — identidade visual do relatório profissional

### Alterações
- Aplicada a identidade visual oficial ContadJus ao relatório da Guia 2.
- Paleta institucional: `#002b66`, `#00a8b5`, `#008080` e `#475569`.
- Cabeçalho do relatório reorganizado no padrão institucional do relatório de referência.
- Inclusão da marca ContadJus no cabeçalho do relatório.
- Removido o número antes de “Resultado da Evolução Previdenciária”.
- Inclusão do título “MEMÓRIA DE CÁLCULO COMPLETA” antes da tabela.
- RMA reduzida visualmente para evitar destaque excessivo.
- Tabela da Guia 2 passou a usar largura controlada por colunas, evitando estouro das margens do A4.
- Dados processuais mantidos em bloco compacto com traço institucional lateral.
- Mantida a geração a partir dos resultados consolidados, sem reexecutar os motores.
- Adicionado o glossário do projeto em `docs/GLOSSARIO_CONTADJUS.md`.

### Preservação
- Nenhum motor de cálculo foi alterado.
- Nenhum cálculo da Guia 2 foi alterado.
- Nenhuma estrutura de dados ou vínculo entre guias foi alterado.


# CHANGELOG_B77.md

# B77 — Relatório PDF Guia 2: impressão definitiva

## Alterações
- Ajuste definitivo do cabeçalho do relatório profissional da Guia 2.
- Logo ContadJus limitada a tamanho institucional compacto, evitando que o navegador móvel amplie a marca na impressão.
- Cabeçalho A4 com duas áreas: marca à esquerda e identificação do relatório à direita.
- Dados processuais preservados no bloco compacto.
- Mantida a identidade visual oficial: `#002b66`, `#00a8b5`, `#008080` e `#475569`.
- Mantida a estrutura da memória de cálculo e suas 9 colunas.
- Regras específicas de impressão reforçadas para Android/celular.
- Evitada altura mínima desnecessária do documento de impressão para reduzir páginas em branco.

## Motores
Nenhum motor de cálculo foi alterado. A mudança é restrita à apresentação/relatório.


# CHANGELOG_B78.md

# B78 — Correção da pré-visualização e impressão do relatório da Guia 2

- Corrigida a tipografia herdada da antiga área de relatórios que fazia a pré-visualização aparecer em Courier/monoespaçada e excessivamente pequena.
- Pré-visualização da Guia 8 reorganizada como documento profissional, com escala de leitura adequada.
- Mantida a identidade visual oficial ContadJus: `#002b66`, `#00a8b5`, `#008080` e `#475569`.
- Separadas as regras de tela das regras de impressão.
- Impressão configurada para A4, com portal exclusivo do relatório e sem depender do layout da Guia 8.
- Removida a possibilidade de a tela principal permanecer ocupando espaço de impressão.
- Ajustado o cabeçalho e o dimensionamento da logo para tela e A4.
- Motores de cálculo e dados não alterados.


# CHANGELOG_B80.md

# B80 — Guia 3 integrada ao padrão profissional de relatórios

## Objetivo
Consolidar a Guia 3 — Benefícios Recebidos como a segunda evolução previdenciária do módulo, utilizando a identidade visual aprovada no relatório da Guia 2.

## Alterações
- Guia 2: título da memória alterado para **MEMÓRIA DA EVOLUÇÃO DO BENEFÍCIO DEVIDO**.
- Guia 3: título oficial da memória definido como **MEMÓRIA DA EVOLUÇÃO DO BENEFÍCIO RECEBIDO**.
- Guia 3 passou a possuir relatório profissional real, em vez de placeholder.
- Relatório da Guia 3 utiliza a mesma estrutura visual do relatório aprovado da Guia 2.
- Incluídos no relatório da Guia 3: identificação do benefício, NB, espécie, tipo, DIB, DIP, DCB, RMI, resumo dos reajustes, RMA final, status e memória de evolução.
- Mantida a tabela de 10 colunas da memória da Guia 3.
- Seleção da Guia 3 na Guia 8 passa a alimentar efetivamente o relatório.
- Relatório combinado Guia 2 + Guia 3 passa a reunir as duas evoluções em um único documento profissional.

## Preservação funcional
Nenhum motor de cálculo foi alterado.
Foram preservados IDs, vínculos, JSON, importação da Guia 1, cálculo individual dos benefícios e integração com a Guia 4.

## Design
O relatório da Guia 2 permanece como referência visual oficial para as evoluções previdenciárias.


# CHANGELOG_B81.md

# CHANGELOG — B81

## Correção do relatório profissional — Guia 2 + Guia 3

- Corrigida a geração do PDF/Impressão: o portal criado pelo botão **Gerar PDF / Imprimir** agora recebe a classe `relatorio-documento`, preservando a mesma estrutura CSS da prévia profissional da Guia 8.
- Mantida a prévia da Guia 8 sem alterações de funcionamento.
- Ajustada a leitura de valores monetários em formato brasileiro no relatório (ex.: `1.200,00`), evitando que a RMI do benefício recebido apareça como `R$ 0,00`.
- Reforçada a legibilidade da impressão A4, evitando a redução excessiva da tipografia e das tabelas.
- Mantida a identidade visual aprovada da Guia 2 como padrão da Guia 3.
- Em relatório conjunto, a seção de Benefícios Recebidos inicia em nova página para preservar a hierarquia documental.
- **Motores de cálculo, IDs, vínculos entre guias, JSON e regras previdenciárias não foram alterados.**


# CHANGELOG_B82.md

# CONTADJUS — B82

## Relatórios: preservação do padrão visual B79

### Correções
- Restaurado o modelo de impressão A4 utilizado no relatório aprovado da B79.
- Mantida a identidade visual da Guia 2 sem redesenho.
- A Guia 3 passou a utilizar a mesma matriz visual da Guia 2.
- Corrigida a duplicidade visual da RMI no bloco do benefício recebido.
- Status final incorporado ao quadro de parâmetros da Guia 3.
- Guia 3 inicia nova página somente quando a Guia 2 também estiver selecionada.
- Mantida a correção de interpretação de valores monetários no padrão brasileiro.

### Preservação
- Motores de cálculo não alterados.
- IDs e vínculos existentes preservados.
- Estrutura de dados e JSON preservados.

### Documentação permanente
- Criado `docs/CONTADJUS_PADRAO_DESIGN.md`.
- Mantido `docs/CONTADJUS_GLOSSARIO.md` como glossário permanente.


# RELATORIO_B30_LIMITE_DINAMICO.md

# B30 — Limite dinâmico da última competência calculável

## Problema

Quando a Data de Atualização era 08/2026 e a base de correção INPC estava disponível somente até 07/2026, a Guia 5 ainda incluía a competência 08/2026. Como 08/2026 coincidia com a data da conta, o coeficiente podia aparecer como 1,0000000000 e a parcela integral era mantida, embora não houvesse índice oficial necessário para calculá-la.

## Correção

A data de atualização continua aberta e não há nenhuma data fixa no código.

O motor passa a determinar a última competência calculável pela disponibilidade efetiva das séries mensais necessárias nos períodos abertos dos encadeamentos de correção, juros e SELIC. O limite efetivo é o menor entre:

1. a Data de Atualização informada; e
2. a última competência disponível na base para os indexadores ativos que exigem série mensal.

Competências posteriores ao limite efetivo são desconsideradas.

## Exemplo validado

Com Data de Atualização 08/2026 e INPC disponível até 07/2026:

- 07/2026 permanece calculável;
- 08/2026 não é incluída;
- não há data 07/2026 ou 08/2026 fixada no código;
- quando uma nova competência for adicionada à base, o limite avançará automaticamente.

## Preservações

- Regra do índice acumulado inferior a 1 permanece intacta.
- Taxa Legal continua sendo aplicada na própria competência.
- Encadeamentos homologados não foram alterados.


# RELATORIO_B31_CRITERIO_COMPETENCIA_FINAL.md

# B31 — Critério da competência final

## Objetivo
Transformar em parâmetro de entrada a decisão sobre a competência final da atualização, sem fixar datas no motor.

## Parâmetro
**Até qual competência calcular?**
- Última competência com índices disponíveis (padrão; preserva a B30).
- Até a data de atualização.

## Comportamento
- O critério padrão continua usando a disponibilidade real das séries mensais.
- A opção "Até a data de atualização" não aplica o corte automático da base.
- A data de atualização permanece dinâmica; nenhuma competência é codificada no motor.
- O JSON do caso passa a preservar o critério escolhido.


# RELATORIO_B32.md

# Relatório B32

A regra de disponibilidade dos índices deixou de ser apresentada como uma segunda definição de competência final. O usuário continua definindo a data de atualização/termo final normalmente. O novo parâmetro apenas define o comportamento quando a base de índices não alcança essa data.

Também foi atualizada a base interna do INPC para a competência 07/2026, com fator 0,9999.


# RELATORIO_B34_CAMPOS_ENTRADA_BRANCOS.md

# B34 — Campos de entrada manual da Guia 1

## Alteração
Os campos editáveis da Guia 1 passam a utilizar fundo branco, seguindo a referência visual da RMI.

## Mantido
Campos automáticos/`readonly` continuam com aparência diferenciada.
Checkboxes, radios, file inputs e hidden inputs não foram alterados.


# RELATORIO_CORRECAO_ACOES_GERAL_2022_B21.md

# Relatório — B21 — MC-ACOES-GERAL-2022 / Juros

## Objetivo
Atualizar exclusivamente o encadeamento de juros do modelo `MC-ACOES-GERAL-2022`, considerando o modelo de Ações em Geral — Fazenda Pública definido durante a validação da Guia 5.

## Encadeamento de juros aplicado

| Período | Juros | Observação |
|---|---|---|
| 07/1994 a 12/2002 | 0,5% a.m. simples | `JUROS_05_AM` |
| 01/2003 a 06/2009 | Sem juros | SELIC tratada no bloco próprio |
| 07/2009 a 04/2012 | 0,5% a.m. simples | `JUROS_05_AM` |
| 05/2012 a 11/2021 | Juros da poupança | `JUROS_POUPANCA` |

## Encadeamento SELIC

- 01/2003 a 06/2009 → `SELIC`
- 12/2021 em diante → `SELIC`

Quando a SELIC está no bloco próprio, o bloco de juros de mora permanece como `SEM_JUROS`, evitando dupla aplicação.

## Correção monetária
Não foi alterada.

## Indexadores
Não foram alterados.

## Não Fazenda Pública
Não foi criada nem alterada uma regra específica de Não Fazenda Pública nesta etapa. O foco desta versão é o modelo adotado para Fazenda Pública.

## Validação
- `admin-encadeamentos.js` validado com `node --check`.
- Encadeamento histórico inicia em 07/1994, conforme o limite histórico atualmente adotado pela Guia 5.


# RELATORIO_CORRECAO_ACOES_GERAL_2022_B24.md

# B24 — MC-ACOES-GERAL-2022 — Ajuste após teste

## Alterações

- Correção monetária: `IPCAE` passa a terminar em **11/2021**, conforme validação do usuário; `SEM_CORRECAO` inicia em 12/2021.
- Juros: **01/2003–06/2009** passa de `SEM_JUROS` para `JUROS_05_AM` (0,5% a.m. simples).
- SELIC: removida do período **01/2003–06/2009**.
- SELIC permanece em **12/2021 em diante**, no bloco próprio.
- Demais períodos permanecem inalterados.


# RELATORIO_CORRECAO_GUIA5_B22-VIGENCIA-AUTOMATICA.md

# B22 — Guia 5: vigência aberta e carregamento automático dos modelos

## Alterações

### 1. Vigência dos encadeamentos
Os períodos finais que representam regras ainda vigentes deixaram de ter como termo final artificial a competência 06/2026.

A regra jurídica agora pode permanecer com `fim: ''`, sendo exibida como **“em diante”**.

Foram ajustados os quatro modelos oficiais:
- MC-PREVID-2026;
- MC-ACOES-GERAL-2026;
- MC-PREVID-2022;
- MC-ACOES-GERAL-2022.

Períodos históricos que foram efetivamente substituídos por outra regra permanecem com termo final definido.

### 2. Vigência da regra x disponibilidade da base
A tela não informa mais que o encadeamento “vence” em 06/2026.

Quando aplicável, é exibido:

> Base de índices disponível até MM/AAAA. A vigência das regras permanece aberta conforme o modelo; competências posteriores dependem da atualização da base.

O limite é calculado a partir das séries mensais efetivamente disponíveis na base para os períodos finais abertos. Regras matemáticas/neutras (`SEM_CORRECAO`, `SEM_JUROS`, `JUROS_1_AM`, `JUROS_05_AM`) não limitam a base.

### 3. Cálculo
Foi removida da Guia 5 a lógica que estacionava o encadeamento com base no último `fim` cadastrado. A vigência aberta permanece aplicável até a data solicitada; se faltar uma série mensal na base, o cálculo apresenta o erro correspondente e a tela informa a necessidade de atualizar a base.

### 4. Modelo predefinido
A seleção da caixa **Correção e Juros Predefinidos** agora carrega automaticamente:
- correção monetária;
- juros de mora;
- SELIC;
- encadeamentos visuais.

O botão **Aplicar** foi removido.

O botão **Calcular Atualização** permanece, pois sua função é executar a conta das diferenças e não apenas carregar o modelo.

### 5. Validação
Validação sintática realizada com `node --check` em:
- `js/admin-encadeamentos.js`
- `js/app.js`


# RELATORIO_CORRECAO_GUIA5_JUROS_B19.md

# Guia 5 — Correção do motor de encadeamentos de juros (B19)

## Objetivo

Corrigir a utilização dos encadeamentos oficiais de juros na Guia 5, especialmente para testes com início dos juros em 07/1994, e garantir que os modelos oficiais não sejam mutilados pela competência inicial do caso.

## Correções implementadas

### 1. Encadeamentos oficiais carregados integralmente

Ao aplicar um modelo predefinido, o sistema não corta mais os períodos anteriores à primeira competência das diferenças. O encadeamento oficial permanece completo; a competência inicial do caso continua sendo utilizada pelo motor no cálculo efetivo.

Isso permite que o usuário visualize o histórico integral do modelo, inclusive desde 07/1994 quando essa for a origem do encadeamento.

### 2. MC-PREVID-2026 — juros

Conforme item 4.3.2 do Manual de Cálculos da Justiça Federal — edição julho/2026:

- 07/1994 a 06/2009 — 1,0% a.m., simples;
- 07/2009 a 04/2012 — 0,5% a.m., simples;
- 05/2012 a 11/2021 — remuneração da poupança, simples;
- 12/2021 a 08/2025 — SELIC, tratada no bloco SELIC;
- a partir de 09/2025 — Taxa Legal Previdenciária, tratada no bloco de juros.

A taxa legal da competência é aplicada no mês seguinte à competência, conforme a regra do Manual.

### 3. MC-PREVID-2022 — juros

O encadeamento foi alinhado ao item 4.3.2 do Manual 2022:

- 07/1994 a 06/2009 — 1,0% a.m., simples;
- 07/2009 a 04/2012 — 0,5% a.m., simples;
- 05/2012 a 11/2021 — remuneração da poupança, simples;
- a partir de 12/2021 — SELIC.

### 4. Base histórica da poupança

Foi incluída a competência 05/2012 na série utilizada pelo motor, com 0,5000%, correspondente à regra aplicável no início da sistemática da MP 567/2012.

### 5. Sincronização Guia 1 → Guia 5

A alteração de `Início dos Juros` na Guia 1 passa a atualizar imediatamente o campo correspondente da Guia 5.

A sincronização ocorre:

- ao abrir/entrar na Guia 5;
- durante a alteração do campo na Guia 1;
- sem impedir que o usuário altere manualmente o campo da Guia 5 para um teste específico.

## Testes técnicos realizados

- JavaScript validado com `node --check`;
- MC-PREVID-2026 carregando juros desde 07/1994;
- MC-PREVID-2022 carregando juros desde 07/1994;
- intervalo 07/1994–11/2021 percorre os três regimes de juros;
- taxa legal de 09/2025 é computada em 10/2025, conforme regra de aplicação no mês seguinte.

## Próxima etapa

Ainda deve ser feita a auditoria específica dos modelos **MC-ACOES-GERAL-2026** e **MC-ACOES-GERAL-2022**, porque o Manual de ações condenatórias em geral possui regras diferentes conforme o devedor seja Fazenda Pública ou não. Essa distinção exige validação própria do motor e não deve ser resolvida copiando as regras previdenciárias.


# RELATORIO_CORRECAO_INDICE_MENOR_1_B29.md

# B29 — Correção: índice acumulado inferior a 1,00

## Problema
Quando o coeficiente acumulado de uma competência ficava inferior a 1,00, o motor reduzia o valor da própria parcela. Exemplo: 07/2026 com coeficiente 0,999900 resultava em R$ 1.701,30 para uma diferença original de R$ 1.701,47.

## Regra implementada
- O coeficiente acumulado continua sendo calculado normalmente, inclusive quando inferior a 1,00.
- O índice inferior a 1,00 continua participando do acumulado e influenciando competências posteriores.
- O valor corrigido da própria competência não pode ficar abaixo do valor original da parcela.
- A mesma regra foi aplicada à memória da Guia 5 e ao cálculo mensal reutilizado pela Guia 6.
- Não foi criado nenhum piso ou ajuste sobre o coeficiente; somente sobre o valor monetário da parcela.

## Exemplo esperado
07/2026:
- coeficiente: 0,9999000000
- diferença original: R$ 1.701,47
- valor calculado pelo coeficiente: R$ 1.701,30
- valor corrigido exibido: **R$ 1.701,47**

O coeficiente 0,999900 permanece registrado e segue participando do acumulado.


# RELATORIO_CORRECAO_MC_GERAL_2026_SELIC_B25.md

# B25 — MC GERAL 2026 – SELIC

## Objetivo
Criada uma opção alternativa, sem alterar o preset `MC-ACOES-GERAL-2026` existente.

## Regra alternativa
- Correção monetária: 01/2003 a 06/2009 = `SEM_CORRECAO`.
- Juros: 01/2003 a 06/2009 = `SELIC`.
- Demais períodos permanecem iguais ao MC GERAL 2026 atual.
- SELIC EC 113 permanece em bloco próprio de 12/2021 a 08/2025.

## Identificação
- Chave: `MC-ACOES-GERAL-2026-SELIC`
- Nome exibido: `MC GERAL 2026 – SELIC`

A opção é experimental/alternativa e não substitui o modelo atual.


# RELATORIO_CORRECAO_MC_GERAL_2026_SELIC_B26.md

# B26 — MC GERAL 2026 – SELIC — Implementação do índice SELIC no bloco de juros

## Problema identificado no teste B25

O preset `MC-ACOES-GERAL-2026-SELIC` carregava corretamente o encadeamento, porém o motor rejeitava `SELIC` quando o índice aparecia dentro do encadeamento de juros, exibindo:

> Índice de juros ainda não implementado nesta fase: SELIC

## Correção

O motor de juros passou a reconhecer `SELIC` como índice válido dentro do encadeamento de juros de mora, utilizando a mesma série mensal já existente em `BASE_INDEXADORES_JUROS.SELIC`.

A implementação é separada do cálculo da SELIC do bloco próprio:

- `SELIC` dentro de `juros` = juros de mora segundo o preset selecionado;
- `SELIC` dentro de `selic` = SELIC do bloco próprio, atualmente usada no período EC 113.

## Preset alternativo

`MC GERAL 2026 – SELIC`

- Correção: 01/2003 a 06/2009 = `SEM_CORRECAO`;
- Juros: 01/2003 a 06/2009 = `SELIC`;
- Demais períodos permanecem iguais ao `MC GERAL 2026`;
- SELIC do bloco próprio permanece 12/2021 a 08/2025.

## Regra de homologação

O preset original `MC-ACOES-GERAL-2026` não foi alterado.


# RELATORIO_CORRECAO_TAXA_LEGAL_B28.md

# RELATÓRIO — B28 — Competência da Taxa Legal

## Problema identificado

Na Guia 5, a `TAXA_LEGAL` e a `TAXA_LEGAL_PREVIDENCIARIA` estavam sendo deslocadas uma competência para frente durante o cálculo de juros. A lógica anterior buscava a competência anterior à competência da parcela.

Exemplo observado no teste previdenciário:

- 07/2026 deveria receber a Taxa Legal Previdenciária de 07/2026: **0,978134%**;
- 08/2026 deveria receber a taxa de 08/2026: **0,000000%**.

A versão anterior aplicava a taxa de 07/2026 em 08/2026.

## Correção B28

A função `guia5CalcularJurosIntervalo()` passou a consultar a taxa diretamente com a competência corrente:

```text
guia5ObterTaxaJurosMensal(periodo.indice, cursor)
```

Não há mais deslocamento para o mês seguinte.

## Regra dinâmica

A data final da base de indexadores não é codificada no motor. O cálculo percorre até a data de atualização e consulta a taxa disponível para cada competência.

Assim:

```text
07/2026 → taxa de 07/2026
08/2026 → taxa de 08/2026
09/2026 → taxa de 09/2026, se disponível na base
```

## Preservação

- Encadeamentos homologados não foram alterados.
- `MC GERAL 2026` permanece intacto.
- `MC GERAL 2026 – SELIC` permanece intacto.
- SELIC EC 113 continua no bloco próprio.
- A correção afeta apenas a aplicação da Taxa Legal no bloco de juros.

## Validação estrutural

- `node --check js/admin-encadeamentos.js` → aprovado.
- Confirmada a remoção da lógica de deslocamento de competência.
- Confirmada a consulta direta da taxa pela competência corrente.


# RELATORIO_CORRECOES_FASE_1.9A_B05.md

# ContadJus — Relatório de Correções Fase 1.9A-B05

## Base

Correções aplicadas diretamente sobre o ZIP recebido do projeto ContadJus.

## 1. Evolução — piso/teto sem reajuste

Corrigido o cenário em que a evolução não atravessa nenhum reajuste até a Data Final.

Antes, uma RMI de R$ 1.000,00 em 2024 podia permanecer em R$ 1.000,00 porque a memória ficava vazia ou o último marco de reajuste ainda não havia ocorrido.

Agora, a competência final é limitada pelo salário mínimo e pelo teto vigentes, mesmo quando não existe reajuste aplicável dentro do período.

Foi criada uma âncora de memória com tipo `PISO_INICIAL`, `TETO_INICIAL` ou `SEM_REAJUSTE`, sem contar como reajuste.

## 2. `obterValorIntegral()`

A função deixou de retornar imediatamente `rmaFinal/rmi` quando a memória está vazia.

Agora aplica os limitadores da própria competência também nesse cenário.

Isso corrige a origem utilizada por diferenças e 13º sem criar um tratamento específico apenas para a Guia 6.

## 3. 13º da Guia 6

A Guia 6 deixou de exigir memória não vazia para calcular o 13º.

Quando não houve reajuste, a base pode ser obtida pela RMI e pelos limitadores da competência, preservando a regra dos avos já validada.

## 4. Data do ajuizamento na Guia 6

Incluído campo próprio de **Data do Ajuizamento** na Guia 6.

O campo permanece editável e é sincronizado bidirecionalmente com a Data do Ajuizamento da Guia 1 — Entradas.

Não existem duas datas independentes: a alteração em qualquer uma atualiza a outra.

## 5. Recalculo automático

Foi iniciado um encadeamento automático das guias para evitar a necessidade de abrir uma guia apenas para disparar seu cálculo.

Alterações relevantes em Entradas, Benefícios Recebidos, Diferenças e Guia 5 agendam o recálculo das dependências.

O recálculo automático é silencioso e não muda a guia ativa nem provoca rolagem da tela.

## 6. UX da Guia 6

### Valores até o Ajuizamento

Renomeado para:

**Valores até o Ajuizamento (Vencidas)**

Mantido como bloco recolhível.

### Parcelas Vincendas

Criado bloco próprio para demonstrar a composição das vincendas.

#### Método Até 12

Mostra as competências efetivamente existentes, sem criar parcelas artificiais, com coeficiente 1,000000 e SELIC 0,00%.

#### Método 1 Parcela Anual

Mostra:

- 1ª parcela — mês do ajuizamento;
- 11 demais parcelas integrais;
- total da projeção de 12 parcelas.

O 13º não é inserido nesse método.

O bloco possui totalizador destacado visualmente.

## 7. Regra preservada — 13º

No método **Até 12**, quando dezembro estiver entre as competências existentes e o parâmetro estiver ativo, o 13º é agregado à competência de dezembro e não cria uma parcela adicional.

No método **1 Parcela Anual**, o 13º não é acrescentado.

## 8. Regras já validadas e preservadas

- competência inicial pela convenção comercial de 30 dias;
- DIB incluída na contagem da competência inicial;
- 13º por avos, com critério de 15 dias;
- Até 12 = no máximo 12 competências efetivamente existentes;
- vincendas sem SELIC;
- proporcionalidade do mês do ajuizamento distinta da proporcionalidade da DIB;
- DIP vazia não delimita as vincendas;
- não criar DCB fictícia para o benefício devido;
- método 1 Parcela Anual sem inclusão de 13º.

## Pendências que permanecem

1. **DCB do benefício devido:** ainda não existe campo próprio; a questão permanece pendente.
2. **Integração completa entre todas as fases:** o recálculo automático foi iniciado, mas deve ser submetido a testes de regressão abrangentes.
3. **Piso/teto:** testar cenários de RMI abaixo do piso, acima do teto e com reajustes posteriores.
4. **13º sem memória:** testar diretamente na interface os cenários com final em 12/2024 e RMI abaixo do piso.
5. **Guia 5:** confirmar em testes de interface que seus parâmetros e resultados são atualizados sem necessidade de abrir a guia.
6. **JSON:** testar carga e salvamento com o novo campo da Guia 6, garantindo sincronização da data do ajuizamento.
7. **Fábrica de Cálculos:** divergências sem fundamento identificado continuam fora do motor do ContadJus e poderão ser investigadas posteriormente com os desenvolvedores da Fábrica.

## Próxima etapa recomendada

Executar uma bateria de regressão dos cenários já validados, especialmente:

- DIB 15/05, 16/05, 17/05 e 18/05;
- final 10/2024, 12/2024 e 02/2025;
- Até 12 com e sem 13º;
- 1 Parcela Anual proporcional e integral;
- RMI abaixo do piso;
- RMI acima do teto;
- data do ajuizamento editada pela Guia 1 e pela Guia 6.


# RELATORIO_CORRECOES_FASE_1.9A_B06.md

# ContadJus — Fase 1.9A B06

## Correções desta rodada

- Recalculo automático não muda mais a guia ativa.
- Alterações na Entrada não devem enviar automaticamente para a Guia 2.
- Alterações de parâmetros da Guia 5 não devem enviar automaticamente para a Guia 6.
- Data do ajuizamento na Guia 6 é sincronizada bidirecionalmente com a Guia 1.
- A data é carregada na Guia 6 na inicialização.
- Guia 6: bloco **Parcelas Vincendas** foi movido para imediatamente após **Valores até o Ajuizamento (Vencidas)** e antes de **Formação da Demanda**.
- Vencidas e vincendas passaram a usar totalizadores visualmente unificados, acima das respectivas parcelas.
- Totalizador das vincendas agora mostra Original, Corrigido, Juros, SELIC e Total.
- Removido o totalizador inferior isolado das vincendas.
- Mantida a correção anterior de piso/teto quando a memória de evolução está vazia.

## Testes a executar após publicação

1. Alterar DIB/RMI/data final na Guia 1: permanecer na Guia 1.
2. Alterar parâmetros na Guia 5: permanecer na Guia 5.
3. Alterar ajuizamento na Guia 1: conferir sincronização imediata na Guia 6.
4. Alterar ajuizamento na Guia 6: conferir sincronização imediata na Guia 1, sem navegação.
5. Confirmar ordem dos blocos na Guia 6: Vencidas → Vincendas → Formação da Demanda.
6. Confirmar totalizadores acima das tabelas e visual unificado.
7. Depois disso, retomar os testes funcionais de Até 12, 13º, Parcela Anual e piso/teto.

- Botões de navegação e ações receberam `type="button"` para impedir submissões implícitas.
- Importação de caso também sincroniza a data do ajuizamento na Guia 6.


# RELATORIO_CORRECOES_FASE_1.9A_B07.md

# ContadJus — Fase 1.9A-B07

## Correção: competência do ajuizamento nas vencidas e parcela-base das vincendas

### Problemas identificados no teste B06

1. A competência do ajuizamento ainda recebia SELIC na memória de vencidas.
2. Quando o tratamento do mês do ajuizamento era proporcional, a linha da competência do ajuizamento não era apresentada proporcionalizada na memória das vencidas.
3. A primeira parcela vincenda estava sendo calculada sobre o **total atualizado da diferença no ajuizamento**, que carregava SELIC, e depois sofria nova proporcionalização. Isso produzia, por exemplo, R$ 712,14 em vez de R$ 706,00 para 15/08/2024 sobre base de R$ 1.412,00.
4. Havia risco de aplicar a proporcionalização duas vezes: uma na memória das vencidas e outra no total das vencidas.

## Correções B07

### 1. Vencidas

A competência do ajuizamento:

- não recebe SELIC;
- não recebe juros;
- quando o tratamento é proporcional, é reduzida à fração vencida;
- passa a aparecer na tabela já com o valor efetivamente integrante das vencidas.

Para 15/08/2024, pela convenção comercial de 30 dias:

- fração vencida: 50%;
- fração vincenda: 50%;
- R$ 1.412,00 × 50% = R$ 706,00.

### 2. Parcela-base das vincendas

`calcularParcelaAjuizamento()` deixa de utilizar o total atualizado da diferença do mês do ajuizamento.

Agora obtém o **valor integral do benefício na competência do ajuizamento**, sem SELIC e sem proporcionalização.

A proporcionalização é aplicada somente na construção da primeira parcela vincenda.

Assim:

- parcela-base integral: R$ 1.412,00;
- 15/08/2024, proporcional: 50%;
- primeira vincenda: R$ 706,00.

### 3. Evita dupla proporcionalização

A memória das vencidas já entrega a competência do ajuizamento proporcionalizada. A formação da demanda não aplica uma segunda fração sobre o total.

### 4. SELIC

Para a competência do ajuizamento, a SELIC é explicitamente zerada na memória das vencidas.

As demais competências anteriores continuam sendo atualizadas normalmente.

## Resultado esperado no cenário de teste

DIB 16/05/2024, RMI R$ 1.000,00, ajuizamento 15/08/2024, final 12/2024, método Até 12, proporcional, 13º Sim:

### Vencidas

- 05/2024: R$ 706,00
- 06/2024: R$ 1.412,00
- 07/2024: R$ 1.412,00
- 08/2024: R$ 706,00, SELIC R$ 0,00

Total original esperado: **R$ 4.236,00**.

SELIC esperada: **R$ 85,43**.

Total atualizado esperado: **R$ 4.321,43**.

### Vincendas

- 08/2024: R$ 706,00
- 09/2024: R$ 1.412,00
- 10/2024: R$ 1.412,00
- 11/2024: R$ 1.412,00
- 12/2024: R$ 2.353,33 (R$ 1.412,00 + R$ 941,33 de 13º)

Total esperado: **R$ 7.295,33**.


# RELATORIO_CORRECOES_FASE_1.9A_B08.md

# ContadJus — Fase 1.9A-B08

## Correções desta rodada

### 1. Método "1 Parcela anual"

Corrigido o cálculo do valor retornado pelo motor.

Antes, a fórmula utilizada era:

`parcela proporcional × 12`

Agora é:

`1ª parcela proporcional/integral + 11 parcelas integrais`

Exemplo com base de R$ 1.412,00 e ajuizamento em 15/08/2024:

- 1ª parcela: R$ 706,00
- 11 parcelas integrais: R$ 15.532,00
- total correto: R$ 16.238,00

A quantidade permanece 12 parcelas projetadas.

### 2. DIB durante a digitação

O recálculo automático continua silencioso enquanto o usuário digita uma data incompleta, evitando mensagens de erro transitórias e deslocamento da tela.

Ao sair do campo DIB (`blur`):

- a entrada é validada;
- o erro pode ser exibido sem `scrollIntoView`;
- a guia atual é preservada;
- o campo permanece na região visual do usuário.

### 3. Erros de recálculo automático

`executarCalculo({silencioso:true})` não exibe erro global nem navega para a Guia de Entradas. Isso evita que valores parciais durante edição interrompam o fluxo de preenchimento.

### Testes prioritários desta versão

1. 1 Parcela anual + proporcional, DIB 16/05/2024, ajuizamento 15/08/2024: vincendas devem totalizar R$ 16.238,00.
2. Alterar DIB para valor parcial, como `15`, durante a digitação: não deve ocorrer scroll para a mensagem de erro.
3. Sair do campo com DIB inválida: mensagem deve aparecer sem retirar o campo da área visível.
4. Completar a DIB válida: cálculo automático deve ocorrer sem troca de guia.


# RELATORIO_CORRECOES_FASE_1.9A_B09.md

# CONTADJUS — Fase 1.9A-B09

## Correção UX — validação da DIB durante digitação

### Problema observado
Ao digitar parcialmente a DIB (por exemplo, `15`), o sistema podia interpretar a entrada incompleta como inválida, exibir `DIB inválida` e deslocar a página até o painel de validação, deixando o campo DIB fora da área visual embora permanecesse com foco.

### Correção
- Recalculo automático não é executado enquanto a DIB não estiver em formato completo `DD/MM/AAAA` ou `MM/AAAA`.
- O `blur` da DIB também não dispara validação enquanto a entrada estiver incompleta.
- Mensagens de validação associadas a campo em edição não executam `scrollIntoView`.
- O campo em edição permanece visualmente acessível.
- A correção não altera a regra de cálculo da DIB; atua somente no momento e na forma de validação.

### Critérios de teste
1. Digitar `1`, `15`, `15/`, `15/0`, `15/05`, etc.: nenhuma mensagem global e nenhum scroll automático.
2. Sair do campo com valor incompleto: nenhuma validação de DIB inválida deve ser exibida.
3. Sair do campo com data completa válida: cálculo/validação normal, sem deslocamento indevido da tela.
4. Sair do campo com data completa inválida: mensagem de erro sem rolar a página para o painel.
5. Cálculo manual explícito continua podendo exibir validações normalmente.


# RELATORIO_CORRECOES_FASE_1.9A_B10.md

# ContadJus — Fase 1.9A — B10

## Correções

### UX — DIB
- A DIB passa a seguir o mesmo critério de edição da Data do Ajuizamento.
- Digitação parcial não gera validação automática.
- `blur` da DIB não executa mais o cálculo da evolução.
- A mudança de DIB não navega automaticamente para a Guia 2.
- O cálculo da evolução permanece associado à ação explícita do usuário ou ao recálculo automático silencioso.

### Guia 6 — Diferenças
- Removido o botão `Importar Diferenças da Guia 4`, que se tornou redundante com a sincronização automática.
- O status informa que as diferenças são sincronizadas automaticamente.

### Regra já corrigida e preservada
- Método `1 Parcela anual`: 1ª parcela proporcional/integral + 11 parcelas integrais.
- Não adicionar 13º no método anual.


# RELATORIO_CORRECOES_FASE_1.9A_B11.md

# ContadJus — Fase 1.9A — B11

## Correção desta rodada

Corrigida a partição da competência quando **DIB e Data do Ajuizamento estão no mesmo mês/ano** e o tratamento do mês do ajuizamento é **Proporcional**.

### Regra

A competência já contém apenas a parcela devida desde a DIB. Por isso, não se deve aplicar novamente a fração geral do ajuizamento sobre toda a competência.

Para mês comercial de 30 dias:

- dias vencidos: DIB até o dia anterior ao ajuizamento;
- dias vincendos: ajuizamento até o fim da competência comercial;
- a soma das duas partes corresponde exatamente à parcela devida desde a DIB.

### Exemplo de teste

DIB 20/08/2024, ajuizamento 25/08/2024:

- competência de agosto devida desde a DIB: 11/30;
- vencida: 5/30;
- vincenda: 6/30;
- base mensal: R$ 1.412,00;
- vencida: R$ 235,33;
- vincenda: R$ 282,40.

A alteração foi feita no motor da Guia 6, sem alterar a lógica já validada dos demais cenários.


# RELATORIO_CORRECOES_FASE_1.9A_B12.md

# ContadJus — Fase 1.9A — B12

## Correções desta rodada

### 1. DIB e ajuizamento na mesma competência — vincenda proporcional

Corrigida a primeira competência das vincendas quando DIB e ajuizamento pertencem ao mesmo mês/ano e o tratamento é proporcional.

A evolução já fornece somente a parcela efetivamente devida desde a DIB. A fração posterior ao ajuizamento é aplicada sobre essa própria competência ativa, evitando calcular a fração sobre a mensalidade integral.

Exemplo:
- DIB: 20/08/2024
- Ajuizamento: 25/08/2024
- base mensal: R$ 1.412,00
- competência ativa: 11/30
- vencida: 5/30 = R$ 235,33
- vincenda: 6/30 = R$ 282,40

No cenário Até 12 + proporcional + 13º Sim + final 02/2025:
- vincendas esperadas: R$ 9.437,07.

A mesma lógica foi aplicada ao método 1 Parcela anual quando o cenário é equivalente.

### 2. UX — Formação da Demanda

Ajustada a hierarquia tipográfica de "Demanda no ajuizamento" para coincidir com o total das parcelas vincendas, preservando as cores existentes.

### 3. UX — tabelas

Padronizada a escala de corpo das tabelas da Guia 6 com as tabelas das Guias 4 e 5, mantendo cabeçalhos menores e as cores atuais.

### 4. UX — ações do caso

Exportar, Importar e Novo caso/Limpar foram movidos para uma barra comum imediatamente abaixo da navegação das guias, tornando as ações acessíveis a partir de todas as guias e ocupando menos espaço.

### 5. UX — Guia 1

Reduzidos espaçamentos e preenchimentos verticais dos blocos da Entrada, preservando a área de clique e a legibilidade.


# RELATORIO_CORRECOES_FASE_1.9A_B13.md

# ContadJus — Fase 1.9A — B13

## Correção principal

Corrigida a primeira parcela das vincendas quando o tratamento do mês do ajuizamento é proporcional.

### Regra

Quando o ajuizamento ocorre no dia `D`, a parte vincenda do mês comercial é:

`(30 - D) / 30`

A DIB não altera esse denominador. Quando DIB e ajuizamento estão na mesma competência, a DIB já delimita a parte vencida; a vincenda corresponde aos dias posteriores ao ajuizamento até o fim do mês comercial.

### Exemplo de teste

DIB: 20/08/2024  
Ajuizamento: 25/08/2024  
Base mensal: R$ 1.412,00

- Vencida: 5/30 = R$ 235,33
- Vincenda de agosto: 6/30 = R$ 282,40
- Com 13º em dezembro: R$ 1.882,67
- Total das 7 vincendas até 02/2025: R$ 9.437,07

## UX preservada

- Barra de ações do caso permanece comum às guias.
- Hierarquia tipográfica da Formação da Demanda permanece equalizada.
- Tipografia das tabelas da Guia 6 permanece alinhada às Guias 4 e 5.

## Observação

A correção anterior utilizava a fração de dias posteriores ao ajuizamento sobre o período ativo desde a DIB (`6/11`), produzindo R$ 770,18. Isso estava incorreto. A fração correta é `6/30`.


# RELATORIO_CORRECOES_FASE_1.9A_B14.md

# CONTADJUS — Fase 1.9A B14

## Correção da fração da primeira parcela vincenda

Correção do caso de DIB e ajuizamento na mesma competência, com tratamento proporcional.

Para ajuizamento em 25/08, a parcela vincenda de agosto deve representar os dias 25 a 30 da competência comercial: 6/30 da base.

A função `guia6ObterFracaoVincendaMesDibAjuizamento()` foi alterada para calcular diretamente `(30 - diaAjuizamento) / 30`.

A função da parcela vencida permanece separada, pois utiliza a fração dos dias efetivamente devidos desde a DIB até a véspera do ajuizamento.

Teste-alvo:
- DIB: 20/08/2024
- Ajuizamento: 25/08/2024
- R$ 1.412,00
- Vencida agosto: R$ 235,33
- Vincenda agosto: R$ 282,40
- Vincendas totais com 13º: R$ 9.437,07


# RELATORIO_CORRECOES_FASE_1.9A_B15.md

# B15 — Correção da fração da primeira vincenda

Correção da convenção de mês comercial na primeira parcela vincenda proporcional.

- Ajuizamento em 25/08: 6/30, incluindo o próprio dia do ajuizamento.
- Vencida com DIB em 20/08 e ajuizamento em 25/08: 5/30.
- Vincenda da competência: 6/30.
- Para base de R$ 1.412,00: R$ 235,33 vencido e R$ 282,40 vincendo.

A DIB não altera o denominador da parte posterior ao ajuizamento.


# RELATORIO_CORRECOES_FASE_1.9A_B16.md

# B16 — UX: Parcelas vincendas recolhíveis

Alteração visual da Guia 6 — Formação da Demanda.

- Removido o ícone `📊` do título.
- Título padronizado para `Parcelas vincendas`.
- Bloco transformado em painel recolhível, seguindo o padrão de `Valores até o Ajuizamento (Vencidas)`.
- Painel inicia fechado após o cálculo.
- Quantidade de parcelas permanece visível no cabeçalho.
- Conteúdo interno (resumo financeiro e tabela/composição) é exibido ao abrir o painel.
- Nenhuma regra de cálculo foi alterada nesta versão.

## Complemento B17 — UX do bloco de vincendas e tutorial

- Adicionada seta ao bloco recolhível **Parcelas vincendas**, sem alterar o bloco **Valores até o Ajuizamento (Vencidas)**.
- A seta alterna entre `▶` (fechado) e `▼` (aberto).
- Aplicada diferenciação visual em amarelo muito sutil ao bloco de parcelas vincendas, preservando a paleta existente.
- Criado tutorial recolhível **Tutorial — Regras da Formação da Demanda**, fechado por padrão para não aumentar o espaço ocupado pela tela.
- Tutorial documenta as regras consolidadas de 1 Parcela anual, Até 12 vincendas, proporcionalidade do mês do ajuizamento, não considerar vincendas e composição final.
- Nenhuma regra do cálculo foi alterada nesta etapa.


# RELATORIO_CORRECOES_FASE_1.9A_B18.md

# CONTADJUS — Guia 6 — Fase 1.9A B18

## Ajustes UX

- Removido o botão manual **Calcular Formação da Demanda**; a Guia 6 utiliza o recálculo automático já existente.
- Status alterado para indicar **Cálculo atualizado automaticamente**.
- Tutorial convertido em botão discreto **ⓘ Regras utilizadas**, com modal funcional.
- Modal pode ser fechado pelo botão, clique fora ou tecla `Esc`.
- Corrigida a indicação visual dos accordions: `▶` fechado e `▼` aberto.
- Mantida a posição da seta do bloco de Vencidas.
- Bloco de **Valores até o Ajuizamento (Vencidas)** passou a usar verde muito suave.
- Bloco de **Parcelas vincendas** usa verde suave ligeiramente mais destacado.
- Mantida a diferenciação azul da **Demanda no ajuizamento**.
- Nenhuma regra matemática da Formação da Demanda foi alterada nesta versão.


# RELATORIO_FASE_1.9A_B27.md

# ContadJus — Fase 1.9A — B27

## Ajustes desta versão

- Mantida a implementação da Guia 6 / Renúncia da B26.
- Adicionado botão explícito **Calcular Formação da Demanda**.
- O cálculo da memória até o ajuizamento passa a reutilizar efetivamente `guia5CalcularJurosDeterministicos()` com `SEM_JUROS`.
- Mantida a reutilização de `guia5CalcularCoeficienteMensal()` e `guia5CalcularSelic()`.
- `window.resultadosAtualizacao` não é alterado pela Guia 6.

## Estados da Guia 6

- `window.parametrosFormacaoDemanda`
- `window.resultadosAjuizamentoAtualizacao`
- `window.resultadoAjuizamento`

## Arquivos alterados nesta B27

- `index.html`
- `js/admin-encadeamentos.js`

A estrutura `formacaoDemanda` e a compatibilidade com `acordoRenuncia` permanecem conforme a B26 em `js/json.js`.

## Validação

- `node --check` executado em `js/admin-encadeamentos.js`.
- `node --check` executado em `js/json.js`.
- Testes automatizados do núcleo da Guia 6 executados com sucesso:
  - competência do ajuizamento;
  - 1 parcela anual integral;
  - 1 parcela anual proporcional;
  - até 12 vincendas;
  - limitação do número de vincendas;
  - 13º agregado em dezembro;
  - renúncia;
  - acordo;
  - memória até o ajuizamento com juros zero;
  - SELIC preservada;
  - preservação de `window.resultadosAtualizacao`.

## Escopo não implementado

- Guia 7 / Expedição;
- RPV;
- precatório;
- honorários;
- relatórios novos.


# B83 — Guia 4 integrada ao relatório profissional e consolidação documental

## Relatório profissional
- Implementado o relatório da Guia 4 — Diferenças.
- A opção **4. Diferenças** da Central de Relatórios deixa de ser placeholder.
- Incluídos termo inicial, competência final, modo de compensação, totais devido/recebido/diferença e tabela consolidada.
- Mantida a leitura direta dos resultados já calculados na Guia 4; o relatório não reexecuta motores.
- Guia 4 inicia nova página quando outra seção de evolução já estiver presente.

## Design
- Mantido o padrão visual master da B79/B82.
- Cabeçalhos de tabela em azul institucional, zebra e valores finais destacados.
- Documento de design permanente atualizado para contemplar a Guia 4.

## Organização
- Changelogs individuais consolidados em `docs/HISTORICO_VERSOES.md`, reduzindo a quantidade de arquivos do repositório sem perda do histórico textual.
- Motores de cálculo, IDs, JSON e vínculos entre guias preservados.


## B92 — Honorários: pró-rata da sentença
- Corrigida a identificação da competência do mês da sentença para aplicar o pró-rata quando o dia é informado.
- Precatório: painel de cálculo abre por padrão quando disponível.


### B96 — UX/UI e PDF da Guia 5
Ajustes exclusivamente de apresentação: memória da Guia 5 ampliada na tela, coeficiente exibido com 8 casas decimais, TOTAL das linhas sem negrito e totalizador final protegido contra quebra entre páginas no relatório/PDF. Motores e funções de cálculo preservados.

## B97 — Ajuste final das tabelas
- Base visual preservada: B96.
- Corpo da tabela da Guia 5: 8,0 px.
- Demais tamanhos de fonte preservados.
- R$ removido das linhas normais das tabelas.
- Negrito removido das linhas normais das tabelas.
- Totalizadores preservados com R$ e negrito.
- Diferença Devida permanece azul e sem negrito.
- Motores e funções de cálculo preservados.


## B105 — Ajuste vertical do rodapé/PDF
- Rodapé reposicionado próximo à borda inferior.
- Linhas de tabela permanecem indivisíveis.
- Nenhuma regra de tamanho tipográfico foi criada ou alterada nesta versão.
- Motores e funções de cálculo não alterados.


## B106 — Posicionamento final do rodapé institucional
- Ajuste exclusivamente vertical do conjunto linha ciano + identificação institucional.
- Mantida a linha ciano original da identidade visual.
- Mantido o tamanho das fontes da tela e do PDF.
- Mantida a área de segurança inferior para impedir sobreposição das tabelas.
- Mantida a quebra integral das linhas das tabelas.
- Motores e funções de cálculo não alterados.


## B107 — Paginação PDF definitiva
- Rodapé institucional mantido como elemento HTML fixo por página.
- Removido o posicionamento B106 que deslocava o rodapé para fora da folha.
- Tabelas forçadas ao modelo nativo de impressão.
- Linhas indivisíveis e cabeçalhos repetidos.
- Resultado das Diferenças e Resultado da Atualização iniciam em página própria.
- Nenhum tamanho de fonte alterado.
- Motores e funções de cálculo não alterados.
