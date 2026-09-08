// =====================================================================
// RELATÓRIOS – ALTERAÇÕES MANUAIS (Fase 1.7C2)
// =====================================================================

// =====================================================================
// FUNÇÕES AUXILIARES (consomem dados de diferencas.js)
// =====================================================================

function obterCompetenciasModificadasRelatorio() {
    // Esta função já existe em diferencas.js, mas se não estiver disponível globalmente, a implementamos aqui.
    if (typeof window.obterCompetenciasModificadas === 'function') {
        return window.obterCompetenciasModificadas();
    }
    // Fallback local (caso não esteja disponível)
    const competencias = new Set();
    for (const chave of Object.keys(dadosDiferencas.celulasEditadas)) {
        let comp;
        if (chave.startsWith('devido|')) {
            comp = chave.split('|')[1];
        } else {
            comp = chave.split('|')[0];
        }
        if (comp) competencias.add(comp);
    }
    return Array.from(competencias).sort((a, b) => {
        const [mesA, anoA] = a.split('/').map(Number);
        const [mesB, anoB] = b.split('/').map(Number);
        return (anoA * 12 + mesA) - (anoB * 12 + mesB);
    });
}

function obterValorOriginalDevido(comp) {
    // Recalcula o valor original do Benefício Devido para a competência
    const mes = parseInt(comp.split('/')[0], 10);
    const ano = parseInt(comp.split('/')[1], 10);
    const fracao = window.obterFracaoDevida ? window.obterFracaoDevida(mes, ano) : 1;
    const memoriaDevida = window.memoriaEvolucaoDevida || [];
    const rmiDevida = parseFloat(document.getElementById('rmi').value.replace(/\./g, '').replace(',', '.')) || 0;
    const valorIntegral = window.obterValorIntegral ? window.obterValorIntegral(memoriaDevida, comp, rmiDevida) : 0;
    return Math.round(valorIntegral * fracao * 100) / 100;
}

function obterValorOriginalRecebido(comp, benId) {
    // Recalcula o valor original do Benefício Recebido para a competência
    const mes = parseInt(comp.split('/')[0], 10);
    const ano = parseInt(comp.split('/')[1], 10);
    const beneficios = window.coletarBeneficiosRecebidosSimplificado ? window.coletarBeneficiosRecebidosSimplificado() : [];
    const ben = beneficios.find(b => b.id === benId);
    if (!ben) return 0;
    const fracao = window.obterFracaoRecebida ? window.obterFracaoRecebida(mes, ano, ben) : 1;
    const valorIntegral = window.obterValorIntegral ? window.obterValorIntegral(ben.memoria, comp, ben.rmi, ben.rmaFinal) : 0;
    return Math.round(valorIntegral * fracao * 100) / 100;
}

function formatarMoedaRelatorio(valor) {
    return 'R$ ' + valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// =====================================================================
// GERAR RELATÓRIO
// =====================================================================

function gerarRelatorio(tipo) {
    const competencias = obterCompetenciasModificadasRelatorio();
    if (competencias.length === 0) {
        return '<p class="text-slate-400 text-center py-4">Nenhuma alteração manual encontrada.</p>';
    }

    const linhas = [];
    let countExternas = 0;
    let countInternas = 0;

    competencias.forEach(comp => {
        const just = dadosDiferencas.justificativas[comp];
        const justTexto = just && typeof just === 'object' ? just.texto : (typeof just === 'string' ? just : null);
        const incluirRel = just && typeof just === 'object' ? just.incluirNoRelatorio : false;

        // Filtro para relatório externo: só inclui se houver justificativa externa
        if (tipo === 'externo' && !incluirRel) return;

        const temJustificativaExterna = incluirRel && justTexto && justTexto.trim() !== '';

        if (temJustificativaExterna) countExternas++;
        else if (justTexto && justTexto.trim() !== '') countInternas++;

        // --- Benefício Devido ---
        const chaveDevido = 'devido|' + comp;
        const valorEditado = dadosDiferencas.celulasEditadas[chaveDevido];
        if (valorEditado !== undefined) {
            const valorOriginal = obterValorOriginalDevido(comp);
            const status = (tipo === 'interno') ? (temJustificativaExterna ? 'EXTERNO' : 'INTERNO') : '';
            linhas.push({
                comp,
                campo: 'Benefício Devido',
                valorOriginal,
                valorEditado,
                justificativa: justTexto || 'Justificativa não informada.',
                status,
                incluirRel
            });
        }

        // --- Benefícios Recebidos ---
        for (const chave of Object.keys(dadosDiferencas.celulasEditadas)) {
            if (chave.startsWith(comp + '|')) {
                const benId = chave.split('|')[1];
                const valorEditado = dadosDiferencas.celulasEditadas[chave];
                const valorOriginal = obterValorOriginalRecebido(comp, benId);
                // Buscar identificador do benefício (NB)
                const beneficios = window.coletarBeneficiosRecebidosSimplificado ? window.coletarBeneficiosRecebidosSimplificado() : [];
                const ben = beneficios.find(b => b.id === benId);
                const nomeBen = ben ? ('NB ' + ben.nb) : ('Benefício ' + benId);
                const status = (tipo === 'interno') ? (temJustificativaExterna ? 'EXTERNO' : 'INTERNO') : '';
                linhas.push({
                    comp,
                    campo: nomeBen,
                    valorOriginal,
                    valorEditado,
                    justificativa: justTexto || 'Justificativa não informada.',
                    status,
                    incluirRel
                });
            }
        }
    });

    // Se não houver linhas para exibir (externo sem justificativas)
    if (linhas.length === 0) {
        return '<p class="text-slate-400 text-center py-4">Nenhuma alteração com justificativa para relatório externo foi encontrada.</p>';
    }

    // Ordenar por competência
    linhas.sort((a, b) => {
        const [mesA, anoA] = a.comp.split('/').map(Number);
        const [mesB, anoB] = b.comp.split('/').map(Number);
        return (anoA * 12 + mesA) - (anoB * 12 + mesB);
    });

    // Construir HTML
    let html = '';
    let currentComp = '';
    linhas.forEach(item => {
        if (item.comp !== currentComp) {
            if (currentComp !== '') html += '<div class="relatorio-separador"></div>';
            currentComp = item.comp;
            html += `<div class="relatorio-item"><div class="font-bold text-slate-800">COMPETÊNCIA: ${item.comp}</div>`;
        }
        html += `
            <div class="ml-4 mt-2">
                <div><span class="campo">Campo Alterado:</span> ${item.campo}</div>
                <div><span class="campo">Valor Original Calculado:</span> ${formatarMoedaRelatorio(item.valorOriginal)}</div>
                <div><span class="campo">Valor Utilizado:</span> ${formatarMoedaRelatorio(item.valorEditado)}</div>
                <div><span class="campo">Justificativa:</span> ${item.justificativa}</div>
        `;
        if (tipo === 'interno') {
            const statusClass = item.status === 'EXTERNO' ? 'status-externo' : 'status-interno';
            html += `<div><span class="campo">Status:</span> <span class="${statusClass}">${item.status}</span></div>`;
        }
        html += `</div>`;
    });
    html += `</div>`; // fecha último item

    // Atualizar resumo
    atualizarResumoRelatorio(competencias, countExternas, countInternas);

    return html;
}

// =====================================================================
// RESUMO DAS ALTERAÇÕES
// =====================================================================

function atualizarResumoRelatorio(competencias, externas, internas) {
    const resumoDiv = document.getElementById('resumoRelatorio');
    if (!resumoDiv) return;
    if (competencias.length === 0) {
        resumoDiv.classList.add('hidden');
        return;
    }
    resumoDiv.classList.remove('hidden');
    document.getElementById('resumoCompetencias').textContent = competencias.length;
    document.getElementById('resumoExternas').textContent = externas;
    document.getElementById('resumoInternas').textContent = internas;
}

// =====================================================================
// EXIBIR RELATÓRIO NO PREVIEW
// =====================================================================

function exibirRelatorio() {
    const tipoRadio = document.querySelector('input[name="tipoRelatorio"]:checked');
    const tipo = tipoRadio ? tipoRadio.value : 'interno';
    const preview = document.getElementById('previewRelatorio');
    if (!preview) return;

    const html = gerarRelatorio(tipo);
    preview.innerHTML = html;
}

function imprimirRelatorio() {
    window.print();
}

// =====================================================================
// INICIALIZAÇÃO (substitui a função placeholder anterior)
// =====================================================================

// Esta função será chamada pelo DOMContentLoaded em app.js, se existir.
// Caso contrário, manteremos a função vazia ou apenas configuramos eventos.


// =====================================================================
// LETREIRO DE ÍNDICES — SOMENTE INFORMATIVO
// Lê os últimos registros existentes nas bases locais da pasta data/.
// Não participa de qualquer cálculo.
// =====================================================================
function relatorioObterUltimoRegistroSerie(serie, opcoes = {}) {
    if (!serie || typeof serie !== 'object') return null;
    const registros = Object.keys(serie)
        .filter(chave => /^\d{4}-\d{2}$/.test(chave))
        .sort();
    if (!registros.length) return null;

    const tipo = opcoes.tipo || 'percentual';
    const ehPlaceholder = (valor) => {
        const n = Number(valor);
        if (!Number.isFinite(n)) return true;
        if (n === 0) return true;
        // Nas séries em fator, duas ou mais competências neutras consecutivas
        // no final da base são tratadas como registros ainda não atualizados.
        return tipo === 'fator' && Math.abs(n - 1) < 1e-12;
    };

    // Não confundir placeholders finais com o último índice efetivamente
    // informado. Um único fator 1,0000 pode ser um índice real; por isso só
    // recuamos quando existem pelo menos dois neutros consecutivos no final.
    if (tipo === 'fator') {
        let fim = registros.length - 1;
        let neutros = 0;
        while (fim >= 0 && Math.abs(Number(serie[registros[fim]]) - 1) < 1e-12) {
            neutros++;
            fim--;
        }
        if (neutros >= 2 && fim >= 0) {
            return { competencia: registros[fim], valor: serie[registros[fim]] };
        }
    }

    for (let i = registros.length - 1; i >= 0; i--) {
        const competencia = registros[i];
        if (!ehPlaceholder(serie[competencia])) {
            return { competencia, valor: serie[competencia] };
        }
    }
    return null;
}

function relatorioFormatarCompetenciaTicker(competencia) {
    const [ano, mes] = String(competencia || '').split('-');
    const nomes = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
    const indiceMes = Number(mes) - 1;
    return `${nomes[indiceMes] || mes}/${ano}`;
}

function relatorioFormatarPercentualTicker(valor, casas = 4) {
    const n = Number(valor);
    if (!Number.isFinite(n)) return 'não informado';
    return n.toLocaleString('pt-BR', {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    }) + '%';
}

function relatorioFormatarFatorComoPercentualTicker(valor, casas = 4) {
    const n = Number(valor);
    if (!Number.isFinite(n)) return 'não informado';
    return relatorioFormatarPercentualTicker((n - 1) * 100, casas);
}

function obterUltimosIndicesParaLetreiro() {
    const baseAtualizacao = window.BASE_INDEXADORES_ATUALIZACAO || {};
    const baseJuros = window.BASE_INDEXADORES_JUROS || {};

    const definicoes = [
        { nome: 'INPC', serie: baseAtualizacao.INPC, tipo: 'fator', casas: 4 },
        { nome: 'IPCA-E', serie: baseAtualizacao.IPCAE, tipo: 'fator', casas: 4 },
        { nome: 'SELIC', serie: baseJuros.SELIC, tipo: 'percentual', casas: 4, sufixo: ' a.m.' },
        { nome: 'Taxa Legal', serie: baseJuros.TAXA_LEGAL, tipo: 'percentual', casas: 6, sufixo: ' a.m.' },
        { nome: 'Taxa Legal Previdenciária', serie: baseJuros.TAXA_LEGAL_PREVIDENCIARIA, tipo: 'percentual', casas: 6, sufixo: ' a.m.' }
    ];

    return definicoes.map(def => {
        const ultimo = relatorioObterUltimoRegistroSerie(def.serie, { tipo: def.tipo });
        if (!ultimo) {
            return `${def.nome}: <strong>não informado</strong>`;
        }
        const valor = def.tipo === 'fator'
            ? relatorioFormatarFatorComoPercentualTicker(ultimo.valor, def.casas)
            : relatorioFormatarPercentualTicker(ultimo.valor, def.casas);
        return `${def.nome} ${relatorioFormatarCompetenciaTicker(ultimo.competencia)}: <strong>${valor}${def.sufixo || ''}</strong>`;
    });
}

function atualizarLetreiroIndices() {
    const track = document.querySelector('.contadjus-indices-ticker-track');
    if (!track) return;

    const itens = obterUltimosIndicesParaLetreiro();
    const conteudo = '<span class="contadjus-indices-ticker-source">Últimos índices atualizados na base local:</span>'
        + itens.map(texto => `<span>${texto}</span>`).join('')
        + '<span class="contadjus-indices-ticker-source">Fonte: data/*.js • apenas informativo</span>';

    // Duplica a sequência para preservar o efeito contínuo do letreiro.
    track.innerHTML = conteudo + conteudo;
}

function initRelatorios() {
    // Configurar eventos da Guia 7 (já estão nos botões inline)
    // Nada mais necessário.
}

// Para compatibilidade, manter a função antiga como alias
function visualizarRelatorio() {
    exibirRelatorio();
}

function gerarRelatorioCompleto() {
    exibirRelatorio();
}
// =====================================================================
// RELATÓRIOS PROFISSIONAIS — FASE 1
// Central de seleção + relatório próprio da Guia 2.
// Não reutiliza a impressão da tela e não altera motores de cálculo.
// =====================================================================

function relatorioEscaparHtml(valor) {
    return String(valor ?? '')
        .replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function relatorioValorMoeda(valor) {
    // Aceita números e valores monetários digitados no padrão brasileiro.
    // Ex.: "1.200,00" -> 1200; 1200 -> 1200.
    if (typeof valor === 'number' && Number.isFinite(valor)) {
        return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    const texto = String(valor ?? '').trim();
    if (!texto) return '0,00';
    const normalizado = texto.replace(/R\$\s*/g, '').replace(/\./g, '').replace(',', '.');
    const n = Number(normalizado);
    return (Number.isFinite(n) ? n : 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function relatorioCampo(id, fallback='') {
    const el = document.getElementById(id);
    return el && String(el.value || '').trim() ? String(el.value).trim() : fallback;
}

function obterSelecaoRelatorios() {
    return Array.from(document.querySelectorAll('#guia-relatorios .relatorio-opcao input[type="checkbox"]'))
        .filter(el => el.checked && !el.disabled)
        .map(el => el.value);
}

function atualizarDisponibilidadeRelatoriosPorTipoAcao() {
    const tipo = document.getElementById('tipoAcao')?.value || 'previdenciaria';
    const previdenciaria = tipo === 'previdenciaria';
    const idsPrevid = ['relatorioSelecionarEvolucao', 'relatorioSelecionarBeneficios'];

    idsPrevid.forEach(id => {
        const input = document.getElementById(id);
        if (!input) return;
        const option = input.closest('.relatorio-opcao');
        input.disabled = !previdenciaria;
        if (!previdenciaria) {
            input.checked = false;
            option?.classList.add('is-disabled');
        } else {
            option?.classList.remove('is-disabled');
        }
    });

    const aviso = document.getElementById('avisoRelatoriosTipoAcao');
    if (aviso) {
        if (!previdenciaria) {
            aviso.classList.remove('hidden');
            aviso.textContent = 'As seções 2 — Evolução Devida e 3 — Benefícios Recebidos ficam indisponíveis porque esta ação não é previdenciária.';
        } else {
            aviso.classList.add('hidden');
            aviso.textContent = '';
        }
    }
}

function atualizarNavegacaoPorTipoAcao() {
    const tipo = document.getElementById('tipoAcao')?.value || 'previdenciaria';
    const previdenciaria = tipo === 'previdenciaria';
    ['evolucao-devida', 'beneficios-recebidos'].forEach(nome => {
        const btn = document.querySelector(`#navGuias button[data-guia="${nome}"]`);
        if (!btn) return;
        btn.style.display = previdenciaria ? '' : 'none';
    });
    atualizarDisponibilidadeRelatoriosPorTipoAcao();
}

function selecionarTodosRelatorios() {
    atualizarDisponibilidadeRelatoriosPorTipoAcao();
    document.querySelectorAll('#guia-relatorios .relatorio-opcao input[type="checkbox"]:not(:disabled), #guia-relatorios .relatorio-detalhamento-opcao input[type="checkbox"]:not(:disabled)').forEach(el => el.checked = true);
}

function limparSelecaoRelatorios() {
    document.querySelectorAll('#guia-relatorios .relatorio-opcao input[type="checkbox"]:not(:disabled), #guia-relatorios .relatorio-detalhamento-opcao input[type="checkbox"]:not(:disabled)').forEach(el => el.checked = false);
}

function montarCabecalhoRelatorioProfissional() {
    const processo = relatorioCampo('processo', 'Não informado');
    const autor = relatorioCampo('autor', 'Não informado');
    const reu = relatorioCampo('reu', 'Não informado');
    const dataCalculo = relatorioCampo('dataCalculo', relatorioCampo('dataAtualizacao', 'Não informado'));

    return `
        <div class="documento-cabecalho">
            <div class="marca-relatorio">
                <img src="assets/contadjus-logo-relatorio.png" alt="ContadJus — Liquidação de Sentenças" class="logo-relatorio" width="150" height="97" style="width:150px!important;height:auto!important;max-width:150px!important;display:block!important;object-fit:contain!important;">
            </div>
            <div class="titulo-area-relatorio">
                <div class="titulo-documento">RELATÓRIO DE CÁLCULO JUDICIAL</div>
                <div class="subtitulo-documento">Evolução Previdenciária — RGPS / INSS</div>
                <div class="data-emissao">Emissão: ${relatorioEscaparHtml(dataCalculo)}</div>
            </div>
        </div>
        <div class="identificacao-relatorio">
            <div><strong>Número do processo:</strong> ${relatorioEscaparHtml(processo)}</div>
            <div><strong>Nome da parte:</strong> ${relatorioEscaparHtml(autor)}</div>
            <div><strong>Nome do réu:</strong> ${relatorioEscaparHtml(reu)}</div>
            <div><strong>Data do cálculo:</strong> ${relatorioEscaparHtml(dataCalculo)}</div>
        </div>`;
}

function gerarSecaoEvolucaoRelatorioProfissional() {
    const memoria = Array.isArray(window.memoriaEvolucaoDevida) ? window.memoriaEvolucaoDevida : [];
    if (!memoria.length) {
        return `
            <section class="secao-relatorio">
                <h2>Resultado da Evolução Previdenciária</h2>
                <p class="nota-relatorio">Não há memória de cálculo disponível. Realize o cálculo da evolução do benefício devido antes de gerar este relatório.</p>
            </section>`;
    }

    const dib = document.getElementById('resDIB')?.textContent?.trim() || relatorioCampo('dib', '-');
    const rmi = document.getElementById('resRMI')?.textContent?.trim() || relatorioValorMoeda(relatorioCampo('rmi'));
    const dataFinal = document.getElementById('resDataFinal')?.textContent?.trim() || relatorioCampo('dataFinal', '-');
    const qtd = document.getElementById('resQtdReajustes')?.textContent?.trim() || '-';
    const rma = document.getElementById('resRMA')?.textContent?.trim() || 'R$ 0,00';

    const linhas = memoria.map(item => {
        const tipoInterno = item.tipo || '-';
        const tipo = tipoInterno === 'PRO RATA/FALLBACK' ? 'PRO RATA' : tipoInterno;
        const indice = item.indice === null || item.indice === undefined ? '-' : Number(item.indice).toFixed(4);
        const salario = relatorioValorMoeda(item.salarioMinimo);
        const teto = relatorioValorMoeda(item.teto);
        const teorico = relatorioValorMoeda(item.valorTeorico);
        const evoluido = relatorioValorMoeda(item.valorEvoluido);
        const final = relatorioValorMoeda(item.valorFinal);
        const status = item.status === 'LIMITADO_TETO' ? 'Teto' : item.status === 'SALARIO_MINIMO' ? 'Salário mínimo' : (item.status || 'Normal');
        return `<tr>
            <td>${relatorioEscaparHtml(item.competencia)}</td>
            <td>${relatorioEscaparHtml(tipo)}</td>
            <td class="num">${relatorioEscaparHtml(indice)}</td>
            <td class="num">${salario}</td>
            <td class="num">${teto}</td>
            <td>${relatorioEscaparHtml(status)}</td>
            <td class="num">${teorico}</td>
            <td class="num">${evoluido}</td>
            <td class="num">${final}</td>
        </tr>`;
    }).join('');

    return `
        <section class="secao-relatorio">
            <h2>Resultado da Evolução Previdenciária</h2>
            <div class="quadro-resumo">
                <div class="item"><span class="rotulo">DIB considerada</span><span class="valor">${relatorioEscaparHtml(dib)}</span></div>
                <div class="item"><span class="rotulo">RMI base</span><span class="valor">${relatorioEscaparHtml(rmi)}</span></div>
                <div class="item"><span class="rotulo">Competência final</span><span class="valor">${relatorioEscaparHtml(dataFinal)}</span></div>
                <div class="item"><span class="rotulo">Reajustes aplicados</span><span class="valor">${relatorioEscaparHtml(qtd)}</span></div>
            </div>
            <div class="resultado-destaque">
                <span class="label">Renda Mensal Atualizada (RMA)</span>
                <span class="valor">${relatorioEscaparHtml(rma)}</span>
            </div>
            <h3 class="memoria-titulo-relatorio">MEMÓRIA DA EVOLUÇÃO DO BENEFÍCIO DEVIDO</h3>
            <table class="tabela-evolucao-relatorio">
                <colgroup>
                    <col class="col-competencia">
                    <col class="col-tipo">
                    <col class="col-indice">
                    <col class="col-salario">
                    <col class="col-teto">
                    <col class="col-status">
                    <col class="col-teorico">
                    <col class="col-evoluido">
                    <col class="col-final">
                </colgroup>
                <thead><tr>
                    <th>Comp.</th><th>Tipo</th><th class="num">Índice</th><th class="num">Sal. mín.</th><th class="num">Teto</th><th>Status</th><th class="num">Vlr. teórico</th><th class="num">Vlr. evoluído</th><th class="num">Vlr. final</th>
                </tr></thead>
                <tbody>${linhas}</tbody>
            </table>
            <p class="nota-relatorio">Memória de cálculo reproduzida a partir dos resultados consolidados da evolução do benefício devido. O relatório apresenta os resultados já calculados pelo sistema e não realiza novo processamento dos valores.</p>
        </section>`;
}


function obterBeneficiosRecebidosParaRelatorio() {
    try {
        if (typeof coletarBeneficiosRecebidos === 'function') {
            return coletarBeneficiosRecebidos();
        }
    } catch (e) {
        console.warn('[RELATÓRIO GUIA 3] Não foi possível coletar benefícios:', e);
    }
    return [];
}

function gerarTabelaMemoriaBeneficioRecebido(memoria) {
    const linhasMemoria = Array.isArray(memoria) ? memoria : [];
    if (!linhasMemoria.length) {
        return '<p class="nota-relatorio">Nenhuma memória de evolução disponível para este benefício.</p>';
    }

    const linhas = [...linhasMemoria].sort((a, b) => {
        const [ma, aa] = String(a.competencia || '').split('/').map(Number);
        const [mb, ab] = String(b.competencia || '').split('/').map(Number);
        return (aa * 100 + ma) - (ab * 100 + mb);
    }).map(item => {
        const tipoInterno = item.tipo || '-';
        const tipo = tipoInterno === 'PRO RATA/FALLBACK' ? 'PRO RATA' : tipoInterno;
        const indice = item.indice === null || item.indice === undefined ? '-' : Number(item.indice).toFixed(4);
        const indiceTeto = item.indiceTeto === null || item.indiceTeto === undefined ? '-' : Number(item.indiceTeto).toFixed(5);
        const status = item.status === 'LIMITADO_TETO' ? 'Teto' : item.status === 'SALARIO_MINIMO' ? 'Salário mínimo' : item.status === 'PISO' ? 'Piso' : (item.status || 'Normal');
        return `<tr>
            <td>${relatorioEscaparHtml(item.competencia || '-')}</td>
            <td>${relatorioEscaparHtml(tipo)}</td>
            <td class="num">${relatorioEscaparHtml(indice)}</td>
            <td class="num">${relatorioValorMoeda(item.salarioMinimo)}</td>
            <td class="num">${relatorioValorMoeda(item.teto)}</td>
            <td class="num">${relatorioEscaparHtml(indiceTeto)}</td>
            <td>${relatorioEscaparHtml(status)}</td>
            <td class="num">${relatorioValorMoeda(item.valorTeorico)}</td>
            <td class="num">${relatorioValorMoeda(item.valorEvoluido)}</td>
            <td class="num">${relatorioValorMoeda(item.valorFinal)}</td>
        </tr>`;
    }).join('');

    return `<table class="tabela-evolucao-relatorio tabela-beneficio-recebido">
        <colgroup>
            <col class="col-competencia"><col class="col-tipo"><col class="col-indice">
            <col class="col-salario"><col class="col-teto"><col class="col-indice-teto">
            <col class="col-status"><col class="col-teorico"><col class="col-evoluido"><col class="col-final">
        </colgroup>
        <thead><tr>
            <th>Comp.</th><th>Tipo</th><th class="num">Índice</th><th class="num">Sal. mín.</th>
            <th class="num">Teto</th><th class="num">Índ. teto</th><th>Status</th>
            <th class="num">Vlr. teórico</th><th class="num">Vlr. evoluído</th><th class="num">Vlr. final</th>
        </tr></thead>
        <tbody>${linhas}</tbody>
    </table>`;
}

function gerarSecaoBeneficiosRecebidosRelatorioProfissional(continuaEmNovaPagina = false) {
    const beneficios = obterBeneficiosRecebidosParaRelatorio();
    const calculados = beneficios.filter(b => b && b.resultado && Array.isArray(b.resultado.memoria) && b.resultado.memoria.length);

    if (!beneficios.length) {
        return `<section class="secao-relatorio secao-beneficios-recebidos ${continuaEmNovaPagina ? 'continua-em-pagina' : ''}">
            <h2>Resultado da Evolução do Benefício Recebido</h2>
            <p class="nota-relatorio">Nenhum benefício recebido foi cadastrado.</p>
        </section>`;
    }

    if (!calculados.length) {
        return `<section class="secao-relatorio secao-beneficios-recebidos ${continuaEmNovaPagina ? 'continua-em-pagina' : ''}">
            <h2>Resultado da Evolução do Benefício Recebido</h2>
            <p class="nota-relatorio">Não há memória de evolução disponível. Calcule pelo menos um benefício recebido antes de gerar este relatório.</p>
        </section>`;
    }

    let html = `<section class="secao-relatorio secao-beneficios-recebidos ${continuaEmNovaPagina ? 'continua-em-pagina' : ''}">
        <h2>Resultado da Evolução do Benefício Recebido</h2>`;

    calculados.forEach((beneficio, index) => {
        const resultado = beneficio.resultado;
        const identificador = beneficio.identificador || `BEN-${index + 1}`;
        const nb = beneficio.nb || 'Não informado';
        const especie = beneficio.especie || 'Não informada';
        const tipo = beneficio.tipo || 'Previdenciário';
        const dib = beneficio.dib || '-';
        const dip = beneficio.dip || '-';
        const dcb = beneficio.dcb || '-';
        const rmi = relatorioValorMoeda(beneficio.rmi);
        const rma = relatorioValorMoeda(resultado.rmaFinal);
        const qtd = resultado.qtdReajustes ?? '-';
        const ultimoReajuste = resultado.ultimoReajuste || '-';
        const ultimoIndice = resultado.ultimoIndice === null || resultado.ultimoIndice === undefined ? '-' : Number(resultado.ultimoIndice).toFixed(4);
        const status = resultado.statusFinal === 'LIMITADO_TETO' ? 'TETO' : resultado.statusFinal === 'SALARIO_MINIMO' ? 'SALÁRIO MÍNIMO' : resultado.statusFinal === 'PISO' ? 'PISO' : (resultado.statusFinal || 'NORMAL');

        html += `<div class="bloco-beneficio-relatorio">
            <div class="beneficio-identificacao-relatorio">
                <div><span class="rotulo">Identificador</span><strong>${relatorioEscaparHtml(identificador)}</strong></div>
                <div><span class="rotulo">NB</span><strong>${relatorioEscaparHtml(nb)}</strong></div>
                <div><span class="rotulo">Espécie</span><strong>${relatorioEscaparHtml(especie)}</strong></div>
                <div><span class="rotulo">Tipo</span><strong>${relatorioEscaparHtml(tipo)}</strong></div>
                <div><span class="rotulo">DIB</span><strong>${relatorioEscaparHtml(dib)}</strong></div>
                <div><span class="rotulo">DIP</span><strong>${relatorioEscaparHtml(dip)}</strong></div>
                <div><span class="rotulo">DCB</span><strong>${relatorioEscaparHtml(dcb)}</strong></div>
                <div><span class="rotulo">RMI base</span><strong>R$ ${rmi}</strong></div>
            </div>

            <div class="quadro-resumo quadro-resumo-beneficio">
                <div class="item"><span class="rotulo">Reajustes aplicados</span><span class="valor">${relatorioEscaparHtml(String(qtd))}</span></div>
                <div class="item"><span class="rotulo">Último reajuste</span><span class="valor">${relatorioEscaparHtml(ultimoReajuste)}</span></div>
                <div class="item"><span class="rotulo">Último índice</span><span class="valor">${relatorioEscaparHtml(ultimoIndice)}</span></div>
                <div class="item"><span class="rotulo">Status final</span><span class="valor">${relatorioEscaparHtml(status)}</span></div>
            </div>

            <div class="resultado-destaque">
                <span class="label">Renda Mensal Atualizada (RMA) — benefício recebido</span>
                <span class="valor">R$ ${rma}</span>
            </div>

            <h3 class="memoria-titulo-relatorio">MEMÓRIA DA EVOLUÇÃO DO BENEFÍCIO RECEBIDO</h3>
            ${gerarTabelaMemoriaBeneficioRecebido(resultado.memoria)}
        </div>`;
    });

    html += `<p class="nota-relatorio">Memória da evolução do benefício recebido reproduzida a partir dos resultados consolidados do cálculo. O relatório apresenta os resultados já calculados pelo sistema e não realiza novo processamento dos valores.</p></section>`;
    return html;
}


function relatorioExtrairCelulaTabela(td) {
    if (!td) return '';
    const input = td.querySelector('input, textarea, select');
    if (input) {
        if (input.tagName === 'SELECT') {
            return input.options[input.selectedIndex]?.textContent?.trim() || '';
        }
        return String(input.value ?? '').trim();
    }
    return String(td.textContent ?? '').replace(/\s+/g, ' ').trim();
}

function gerarTabelaDiferencasRelatorioProfissional() {
    const tabela = document.getElementById('tabelaDiferencas');
    const tbody = document.getElementById('corpoDiferencas');
    if (!tabela || !tbody) return '';

    const headers = Array.from(tabela.querySelectorAll('thead th'))
        .map(th => String(th.textContent || '').replace(/\s+/g, ' ').trim());
    const rows = Array.from(tbody.querySelectorAll('tr'))
        .filter(tr => tr.querySelectorAll('td').length > 1);

    if (!headers.length || !rows.length) return '';

    const headerHtml = headers.map((h, i) =>
        `<th class="${i === 0 ? '' : 'num'}">${relatorioEscaparHtml(h)}</th>`
    ).join('');

    const bodyHtml = rows.map(tr => {
        const cells = Array.from(tr.querySelectorAll('td'));
        return `<tr>${cells.map((td, i) => {
            const valor = relatorioExtrairCelulaTabela(td);
            const classesOriginais = td.className || '';
            const classeTotalRecebido = /total-recebido/i.test(classesOriginais) ? ' total-recebido-relatorio' : '';
            const classeDiferenca = /diferenca-devida/i.test(classesOriginais) ? ' destaque-diferenca' : '';
            return `<td class="${i === 0 ? '' : 'num'}${classeTotalRecebido}${classeDiferenca}">${relatorioEscaparHtml(valor)}</td>`;
        }).join('')}</tr>`;
    }).join('');

    return `<div class="tabela-diferencas-relatorio-wrap">
        <table class="tabela-diferencas-relatorio">
            <thead><tr>${headerHtml}</tr></thead>
            <tbody>${bodyHtml}</tbody>
        </table>
    </div>`;
}

function gerarSecaoDiferencasRelatorioProfissional(continuaEmNovaPagina = false) {
    const tabela = document.getElementById('tabelaDiferencas');
    const tbody = document.getElementById('corpoDiferencas');
    const temLinhas = !!tbody && Array.from(tbody.querySelectorAll('tr')).some(tr => tr.querySelectorAll('td').length > 1);

    const termoInicial = relatorioCampo('termoInicialDiferencas', '-');
    const competenciaFinal = relatorioCampo('dataFinal', '-');
    const modo = document.querySelector('input[name="modoCompensacao"]:checked')?.value === 'negativo'
        ? 'Permitir diferença negativa'
        : 'Limitar ao valor devido';

    const totalDevido = document.getElementById('totalDevido')?.textContent?.trim() || 'R$ 0,00';
    const totalRecebido = document.getElementById('totalRecebido')?.textContent?.trim() || 'R$ 0,00';
    const diferencaTotal = document.getElementById('diferencaTotal')?.textContent?.trim() || 'R$ 0,00';
    const qtdCompetencias = document.getElementById('qtdCompetencias')?.textContent?.trim() || '0';
    const qtdEditadas = document.getElementById('qtdEditadas')?.textContent?.trim() || '0';

    if (!temLinhas) {
        return `<section class="secao-relatorio secao-diferencas-relatorio ${continuaEmNovaPagina ? 'continua-em-pagina' : ''}">
            <h2>Resultado das Diferenças</h2>
            <p class="nota-relatorio">Não há diferenças calculadas disponíveis. Calcule a evolução do benefício devido e dos benefícios recebidos e, em seguida, processe o demonstrativo das diferenças antes de gerar este relatório.</p>
        </section>`;
    }

    return `<section class="secao-relatorio secao-diferencas-relatorio ${continuaEmNovaPagina ? 'continua-em-pagina' : ''}">
        <h2>Resultado das Diferenças</h2>

        <div class="quadro-resumo quadro-resumo-diferencas">
            <div class="item"><span class="rotulo">Termo inicial</span><span class="valor">${relatorioEscaparHtml(termoInicial)}</span></div>
            <div class="item"><span class="rotulo">Competência final</span><span class="valor">${relatorioEscaparHtml(competenciaFinal)}</span></div>
            <div class="item"><span class="rotulo">Modo de compensação</span><span class="valor valor-menor">${relatorioEscaparHtml(modo)}</span></div>
            <div class="item"><span class="rotulo">Competências</span><span class="valor">${relatorioEscaparHtml(qtdCompetencias)}</span></div>
        </div>

        <div class="quadro-totais-diferencas">
            <div class="total"><span>Valor devido</span><strong>${relatorioEscaparHtml(totalDevido)}</strong></div>
            <div class="total"><span>Valor recebido</span><strong>${relatorioEscaparHtml(totalRecebido)}</strong></div>
            <div class="total principal"><span>Diferença total</span><strong>${relatorioEscaparHtml(diferencaTotal)}</strong></div>
        </div>

        ${gerarTabelaDiferencasRelatorioProfissional()}

        <div class="rodape-diferencas-relatorio">
            <span>Competências analisadas: ${relatorioEscaparHtml(qtdCompetencias)}</span>
            <span>Células editadas manualmente: ${relatorioEscaparHtml(qtdEditadas)}</span>
        </div>
        <p class="nota-relatorio">Demonstrativo das diferenças reproduzido a partir dos resultados consolidados do cálculo. O relatório apresenta os resultados já calculados pelo sistema e não realiza novo processamento dos valores.</p>
    </section>`;
}


function gerarTabelaAtualizacaoRelatorioProfissional() {
    const dados = Array.isArray(window.resultadosAtualizacao?.itens)
        ? window.resultadosAtualizacao.itens.slice()
        : [];

    if (!dados.length) {
        return '<p class="nota-relatorio">Não há memória de atualização disponível. Calcule a Guia 5 antes de gerar este relatório.</p>';
    }

    const numeroCompetencia = (comp) => {
        const texto = String(comp || '');
        const partes = texto.split('/');
        if (texto.indexOf('13º') === 0) return (Number(partes[1]) || 0) * 100 + 13;
        return (Number(partes[1]) || 0) * 100 + (Number(partes[0]) || 0);
    };

    dados.sort((a, b) => numeroCompetencia(a.competencia) - numeroCompetencia(b.competencia));

    let totalOriginal = 0;
    let totalCorrigido = 0;
    let totalJuros = 0;
    let totalSelic = 0;

    const linhas = dados.map(item => {
        const original = Number(item.diferenca) || 0;
        const corrigido = Number(item.valorCorrigido) || 0;
        const juros = Number(item.valorJuros) || 0;
        const selic = Number(item.valorSelic) || 0;
        const total = corrigido + juros + selic;
        totalOriginal += original;
        totalCorrigido += corrigido;
        totalJuros += juros;
        totalSelic += selic;

        // Mantém a mesma apuração de Taxa Legal exibida na Guia 5.
        let taxaLegalAcumulado = 0;
        if (Array.isArray(item.detalhamentoJuros)) {
            const compAtualNum = numeroCompetencia(item.competencia);
            const dataAtualizacaoISO = window.resultadosAtualizacao?.dataAtualizacaoISO || null;
            item.detalhamentoJuros.forEach(entry => {
                if (dataAtualizacaoISO && entry.competenciaISO === dataAtualizacaoISO) return;
                const entryNum = entry.competenciaISO ? numeroCompetencia(String(entry.competenciaISO).slice(5, 7) + '/' + String(entry.competenciaISO).slice(0, 4)) : 0;
                if ((entry.indice === 'TAXA_LEGAL' || entry.indice === 'TAXA_LEGAL_PREVIDENCIARIA') && entryNum >= compAtualNum) {
                    taxaLegalAcumulado += Number(entry.taxaPercentual) || 0;
                }
            });
        }

        return `<tr>
            <td>${relatorioEscaparHtml(item.competencia || '-')}</td>
            <td class="num">${relatorioValorMoeda(original)}</td>
            <td class="num">${item.coeficiente == null ? '-' : Number(item.coeficiente).toFixed(8)}</td>
            <td class="num">${relatorioValorMoeda(corrigido)}</td>
            <td class="num">${formatarPercentualRelatorio(item.percentualJurosAntesSelic)}</td>
            <td class="num">${taxaLegalAcumulado ? formatarPercentualRelatorio(taxaLegalAcumulado) : '-'}</td>
            <td class="num">${formatarPercentualRelatorio(item.percentualJurosTotal)}</td>
            <td class="num">${relatorioValorMoeda(juros)}</td>
            <td class="num">${formatarPercentualRelatorio(item.percentualSelic)}</td>
            <td class="num">${relatorioValorMoeda(selic)}</td>
            <td class="num total">${relatorioValorMoeda(total)}</td>
        </tr>`;
    }).join('');

    const totalGeral = totalCorrigido + totalJuros + totalSelic;
    return `<div class="tabela-atualizacao-relatorio-wrap">
        <div class="tabela-atualizacao-bloco-final">
        <table class="tabela-atualizacao-relatorio">
            <thead><tr>
                <th>Comp.</th>
                <th class="num">Dif. original</th>
                <th class="num">Coef.</th>
                <th class="num">Vlr. corrigido</th>
                <th class="num">% juros</th>
                <th class="num">Taxa Legal</th>
                <th class="num">% juros total</th>
                <th class="num">Juros de mora</th>
                <th class="num">% SELIC</th>
                <th class="num">SELIC</th>
                <th class="num">TOTAL</th>
            </tr></thead>
            <tbody>${linhas}</tbody>
        </table>
        <div class="tabela-atualizacao-totalizador" role="row">
            <div>TOTAIS</div>
            <div class="num">${relatorioValorMoeda(totalOriginal)}</div>
            <div></div>
            <div class="num">${relatorioValorMoeda(totalCorrigido)}</div>
            <div></div><div></div><div></div>
            <div class="num">${relatorioValorMoeda(totalJuros)}</div>
            <div></div>
            <div class="num">${relatorioValorMoeda(totalSelic)}</div>
            <div class="num total">${relatorioValorMoeda(totalGeral)}</div>
        </div>
        </div>
    </div>`;
}

function formatarPercentualRelatorio(valor) {
    const n = Number(valor);
    if (!Number.isFinite(n)) return '-';
    return n.toLocaleString('pt-BR', { minimumFractionDigits: 4, maximumFractionDigits: 4 }) + '%';
}

function gerarSecaoAtualizacaoRelatorioProfissional(continuaEmNovaPagina = false) {
    const g5 = window.resultadosAtualizacao;
    if (!g5 || !Array.isArray(g5.itens) || !g5.itens.length) {
        return `<section class="secao-relatorio secao-atualizacao-relatorio ${continuaEmNovaPagina ? 'continua-em-pagina' : ''}">
            <h2>Resultado da Atualização</h2>
            <p class="nota-relatorio">Não há memória de atualização disponível. Calcule a Guia 5 antes de gerar este relatório.</p>
        </section>`;
    }

    const dataAtualizacao = g5.dataAtualizacao || relatorioCampo('dataAtualizacao', '-');
    const parametrosCorrecao = g5.parametrosCorrecao?.nome || g5.parametrosCorrecao?.descricao || g5.parametrosCorrecao?.codigo || '-';
    const parametrosJuros = g5.parametrosJuros?.nome || g5.parametrosJuros?.descricao || g5.parametrosJuros?.codigo || '-';
    const qtd = g5.itens.length;
    const totalCorrigido = Number(g5.totalCorrigido) || 0;
    const totalJuros = Number(g5.totalJuros) || 0;
    const totalSelic = Number(g5.totalSelic) || 0;
    const totalGeral = totalCorrigido + totalJuros + totalSelic;

    return `<section class="secao-relatorio secao-atualizacao-relatorio ${continuaEmNovaPagina ? 'continua-em-pagina' : ''}">
        <h2>Resultado da Atualização</h2>

        <div class="quadro-resumo quadro-resumo-atualizacao">
            <div class="item"><span class="rotulo">Data de atualização</span><span class="valor">${relatorioEscaparHtml(dataAtualizacao)}</span></div>
            <div class="item"><span class="rotulo">Competências</span><span class="valor">${qtd}</span></div>
            <div class="item"><span class="rotulo">Correção monetária</span><span class="valor valor-menor">${relatorioEscaparHtml(parametrosCorrecao)}</span></div>
            <div class="item"><span class="rotulo">Juros</span><span class="valor valor-menor">${relatorioEscaparHtml(parametrosJuros)}</span></div>
        </div>

        <div class="quadro-totais-atualizacao">
            <div class="total"><span>Total corrigido</span><strong>R$ ${relatorioValorMoeda(totalCorrigido)}</strong></div>
            <div class="total"><span>Juros de mora</span><strong>R$ ${relatorioValorMoeda(totalJuros)}</strong></div>
            <div class="total"><span>SELIC</span><strong>R$ ${relatorioValorMoeda(totalSelic)}</strong></div>
            <div class="total principal"><span>Total geral atualizado</span><strong>R$ ${relatorioValorMoeda(totalGeral)}</strong></div>
        </div>

        <h3 class="memoria-titulo-relatorio">MEMÓRIA DA ATUALIZAÇÃO</h3>
        ${gerarTabelaAtualizacaoRelatorioProfissional()}
        <p class="nota-relatorio">Memória da atualização reproduzida a partir dos resultados consolidados da Guia 5. O relatório apresenta os resultados já calculados pelo sistema e não reexecuta o motor de atualização.</p>
    </section>`;
}


function relatorioTextoCampo(id, fallback = '-') {
    const el = document.getElementById(id);
    if (!el) return fallback;
    const bruto = (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT')
        ? (el.value ?? '')
        : (el.textContent ?? '');
    const texto = String(bruto).replace(/\s+/g, ' ').trim();
    return texto || fallback;
}

function relatorioValorComR$(valor) {
    const texto = String(valor ?? '').trim();
    if (!texto) return 'R$ 0,00';
    return /^R\$\s*/.test(texto) ? texto : `R$ ${texto}`;
}

function relatorioObterTipoRequisitorio() {
    const value = document.getElementById('tipoRequisitorio')?.value || 'ambos';
    const labels = { rpv: 'RPV', precatorio: 'Precatório', ambos: 'RPV / Precatório' };
    return labels[value] || value;
}

function relatorioClonarTabelaComConteudo(id, classe) {
    const tabela = document.getElementById(id);
    if (!tabela) return '';
    const clone = tabela.cloneNode(true);
    clone.removeAttribute('id');
    clone.className = classe || '';
    clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
    return clone.outerHTML;
}

function relatorioValorTabelaSemMoeda(valor) {
    return String(valor ?? '').replace(/R\$\s*/g, '').replace(/\s+/g, ' ').trim();
}

function gerarTabelaParcelasVencidasRenunciaRelatorio() {
    const tbodyOrig = document.getElementById('corpoMemoriaAjuizamento');
    if (!tbodyOrig || !tbodyOrig.rows.length) return '';

    const linhas = Array.from(tbodyOrig.rows).filter(tr => tr.cells.length >= 2);
    if (!linhas.length) return '';

    const headers = ['Competência', 'Valor original', 'Coef.', 'Corrigido', 'Juros', '% SELIC', 'SELIC', 'Total'];
    const body = linhas.map(tr => {
        const cells = Array.from(tr.cells);
        const vals = cells.slice(0, 8).map(td => relatorioValorTabelaSemMoeda(relatorioExtrairCelulaTabela(td)));
        return `<tr>${vals.map((v, i) => `<td class="${i === 0 ? '' : 'num'}">${relatorioEscaparHtml(v)}</td>`).join('')}</tr>`;
    }).join('');

    return `<div class="detalhamento-parcelas-renuncia">
        <h3 class="memoria-titulo-relatorio">PARCELAS VENCIDAS — ATÉ O AJUIZAMENTO</h3>
        <div class="tabela-relatorio-complementar-wrap tabela-renuncia-relatorio-wrap tabela-renuncia-vencidas-wrap">
            <table class="tabela-renuncia-relatorio tabela-renuncia-vencidas-relatorio">
                <thead><tr>${headers.map((h, i) => `<th class="${i === 0 ? '' : 'num'}">${relatorioEscaparHtml(h)}</th>`).join('')}</tr></thead>
                <tbody>${body}</tbody>
            </table>
        </div>
    </div>`;
}

function gerarTabelaParcelasVincendasRenunciaRelatorio() {
    const resultado = window.resultadoAjuizamento || {};
    const parcelas = Array.isArray(resultado.parcelasVincendas) ? resultado.parcelasVincendas : [];
    if (!parcelas.length) return '';

    const body = parcelas.map(parcela => {
        const valor = Number(parcela.valor) || 0;
        const competencia = String(parcela.competencia || '-');
        const inclui13 = parcela.inclui13 ? ' + 13º' : '';
        return `<tr>
            <td>${relatorioEscaparHtml(competencia)}</td>
            <td class="num">${relatorioEscaparHtml(relatorioValorMoeda(valor))}</td>
            <td class="num">1,000000</td>
            <td class="num">${relatorioEscaparHtml(relatorioValorMoeda(valor))}</td>
            <td class="num">0,00%</td>
            <td class="num">0,00</td>
            <td class="num">${relatorioEscaparHtml(relatorioValorMoeda(valor))}</td>
            <td>${relatorioEscaparHtml(inclui13 || '-')}</td>
        </tr>`;
    }).join('');

    const headers = ['Competência', 'Valor original', 'Coef.', 'Principal corrigido', '% SELIC', 'SELIC', 'Total', 'Observação'];
    return `<div class="detalhamento-parcelas-renuncia">
        <h3 class="memoria-titulo-relatorio">PARCELAS VINCENDAS — ATÉ 12 COMPETÊNCIAS</h3>
        <div class="tabela-relatorio-complementar-wrap tabela-renuncia-relatorio-wrap tabela-renuncia-vincendas-wrap">
            <table class="tabela-renuncia-relatorio tabela-renuncia-vincendas-relatorio">
                <thead><tr>${headers.map((h, i) => `<th class="${[1,2,3,4,5,6].includes(i) ? 'num' : ''}">${relatorioEscaparHtml(h)}</th>`).join('')}</tr></thead>
                <tbody>${body}</tbody>
            </table>
        </div>
    </div>`;
}

function gerarDetalhamentoParcelasRenunciaRelatorio() {
    const vencidas = gerarTabelaParcelasVencidasRenunciaRelatorio();
    const vincendas = gerarTabelaParcelasVincendasRenunciaRelatorio();
    if (!vencidas && !vincendas) return '';
    return `<div class="detalhamento-parcelas-renuncia-relatorio">${vencidas}${vincendas}</div>`;
}

function gerarSecaoRenunciaRelatorioProfissional(continuaEmNovaPagina = false) {
    const resultado = window.resultadoAtualizacaoRenuncia || {};
    const valorDemanda = relatorioTextoCampo('valorDemandaAjuizamento', 'R$ 0,00');
    const renuncia = relatorioTextoCampo('renunciaAjuizamento', 'R$ 0,00');
    const aposRenuncia = relatorioTextoCampo('valorAposRenuncia', 'R$ 0,00');
    const limite = relatorioTextoCampo('limiteJuizado', '-');
    const salario = relatorioTextoCampo('salarioMinimoAjuizamento', '-');
    const dataAjuizamento = relatorioTextoCampo('dataAjuizamentoGuia6', relatorioCampo('dataAjuizamento', '-'));
    const metodo = document.getElementById('metodoVincendas')?.selectedOptions?.[0]?.textContent?.trim() || '-';
    const tratamento = document.getElementById('tratamentoMesAjuizamento')?.selectedOptions?.[0]?.textContent?.trim() || '-';
    const incluir13 = document.getElementById('incluir13Vincendas')?.selectedOptions?.[0]?.textContent?.trim() || '-';
    const limitar = document.getElementById('limitarAoTeto')?.selectedOptions?.[0]?.textContent?.trim() || '-';

    const valorBaseAtualizado = relatorioTextoCampo('renunciaAjuizamento', 'R$ 0,00');
    const abatimento = relatorioTextoCampo('abatimentoRenunciaAtualizado', 'R$ 0,00');
    const totalApos = relatorioTextoCampo('totalGuia5AposRenuncia', 'R$ 0,00');
    const coeficiente = document.getElementById('coeficienteRenunciaAtualizacao')?.textContent?.trim()
        || (Number(resultado.coeficiente || 1).toFixed(6));

    let memoriaHtml = '';
    const tbody = document.getElementById('corpoAtualizacaoRenuncia');
    if (tbody && tbody.rows.length) {
        const tabela = tbody.closest('table');
        if (tabela) {
            const clone = tabela.cloneNode(true);
            clone.removeAttribute('id');
            clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
            memoriaHtml = `<h3 class="memoria-titulo-relatorio">MEMÓRIA DA ATUALIZAÇÃO DO VALOR RENUNCIADO</h3><div class="tabela-relatorio-complementar-wrap">${clone.outerHTML}</div>`;
        }
    }

    const acordoAtivo = resultado.acordoAtivo === true;
    const acordoTotal = relatorioTextoCampo('totalAposAcordo', 'R$ 0,00');
    const acordoPrincipal = relatorioTextoCampo('totalAposAcordoPrincipal', 'R$ 0,00');
    const acordoJuros = relatorioTextoCampo('totalAposAcordoJuros', 'R$ 0,00');
    const acordoSelic = relatorioTextoCampo('totalAposAcordoSelic', 'R$ 0,00');

    return `<section class="secao-relatorio secao-renuncia-relatorio ${continuaEmNovaPagina ? 'continua-em-pagina' : ''}">
        <h2>Resultado da Renúncia</h2>
        <div class="quadro-resumo quadro-resumo-renuncia">
            <div class="item"><span class="rotulo">Data do ajuizamento</span><span class="valor">${relatorioEscaparHtml(dataAjuizamento)}</span></div>
            <div class="item"><span class="rotulo">Método de vincendas</span><span class="valor valor-menor">${relatorioEscaparHtml(metodo)}</span></div>
            <div class="item"><span class="rotulo">Tratamento do mês</span><span class="valor valor-menor">${relatorioEscaparHtml(tratamento)}</span></div>
            <div class="item"><span class="rotulo">Incluir 13º nas vincendas</span><span class="valor valor-menor">${relatorioEscaparHtml(incluir13)}</span></div>
        </div>
        <div class="quadro-totais-atualizacao quadro-totais-renuncia">
            <div class="total"><span>Demanda no ajuizamento</span><strong>${relatorioEscaparHtml(valorDemanda)}</strong></div>
            <div class="total"><span>Limite do Juizado</span><strong>${relatorioEscaparHtml(limite)}</strong></div>
            <div class="total"><span>Renúncia no ajuizamento</span><strong>${relatorioEscaparHtml(renuncia)}</strong></div>
            <div class="total principal"><span>Valor após renúncia</span><strong>${relatorioEscaparHtml(aposRenuncia)}</strong></div>
        </div>
        <div class="quadro-resumo quadro-resumo-renuncia-secundario">
            <div class="item"><span class="rotulo">Limitar ao teto do Juizado</span><span class="valor">${relatorioEscaparHtml(limitar)}</span></div>
            <div class="item"><span class="rotulo">Salário mínimo do ajuizamento</span><span class="valor">${relatorioEscaparHtml(salario)}</span></div>
            <div class="item"><span class="rotulo">Valor renunciado atualizado</span><span class="valor">${relatorioEscaparHtml(abatimento)}</span></div>
            <div class="item"><span class="rotulo">Coeficiente de atualização</span><span class="valor">${relatorioEscaparHtml(coeficiente)}</span></div>
        </div>
        ${memoriaHtml}
        ${document.getElementById('relatorioIncluirParcelasRenuncia')?.checked ? gerarDetalhamentoParcelasRenunciaRelatorio() : ''}
        ${acordoAtivo ? `<div class="quadro-totais-atualizacao quadro-totais-renuncia">
            <div class="total"><span>Após acordo — principal</span><strong>${relatorioEscaparHtml(acordoPrincipal)}</strong></div>
            <div class="total"><span>Após acordo — juros</span><strong>${relatorioEscaparHtml(acordoJuros)}</strong></div>
            <div class="total"><span>Após acordo — SELIC</span><strong>${relatorioEscaparHtml(acordoSelic)}</strong></div>
            <div class="total principal"><span>Total após acordo</span><strong>${relatorioEscaparHtml(acordoTotal)}</strong></div>
        </div>` : ''}
        <p class="nota-relatorio">Dados da renúncia reproduzidos a partir dos resultados consolidados pelo sistema. O relatório não reexecuta o cálculo da formação da demanda nem da atualização do valor renunciado.</p>
    </section>`;
}

function gerarSecaoRequisitorioRelatorioProfissional(continuaEmNovaPagina = false) {
    const estado = window.estadoRequisitorio || {};
    const base = relatorioTextoCampo('reqInfoTotalBase', 'R$ 0,00');
    const principal = relatorioTextoCampo('reqInfoPrincipalBase', 'R$ 0,00');
    const juros = relatorioTextoCampo('reqInfoJurosBase', 'R$ 0,00');
    const selic = relatorioTextoCampo('reqInfoSelicBase', 'R$ 0,00');
    const salario = relatorioTextoCampo('salarioMinimoRequisitorio', 'R$ 0,00');
    const limite = relatorioTextoCampo('limite60SalariosRequisitorio', 'R$ 0,00');
    const dataBase = relatorioTextoCampo('dataBaseRequisitorio', relatorioCampo('dataAtualizacao', '-'));
    const rpvPrincipal = relatorioTextoCampo('rpvPrincipalRequisitorio', 'R$ 0,00');
    const rpvJuros = relatorioTextoCampo('rpvJurosRequisitorio', 'R$ 0,00');
    const rpvSelic = relatorioTextoCampo('rpvSelicRequisitorio', 'R$ 0,00');
    const rpvTotal = relatorioTextoCampo('rpvTotalRequisitorio', 'R$ 0,00');
    const precPrincipal = relatorioTextoCampo('precatorioPrincipalRequisitorio', 'R$ 0,00');
    const precJuros = relatorioTextoCampo('precatorioJurosRequisitorio', 'R$ 0,00');
    const precSelic = relatorioTextoCampo('precatorioSelicRequisitorio', 'R$ 0,00');
    const precTotal = relatorioTextoCampo('precatorioTotalRequisitorio', 'R$ 0,00');
    const sucumbencia = relatorioTextoCampo('valorSucumbenciaRequisitorio', 'R$ 0,00');
    const percentualSuc = relatorioTextoCampo('percentualAplicadoSucumbencia', '0,00%');
    const criterioSuc = document.getElementById('criterioSucumbencia')?.selectedOptions?.[0]?.textContent?.trim() || '-';
    const temSuc = document.getElementById('temSucumbencia')?.selectedOptions?.[0]?.textContent?.trim() || '-';
    const aplicarContrato = document.getElementById('aplicarHonorariosContratuais')?.selectedOptions?.[0]?.textContent?.trim() || '-';
    const tipo = relatorioObterTipoRequisitorio();

    let tabelaRpv = '';
    const tbodyRpv = document.getElementById('tabelaCalculoRpvRequisitorio');
    if (tbodyRpv && tbodyRpv.rows.length) {
        const tabela = tbodyRpv.closest('table');
        if (tabela) {
            const clone = tabela.cloneNode(true);
            clone.removeAttribute('id');
            clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
            tabelaRpv = `<h3 class="memoria-titulo-relatorio">CÁLCULO — RPV</h3><div class="tabela-relatorio-complementar-wrap requisitorio-tabela-wrap">${clone.outerHTML}</div>`;
        }
    }

    let tabelaPrec = '';
    const tbodyPrec = document.getElementById('tabelaCalculoPrecatorioRequisitorio');
    if (tbodyPrec && tbodyPrec.rows.length) {
        const tabela = tbodyPrec.closest('table');
        if (tabela) {
            const clone = tabela.cloneNode(true);
            clone.removeAttribute('id');
            clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
            tabelaPrec = `<h3 class="memoria-titulo-relatorio">CÁLCULO — PRECATÓRIO</h3><div class="tabela-relatorio-complementar-wrap requisitorio-tabela-wrap">${clone.outerHTML}</div>`;
        }
    }

    return `<section class="secao-relatorio secao-requisitorio-relatorio ${continuaEmNovaPagina ? 'continua-em-pagina' : ''}">
        <h2>Resultado do Requisitório</h2>
        <div class="quadro-resumo quadro-resumo-requisitorio">
            <div class="item"><span class="rotulo">Data-base</span><span class="valor">${relatorioEscaparHtml(dataBase)}</span></div>
            <div class="item"><span class="rotulo">Tipo de requisitório</span><span class="valor valor-menor">${relatorioEscaparHtml(tipo)}</span></div>
            <div class="item"><span class="rotulo">Salário mínimo</span><span class="valor">${relatorioEscaparHtml(salario)}</span></div>
            <div class="item"><span class="rotulo">Limite de 60 salários mínimos</span><span class="valor">${relatorioEscaparHtml(limite)}</span></div>
        </div>
        <div class="quadro-totais-atualizacao quadro-totais-requisitorio">
            <div class="total"><span>Principal da base</span><strong>${relatorioEscaparHtml(principal)}</strong></div>
            <div class="total"><span>Juros da base</span><strong>${relatorioEscaparHtml(juros)}</strong></div>
            <div class="total"><span>SELIC da base</span><strong>${relatorioEscaparHtml(selic)}</strong></div>
            <div class="total principal"><span>Total da base</span><strong>${relatorioEscaparHtml(base)}</strong></div>
        </div>
        <div class="quadro-totais-atualizacao quadro-totais-requisitorio">
            <div class="total"><span>RPV — principal</span><strong>${relatorioEscaparHtml(rpvPrincipal)}</strong></div>
            <div class="total"><span>RPV — juros</span><strong>${relatorioEscaparHtml(rpvJuros)}</strong></div>
            <div class="total"><span>RPV — SELIC</span><strong>${relatorioEscaparHtml(rpvSelic)}</strong></div>
            <div class="total principal"><span>RPV — total</span><strong>${relatorioEscaparHtml(rpvTotal)}</strong></div>
        </div>
        <div class="quadro-totais-atualizacao quadro-totais-requisitorio">
            <div class="total"><span>Precatório — principal</span><strong>${relatorioEscaparHtml(precPrincipal)}</strong></div>
            <div class="total"><span>Precatório — juros</span><strong>${relatorioEscaparHtml(precJuros)}</strong></div>
            <div class="total"><span>Precatório — SELIC</span><strong>${relatorioEscaparHtml(precSelic)}</strong></div>
            <div class="total principal"><span>Precatório — total</span><strong>${relatorioEscaparHtml(precTotal)}</strong></div>
        </div>
        <div class="quadro-resumo quadro-resumo-requisitorio-secundario">
            <div class="item"><span class="rotulo">Honorários contratuais</span><span class="valor">${relatorioEscaparHtml(aplicarContrato)}</span></div>
            <div class="item"><span class="rotulo">Sucumbência</span><span class="valor">${relatorioEscaparHtml(temSuc)}</span></div>
            <div class="item"><span class="rotulo">Base da sucumbência</span><span class="valor valor-menor">${relatorioEscaparHtml(criterioSuc)}</span></div>
            <div class="item"><span class="rotulo">Percentual aplicado</span><span class="valor">${relatorioEscaparHtml(percentualSuc)}</span></div>
        </div>
        <div class="quadro-totais-atualizacao quadro-totais-requisitorio">
            <div class="total principal"><span>Valor da sucumbência</span><strong>${relatorioEscaparHtml(sucumbencia)}</strong></div>
        </div>
        ${tabelaRpv}
        ${tabelaPrec}
        <p class="nota-relatorio">Dados do requisitório reproduzidos a partir dos resultados consolidados pelo sistema. O relatório não reexecuta o cálculo do requisitório nem dos honorários.</p>
    </section>`;
}

function gerarSecaoInformacoesComplementaresRelatorioProfissional(continuaEmNovaPagina = false) {
    const qtdEditadas = relatorioTextoCampo('qtdEditadas', '0');
    const alteradas = obterCompetenciasModificadasRelatorio();
    let detalhes = '';
    if (Array.isArray(alteradas) && alteradas.length) {
        detalhes = `<div class="tabela-relatorio-complementar-wrap"><table class="tabela-complementar-relatorio"><thead><tr><th>Competência</th><th>Valor original calculado</th><th>Valor utilizado</th></tr></thead><tbody>${alteradas.map(item => `<tr><td>${relatorioEscaparHtml(item.comp || '-')}</td><td class="num">${relatorioValorMoeda(item.valorOriginal)}</td><td class="num">${relatorioValorMoeda(item.valorEditado)}</td></tr>`).join('')}</tbody></table></div>`;
    }
    return `<section class="secao-relatorio secao-informacoes-complementares-relatorio ${continuaEmNovaPagina ? 'continua-em-pagina' : ''}">
        <h2>Informações Complementares</h2>
        <div class="quadro-resumo quadro-resumo-requisitorio-secundario">
            <div class="item"><span class="rotulo">Células editadas manualmente</span><span class="valor">${relatorioEscaparHtml(qtdEditadas)}</span></div>
        </div>
        ${detalhes || '<p class="nota-relatorio">Não há alterações manuais registradas no demonstrativo das diferenças.</p>'}
        <p class="nota-relatorio">Informações complementares reproduzidas a partir dos registros disponíveis no sistema. Esta seção é informativa e não altera os resultados dos cálculos.</p>
    </section>`;
}

function gerarRelatorioFinal() {
    atualizarNavegacaoPorTipoAcao();
    const selecoes = obterSelecaoRelatorios();
    const preview = document.getElementById('previewRelatorio');
    if (!preview) return;

    if (!selecoes.length) {
        preview.innerHTML = '<div class="relatorio-placeholder">Nenhuma seção foi selecionada.</div>';
        return;
    }

    let html = montarCabecalhoRelatorioProfissional();
    const temEvolucao = selecoes.includes('evolucao-devida');
    const temBeneficios = selecoes.includes('beneficios-recebidos');
    const temDiferencas = selecoes.includes('diferencas');
    const temAtualizacao = selecoes.includes('atualizacao');
    const temRenuncia = selecoes.includes('renuncia');
    const temRequisitorio = selecoes.includes('requisitorio');
    const temComplementares = selecoes.includes('relatorios');

    if (temEvolucao) html += gerarSecaoEvolucaoRelatorioProfissional();
    if (temBeneficios) html += gerarSecaoBeneficiosRecebidosRelatorioProfissional(temEvolucao);
    if (temDiferencas) html += gerarSecaoDiferencasRelatorioProfissional(temEvolucao || temBeneficios);
    if (temAtualizacao) html += gerarSecaoAtualizacaoRelatorioProfissional(temEvolucao || temBeneficios || temDiferencas);
    if (temRenuncia) html += gerarSecaoRenunciaRelatorioProfissional(temEvolucao || temBeneficios || temDiferencas || temAtualizacao);
    if (temRequisitorio) html += gerarSecaoRequisitorioRelatorioProfissional(temEvolucao || temBeneficios || temDiferencas || temAtualizacao || temRenuncia);
    if (temComplementares) html += gerarSecaoInformacoesComplementaresRelatorioProfissional(temEvolucao || temBeneficios || temDiferencas || temAtualizacao || temRenuncia || temRequisitorio);

    const naoImplementadas = [];
    if (naoImplementadas.length) {
        // Aviso apenas na interface. Não entra no documento impresso.
        html += `<div class="no-print relatorio-aviso"><strong>Fase 1:</strong> as seções selecionadas das Guias 5 a 8 ainda serão incorporadas às próximas fases.</div>`;
    }
    preview.innerHTML = html;
    aplicarContainersRecolhiveisRelatorio(preview);
}

function aplicarContainersRecolhiveisRelatorio(preview) {
    if (!preview) return;
    preview.querySelectorAll('details.relatorio-secao-recolhivel').forEach(el => el.remove());

    const secoes = Array.from(preview.querySelectorAll(':scope > section.secao-relatorio'));
    secoes.forEach(secao => {
        const titulo = secao.querySelector(':scope > h2')?.textContent?.trim() || 'Seção do relatório';
        const details = document.createElement('details');
        details.className = 'relatorio-secao-recolhivel';
        if (secao.classList.contains('continua-em-pagina')) {
            details.classList.add('continua-em-pagina-wrapper');
        }
        details.open = true;
        const summary = document.createElement('summary');
        summary.innerHTML = `<span>${relatorioEscaparHtml(titulo)}</span><span class="relatorio-secao-chevron" aria-hidden="true">⌄</span>`;
        details.appendChild(summary);
        secao.parentNode.insertBefore(details, secao);
        details.appendChild(secao);
    });
}

function paginarMemoriaAtualizacaoParaImpressao(portal, maxLinhas = 28) {
    if (!portal) return;

    const tabelaOriginal = portal.querySelector('table.tabela-atualizacao-relatorio');
    if (!tabelaOriginal) return;

    const tbody = tabelaOriginal.tBodies?.[0];
    if (!tbody) return;

    const linhas = Array.from(tbody.rows);
    if (linhas.length <= maxLinhas) return;

    const wrapOriginal = tabelaOriginal.closest('.tabela-atualizacao-relatorio-wrap');
    if (!wrapOriginal) return;

    const totalizadorOriginal = wrapOriginal.querySelector('.tabela-atualizacao-totalizador');
    const fragmento = document.createDocumentFragment();
    const quantidadeBlocos = Math.ceil(linhas.length / maxLinhas);

    for (let inicio = 0, bloco = 0; inicio < linhas.length; inicio += maxLinhas, bloco++) {
        const tabela = tabelaOriginal.cloneNode(false);
        const thead = tabelaOriginal.tHead?.cloneNode(true);
        const novoTbody = document.createElement('tbody');
        const fim = Math.min(inicio + maxLinhas, linhas.length);

        if (thead) tabela.appendChild(thead);
        linhas.slice(inicio, fim).forEach(linha => novoTbody.appendChild(linha.cloneNode(true)));
        tabela.appendChild(novoTbody);

        const novoWrap = document.createElement('div');
        novoWrap.className = 'tabela-atualizacao-relatorio-wrap tabela-atualizacao-pagina';
        novoWrap.appendChild(tabela);

        if (bloco === quantidadeBlocos - 1 && totalizadorOriginal) {
            novoWrap.appendChild(totalizadorOriginal.cloneNode(true));
        }

        fragmento.appendChild(novoWrap);

        if (bloco < quantidadeBlocos - 1) {
            const quebra = document.createElement('div');
            quebra.className = 'quebra-pagina-atualizacao';
            quebra.setAttribute('aria-hidden', 'true');
            fragmento.appendChild(quebra);
        }
    }

    wrapOriginal.replaceWith(fragmento);
}

function normalizarTabelasRequisitorioParaImpressao(portal) {
    if (!portal) return;
    portal.querySelectorAll('.secao-requisitorio-relatorio .requisitorio-tabela-wrap td').forEach(td => {
        td.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                node.nodeValue = node.nodeValue.replace(/R\$\s*/g, '');
            }
        });
        td.querySelectorAll('*').forEach(el => {
            if (el.childNodes.length === 1 && el.firstChild.nodeType === Node.TEXT_NODE) {
                el.firstChild.nodeValue = el.firstChild.nodeValue.replace(/R\$\s*/g, '');
            }
        });
    });
}

function normalizarTabelasRenunciaParaImpressao(portal) {
    if (!portal) return;
    portal.querySelectorAll('.secao-renuncia-relatorio .tabela-renuncia-relatorio td').forEach(td => {
        td.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                node.nodeValue = node.nodeValue.replace(/R\$\s*/g, '');
            }
        });
        td.querySelectorAll('*').forEach(el => {
            if (el.childNodes.length === 1 && el.firstChild.nodeType === Node.TEXT_NODE) {
                el.firstChild.nodeValue = el.firstChild.nodeValue.replace(/R\$\s*/g, '');
            }
        });
    });
}

function paginarTabelasRenunciaParaImpressao(portal, maxLinhas = 28) {
    if (!portal) return;

    portal.querySelectorAll('.tabela-renuncia-relatorio').forEach((tabelaOriginal) => {
        const tbody = tabelaOriginal.tBodies?.[0];
        if (!tbody) return;
        const linhas = Array.from(tbody.rows);
        if (linhas.length <= maxLinhas) return;

        const wrapOriginal = tabelaOriginal.closest('.tabela-renuncia-relatorio-wrap');
        if (!wrapOriginal) return;

        const fragmento = document.createDocumentFragment();
        const quantidadeBlocos = Math.ceil(linhas.length / maxLinhas);

        for (let inicio = 0, bloco = 0; inicio < linhas.length; inicio += maxLinhas, bloco++) {
            const tabela = tabelaOriginal.cloneNode(false);
            const thead = tabelaOriginal.tHead?.cloneNode(true);
            const novoTbody = document.createElement('tbody');
            const fim = Math.min(inicio + maxLinhas, linhas.length);
            if (thead) tabela.appendChild(thead);
            linhas.slice(inicio, fim).forEach(linha => novoTbody.appendChild(linha.cloneNode(true)));
            tabela.appendChild(novoTbody);

            const novoWrap = document.createElement('div');
            novoWrap.className = wrapOriginal.className + ' tabela-renuncia-pagina';
            novoWrap.appendChild(tabela);
            fragmento.appendChild(novoWrap);

            if (bloco < quantidadeBlocos - 1) {
                const quebra = document.createElement('div');
                quebra.className = 'quebra-pagina-renuncia';
                quebra.setAttribute('aria-hidden', 'true');
                fragmento.appendChild(quebra);
            }
        }
        wrapOriginal.replaceWith(fragmento);
    });
}

function imprimirRelatorioProfissional() {
    const preview = document.getElementById('previewRelatorio');
    if (!preview || preview.querySelector('.relatorio-placeholder')) {
        gerarRelatorioFinal();
    }
    const atual = document.getElementById('previewRelatorio');
    if (!atual) return;
    const portalAnterior = document.getElementById('relatorioImpressaoPortal');
    portalAnterior?.remove();
    const portal = document.createElement('div');
    portal.id = 'relatorioImpressaoPortal';
    // O preview possui a classe relatorio-documento no próprio container.
    // Ao copiar apenas o innerHTML para o portal de impressão essa classe era perdida,
    // fazendo todo o CSS profissional do relatório deixar de ser aplicado no PDF.
    portal.className = 'relatorio-documento';
    portal.innerHTML = atual.innerHTML;
    portal.querySelectorAll('details.relatorio-secao-recolhivel').forEach(details => {
        details.open = true;
    });

    // B107 — na impressão, a Memória da Atualização é dividida em blocos de
    // no máximo 28 linhas. O cabeçalho é repetido e o totalizador fica apenas
    // no último bloco. A tabela da tela e os dados calculados permanecem intactos.
    // B107 — detalhamentos novos da Guia 6 seguem a mesma linguagem de tabela
    // e a mesma paginação segura, sem alterar a apresentação dos relatórios anteriores.
    normalizarTabelasRequisitorioParaImpressao(portal);
    normalizarTabelasRenunciaParaImpressao(portal);

    // O PDF não utiliza rodapé institucional fixo; isso evita sobreposição do conteúdo.

    document.body.appendChild(portal);
    window.print();
    setTimeout(() => portal.remove(), 1000);
}

// Atualiza a disponibilidade sem interferir nos cálculos.
document.addEventListener('DOMContentLoaded', () => {
    atualizarNavegacaoPorTipoAcao();
    atualizarLetreiroIndices();
});
