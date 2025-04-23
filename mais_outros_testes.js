function gerarDesafio1() {
    const tamanho = Math.floor(Math.random() * 4) + 3;
    const valores = Array.from({ length: tamanho }, () => Math.floor(Math.random() * 9) + 1);

    const codigoPython = `
valores = [${valores.join(', ')}]
soma = 0
for v in valores:
    soma += v
media = soma / len(valores)
print("Média: " + media)
`.trim();

    return {
        codigo_python: codigoPython,
        texto: "Remova a linha que causa erro",
        resposta_correta: 6,
        parametros: { valores }
    };
}

function validarDesafio1(jsonDesafio, respostaPlayer) {
    return jsonDesafio['resposta_correta'] === respostaPlayer;
}

// console.log(gerarDesafio1());

function gerarDesafio2() {
    const gerarValor = () => Math.floor(Math.random() * 10) + 1;
    const gerarValorNumerador = () => Math.floor(Math.random() * 100) + 1;

    const x1 = gerarValor();
    const x2 = 0;
    let x3;
    do {
        x3 = gerarValor();
    } while (x3 === x1);

    const chamadas = [
        { valor: x1 },
        { valor: x2 },
        { valor: x3 }
    ];

    chamadas.sort(() => Math.random() - 0.5);

    const numerador = gerarValorNumerador();

    const codigoPython = `
def calcula(x):
    return ${numerador} / x

${chamadas.map(c => `print(calcula(${c.valor}))`).join('\n')}
`.trim();

    const linhaComErro = 4 + chamadas.findIndex(c => c.valor === 0);

    const numerosLista = chamadas.map(c => c.valor);

    return {
        codigo_python: codigoPython,
        texto: "Remova a linha que causa erro",
        resposta_correta: linhaComErro,
        parametros: { numerosLista, numerador }
    };
}

function validarDesafio2(jsonDesafio, respostaPlayer) {
    return jsonDesafio['resposta_correta'] === respostaPlayer;
}

// console.log(gerarDesafio2());

function gerarDesafio3() {
    const letras = "abcdefghijklmnopqrstuvwxyz";
    const texto = Array.from({ length: 5 }, () => letras[Math.floor(Math.random() * letras.length)]).join('');
    const letra = letras[Math.floor(Math.random() * texto.length)];

    const chamadas = [
        { tipo: "upper", codigo: `print(texto.upper())` },
        { tipo: "append", codigo: `print(texto.append("${letra}"))` },
        { tipo: "index", codigo: `print(texto[${Math.floor(Math.random() * 4) + 1}])` }
    ];

    chamadas.sort(() => Math.random() - 0.5);

    const codigoPython = `
texto = "${texto}"
${chamadas.map(c => c.codigo).join('\n')}
`.trim();

    const linhaComErro = 2 + chamadas.findIndex(c => c.tipo === "append");

    return {
        codigo_python: codigoPython,
        texto: "Remova a linha que causa erro",
        resposta_correta: linhaComErro,
        parametros: { texto }
    };
}

function validarDesafio3(jsonDesafio, respostaPlayer) {
    return jsonDesafio['resposta_correta'] === respostaPlayer;
}

// console.log(gerarDesafio3());

function gerarDesafio4() {
    const nomes = [
        "Ana", "João", "Maria", "Carlos", "Lucas", "Fernanda", "Pedro", "Gabriela", "Rafael", "Larissa",
        "Mário", "Juliana", "Ricardo", "Vanessa", "Daniel", "Renata", "Tiago", "Carla", "Rodrigo", "Beatriz"
    ];

    const nomeAleatorio = nomes[Math.floor(Math.random() * nomes.length)];

    const dados = {
        nome: nomeAleatorio,
        idade: Math.floor(Math.random() * 60) + 18,
        altura: (Math.random() * (2 - 1.5) + 1.5).toFixed(2),
    };

    const erroNaLinha = Math.floor(Math.random() * 3) + 3;

    let linhas = [
        `print(dados["nome"])`,
        `print(dados["altura"])`,
        `print(dados["idade"])`
    ];

    linhas[erroNaLinha - 3] = `print(dados["${Object.keys(dados)[Math.floor(Math.random() * Object.keys(dados).length)]} "])`; // Gera erro com chave com espaço

    const codigoPython = `
dados = { "nome": "${dados.nome}", "idade": ${dados.idade}, "altura": ${dados.altura} }

${linhas[0]}
${linhas[1]}
${linhas[2]}
`.trim();

    return {
        codigo_python: codigoPython,
        texto: `Qual linha tem o erro? O dicionário contém as chaves: nome, idade, altura, profissao, sexo.`,
        resposta_correta: erroNaLinha,
        parametros: { dados }
    };
}

function validarDesafio4(jsonDesafio, respostaPlayer) {
    return jsonDesafio['resposta_correta'] === respostaPlayer;
}

console.log(gerarDesafio4());

function gerarDesafio5() {
    const nomes = [
        "Jorge", "Ana", "Carlos", "Beatriz", "Fernando", "Marina", "Lucas", "Patrícia", "Ricardo", "Letícia",
        "Roberto", "Gabriela", "Paulo", "Juliana", "Mateus", "Amanda", "Eduardo", "Larissa", "Bruno", "Camila"
    ];

    const nome = nomes[Math.floor(Math.random() * nomes.length)];
    const idade = Math.floor(Math.random() * (70 - 18 + 1)) + 18;

    const nomesFuncoes = [
        "boasVindas", "saudacao", "olaUsuario", "inicio", "cumprimento",
        "adeus", "despedida", "fim", "tchauzinho", "encerramento"
    ];
    const func1 = nomesFuncoes.splice(Math.floor(Math.random() * nomesFuncoes.length), 1)[0];
    const func2 = nomesFuncoes.splice(Math.floor(Math.random() * nomesFuncoes.length), 1)[0];

    const bloco1 = [
        ``,
        `def ${func1}(): return`,
        `print(f"Olá, {nome}!")`
    ];

    const bloco2 = [
        ``,
        `def ${func2}():`,
        `print("Tchau!")`
    ];

    const bloco3 = [
        ``,
        `${func1}()`
    ];

    const ordem = Math.random() < 0.5 ? [bloco1, bloco2] : [bloco2, bloco1];

    let linhas = [`nome = "${nome}"`, `idade = ${idade}`];

    ordem.forEach(bloco => {
        linhas = linhas.concat(bloco);
    });

    linhas = linhas.concat(bloco3);

    const indexBloco2 = ordem[0] === bloco2 ? 3 : 5;

    return {
        codigo_python: linhas.join("\n"),
        texto: "Remova a linha com erro",
        resposta_correta: indexBloco2 + 2
    };
}

function validarDesafio5(jsonDesafio, respostaPlayer) {
    return jsonDesafio['resposta_correta'] === respostaPlayer;
}

console.log(gerarDesafio5());