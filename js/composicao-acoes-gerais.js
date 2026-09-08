// =====================================================================
// CONTADJUS 2.0A — COMPOSIÇÃO DAS PARCELAS (AÇÕES CONDENATÓRIAS)
// Isolado do motor previdenciário.
// =====================================================================

(function () {
    const MAX_COLUNAS = 6;
    let estado = {
        colunas: [{ id: 'valor-1', nome: 'Valor', tipo: 'credito' }],
        linhas: [{ competencia: '', valores: { 'valor-1': '' }, fontes: { 'valor-1': null } }]
    };
    let faixasLote = [{ id: novoId('faixa'), de: '', ate: '', colunaId: 'valor-1', valor: '' }];

    function novoId(prefixo) {
        return prefixo + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);
    }

    function parseNumero(valor) {
        if (typeof valor === 'number') return isFinite(valor) ? valor : 0;
        let s = String(valor ?? '').trim();
        if (!s) return 0;
        s = s.replace(/R\$\s?/g, '').replace(/\./g, '').replace(',', '.').replace(/[^0-9.-]/g, '');
        const n = Number(s);
        return isFinite(n) ? n : 0;
    }

    function formatarMoeda(valor) {
        return Number(valor || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function valorLinha(linha) {
        return estado.colunas.reduce((total, coluna) => {
            const valor = parseNumero(linha.valores?.[coluna.id]);
            return total + (coluna.tipo === 'debito' ? -valor : valor);
        }, 0);
    }

    function colunaTemValor(id) {
        return estado.linhas.some(linha => String(linha.valores?.[id] ?? '').trim() !== '');
    }

    function renderizar() {
        const container = document.getElementById('composicaoAcoesGerais');
        if (!container) return;
        const tabela = container.querySelector('#tabelaComposicaoAcoesGerais');
        if (!tabela) return;
        const thead = tabela.querySelector('thead');
        const tbody = tabela.querySelector('tbody');

        thead.innerHTML = `
            <tr>
                <th class="cag-th cag-comp-col">Competência</th>
                ${estado.colunas.map(col => `
                    <th class="cag-th cag-value-col">
                        <div class="cag-header-editor">
                            <input class="cag-column-name" data-col-id="${col.id}" value="${escapeHtml(col.nome)}" aria-label="Nome da coluna">
                            <div class="cag-column-controls">
                                <select class="cag-column-type" data-col-id="${col.id}" aria-label="Tipo da coluna">
                                    <option value="credito" ${col.tipo === 'credito' ? 'selected' : ''}>Crédito (+)</option>
                                    <option value="debito" ${col.tipo === 'debito' ? 'selected' : ''}>Débito (−)</option>
                                </select>
                                <button type="button" class="cag-remove-col" data-col-id="${col.id}" title="Excluir coluna">×</button>
                            </div>
                        </div>
                    </th>`).join('')}
                <th class="cag-th cag-total-col">Total Devido</th>
            </tr>`;

        tbody.innerHTML = estado.linhas.map((linha, idx) => `
            <tr data-row-index="${idx}">
                <td class="cag-td cag-comp-col">
                    <input class="cag-cell cag-competencia" value="${escapeHtml(linha.competencia || '')}" placeholder="MM/AAAA" maxlength="7" data-row="${idx}">
                </td>
                ${estado.colunas.map(col => `
                    <td class="cag-td cag-value-col">
                        <input class="cag-cell cag-valor ${col.tipo === 'debito' ? 'cag-cell-debito' : 'cag-cell-credito'}" inputmode="decimal" value="${escapeHtml(linha.valores?.[col.id] ?? '')}" placeholder="0,00" data-row="${idx}" data-col-id="${col.id}">
                    </td>`).join('')}
                <td class="cag-td cag-total-col cag-total-cell">R$ ${formatarMoeda(valorLinha(linha))}</td>
            </tr>`).join('');

        atualizarResumo();
    }

    function atualizarResumo() {
        const el = document.getElementById('cagResumo');
        if (!el) return;
        const total = estado.linhas.reduce((soma, linha) => soma + valorLinha(linha), 0);
        const preenchidas = estado.linhas.filter(l => l.competencia || estado.colunas.some(c => String(l.valores?.[c.id] ?? '').trim() !== '')).length;
        el.textContent = `${preenchidas} competência(s) • ${estado.colunas.length}/6 colunas de composição • Total: R$ ${formatarMoeda(total)}`;
    }

    function atualizarLinha(rowIndex) {
        const tr = document.querySelector(`#tabelaComposicaoAcoesGerais tbody tr[data-row-index="${rowIndex}"]`);
        if (!tr) return;
        const celula = tr.querySelector('.cag-total-cell');
        if (celula) celula.textContent = 'R$ ' + formatarMoeda(valorLinha(estado.linhas[rowIndex]));
        atualizarResumo();
    }

    function escapeHtml(v) {
        return String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
    }

    function adicionarLinha() {
        const valores = {};
        estado.colunas.forEach(col => valores[col.id] = '');
        const fontes = {}; estado.colunas.forEach(col => fontes[col.id] = null);
        estado.linhas.push({ competencia: '', valores, fontes });
        renderizar();
        const inputs = document.querySelectorAll('#tabelaComposicaoAcoesGerais .cag-competencia');
        inputs[inputs.length - 1]?.focus();
    }

    function removerLinha() {
        if (estado.linhas.length <= 1) {
            estado.linhas[0] = { competencia: '', valores: Object.fromEntries(estado.colunas.map(c => [c.id, ''])), fontes: Object.fromEntries(estado.colunas.map(c => [c.id, null])) };
        } else {
            estado.linhas.pop();
        }
        renderizar();
    }

    function adicionarColuna() {
        if (estado.colunas.length >= MAX_COLUNAS) {
            alert('O limite é de 6 colunas de composição.');
            return;
        }
        const id = novoId('valor');
        estado.colunas.push({ id, nome: `Valor ${estado.colunas.length + 1}`, tipo: 'credito' });
        estado.linhas.forEach(linha => { linha.valores[id] = ''; if (!linha.fontes) linha.fontes = {}; linha.fontes[id] = null; });
        renderizar();
        renderizarFaixasLote();
    }

    function removerColuna(id) {
        if (estado.colunas.length <= 1) {
            alert('A tabela precisa manter pelo menos uma coluna de composição.');
            return;
        }
        estado.colunas = estado.colunas.filter(col => col.id !== id);
        estado.linhas.forEach(linha => { if (linha.valores) delete linha.valores[id]; if (linha.fontes) delete linha.fontes[id]; });
        faixasLote.forEach(faixa => { if (faixa.colunaId === id) faixa.colunaId = estado.colunas[0]?.id || ''; });
        renderizar();
        renderizarFaixasLote();
    }

    function obterDados() {
        return JSON.parse(JSON.stringify(estado));
    }

    function definirDados(dados) {
        if (!dados || !Array.isArray(dados.colunas) || !Array.isArray(dados.linhas) || !dados.colunas.length) return;
        const colunas = dados.colunas.slice(0, MAX_COLUNAS).map((c, i) => ({
            id: c.id || novoId('valor'),
            nome: c.nome || `Valor ${i + 1}`,
            tipo: c.tipo === 'debito' ? 'debito' : 'credito'
        }));
        const ids = new Set(colunas.map(c => c.id));
        const linhas = dados.linhas.map(l => ({
            competencia: l.competencia || '',
            valores: Object.fromEntries(colunas.map(c => [c.id, ids.has(c.id) ? (l.valores?.[c.id] ?? '') : ''])),
            fontes: Object.fromEntries(colunas.map(c => [c.id, l.fontes?.[c.id] ?? null]))
        }));
        estado = { colunas, linhas: linhas.length ? linhas : [{ competencia: '', valores: Object.fromEntries(colunas.map(c => [c.id, ''])) }] };
        faixasLote = [{ id: novoId('faixa'), de: '', ate: '', colunaId: colunas[0].id, valor: '' }];
        renderizar();
        renderizarFaixasLote();
    }

    function coletarParaAtualizacao() {
        return estado.linhas.map(linha => ({
            competencia: String(linha.competencia || '').trim(),
            diferenca: Number(valorLinha(linha).toFixed(2))
        })).filter(item => item.competencia && item.diferenca !== 0);
    }

    function normalizarCompetencia(valor) {
        const m = String(valor ?? '').trim().match(/^(\d{1,2})\s*\/\s*(\d{4})$/);
        if (!m) return null;
        const mes = Number(m[1]);
        const ano = Number(m[2]);
        if (mes < 1 || mes > 12) return null;
        return `${String(mes).padStart(2, '0')}/${ano}`;
    }

    function competenciaParaNumero(comp) {
        const c = normalizarCompetencia(comp);
        if (!c) return null;
        const [mes, ano] = c.split('/').map(Number);
        return ano * 12 + (mes - 1);
    }

    function gerarCompetencias(de, ate) {
        const inicio = competenciaParaNumero(de);
        const fim = competenciaParaNumero(ate);
        if (inicio === null || fim === null || inicio > fim) return [];
        const resultado = [];
        for (let n = inicio; n <= fim; n++) {
            const ano = Math.floor(n / 12);
            const mes = (n % 12) + 1;
            resultado.push(`${String(mes).padStart(2, '0')}/${ano}`);
        }
        return resultado;
    }

    function renderizarFaixasLote() {
        const container = document.getElementById('cagFaixasLote');
        if (!container) return;
        container.innerHTML = faixasLote.map((faixa, idx) => `
            <div class="cag-lote-row" data-lote-index="${idx}">
                <div class="cag-lote-field cag-lote-periodo">
                    <label>De</label>
                    <input type="text" class="cag-lote-input cag-lote-de" placeholder="MM/AAAA" maxlength="7" value="${escapeHtml(faixa.de)}" data-lote-index="${idx}">
                </div>
                <span class="cag-lote-separador">até</span>
                <div class="cag-lote-field cag-lote-periodo">
                    <label>Até</label>
                    <input type="text" class="cag-lote-input cag-lote-ate" placeholder="MM/AAAA" maxlength="7" value="${escapeHtml(faixa.ate)}" data-lote-index="${idx}">
                </div>
                <div class="cag-lote-field cag-lote-coluna">
                    <label>Coluna</label>
                    <select class="cag-lote-input cag-lote-coluna-select" data-lote-index="${idx}">
                        ${estado.colunas.map(col => `<option value="${escapeHtml(col.id)}" ${faixa.colunaId === col.id ? 'selected' : ''}>${escapeHtml(col.nome)} ${col.tipo === 'debito' ? '−' : '+'}</option>`).join('')}
                    </select>
                </div>
                <div class="cag-lote-field cag-lote-sinal">
                    <label>Sinal da coluna</label>
                    <select class="cag-lote-input cag-lote-tipo" data-lote-index="${idx}">
                        <option value="credito" ${estado.colunas.find(c => c.id === faixa.colunaId)?.tipo !== 'debito' ? 'selected' : ''}>Crédito (+)</option>
                        <option value="debito" ${estado.colunas.find(c => c.id === faixa.colunaId)?.tipo === 'debito' ? 'selected' : ''}>Débito (−)</option>
                    </select>
                </div>
                <div class="cag-lote-field cag-lote-valor">
                    <label>Valor mensal</label>
                    <input type="text" class="cag-lote-input cag-lote-valor-input" inputmode="decimal" placeholder="0,00" value="${escapeHtml(faixa.valor)}" data-lote-index="${idx}">
                </div>
                <button type="button" class="cag-lote-remover" data-lote-index="${idx}" title="Remover faixa" ${faixasLote.length === 1 ? 'disabled' : ''}>×</button>
            </div>
        `).join('');
    }

    function adicionarFaixaLote() {
        faixasLote.push({ id: novoId('faixa'), de: '', ate: '', colunaId: estado.colunas[0]?.id || '', valor: '' });
        renderizarFaixasLote();
        const inputs = document.querySelectorAll('.cag-lote-de');
        inputs[inputs.length - 1]?.focus();
    }

    function removerFaixaLote(idx) {
        if (faixasLote.length <= 1) return;
        const faixa = faixasLote[idx];
        if (!faixa) return;
        const teveAplicacao = estado.linhas.some(l => Object.values(l.fontes || {}).some(origem => origem === faixa.id));
        if (teveAplicacao) {
            const confirmar = confirm('Esta faixa já foi aplicada. Excluir a faixa e também remover os valores que foram preenchidos por ela?\n\nValores que você alterou manualmente serão preservados.');
            if (!confirmar) return;
            estado.linhas.forEach(linha => {
                if (!linha.fontes) linha.fontes = {};
                if (linha.fontes[faixa.colunaId] === faixa.id) {
                    linha.valores[faixa.colunaId] = '';
                    linha.fontes[faixa.colunaId] = null;
                }
            });
            renderizar();
        }
        faixasLote.splice(idx, 1);
        renderizarFaixasLote();
    }

    function aplicarPreenchimentoLote() {
        const regrasValidas = [];
        for (let i = 0; i < faixasLote.length; i++) {
            const faixa = faixasLote[i];
            const de = normalizarCompetencia(faixa.de);
            const ate = normalizarCompetencia(faixa.ate);
            if (!de && !ate && String(faixa.valor).trim() === '') continue;
            if (!de || !ate) {
                alert(`Preenchimento em lote — faixa ${i + 1}: informe corretamente as competências inicial e final.`);
                return;
            }
            const competencias = gerarCompetencias(de, ate);
            if (!competencias.length) {
                alert(`Preenchimento em lote — faixa ${i + 1}: a competência inicial deve ser anterior ou igual à final.`);
                return;
            }
            if (!faixa.colunaId || !estado.colunas.some(c => c.id === faixa.colunaId)) {
                alert(`Preenchimento em lote — faixa ${i + 1}: selecione uma coluna válida.`);
                return;
            }
            if (String(faixa.valor).trim() === '') {
                alert(`Preenchimento em lote — faixa ${i + 1}: informe o valor mensal.`);
                return;
            }
            regrasValidas.push({ id: faixa.id, de, ate, competencias, colunaId: faixa.colunaId, valor: String(faixa.valor).trim() });
        }
        if (!regrasValidas.length) {
            alert('Informe pelo menos uma faixa para o preenchimento em lote.');
            return;
        }

        // Cria as competências necessárias sem apagar dados já digitados.
        const mapa = new Map();
        estado.linhas.forEach(linha => {
            const c = normalizarCompetencia(linha.competencia);
            if (c) mapa.set(c, linha);
        });
        regrasValidas.forEach(regra => {
            regra.competencias.forEach(comp => {
                if (!mapa.has(comp)) {
                    const valores = {};
                    estado.colunas.forEach(col => valores[col.id] = '');
                    const linha = { competencia: comp, valores, fontes: Object.fromEntries(estado.colunas.map(col => [col.id, null])) };
                    estado.linhas.push(linha);
                    mapa.set(comp, linha);
                }
                mapa.get(comp).competencia = comp;
                mapa.get(comp).valores[regra.colunaId] = regra.valor;
                if (!mapa.get(comp).fontes) mapa.get(comp).fontes = {};
                mapa.get(comp).fontes[regra.colunaId] = regra.id;
            });
        });

        // Mantém a tabela em ordem cronológica, deixando a linha vazia por último.
        estado.linhas.sort((a, b) => {
            const na = competenciaParaNumero(a.competencia);
            const nb = competenciaParaNumero(b.competencia);
            if (na === null && nb === null) return 0;
            if (na === null) return 1;
            if (nb === null) return -1;
            return na - nb;
        });

        renderizar();
        renderizarFaixasLote();
    }

    // ================================================================
    // Importação por colagem de planilha — prévia + mapeamento + confirmação
    // ================================================================
    let importacaoPlanilha = null;

    function normalizarCabecalho(v) {
        return String(v ?? '').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    function analisarColagem(texto) {
        const linhasBrutas = String(texto ?? '').replace(/\r/g, '').split('\n').filter(l => l.trim() !== '');
        if (!linhasBrutas.length) return null;
        const matriz = linhasBrutas.map(l => l.split('\t'));
        const qtd = Math.max(...matriz.map(l => l.length));
        matriz.forEach(l => { while (l.length < qtd) l.push(''); });
        const primeira = matriz[0];
        const pareceCabecalho = primeira.some(v => {
            const n = String(v).trim();
            return n !== '' && !normalizarCompetencia(n) && !/^[-+]?\s*R?\$?\s*[\d.,]+$/.test(n);
        });
        const cabecalhos = pareceCabecalho ? primeira : primeira.map((_, i) => `Coluna ${i + 1}`);
        const dados = pareceCabecalho ? matriz.slice(1) : matriz;
        if (!dados.length) return null;
        return { qtdColunas: qtd, cabecalhos, dados, temCabecalho: pareceCabecalho };
    }

    function sugerirMapeamentos(info) {
        return info.cabecalhos.map((nome, i) => {
            const h = normalizarCabecalho(nome);
            const valores = info.dados.map(l => l[i] ?? '');
            const qtdCompetencias = valores.filter(v => !!normalizarCompetencia(v)).length;
            if (h.includes('compet') || qtdCompetencias >= Math.max(1, Math.ceil(valores.length * 0.7))) return 'competencia';
            const existente = estado.colunas.find(c => normalizarCabecalho(c.nome) === h);
            return existente ? `coluna:${existente.id}` : 'novo';
        });
    }

    function abrirImportacaoPlanilha() {
        const modal = document.getElementById('modalImportarPlanilhaAcoesGerais');
        if (!modal) return;
        modal.classList.remove('hidden');
        const ta = document.getElementById('cagPlanilhaTexto');
        if (ta) { ta.value = ''; ta.focus(); }
        limparPreviaImportacao();
    }

    function fecharImportacaoPlanilha() {
        document.getElementById('modalImportarPlanilhaAcoesGerais')?.classList.add('hidden');
        importacaoPlanilha = null;
    }

    function limparPreviaImportacao() {
        const area = document.getElementById('cagPlanilhaPrevia');
        const acao = document.getElementById('btnCagAplicarImportacao');
        if (area) area.innerHTML = '<p class="cag-import-empty">Cole os dados acima para visualizar a estrutura encontrada.</p>';
        if (acao) acao.disabled = true;
    }

    function renderizarPreviaImportacao() {
        const ta = document.getElementById('cagPlanilhaTexto');
        const area = document.getElementById('cagPlanilhaPrevia');
        const acao = document.getElementById('btnCagAplicarImportacao');
        if (!ta || !area || !acao) return;
        const info = analisarColagem(ta.value);
        if (!info) { importacaoPlanilha = null; limparPreviaImportacao(); return; }
        const mapeamentos = sugerirMapeamentos(info);
        importacaoPlanilha = { info, mapeamentos };
        area.innerHTML = `
            <div class="cag-import-summary"><strong>${info.dados.length} linha(s)</strong> • <strong>${info.qtdColunas} coluna(s)</strong> reconhecida(s)${info.temCabecalho ? ' • cabeçalho identificado' : ' • sem cabeçalho'}</div>
            <div class="cag-import-map">${info.cabecalhos.map((nome, i) => `
                <div class="cag-import-map-row">
                    <div class="cag-import-col-source"><strong>Coluna ${i + 1}</strong><span>${escapeHtml(nome)}</span></div>
                    <select class="cag-import-destino" data-import-col="${i}">
                        <option value="ignorar">Não importar</option>
                        <option value="competencia" ${mapeamentos[i] === 'competencia' ? 'selected' : ''}>Competência</option>
                        ${estado.colunas.map(c => `<option value="coluna:${escapeHtml(c.id)}" ${mapeamentos[i] === `coluna:${c.id}` ? 'selected' : ''}>${escapeHtml(c.nome)} ${c.tipo === 'debito' ? '−' : '+'}</option>`).join('')}
                        <option value="novo" ${mapeamentos[i] === 'novo' ? 'selected' : ''}>Criar nova coluna</option>
                    </select>
                </div>`).join('')}</div>
            <div class="cag-import-table-wrap"><table class="cag-import-table"><thead><tr>${info.cabecalhos.map(h => `<th>${escapeHtml(h)}</th>`).join('')}</tr></thead><tbody>${info.dados.slice(0, 8).map(l => `<tr>${l.map(v => `<td>${escapeHtml(v)}</td>`).join('')}</tr>`).join('')}</tbody></table>${info.dados.length > 8 ? '<small>Prévia limitada às primeiras 8 linhas.</small>' : ''}</div>`;
        acao.disabled = false;
    }

    function aplicarImportacaoPlanilha() {
        if (!importacaoPlanilha) return;
        const selects = [...document.querySelectorAll('#cagPlanilhaPrevia .cag-import-destino')];
        const destinos = selects.map(s => s.value);
        const competenciaCount = destinos.filter(v => v === 'competencia').length;
        if (competenciaCount !== 1) { alert('Selecione exatamente uma coluna como Competência.'); return; }
        const novos = destinos.filter(v => v === 'novo').length;
        if (estado.colunas.length + novos > MAX_COLUNAS) { alert(`A importação criaria ${novos} nova(s) coluna(s), mas o limite é de 6 colunas de composição.`); return; }

        const nomesNovos = {};
        let novaColunaIndex = 0;
        destinos.forEach((d, i) => {
            if (d === 'novo') {
                const base = importacaoPlanilha.info.cabecalhos[i] || `Valor ${estado.colunas.length + novaColunaIndex + 1}`;
                const id = novoId('valor');
                estado.colunas.push({ id, nome: base.trim() || `Valor ${estado.colunas.length + 1}`, tipo: 'credito' });
                nomesNovos[i] = id;
                novaColunaIndex++;
            }
        });
        estado.linhas = estado.linhas.filter(l => l.competencia || estado.colunas.some(c => String(l.valores?.[c.id] ?? '').trim() !== ''));
        if (!estado.linhas.length) estado.linhas.push({ competencia: '', valores: {}, fontes: {} });
        estado.linhas.forEach(l => { if (!l.valores) l.valores = {}; if (!l.fontes) l.fontes = {}; estado.colunas.forEach(c => { if (!(c.id in l.valores)) l.valores[c.id] = ''; if (!(c.id in l.fontes)) l.fontes[c.id] = null; }); });

        const idxComp = destinos.indexOf('competencia');
        const mapa = new Map(estado.linhas.map(l => [normalizarCompetencia(l.competencia), l]).filter(([k]) => k));
        importacaoPlanilha.info.dados.forEach(reg => {
            const comp = normalizarCompetencia(reg[idxComp]);
            if (!comp) return;
            let linha = mapa.get(comp);
            if (!linha) {
                linha = { competencia: comp, valores: {}, fontes: {} };
                estado.colunas.forEach(c => { linha.valores[c.id] = ''; linha.fontes[c.id] = null; });
                estado.linhas.push(linha); mapa.set(comp, linha);
            }
            destinos.forEach((d, i) => {
                const colId = d.startsWith('coluna:') ? d.slice(7) : (d === 'novo' ? nomesNovos[i] : null);
                if (!colId || d === 'competencia' || d === 'ignorar') return;
                linha.valores[colId] = String(reg[i] ?? '').trim();
                linha.fontes[colId] = 'planilha';
            });
        });
        estado.linhas.sort((a, b) => (competenciaParaNumero(a.competencia) ?? Infinity) - (competenciaParaNumero(b.competencia) ?? Infinity));
        renderizar();
        renderizarFaixasLote();
        fecharImportacaoPlanilha();
    }

    function mostrarTutorial() {
        const modal = document.getElementById('modalTutorialAcoesGerais');
        if (modal) modal.classList.remove('hidden');
    }

    function inicializar() {
        const container = document.getElementById('composicaoAcoesGerais');
        if (!container || container.dataset.iniciado === '1') return;
        container.dataset.iniciado = '1';

        container.addEventListener('input', e => {
            const row = e.target.dataset.row;
            if (e.target.classList.contains('cag-competencia')) estado.linhas[row].competencia = e.target.value;
            if (e.target.classList.contains('cag-valor')) {
                estado.linhas[row].valores[e.target.dataset.colId] = e.target.value;
                if (!estado.linhas[row].fontes) estado.linhas[row].fontes = {};
                estado.linhas[row].fontes[e.target.dataset.colId] = 'manual';
            }
            if (row !== undefined) atualizarLinha(Number(row));
            atualizarResumo();
        });
        container.addEventListener('change', e => {
            if (e.target.classList.contains('cag-column-name')) {
                const col = estado.colunas.find(c => c.id === e.target.dataset.colId);
                if (col) col.nome = e.target.value.trim() || 'Valor';
            }
            if (e.target.classList.contains('cag-column-type')) {
                const col = estado.colunas.find(c => c.id === e.target.dataset.colId);
                if (col) col.tipo = e.target.value === 'debito' ? 'debito' : 'credito';
                renderizar();
            }
        });
        container.addEventListener('click', e => {
            const btnCol = e.target.closest('.cag-remove-col');
            if (btnCol) removerColuna(btnCol.dataset.colId);
            const btnFaixa = e.target.closest('.cag-lote-remover');
            if (btnFaixa) removerFaixaLote(Number(btnFaixa.dataset.loteIndex));
        });

        const lote = document.getElementById('cagFaixasLote');
        lote?.addEventListener('input', e => {
            const idx = Number(e.target.dataset.loteIndex);
            if (!Number.isInteger(idx) || !faixasLote[idx]) return;
            if (e.target.classList.contains('cag-lote-de')) faixasLote[idx].de = e.target.value;
            if (e.target.classList.contains('cag-lote-ate')) faixasLote[idx].ate = e.target.value;
            if (e.target.classList.contains('cag-lote-valor-input')) faixasLote[idx].valor = e.target.value;
        });
        lote?.addEventListener('change', e => {
            const idx = Number(e.target.dataset.loteIndex);
            if (!Number.isInteger(idx) || !faixasLote[idx]) return;
            if (e.target.classList.contains('cag-lote-coluna-select')) {
                faixasLote[idx].colunaId = e.target.value;
                renderizarFaixasLote();
            }
            if (e.target.classList.contains('cag-lote-tipo')) {
                const colId = faixasLote[idx].colunaId;
                const col = estado.colunas.find(c => c.id === colId);
                if (col) {
                    col.tipo = e.target.value === 'debito' ? 'debito' : 'credito';
                    renderizar();
                    renderizarFaixasLote();
                }
            }
        });

        document.getElementById('btnCagAdicionarLinha')?.addEventListener('click', adicionarLinha);
        document.getElementById('btnCagRemoverLinha')?.addEventListener('click', removerLinha);
        document.getElementById('btnCagAdicionarColuna')?.addEventListener('click', adicionarColuna);
        document.getElementById('btnCagAdicionarFaixa')?.addEventListener('click', adicionarFaixaLote);
        document.getElementById('btnCagAplicarLote')?.addEventListener('click', aplicarPreenchimentoLote);
        document.getElementById('btnCagImportarPlanilha')?.addEventListener('click', abrirImportacaoPlanilha);
        document.getElementById('fecharImportacaoPlanilhaAcoesGerais')?.addEventListener('click', fecharImportacaoPlanilha);
        document.getElementById('cancelarImportacaoPlanilhaAcoesGerais')?.addEventListener('click', fecharImportacaoPlanilha);
        document.getElementById('btnCagAnalisarPlanilha')?.addEventListener('click', renderizarPreviaImportacao);
        document.getElementById('btnCagAplicarImportacao')?.addEventListener('click', aplicarImportacaoPlanilha);
        document.getElementById('cagPlanilhaTexto')?.addEventListener('paste', () => setTimeout(renderizarPreviaImportacao, 30));
        document.getElementById('cagPlanilhaTexto')?.addEventListener('input', renderizarPreviaImportacao);
        document.getElementById('cagPlanilhaPrevia')?.addEventListener('change', e => {
            if (e.target.classList.contains('cag-import-destino') && importacaoPlanilha) importacaoPlanilha.mapeamentos[Number(e.target.dataset.importCol)] = e.target.value;
        });
        document.getElementById('btnCagTutorial')?.addEventListener('click', mostrarTutorial);
        document.getElementById('fecharTutorialAcoesGerais')?.addEventListener('click', () => document.getElementById('modalTutorialAcoesGerais')?.classList.add('hidden'));
        document.getElementById('fecharTutorialAcoesGerais2')?.addEventListener('click', () => document.getElementById('modalTutorialAcoesGerais')?.classList.add('hidden'));
        renderizar();
        renderizarFaixasLote();
    }

    window.contadjusAcoesGerais = {
        inicializar,
        renderizar,
        obterDados,
        definirDados,
        coletarParaAtualizacao,
        temDados: () => estado.linhas.some(l => l.competencia || Object.values(l.valores || {}).some(v => String(v).trim() !== '')),
        obterColunasComDados: () => estado.colunas.filter(c => colunaTemValor(c.id))
    };
})();

// Ponte de navegação da Guia 4. Mantém o motor previdenciário intacto.
function atualizarModoGuia4AcoesGerais() {
    const tipo = document.getElementById('tipoAcao')?.value || 'previdenciaria';
    const geral = tipo === 'condenatoria';
    const novo = document.getElementById('composicaoAcoesGerais');
    if (!novo) return;

    const blocosPrevidenciarios = [
        document.getElementById('resumoDiferencas'),
        document.getElementById('blocoCompetenciasModificadas'),
        document.querySelector('#guia-diferencas > .flex.flex-wrap.items-center.justify-between.gap-4.mb-4'),
        document.querySelector('#guia-diferencas > .tabela-wrapper')
    ];
    novo.classList.toggle('hidden', !geral);
    blocosPrevidenciarios.forEach(el => { if (el) el.classList.toggle('hidden', geral); });

    if (geral && window.contadjusAcoesGerais) {
        window.contadjusAcoesGerais.inicializar();
        window.contadjusAcoesGerais.renderizar();
    }
}

window.atualizarModoGuia4AcoesGerais = atualizarModoGuia4AcoesGerais;
