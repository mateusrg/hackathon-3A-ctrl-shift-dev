function gerarDesafioTipo1() {
  const lista = [1, 2, 3, 4, 5];
  for (let i = lista.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [lista[i], lista[j]] = [lista[j], lista[i]];
  }
  return lista;
}

function gerarDesafioTipo2() {
  const tipo = Math.floor(Math.random() * 5) + 1;
  switch (tipo) {
    case 1: {
      const ehPar = Math.random() < 0.5;
      const criterioTexto = ehPar ? "num % 2 == 0" : "num % 2 != 0";
      const comentario = ehPar ? "pares" : "ímpares";
      const tamanho = Math.floor(Math.random() * 11) + 10;
      const numeros = Array.from({ length: tamanho }, () =>
        Math.floor(Math.random() * 1000) + 1
      );
      const incrementar = Math.floor(Math.random() * 5) + 1;
      const ajusteFinal = Math.floor(Math.random() * 11) - 5;
      const totalValidos = numeros.filter(n =>
        ehPar ? n % 2 === 0 : n % 2 !== 0
      ).length;
      const resultadoEsperado = totalValidos * incrementar + ajusteFinal;
      const codigo_python = `
def conta_${comentario}(numeros):
    contador = 0
    for num in numeros:
        if ${criterioTexto}:
            contador += ${incrementar}
    return contador + ???
lista = [${numeros.join(", ")}]
print(conta_${comentario}(lista))
`.trim();
      return {
        codigo_python,
        texto: "Imprima " + resultadoEsperado,
        resposta_correta: ajusteFinal
      };
    }

    case 2: {
      const numVogais = Math.floor(Math.random() * 5) + 1;
      const tamanhoPalavra = Math.floor(Math.random() * 6) + (numVogais + 1);
      const resultado = numVogais * tamanhoPalavra;
      const codigo_python = `
def produto_caracteres_vogais(palavra):
    vogais = 'aeiouAEIOU'
    contador_vogais = 0
    for letra in palavra:
        if letra in vogais:
            contador_vogais += 1
    return contador_vogais * len(palavra)

print(produto_caracteres_vogais('???'))
`.trim();
      return {
        codigo_python,
        texto: "Retorne " + resultado,
        resposta_correta: resultado
      };
    }

    case 3: {
      const tamanhoLista = Math.floor(Math.random() * 4) + 5;
      const divisor = Math.floor(Math.random() * 4) + 2;
      const usados = new Set();
      const lista = [];
      while (lista.length < tamanhoLista) {
        const q = Math.floor(Math.random() * 20) + 1;
        const valor = q * divisor;
        if (!usados.has(valor)) {
          lista.push(valor);
          usados.add(valor);
        }
      }
      const indiceCorreto = Math.floor(Math.random() * lista.length);
      const resultadoEsperado = lista[indiceCorreto] / divisor;
      const codigo_python = `
lista = [${lista.join(", ")}]
print(lista[???] / ${divisor})
`.trim();
      return {
        codigo_python,
        texto: "Imprima " + resultadoEsperado,
        resposta_correta: indiceCorreto
      };
    }

    case 4: {
      const quantidade = Math.floor(Math.random() * 4) + 4;
      const mediaInteira = Math.floor(Math.random() * 11) + 10;
      const somaEsperada = mediaInteira * quantidade;
      const listaParcial = [];
      for (let i = 0; i < quantidade - 1; i++) {
        listaParcial.push(Math.floor(Math.random() * 21) + 5);
      }
      const somaParcial = listaParcial.reduce((a, b) => a + b, 0);
      const valorFaltando = somaEsperada - somaParcial;
      const codigo_python = `
def media_lista(nums):
    soma = sum(nums)
    media = soma / len(nums)
    return media

valores = [${listaParcial.join(", ")}, ???]
print(media_lista(valores))
`.trim();
      return {
        codigo_python,
        texto: "Imprima " + mediaInteira,
        resposta_correta: valorFaltando
      };
    }

    case 5: {
      const palavras = [
        "prato","livro","carro","plano","troca",
        "festa","janela","velho","porta","gente",
        "coisa","tempo","ponto","corpo","fruta",
        "barco","letra","grito","pleno","folha"
      ];
      const palavraCorreta = palavras[Math.floor(Math.random() * palavras.length)];
      const listaOrig = palavraCorreta.split("");
      const indiceErro = Math.floor(Math.random() * listaOrig.length);
      const letraCorreta = listaOrig[indiceErro];
      const alfabeto = "abcdefghijklmnopqrstuvwxyz";
      let letraErrada;
      do {
        letraErrada = alfabeto[Math.floor(Math.random() * alfabeto.length)];
      } while (letraErrada === letraCorreta);
      const listaComErro = [...listaOrig];
      listaComErro[indiceErro] = letraErrada;
      const palavraErrada = listaComErro.join("");
      const codigo_python = `
def corrige(palavra):
    lista = list(palavra)
    lista[???] = '${letraCorreta}'
    return ''.join(lista)

print(corrige('${palavraErrada}'))
`.trim();
      return {
        codigo_python,
        texto: `Imprima "${palavraCorreta}"`,
        resposta_correta: indiceErro
      };
    }
  }
}

function gerarDesafioTipo3() {
  const tipo = Math.floor(Math.random() * 5) + 1;
  switch (tipo) {
    case 1: {
      const tamanho = Math.floor(Math.random() * 4) + 3;
      const valores = Array.from({ length: tamanho }, () =>
        Math.floor(Math.random() * 9) + 1
      );
      const codigo_python = `
valores = [${valores.join(', ')}]
soma = 0
for v in valores:
    soma += v
media = soma / len(valores)
print("Média: " + media)
`.trim();
      return { codigo_python, resposta_correta: 6 };
    }

    case 2: {
      const gerarValor = () => Math.floor(Math.random() * 10) + 1;
      const gerarValorNumerador = () => Math.floor(Math.random() * 100) + 1;
      const x1 = gerarValor();
      const x2 = 0;
      let x3;
      do { x3 = gerarValor(); } while (x3 === x1);
      const chamadas = [{ valor: x1 }, { valor: x2 }, { valor: x3 }]
        .sort(() => Math.random() - 0.5);
      const numerador = gerarValorNumerador();
      const codigo_python = `
def calcula(x):
    return ${numerador} / x

${chamadas.map(c => `print(calcula(${c.valor}))`).join('\n')}
`.trim();
      const linhaComErro = 4 + chamadas.findIndex(c => c.valor === 0);
      return { codigo_python, resposta_correta: linhaComErro };
    }

    case 3: {
      const letras = "abcdefghijklmnopqrstuvwxyz";
      const texto = Array.from({ length: 5 }, () =>
        letras[Math.floor(Math.random() * letras.length)]
      ).join('');
      const letra = letras[Math.floor(Math.random() * texto.length)];
      const chamadas = [
        { tipo: "upper", codigo: `print(texto.upper())` },
        { tipo: "append", codigo: `print(texto.append("${letra}"))` },
        { tipo: "index", codigo: `print(texto[${Math.floor(Math.random() * 4)}])` }
      ].sort(() => Math.random() - 0.5);
      const codigo_python = `
texto = "${texto}"
${chamadas.map(c => c.codigo).join('\n')}
`.trim();
      const linhaComErro = 2 + chamadas.findIndex(c => c.tipo === "append");
      return { codigo_python, resposta_correta: linhaComErro };
    }

    case 4: {
      const nomes = [
        "Ana","João","Maria","Carlos","Lucas","Fernanda","Pedro","Gabriela",
        "Rafael","Larissa","Mário","Juliana","Ricardo","Vanessa","Daniel",
        "Renata","Tiago","Carla","Rodrigo","Beatriz"
      ];
      const nomeAleatorio = nomes[Math.floor(Math.random() * nomes.length)];
      const dados = {
        nome: nomeAleatorio,
        idade: Math.floor(Math.random() * 60) + 18,
        altura: (Math.random() * 0.5 + 1.5).toFixed(2)
      };
      const erroNaLinha = Math.floor(Math.random() * 3) + 3;
      const chaves = ["nome","idade","altura"];
      const chaveErrada = chaves[Math.floor(Math.random() * chaves.length)] + " ";
      const linhas = [
        `print(dados["nome"])`,
        `print(dados["altura"])`,
        `print(dados["idade"])`
      ];
      linhas[erroNaLinha - 3] = `print(dados["${chaveErrada}"])`;
      const codigo_python = `
dados = { "nome": "${dados.nome}", "idade": ${dados.idade}, "altura": ${dados.altura} }

${linhas.join('\n')}
`.trim();
      return { codigo_python, resposta_correta: erroNaLinha };
    }

    case 5: {
      const nomes = [
        "Jorge","Ana","Carlos","Beatriz","Fernando","Marina","Lucas","Patrícia",
        "Ricardo","Letícia","Roberto","Gabriela","Paulo","Juliana","Mateus",
        "Amanda","Eduardo","Larissa","Bruno","Camila"
      ];
      const nome = nomes[Math.floor(Math.random() * nomes.length)];
      const idade = Math.floor(Math.random() * (70 - 18 + 1)) + 18;
      const funcoes = [
        "boasVindas","saudacao","olaUsuario","inicio","cumprimento",
        "adeus","despedida","fim","tchauzinho","encerramento"
      ].sort(() => Math.random() - 0.5);
      const func1 = funcoes[0], func2 = funcoes[1];
      const bloco1 = [
        `def ${func1}(): return`,
        `print(f"Olá, {nome}!")`
      ];
      const bloco2 = [
        `def ${func2}():`,
        `print("Tchau!")`
      ];
      const ordem = Math.random() < 0.5 ? [bloco1, bloco2] : [bloco2, bloco1];
      let linhas = [`nome = "${nome}"`, `idade = ${idade}`];
      ordem.forEach(b => linhas.push(...b));
      linhas.push(`${func1}()`);
      const erroIndex = linhas.findIndex(l => l.startsWith("def") && !l.endsWith("return")) + 1;
      const codigo_python = linhas.join("\n");
      return { codigo_python, resposta_correta: erroIndex };
    }
  }
}

function gerarDesafioTipo4() {
  const cores = ["vermelho", "amarelo", "verde", "azul"];
  const randInt = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

  const valorFinal = randInt(5, 15);

  const botoes = [];
  for (let i = 0; i < 4; i++) {
      const numOps = randInt(1, 2);
      const ops = [];
      for (let j = 0; j < numOps; j++) {
          const target = cores[randInt(0, 3)];
          const usaVariavel = Math.random() < 0.6;
          const op1 = Math.random() < 0.5 ? "+=" : "-=";
          if (usaVariavel) {
              let source = cores[randInt(0, 3)];
              while (source === target) source = cores[randInt(0, 3)];
              const sourceOp = Math.random() < 0.5 ? "+" : "-";
              const k = randInt(0, 5);
              ops.push({ target, op1, expr: `${source} ${sourceOp} ${k}` });
          } else {
              const k = randInt(1, 7);
              ops.push({ target, op1, expr: `${k}` });
          }
      }
      botoes.push(ops);
  }

  const estado = {};
  cores.forEach(c => (estado[c] = valorFinal));

  const seqSol = [0, 1, 2, 3].sort(() => Math.random() - 0.5);

  for (let idx = seqSol.length - 1; idx >= 0; idx--) {
      const btn = botoes[seqSol[idx]];
      for (let opIdx = btn.length - 1; opIdx >= 0; opIdx--) {
          const { target, op1, expr } = btn[opIdx];

          let valorExpr;
          const m = expr.match(/^([a-z]+) ([+-]) (\d+)$/);
          if (m) {
              const [, varName, sign, num] = m;
              valorExpr = sign === "+"
                  ? estado[varName] + Number(num)
                  : estado[varName] - Number(num);
          } else {
              valorExpr = Number(expr);
          }

          if (op1 === "+=") estado[target] -= valorExpr;
          else estado[target] += valorExpr;
      }
  }

  const botoesStr = botoes.map(ops =>
      ops.map(o => `${o.target} ${o.op1} ${o.expr}`)
  );

  return {
      valoresIniciais: estado,
      botoes: botoesStr
  };
}

function gerarDesafioTipo5() {
  const tipo = Math.floor(Math.random() * 5) + 1;
  switch (tipo) {
    case 1: {
      const lista = Array.from({ length: 3 }, () => Math.floor(Math.random() * 10) + 1);
      const indice = Math.floor(Math.random() * lista.length);
      const resposta = lista.length * lista[indice];
      const codigo_python = `
lista = [${lista.join(', ')}]
x = len(lista) * lista[${indice}]
`;
      return { codigo_python: codigo_python.trim(), resposta_correta: resposta };
    }

    case 2: {
      const tamanho = Math.floor(Math.random() * 4) + 3;
      const valores = Array.from(new Set(
        Array.from({ length: tamanho }, () => Math.floor(Math.random() * 10) + 1)
      ));
      const limite = Math.floor(Math.random() * 6) + 2;
      let soma = 0;
      valores.forEach(v => { if (v > limite) soma += v; });
      const codigo_python = `
valores = [${valores.join(', ')}]
soma = 0
for v in valores:
    if v > ${limite}:
        soma += v
print(soma)
`;
      return { codigo_python: codigo_python.trim(), resposta_correta: soma };
    }

    case 3: {
      const n = Math.floor(Math.random() * 51);
      const resultado = (n % 2 === 0) ? n - 2 : n * 2;
      const codigo_python = `
def misterio(n):
    if n % 2 == 0:
        return n - 2
    return n * 2

print(misterio(${n}))
`;
      return { codigo_python: codigo_python.trim(), resposta_correta: resultado };
    }

    case 4: {
      const tamanho = Math.floor(Math.random() * 4) + 3;
      const lista = Array.from(new Set(
        Array.from({ length: tamanho }, () => Math.floor(Math.random() * 20) + 1)
      ));
      const alvo = Math.floor(Math.random() * 20) + 1;
      let retorno = -1;
      for (let i = 0; i < lista.length; i++) {
        if (lista[i] === alvo) {
          retorno = i;
          break;
        }
      }
      const codigo_python = `
def busca(nums, alvo):
    for i, n in enumerate(nums):
        if n == alvo:
            return i
    return -1

print(busca([${lista.join(', ')}], ${alvo}))
`;
      return { codigo_python: codigo_python.trim(), resposta_correta: retorno };
    }

    case 5: {
      const palavrasBase = [
        "um","dois","três","quatro","cinco","seis","sete","oito","nove","dez",
        "primeiro","segundo","terceiro","quinto","oitavo","número","valor","chave","resposta","resultado"
      ];
      const chaves = palavrasBase.sort(() => Math.random() - 0.5).slice(0, 5);
      const casos = {};
      chaves.forEach(k => {
        const ret = Math.random() < 0.5
          ? palavrasBase[Math.floor(Math.random() * palavrasBase.length)]
          : Math.floor(Math.random() * 100);
        casos[k] = ret;
      });
      const entradas = [
        ...chaves,
        ...Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)),
        ...palavrasBase
      ];
      const entrada = entradas[Math.floor(Math.random() * entradas.length)];
      const resposta = (entrada in casos) ? casos[entrada] : "padrão";
      const fmt = v => (typeof v === "string" ? `"${v}"` : v);
      const codigo_python = `
def resposta(valor):
    match valor:
${Object.entries(casos).map(([k,v]) =>
      `        case ${fmt(k)}:\n            return ${fmt(v)}`
    ).join('\n')}
        case _:
            return "padrão"

print(resposta(${fmt(entrada)}))
`;
      return { codigo_python: codigo_python.trim(), resposta_correta: resposta };
    }
  }
}

let questoes = [];

function gerarDesafioTipo6() {
  const fs = require('fs');
  if (!Array.isArray(questoes) || questoes.length === 0) {
    const lista = JSON.parse(fs.readFileSync('questoes.json', 'utf-8')).questoes;

    for (const pergunta of lista) {
      pergunta.alternativas = pergunta.alternativas
        .map((texto, indice) => ({ texto, correta: indice === 0 }))
        .sort(() => Math.random() - 0.5);
    }

    for (let i = lista.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [lista[i], lista[j]] = [lista[j], lista[i]];
    }

    questoes = lista;
  }

  const desafio = questoes.splice(0, 3);
  desafio.sort(() => Math.random() - 0.5);
  for (const pergunta of desafio) {
    pergunta.alternativas.sort(() => Math.random() - 0.5);
  }

  questoes.push(...desafio);

  return desafio;
}

function validarDesafioTipo2(desafio, respostaPlayer) {
  const code = desafio.codigo_python || "";

  if (code.includes("def produto_caracteres_vogais") && code.includes("vogais =")) {
    const vogais = 'aeiouAEIOU';
    const numVogais = [...respostaPlayer]
      .filter(ch => vogais.includes(ch))
      .length;
    const produto = numVogais * respostaPlayer.length;
    return produto === desafio.resposta_correta;
  }

  return respostaPlayer === desafio.resposta_correta;
}

function validarDesafioTipo3(desafio, respostaPlayer) {
  return respostaPlayer === desafio.resposta_correta;
}

function validarDesafioTipo5(desafio, respostaPlayer) {
  return respostaPlayer === desafio.resposta_correta;
}