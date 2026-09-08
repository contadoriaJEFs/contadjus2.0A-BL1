// =====================================================================
// CONTADJUS 2.0A — COMPOSIÇÃO DAS PARCELAS (AÇÕES CONDENATÓRIAS)
// Isolado do motor previdenciário.
// =====================================================================

(function () {
    const MAX_COLUNAS = 6;
    let estado = {
        colunas: [{ id: 'valor-1', nome: 'Valor', tipo: 'credito' }],
        linhas: [{ competencia: '', valores: { 'valor-1': '' } }]
    };

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
                        <input class="cag-cell cag-valor" inputmode="decimal" value="${escapeHtml(linha.valores?.[col.id] ?? '')}" placeholder="0,00" data-row="${idx}" data-col-id="${col.id}">
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
        estado.linhas.push({ competencia: '', valores });
        renderizar();
        const inputs = document.querySelectorAll('#tabelaComposicaoAcoesGerais .cag-competencia');
        inputs[inputs.length - 1]?.focus();
    }

    function removerLinha() {
        if (estado.linhas.length <= 1) {
            estado.linhas[0] = { competencia: '', valores: Object.fromEntries(estado.colunas.map(c => [c.id, ''])) };
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
        estado.linhas.forEach(linha => linha.valores[id] = '');
        renderizar();
    }

    function removerColuna(id) {
        if (estado.colunas.length <= 1) {
            alert('A tabela precisa manter pelo menos uma coluna de composição.');
            return;
        }
        estado.colunas = estado.colunas.filter(col => col.id !== id);
        estado.linhas.forEach(linha => { if (linha.valores) delete linha.valores[id]; });
        renderizar();
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
            valores: Object.fromEntries(colunas.map(c => [c.id, ids.has(c.id) ? (l.valores?.[c.id] ?? '') : '']))
        }));
        estado = { colunas, linhas: linhas.length ? linhas : [{ competencia: '', valores: Object.fromEntries(colunas.map(c => [c.id, ''])) }] };
        renderizar();
    }

    function coletarParaAtualizacao() {
        return estado.linhas.map(linha => ({
            competencia: String(linha.competencia || '').trim(),
            diferenca: Number(valorLinha(linha).toFixed(2))
        })).filter(item => item.competencia && item.diferenca !== 0);
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
            if (e.target.classList.contains('cag-valor')) estado.linhas[row].valores[e.target.dataset.colId] = e.target.value;
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
        });

        document.getElementById('btnCagAdicionarLinha')?.addEventListener('click', adicionarLinha);
        document.getElementById('btnCagRemoverLinha')?.addEventListener('click', removerLinha);
        document.getElementById('btnCagAdicionarColuna')?.addEventListener('click', adicionarColuna);
        document.getElementById('btnCagTutorial')?.addEventListener('click', mostrarTutorial);
        document.getElementById('fecharTutorialAcoesGerais')?.addEventListener('click', () => document.getElementById('modalTutorialAcoesGerais')?.classList.add('hidden'));
        document.getElementById('fecharTutorialAcoesGerais2')?.addEventListener('click', () => document.getElementById('modalTutorialAcoesGerais')?.classList.add('hidden'));
        renderizar();
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
