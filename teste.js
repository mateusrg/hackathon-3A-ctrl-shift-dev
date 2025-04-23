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
        texto: "Imprima " + resultadoEsperado,
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

// console.log(gerarDesafio1());

function validarDesafio1(jsonDesafio, respostaPlayer) {
    return jsonDesafio['resposta_correta'] === respostaPlayer;
}

function gerarDesafio2() {
    // número de vogais: 1 a 5
    const numVogais = Math.floor(Math.random() * 5) + 1;
    // tamanho total da palavra: entre (numVogais + 1) e 10, garantido que len > vogais
    const tamanhoPalavra = Math.floor(Math.random() * 6) + (numVogais + 1);

    const resultado = numVogais * tamanhoPalavra;

    return {
        texto: "Retorne " + resultado,
        resultado_esperado: resultado
    }
}


function validarDesafio2(palavraDoJogador, resultadoEsperado) {
    const vogais = 'aeiouAEIOU';
    const numVogais = [...palavraDoJogador].filter(l => vogais.includes(l)).length;
    const produto = numVogais * palavraDoJogador.length;

    return produto === resultadoEsperado;
}

// console.log(gerarDesafio2());

function gerarDesafio3() {
    const tamanhoLista = Math.floor(Math.random() * 4) + 5;
    const divisor = Math.floor(Math.random() * 4) + 2;

    const usados = new Set();
    const lista = [];

    while (lista.length < tamanhoLista) {
        const quociente = Math.floor(Math.random() * 20) + 1; // 1 a 20
        const valor = quociente * divisor;

        if (!usados.has(valor)) {
            lista.push(valor);
            usados.add(valor);
        }
    }

    const indiceCorreto = Math.floor(Math.random() * lista.length);
    const resultadoEsperado = lista[indiceCorreto] / divisor;

    const codigoPython = `
lista = [${lista.join(', ')}]
print(lista[???] / ${divisor})`.trim();

    return {
        codigo_python: codigoPython,
        texto: "Imprima " + resultadoEsperado,
        resposta_correta: indiceCorreto,
        parametros: {
            lista,
            divisor,
            resultadoEsperado
        }
    };
}

function validarDesafio3(respostaIndice, desafio) {
    const { lista, divisor, resultadoEsperado } = desafio.parametros;
    return lista[respostaIndice] / divisor === resultadoEsperado;
}

// console.log(gerarDesafio3());

function gerarDesafio4() {
    const quantidade = Math.floor(Math.random() * 4) + 4;
    const mediaInteira = Math.floor(Math.random() * 11) + 10;

    const somaEsperada = mediaInteira * quantidade;

    const lista = [];
    for (let i = 0; i < quantidade - 1; i++) {
        const valor = Math.floor(Math.random() * 21) + 5;
        lista.push(valor);
    }

    const somaParcial = lista.reduce((a, b) => a + b, 0);
    const valorFaltando = somaEsperada - somaParcial;

    const valoresTexto = [...lista, "???"].join(', ');

    const codigoPython = `
def media_lista(nums):
    soma = sum(nums)
    media = soma / len(nums)
    return media

valores = [${valoresTexto}]
print(media_lista(valores))`.trim();

    return {
        codigo_python: codigoPython,
        texto: "Imprima " + mediaInteira,
        resposta_correta: valorFaltando,
        parametros: {
            mediaDesejada: mediaInteira,
            quantidade,
            listaParcial: lista,
            valorFaltando,
            somaEsperada
        }
    };
}

function validarDesafio4(jsonDesafio, respostaPlayer) {
    return jsonDesafio['resposta_correta'] === respostaPlayer;
}

// console.log(gerarDesafio4());

function gerarDesafio5() {
    const palavras = [
        "prato", "livro", "carro", "plano", "troca",
        "festa", "janela", "velho", "porta", "gente",
        "coisa", "tempo", "ponto", "corpo", "fruta",
        "barco", "letra", "grito", "pleno", "folha"
    ];

    const palavraCorreta = palavras[Math.floor(Math.random() * palavras.length)];
    const listaOriginal = palavraCorreta.split("");

    const indiceErro = Math.floor(Math.random() * palavraCorreta.length);
    const letraCorreta = listaOriginal[indiceErro];

    const alfabeto = "abcdefghijklmnopqrstuvwxyz";
    let letraErrada;
    do {
        letraErrada = alfabeto[Math.floor(Math.random() * alfabeto.length)];
    } while (letraErrada === letraCorreta);

    const listaComErro = [...listaOriginal];
    listaComErro[indiceErro] = letraErrada;
    const palavraErrada = listaComErro.join("");

    const codigoPython = `
def corrige(palavra):
    lista = list(palavra)
    lista[???] = '${letraCorreta}'
    return ''.join(lista)

print(corrige('${palavraErrada}'))`.trim();

    return {
        codigo_python: codigoPython,
        texto: `Imprima "${palavraCorreta}"`,
        resposta_correta: indiceErro,
        parametros: {
            palavraCorreta,
            palavraErrada,
            indiceErro,
            letraCorreta
        }
    };
}

function validarDesafio5(jsonDesafio, respostaPlayer) {
    return jsonDesafio['resposta_correta'] === respostaPlayer;
}

// console.log(gerarDesafio5());