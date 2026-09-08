// =====================================================================
// GUIA 7 – REQUISITÓRIO — B69
// B61: separação real entre RPV e Precatório; sem enquadramento automático;
// base discriminada; RPV proporcional ao teto; NME atual somente na RPV;
// honorários contratuais como parâmetros e cálculos em blocos separados.
// =====================================================================

window.estadoRequisitorio = window.estadoRequisitorio || {};
window.estadoRequisitorio = Object.assign({
    tipo: 'ambos',
    dataBase: '',
    aplicarHonorariosContratuais: true,
    calcularHonorariosContratuais: true,
    percentuaisContratuais: [0, 10, 20, 30],
    percentualContratual: 0,
    temSucumbencia: false,
    criterioSucumbencia: 'valorCausa',
    dataCalculoSucumbencia: '',
    percentualSucumbencia: 0,
    houveMajoracao: false,
    percentualMajoracao: 0,
    formaMajoracao: 'aditiva',
    criterioSucumbenciaRpv: 'integral'
}, window.estadoRequisitorio);

function reqNumero(valor) {
    if (typeof valor === 'number') return isFinite(valor) ? valor : 0;
    var s = String(valor || '').trim().replace(/R\$\s?/g, '').replace(/\./g, '').replace(',', '.').replace(/%/g, '');
    var n = Number(s);
    return isFinite(n) ? n : 0;
}

function reqMoeda(v) {
    return typeof formatarMoedaAtualizacao === 'function'
        ? formatarMoedaAtualizacao(Number(v) || 0)
        : Number(v || 0).toLocaleString('pt-BR', {style:'currency', currency:'BRL'});
}

function reqPercentual(v) {
    return (Number(v) || 0).toLocaleString('pt-BR', {minimumFractionDigits:2, maximumFractionDigits:2}) + '%';
}

function reqCompetenciaNumero(valor) {
    var s = String(valor || '').trim();
    var m = s.match(/^(\d{1,2})\/(\d{4})$/);
    if (!m) {
        m = s.match(/^(\d{4})-(\d{1,2})/);
        if (m) return Number(m[1]) * 100 + Number(m[2]);
        return 0;
    }
    return Number(m[2]) * 100 + Number(m[1]);
}

function reqAnoCompetencia(valor) {
    var n = reqCompetenciaNumero(valor);
    return n ? Math.floor(n / 100) : 0;
}

function reqDataParaNumero(valor) {
    var s = String(valor || '').trim();
    var m = s.match(/^(\d{2})\/(\d{4})$/);
    if (m) return Number(m[2]) * 100 + Number(m[1]);
    m = s.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (m) return Number(m[3]) * 100 + Number(m[2]);
    return 0;
}

function reqObterBase() {
    var r = window.resultadoAtualizacaoRenuncia || {};
    var guia5 = window.resultadosAtualizacao || {};
    var usarAcordo = r.acordoAtivo === true;

    var principalRen = Number(r.totalAposRenunciaPrincipal || 0);
    var jurosRen = Number(r.totalAposRenunciaJuros || 0);
    var selicRen = Number(r.totalAposRenunciaSelic || 0);
    var totalRen = Number(r.totalAposRenuncia || 0);
    if (!principalRen && !jurosRen && !selicRen && totalRen) principalRen = totalRen;
    if (!totalRen) totalRen = principalRen + jurosRen + selicRen;

    // A Guia 7 trabalha com duas bases possíveis, ambas discriminadas:
    // 1) sem acordo: Total após renúncia (Principal/Juros/SELIC);
    // 2) com acordo: Total após acordo (Principal/Juros/SELIC).
    // Em nenhuma hipótese o total deve ser tratado como Principal.
    var principal = usarAcordo ? Number(r.totalAposAcordoPrincipal || 0) : principalRen;
    var juros = usarAcordo ? Number(r.totalAposAcordoJuros || 0) : jurosRen;
    var selic = usarAcordo ? Number(r.totalAposAcordoSelic || 0) : selicRen;
    var total = usarAcordo ? Number(r.totalAposAcordo || 0) : totalRen;

    // Compatibilidade com estados antigos/JSONs: se os campos discriminados
    // ainda não existirem, reconstrói-os pela Guia 5 menos a renúncia.
    if (!principal && !juros && !selic && !usarAcordo) {
        principal = Math.max(0, Number(guia5.totalCorrigido || 0) - Number(r.valorCorrigido || 0));
        juros = Math.max(0, Number(guia5.totalJuros || 0) - Number(r.valorJuros || 0));
        selic = Math.max(0, Number(guia5.totalSelic || 0) - Number(r.valorSelic || 0));
        total = principal + juros + selic;
    }
    if (!total) total = principal + juros + selic;
    // Se o total estiver disponível mas a composição não, nunca atribuir o
    // total ao Principal: preservamos a discriminação da fonte.

    return {principal: principal, juros: juros, selic: selic, total: total};
}

function reqSincronizarDataBase() {
    var el = document.getElementById('dataBaseRequisitorio');
    if (!el) return '';
    var data = window.resultadosAtualizacao && window.resultadosAtualizacao.dataAtualizacao
        ? window.resultadosAtualizacao.dataAtualizacao
        : (document.getElementById('dataAtualizacao')?.value || '');
    if (data) el.value = data;
    window.estadoRequisitorio.dataBase = el.value || '';
    return el.value || '';
}

function reqObterSalarioMinimo(dataBase) {
    var alvo = reqCompetenciaNumero(dataBase);
    if (!alvo) return 0;
    var vigencias = Array.isArray(window.VIGENCIAS) ? window.VIGENCIAS : (typeof VIGENCIAS !== 'undefined' ? VIGENCIAS : []);
    if (!Array.isArray(vigencias)) return 0;
    var encontrada = vigencias.find(function(v) {
        return reqCompetenciaNumero(v.inicio) <= alvo && reqCompetenciaNumero(v.fim) >= alvo;
    });
    return encontrada ? Number(encontrada.salarioMinimo || 0) : 0;
}

function reqNme(dataBase, tipo) {
    var itens = window.resultadosAtualizacao && Array.isArray(window.resultadosAtualizacao.itens)
        ? window.resultadosAtualizacao.itens : [];
    var anoBase = reqAnoCompetencia(dataBase);
    var anteriores = 0, atuais = 0;
    itens.forEach(function(item) {
        var ano = reqAnoCompetencia(item.competencia || item.competenciaBR);
        if (!ano || !anoBase) return;
        if (ano < anoBase) anteriores++;
        else if (ano === anoBase) atuais++;
    });
    if (tipo === 'precatorio') return {anterior: anteriores + atuais, atual: 0, total: anteriores + atuais};
    return {anterior: anteriores, atual: atuais, total: anteriores + atuais};
}

function reqPercentuaisAtuais() {
    var arr = Array.isArray(window.estadoRequisitorio.percentuaisContratuais)
        ? window.estadoRequisitorio.percentuaisContratuais.map(function(v){ return Math.max(0, Math.min(100, reqNumero(v))); })
        : [0,10,20,30];
    if (!arr.length) arr = [0];
    return arr;
}

function reqAplicarContrato() {
    return document.getElementById('aplicarHonorariosContratuais')?.value === 'sim';
}

function reqAlocarTeto(base, limite) {
    var total = Math.max(0, Number(base.total) || 0);
    if (!limite || total <= limite) return {principal:base.principal, juros:base.juros, selic:base.selic, total:total};
    if (!total) return {principal:0, juros:0, selic:0, total:0};
    var fator = limite / total;
    var principal = Number((base.principal * fator).toFixed(2));
    var juros = Number((base.juros * fator).toFixed(2));
    var selic = Number((limite - principal - juros).toFixed(2));
    if (selic < 0) selic = 0;
    return {principal:principal, juros:juros, selic:selic, total:Number((principal + juros + selic).toFixed(2))};
}

function reqComposicao(base, percentual, suc) {
    var f = reqAplicarContrato() ? percentual / 100 : 0;
    var honorPrincipal = base.principal * f;
    var honorJuros = base.juros * f;
    var honorSelic = base.selic * f;
    var honorTotal = honorPrincipal + honorJuros + honorSelic;
    var autorPrincipal = base.principal - honorPrincipal;
    var autorJuros = base.juros - honorJuros;
    var autorSelic = base.selic - honorSelic;
    var autorTotal = autorPrincipal + autorJuros + autorSelic;
    return {
        percentual: percentual,
        honorPrincipal: honorPrincipal, honorJuros: honorJuros, honorSelic: honorSelic, honorTotal: honorTotal,
        autorPrincipal: autorPrincipal, autorJuros: autorJuros, autorSelic: autorSelic, autorTotal: autorTotal,
        sucumbencia: suc || {principal:0, juros:0, selic:0, total:0}
    };
}

function reqCalcularAtualizacaoValorCausa() {
    var valorBase = reqNumero(document.getElementById('valorCausa')?.value || 0);
    var dataAjuizamento = document.getElementById('dataAjuizamento')?.value || document.getElementById('dataAjuizamentoGuia6')?.value || '';
    var dataBase = document.getElementById('dataBaseRequisitorio')?.value || '';
    var competenciaBaseISO = typeof guia6ObterCompetenciaAjuizamentoISO === 'function'
        ? guia6ObterCompetenciaAjuizamentoISO()
        : null;
    var atualizacaoISO = typeof guia5CompetenciaParaISO === 'function' ? guia5CompetenciaParaISO(dataBase) : null;

    if (!valorBase || !competenciaBaseISO || !atualizacaoISO || !window.parametrosCorrecaoAtual) {
        return {valorBase:valorBase, competenciaBase:dataAjuizamento, dataAtualizacao:dataBase, valorCorrigido:valorBase, valorJuros:0, valorSelic:0, total:valorBase};
    }

    try {
        var coef = guia5CalcularCoeficienteMensal(competenciaBaseISO, atualizacaoISO, window.parametrosCorrecaoAtual);
        var valorCorrigidoCalculado = valorBase * (Number(coef.coeficiente) || 1);
        var valorCorrigido = (Number(coef.coeficiente) || 1) < 1 ? Math.max(valorBase, valorCorrigidoCalculado) : valorCorrigidoCalculado;
        var obj = {competencia: guia6ISOParaCompetencia(competenciaBaseISO), competenciaISO:competenciaBaseISO, diferenca:valorBase, coeficiente:Number(coef.coeficiente)||1, valorCorrigido:valorCorrigido};
        var valorJuros = 0, valorSelic = 0;

        if (window.parametrosSelicAtual && Array.isArray(window.parametrosSelicAtual.periodos) && window.parametrosSelicAtual.periodos.length) {
            var periodosSelic = window.parametrosSelicAtual.periodos;
            var primeiroPeriodo = periodosSelic[0];
            var inicioSelicISO = guia5CompetenciaParaISO(primeiroPeriodo.inicio);
            var compNum = guia5ISOParaNumero(competenciaBaseISO);
            var inicioSelicNum = inicioSelicISO ? guia5ISOParaNumero(inicioSelicISO) : compNum;
            var inicioEfetivoNum = Math.max(compNum, inicioSelicNum);
            var mes = inicioEfetivoNum % 100, ano = Math.floor(inicioEfetivoNum / 100);
            if (mes > 1) mes--; else { mes=12; ano--; }
            var fimPreSelicISO = String(ano)+'-'+String(mes).padStart(2,'0');
            var fimPreSelicNum = ano*100+mes;
            var inicioJurosEl = document.getElementById('inicioJuros2') || document.getElementById('inicioJuros');
            var inicioJurosISO = inicioJurosEl ? guia5CompetenciaParaISO(String(inicioJurosEl.value||'').trim()) : null;
            if (window.parametrosJurosAtual && inicioJurosISO && fimPreSelicNum >= Math.max(compNum, guia5ISOParaNumero(inicioJurosISO))) {
                var jurosPre = guia5CalcularJurosIntervalo(obj, inicioJurosISO, fimPreSelicISO, window.parametrosJurosAtual, atualizacaoISO);
                valorJuros += Number(jurosPre.valor)||0;
            }
            var selicObj = guia5CalcularSelic(obj, atualizacaoISO, window.parametrosSelicAtual);
            var percentualSelic = Number(selicObj.percentualSelic)||0;
            valorSelic = (valorCorrigido + valorJuros) * percentualSelic / 100;
            var ultimoPeriodo = periodosSelic[periodosSelic.length-1];
            var fimSelicISO = ultimoPeriodo.fim ? guia5CompetenciaParaISO(ultimoPeriodo.fim) : null;
            if (fimSelicISO && window.parametrosJurosAtual) {
                var proxSelic = guia5ProximaCompetenciaISO(fimSelicISO);
                if (guia5ISOParaNumero(proxSelic) <= guia5ISOParaNumero(atualizacaoISO)) {
                    var jurosPos = guia5CalcularJurosIntervalo(obj, (inicioJurosISO && guia5ISOParaNumero(inicioJurosISO) > guia5ISOParaNumero(proxSelic) ? inicioJurosISO : proxSelic), atualizacaoISO, window.parametrosJurosAtual, atualizacaoISO);
                    valorJuros += Number(jurosPos.valor)||0;
                }
            }
        } else if (window.parametrosJurosAtual) {
            var inicioJurosEl2 = document.getElementById('inicioJuros2') || document.getElementById('inicioJuros');
            var inicioJurosISO2 = inicioJurosEl2 ? guia5CompetenciaParaISO(String(inicioJurosEl2.value||'').trim()) : null;
            if (inicioJurosISO2) {
                var jurosTotal = guia5CalcularJurosDeterministicos(obj, inicioJurosISO2, atualizacaoISO, window.parametrosJurosAtual);
                valorJuros = Number(jurosTotal.valorJuros)||0;
            }
        }
        return {valorBase:valorBase, competenciaBase:dataAjuizamento, dataAtualizacao:dataBase, valorCorrigido:valorCorrigido, valorJuros:valorJuros, valorSelic:valorSelic, total:valorCorrigido+valorJuros+valorSelic};
    } catch (e) {
        return {valorBase:valorBase, competenciaBase:dataAjuizamento, dataAtualizacao:dataBase, valorCorrigido:valorBase, valorJuros:0, valorSelic:0, total:valorBase, erro:e.message};
    }
}

function reqAtualizarPainelValorCausa() {
    var criterio = document.getElementById('criterioSucumbencia')?.value || 'valorCausa';
    var dataEl = document.getElementById('dataCalculoSucumbencia');
    var dataBase = document.getElementById('dataBaseRequisitorio')?.value || '';
    var painel = document.getElementById('painelAtualizacaoValorCausaSucumbencia');
    var atualizacao = criterio === 'valorCausa' ? reqCalcularAtualizacaoValorCausa() : null;

    if (dataEl) {
        if (criterio === 'sentenca') {
            // O valor digitado pelo usuário não pode ser sobrescrito durante
            // o recálculo disparado pelo evento input. A restauração do
            // estado salvo ocorre somente na troca/inicialização do critério.
            dataEl.disabled = false;
            dataEl.readOnly = false;
            dataEl.required = true;
        } else {
            dataEl.disabled = true;
            dataEl.readOnly = true;
            dataEl.required = false;
            dataEl.value = dataBase;
        }
    }

    if (painel) painel.classList.toggle('hidden', criterio !== 'valorCausa');
    if (criterio === 'valorCausa' && atualizacao) {
        var ids = {
            valorCausaAtualizadoPrincipalSucumbencia:atualizacao.valorCorrigido,
            valorCausaAtualizadoJurosSucumbencia:atualizacao.valorJuros,
            valorCausaAtualizadoSelicSucumbencia:atualizacao.valorSelic,
            valorCausaAtualizadoTotalSucumbencia:atualizacao.total
        };
        Object.keys(ids).forEach(function(id){ var el=document.getElementById(id); if(el) el.textContent=reqMoeda(ids[id]); });
        var periodo=document.getElementById('periodoAtualizacaoValorCausaSucumbencia');
        if(periodo) periodo.textContent='Ajuizamento ' + (atualizacao.competenciaBase || '—') + ' → data-base ' + (atualizacao.dataAtualizacao || dataBase || '—');
    }
    return atualizacao;
}


function reqObterDataLimiteSucumbencia() {
    var el = document.getElementById('dataCalculoSucumbencia');
    var valor = String(el?.value || '').trim();

    if (!valor) {
        return {valida:false, valor:'', iso:null, numero:0, descricao:'Data da Sentença não informada.'};
    }

    var m = valor.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (m) {
        var dia = Number(m[1]);
        var mes = Number(m[2]);
        var ano = Number(m[3]);
        var ultimoDia = new Date(ano, mes, 0).getDate();
        if (mes < 1 || mes > 12 || dia < 1 || dia > ultimoDia || ano < 1) {
            return {valida:false, valor:valor, iso:null, numero:0, descricao:'Data da Sentença inválida.'};
        }
        var iso = String(ano) + '-' + String(mes).padStart(2, '0');
        return {
            valida:true,
            valor:valor,
            iso:iso,
            numero:ano * 100 + mes,
            dia:dia,
            mes:mes,
            ano:ano,
            diasMes:ultimoDia,
            descricao:valor
        };
    }

    m = valor.match(/^(\d{2})\/(\d{4})$/);
    if (m) {
        var mes2 = Number(m[1]);
        var ano2 = Number(m[2]);
        if (mes2 < 1 || mes2 > 12 || ano2 < 1) {
            return {valida:false, valor:valor, iso:null, numero:0, descricao:'Data da Sentença inválida.'};
        }
        var iso2 = String(ano2) + '-' + String(mes2).padStart(2, '0');
        return {
            valida:true,
            valor:valor,
            iso:iso2,
            numero:ano2 * 100 + mes2,
            dia:null,
            mes:mes2,
            ano:ano2,
            diasMes:null,
            descricao:valor
        };
    }

    return {
        valida:false,
        valor:valor,
        iso:null,
        numero:0,
        descricao:'Informe a Data da Sentença no formato DD/MM/AAAA.'
    };
}

function reqCalcularBaseAteSentenca() {
    var limite = reqObterDataLimiteSucumbencia();
    window.ultimoDetalhamentoAteSentenca = {
        data: limite.valida ? limite.descricao : (limite.valor || ''),
        dataIso: limite.valida ? limite.iso : null,
        itens: []
    };
    if (!limite.valida) return {principal:0, juros:0, selic:0};

    // A Data da Sentença define apenas o limite das competências incluídas.
    // Depois de selecionadas, todas as parcelas são atualizadas até a
    // Data de Atualização geral do cálculo (data-base da Guia 5).
    var dataAtualizacao = document.getElementById('dataBaseRequisitorio')?.value ||
        (window.resultadosAtualizacao && window.resultadosAtualizacao.dataAtualizacao) ||
        document.getElementById('dataAtualizacao')?.value || '';
    var dataAtualizacaoISO = typeof guia5CompetenciaParaISO === 'function'
        ? guia5CompetenciaParaISO(String(dataAtualizacao || '').trim())
        : null;
    if (!dataAtualizacaoISO) {
        window.ultimoDetalhamentoAteSentenca.erro = 'Data de atualização do cálculo não informada.';
        return {principal:0, juros:0, selic:0};
    }
    window.ultimoDetalhamentoAteSentenca.dataAtualizacao = dataAtualizacao;
    window.ultimoDetalhamentoAteSentenca.dataAtualizacaoIso = dataAtualizacaoISO;

    var itens = window.resultadosAtualizacao &&
        Array.isArray(window.resultadosAtualizacao.itens)
        ? window.resultadosAtualizacao.itens : [];

    if (!itens.length) return {principal:0, juros:0, selic:0};

    var total = {principal:0, juros:0, selic:0};
    var parametrosCorrecao = window.resultadosAtualizacao.parametrosCorrecao || window.parametrosCorrecaoAtual;
    var parametrosJuros = window.resultadosAtualizacao.parametrosJuros || window.parametrosJurosAtual;
    var parametrosSelic = window.resultadosAtualizacao.parametrosSelic || window.parametrosSelicAtual;

    itens.forEach(function(item) {
        var competenciaISO = item.competenciaISO ||
            (typeof guia5CompetenciaParaISO === 'function'
                ? guia5CompetenciaParaISO(item.competencia || item.competenciaBR)
                : null);
        if (!competenciaISO) return;

        var compNum = typeof guia5ISOParaNumero === 'function'
            ? guia5ISOParaNumero(competenciaISO)
            : reqCompetenciaNumero(item.competencia || item.competenciaBR);

        if (!compNum || compNum > limite.numero) return;

        var diferencaOriginalIntegral = Number(item.diferenca || 0);
        if (!Number.isFinite(diferencaOriginalIntegral)) diferencaOriginalIntegral = 0;

        // A Data da Sentença limita as competências incluídas. Se o usuário
        // informou o dia, a competência do mês da sentença entra de forma
        // proporcional aos dias transcorridos, contando o próprio dia da sentença.
        // Ex.: 15/09 em mês de 30 dias = 15/30 = 50% da parcela.
        var diasConsiderados = null;
        var diasMes = null;
        var fatorProRata = 1;
        var ehMesDaSentenca = limite.dia !== null &&
            compNum === limite.numero;
        if (ehMesDaSentenca) {
            diasConsiderados = limite.dia;
            diasMes = limite.diasMes || 0;
            if (diasMes > 0) fatorProRata = diasConsiderados / diasMes;
        }
        var diferencaOriginal = diferencaOriginalIntegral * fatorProRata;

        // A sentença limita quais competências entram na base. A atualização
        // financeira de cada parcela segue integralmente até a Data de Atualização geral do cálculo.
        var coef = typeof guia5CalcularCoeficienteMensal === 'function'
            ? guia5CalcularCoeficienteMensal(competenciaISO, dataAtualizacaoISO, parametrosCorrecao)
            : {coeficiente:1, criterio:'Sem atualização'};

        var coeficiente = Number(coef.coeficiente);
        if (!Number.isFinite(coeficiente)) coeficiente = 1;

        var valorCorrigidoCalculado = diferencaOriginal * coeficiente;
        var valorCorrigido = coeficiente < 1
            ? Math.max(diferencaOriginal, valorCorrigidoCalculado)
            : valorCorrigidoCalculado;

        var obj = {
            competencia: item.competencia,
            competenciaISO: competenciaISO,
            diferenca: diferencaOriginal,
            coeficiente: coeficiente,
            valorCorrigido: valorCorrigido
        };

        var valorJuros = 0;
        var valorSelic = 0;

        if (parametrosSelic &&
            Array.isArray(parametrosSelic.periodos) &&
            parametrosSelic.periodos.length &&
            typeof guia5CalcularSelic === 'function') {

            var primeiroPeriodo = parametrosSelic.periodos[0];
            var inicioSelicISO = typeof guia5CompetenciaParaISO === 'function'
                ? guia5CompetenciaParaISO(primeiroPeriodo.inicio) : null;
            var compNumero = guia5ISOParaNumero(competenciaISO);
            var inicioSelicNumero = inicioSelicISO
                ? guia5ISOParaNumero(inicioSelicISO) : compNumero;
            var inicioEfetivoNumero = Math.max(compNumero, inicioSelicNumero);

            var mes = inicioEfetivoNumero % 100;
            var ano = Math.floor(inicioEfetivoNumero / 100);
            if (mes > 1) {
                mes--;
            } else {
                mes = 12;
                ano--;
            }

            var fimPreSelicISO = String(ano) + '-' + String(mes).padStart(2, '0');
            var fimPreSelicNumero = ano * 100 + mes;

            var inicioJurosEl = document.getElementById('inicioJuros2') ||
                document.getElementById('inicioJuros');
            var inicioJurosISO = inicioJurosEl &&
                typeof guia5CompetenciaParaISO === 'function'
                ? guia5CompetenciaParaISO(String(inicioJurosEl.value || '').trim())
                : null;

            if (parametrosJuros && inicioJurosISO &&
                fimPreSelicNumero >= Math.max(compNumero, guia5ISOParaNumero(inicioJurosISO)) &&
                typeof guia5CalcularJurosIntervalo === 'function') {
                var jurosPre = guia5CalcularJurosIntervalo(
                    obj,
                    inicioJurosISO,
                    fimPreSelicISO,
                    parametrosJuros,
                    dataAtualizacaoISO
                );
                valorJuros += Number(jurosPre.valor) || 0;
            }

            var selicObj = guia5CalcularSelic(obj, dataAtualizacaoISO, parametrosSelic);
            var percentualSelic = Number(selicObj.percentualSelic) || 0;
            valorSelic = (valorCorrigido + valorJuros) * percentualSelic / 100;

            var ultimoPeriodo = parametrosSelic.periodos[parametrosSelic.periodos.length - 1];
            var fimSelicISO = ultimoPeriodo.fim &&
                typeof guia5CompetenciaParaISO === 'function'
                ? guia5CompetenciaParaISO(ultimoPeriodo.fim) : null;

            if (fimSelicISO && parametrosJuros &&
                typeof guia5CalcularJurosIntervalo === 'function') {
                var proxSelic = guia5ProximaCompetenciaISO(fimSelicISO);
                if (guia5ISOParaNumero(proxSelic) <= guia5ISOParaNumero(dataAtualizacaoISO)) {
                    var inicioPos = inicioJurosISO &&
                        guia5ISOParaNumero(inicioJurosISO) > guia5ISOParaNumero(proxSelic)
                        ? inicioJurosISO : proxSelic;
                    var jurosPos = guia5CalcularJurosIntervalo(
                        obj,
                        inicioPos,
                        dataAtualizacaoISO,
                        parametrosJuros,
                        dataAtualizacaoISO
                    );
                    valorJuros += Number(jurosPos.valor) || 0;
                }
            }
        } else if (parametrosJuros && typeof guia5CalcularJurosDeterministicos === 'function') {
            var inicioJurosEl2 = document.getElementById('inicioJuros2') ||
                document.getElementById('inicioJuros');
            var inicioJurosISO2 = inicioJurosEl2 &&
                typeof guia5CompetenciaParaISO === 'function'
                ? guia5CompetenciaParaISO(String(inicioJurosEl2.value || '').trim())
                : null;

            if (inicioJurosISO2) {
                var jurosTotal = guia5CalcularJurosDeterministicos(
                    obj,
                    inicioJurosISO2,
                    dataAtualizacaoISO,
                    parametrosJuros
                );
                valorJuros = Number(jurosTotal.valorJuros) || 0;
            }
        }

            total.principal += valorCorrigido;
        total.juros += valorJuros;
        total.selic += valorSelic;

        window.ultimoDetalhamentoAteSentenca.itens.push({
            competencia: item.competencia || item.competenciaBR || competenciaISO,
            valorOriginalIntegral: diferencaOriginalIntegral,
            valorOriginal: diferencaOriginal,
            diasConsiderados: diasConsiderados,
            diasMes: diasMes,
            fatorProRata: fatorProRata,
            coeficiente: coeficiente,
            valorCorrigido: valorCorrigido,
            valorJuros: valorJuros,
            valorSelic: valorSelic,
            total: valorCorrigido + valorJuros + valorSelic
        });
    });

    window.ultimoDetalhamentoAteSentenca.totais = {
        principal: total.principal,
        juros: total.juros,
        selic: total.selic,
        total: total.principal + total.juros + total.selic
    };
    return total;
}

function reqBasePorCriterio(base) {
    var criterio = document.getElementById('criterioSucumbencia')?.value || 'valorCausa';
    if (criterio === 'valorCausa') {
        var atualizacao = reqCalcularAtualizacaoValorCausa();
        return {principal:atualizacao.valorCorrigido, juros:atualizacao.valorJuros, selic:atualizacao.valorSelic};
    }
    if (criterio === 'condenacao') return {principal:base.principal, juros:base.juros, selic:base.selic};
    return reqCalcularBaseAteSentenca();
}

function reqObterPercentual(id) {
    return Math.max(0, Math.min(100, reqNumero(document.getElementById(id)?.value || 0)));
}

function reqPercentualSucumbenciaAplicado() {
    var percentual = reqObterPercentual('percentualSucumbencia');
    if (document.getElementById('houveMajoracaoSucumbencia')?.value !== 'sim') return percentual;
    var maj = reqObterPercentual('percentualMajoracaoSucumbencia');
    return document.getElementById('formaMajoracaoSucumbencia')?.value === 'multiplicativa'
        ? percentual * (1 + maj / 100)
        : percentual + maj;
}

function calcularSucumbenciaRequisitorio(base, atualizarUI) {
    var componentes = reqBasePorCriterio(base);
    var percentual = reqPercentualSucumbenciaAplicado();
    var principal = componentes.principal * percentual / 100;
    var juros = componentes.juros * percentual / 100;
    var selic = componentes.selic * percentual / 100;
    var total = principal + juros + selic;
    var baseEl = document.getElementById('baseSucumbenciaRequisitorio');
    var pctEl = document.getElementById('percentualAplicadoSucumbencia');
    if (baseEl) baseEl.textContent = reqMoeda(componentes.principal + componentes.juros + componentes.selic);
    if (pctEl) pctEl.textContent = reqPercentual(percentual);

    var dataConsideradaEl = document.getElementById('dataConsideradaSucumbenciaRequisitorio');
    var criterioAtual = document.getElementById('criterioSucumbencia')?.value || 'valorCausa';
    if (dataConsideradaEl) {
        var limiteSuc = reqObterDataLimiteSucumbencia();
        var dataBaseAtual = document.getElementById('dataBaseRequisitorio')?.value || '';
        if (criterioAtual === 'sentenca') {
            dataConsideradaEl.textContent = limiteSuc.valida
                ? 'Data considerada: ' + limiteSuc.descricao
                : 'Data considerada: não informada';
        } else {
            dataConsideradaEl.textContent = dataBaseAtual
                ? 'Data considerada: ' + dataBaseAtual
                : 'Data considerada: não informada';
        }
    }

    if (atualizarUI !== false) {
        var valorEl = document.getElementById('valorSucumbenciaRequisitorio');
        if (valorEl) valorEl.textContent = reqMoeda(total);
    }
    return {principal:principal, juros:juros, selic:selic, total:total};
}

function reqAplicarRedutorSucumbenciaRpv(suc, baseIntegral, baseRpv) {
    var criterio = document.getElementById('criterioRedutorSucumbenciaRpv')?.value
        || window.estadoRequisitorio.criterioSucumbenciaRpv
        || 'integral';
    if (criterio !== 'redutor') return {principal:suc.principal, juros:suc.juros, selic:suc.selic, total:suc.total, fator:1};
    var totalIntegral = Number(baseIntegral?.total) || 0;
    var totalRpv = Number(baseRpv?.total) || 0;
    var fator = totalIntegral > 0 ? Math.max(0, Math.min(1, totalRpv / totalIntegral)) : 1;
    var principal = Number((suc.principal * fator).toFixed(2));
    var juros = Number((suc.juros * fator).toFixed(2));
    var selic = Number((suc.selic * fator).toFixed(2));
    var total = Number((principal + juros + selic).toFixed(2));
    return {principal:principal, juros:juros, selic:selic, total:total, fator:fator};
}

function reqRenderizarEditorPercentuais() {
    var box = document.getElementById('editorPercentuaisContratuais');
    if (!box) return;
    if (!reqAplicarContrato()) {
        box.innerHTML = '<div class="p-3 text-xs text-slate-500 bg-slate-50">Honorários contratuais desativados. Os valores dos honorários serão zerados.</div>';
        return;
    }
    var arr = reqPercentuaisAtuais();
    var html = '<table class="min-w-[420px] w-full text-xs"><thead class="bg-slate-100"><tr><th class="p-2 text-left">% Honorários contratuais</th><th class="p-2 text-center">Ação</th></tr></thead><tbody>';
    arr.forEach(function(p, i) {
        html += '<tr class="border-t border-slate-200"><td class="p-2"><div class="flex items-center gap-1"><input type="text" inputmode="decimal" value="' + String(p).replace('.', ',') + '" data-percentual-index="' + i + '" class="w-24 px-2 py-1 border border-slate-300 rounded text-right font-mono"><span>%</span></div></td><td class="p-2 text-center"><button type="button" data-remover-percentual="' + i + '" class="px-2 py-1 text-xs bg-red-50 text-red-700 border border-red-200 rounded">Excluir</button></td></tr>';
    });
    html += '</tbody></table>';
    box.innerHTML = html;
    box.querySelectorAll('[data-percentual-index]').forEach(function(input) {
        input.addEventListener('change', function() {
            var idx = Number(input.dataset.percentualIndex);
            var vals = reqPercentuaisAtuais();
            vals[idx] = Math.max(0, Math.min(100, reqNumero(input.value)));
            window.estadoRequisitorio.percentuaisContratuais = vals;
            sincronizarRequisitorio();
        });
    });
    box.querySelectorAll('[data-remover-percentual]').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var vals = reqPercentuaisAtuais();
            var idx = Number(btn.dataset.removerPercentual);
            if (vals.length > 1) vals.splice(idx, 1); else vals = [0];
            window.estadoRequisitorio.percentuaisContratuais = vals;
            sincronizarRequisitorio();
        });
    });
}

function reqPreencherComposicao(id, base, nme, suc) {
    var tbody = document.getElementById(id);
    if (!tbody) return;
    var arr = reqPercentuaisAtuais();
    var html = '';
    arr.forEach(function(p) {
        var c = reqComposicao(base, p, suc);
        html += '<tr class="border-t border-slate-200">' +
            '<td class="p-2 font-mono">' + reqPercentual(p) + '</td>' +
            '<td class="p-2 text-right font-mono">' + reqMoeda(c.honorPrincipal) + '</td>' +
            '<td class="p-2 text-right font-mono">' + reqMoeda(c.honorJuros) + '</td>' +
            '<td class="p-2 text-right font-mono">' + reqMoeda(c.honorSelic) + '</td>' +
            '<td class="p-2 text-right font-mono font-semibold">' + reqMoeda(c.honorTotal) + '</td>' +
            '<td class="p-2 text-right font-mono">' + reqMoeda(c.autorPrincipal) + '</td>' +
            '<td class="p-2 text-right font-mono">' + reqMoeda(c.autorJuros) + '</td>' +
            '<td class="p-2 text-right font-mono">' + reqMoeda(c.autorSelic) + '</td>' +
            '<td class="p-2 text-right font-mono font-semibold text-blue-900">' + reqMoeda(c.autorTotal) + '</td>' +
            '<td class="p-2 text-right font-mono">' + nme.anterior + '</td>' +
            '<td class="p-2 text-right font-mono">' + nme.atual + '</td>' +
            '</tr>';
    });
    if (!reqAplicarContrato()) {
        html = '<tr><td colspan="11" class="p-3 text-center text-xs text-slate-500">Honorários contratuais não aplicados. Todos os valores de honorários são R$ 0,00.</td></tr>';
    }
    html += '<tr class="border-t-2 border-slate-300 bg-slate-50 font-semibold"><td class="p-2">Sucumbência</td><td class="p-2 text-right font-mono">' + reqMoeda(suc.principal) + '</td><td class="p-2 text-right font-mono">' + reqMoeda(suc.juros) + '</td><td class="p-2 text-right font-mono">' + reqMoeda(suc.selic) + '</td><td class="p-2 text-right font-mono text-amber-900">' + reqMoeda(suc.total) + '</td><td colspan="6"></td></tr>';
    tbody.innerHTML = html;
}

function reqAtualizarCards(idPrefix, base) {
    ['Principal','Juros','Selic','Total'].forEach(function(nome) {
        var el = document.getElementById(idPrefix + nome + 'Requisitorio');
        if (el) el.textContent = reqMoeda(base[nome.toLowerCase()]);
    });
}

function calcularRequisitorio() {
    reqSincronizarDataBase();
    reqAtualizarPainelValorCausa();
    var base = reqObterBase();
    var dataBase = document.getElementById('dataBaseRequisitorio')?.value || '';
    var salario = reqObterSalarioMinimo(dataBase);
    var limite = salario * 60;
    var cabeRpv = limite > 0 && base.total <= limite;
    var superaTeto = limite > 0 && base.total > limite;
    var baseRpv = reqAlocarTeto(base, limite);
    var basePrecatorio = {principal:base.principal, juros:base.juros, selic:base.selic, total:base.total};
    var tipo = document.getElementById('tipoRequisitorio')?.value || 'ambos';
    var mostrarRpv = cabeRpv || superaTeto;
    var mostrarPrecatorio = superaTeto;
    if (tipo === 'precatorio') mostrarRpv = false;
    if (tipo === 'rpv') mostrarPrecatorio = false;

    var suc = document.getElementById('temSucumbencia')?.value === 'sim'
        ? calcularSucumbenciaRequisitorio(base, true)
        : {principal:0, juros:0, selic:0, total:0};
    var sucRpv = reqAplicarRedutorSucumbenciaRpv(suc, base, baseRpv);
    var sucPrecatorio = {principal:suc.principal, juros:suc.juros, selic:suc.selic, total:suc.total, fator:1};

    var ids = {
        baseRequisitorio: base.total,
        reqInfoPrincipalBase: base.principal,
        reqInfoJurosBase: base.juros,
        reqInfoSelicBase: base.selic,
        reqInfoTotalBase: base.total,
        salarioMinimoRequisitorio: salario,
        limite60SalariosRequisitorio: limite,
        rpvPrincipalRequisitorio: baseRpv.principal,
        rpvJurosRequisitorio: baseRpv.juros,
        rpvSelicRequisitorio: baseRpv.selic,
        rpvTotalRequisitorio: baseRpv.total,
        precatorioPrincipalRequisitorio: basePrecatorio.principal,
        precatorioJurosRequisitorio: basePrecatorio.juros,
        precatorioSelicRequisitorio: basePrecatorio.selic,
        precatorioTotalRequisitorio: basePrecatorio.total,
        valorCausaSucumbencia: reqNumero(document.getElementById('valorCausa')?.value || 0)
    };
    Object.keys(ids).forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.textContent = reqMoeda(ids[id]);
    });

    var blocoRpv = document.getElementById('blocoCalculoRpvRequisitorio');
    var blocoPrec = document.getElementById('blocoCalculoPrecatorioRequisitorio');
    if (blocoRpv) blocoRpv.classList.toggle('hidden', !mostrarRpv);
    if (blocoPrec) {
        blocoPrec.classList.toggle('hidden', !mostrarPrecatorio);
        if (mostrarPrecatorio) {
            var painelPrec = document.getElementById('painelCalculoPrecatorioRequisitorio');
            var setaPrec = document.getElementById('setaCalculoPrecatorioRequisitorio');
            if (painelPrec) painelPrec.classList.remove('hidden');
            if (setaPrec) setaPrec.textContent = '▼';
        }
    }
    var indRpv = document.getElementById('indicadorRpvRequisitorio');
    var indPrec = document.getElementById('indicadorPrecatorioRequisitorio');
    if (indRpv) { indRpv.classList.toggle('hidden', !mostrarRpv); indRpv.textContent = mostrarRpv ? 'RPV: disponível' : 'RPV: não selecionada'; }
    if (indPrec) { indPrec.classList.toggle('hidden', !mostrarPrecatorio); }
    var statusRpv = document.getElementById('statusCalculoRpvRequisitorio');
    var statusPrec = document.getElementById('statusCalculoPrecatorioRequisitorio');
    if (statusRpv) statusRpv.textContent = mostrarRpv ? 'Disponível' : 'Não selecionada';
    if (statusPrec) statusPrec.textContent = mostrarPrecatorio ? 'Disponível — base integral' : 'Não disponível';

    var nmeRpv = reqNme(dataBase, 'rpv');
    var nmePrec = reqNme(dataBase, 'precatorio');
    reqPreencherComposicao('tabelaCalculoRpvRequisitorio', baseRpv, nmeRpv, sucRpv);
    reqPreencherComposicao('tabelaCalculoPrecatorioRequisitorio', basePrecatorio, nmePrec, sucPrecatorio);
    reqRenderizarEditorPercentuais();

    var status = document.getElementById('statusRequisitorio');
    if (status) status.textContent = 'Base: ' + reqMoeda(base.total) + ' — ' + (window.resultadoAtualizacaoRenuncia?.acordoAtivo ? 'Total após acordo' : 'Total após renúncia') + ' da Guia 6';

    window.estadoRequisitorio = Object.assign(window.estadoRequisitorio, {
        tipo: tipo, dataBase: dataBase, aplicarHonorariosContratuais: reqAplicarContrato(),
        calcularHonorariosContratuais: reqAplicarContrato(), percentuaisContratuais:reqPercentuaisAtuais(),
        percentualContratual:reqPercentuaisAtuais()[0] || 0,
        temSucumbencia:document.getElementById('temSucumbencia')?.value === 'sim',
        criterioSucumbencia:document.getElementById('criterioSucumbencia')?.value || 'valorCausa',
        dataCalculoSucumbencia:document.getElementById('dataCalculoSucumbencia')?.value || '',
        percentualSucumbencia:reqObterPercentual('percentualSucumbencia'),
        houveMajoracao:document.getElementById('houveMajoracaoSucumbencia')?.value === 'sim',
        percentualMajoracao:reqObterPercentual('percentualMajoracaoSucumbencia'),
        formaMajoracao:document.getElementById('formaMajoracaoSucumbencia')?.value || 'aditiva',
        criterioSucumbenciaRpv:document.getElementById('criterioRedutorSucumbenciaRpv')?.value || 'integral'
    });

    return {base:base, baseRpv:baseRpv, basePrecatorio:basePrecatorio, salarioMinimo:salario, limite:limite, rpvDisponivel:mostrarRpv, precatorioDisponivel:mostrarPrecatorio, sucumbencia:suc};
}

function sincronizarRequisitorio() {
    if (!document.getElementById('guia-requisitorio')) return;
    calcularRequisitorio();
}

function configurarToggle(idBtn, idPainel, idSeta) {
    var btn = document.getElementById(idBtn), painel = document.getElementById(idPainel), seta = document.getElementById(idSeta);
    if (!btn || !painel) return;
    btn.addEventListener('click', function() {
        var aberto = !painel.classList.contains('hidden');
        painel.classList.toggle('hidden', aberto);
        if (seta) seta.textContent = aberto ? '▶' : '▼';
    });
}

function reqRenderizarDetalhamentoAteSentenca() {
    var limite = reqObterDataLimiteSucumbencia();
    var tbody = document.getElementById('tabelaValoresAteSentenca');
    var msg = document.getElementById('modalMensagemAteSentenca');
    var dataEl = document.getElementById('modalDataSentencaAteSentenca');
    var dataAtualizacaoEl = document.getElementById('modalDataAtualizacaoAteSentenca');
    var qtdEl = document.getElementById('modalQuantidadeAteSentenca');
    if (!tbody) return;

    tbody.innerHTML = '';
    if (msg) { msg.className = 'hidden'; msg.textContent = ''; }
    if (dataEl) dataEl.textContent = limite.valida ? limite.descricao : (limite.valor || 'não informada');
    var dataAtualizacaoModal = document.getElementById('dataBaseRequisitorio')?.value ||
        (window.resultadosAtualizacao && window.resultadosAtualizacao.dataAtualizacao) ||
        document.getElementById('dataAtualizacao')?.value || '';
    if (dataAtualizacaoEl) dataAtualizacaoEl.textContent = dataAtualizacaoModal || 'não informada';

    if (!limite.valida) {
        if (msg) {
            msg.className = 'mb-3 p-3 rounded-md text-sm bg-amber-50 text-amber-800 border border-amber-200';
            msg.textContent = limite.descricao;
        }
        if (qtdEl) qtdEl.textContent = '0';
        reqAtualizarTotaisModalAteSentenca({});
        return;
    }

    // Executa exatamente o mesmo cálculo que alimenta a base dos honorários.
    reqCalcularBaseAteSentenca();
    var detalhe = window.ultimoDetalhamentoAteSentenca || {itens:[], totais:{}};
    var itens = Array.isArray(detalhe.itens) ? detalhe.itens : [];
    if (qtdEl) qtdEl.textContent = String(itens.length);

    if (!itens.length) {
        if (msg) {
            msg.className = 'mb-3 p-3 rounded-md text-sm bg-amber-50 text-amber-800 border border-amber-200';
            msg.textContent = 'Nenhuma competência da condenação foi encontrada até a Data da Sentença informada.';
        }
        reqAtualizarTotaisModalAteSentenca(detalhe.totais || {});
        return;
    }

    itens.forEach(function(item) {
        var tr = document.createElement('tr');
        tr.className = 'hover:bg-slate-50';
        var proRataTexto = item.diasConsiderados !== null && item.diasConsiderados !== undefined
            ? String(item.diasConsiderados) + '/' + String(item.diasMes || '--') + ' (' + (Number(item.fatorProRata || 0) * 100).toLocaleString('pt-BR', {minimumFractionDigits:2, maximumFractionDigits:2}) + '%)'
            : 'Integral';
        var cells = [
            ['text-left font-semibold', item.competencia || '--'],
            ['text-right font-mono', reqMoeda(item.valorOriginal)],
            ['text-right font-mono', proRataTexto],
            ['text-right font-mono', Number(item.coeficiente || 0).toFixed(8).replace('.', ',')],
            ['text-right font-mono', reqMoeda(item.valorCorrigido)],
            ['text-right font-mono', reqMoeda(item.valorJuros)],
            ['text-right font-mono', reqMoeda(item.valorSelic)],
            ['text-right font-mono font-semibold', reqMoeda(item.total)]
        ];
        cells.forEach(function(cell) {
            var td = document.createElement('td');
            td.className = 'px-3 py-2 whitespace-nowrap ' + cell[0];
            td.textContent = cell[1];
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    reqAtualizarTotaisModalAteSentenca(detalhe.totais || {});
}

function reqAtualizarTotaisModalAteSentenca(totais) {
    var ids = {
        totalOriginalAteSentenca: 0,
        totalCorrigidoAteSentenca: Number(totais.principal) || 0,
        totalJurosAteSentenca: Number(totais.juros) || 0,
        totalSelicAteSentenca: Number(totais.selic) || 0,
        totalGeralAteSentenca: Number(totais.total) || 0
    };
    var detalhe = window.ultimoDetalhamentoAteSentenca;
    if (detalhe && Array.isArray(detalhe.itens)) {
        ids.totalOriginalAteSentenca = detalhe.itens.reduce(function(s, x) { return s + (Number(x.valorOriginal) || 0); }, 0);
    }
    Object.keys(ids).forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.textContent = reqMoeda(ids[id]);
    });
}

function reqAtualizarBotaoDetalhamentoAteSentenca() {
    var btn = document.getElementById('btnVerValoresAteSentenca');
    var criterio = document.getElementById('criterioSucumbencia')?.value || 'valorCausa';
    if (btn) btn.classList.toggle('hidden', criterio !== 'sentenca');
}

function reqAplicarMascaraDataSentenca(valor) {
    var digitos = String(valor || '').replace(/\D/g, '').slice(0, 8);
    if (digitos.length <= 2) return digitos;
    if (digitos.length <= 6) return digitos.slice(0, 2) + '/' + digitos.slice(2);
    return digitos.slice(0, 2) + '/' + digitos.slice(2, 4) + '/' + digitos.slice(4);
}

function configurarRequisitorio() {
    var ids = [
        'tipoRequisitorio','temSucumbencia','criterioSucumbencia','dataCalculoSucumbencia',
        'percentualSucumbencia','houveMajoracaoSucumbencia','percentualMajoracaoSucumbencia','formaMajoracaoSucumbencia',
        'valorCausa','varaOrigem','dataAtualizacao'
    ];
    ids.forEach(function(id) {
        var el = document.getElementById(id);
        if (!el) return;
        if (id === 'dataCalculoSucumbencia') {
            el.addEventListener('input', function() {
                var pos = el.selectionStart;
                var anterior = el.value;
                var mascarado = reqAplicarMascaraDataSentenca(anterior);
                if (el.value !== mascarado) {
                    el.value = mascarado;
                    try { el.setSelectionRange(el.value.length, el.value.length); } catch (e) {}
                }
                sincronizarRequisitorio();
            });
            el.addEventListener('change', sincronizarRequisitorio);
        } else {
            el.addEventListener('input', sincronizarRequisitorio);
            el.addEventListener('change', sincronizarRequisitorio);
        }
    });

    var seletorAplicarContratual = document.getElementById('aplicarHonorariosContratuais');
    seletorAplicarContratual?.addEventListener('click', function(ev) { ev.stopPropagation(); });
    seletorAplicarContratual?.addEventListener('change', function() {
        window.estadoRequisitorio.aplicarHonorariosContratuais = this.value === 'sim';
        window.estadoRequisitorio.calcularHonorariosContratuais = this.value === 'sim';
        sincronizarRequisitorio();
    });

    document.getElementById('btnAdicionarPercentualContratual')?.addEventListener('click', function() {
        var arr = reqPercentuaisAtuais();
        var maior = Math.max.apply(null, arr);
        arr.push(Math.min(100, maior + 10));
        window.estadoRequisitorio.percentuaisContratuais = arr;
        sincronizarRequisitorio();
    });

    configurarToggle('btnToggleContratualRequisitorio','painelContratualRequisitorio','setaContratualRequisitorio');
    configurarToggle('btnToggleSucumbenciaRequisitorio','painelSucumbenciaRequisitorio','setaSucumbenciaRequisitorio');
    configurarToggle('btnToggleCalculoRpvRequisitorio','painelCalculoRpvRequisitorio','setaCalculoRpvRequisitorio');
    configurarToggle('btnToggleCalculoPrecatorioRequisitorio','painelCalculoPrecatorioRequisitorio','setaCalculoPrecatorioRequisitorio');

    function atualizarCamposSucumbencia() {
        var ativo = document.getElementById('temSucumbencia')?.value === 'sim';
        var majoracao = document.getElementById('houveMajoracaoSucumbencia')?.value === 'sim';
        var painel = document.getElementById('painelSucumbenciaRequisitorio');
        var camposMaj = document.getElementById('camposMajoracaoSucumbencia');
        var campoForma = document.getElementById('campoFormaMajoracaoSucumbencia');
        var criterio = document.getElementById('criterioSucumbencia')?.value || 'valorCausa';
        var percentual = document.getElementById('percentualSucumbencia');
        if (camposMaj) camposMaj.classList.toggle('hidden', !majoracao);
        if (campoForma) campoForma.classList.toggle('hidden', !majoracao);
        if (ativo && percentual && reqNumero(percentual.value) <= 0) percentual.value = '10,00';
        var status = document.getElementById('statusSucumbenciaRequisitorio');
        if (status) status.textContent = ativo ? 'Sim' : 'Não';
        var data = document.getElementById('dataCalculoSucumbencia');
        var labelData = document.getElementById('labelDataCalculoSucumbencia');
        var dataBase = document.getElementById('dataBaseRequisitorio')?.value || '';
        if (labelData) labelData.textContent = criterio === 'sentenca' ? 'Data da Sentença' : 'Data considerada';
        if (data) {
            if (criterio === 'sentenca') {
                data.disabled = false;
                data.readOnly = false;
                data.required = true;
                if (window.estadoRequisitorio.dataCalculoSucumbencia) {
                    data.value = window.estadoRequisitorio.dataCalculoSucumbencia;
                }
            } else {
                data.disabled = true; data.readOnly = true; data.required = false; data.value = dataBase;
            }
        }
        reqAtualizarPainelValorCausa();
        var obs = document.getElementById('observacaoSucumbencia');
        if (obs) obs.textContent = criterio === 'valorCausa'
            ? 'Base: valor da causa atualizado do ajuizamento até a data-base, pelos critérios da Guia 5.'
            : criterio === 'condenacao'
                ? 'Base: valor da condenação, usando a composição da Guia 6. A data-base é herdada da Guia 5.'
                : 'Base: competências até a Data da Sentença informada, atualizadas até a data-base do cálculo.';
        sincronizarRequisitorio();
    }

    var seletorSucumbencia = document.getElementById('temSucumbencia');
    seletorSucumbencia?.addEventListener('click', function(ev) { ev.stopPropagation(); });
    seletorSucumbencia?.addEventListener('change', function(){ reqAtualizarBotaoDetalhamentoAteSentenca(); atualizarCamposSucumbencia(); });
    document.getElementById('houveMajoracaoSucumbencia')?.addEventListener('change', atualizarCamposSucumbencia);
    document.getElementById('criterioSucumbencia')?.addEventListener('change', function(){
        reqAtualizarBotaoDetalhamentoAteSentenca();
        atualizarCamposSucumbencia();
    });
    document.getElementById('criterioRedutorSucumbenciaRpv')?.addEventListener('change', function(){
        window.estadoRequisitorio.criterioSucumbenciaRpv = this.value;
        sincronizarRequisitorio();
    });

    reqAtualizarBotaoDetalhamentoAteSentenca();
    var modalAteSentenca = document.getElementById('modalValoresAteSentenca');
    var abrirModalAteSentenca = document.getElementById('btnVerValoresAteSentenca');
    var fecharModalAteSentenca = function(){ if(modalAteSentenca) modalAteSentenca.classList.add('hidden'); };
    abrirModalAteSentenca?.addEventListener('click', function(ev){
        ev.stopPropagation();
        if (document.getElementById('criterioSucumbencia')?.value !== 'sentenca') return;
        reqRenderizarDetalhamentoAteSentenca();
        if(modalAteSentenca) modalAteSentenca.classList.remove('hidden');
    });
    document.getElementById('btnFecharModalValoresAteSentenca')?.addEventListener('click', fecharModalAteSentenca);
    document.getElementById('btnFecharModalValoresAteSentenca2')?.addEventListener('click', fecharModalAteSentenca);
    modalAteSentenca?.addEventListener('click', function(ev){ if(ev.target === modalAteSentenca) fecharModalAteSentenca(); });

    var modalRpv = document.getElementById('modalInfoCalculoRpv');
    var abrirModalRpv = document.getElementById('btnInfoCalculoRpv');
    var fecharModalRpv = function(){ if(modalRpv) modalRpv.classList.add('hidden'); };
    abrirModalRpv?.addEventListener('click', function(ev){ ev.stopPropagation(); if(modalRpv) modalRpv.classList.remove('hidden'); });
    document.getElementById('btnFecharModalInfoCalculoRpv')?.addEventListener('click', fecharModalRpv);
    document.getElementById('btnFecharModalInfoCalculoRpv2')?.addEventListener('click', fecharModalRpv);
    modalRpv?.addEventListener('click', function(ev){ if(ev.target === modalRpv) fecharModalRpv(); });

    reqSincronizarDataBase();
    atualizarCamposSucumbencia();
    reqAtualizarBotaoDetalhamentoAteSentenca();
}

window.calcularRequisitorio = calcularRequisitorio;
window.sincronizarRequisitorio = sincronizarRequisitorio;
window.configurarRequisitorio = configurarRequisitorio;
