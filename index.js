const cedulas = [2, 5, 10, 20, 50];
const j = 0;

function realizarSaque(valorSaque) {

    let saldo = Number(valorSaque);
    let relatorio = [];
    console.log(`***************************************\n`);
    console.log(`SALDO INICIAL: ${saldo}\n`)

    if ((saldo != 3) && (saldo != 1)) {

        for (let i = cedulas.length - 1; i >= 0; i--) {

            let cedulaSelecionada = Number(cedulas[i]);
            let qtdCedulas = contarCedulas(saldo, cedulaSelecionada);
            let valorRetirado = somarCedulasRetiradas(qtdCedulas, cedulaSelecionada);

            // Se a cédula for selecionada, as cédulas são adicionadas ao array relatorio
            qtdCedulas > 0 ? relatorio.unshift(...atualizarRelatorio(qtdCedulas, cedulaSelecionada)) : null;

            // Retira-se do valor do saque a soma das cédulas selecionadas
            saldo -= valorRetirado;

            // Verifica se há sobra no saldo, se sim o looping é feito novamente com novos valores
            if (saldo === 1) {
                let temp = relatorio.findIndex((index) => {
                    return index >= 5;
                });
                saldo = saldo + relatorio[temp] - 6;
                relatorio.splice(temp, 1, 2, 2, 2);
                i = cedulas.length;
            }

            // Verifica se o saldo está zerado, se sim o looping é quebrado para evitar cálculos desnecessários
            if (saldo === 0) {
                break;
            }
        }
    }
    finalizarSaque(saldo, relatorio);
}

// Conta a quantidade de notas que "cabem" dentro do valor requisitado
function contarCedulas(valor, cedula) {
    return Math.floor(valor / cedula);
}

// Soma o valor das notas sendo retiradas
function somarCedulasRetiradas(quantidade, cedulaSelecionada) {
    return quantidade * cedulaSelecionada;
}

// Retorna as cédulas que foram adicionadas ao saque
function atualizarRelatorio(qtdCedulas, cedulaSelecionada) {
    let relatorio = [];
    for (i = 0; i < qtdCedulas; i++) {
        relatorio.unshift(cedulaSelecionada);
    }
    return relatorio;
}

function finalizarSaque(saldo, relatorio) {
    saldo === 0 ? console.log(`*** ÊXITO! ***\n\SALDO FINAL | R$ ${saldo}\n`) : console.log(`*** FALHA! ***\nApenas cédulas:`, cedulas, `\n`)
    console.log(`NOTAS RETIRADAS:`, relatorio.length, `\n`, relatorio, `\n`);
}

console.log(`\n`);