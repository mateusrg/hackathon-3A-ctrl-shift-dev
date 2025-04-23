function gerarDesafio1() {
    const lista = Array.from({ length: 3 }, () => Math.floor(Math.random() * 10) + 1);
    const indice = Math.floor(Math.random() * lista.length);
    const resultado = lista.length * lista[indice];

    const codigoPython = `
lista = [${lista.join(', ')}]
x = len(lista) * lista[${indice}]`.trim();

    return {
        codigo_python: codigoPython,
        texto: "Qual o valor de X?",
        resposta_correta: resultado,
        parametros: { lista, indice }
    };
}

function validarDesafio1(jsonDesafio, respostaPlayer) {
    return jsonDesafio['resposta_correta'] === respostaPlayer;
}

// console.log(gerarDesafio1());

function gerarDesafio2() {
    const tamanho = Math.floor(Math.random() * 4) + 3;
    const valores = Array.from(
        new Set(Array.from({ length: tamanho }, () => Math.floor(Math.random() * 10) + 1))
    );
    const limite = Math.floor(Math.random() * 6) + 2;

    let resultado = 0;

    valores.forEach((valor) => {
        if (valor > limite) {
            resultado += valor;
        }
    })

    const codigoPython = `
valores = [${valores.join(', ')}]
soma = 0
for v in valores:
    if v > ${limite}:
        soma += v
print(soma)`.trim();

    return {
        codigo_python: codigoPython,
        texto: "Qual o retorno?",
        resposta_correta: resultado,
        parametros: { valores, limite }
    };
}

function validarDesafio2(jsonDesafio, respostaPlayer) {
    return jsonDesafio['resposta_correta'] === respostaPlayer;
}

// console.log(gerarDesafio2());

function gerarDesafio3() {
    const numero = Math.floor(Math.random() * 51);

    const resultado = numero % 2 === 0 ? numero - 2 : numero * 2;

    const codigoPython = `
def misterio(n):
    if n % 2 == 0:
        return n - 2
    return n * 2

print(misterio(${numero}))`.trim();

    return {
        codigo_python: codigoPython,
        texto: "Qual o retorno?",
        resposta_correta: resultado,
        parametros: numero
    };
}

function validarDesafio3(jsonDesafio, respostaPlayer) {
    return jsonDesafio['resposta_correta'] === respostaPlayer;
}

// console.log(gerarDesafio3());

function gerarDesafio4() {
    const tamanho = Math.floor(Math.random() * 4) + 3;
    const lista = Array.from(new Set(Array.from({ length: tamanho }, () => Math.floor(Math.random() * 20) + 1)));
    const alvo = Math.floor(Math.random() * 20) + 1;

    let resposta;

    for (let valor of lista) {
        if (valor == alvo) {
            resposta = lista.indexOf(alvo);
            break;
        } else {
            resposta = -1;
        }
    }

    const codigoPython = `
def busca(nums, alvo):
    for i, n in enumerate(nums):
        if n == alvo:
            return i
    return -1

print(busca([${lista.join(', ')}], ${alvo}))`.trim();

    return {
        codigo_python: codigoPython,
        texto: "Qual o retorno?",
        resposta_correta: resposta,
        parametros: { lista, alvo }
    };
}

function validarDesafio4(jsonDesafio, respostaPlayer) {
    return jsonDesafio['resposta_correta'] === respostaPlayer;
}

console.log(gerarDesafio4());

function gerarDesafio5() {
    const palavrasBase = [
        "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez",
        "primeiro", "segundo", "terceiro", "quinto", "oitavo", "número", "valor", "chave", "resposta", "resultado"
    ];

    const chavesEscolhidas = palavrasBase.sort(() => Math.random() - 0.5).slice(0, 5);

    const casos = [];
    const mapaRespostas = new Map();

    for (const palavra of chavesEscolhidas) {
        const chave = Math.random() < 0.5 ? palavra : Math.floor(Math.random() * 10 + 1);
        const retorno = Math.random() < 0.5
            ? palavrasBase[Math.floor(Math.random() * palavrasBase.length)]
            : Math.floor(Math.random() * 100);

        casos.push({ chave, retorno });
        mapaRespostas.set(chave, retorno);
    }

    const possiveisEntradas = [
        ...chavesEscolhidas,
        ...Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)),
        ...palavrasBase
    ];
    const entrada = possiveisEntradas[Math.floor(Math.random() * possiveisEntradas.length)];

    const resposta = mapaRespostas.has(entrada) ? mapaRespostas.get(entrada) : "padrão";

    const formatar = (valor) => (typeof valor === "string" ? `"${valor}"` : valor);

    const codigoPython = `
def resposta(valor):
    match valor:
${casos.map(c => `        case ${formatar(c.chave)}:\n            return ${formatar(c.retorno)}`).join("\n")}
        case _:
            return "padrão"

print(resposta(${formatar(entrada)}))
`.trim();

    return {
        codigo_python: codigoPython,
        texto: "Qual o retorno?",
        resposta_correta: resposta
    };
}

function validarDesafio5(jsonDesafio, respostaPlayer) {
    return jsonDesafio['resposta_correta'] === respostaPlayer;
}

// console.log(gerarDesafio5());