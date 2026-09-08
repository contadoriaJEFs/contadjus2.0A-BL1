# CONTADJUS — DIRETRIZES DE DESIGN
## Padrão visual derivado do Relatório da Guia 2

**Versão:** 1.0  
**Data:** 25/08/2026  
**Escopo:** Guia 2 — Evolução Devida; Guia 3 — Benefícios Recebidos; relatórios correspondentes.

---

## 1. Princípio central

A Guia 2 estabeleceu o padrão visual de referência do projeto. A Guia 3 deve se aproximar visualmente dela ao máximo, porque ambas representam **evoluções de benefícios previdenciários**.

A diferença entre as duas deve estar principalmente no **conteúdo e na natureza do benefício**, e não em uma identidade visual diferente.

O relatório aprovado da Guia 2 apresenta uma sequência clara:

1. cabeçalho institucional;
2. identificação processual;
3. resultado da evolução;
4. resumo dos parâmetros;
5. RMA;
6. memória da evolução.

Esse encadeamento passa a ser o padrão para a Guia 3.

---

## 2. Nomenclatura oficial das memórias

### Guia 2 — Evolução Devida

Substituir:

> MEMÓRIA DE CÁLCULO COMPLETA

por:

> **MEMÓRIA DA EVOLUÇÃO DO BENEFÍCIO DEVIDO**

### Guia 3 — Benefícios Recebidos

Usar:

> **MEMÓRIA DA EVOLUÇÃO DO BENEFÍCIO RECEBIDO**

A nomenclatura deve ser utilizada tanto na interface quanto nos relatórios correspondentes.

---

## 3. Identidade visual oficial

### Cores

| Função | Cor | Hex |
|---|---|---|
| Azul institucional / Navy | principal | `#002b66` |
| Ciano / Teal | destaque | `#00a8b5` |
| Teal alternativo | detalhes | `#008080` |
| Grafite | rótulos/subtítulos | `#475569` |
| Texto principal | escuro | `#1e293b` |
| Fundo claro | neutro | `#f8fafc` |
| Bordas | neutro | `#cbd5e1` |
| Fundo zebra | tabela | `#f1f5f9` |

A paleta já utilizada no relatório aprovado está documentada no CSS institucional. fileciteturn7file4L1-L35

---

## 4. Tipografia

Priorizar:

`Helvetica Neue, Helvetica, Arial, sans-serif`

Não utilizar fonte monoespaçada no relatório final.

Hierarquia:

- título documental: forte, azul institucional;
- títulos de seção: azul institucional;
- rótulos: grafite;
- valores: escuros e sem exagero;
- valor final: destaque moderado.

---

## 5. Estrutura visual da Guia 2

A Guia 2 é a referência visual.

### Cabeçalho

Logo ContadJus + identificação do relatório, com divisor ciano.

### Identificação processual

Quadro discreto com:

- Número do processo;
- Nome da parte;
- Nome do réu;
- Data do cálculo.

### Resultado

Título:

> **Resultado da Evolução Previdenciária**

Resumo em quatro campos:

- DIB considerada;
- RMI base;
- Competência final;
- Reajustes aplicados.

### Resultado principal

RMA em destaque moderado, evitando efeito visual sensacionalista.

### Memória

Tabela institucional com cabeçalho azul, linhas discretas e valor final destacado.

O PDF de referência da Guia 2 contém exatamente essa sequência de informações. fileciteturn7file0

---

## 6. Guia 3 — Benefícios Recebidos

A Guia 3 deve utilizar a mesma linguagem visual da Guia 2.

### Estrutura recomendada

**BENEFÍCIOS RECEBIDOS**

→ identificação do benefício  
→ parâmetros previdenciários  
→ tratamento da DIP  
→ demais parâmetros específicos  
→ resultado da evolução  
→ memória da evolução

### Resultado

A área de resultado deve seguir o padrão compacto da Guia 2:

- RMA final;
- status;
- quantidade de reajustes;
- último reajuste;
- último índice.

### Memória

Título obrigatório:

> **MEMÓRIA DA EVOLUÇÃO DO BENEFÍCIO RECEBIDO**

A tabela deve preservar a estrutura funcional existente, apenas recebendo a identidade visual da Guia 2.

---

## 7. O que não deve ser alterado

As alterações visuais não devem modificar:

- motores de cálculo;
- fórmulas;
- IDs existentes;
- vínculos entre guias;
- estrutura de importação/exportação;
- JSON;
- regras previdenciárias;
- cálculos individuais dos benefícios;
- integração da Guia 3 com a Guia 4.

Quando um campo deixar de ser exibido por decisão de interface, seu vínculo interno deve ser preservado se houver dependência funcional.

---

## 8. Dados importados

A diferenciação visual deve permanecer semântica:

- **branco:** entrada normal;
- **azul:** recuperado de JSON, quando aplicável ao padrão já existente;
- **amarelo:** preenchimento parcial/importado quando essa convenção estiver ativa;
- **verde:** sucesso/resultado;
- **vermelho:** erro real.

Não usar vermelho apenas porque um campo está vazio.

---

## 9. Tabelas

Todas as memórias de evolução devem seguir:

- cabeçalho `#002b66`;
- texto branco no cabeçalho;
- bordas `#cbd5e1`;
- zebra `#f1f5f9`;
- valores finais em negrito;
- largura total disponível;
- altura responsiva quando exibidas na interface;
- impressão preparada para A4.

O CSS de referência já utiliza esse padrão para `.calc-table`. fileciteturn7file7

---

## 10. Relatórios PDF

O relatório não deve parecer uma impressão da tela.

Deve parecer um **documento técnico produzido pelo ContadJus**.

Características obrigatórias:

- A4;
- margens consistentes;
- cabeçalho institucional;
- tipografia proporcional;
- hierarquia visual;
- tabelas legíveis;
- rodapé institucional;
- evitar espaços verticais excessivos;
- evitar fonte monoespaçada;
- evitar ícones de interface;
- não imprimir elementos próprios da aplicação.

O modelo aprovado da Guia 2 comprovou essa abordagem. fileciteturn7file0

---

## 11. Regra para futuras guias

Sempre que uma nova guia gerar uma evolução previdenciária, ela deverá:

1. reutilizar a identidade da Guia 2;
2. manter a mesma linguagem de títulos;
3. manter a mesma estrutura visual de memória;
4. mudar apenas o conteúdo específico;
5. não criar uma identidade paralela sem justificativa.

---

## 12. Regra para futuras alterações

Antes de considerar uma versão concluída:

- conferir a tela;
- conferir a impressão;
- conferir PDF em desktop;
- conferir PDF pelo celular;
- verificar se os motores continuam funcionando;
- verificar IDs e vínculos;
- verificar JSON;
- atualizar changelog;
- comparar visualmente com o padrão aprovado.

**O Relatório da Guia 2 passa a ser a referência visual oficial do módulo previdenciário.**
