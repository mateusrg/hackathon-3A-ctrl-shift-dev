function gerarDesafio1() {
    // Critério: par ou ímpar
    const ehPar = Math.random() < 0.5;
    const criterioTexto = ehPar ? "num % 2 == 0" : "num % 2 != 0";
    const comentario = ehPar ? "pares" : "ímpares";

    // Gera lista aleatória de 10 a 20 números entre 1 e 1000
    const tamanho = Math.floor(Math.random() * 11) + 10;
    const numeros = Array.from({ length: tamanho }, () =>
        Math.floor(Math.random() * 1000) + 1
    );

    // Incremento aleatório
    const incrementar = Math.floor(Math.random() * 5) + 1; // 1 a 5
    const ajusteFinal = Math.floor(Math.random() * 11) - 5; // -5 a +5

    // Contagem baseada no critério
    const totalValidos = numeros.filter(n => (ehPar ? n % 2 === 0 : n % 2 !== 0)).length;
    const resultadoEsperado = (totalValidos * incrementar) + ajusteFinal;

    // Código Python com lacuna
    const codigoPython = `
def conta_${comentario}(numeros):
    contador = 0
    for num in numeros:
        if ${criterioTexto}:
            contador += ${incrementar}
    return contador + ???

lista = [${numeros.join(', ')}]
print(conta_${comentario}(lista))
`.trim();

    return {
        codigo_python: codigoPython,
        resposta_correta: ajusteFinal,
        parametros: {
            criterio: ehPar ? "pares" : "ímpares",
            incrementar,
            ajusteFinal,
            totalValidos,
            resultadoEsperado,
            lista: numeros
        }
    };
}

console.log(gerarDesafio1());

function validarDesafio1(jsonDesafio, respostaPlayer) {
    return jsonDesafio['resposta_correta'] === respostaPlayer;
}

function gerarDesafio2() {
    // número de vogais: 1 a 5
    const numVogais = Math.floor(Math.random() * 5) + 1;
    // tamanho total da palavra: entre (numVogais + 1) e 10, garantido que len > vogais
    const tamanhoPalavra = Math.floor(Math.random() * 6) + (numVogais + 1);

    const resultado = numVogais * tamanhoPalavra;

    return resultado;
}


function validarDesafio2(palavraDoJogador, resultadoEsperado) {
    const vogais = 'aeiouAEIOU';
    const numVogais = [...palavraDoJogador].filter(l => vogais.includes(l)).length;
    const produto = numVogais * palavraDoJogador.length;

    return produto === resultadoEsperado;
}


console.log(gerarDesafio2());
console.log(validarDesafio2("exemplo", 60));

// fazer "gerar" e "validar" para todos os 5 tipos em "tarefas.py"