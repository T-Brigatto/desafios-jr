const cedulas = [2, 5, 10, 20, 50];

// processarSaque() retorna quantas cédulas da nota atual serão retiradas e o valor final retirado
function realizarSaque(valorSaque) {
    let saldo = Number(valorSaque);
    let relatorio = [];
    console.log(`***************************************`);
    console.log(`SALDO INICIAL: ${saldo}\n`)
    if (saldo % 2 == 0) {
        for (let i = cedulas.length - 1; i >= 0; i--) {
            let cedulaSelecionada = Number(cedulas[i]);
            let qtdCedulas = contarCedulas(saldo, cedulaSelecionada);
            let valorRetirado = somarCedulasRetiradas(qtdCedulas, cedulaSelecionada);

            // Adiciona as cédulas sacadas ao relatório
            // Usando o spread operator para "destrinchar" a array e adicionando os valores no final do relatório
            qtdCedulas > 0 ? relatorio.unshift(...atualizarRelatorio(qtdCedulas, cedulaSelecionada)) : null;

            mostrarSaque(cedulaSelecionada, qtdCedulas, valorRetirado);
            saldo -= valorRetirado;
        }
    }
    finalizarSaque(saldo, relatorio);
}

// mostrarSaque() retorna uma string com saldo atual e final, além das operações realizadas
// A função não mostra na tela cédulas não utilizadas
function mostrarSaque(cedulaSelecionada, qtdCedulas, valorRetirado) {
    if (qtdCedulas != 0) {
        console.log(`- ${valorRetirado}\n${qtdCedulas} cédula(s) de R$ ${cedulaSelecionada}\n`)
    }
}

// Conta a quantidade de notas que "cabem" dentro do valor requisitado
function contarCedulas(valor, cedula) {
    return Math.floor(valor / cedula);
}

// Soma o valor das notas sendo retiradas
function somarCedulasRetiradas(quantidade, cedulaSelecionada) {
    return quantidade * cedulaSelecionada;
}

// Retorna uma string com as cédulas que foram adicionadas ao saque
function atualizarRelatorio(qtdCedulas, cedulaSelecionada) {
    let relatorio = [];
    for (i = 0; i < qtdCedulas; i++) {
        relatorio.unshift(cedulaSelecionada);
    }
    return relatorio;
}

function finalizarSaque(saldo, relatorio) {
    saldo === 0 ? console.log(`*** ÊXITO! ***\n\SALDO FINAL | R$ ${saldo}\n`) : console.log(`*** FALHA! ***\nApenas cédulas:`, cedulas, `\n`)
    // console.log(`NOTAS RETIRADAS:`, relatorio.length, `\n`, relatorio, `\n`);
}

console.log(`\n`);
