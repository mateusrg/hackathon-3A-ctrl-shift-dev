import Usuario from '../funcoes/usuario.js';

async function verificarLogin() {
    const usuarioStorage = JSON.parse(localStorage.getItem('usuario'));

    if (!usuarioStorage || usuarioStorage.length === 0) {
        window.location.href = '../../html/login/pagina_inicial_deslogado.html';
        return;
    }

    try {
        const usuario = await Usuario.selecionarUsuarioPorId(usuarioStorage.id);

        if (!usuario || usuario.email !== usuarioStorage.email) {
            window.location.href = '../../html/login/pagina_inicial_deslogado.html';
        }
    } catch (error) {
        console.error("Erro ao acessar o servidor:", error);
        window.location.href = '../../html/login/pagina_inicial_deslogado.html';
    }
}

if (localStorage.getItem('isRun') == null) {
    localStorage.setItem('isRun', false);
}

if (localStorage.getItem('isRun') == 'false') {
    window.location.href = '../../html/tela_inicial/pagina_inicial.html';
}

localStorage.setItem('isRun', false);

verificarLogin();

const usuarioParaObterId = await Usuario.getUsuarioLogado();
const usuarioId = usuarioParaObterId.id;
const abasCT = ['#tb-reuniao', '#tb-pasta', '#tb-lista', '#tb-jogo', '#tb-tarefa', '#xis-pasta', '#minimizar-pasta', '#documento-aberto-fechar', '#documento-aberto-minimizar', '#doc-1', '#doc-2', '#doc-3', '#doc-4', '#doc-5'];
let handleClick;

const dificuldade = Number(localStorage.getItem('dificuldadeSelecionada'));

let limiteAdvertencias;
let decaimentoEnergiaEFelicidadeEmS;
let aumentoTempoCafeteiraVazamento;
let toleranciaMicrofone;
let toleranciaCompartilhamento;
let pontuacaoMinima;
let energiaCafeRestaura;
let felicidadeInimigoDerrotado;
let frequenciaEventosMinimo;
let frequenciaEventosMaximo;
let toleranciaCamera = 15;

switch (dificuldade) {
    case 1:
        limiteAdvertencias = 3;
        decaimentoEnergiaEFelicidadeEmS = 1 / 0.5;
        aumentoTempoCafeteiraVazamento = 1;
        toleranciaMicrofone = 7;
        toleranciaCompartilhamento = 15;
        pontuacaoMinima = 20;
        energiaCafeRestaura = 70;
        felicidadeInimigoDerrotado = 6;
        frequenciaEventosMinimo = 40;
        frequenciaEventosMaximo = 60;
        break;
    case 2:
        limiteAdvertencias = 2;
        decaimentoEnergiaEFelicidadeEmS = 1 / 1;
        aumentoTempoCafeteiraVazamento = 2;
        toleranciaMicrofone = 5;
        toleranciaCompartilhamento = 10;
        pontuacaoMinima = 25;
        energiaCafeRestaura = 50;
        felicidadeInimigoDerrotado = 5;
        frequenciaEventosMinimo = 30;
        frequenciaEventosMaximo = 50;
        document.querySelector('#adv_4').style.display = 'none';
        break;
    case 3:
        limiteAdvertencias = 1;
        decaimentoEnergiaEFelicidadeEmS = 1 / 1.5;
        aumentoTempoCafeteiraVazamento = 3;
        toleranciaMicrofone = 4;
        toleranciaCompartilhamento = 7;
        pontuacaoMinima = 30;
        energiaCafeRestaura = 40;
        felicidadeInimigoDerrotado = 4;
        frequenciaEventosMinimo = 25;
        frequenciaEventosMaximo = 40;
        document.querySelector('#adv_3').style.display = 'none';
        document.querySelector('#adv_4').style.display = 'none';
        break;
    default:
        limiteAdvertencias = 0;
        decaimentoEnergiaEFelicidadeEmS = 1 / 2;
        aumentoTempoCafeteiraVazamento = 5;
        toleranciaMicrofone = 3;
        toleranciaCompartilhamento = 5;
        pontuacaoMinima = 35;
        energiaCafeRestaura = 30;
        felicidadeInimigoDerrotado = 3;
        frequenciaEventosMinimo = 15;
        frequenciaEventosMaximo = 35;
        document.querySelector('#adv_2').style.display = 'none';
        document.querySelector('#adv_3').style.display = 'none';
        document.querySelector('#adv_4').style.display = 'none';
}

// Funções de Geração e Validação de Desafio
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
                texto: "Retorne " + resultado
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
                "prato", "livro", "carro", "plano", "troca",
                "festa", "janela", "velho", "porta", "gente",
                "coisa", "tempo", "ponto", "corpo", "fruta",
                "barco", "letra", "grito", "pleno", "folha"
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
                "Ana", "João", "Maria", "Carlos", "Lucas", "Fernanda", "Pedro", "Gabriela",
                "Rafael", "Larissa", "Mário", "Juliana", "Ricardo", "Vanessa", "Daniel",
                "Renata", "Tiago", "Carla", "Rodrigo", "Beatriz"
            ];
            const nomeAleatorio = nomes[Math.floor(Math.random() * nomes.length)];
            const dados = {
                nome: nomeAleatorio,
                idade: Math.floor(Math.random() * 60) + 18,
                altura: (Math.random() * 0.5 + 1.5).toFixed(2)
            };
            const erroNaLinha = Math.floor(Math.random() * 3) + 3;
            const chaves = ["nome", "idade", "altura"];
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
                "Jorge", "Ana", "Carlos", "Beatriz", "Fernando", "Marina", "Lucas", "Patrícia",
                "Ricardo", "Letícia", "Roberto", "Gabriela", "Paulo", "Juliana", "Mateus",
                "Amanda", "Eduardo", "Larissa", "Bruno", "Camila"
            ];
            const nome = nomes[Math.floor(Math.random() * nomes.length)];
            const idade = Math.floor(Math.random() * (70 - 18 + 1)) + 18;
            const funcoes = [
                "boasVindas", "saudacao", "olaUsuario", "inicio", "cumprimento",
                "adeus", "despedida", "fim", "tchauzinho", "encerramento"
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
    const cores = ["Vermelho", "Amarelo", "Verde", "Azul"];
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
            const m = expr.match(/^([A-Za-z]+) ([+-]) (\d+)$/);
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
            const pergunta = `Qual o valor de x?`;
            return { codigo_python: codigo_python.trim(), resposta_correta: resposta, pergunta: pergunta };
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
        soma += v`;
            const pergunta = `Qual o valor de soma?`;
            return { codigo_python: codigo_python.trim(), resposta_correta: soma, pergunta: pergunta };
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
            const pergunta = `Qual o retorno da função?`;
            return { codigo_python: codigo_python.trim(), resposta_correta: resultado, pergunta: pergunta };
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
  
busca([${lista.join(', ')}], ${alvo})`;
            const pergunta = `Qual o retorno da função?`;
            return { codigo_python: codigo_python.trim(), resposta_correta: retorno, pergunta: pergunta };
        }

        case 5: {
            const palavrasBase = [
                "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez",
                "primeiro", "segundo", "terceiro", "quinto", "oitavo", "número", "valor", "chave", "resposta", "resultado"
            ];
            const chaves = palavrasBase.sort(() => Math.random() - 0.5).slice(0, 4);
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
            const resposta = (entrada in casos) ? casos[entrada] : "padrao";
            const fmt = v => (typeof v === "string" ? `"${v}"` : v);
            const codigo_python = `
def resposta(valor):
    match valor:
${Object.entries(casos).map(([k, v]) =>
                `        case ${fmt(k)}: return ${fmt(v)}`
            ).join('\n')}
        case _: return "padrao"
resposta(${fmt(entrada)})`;
            const pergunta = 'Qual o retorno da função?';
            return { codigo_python: codigo_python.trim(), resposta_correta: resposta, pergunta: pergunta };
        }
    }
}

let questoes = [];

const questoesJson = {
    "questoes": [
        {
            "pergunta": "Em Python, qual método adiciona elemento ao final de uma lista?",
            "alternativas": [
                "append()",
                "add()",
                "push()",
                "extend()"
            ]
        },
        {
            "pergunta": "Em Python, qual sintaxe permite incluir variáveis diretamente em strings usando {}?",
            "alternativas": [
                "f-string",
                "str.format()",
                "printf()",
                "concatenação"
            ]
        },
        {
            "pergunta": "Em Python, qual função retorna pares de índice e valor ao iterar?",
            "alternativas": [
                "enumerate()",
                "zip()",
                "range()",
                "items()"
            ]
        },
        {
            "pergunta": "Como se define uma função geradora em Python?",
            "alternativas": [
                "usar yield",
                "def generator",
                "usar return",
                "lambda"
            ]
        },
        {
            "pergunta": "Qual decorator em Python torna método de classe?",
            "alternativas": [
                "@classmethod",
                "@staticmethod",
                "@property",
                "@init__"
            ]
        },
        {
            "pergunta": "Qual operador desempacota dicionários em chamadas de função?",
            "alternativas": [
                "**",
                "*",
                "&",
                "//"
            ]
        },
        {
            "pergunta": "Em JS, qual método retorna uma Promise com array de resultados quando todas resolvem?",
            "alternativas": [
                "Promise.all()",
                "Promise.any()",
                "Promise.race()",
                "Promise.allSettled()"
            ]
        },
        {
            "pergunta": "Qual palavra-chave do JS declara variável com escopo de bloco?",
            "alternativas": [
                "let",
                "var",
                "local",
                "block"
            ]
        },
        {
            "pergunta": "Em JavaScript, closure é:",
            "alternativas": [
                "função retém escopo",
                "objeto imutável",
                "método estático",
                "variável global"
            ]
        },
        {
            "pergunta": "Qual método itera sobre array e retorna um novo array?",
            "alternativas": [
                "map()",
                "filter()",
                "forEach()",
                "reduce()"
            ]
        },
        {
            "pergunta": "Qual evento dispara quando o DOM é totalmente carregado?",
            "alternativas": [
                "DOMContentLoaded",
                "load",
                "ready",
                "init"
            ]
        },
        {
            "pergunta": "Como limitar resultados em MySQL para os 5 primeiros registros?",
            "alternativas": [
                "LIMIT 5",
                "TOP 5",
                "FIRST 5",
                "FETCH 5"
            ]
        },
        {
            "pergunta": "Qual cláusula filtra resultados após agrupar dados?",
            "alternativas": [
                "HAVING",
                "WHERE",
                "GROUP BY",
                "ORDER BY"
            ]
        },
        {
            "pergunta": "Em SQL, qual função substitui NULL por valor padrão?",
            "alternativas": [
                "COALESCE()",
                "IFNULL()",
                "NVL()",
                "DEFAULT"
            ]
        },
        {
            "pergunta": "Como renomear uma coluna em uma consulta SELECT?",
            "alternativas": [
                "AS",
                "TO",
                "RENAME",
                "ALIAS"
            ]
        },
        {
            "pergunta": "Qual tipo de índice MySQL é padrão em chaves primárias InnoDB?",
            "alternativas": [
                "BTREE",
                "HASH",
                "FULLTEXT",
                "SPATIAL"
            ]
        },
        {
            "pergunta": "Qual atributo HTML define texto alternativo em <img>?",
            "alternativas": [
                "alt",
                "src",
                "title",
                "caption"
            ]
        },
        {
            "pergunta": "Como centralizar itens no eixo principal em Flexbox?",
            "alternativas": [
                "justify-content",
                "align-content",
                "text-align",
                "justify-items"
            ]
        },
        {
            "pergunta": "Qual propriedade CSS define cor de fundo de um elemento?",
            "alternativas": [
                "background-color",
                "color-bg",
                "bg-color",
                "bg"
            ]
        },
        {
            "pergunta": "Em HTML5, qual tag semântica representa o rodapé de uma página?",
            "alternativas": [
                "<footer>",
                "<section>",
                "<div>",
                "<nav>"
            ]
        },
        {
            "pergunta": "Como vincular arquivo CSS externo em HTML?",
            "alternativas": [
                "<link>",
                "<style>",
                "@import",
                "<script>"
            ]
        }
    ]
};

const perguntasJson = {
    "perguntas": [
        {
            "titulo": "Crie um comando que selecione todas as informações do morador com id 5",
            "alternativas": [
                ["SELECT", "UPDATE", "INSERT INTO", "DELETE FROM"],
                ["*", "nome", "id", "idade"],
                ["WHERE id = 5", "WHERE nome = 'João'", "WHERE idade = 30", "WHERE altura = 1.75"]
            ],
            "correta": ["SELECT", "*", "WHERE id = 5"]
        },
        {
            "titulo": "Selecione apenas o nome dos moradores",
            "alternativas": [
                ["SELECT", "INSERT INTO", "UPDATE", "DELETE FROM"],
                ["nome", "*", "id", "idade"],
                ["FROM moradores", "WHERE nome = 'Ana'", "FROM dados", "WHERE id = 3"]
            ],
            "correta": ["SELECT", "nome", "FROM moradores"]
        },
        {
            "titulo": "Insira um novo morador chamado Carlos, com 25 anos",
            "alternativas": [
                ["INSERT INTO", "SELECT", "DELETE FROM", "UPDATE"],
                ["moradores (nome, idade)", "usuarios (nome, idade)", "clientes (nome, idade)", "dados (nome, idade)"],
                ["VALUES ('Carlos', 25)", "SET nome = 'Carlos'", "WHERE nome = 'Carlos'", "VALUES (25, 'Carlos')"]
            ],
            "correta": ["INSERT INTO", "moradores (nome, idade)", "VALUES ('Carlos', 25)"]
        },
        {
            "titulo": "Atualize a idade do morador com id 3 para 28",
            "alternativas": [
                ["UPDATE", "SELECT", "DELETE FROM", "INSERT INTO"],
                ["moradores", "usuarios", "clientes", "pessoas"],
                ["SET idade = 28", "WHERE id = 3", "SET id = 3", "SET idade = 25"],
                ["WHERE id = 3", "SET idade = 28", "WHERE id = 4", "SET id = 3"]
            ],
            "correta": ["UPDATE", "moradores", "SET idade = 28", "WHERE id = 3"]
        },
        {
            "titulo": "Remova o morador com nome 'João'",
            "alternativas": [
                ["DELETE FROM", "SELECT", "INSERT INTO", "UPDATE"],
                ["moradores", "usuarios", "clientes", "dados"],
                ["WHERE nome = 'João'", "SET nome = 'João'", "VALUES ('João')", "WHERE idade = 'João'"]
            ],
            "correta": ["DELETE FROM", "moradores", "WHERE nome = 'João'"]
        },
        {
            "titulo": "Selecione moradores com idade maior que 18",
            "alternativas": [
                ["SELECT", "DELETE FROM", "INSERT INTO", "UPDATE"],
                ["*", "nome", "id", "altura"],
                ["FROM moradores", "FROM usuarios", "FROM clientes", "FROM dados"],
                ["WHERE idade > 18", "WHERE idade = 18", "WHERE idade < 18", "WHERE nome > 18"]
            ],
            "correta": ["SELECT", "*", "FROM moradores", "WHERE idade > 18"]
        },
        {
            "titulo": "Adicione um campo de email na tabela moradores",
            "alternativas": [
                ["ALTER TABLE", "SELECT", "INSERT INTO", "UPDATE"],
                ["moradores", "usuarios", "clientes", "dados"],
                ["ADD email VARCHAR(255)", "SET email = ''", "MODIFY email VARCHAR", "CREATE email VARCHAR"]
            ],
            "correta": ["ALTER TABLE", "moradores", "ADD email VARCHAR(255)"]
        },
        {
            "titulo": "Crie uma nova tabela chamada casas",
            "alternativas": [
                ["CREATE TABLE", "SELECT", "INSERT INTO", "DROP TABLE"],
                ["casas", "moradores", "usuarios", "enderecos"],
                ["(id INT, endereco TEXT)", "(id INT)", "USING id", "(nome, idade)"]
            ],
            "correta": ["CREATE TABLE", "casas", "(id INT, endereco TEXT)"]
        },
        {
            "titulo": "Liste todas as informações de moradores com nome iniciando com 'A'",
            "alternativas": [
                ["SELECT", "UPDATE", "DELETE FROM", "INSERT INTO"],
                ["*", "nome", "id", "idade"],
                ["FROM moradores", "FROM usuarios", "FROM clientes", "FROM dados"],
                ["WHERE nome LIKE 'A%'", "WHERE nome = '%A'", "WHERE nome IN ('A')", "WHERE nome LIKE '%A'"]
            ],
            "correta": ["SELECT", "*", "FROM moradores", "WHERE nome LIKE 'A%'"]
        },
        {
            "titulo": "Exclua a tabela temporária de teste",
            "alternativas": [
                ["DROP TABLE", "DELETE FROM", "UPDATE", "TRUNCATE TABLE"],
                ["teste", "moradores", "usuarios", "clientes"]
            ],
            "correta": ["DROP TABLE", "teste"]
        },
        {
            "titulo": "Renomeie a tabela clientes para usuarios",
            "alternativas": [
                ["ALTER TABLE", "UPDATE", "DROP TABLE", "SELECT"],
                ["clientes", "usuarios", "moradores", "dados"],
                ["RENAME TO usuarios", "RENAME usuarios", "TO usuarios", "CHANGE TO usuarios"]
            ],
            "correta": ["ALTER TABLE", "clientes", "RENAME TO usuarios"]
        },
        {
            "titulo": "Conte quantos moradores existem",
            "alternativas": [
                ["SELECT", "INSERT INTO", "UPDATE", "DELETE FROM"],
                ["COUNT(*)", "id", "nome", "*"],
                ["FROM moradores", "WHERE id > 0", "IN moradores", "WHERE nome != ''"]
            ],
            "correta": ["SELECT", "COUNT(*)", "FROM moradores"]
        },
        {
            "titulo": "Mostre os moradores ordenados por idade",
            "alternativas": [
                ["SELECT", "INSERT", "UPDATE", "DELETE"],
                ["*", "idade", "nome", "id"],
                ["ORDER BY idade", "WHERE idade", "HAVING idade", "SORT idade"]
            ],
            "correta": ["SELECT", "*", "ORDER BY idade"]
        },
        {
            "titulo": "Insira um morador com nome Ana e idade 35",
            "alternativas": [
                ["INSERT INTO", "SELECT", "UPDATE", "DELETE FROM"],
                ["moradores (nome, idade)", "usuarios (nome, idade)", "clientes (nome, idade)", "pessoas (nome, idade)"],
                ["VALUES ('Ana', 35)", "SET idade = 35", "VALUES (35, 'Ana')", "ADD ('Ana', 35)"]
            ],
            "correta": ["INSERT INTO", "moradores (nome, idade)", "VALUES ('Ana', 35)"]
        },
        {
            "titulo": "Selecione todos os moradores com nome 'Pedro'",
            "alternativas": [
                ["SELECT", "DELETE FROM", "UPDATE", "INSERT"],
                ["*", "nome", "id", "idade"],
                ["WHERE nome = 'Pedro'", "HAVING nome = 'Pedro'", "IN nome = 'Pedro'", "SET nome = 'Pedro'"]
            ],
            "correta": ["SELECT", "*", "WHERE nome = 'Pedro'"]
        },
        {
            "titulo": "Atualize o nome do morador com id 10 para 'Maria'",
            "alternativas": [
                ["UPDATE", "INSERT INTO", "DELETE FROM", "SELECT"],
                ["moradores", "usuarios", "clientes", "dados"],
                ["SET nome = 'Maria'", "WHERE id = 10", "REPLACE nome = 'Maria'", "SET id = 10"],
                ["WHERE id = 10", "SET id = 10", "WHERE nome = 'Maria'", "HAVING id = 10"]
            ],
            "correta": ["UPDATE", "moradores", "SET nome = 'Maria'", "WHERE id = 10"]
        },
        {
            "titulo": "Selecione a idade dos moradores com id de 5 a 10",
            "alternativas": [
                ["SELECT", "DELETE FROM", "INSERT INTO", "UPDATE"],
                ["idade", "*", "id", "nome"],
                ["WHERE id BETWEEN 5 AND 10", "WHERE id > 5 AND id < 10", "HAVING id", "FROM 5 TO 10"]
            ],
            "correta": ["SELECT", "idade", "WHERE id BETWEEN 5 AND 10"]
        },
        {
            "titulo": "Mostre o maior valor da idade",
            "alternativas": [
                ["SELECT", "UPDATE", "DELETE FROM", "INSERT INTO"],
                ["MAX(idade)", "idade", "nome", "COUNT(idade)"],
                ["FROM moradores", "WHERE idade", "IN moradores", "HAVING idade"]
            ],
            "correta": ["SELECT", "MAX(idade)", "FROM moradores"]
        },
        {
            "titulo": "Conte moradores com idade maior que 40",
            "alternativas": [
                ["SELECT", "DELETE FROM", "INSERT INTO", "UPDATE"],
                ["COUNT(*)", "idade", "nome", "id"],
                ["WHERE idade > 40", "HAVING idade > 40", "SET idade > 40", "IN idade > 40"]
            ],
            "correta": ["SELECT", "COUNT(*)", "WHERE idade > 40"]
        },
        {
            "titulo": "Selecione apenas id e nome dos moradores",
            "alternativas": [
                ["SELECT", "INSERT INTO", "UPDATE", "DELETE FROM"],
                ["id, nome", "*", "nome", "idade"],
                ["FROM moradores", "WHERE id", "WHERE nome", "HAVING nome"]
            ],
            "correta": ["SELECT", "id, nome", "FROM moradores"]
        },
        {
            "titulo": "Mostre todos os moradores que têm idade igual a 30",
            "alternativas": [
                ["SELECT", "INSERT INTO", "DELETE FROM", "UPDATE"],
                ["*", "idade", "nome", "id"],
                ["WHERE idade = 30", "HAVING idade = 30", "SET idade = 30", "WHERE nome = 30"]
            ],
            "correta": ["SELECT", "*", "WHERE idade = 30"]
        }
    ]
}

function gerarDesafioTipo6() {
    if (!Array.isArray(questoes) || questoes.length === 0) {
        const lista = questoesJson.questoes;

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

function gerarDesafioTipo7() {
    function shuffle(arr) {
        const a = arr.slice();
        for (let j = a.length - 1; j > 0; j--) {
            const k = Math.floor(Math.random() * (j + 1));
            [a[j], a[k]] = [a[k], a[j]];
        }
        return a;
    }

    const perguntas = shuffle(perguntasJson.perguntas);
    const q = perguntas[0];

    const alternativas = q.alternativas.map((grupo, idx) => {
        const opcoesEmbaralhadas = shuffle(grupo);
        const indiceCorreta = opcoesEmbaralhadas.indexOf(q.correta[idx]);
        return { opcoes: opcoesEmbaralhadas, indiceCorreta };
    });

    return { titulo: q.titulo, alternativas };
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

    return respostaPlayer == desafio.resposta_correta;
}

function validarDesafioTipo3(desafio, respostaPlayer) {
    return respostaPlayer == desafio.resposta_correta;
}

let tarefasConcluidasUltimosDoisMin = 0;
let quantVezesBebeuCafe = 0;
let quantVezesDerramouCafe = 0;
let tarefas = [];
let estadoTarefas = {
    1: '',
    2: '',
    3: '',
    4: ''
};

function preencherTarefas() {
    // Mapeamento tipos → funções
    const geradores = {
        1: gerarDesafioTipo1,
        2: gerarDesafioTipo2,
        3: gerarDesafioTipo3,
        4: gerarDesafioTipo4,
        5: gerarDesafioTipo5,
        6: gerarDesafioTipo6,
        7: gerarDesafioTipo7
    };

    const gerarTarefa = () => {
        const tipo = Math.floor(Math.random() * 7) + 1;
        const gerarFn = geradores[tipo];
        const resultado = gerarFn();

        let pontosGanhos;
        let pontosPerdidos;

        switch (tipo) {
            case 1:
                pontosGanhos = 3;
                pontosPerdidos = -1;
                break;
            case 2:
                pontosGanhos = 1;
                pontosPerdidos = -3;
                break;
            case 3:
                pontosGanhos = 1;
                pontosPerdidos = -1;
                break;
            case 4:
                pontosGanhos = 5;
                pontosPerdidos = -1;
                break;
            case 5:
                pontosGanhos = 1;
                pontosPerdidos = -2;
                break;
            case 6:
                pontosGanhos = 2;
                pontosPerdidos = -1;
                break;
            default:
                pontosGanhos = 1;
                pontosPerdidos = -1;
                break;
        }

        return {
            tipo,
            ...resultado,
            pontosGanhos,
            pontosPerdidos
        };
    };

    for (let i = 0; i < tarefas.length; i++) {
        if (tarefas[i] === null) {
            tarefas[i] = gerarTarefa();
            estadoTarefas[i + 1] = '';
        }
    }

    while (tarefas.length < 4) {
        tarefas.push(gerarTarefa());
    }
}
preencherTarefas();

// Resto do Código
async function gameOver(causaMorte, conquistasDesbloqueadas = []) {
    try {
        if (pontuacao >= 50 && dificuldade === 4) {
            desbloquearConquista(35);
        }

        Usuario.aumentarRunsJogadas(usuarioId, 1);
        const usuario = await Usuario.getUsuario(usuarioId);
        if (usuario.runs_jogadas >= 50) {
            desbloquearConquista(31);
        }
    } finally {
        let final = {
            "advertencias": advertencias,
            "causaMorte": causaMorte,
            "isGameOver": causaMorte !== 0,
            "pontuacao": pontuacao,
            "conquistasDesbloqueadas": conquistasDesbloqueadas,
        };

        localStorage.setItem('final', JSON.stringify(final));
        window.location.href = "../../html/final/final.html";
    }
}

let tempoRestante = 600;
let energia = 100;
let felicidade = 100;
let pontuacao = 0;

let statusReuniao = 'fechado'; // "fechado", "aberto", "selecionado"
let statusPasta = 'fechado'; // "fechado", "aberto", "selecionado"
let statusLista = 'fechado'; // "fechado", "aberto", "selecionado"
let statusJogo = 'fechado'; // "fechado", "aberto", "selecionado"
let statusTarefa = 'fechado'; // "fechado", "aberto", "selecionado"
let tarefaAberta = -1; // -1 (nenhuma), [índices das tarefas]

let microfoneAberto = false;
let cameraAberto = true;
let nivelCafe = 3;

const removeOriginal = Element.prototype.remove;

Element.prototype.remove = function () {
    removeOriginal.call(this);
    // Verifica se o elemento é uma notificação
    if (this.classList.contains('notificacao')) {
        // Atualiza a posição das notificações restantes
        const notificacoes = document.querySelectorAll('.notificacao');
        notificacoes.forEach((notificacao, index) => {
            notificacao.style.bottom = `calc(${140 + 135 * index} * var(--un))`;
        });

        const texto = this.querySelector('.texto-notificacao').textContent;

        let listaBaloes = ['#balao-espetado-mesa', '#balao-espetado-escritorio', '#balao-espetado-cafeteira'];

        if (texto.startsWith('Ligue o microfone') || texto.startsWith('Compartilhe o documento') || texto.startsWith('Religue') || texto.startsWith('Compartilhando') || texto.startsWith('Falando')) {
            listaBaloes = ['#balao-mesa', '#balao-escritorio', '#balao-cafeteira'];
        }

        listaBaloes.forEach(balaoId => {
            const balao = document.querySelector(balaoId);
            if (balao) {
                let textoAtual = balao.innerHTML;
                textoAtual = textoAtual.replace('<br>', '\n');
                textoAtual = textoAtual.replace(texto, '');
                textoAtual.replace('\n', '<br>');
                textoAtual = textoAtual.replace('<br>', '').replace('<br>', '');
                balao.innerHTML = textoAtual;
            }

            if (balao.textContent.trim() === '') {
                balao.style.display = 'none';
            }
        });
    } else if (this.classList.contains('conquista')) {
        const conquistas = document.querySelectorAll('.conquista');
        conquistas.forEach((conquista, index) => {
            conquista.style.bottom = `calc(${189 + 140 * index} * var(--un))`;
        });
    }
};

function atualizarCafe() {
    switch (nivelCafe) {
        case 0:
            cafe.style.backgroundImage = 'url("../../assets/cafe/0.png")';
            break;
        case 1:
            cafe.style.backgroundImage = 'url("../../assets/cafe/1.png")';
            break;
        case 2:
            cafe.style.backgroundImage = 'url("../../assets/cafe/2.png")';
            break;
        case 3:
            cafe.style.backgroundImage = 'url("../../assets/cafe/3.png")';
            break;
        default:
            cafe.style.backgroundImage = 'url("../../assets/cafe/4.png")';
    }
}

const cafe = document.querySelector('#cafe');

cafe.addEventListener('click', () => {
    if (nivelCafe > 0) {
        quantVezesBebeuCafe++;
        if (quantVezesBebeuCafe >= 30) {
            desbloquearConquista(5);
        }

        if (energia < 5) {
            desbloquearConquista(33);
        }

        const bebendo = document.querySelector('#bebendo');
        const cafe = document.querySelector('#cafe');
        const monitor = document.querySelector('#monitor');
        const seta = document.querySelector('#seta-baixo-mesa');

        bebendo.style.display = 'block';
        cafe.style.display = 'none';
        monitor.style.pointerEvents = 'none';
        seta.style.pointerEvents = 'none';

        setTimeout(() => {
            bebendo.style.display = 'none';
            cafe.style.display = 'block';
            monitor.style.pointerEvents = 'auto';
            seta.style.pointerEvents = 'auto';

            if (energia <= 100 - energiaCafeRestaura) {
                desbloquearConquista(16);
            }
            energia = Math.min(100, energia + energiaCafeRestaura);
            nivelCafe--;
            atualizarCafe();
            atualizarHUD();
        }, 1000);
    }
});

document.querySelector('#monitor').addEventListener('click', () => {
    const mesa = document.querySelector('#mesa');
    mesa.style.display = 'none';
    document.querySelector('body').style.backgroundImage = 'url("../../assets/entorno/bg/computador.png")';
    document.querySelector('.frame').style.borderImageSource = "url('../../assets/entorno/borda/computador.png')";
});

document.querySelector('#mesa-escritorio').addEventListener('click', carregarMesa);

async function isConquistaJaDesbloqueada(idConquista) {
    const usuario = await Usuario.getUsuarioLogado();
    return usuario.conquistas_desbloqueadas[idConquista - 1] != '0';
}

async function desbloquearConquista(idConquista) {
    const conquistaJaDesbloqueada = await isConquistaJaDesbloqueada(idConquista);
    if (conquistaJaDesbloqueada) {
        return;
    }

    const usuario = await Usuario.getUsuarioLogado();
    const usuarioId = usuario.id;

    Usuario.desbloquearConquista(usuarioId, idConquista);

    const imagem = `url("../../assets/conquistas/icones/conquistas${idConquista < 10 ? `0${idConquista}` : idConquista}.png")`;
    let texto;
    switch (idConquista) {
        case 1:
            texto = 'Mestre do Compartilhamento';
            break;
        case 2:
            texto = 'Relâmpago do Código';
            break;
        case 3:
            texto = 'Task Slayer';
            break;
        case 4:
            texto = 'Sem Condições';
            break;
        case 5:
            texto = 'Café com Leite';
            break;
        case 6:
            texto = 'Barista Desastrado';
            break;
        case 7:
            texto = 'Equilíbrio Tóxico';
            break;
        case 8:
            texto = 'Maratona de Energético';
            break;
        case 9:
            texto = 'Zen Developer';
            break;
        case 10:
            texto = 'Jogador Incansável';
            break;
        case 11:
            texto = 'Dev Relâmpago';
            break;
        case 12:
            texto = 'Testador Implacável';
            break;
        case 13:
            texto = 'Quizmaníaco';
            break;
        case 14:
            texto = 'Microfone Ninja';
            break;
        case 15:
            texto = 'Campeão do Compartilhamento';
            break;
        case 16:
            texto = 'Bebum Profissional';
            break;
        case 17:
            texto = 'Advertência Zero';
            break;
        case 18:
            texto = 'Incompetente';
            break;
        case 19:
            texto = 'Promovido a Pleno';
            break;
        case 20:
            texto = 'Promovido a Sênior';
            break;
        case 21:
            texto = 'Promovido a Tech Lead';
            break;
        case 22:
            texto = 'Sobrevivente Tech Lead';
            break;
        case 23:
            texto = 'Júnior Competente';
            break;
        case 24:
            texto = 'Pleno Superior';
            break;
        case 25:
            texto = 'Easter Eggs';
            break;
        case 26:
            texto = 'Sênior Absoluto';
            break;
        case 27:
            texto = 'Tech Lead Perfeito';
            break;
        case 28:
            texto = 'Amante do Caos';
            break;
        case 29:
            texto = 'Chega';
            break;
        case 30:
            texto = 'Mais café';
            break;
        case 31:
            texto = 'Maratona de Runs';
            break;
        case 32:
            texto = 'Diversão Equilibrada';
            break;
        case 33:
            texto = 'Um Último Suspiro';
            break;
        case 34:
            texto = 'Pós-Depressão';
            break;
        case 35:
            texto = 'O Verdadeiro Deus Gamer';
            break;
        case 36:
            texto = 'Ctrl+Shift+Dev';
            break;
    }

    const conquista = document.createElement('div');
    conquista.className = 'conquista';
    const quantidadeConquistasNaTela = document.querySelectorAll('.conquista').length;
    conquista.style.bottom = `calc(${189 + 140 * quantidadeConquistasNaTela} * var(--un))`;
    conquista.addEventListener('click', () => {
        conquista.remove();
    });
    game.appendChild(conquista);

    const imagemConquista = document.createElement('div');
    imagemConquista.className = 'imagem-conquista';
    imagemConquista.style.backgroundImage = imagem;
    conquista.appendChild(imagemConquista);

    const textoConquista = document.createElement('div');
    textoConquista.className = 'texto-conquista';
    textoConquista.textContent = texto;
    conquista.appendChild(textoConquista);

    setTimeout(() => {
        if (document.body.contains(conquista)) {
            conquista.remove();
        }
    }, 5000);

    if (usuario.conquistas_desbloqueadas == '111111111111111111111111111111111110') {
        desbloquearConquista(36);
    }
}

let advertencias = [];
function notificar(id) {
    const nomeJogador = JSON.parse(localStorage.getItem('usuario'))['nome'];
    let advertencia = true;
    let imagem;
    let texto;
    let tempo;
    let documento;

    switch (id) {
        case 1:
            advertencia = false;
            imagem = 'url("../../assets/pc/reuniao/microfone_aberto.png")';
            texto = `Ligue o microfone, ${nomeJogador}.`;
            tempo = toleranciaMicrofone;
            break;
        case 2:
            advertencia = false;
            imagem = 'url("../../assets/pc/reuniao/compartilhar_tela.png")';
            documento = ['slides_site.docx', 'dados_aplicativo.docx', 'index.pdf', 'banco_app.txt', 'server.txt'][Math.floor(Math.random() * 5)];
            texto = `Compartilhe o documento ${documento}, ${nomeJogador}.`;
            tempo = toleranciaCompartilhamento;
            break;
        case 3:
            advertencia = false;
            imagem = 'url("../../assets/pc/reuniao/camera_aberto.png")';
            texto = `Religue a câmera, ${nomeJogador}.`;
            tempo = toleranciaCamera;
            break;
        case 4:
            texto = `POR QUE NÃO LIGOU O MICROFONE, ${nomeJogador.toUpperCase()}!?`;
            break;
        case 5:
            texto = `POR QUE DESLIGOU O MICROFONE, ${nomeJogador.toUpperCase()}!?`;
            break;
        case 6:
            texto = `POR QUE DESLIGOU A CÂMERA, ${nomeJogador.toUpperCase()}!?`;
            break;
        case 7:
            texto = `AONDE VOCÊ VAI, ${nomeJogador.toUpperCase()}!?`;
            break;
        case 8:
            texto = `POR QUE NÃO COMPARTILHOU A TELA, ${nomeJogador.toUpperCase()}!?`;
            break;
        case 9:
            texto = `CADÊ O DOCUMENTO QUE EU PEDI, ${nomeJogador.toUpperCase()}!?`;
            break;
        case 10:
            texto = `NÃO É ESTE DOCUMENTO QUE EU PEDI, ${nomeJogador.toUpperCase()}!`;
            break;
        case 11:
            texto = `QUE ABAS PARALELAS ABERTAS SÃO ESSAS, ${nomeJogador.toUpperCase()}!?`;
            break;
        case 12:
            texto = `NÃO LIGUE O MICROFONE SEM SER SOLICITADO, ${nomeJogador.toUpperCase()}!`;
            break;
        case 13:
            texto = `NÃO COMPARTILHE A TELA SEM SER SOLICITADO, ${nomeJogador.toUpperCase()}!`;
            break;
        case 14:
            texto = `QUE BARULHO É ESSE? VOCÊ ESTÁ JOGANDO, ${nomeJogador.toUpperCase()}!?`;
            break;
        case 15:
            texto = `POR QUE SAIU DO DOCUMENTO, ${nomeJogador.toUpperCase()}!?`;
            break;
        default:
            texto = `Erro desconhecido.`;
    }

    if (advertencia) {
        imagem = 'url("../../assets/pc/notificacoes/info.png")';
        advertencias.push(id);
        const advertenciaElement = document.querySelector(`#adv_${advertencias.length}`);
        advertenciaElement?.classList.remove('advertencia_vazia');
        advertenciaElement?.classList.add('advertencia_cheia');

        if (advertencias.length > limiteAdvertencias) {
            let conquistasGO = [28];
            if (tempoRestante > 530) {
                conquistasGO.push(18);
            }
            gameOver(1, conquistasGO);
        }
    }

    const quantNotificacoes = document.querySelectorAll('.notificacao').length;

    const notificacao = document.createElement('div');
    notificacao.className = 'notificacao';
    notificacao.style.backgroundImage = `url("../../assets/pc/notificacoes/${advertencia ? 'vermelho' : 'azul'}.png`;
    notificacao.style.bottom = `calc(${140 + 135 * quantNotificacoes} * var(--un))`;

    const imagemNotificacao = document.createElement('div');
    imagemNotificacao.className = 'imagem-notificacao';
    imagemNotificacao.style.backgroundImage = imagem;
    notificacao.appendChild(imagemNotificacao);

    const textoNotificacao = document.createElement('div');
    textoNotificacao.className = 'texto-notificacao';
    textoNotificacao.textContent = texto;
    notificacao.appendChild(textoNotificacao);

    game.appendChild(notificacao);

    const notificacoes = document.querySelectorAll('.notificacao');
    notificacoes.forEach((notificacao, index) => {
        notificacao.style.bottom = `calc(${140 + 135 * (index)} * var(--un))`;
    });


    if (tempo) {
        const countdown = document.createElement('div');
        countdown.className = 'countdown-notificacao';
        countdown.textContent = tempo + 's';
        notificacao.appendChild(countdown);
    }

    // Remover notificação automaticamente após 4 segundos ou ao clicar
    if (advertencia) {
        notificacao.addEventListener('click', () => {
            notificacao.remove();
        });

        setTimeout(() => {
            notificacao.remove();
        }, 4000);
    }

    // Para notificações de eventos (microfone ou compartilhamento de tela)
    if (id < 3) {
        const intervalo = setInterval(() => {
            if (!document.body.contains(notificacao)) {
                clearInterval(intervalo);
            }
        }, 1000);

        setTimeout(() => {
            if (document.body.contains(notificacao)) {
                if (!eventoAtendido) {
                    notificacao.remove();
                }
            }
            clearInterval(intervalo);
        }, tempo * 1000);
    }

    let listaBaloes = ['#balao-espetado-mesa', '#balao-espetado-escritorio', '#balao-espetado-cafeteira'];

    if (id <= 3) {
        listaBaloes = ['#balao-mesa', '#balao-escritorio', '#balao-cafeteira'];
    }

    listaBaloes.forEach(balaoId => {
        const balao = document.querySelector(balaoId);
        if (balao) {
            const textoAtual = balao.innerHTML;
            if (balao.innerHTML.trim() != '') {
                balao.innerHTML = `${textoAtual}<br><br>${texto}`;
            } else {
                balao.innerHTML = texto;
            }
            balao.style.display = 'flex';
        }
    });
}

function atualizarCafeteira() {
    const cafeCafeteira = document.querySelector('#cafe-cafeteira');
    switch (nivelCafe) {
        case 0:
            cafeCafeteira.style.backgroundImage = 'url("../../assets/cafe/0.png")';
            break;
        case 1:
            cafeCafeteira.style.backgroundImage = 'url("../../assets/cafe/1.png")';
            break;
        case 2:
            cafeCafeteira.style.backgroundImage = 'url("../../assets/cafe/2.png")';
            break;
        case 3:
            cafeCafeteira.style.backgroundImage = 'url("../../assets/cafe/3.png")';
            break;
        default:
            cafeCafeteira.style.backgroundImage = 'url("../../assets/cafe/4.png")';
    }
}

let cafeteiraLigada = false;
let tempoCafeteira = 5;
let intervaloCafeteira;

function carregarMesa() {
    document.querySelector('#escritorio').style.display = 'none';
    const mesa = document.querySelector('#mesa');
    mesa.style.display = 'block';
    document.querySelector('body').style.backgroundImage = 'url("../../assets/entorno/bg/escritorio.png")';
    document.querySelector('.frame').style.borderImageSource = "url('../../assets/entorno/borda/escritorio.png')";
    if (cafeteiraLigada) {
        document.querySelector('#cafe').style.display = 'none';
    } else {
        document.querySelector('#cafe').style.display = 'block';
        atualizarCafe();
    }
}

function carregarEscritorio() {
    const escritorio = document.querySelector('#escritorio');
    document.querySelector('#mesa').style.display = 'none';
    document.querySelector('#cafeteira').style.display = 'none';
    document.querySelector('body').style.backgroundImage = 'url("../../assets/entorno/bg/escritorio.png")';
    document.querySelector('.frame').style.borderImageSource = "url('../../assets/entorno/borda/escritorio.png')";
    escritorio.style.display = 'block';
}

function carregarCafeteira() {
    document.querySelector('body').style.backgroundImage = 'url("../../assets/entorno/bg/cafeteira.png")';
    document.querySelector('.frame').style.borderImageSource = "url('../../assets/entorno/borda/cafeteira.png')";
    const cafeteira = document.querySelector('#cafeteira');
    const escritorio = document.querySelector('#escritorio');
    cafeteira.style.display = 'block';
    escritorio.style.display = 'none';
    if (document.querySelector('#texto-cafeteira').textContent != 'Vazou!') {
        atualizarCafeteira();
    }
}

function ligarCafeteira() {
    atualizarCafeteira();
    cafeteiraLigada = true;
    document.querySelector('#cafe-cafeteira').style.display = 'block';
    document.querySelector('#cafeteira-ligada').style.display = 'block';
    let countdown = tempoCafeteira;
    const textoCafeteira = document.querySelector('#texto-cafeteira');
    if (nivelCafe < 3) {
        textoCafeteira.textContent = `${countdown}s (${nivelCafe}/3)`;
    } else {
        countdown = Math.min(countdown, 3);
        textoCafeteira.textContent = `Vazando em ${countdown}...`;
    }

    intervaloCafeteira = setInterval(() => {
        countdown--;

        if (nivelCafe < 3) {
            textoCafeteira.textContent = `${countdown}s (${nivelCafe}/3)`;
        } else {
            countdown = Math.min(countdown, 3);
            textoCafeteira.textContent = `Vazando em ${countdown}...`;
        }

        if (countdown === 0) {
            if (nivelCafe < 3) {
                nivelCafe++;
                atualizarCafeteira();
                countdown = tempoCafeteira;
                if (nivelCafe < 3) {
                    textoCafeteira.textContent = `${countdown}s (${nivelCafe}/3)`;
                } else {
                    countdown = Math.min(countdown, 3);
                    textoCafeteira.textContent = `Vazando em ${countdown}...`;
                }
            } else {
                clearInterval(intervaloCafeteira);
                textoCafeteira.textContent = '';
                document.querySelector('#cafe-cafeteira').style.backgroundImage = 'url("../../assets/cafe/4.png")';
                tempoCafeteira += aumentoTempoCafeteiraVazamento;

                textoCafeteira.innerHTML = 'Vazou!';
                textoCafeteira.style.color = 'red';
                quantVezesDerramouCafe++;

                if (quantVezesDerramouCafe >= 3) {
                    desbloquearConquista(6);
                }
            }
        }
    }, 1000);
}

function desligarCafeteira() {
    cafeteiraLigada = false;
    document.querySelector('#cafe-cafeteira').style.display = 'none';
    document.querySelector('#cafeteira-ligada').style.display = 'none';
    document.querySelector('#texto-cafeteira').textContent = '';
    document.querySelector('#texto-cafeteira').style.color = 'black';
    clearInterval(intervaloCafeteira);
}

document.querySelector('#cafeteira-obj').addEventListener('click', () => {
    if (cafeteiraLigada) {
        desligarCafeteira();
    } else {
        ligarCafeteira();
    }
});

document.querySelector('#seta-baixo-pc').addEventListener('click', carregarMesa);
document.querySelector('#seta-baixo-mesa').addEventListener('click', () => {
    if (cameraAberto) {
        notificar(7);
    }
    carregarEscritorio();
});
document.querySelector('#seta-direita-escritorio').addEventListener('click', carregarCafeteira);
document.querySelector('#seta-esquerda-cafeteira').addEventListener('click', carregarEscritorio);

function desselecionaAbas() {
    const game = document.querySelector('#game');

    // Remove elementos de reunião, se existirem
    if (statusReuniao === 'selecionado') {
        statusReuniao = 'aberto';
        game.querySelector('#tb-reuniao-selecionado')?.remove();
        destruirTelaReuniao();

        const reuniaoAberto = document.createElement('div');
        reuniaoAberto.id = 'tb-reuniao-aberto';
        reuniaoAberto.className = 'aberto';
        game.appendChild(reuniaoAberto);
    }

    // Remove elementos de pasta, se existirem
    if (statusPasta === 'selecionado') {
        statusPasta = 'aberto';
        game.querySelector('#tb-pasta-selecionado')?.remove();
        destruirTelaPasta();

        const pastaAberto = document.createElement('div');
        pastaAberto.id = 'tb-pasta-aberto';
        pastaAberto.className = 'aberto';
        game.appendChild(pastaAberto);
    }

    // Remove elementos de lista, se existirem
    if (statusLista === 'selecionado') {
        statusLista = 'aberto';
        game.querySelector('#tb-lista-selecionado')?.remove();

        const listaAberto = document.createElement('div');
        listaAberto.id = 'tb-lista-aberto';
        listaAberto.className = 'aberto';
        game.appendChild(listaAberto);
    }

    // Remove elementos de jogo, se existirem
    if (statusJogo === 'selecionado') {
        statusJogo = 'aberto';
        game.querySelector('#tb-jogo-selecionado')?.remove();

        const jogoAberto = document.createElement('div');
        jogoAberto.id = 'tb-jogo-aberto';
        jogoAberto.className = 'aberto';
        game.appendChild(jogoAberto);
    }

    // Remove elementos de tarefa, se existirem
    if (statusTarefa === 'selecionado') {
        statusTarefa = 'aberto';
        game.querySelector('#tb-tarefa-selecionado')?.remove();

        const tarefaAberto = document.createElement('div');
        tarefaAberto.id = 'tb-tarefa-aberto';
        tarefaAberto.className = 'aberto';
        game.appendChild(tarefaAberto);
    }
}

function destruirTelaReuniao() {
    document.querySelector('#tela-reuniao')?.remove();
    document.querySelector('#compartilhar-tela')?.remove();
    document.querySelector('#xis-reuniao')?.remove();
    document.querySelector('#minimizar-reuniao')?.remove();
    document.querySelector(`#camera-${cameraAberto ? 'aberto' : 'fechado'}`)?.remove();
    document.querySelector(`#microfone-${microfoneAberto ? 'aberto' : 'fechado'}`)?.remove();
    document.querySelector('#confirmacao-saida-reuniao')?.remove();
    document.querySelector('#botao-confirmar-saida-reuniao')?.remove();
    document.querySelector('#botao-cancelar-saida-reuniao')?.remove();
}

function destruirTelaPasta() {
    document.querySelector('#tela-pasta')?.remove();
    document.querySelector('#xis-pasta')?.remove();
    document.querySelector('#minimizar-pasta')?.remove();
    document.querySelector('#doc-1')?.remove();
    document.querySelector('#doc-2')?.remove();
    document.querySelector('#doc-3')?.remove();
    document.querySelector('#doc-4')?.remove();
    document.querySelector('#doc-5')?.remove();
    try {
        destruirTelaDocumento();
    } catch { }
}

function destruirTelaDocumento() {
    document.querySelector('#documento-aberto')?.remove();
    document.querySelector('#documento-aberto-fechar')?.remove();
    document.querySelector('#documento-aberto-minimizar')?.remove();
    document.querySelector('#documento-aberto-texto')?.remove();
}

function destruirTelaLista() {
    document.querySelector('#tela-lista')?.remove();
    document.querySelector('#minimizar-lista')?.remove();
    document.querySelector('#xis-lista')?.remove();
    document.querySelector('#pontuacao-jogador')?.remove();
    document.querySelectorAll('.icone-tarefa').forEach((e) => e.remove());
    document.querySelectorAll('.texto-tarefa').forEach((e) => e.remove());
    document.querySelectorAll('.pontuacao-ganha-tarefa').forEach((e) => e.remove());
    document.querySelectorAll('.pontuacao-perdida-tarefa').forEach((e) => e.remove());
    document.querySelectorAll('.item-lista').forEach((e) => e.remove());
}

function destruirTelaTarefa() {
    document.querySelector('#tela-tarefa-1')?.remove();
    document.querySelector('#tela-tarefa-2')?.remove();
    document.querySelector('#tela-tarefa-3')?.remove();
    document.querySelector('#tela-tarefa-4')?.remove();
    document.querySelector('#tela-tarefa-5')?.remove();
    document.querySelector('#tela-tarefa-6')?.remove();
    document.querySelector('#tela-tarefa-7')?.remove();
    document.querySelector('#botao-trocar-t1')?.remove();
    document.querySelector('#botao-testar-t1')?.remove();
    document.querySelector('#botao-entregar-t1')?.remove();
    document.querySelector('#comparacao-t1')?.remove();
    document.querySelector('#countdown-t1')?.remove();
    document.querySelectorAll('[id^="elemento"]')?.forEach(el => el.remove());
    document.querySelector('#xis-tarefa')?.remove();
    document.querySelector('#minimizar-tarefa')?.remove();
    document.querySelector('#sucesso-t1')?.remove();
    document.querySelector('#falha-t1')?.remove();
    document.querySelector('#titulo-tarefa-2')?.remove();
    document.querySelectorAll('.linha-codigo-t2')?.forEach(el => el.remove());
    document.querySelectorAll('.numeracao-linha-t2')?.forEach(el => el.remove());
    document.querySelector('#botao-testar-t2')?.remove();
    document.querySelector('#botao-entregar-t2')?.remove();
    document.querySelector('#botao-duvida-t2')?.remove();
    document.querySelector('#countdown-t2')?.remove();
    document.querySelector('#resultado-t2')?.remove();
    document.querySelector('#sucesso-t2')?.remove();
    document.querySelector('#falha-t2')?.remove();
    document.querySelector('#titulo-tarefa-3')?.remove();
    document.querySelector('#sucesso-t3')?.remove();
    document.querySelector('#falha-t3')?.remove();
    document.querySelector('#tela-tarefa-4')?.remove();
    document.querySelector('#botao-desistir-t4')?.remove();
    document.querySelector('#botao-duvida-t4')?.remove();
    document.querySelector('#botao-resetar-t4')?.remove();
    ['verde', 'vermelho', 'azul', 'amarelo'].forEach(cor => {
        document.querySelector(`#botao-${cor}-t4`)?.remove();
    });
    ['vermelho', 'amarelo', 'verde', 'azul'].forEach(cor => {
        document.querySelector(`#elemento-${cor}-t4`)?.remove();
    });
    document.querySelector('#sucesso-t4')?.remove();
    document.querySelector('#falha-t4')?.remove();
    document.querySelector('#tela-tarefa-5')?.remove();
    document.querySelector('#botao-entregar-t5')?.remove();
    document.querySelector('#input-tarefa-5')?.remove();
    document.querySelector('#tentativas-restantes-t4')?.remove();
    document.querySelector('#xis-tarefa')?.remove();
    document.querySelector('#minimizar-tarefa')?.remove();
    document.querySelectorAll('.linha-codigo-t2')?.forEach(el => el.remove());
    document.querySelectorAll('.numeracao-linha-t2')?.forEach(el => el.remove());
    document.querySelector('#sucesso-t5')?.remove();
    document.querySelector('#falha-t5')?.remove();
    document.querySelector('#pergunta-tarefa-5')?.remove();
    document.querySelector('#tela-tarefa-6')?.remove();
    document.querySelector('#xis-tarefa')?.remove();
    document.querySelector('#minimizar-tarefa')?.remove();
    document.querySelector('#pergunta-tarefa-6')?.remove();
    document.querySelector('#progresso-tarefa-6')?.remove();
    document.querySelector('#botao-duvida-t6')?.remove();
    document.querySelector('#errado-t6')?.remove();
    document.querySelector('#falha-t6')?.remove();
    document.querySelector('#sucesso-t6')?.remove();
    ['verde', 'vermelho', 'azul', 'amarelo'].forEach(cor => {
        document.querySelector(`#botao-${cor}-t6`)?.remove();
    });
    document.querySelector('#tela-tarefa-7')?.remove();
    document.querySelector('#xis-tarefa')?.remove();
    document.querySelector('#minimizar-tarefa')?.remove();
    document.querySelector('#titulo-tarefa-7')?.remove();
    document.querySelector('#campo-texto-tarefa-7')?.remove();
    document.querySelectorAll('[id^="botao-"]').forEach(el => el.remove());
    document.querySelector('#botao-duvida-t7')?.remove();
    document.querySelector('#sucesso-t7')?.remove();
    document.querySelector('#falha-t7')?.remove();
    document.querySelector('#comando-completo-t7')?.remove();
    document.querySelector('#botao-ok')?.remove();
    for (let i = 1; i <= 7; i++) {
        document.querySelector(`#duvida-t${i}`)?.remove();
    }
}

function destruirTelaJogo() {
    document.querySelector('#tela-jogo')?.remove();
    document.querySelector('#botao-iniciar-jogo')?.remove();
    document.querySelector('#xis-jogo')?.remove();
    document.querySelector('#minimizar-jogo')?.remove();
    document.getElementById("seta-direita-jogo")?.remove();
    document.getElementById("seta-esquerda-jogo")?.remove();
    document.getElementById("pause-jogo")?.remove();
    document.getElementById("play-jogo")?.remove();
    document.getElementById("blur-jogo")?.remove();
    document.getElementById("texto-jogo")?.remove();
    document.getElementById("inimigo-1-esquerda")?.remove();
    document.getElementById("inimigo-1-meio")?.remove();
    document.getElementById("inimigo-1-direita")?.remove();
    document.getElementById("inimigo-2-esquerda")?.remove();
    document.getElementById("inimigo-2-meio")?.remove();
    document.getElementById("inimigo-2-direita")?.remove();
    document.getElementById("inimigo-3-esquerda")?.remove();
    document.getElementById("inimigo-3-meio")?.remove();
    document.getElementById("inimigo-3-direita")?.remove();
    document.getElementById("inimigo-4-esquerda")?.remove();
    document.getElementById("inimigo-4-meio")?.remove();
    document.getElementById("inimigo-4-direita")?.remove();
}

function porTarefasNaTelaLista() {
    const game = document.querySelector('#game');
    const pontuacaoJogador = document.createElement('div');
    pontuacaoJogador.id = 'pontuacao-jogador';
    pontuacaoJogador.innerHTML = `Pontuação: ${pontuacao}/${pontuacaoMinima}`;
    game.appendChild(pontuacaoJogador);

    if (tarefas.length < 4) {
        preencherTarefas();
    }

    tarefas.forEach((tarefa, i) => {
        let nomes = {
            1: 'Linha de Lógica',
            2: 'Ajuste Final',
            3: 'Corte Preciso',
            4: 'Nivelamento',
            5: 'Previsão de Retorno',
            6: 'Quiz do Dev',
            7: 'Operação SQL'
        };
        const iconeTarefa = document.createElement('div');
        iconeTarefa.className = 'icone-tarefa';
        iconeTarefa.id = `icone-tarefa-${i + 1}`;
        iconeTarefa.style.backgroundImage = `url("../../assets/pc/tarefas/${tarefa['tipo']}.png")`;
        game.appendChild(iconeTarefa);

        const textoTarefa = document.createElement('div');
        textoTarefa.className = 'texto-tarefa';
        textoTarefa.id = `texto-tarefa-${i + 1}`;
        textoTarefa.textContent = nomes[tarefa['tipo']];
        game.appendChild(textoTarefa);

        const pontuacaoGanhaTarefa = document.createElement('div');
        pontuacaoGanhaTarefa.className = 'pontuacao-ganha-tarefa';
        pontuacaoGanhaTarefa.id = `pontuacao-ganha-tarefa-${i + 1}`;
        pontuacaoGanhaTarefa.textContent = `+${tarefa['pontosGanhos']}`;
        game.appendChild(pontuacaoGanhaTarefa);

        const pontuacaoPerdidaTarefa = document.createElement('div');
        pontuacaoPerdidaTarefa.className = 'pontuacao-perdida-tarefa';
        pontuacaoPerdidaTarefa.id = `pontuacao-perdida-tarefa-${i + 1}`;
        pontuacaoPerdidaTarefa.textContent = tarefa['pontosPerdidos'];
        game.appendChild(pontuacaoPerdidaTarefa);

        const itemLista = document.createElement('div');
        itemLista.className = 'item-lista';
        itemLista.id = `item-lista-${i + 1}`;
        itemLista.addEventListener('click', () => {
            if (contadorTarefas[i] === 0) {
                contadorTarefas[i] = Date.now();
            }
            selecionaTarefa(i + 1)
        });
        game.appendChild(itemLista);
    });
}

function criarTelaTarefaTipo1(indiceTarefa) {
    const game = document.querySelector('#game');

    if (estadoTarefas[indiceTarefa] === '') {
        estadoTarefas[indiceTarefa] = { 'selecionados': [], 'posicoes': [1, 2, 3, 4, 5], 'countdown': null, 'countdownInterval': null, 'ultimoResultado': null };
    }

    const tarefa = tarefas[indiceTarefa - 1];

    const valores = Object.keys(tarefa)
        .filter(chave => !isNaN(chave))
        .map(chave => ({ valor: tarefa[chave], index: parseInt(chave) + 1 }));

    const ordemCorreta = valores
        .sort((a, b) => a.valor - b.valor)
        .map(item => item.index);

    const telaTarefa = document.createElement('div');
    telaTarefa.id = 'tela-tarefa-1';
    game.appendChild(telaTarefa);

    const botaoTrocar = document.createElement('div');
    botaoTrocar.id = 'botao-trocar-t1';
    game.appendChild(botaoTrocar);

    const botaoTestar = document.createElement('div');
    botaoTestar.id = 'botao-testar-t1';
    game.appendChild(botaoTestar);

    const botaoEntregar = document.createElement('div');
    botaoEntregar.id = 'botao-entregar-t1';
    botaoEntregar.addEventListener('click', () => {
        // Finaliza o teste em andamento, se houver
        if (estadoTarefas[indiceTarefa]['countdownInterval']) {
            clearInterval(estadoTarefas[indiceTarefa]['countdownInterval']);
            estadoTarefas[indiceTarefa]['countdownInterval'] = null;
            estadoTarefas[indiceTarefa]['countdown'] = null;
            document.querySelector('#countdown-t1')?.remove();
        }

        // Desseleciona todos os elementos
        estadoTarefas[indiceTarefa]['selecionados'] = [];
        const elementos = document.querySelectorAll('[id^="elemento"]');
        elementos.forEach(elemento => {
            elemento.style.backgroundImage = 'url("../../assets/pc/tarefas/1/azul.png")';

            // Remove div de esmaecimento, se existir
            const esmaecidoDiv = elemento.querySelector('.elemento-esmaecido-t1');
            if (esmaecidoDiv) {
                esmaecidoDiv.remove();
            }
        });

        // Remove qualquer comparação da UI
        const comparacaoDiv = document.querySelector('#comparacao-t1');
        if (comparacaoDiv) {
            comparacaoDiv.remove();
        }

        // Atualiza os botões "Testar" e "Trocar" para esmaecidos
        botaoTrocar.innerHTML = '';
        const esmaecidoTrocar = document.createElement('div');
        esmaecidoTrocar.id = 'trocar-esmaecido-t1';
        botaoTrocar.appendChild(esmaecidoTrocar);
        botaoTrocar.style.pointerEvents = 'none';

        botaoTestar.innerHTML = '';
        const esmaecidoTestar = document.createElement('div');
        esmaecidoTestar.id = 'testar-esmaecido-t1';
        botaoTestar.appendChild(esmaecidoTestar);
        botaoTestar.style.pointerEvents = 'none';

        const posicoes = estadoTarefas[indiceTarefa]['posicoes'];
        let todosCorretos = true;

        elementos.forEach((elemento, index) => {
            const posicaoAtual = posicoes[index];
            const posicaoCorreta = ordemCorreta[index];

            if (posicaoAtual === posicaoCorreta) {
                elemento.style.backgroundImage = 'url("../../assets/pc/tarefas/1/verde.png")';
            } else {
                elemento.style.backgroundImage = 'url("../../assets/pc/tarefas/1/vermelho.png")';
                todosCorretos = false;
            }

            // Remove onclicks dos elementos
            elemento.style.pointerEvents = 'none';
        });

        // Exibe mensagem de sucesso ou falha
        const mensagem = document.createElement('div');
        if (todosCorretos) {
            pontuacao += tarefas[indiceTarefa - 1].pontosGanhos;
            aumentarTarefasConcluidas();
            try {
                if (Date.now() - contadorTarefas[indiceTarefa - 1] < 3000) {
                    desbloquearConquista(11);
                }
                contadorTarefas[indiceTarefa - 1] = 0;
            } finally { }
            mensagem.id = 'sucesso-t1';
            mensagem.textContent = `+${tarefas[indiceTarefa - 1].pontosGanhos} ponto${tarefas[indiceTarefa - 1].pontosGanhos === 1 ? '' : 's'}`;
        } else {
            pontuacao -= Math.abs(tarefas[indiceTarefa - 1].pontosPerdidos);
            nenhumaTarefaFalha = false;
            pontuacao = Math.max(pontuacao, 0);
            mensagem.id = 'falha-t1';
            mensagem.textContent = `-${Math.abs(tarefas[indiceTarefa - 1].pontosPerdidos)} ponto${Math.abs(tarefas[indiceTarefa - 1].pontosPerdidos) === 1 ? '' : 's'}`;
        }
        game.appendChild(mensagem);

        // Remove onclicks do botão "Entregar"
        botaoEntregar.style.pointerEvents = 'none';

        tarefas[indiceTarefa - 1] = null;
        preencherTarefas();

        // Define função para destruir a tela da tarefa
        const destruirTela = () => {
            destruirTelaTarefa();
            document.querySelector('#tb-tarefa').style.display = 'none';
            game.querySelector('#tb-tarefa-selecionado')?.remove();
            game.querySelector('#tb-tarefa-aberto')?.remove();
            statusTarefa = 'fechado';
        };

        // Adiciona evento para destruir a tela imediatamente ao clicar em outra aba, fechar ou minimizar
        const abas = ['#tb-reuniao', '#tb-pasta', '#tb-lista', '#tb-jogo', '#tb-tarefa', '#xis-tarefa', '#minimizar-tarefa'];
        abas.forEach(selector => {
            document.querySelector(selector)?.addEventListener('click', destruirTela, { once: true });
        });

        // Chama destruir a tela da tarefa após 2 segundos, caso não tenha sido destruída antes
        setTimeout(destruirTela, 2000);
    });
    game.appendChild(botaoEntregar);

    const getImagemPorPosicao = (posicao) => {
        switch (posicao) {
            case 1: return 'url("../../assets/pc/tarefas/1/quadrado.png")';
            case 2: return 'url("../../assets/pc/tarefas/1/circulo.png")';
            case 3: return 'url("../../assets/pc/tarefas/1/losango.png")';
            case 4: return 'url("../../assets/pc/tarefas/1/esquerda.png")';
            default: return 'url("../../assets/pc/tarefas/1/direita.png")';
        }
    };

    const atualizarBotoes = () => {
        botaoTrocar.innerHTML = '';
        if (estadoTarefas[indiceTarefa]['selecionados'].length !== 2) {
            const esmaecido = document.createElement('div');
            esmaecido.id = 'trocar-esmaecido-t1';
            botaoTrocar.appendChild(esmaecido);
            botaoTrocar.style.pointerEvents = 'none';
        } else {
            botaoTrocar.style.pointerEvents = 'auto';
        }

        botaoTestar.innerHTML = '';
        if (estadoTarefas[indiceTarefa]['selecionados'].length !== 1) {
            const esmaecido = document.createElement('div');
            esmaecido.id = 'testar-esmaecido-t1';
            botaoTestar.appendChild(esmaecido);
            botaoTestar.style.pointerEvents = 'none';
        } else {
            botaoTestar.style.pointerEvents = 'auto';
        }

        atualizarComparacao();
    };

    const atualizarComparacao = () => {
        const comparacaoDiv = document.querySelector('#comparacao-t1');
        if (comparacaoDiv) {
            comparacaoDiv.remove();
        }

        const selecionados = estadoTarefas[indiceTarefa]['selecionados'];
        if (selecionados.length === 2) {
            const [primeiro, segundo] = selecionados;
            const posicoes = estadoTarefas[indiceTarefa]['posicoes'];

            const ordemPrimeiro = ordemCorreta.indexOf(posicoes[primeiro - 1]);
            const ordemSegundo = ordemCorreta.indexOf(posicoes[segundo - 1]);

            const comparacao = document.createElement('div');
            comparacao.id = 'comparacao-t1';

            const iconePrimeiro = document.createElement('div');
            iconePrimeiro.className = 'icone-comparacao-t1';
            const iconeSegundo = document.createElement('div');
            iconeSegundo.className = 'icone-comparacao-t1';
            const simbolo = document.createElement('div');

            iconePrimeiro.style.backgroundImage = getImagemPorPosicao(posicoes[primeiro - 1]);
            iconeSegundo.style.backgroundImage = getImagemPorPosicao(posicoes[segundo - 1]);
            simbolo.textContent = ordemPrimeiro < ordemSegundo ? '<' : '>';

            comparacao.appendChild(iconePrimeiro);
            comparacao.appendChild(simbolo);
            comparacao.appendChild(iconeSegundo);

            game.appendChild(comparacao);
        }
    };

    for (let j = 1; j <= 5; j++) {
        const elemento = document.createElement('div');
        elemento.id = `elemento${j}-t1`;

        if (estadoTarefas[indiceTarefa]['selecionados'].includes(j)) {
            elemento.style.backgroundImage = 'url("../../assets/pc/tarefas/1/amarelo.png")';
        } else {
            elemento.style.backgroundImage = 'url("../../assets/pc/tarefas/1/azul.png")';
        }

        elemento.addEventListener('click', () => {
            const selecionados = estadoTarefas[indiceTarefa]['selecionados'];
            if (selecionados.includes(j)) {
                selecionados.splice(selecionados.indexOf(j), 1);
                elemento.style.backgroundImage = 'url("../../assets/pc/tarefas/1/azul.png")';
            } else if (selecionados.length < 2) {
                selecionados.push(j);
                elemento.style.backgroundImage = 'url("../../assets/pc/tarefas/1/amarelo.png")';
            }
            atualizarBotoes();
        });

        game.appendChild(elemento);

        const icone = document.createElement('div');
        icone.style.backgroundImage = getImagemPorPosicao(estadoTarefas[indiceTarefa]['posicoes'][j - 1]);
        icone.className = 'icone-t1';
        elemento.appendChild(icone);
    }

    const atualizarUI = () => {
        for (let j = 1; j <= 5; j++) {
            const elemento = document.querySelector(`#elemento${j}-t1`);
            const posicao = estadoTarefas[indiceTarefa]['posicoes'][j - 1];
            elemento.querySelector('.icone-t1').style.backgroundImage = getImagemPorPosicao(posicao);
        }
    };

    botaoTrocar.addEventListener('click', () => {
        const selecionados = estadoTarefas[indiceTarefa]['selecionados'];
        if (selecionados.length === 2) {
            const [primeiro, segundo] = selecionados;

            const posicoes = estadoTarefas[indiceTarefa]['posicoes'];
            [posicoes[primeiro - 1], posicoes[segundo - 1]] = [posicoes[segundo - 1], posicoes[primeiro - 1]];

            estadoTarefas[indiceTarefa]['selecionados'] = [];
            document.querySelector(`#elemento${primeiro}-t1`).style.backgroundImage = 'url("../../assets/pc/tarefas/1/azul.png")';
            document.querySelector(`#elemento${segundo}-t1`).style.backgroundImage = 'url("../../assets/pc/tarefas/1/azul.png")';

            atualizarUI();
            atualizarBotoes();
        }
    });

    const botaoDuvida = document.createElement('div');
    botaoDuvida.id = 'botao-duvida-t1';
    botaoDuvida.addEventListener('click', () => {
        const duvidaDiv = document.createElement('div');
        duvidaDiv.id = 'duvida-t1';
        game.appendChild(duvidaDiv);

        const botaoOk = document.createElement('div');
        botaoOk.id = 'botao-ok';
        botaoOk.addEventListener('click', () => {
            botaoOk.remove();
            duvidaDiv.remove();
        });
        game.appendChild(botaoOk);
    });
    game.appendChild(botaoDuvida);

    function testarT1() {
        const elementoSelecionado = estadoTarefas[indiceTarefa]['selecionados'][0];
        const posicoes = estadoTarefas[indiceTarefa]['posicoes'];
        const resultadoTeste = posicoes[elementoSelecionado - 1] === ordemCorreta[elementoSelecionado - 1];
        const elemento = document.querySelector(`#elemento${elementoSelecionado}-t1`);
        let countdown = estadoTarefas[indiceTarefa]['countdown'] || 5;
        estadoTarefas[indiceTarefa]['countdown'] = countdown;

        const countdownDiv = document.createElement('div');
        countdownDiv.id = 'countdown-t1';
        countdownDiv.textContent = `Resultado em ${countdown}...`;
        game.appendChild(countdownDiv);

        const elementos = document.querySelectorAll('[id^="elemento"]');
        elementos.forEach(el => {
            const esmaecidoDiv = document.createElement('div');
            esmaecidoDiv.className = 'elemento-esmaecido-t1';
            el.appendChild(esmaecidoDiv);
            el.style.pointerEvents = 'none';
        });

        const esmaecidoDiv = document.createElement('div');
        esmaecidoDiv.id = 'testar-esmaecido-t1';
        botaoTestar.appendChild(esmaecidoDiv);
        botaoTestar.style.pointerEvents = 'none';

        if (estadoTarefas[indiceTarefa]['countdownInterval']) {
            clearInterval(estadoTarefas[indiceTarefa]['countdownInterval']);
        }

        estadoTarefas[indiceTarefa]['countdownInterval'] = setInterval(() => {
            countdown--;
            estadoTarefas[indiceTarefa]['countdown'] = countdown;
            countdownDiv.textContent = `Resultado em ${countdown}...`;
            if (countdown === 0) {
                clearInterval(estadoTarefas[indiceTarefa]['countdownInterval']);
                estadoTarefas[indiceTarefa]['countdownInterval'] = null;
                estadoTarefas[indiceTarefa]['countdown'] = null;
                countdownDiv.remove();

                elementos.forEach(el => {
                    const esmaecidoDiv = el.querySelector('.elemento-esmaecido-t1');
                    if (esmaecidoDiv) {
                        esmaecidoDiv.remove();
                    }
                    el.style.pointerEvents = 'auto';
                });

                const esmaecidoDiv = botaoTestar.querySelector('#testar-esmaecido-t1');
                if (esmaecidoDiv) {
                    esmaecidoDiv.remove();
                }
                botaoTestar.style.pointerEvents = 'auto';

                if (resultadoTeste) {
                    elemento.style.backgroundImage = 'url("../../assets/pc/tarefas/1/verde.png")';
                } else {
                    elemento.style.backgroundImage = 'url("../../assets/pc/tarefas/1/vermelho.png")';
                }

                estadoTarefas[indiceTarefa]['ultimoResultado'] = {
                    elementoSelecionado,
                    resultadoTeste,
                    timestamp: Date.now()
                };

                const selecionados = estadoTarefas[indiceTarefa]['selecionados'];
                const index = selecionados.indexOf(elementoSelecionado);
                if (index !== -1) {
                    selecionados.splice(index, 1);
                }
                atualizarBotoes();

                setTimeout(() => {
                    if (!estadoTarefas[indiceTarefa]['selecionados'].includes(elementoSelecionado)) {
                        elemento.style.backgroundImage = 'url("../../assets/pc/tarefas/1/azul.png")';
                    }
                }, 2000);
            }
        }, 1000);
    }

    botaoTestar.addEventListener('click', async () => {
        if (estadoTarefas[indiceTarefa]['selecionados'].length === 1) {
            testarT1();
            Usuario.aumentarQuantTestesFeitos(usuarioId, 1);
            const usuario = await Usuario.getUsuarioLogado();
            if (usuario.testes_feitos > 30) {
                desbloquearConquista(12);
            }
        }
    });

    const ultimoResultado = estadoTarefas[indiceTarefa]['ultimoResultado'];
    if (ultimoResultado && Date.now() - ultimoResultado.timestamp < 2000) {
        const elemento = document.querySelector(`#elemento${ultimoResultado.elementoSelecionado}-t1`);
        elemento.style.backgroundImage = ultimoResultado.resultadoTeste
            ? 'url("../../assets/pc/tarefas/1/verde.png")'
            : 'url("../../assets/pc/tarefas/1/vermelho.png")';

        setTimeout(() => {
            if (!estadoTarefas[indiceTarefa]['selecionados'].includes(ultimoResultado.elementoSelecionado)) {
                elemento.style.backgroundImage = 'url("../../assets/pc/tarefas/1/azul.png")';
            }
        }, 1000);
    }

    atualizarBotoes();

    if (estadoTarefas[indiceTarefa]['countdown'] !== null) {
        testarT1();
    }

    const xisTarefa = document.createElement('div');
    xisTarefa.id = 'xis-tarefa';
    xisTarefa.addEventListener('click', () => {
        if (estadoTarefas[indiceTarefa] != '') {
            estadoTarefas[indiceTarefa]['selecionados'] = [];
        }
        if (estadoTarefas[indiceTarefa]['countdownInterval']) {
            clearInterval(estadoTarefas[indiceTarefa]['countdownInterval']);
            estadoTarefas[indiceTarefa]['countdownInterval'] = null;
            estadoTarefas[indiceTarefa]['countdown'] = null;
        }
        destruirTelaTarefa();
        document.querySelector('#tb-tarefa').style.display = 'none';
        game.querySelector('#tb-tarefa-selecionado')?.remove();
        statusTarefa = 'fechado';
    });
    game.appendChild(xisTarefa);

    const minimizarTarefa = document.createElement('div');
    minimizarTarefa.id = 'minimizar-tarefa';
    minimizarTarefa.addEventListener('click', () => {
        destruirTelaTarefa();
        game.querySelector('#tb-tarefa-selecionado')?.remove();
        const tarefaAberto = document.createElement('div');
        tarefaAberto.id = 'tb-tarefa-aberto';
        tarefaAberto.className = 'aberto';
        game.appendChild(tarefaAberto);
        statusTarefa = 'aberto';
    });
    game.appendChild(minimizarTarefa);
}

async function aumentarTarefasConcluidas() {
    tarefasConcluidasUltimosDoisMin++;

    setTimeout(() => {
        tarefasConcluidasUltimosDoisMin = Math.max(0, tarefasConcluidasUltimosDoisMin - 1);
    }, 120000);

    if (tarefasConcluidasUltimosDoisMin >= 10) {
        desbloquearConquista(2);
    }

    Usuario.aumentarQuantTarefasConcluidas(usuarioId, 1);
    const usuario = await Usuario.getUsuarioLogado();
    if (usuario.tarefas_concluidas >= 50) {
        desbloquearConquista(3);
    }

}

function criarTelaTarefaTipo2(indiceTarefa) {
    const tarefa = tarefas[indiceTarefa - 1];
    let numeroLinhaAtual = 0;
    let codigoPython = tarefa['codigo_python']
        .split('\n')
        .flatMap((linha) => {
            const resultado = [];
            let primeiraLinha = true;

            while (linha.length > 40) {
                const corte = linha.lastIndexOf(' ', 40);
                if (corte === -1) break;

                resultado.push({
                    linha: linha.slice(0, corte),
                    numeroLinha: primeiraLinha ? ++numeroLinhaAtual : ''
                });

                linha = linha.slice(corte + 1);
                primeiraLinha = false;
            }

            resultado.push({
                linha: linha.replace('???', '<input id="completar-t2">'),
                numeroLinha: primeiraLinha ? ++numeroLinhaAtual : ''
            });

            return resultado;
        });

    const game = document.querySelector('#game');
    const telaTarefa = document.createElement('div');
    telaTarefa.id = 'tela-tarefa-2';
    game.appendChild(telaTarefa);

    const botaoXis = document.createElement('div');
    botaoXis.id = 'xis-tarefa';
    botaoXis.addEventListener('click', () => {
        if (estadoTarefas[indiceTarefa]) {
            estadoTarefas[indiceTarefa]['countdown'] = null;
            clearInterval(estadoTarefas[indiceTarefa]['countdownInterval']);
        }
        destruirTelaTarefa();
        document.querySelector('#tb-tarefa').style.display = 'none';
        game.querySelector('#tb-tarefa-selecionado')?.remove();
        statusTarefa = 'fechado';
    });
    game.appendChild(botaoXis);

    const botaoMinimizar = document.createElement('div');
    botaoMinimizar.id = 'minimizar-tarefa';
    botaoMinimizar.addEventListener('click', () => {
        destruirTelaTarefa();
        game.querySelector('#tb-tarefa-selecionado')?.remove();
        const tarefaAberto = document.createElement('div');
        tarefaAberto.id = 'tb-tarefa-aberto';
        tarefaAberto.className = 'aberto';
        game.appendChild(tarefaAberto);
        statusTarefa = 'aberto';
    });
    game.appendChild(botaoMinimizar);

    const tituloTarefa = document.createElement('div');
    tituloTarefa.id = 'titulo-tarefa-2';
    tituloTarefa.textContent = `Tarefa ${indiceTarefa}`;
    tituloTarefa.innerHTML = tarefa['texto'];
    game.appendChild(tituloTarefa);

    codigoPython.forEach((linha, i) => {
        const linhaCodigo = document.createElement('div');
        linhaCodigo.className = 'linha-codigo-t2';
        linhaCodigo.style.whiteSpace = 'pre';
        linhaCodigo.innerHTML = linha['linha'];
        linhaCodigo.style.top = `calc(${465 + 32 * i} * var(--un))`;
        game.appendChild(linhaCodigo);

        const numeracaoLinha = document.createElement('div');
        numeracaoLinha.className = 'numeracao-linha-t2';
        numeracaoLinha.textContent = linha['numeroLinha'];
        numeracaoLinha.style.top = `calc(${466 + 32 * i} * var(--un))`;
        game.appendChild(numeracaoLinha);
    });

    const input = document.querySelector('#completar-t2');
    if (estadoTarefas[indiceTarefa]?.inputValue) {
        input.value = estadoTarefas[indiceTarefa].inputValue;
    }

    input.addEventListener('input', () => {
        if (!estadoTarefas[indiceTarefa]) {
            estadoTarefas[indiceTarefa] = {};
        }
        estadoTarefas[indiceTarefa].inputValue = input.value;
    });

    const botaoTestar = document.createElement('div');
    botaoTestar.id = 'botao-testar-t2';
    game.appendChild(botaoTestar);

    const botaoEntregar = document.createElement('div');
    botaoEntregar.id = 'botao-entregar-t2';
    botaoEntregar.addEventListener('click', () => {
        // Desabilita os cliques no botão "Entregar", "Testar" e no input
        botaoEntregar.style.pointerEvents = 'none';
        botaoTestar.style.pointerEvents = 'none';
        input.disabled = true;

        // Finaliza o teste em andamento, se houver
        if (estadoTarefas[indiceTarefa]['countdownInterval']) {
            clearInterval(estadoTarefas[indiceTarefa]['countdownInterval']);
            estadoTarefas[indiceTarefa]['countdownInterval'] = null;
            estadoTarefas[indiceTarefa]['countdown'] = null;
            document.querySelector('#countdown-t2')?.remove();
        }

        const resposta = input.value.trim();
        const respostaCorreta = validarDesafioTipo2(tarefa, resposta);
        const game = document.querySelector('#game');
        const mensagem = document.createElement('div');

        if (respostaCorreta) {
            pontuacao += tarefa['pontosGanhos'];
            try {
                if (Date.now() - contadorTarefas[indiceTarefa - 1] < 3000) {
                    desbloquearConquista(11);
                }
                contadorTarefas[indiceTarefa - 1] = 0;
            } finally { }
            aumentarTarefasConcluidas();
            mensagem.id = 'sucesso-t2';
            mensagem.textContent = `+${tarefa['pontosGanhos']} ponto${tarefa['pontosGanhos'] === 1 ? '' : 's'}`;
        } else {
            pontuacao -= Math.abs(tarefa['pontosPerdidos']);
            nenhumaTarefaFalha = false;
            pontuacao = Math.max(pontuacao, 0);
            mensagem.id = 'falha-t2';
            mensagem.textContent = `-${Math.abs(tarefa['pontosPerdidos'])} ponto${Math.abs(tarefa['pontosPerdidos']) === 1 ? '' : 's'}`;
            const respostaCerta = document.querySelector('#completar-t2');
            respostaCerta.style.color = '#00cf0a';
            respostaCerta.style.fontWeight = 'bold';
            respostaCerta.value = tarefa['resposta_correta'] != undefined ? tarefa['resposta_correta'] : 'diversas respostas corretas';
        }

        game.appendChild(mensagem);

        // Remove a tarefa da lista e atualiza
        tarefas[indiceTarefa - 1] = null;
        preencherTarefas();

        // Define função para destruir a tela da tarefa
        const destruirTela = () => {
            destruirTelaTarefa();
            document.querySelector('#tb-tarefa').style.display = 'none';
            game.querySelector('#tb-tarefa-selecionado')?.remove();
            game.querySelector('#tb-tarefa-aberto')?.remove();
            statusTarefa = 'fechado';
        };

        // Adiciona evento para destruir a tela imediatamente ao clicar em outra aba, fechar ou minimizar
        const abas = ['#tb-reuniao', '#tb-pasta', '#tb-lista', '#tb-jogo', '#tb-tarefa', '#xis-tarefa', '#minimizar-tarefa'];
        abas.forEach(selector => {
            document.querySelector(selector)?.addEventListener('click', destruirTela, { once: true });
        });

        // Chama destruir a tela da tarefa após 2 segundos, caso não tenha sido destruída antes
        setTimeout(destruirTela, 2000);
    });
    game.appendChild(botaoEntregar);

    const botaoDuvida = document.createElement('div');
    botaoDuvida.id = 'botao-duvida-t2';
    botaoDuvida.addEventListener('click', () => {
        const duvidaDiv = document.createElement('div');
        duvidaDiv.id = 'duvida-t2';
        game.appendChild(duvidaDiv);

        const botaoOk = document.createElement('div');
        botaoOk.id = 'botao-ok';
        botaoOk.addEventListener('click', () => {
            botaoOk.remove();
            duvidaDiv.remove();
        });
        game.appendChild(botaoOk);
    });
    game.appendChild(botaoDuvida);

    // Countdown
    if (!estadoTarefas[indiceTarefa]) {
        estadoTarefas[indiceTarefa] = { countdown: null, countdownInterval: null, resultado: null };
    }

    const iniciarCountdown = () => {
        let countdown = estadoTarefas[indiceTarefa]['countdown'] || 5;
        estadoTarefas[indiceTarefa]['countdown'] = countdown;

        const countdownDiv = document.createElement('div');
        countdownDiv.id = 'countdown-t2';
        countdownDiv.textContent = `Resultado em ${countdown}...`;
        game.appendChild(countdownDiv);

        input.disabled = true;

        const esmaecidoDiv = document.createElement('div');
        esmaecidoDiv.id = 'testar-esmaecido-t2';
        botaoTestar.appendChild(esmaecidoDiv);

        botaoTestar.style.pointerEvents = 'none';

        if (estadoTarefas[indiceTarefa]['countdownInterval']) {
            clearInterval(estadoTarefas[indiceTarefa]['countdownInterval']);
        }

        estadoTarefas[indiceTarefa]['countdownInterval'] = setInterval(() => {
            countdown--;
            estadoTarefas[indiceTarefa]['countdown'] = countdown;
            countdownDiv.textContent = `Resultado em ${countdown}...`;

            if (countdown === 0) {
                clearInterval(estadoTarefas[indiceTarefa]['countdownInterval']);
                estadoTarefas[indiceTarefa]['countdownInterval'] = null;
                estadoTarefas[indiceTarefa]['countdown'] = null;
                countdownDiv.remove();

                input.disabled = false;

                if (esmaecidoDiv) {
                    esmaecidoDiv.remove();
                }
                botaoTestar.style.pointerEvents = 'auto';

                const resposta = input.value.trim();
                const respostaCorreta = validarDesafioTipo2(tarefa, resposta);
                const resultado = respostaCorreta ? 'Certo' : 'Errado';
                estadoTarefas[indiceTarefa]['resultado'] = resultado;

                // Only add the result to the screen if the task screen is still open
                if (document.querySelector('#tela-tarefa-2')) {
                    // Remove any existing result button
                    const existingResult = document.querySelector('#resultado-t2');
                    if (existingResult) {
                        existingResult.remove();
                    }

                    // Add result button based on correctness
                    const resultadoDiv = document.createElement('div');
                    resultadoDiv.id = 'resultado-t2';
                    resultadoDiv.style.color = resultado === 'Certo' ? '#00cf0a' : '#df0000';
                    resultadoDiv.textContent = resultado;
                    game.appendChild(resultadoDiv);
                }
            }
        }, 1000);
    };

    // If there is already a result stored in the state, display it
    if (estadoTarefas[indiceTarefa]['resultado']) {
        const resultado = estadoTarefas[indiceTarefa]['resultado'];
        const resultadoDiv = document.createElement('div');
        resultadoDiv.id = 'resultado-t2';
        resultadoDiv.style.color = resultado === 'Certo' ? '#00cf0a' : '#df0000';
        resultadoDiv.textContent = resultado;
        game.appendChild(resultadoDiv);
    };

    botaoTestar.addEventListener('click', async () => {
        // Remove any existing result button
        const existingResult = document.querySelector('#resultado-t2');
        if (existingResult) {
            existingResult.remove();
        }

        // Reset the result state
        estadoTarefas[indiceTarefa]['resultado'] = null;

        iniciarCountdown();
        Usuario.aumentarQuantTestesFeitos(usuarioId, 1);
        const usuario = await Usuario.getUsuarioLogado();
        if (usuario.testes_feitos > 30) {
            desbloquearConquista(12);
        }
    });

    if (estadoTarefas[indiceTarefa]['countdown'] !== null) {
        iniciarCountdown();
    }
}

function criarTelaTarefaTipo3(indiceTarefa) {
    const tarefa = tarefas[indiceTarefa - 1];
    let numeroLinhaAtual = 0;
    let codigoPython = tarefa['codigo_python']
        .split('\n')
        .flatMap((linha) => {
            const resultado = [];
            let primeiraLinha = true;

            while (linha.length > 36) {
                const corte = linha.lastIndexOf(' ', 36);
                if (corte === -1) break;

                resultado.push({
                    linha: linha.slice(0, corte),
                    numeroLinha: primeiraLinha ? ++numeroLinhaAtual : ''
                });

                linha = linha.slice(corte + 1);
                primeiraLinha = false;
            }

            resultado.push({
                linha: linha,
                numeroLinha: primeiraLinha ? ++numeroLinhaAtual : ''
            });

            return resultado;
        });

    const game = document.querySelector('#game');
    const telaTarefa = document.createElement('div');
    telaTarefa.id = 'tela-tarefa-3';
    game.appendChild(telaTarefa);

    const botaoXis = document.createElement('div');
    botaoXis.id = 'xis-tarefa';
    botaoXis.addEventListener('click', () => {
        destruirTelaTarefa();
        document.querySelector('#tb-tarefa').style.display = 'none';
        game.querySelector('#tb-tarefa-selecionado')?.remove();
        statusTarefa = 'fechado';
    });
    game.appendChild(botaoXis);

    const botaoMinimizar = document.createElement('div');
    botaoMinimizar.id = 'minimizar-tarefa';
    botaoMinimizar.addEventListener('click', () => {
        destruirTelaTarefa();
        game.querySelector('#tb-tarefa-selecionado')?.remove();
        const tarefaAberto = document.createElement('div');
        tarefaAberto.id = 'tb-tarefa-aberto';
        tarefaAberto.className = 'aberto';
        game.appendChild(tarefaAberto);
        statusTarefa = 'aberto';
    });
    game.appendChild(botaoMinimizar);

    const botaoDuvida = document.createElement('div');
    botaoDuvida.id = 'botao-duvida-t3';
    botaoDuvida.addEventListener('click', () => {
        const duvidaDiv = document.createElement('div');
        duvidaDiv.id = 'duvida-t3';
        game.appendChild(duvidaDiv);

        const botaoOk = document.createElement('div');
        botaoOk.id = 'botao-ok';
        botaoOk.addEventListener('click', () => {
            botaoOk.remove();
            duvidaDiv.remove();
        });
        game.appendChild(botaoOk);
    });
    game.appendChild(botaoDuvida);

    const tituloTarefa = document.createElement('div');
    tituloTarefa.id = 'titulo-tarefa-3';
    tituloTarefa.textContent = "Remova a linha que causa erro";
    game.appendChild(tituloTarefa);

    if (!estadoTarefas[indiceTarefa]) {
        estadoTarefas[indiceTarefa] = { linhaMarcada: null };
    }

    codigoPython.forEach((linha, i) => {
        const linhaCodigo = document.createElement('div');
        linhaCodigo.className = 'linha-codigo-t2';
        linhaCodigo.style.cursor = 'pointer';
        linhaCodigo.style.whiteSpace = 'pre';
        linhaCodigo.textContent = linha['linha'];
        linhaCodigo.style.top = `calc(${465 + 32 * i} * var(--un))`;

        if (estadoTarefas[indiceTarefa].linhaMarcada === linha['numeroLinha']) {
            linhaCodigo.style.textDecoration = 'line-through';
            linhaCodigo.style.color = '#df0000';
        }

        linhaCodigo.addEventListener('click', () => {
            const linhas = document.querySelectorAll('.linha-codigo-t2');
            if (estadoTarefas[indiceTarefa].linhaMarcada === linha['numeroLinha']) {
                // If the clicked line is already marked, reset all lines to normal
                linhas.forEach(linha => {
                    linha.style.textDecoration = 'none';
                    linha.style.color = '';
                });
                estadoTarefas[indiceTarefa].linhaMarcada = null;
            } else {
                // Reset all lines to normal
                linhas.forEach(linha => {
                    linha.style.textDecoration = 'none';
                    linha.style.color = '';
                });
                // Mark the clicked line
                estadoTarefas[indiceTarefa].linhaMarcada = linha['numeroLinha'];
                linhaCodigo.style.textDecoration = 'line-through';
                linhaCodigo.style.color = '#df0000';
            }
        });

        game.appendChild(linhaCodigo);

        const numeracaoLinha = document.createElement('div');
        numeracaoLinha.className = 'numeracao-linha-t2';
        numeracaoLinha.textContent = linha['numeroLinha'];
        numeracaoLinha.style.top = `calc(${466 + 32 * i} * var(--un))`;
        game.appendChild(numeracaoLinha);
    });

    const botaoEntregar = document.createElement('div');
    botaoEntregar.id = 'botao-entregar-t3';
    botaoEntregar.addEventListener('click', () => {
        // Desabilita cliques nas linhas e no botão "Entregar"
        document.querySelectorAll('.linha-codigo-t2').forEach(linha => {
            linha.style.pointerEvents = 'none';
        });
        botaoEntregar.style.pointerEvents = 'none';

        const linhaMarcada = estadoTarefas[indiceTarefa].linhaMarcada;
        const respostaCorreta = validarDesafioTipo3(tarefa, linhaMarcada);

        const mensagem = document.createElement('div');
        if (respostaCorreta) {

            if (estadoTarefas[indiceTarefa].totalQuestoes == 3) {
                verificarDesbloqueio13();
            }
            pontuacao += tarefa['pontosGanhos'];
            try {
                if (Date.now() - contadorTarefas[indiceTarefa - 1] < 3000) {
                    desbloquearConquista(11);
                }
                contadorTarefas[indiceTarefa - 1] = 0;
            } finally { }
            aumentarTarefasConcluidas();
            mensagem.id = 'sucesso-t3';
            mensagem.textContent = `+${tarefa['pontosGanhos']} ponto${tarefa['pontosGanhos'] === 1 ? '' : 's'}`;
        } else {
            document.querySelectorAll('.linha-codigo-t2').forEach(linha => {
                linha.style.textDecoration = 'none';
                linha.style.color = '';
            });
            const linha = codigoPython.find(linha => linha.numeroLinha === tarefa['resposta_correta']);
            const linhaCodigo = Array.from(document.querySelectorAll('.linha-codigo-t2')).find(l => l.textContent === linha['linha']);
            linhaCodigo.style.textDecoration = 'line-through';
            linhaCodigo.style.color = '#00cf0a';
            pontuacao -= Math.abs(tarefa['pontosPerdidos']);
            nenhumaTarefaFalha = false;
            pontuacao = Math.max(pontuacao, 0);
            mensagem.id = 'falha-t3';
            mensagem.textContent = `-${Math.abs(tarefa['pontosPerdidos'])} ponto${Math.abs(tarefa['pontosPerdidos']) === 1 ? '' : 's'}`;
        }

        game.appendChild(mensagem);

        // Remove a tarefa da lista e atualiza
        tarefas[indiceTarefa - 1] = null;
        preencherTarefas();

        // Define função para destruir a tela da tarefa
        const destruirTela = () => {
            destruirTelaTarefa();
            document.querySelector('#tb-tarefa').style.display = 'none';
            game.querySelector('#tb-tarefa-selecionado')?.remove();
            game.querySelector('#tb-tarefa-aberto')?.remove();
            statusTarefa = 'fechado';
        };

        // Adiciona evento para destruir a tela imediatamente ao clicar em outra aba, fechar ou minimizar
        const abas = ['#tb-reuniao', '#tb-pasta', '#tb-lista', '#tb-jogo', '#tb-tarefa', '#xis-tarefa', '#minimizar-tarefa'];
        abas.forEach(selector => {
            document.querySelector(selector)?.addEventListener('click', destruirTela, { once: true });
        });

        // Chama destruir a tela da tarefa após 2 segundos, caso não tenha sido destruída antes
        setTimeout(destruirTela, 2000);

        async function verificarDesbloqueio13() {
            Usuario.aumentarQuantQuizzesGabaritados(usuarioId, 1);
            const usuario = await Usuario.getUsuarioLogado();
            if (usuario.quizzes_gabaritados >= 10) {
                desbloquearConquista(13);
            }
        }
    });
    game.appendChild(botaoEntregar);
}

function criarTelaTarefaTipo4(indiceTarefa) {
    const tarefa = tarefas[indiceTarefa - 1];
    const game = document.querySelector('#game');

    const telaTarefa = document.createElement('div');
    telaTarefa.id = 'tela-tarefa-4';
    game.appendChild(telaTarefa);

    const botaoFechar = document.createElement('div');
    botaoFechar.id = 'xis-tarefa';
    botaoFechar.addEventListener('click', () => {
        destruirTelaTarefa();
        document.querySelector('#tb-tarefa').style.display = 'none';
        game.querySelector('#tb-tarefa-selecionado')?.remove();
        statusTarefa = 'fechado';
    });
    game.appendChild(botaoFechar);

    const botaoMinimizar = document.createElement('div');
    botaoMinimizar.id = 'minimizar-tarefa';
    botaoMinimizar.addEventListener('click', () => {
        destruirTelaTarefa();
        game.querySelector('#tb-tarefa-selecionado')?.remove();
        const tarefaAberto = document.createElement('div');
        tarefaAberto.id = 'tb-tarefa-aberto';
        tarefaAberto.className = 'aberto';
        game.appendChild(tarefaAberto);
        statusTarefa = 'aberto';
    });
    game.appendChild(botaoMinimizar);

    const botaoDuvida = document.createElement('div');
    botaoDuvida.id = 'botao-duvida-t4';
    botaoDuvida.addEventListener('click', () => {
        const duvidaDiv = document.createElement('div');
        duvidaDiv.id = 'duvida-t4';
        game.appendChild(duvidaDiv);

        const botaoOk = document.createElement('div');
        botaoOk.id = 'botao-ok';
        botaoOk.addEventListener('click', () => {
            botaoOk.remove();
            duvidaDiv.remove();
        });
        game.appendChild(botaoOk);
    });
    game.appendChild(botaoDuvida);

    ['Vermelho', 'Amarelo', 'Verde', 'Azul'].forEach((e, i) => {
        const elemento = document.createElement('div');
        elemento.id = `elemento-${e.toLowerCase()}-t4`;
        if (!estadoTarefas[indiceTarefa]) {
            estadoTarefas[indiceTarefa] = { valores: { ...tarefa.valoresIniciais } };
        }

        elemento.style.fontSize = 'calc(50 * var(--un))';
        elemento.textContent = estadoTarefas[indiceTarefa].valores[e];
        game.appendChild(elemento);
    });

    ['desistir', 'duvida', 'resetar'].forEach((e) => {
        const botao = document.createElement('div');
        botao.id = `botao-${e}-t4`;
        game.appendChild(botao);
    });

    ['verde', 'vermelho', 'azul', 'amarelo'].forEach((e, i) => {
        const botao = document.createElement('button');
        botao.id = `botao-${e}-t4`;
        let texto = tarefa['botoes'][i].join('<br><br>');

        if (texto.includes("Amarelo")) {
            texto = texto.replace(/Amarelo/g, '<span style="color: #ff0;">Amarelo</span>');
        }

        if (texto.includes("Vermelho")) {
            const cor = i === 1 ? '#8a0000' : '#f00';
            texto = texto.replace(/Vermelho/g, `<span style="color: ${cor};">Vermelho</span>`);
        }

        if (texto.includes("Azul")) {
            const cor = i === 2 ? '#0b0ec1' : '#00f';
            texto = texto.replace(/Azul/g, `<span style="color: ${cor};">Azul</span>`);
        }

        if (texto.includes("Verde")) {
            texto = texto.replace(/Verde/g, '<span style="color: #0f0;">Verde</span>');
        }
        botao.innerHTML = texto;

        const finalizarTarefa = (resultado) => {
            // Bloqueia o clique de todos os botões
            ['verde', 'vermelho', 'azul', 'amarelo', 'desistir', 'duvida', 'resetar'].forEach(cor => {
                const botao = document.querySelector(`#botao-${cor}-t4`);
                if (botao) {
                    botao.style.pointerEvents = 'none';
                }
            });

            if (resultado) {
                const mensagem = document.createElement('div');
                pontuacao += tarefa.pontosGanhos;
                try {
                    if (Date.now() - contadorTarefas[indiceTarefa - 1] < 3000) {
                        desbloquearConquista(11);
                    }
                    contadorTarefas[indiceTarefa - 1] = 0;
                } finally { }
                aumentarTarefasConcluidas();
                mensagem.id = 'sucesso-t4';
                mensagem.textContent = `+${tarefa.pontosGanhos}p.`;
                game.appendChild(mensagem);

            } else {
                const mensagem = document.createElement('div');
                pontuacao -= Math.abs(tarefa.pontosPerdidos);
                nenhumaTarefaFalha = false;
                pontuacao = Math.max(pontuacao, 0);
                mensagem.id = 'falha-t4';
                mensagem.textContent = `-${Math.abs(tarefa.pontosPerdidos)}p.`;
                game.appendChild(mensagem);
                desbloquearConquista(4);
            }

            tarefas[indiceTarefa - 1] = null;
            preencherTarefas();

            const destruirTela = () => {
                destruirTelaTarefa();
                document.querySelector('#tb-tarefa').style.display = 'none';
                game.querySelector('#tb-tarefa-selecionado')?.remove();
                game.querySelector('#tb-tarefa-aberto')?.remove();
                statusTarefa = 'fechado';
            };

            const abas = ['#tb-reuniao', '#tb-pasta', '#tb-lista', '#tb-jogo', '#tb-tarefa', '#xis-tarefa', '#minimizar-tarefa'];
            abas.forEach(selector => {
                document.querySelector(selector)?.addEventListener('click', destruirTela, { once: true });
            });

            setTimeout(destruirTela, 2000);
        };

        if (i === 0) {
            document.querySelector('#botao-desistir-t4').addEventListener('click', () => finalizarTarefa(false));
        }

        const verificarValoresIguais = () => {
            const valores = Object.values(estadoTarefas[indiceTarefa].valores);
            const todosIguais = valores.every(valor => valor === valores[0]);

            if (todosIguais) {
                finalizarTarefa(true);
            }
        };

        botao.addEventListener('click', () => {
            tarefa['botoes'][i].forEach(op => {
                const [target, operation, ...expressionParts] = op.split(' ');
                const expression = expressionParts.join(' ');
                const evalExpression = expression.replace(/([A-Za-z]+)/g, match => {
                    if (estadoTarefas[indiceTarefa].valores[match] === undefined) {
                        throw new Error(`Variable "${match}" is not defined in valores.`);
                    }
                    return estadoTarefas[indiceTarefa].valores[match];
                });

                const result = eval(evalExpression);

                if (operation === '+=') {
                    estadoTarefas[indiceTarefa].valores[target] += result;
                } else if (operation === '-=') {
                    estadoTarefas[indiceTarefa].valores[target] -= result;
                }
            });

            // Atualiza os valores na tela
            ['Vermelho', 'Amarelo', 'Verde', 'Azul'].forEach(cor => {
                const elemento = document.querySelector(`#elemento-${cor.toLowerCase()}-t4`);
                const valor = estadoTarefas[indiceTarefa].valores[cor];
                if (valor > 9999) {
                    elemento.textContent = '>9999';
                    elemento.style.fontSize = 'calc(40 * var(--un))';
                } else if (valor < -999) {
                    elemento.textContent = '<-999';
                    elemento.style.fontSize = 'calc(40 * var(--un))';
                } else {
                    elemento.textContent = valor;
                    elemento.style.fontSize = 'calc(50 * var(--un))';
                }
            });
            verificarValoresIguais();
        });
        game.appendChild(botao);
    });

    document.querySelector('#botao-resetar-t4').addEventListener('click', () => {
        estadoTarefas[indiceTarefa].valores = { ...tarefa.valoresIniciais };

        // Atualiza os valores na tela
        ['Vermelho', 'Amarelo', 'Verde', 'Azul'].forEach(cor => {
            const elemento = document.querySelector(`#elemento-${cor.toLowerCase()}-t4`);
            elemento.textContent = estadoTarefas[indiceTarefa].valores[cor];
        });
    });
}

function criarTelaTarefaTipo5(indiceTarefa) {
    const tarefa = tarefas[indiceTarefa - 1];
    const game = document.querySelector('#game');

    const telaTarefa = document.createElement('div');
    telaTarefa.id = 'tela-tarefa-5';
    game.appendChild(telaTarefa);

    const botaoXis = document.createElement('div');
    botaoXis.id = 'xis-tarefa';
    botaoXis.addEventListener('click', () => {
        destruirTelaTarefa();
        document.querySelector('#tb-tarefa').style.display = 'none';
        game.querySelector('#tb-tarefa-selecionado')?.remove();
        statusTarefa = 'fechado';
    });
    game.appendChild(botaoXis);

    const botaoMinimizar = document.createElement('div');
    botaoMinimizar.id = 'minimizar-tarefa';
    botaoMinimizar.addEventListener('click', () => {
        destruirTelaTarefa();
        game.querySelector('#tb-tarefa-selecionado')?.remove();
        const tarefaAberto = document.createElement('div');
        tarefaAberto.id = 'tb-tarefa-aberto';
        tarefaAberto.className = 'aberto';
        game.appendChild(tarefaAberto);
        statusTarefa = 'aberto';
    });
    game.appendChild(botaoMinimizar);

    let numeroLinhaAtual = 0;
    const codigoPython = tarefa['codigo_python']
        .split('\n')
        .flatMap((linha) => {
            const resultado = [];
            let primeiraLinha = true;

            while (linha.length > 36) {
                const corte = linha.lastIndexOf(' ', 36);
                if (corte === -1) break;

                resultado.push({
                    linha: linha.slice(0, corte),
                    numeroLinha: primeiraLinha ? ++numeroLinhaAtual : ''
                });

                linha = linha.slice(corte + 1);
                primeiraLinha = false;
            }

            resultado.push({
                linha: linha,
                numeroLinha: primeiraLinha ? ++numeroLinhaAtual : ''
            });

            return resultado;
        });

    codigoPython.forEach((linha, i) => {
        const linhaCodigo = document.createElement('div');
        linhaCodigo.className = 'linha-codigo-t2';
        linhaCodigo.style.whiteSpace = 'pre';
        linhaCodigo.textContent = linha['linha'];
        linhaCodigo.style.top = `calc(${465 + 32 * i} * var(--un))`;
        game.appendChild(linhaCodigo);

        const numeracaoLinha = document.createElement('div');
        numeracaoLinha.className = 'numeracao-linha-t2';
        numeracaoLinha.textContent = linha['numeroLinha'];
        numeracaoLinha.style.top = `calc(${466 + 32 * i} * var(--un))`;
        game.appendChild(numeracaoLinha);
    });

    const pergunta = document.createElement('div');
    pergunta.id = 'pergunta-tarefa-5';
    pergunta.textContent = tarefa['pergunta'];
    game.appendChild(pergunta);

    const input = document.createElement('input');
    input.id = 'input-tarefa-5';
    input.type = 'text';
    input.placeholder = 'Digite aqui...';
    if (!estadoTarefas[indiceTarefa]) {
        estadoTarefas[indiceTarefa] = { inputValue: '', tentativasRestantes: 2 };
    }
    input.value = estadoTarefas[indiceTarefa].inputValue;
    input.addEventListener('input', () => {
        estadoTarefas[indiceTarefa].inputValue = input.value;
    });
    game.appendChild(input);

    const tentativasRestantes = document.createElement('div');
    tentativasRestantes.id = 'tentativas-restantes-t4';
    tentativasRestantes.textContent = `${estadoTarefas[indiceTarefa].tentativasRestantes} ${estadoTarefas[indiceTarefa].tentativasRestantes === 1 ? 'tentativa restante' : 'tentativas restantes'}`;
    game.appendChild(tentativasRestantes);

    function destruirTela() {
        // Desabilita todos os botões (exceto os botões de fechar e minimizar)
        document.querySelectorAll('[id^="botao-"]').forEach(botao => {
            if (!botao.id.includes('xis') && !botao.id.includes('minimizar')) {
                botao.style.pointerEvents = 'none';
            }
        });
        document.querySelector('#input-tarefa-5').disabled = true;

        const destruirTela = () => {
            destruirTelaTarefa();
            document.querySelector('#tb-tarefa').style.display = 'none';
            game.querySelector('#tb-tarefa-selecionado')?.remove();
            game.querySelector('#tb-tarefa-aberto')?.remove();
            statusTarefa = 'fechado';
        };

        // Adiciona evento para destruir a tela imediatamente ao clicar em outra aba, fechar ou minimizar
        const abas = ['#tb-reuniao', '#tb-pasta', '#tb-lista', '#tb-jogo', '#tb-tarefa', '#xis-tarefa', '#minimizar-tarefa'];
        abas.forEach(selector => {
            document.querySelector(selector)?.addEventListener('click', destruirTela, { once: true });
        });

        // Chama destruir a tela da tarefa após 2 segundos, caso não tenha sido destruída antes
        setTimeout(destruirTela, 2000);
    }

    const botaoEntregar = document.createElement('div');
    botaoEntregar.id = 'botao-entregar-t5';
    botaoEntregar.addEventListener('click', () => {
        const resposta = input.value.trim();
        const respostaCorreta = resposta == tarefa['resposta_correta'];

        if (respostaCorreta) {
            pontuacao += tarefa['pontosGanhos'];
            try {
                if (Date.now() - contadorTarefas[indiceTarefa - 1] < 3000) {
                    desbloquearConquista(11);
                }
                contadorTarefas[indiceTarefa - 1] = 0;
            } finally { }
            aumentarTarefasConcluidas();
            const mensagem = document.createElement('div');
            mensagem.id = 'sucesso-t5';
            mensagem.textContent = `+${tarefa['pontosGanhos']} ponto${tarefa['pontosGanhos'] === 1 ? '' : 's'}`;
            game.appendChild(mensagem);
            tarefas[indiceTarefa - 1] = null;
            preencherTarefas();
            destruirTela();
        } else {
            estadoTarefas[indiceTarefa].tentativasRestantes -= 1;
            tentativasRestantes.textContent = `${estadoTarefas[indiceTarefa].tentativasRestantes} ${estadoTarefas[indiceTarefa].tentativasRestantes === 1 ? 'tentativa restante' : 'tentativas restantes'}`;
            if (estadoTarefas[indiceTarefa].tentativasRestantes <= 0) {
                const input = document.querySelector('#input-tarefa-5');
                input.style.color = '#00cf0a';
                input.style.fontWeight = 'bold';
                input.value = tarefa['resposta_correta'];
                pontuacao -= Math.abs(tarefa['pontosPerdidos']);
                nenhumaTarefaFalha = false;
                pontuacao = Math.max(pontuacao, 0);
                const mensagem = document.createElement('div');
                mensagem.id = 'falha-t5';
                mensagem.textContent = `-${Math.abs(tarefa['pontosPerdidos'])} ponto${Math.abs(tarefa['pontosPerdidos']) === 1 ? '' : 's'}`;
                game.appendChild(mensagem);
                tarefas[indiceTarefa - 1] = null;
                preencherTarefas();
                destruirTela();
            }
        }
    });
    game.appendChild(botaoEntregar);
    const botaoDuvida = document.createElement('div');
    botaoDuvida.id = 'botao-duvida-t5';
    botaoDuvida.addEventListener('click', () => {
        const duvidaDiv = document.createElement('div');
        duvidaDiv.id = 'duvida-t5';
        game.appendChild(duvidaDiv);

        const botaoOk = document.createElement('div');
        botaoOk.id = 'botao-ok';
        botaoOk.addEventListener('click', () => {
            botaoOk.remove();
            duvidaDiv.remove();
        });
        game.appendChild(botaoOk);
    });
    game.appendChild(botaoDuvida);
}

function criarTelaTarefaTipo6(indiceTarefa) {
    const tarefa = tarefas[indiceTarefa - 1];
    const game = document.querySelector('#game');

    if (!estadoTarefas[indiceTarefa]) {
        estadoTarefas[indiceTarefa] = { questaoAtual: 0, totalQuestoes: Object.keys(tarefa).length - 3, erros: 0 };
    }

    const { questaoAtual, totalQuestoes, erros } = estadoTarefas[indiceTarefa];

    const telaTarefa = document.createElement('div');
    telaTarefa.id = 'tela-tarefa-6';
    game.appendChild(telaTarefa);

    const botaoXis = document.createElement('div');
    botaoXis.id = 'xis-tarefa';
    botaoXis.addEventListener('click', () => {
        destruirTelaTarefa();
        document.querySelector('#tb-tarefa').style.display = 'none';
        game.querySelector('#tb-tarefa-selecionado')?.remove();
        statusTarefa = 'fechado';
    });
    game.appendChild(botaoXis);

    const botaoMinimizar = document.createElement('div');
    botaoMinimizar.id = 'minimizar-tarefa';
    botaoMinimizar.addEventListener('click', () => {
        destruirTelaTarefa();
        game.querySelector('#tb-tarefa-selecionado')?.remove();
        const tarefaAberto = document.createElement('div');
        tarefaAberto.id = 'tb-tarefa-aberto';
        tarefaAberto.className = 'aberto';
        game.appendChild(tarefaAberto);
        statusTarefa = 'aberto';
    });
    game.appendChild(botaoMinimizar);

    const pergunta = document.createElement('div');
    pergunta.id = 'pergunta-tarefa-6';
    pergunta.textContent = tarefa[questaoAtual].pergunta;
    game.appendChild(pergunta);

    const progresso = document.createElement('div');
    progresso.id = 'progresso-tarefa-6';
    progresso.textContent = `${questaoAtual + 1}/${totalQuestoes}`;
    game.appendChild(progresso);

    const cores = ['verde', 'vermelho', 'azul', 'amarelo'];
    tarefa[questaoAtual].alternativas.forEach((alternativa, index) => {
        const botao = document.createElement('button');
        botao.id = `botao-${cores[index]}-t6`;
        botao.textContent = alternativa.texto;

        botao.addEventListener('click', () => {
            if (alternativa.correta) {
                if (questaoAtual + 1 === totalQuestoes) {
                    pontuacao += tarefa.pontosGanhos;
                    try {
                        if (Date.now() - contadorTarefas[indiceTarefa - 1] < 3000) {
                            desbloquearConquista(11);
                        }
                        contadorTarefas[indiceTarefa - 1] = 0;
                    } finally { }
                    aumentarTarefasConcluidas();
                    const mensagem = document.createElement('div');
                    mensagem.id = 'sucesso-t6';
                    mensagem.textContent = `+${tarefa.pontosGanhos} ponto${tarefa.pontosGanhos === 1 ? '' : 's'}`;
                    game.appendChild(mensagem);
                    tarefas[indiceTarefa - 1] = null;
                    preencherTarefas();
                    setTimeout(() => {
                        destruirTelaTarefa();
                        document.querySelector('#tb-tarefa').style.display = 'none';
                        game.querySelector('#tb-tarefa-selecionado')?.remove();
                        game.querySelector('#tb-tarefa-aberto')?.remove();
                        statusTarefa = 'fechado';
                    }, 2000);
                } else {
                    estadoTarefas[indiceTarefa].questaoAtual++;
                    destruirTelaTarefa();
                    criarTelaTarefaTipo6(indiceTarefa);
                }
            } else {
                estadoTarefas[indiceTarefa].erros++;
                if (erros + 1 >= 2) {
                    const errado = document.createElement('div');
                    errado.id = 'clique-errado-t6';
                    botao.appendChild(errado);

                    const certo = document.createElement('div');
                    certo.id = 'clique-certo-t6';
                    const textoCerto = tarefa[questaoAtual].alternativas.find(a => a.correta)['texto'];
                    const botaoCorreto = Array.from(document.querySelectorAll('[id^="botao-"]')).find(botao => botao.textContent === textoCerto);
                    botaoCorreto.appendChild(certo);

                    pontuacao -= Math.abs(tarefa.pontosPerdidos);
                    nenhumaTarefaFalha = false;
                    pontuacao = Math.max(pontuacao, 0);
                    const mensagem = document.createElement('div');
                    mensagem.id = 'falha-t6';
                    mensagem.textContent = `-${Math.abs(tarefa.pontosPerdidos)} ponto${Math.abs(tarefa.pontosPerdidos) === 1 ? '' : 's'}`;
                    game.appendChild(mensagem);
                    tarefas[indiceTarefa - 1] = null;
                    preencherTarefas();
                    setTimeout(() => {
                        destruirTelaTarefa();
                        document.querySelector('#tb-tarefa').style.display = 'none';
                        game.querySelector('#tb-tarefa-selecionado')?.remove();
                        game.querySelector('#tb-tarefa-aberto')?.remove();
                        statusTarefa = 'fechado';
                    }, 2000);
                } else {
                    const errado = document.createElement('div');
                    errado.id = 'clique-errado-t6';
                    botao.appendChild(errado);

                    const certo = document.createElement('div');
                    certo.id = 'clique-certo-t6';
                    const textoCerto = tarefa[questaoAtual].alternativas.find(a => a.correta)['texto'];
                    const botaoCorreto = Array.from(document.querySelectorAll('[id^="botao-"]')).find(botao => botao.textContent === textoCerto);
                    botaoCorreto.appendChild(certo);
                    estadoTarefas[indiceTarefa].questaoAtual++;
                    const novasQuestoes = gerarDesafioTipo6();
                    estadoTarefas[indiceTarefa].totalQuestoes += novasQuestoes.length;

                    tarefa[3] = novasQuestoes[0];
                    tarefa[4] = novasQuestoes[1];
                    tarefa[5] = novasQuestoes[2];

                    const mensagem = document.createElement('div');
                    mensagem.id = 'errado-t6';
                    mensagem.textContent = "Errado. +3 questões.";
                    game.appendChild(mensagem);

                    setTimeout(() => {
                        mensagem.remove();
                        destruirTelaTarefa();
                        criarTelaTarefaTipo6(indiceTarefa);
                    }, 1000);
                }
            }
        });

        game.appendChild(botao);
    });

    const botaoDuvida = document.createElement('div');
    botaoDuvida.id = 'botao-duvida-t6';
    botaoDuvida.addEventListener('click', () => {
        const duvidaDiv = document.createElement('div');
        duvidaDiv.id = 'duvida-t6';
        game.appendChild(duvidaDiv);

        const botaoOk = document.createElement('div');
        botaoOk.id = 'botao-ok';
        botaoOk.addEventListener('click', () => {
            botaoOk.remove();
            duvidaDiv.remove();
        });
        game.appendChild(botaoOk);
    });
    game.appendChild(botaoDuvida);
}

function criarTelaTarefaTipo7(indiceTarefa) {
    const tarefa = tarefas[indiceTarefa - 1];
    const game = document.querySelector('#game');

    if (!estadoTarefas[indiceTarefa]) {
        estadoTarefas[indiceTarefa] = { etapaAtual: 0, textoAtual: "" };
    }

    const { etapaAtual, textoAtual } = estadoTarefas[indiceTarefa];

    const telaTarefa = document.createElement('div');
    telaTarefa.id = 'tela-tarefa-7';
    game.appendChild(telaTarefa);

    const botaoXis = document.createElement('div');
    botaoXis.id = 'xis-tarefa';
    botaoXis.addEventListener('click', () => {
        destruirTelaTarefa();
        document.querySelector('#tb-tarefa').style.display = 'none';
        game.querySelector('#tb-tarefa-selecionado')?.remove();
        statusTarefa = 'fechado';
    });
    game.appendChild(botaoXis);

    const botaoMinimizar = document.createElement('div');
    botaoMinimizar.id = 'minimizar-tarefa';
    botaoMinimizar.addEventListener('click', () => {
        destruirTelaTarefa();
        game.querySelector('#tb-tarefa-selecionado')?.remove();
        const tarefaAberto = document.createElement('div');
        tarefaAberto.id = 'tb-tarefa-aberto';
        tarefaAberto.className = 'aberto';
        game.appendChild(tarefaAberto);
        statusTarefa = 'aberto';
    });
    game.appendChild(botaoMinimizar);

    const titulo = document.createElement('div');
    titulo.id = 'titulo-tarefa-7';
    titulo.textContent = tarefa.titulo;
    game.appendChild(titulo);

    const campoTexto = document.createElement('div');
    campoTexto.id = 'campo-texto-tarefa-7';
    campoTexto.textContent = textoAtual || "...";
    game.appendChild(campoTexto);

    const cores = ['verde', 'vermelho', 'azul', 'amarelo'];
    const alternativas = tarefa.alternativas[etapaAtual];

    alternativas.opcoes.forEach((opcao, index) => {
        const botao = document.createElement('button');
        botao.id = `botao-${cores[index]}-t7`;
        botao.textContent = opcao;

        botao.addEventListener('click', () => {
            if (index === alternativas.indiceCorreta) {
                estadoTarefas[indiceTarefa].textoAtual += opcao;
                estadoTarefas[indiceTarefa].textoAtual = estadoTarefas[indiceTarefa].textoAtual.replace('...', ' ');
                estadoTarefas[indiceTarefa].textoAtual += '...';
                estadoTarefas[indiceTarefa].etapaAtual++;

                if (estadoTarefas[indiceTarefa].etapaAtual === tarefa.alternativas.length) {
                    document.querySelector('#campo-texto-tarefa-7').textContent = tarefa.alternativas.map(a => a.opcoes[a.indiceCorreta]).join(' ');
                    pontuacao += tarefa.pontosGanhos;
                    try {
                        if (Date.now() - contadorTarefas[indiceTarefa - 1] < 3000) {
                            desbloquearConquista(11);
                        }
                        contadorTarefas[indiceTarefa - 1] = 0;
                    } finally { }
                    aumentarTarefasConcluidas();
                    const mensagem = document.createElement('div');
                    mensagem.id = 'sucesso-t7';
                    mensagem.textContent = `+${tarefa.pontosGanhos} ponto${tarefa.pontosGanhos === 1 ? '' : 's'}`;
                    game.appendChild(mensagem);

                    const comandoCompleto = document.createElement('div');
                    comandoCompleto.id = 'comando-completo-t7';
                    comandoCompleto.textContent = estadoTarefas[indiceTarefa].textoAtual.replace('...', '');
                    game.appendChild(comandoCompleto);

                    tarefas[indiceTarefa - 1] = null;
                    preencherTarefas();
                    destruirTela()
                } else {
                    destruirTelaTarefa();
                    criarTelaTarefaTipo7(indiceTarefa);
                }
            } else {
                const errado = document.createElement('div');
                errado.id = 'clique-errado-t6';
                botao.appendChild(errado);

                const certo = document.createElement('div');
                certo.id = 'clique-certo-t6';
                const textoCerto = tarefa.alternativas[etapaAtual].opcoes[tarefa.alternativas[etapaAtual].indiceCorreta];
                const botaoCorreto = Array.from(document.querySelectorAll('[id^="botao-"]')).find(botao => botao.textContent === textoCerto);
                botaoCorreto.appendChild(certo);

                pontuacao -= Math.abs(tarefa.pontosPerdidos);
                nenhumaTarefaFalha = false;
                pontuacao = Math.max(pontuacao, 0);
                const mensagem = document.createElement('div');
                mensagem.id = 'falha-t7';
                mensagem.textContent = `-${Math.abs(tarefa.pontosPerdidos)} ponto${Math.abs(tarefa.pontosPerdidos) === 1 ? '' : 's'}`;
                game.appendChild(mensagem);
                tarefas[indiceTarefa - 1] = null;
                preencherTarefas();
                destruirTela();
            }
        });

        game.appendChild(botao);
    });

    const botaoDuvida = document.createElement('div');
    botaoDuvida.id = 'botao-duvida-t7';
    botaoDuvida.addEventListener('click', () => {
        const duvidaDiv = document.createElement('div');
        duvidaDiv.id = 'duvida-t7';
        game.appendChild(duvidaDiv);

        const botaoOk = document.createElement('div');
        botaoOk.id = 'botao-ok';
        botaoOk.addEventListener('click', () => {
            botaoOk.remove();
            duvidaDiv.remove();
        });
        game.appendChild(botaoOk);
    });
    game.appendChild(botaoDuvida);

    function destruirTela() {
        // Desabilita todos os botões (exceto os botões de fechar e minimizar)
        document.querySelectorAll('[id^="botao-"]').forEach(botao => {
            if (!botao.id.includes('xis') && !botao.id.includes('minimizar')) {
                botao.style.pointerEvents = 'none';
            }
        });

        const destruirTela = () => {
            destruirTelaTarefa();
            document.querySelector('#tb-tarefa').style.display = 'none';
            game.querySelector('#tb-tarefa-selecionado')?.remove();
            game.querySelector('#tb-tarefa-aberto')?.remove();
            statusTarefa = 'fechado';
        };

        // Adiciona evento para destruir a tela imediatamente ao clicar em outra aba, fechar ou minimizar
        const abas = ['#tb-reuniao', '#tb-pasta', '#tb-lista', '#tb-jogo', '#tb-tarefa', '#xis-tarefa', '#minimizar-tarefa'];
        abas.forEach(selector => {
            document.querySelector(selector)?.addEventListener('click', destruirTela, { once: true });
        });

        // Chama destruir a tela da tarefa após 2 segundos, caso não tenha sido destruída antes
        setTimeout(destruirTela, 2000);
    }
}

let intervaloEvento;
let intervaloCamera;
let eventoAtendido = false;

let ligarCameraDesb7 = false;
let energiaDesb8 = true;
let felicidadeDesb9 = true;
let contadorTarefas = [0, 0, 0, 0];
let quantMicNinjaDesb14 = 0;
let verifDesb14 = false;
let verifDesb15 = false;
let nenhumaTarefaFalha = true;

function selecionaReuniao() {
    desselecionaAbas();
    destruirTelaPasta();
    destruirTelaDocumento();
    destruirTelaPasta();
    destruirTelaLista();
    destruirTelaTarefa();
    destruirTelaJogo();
    statusReuniao = 'selecionado';

    const telaReuniao = document.createElement('div');
    const compartilharTela = document.createElement('div');
    const camera = document.createElement('div');
    const microfone = document.createElement('div');
    telaReuniao.id = 'tela-reuniao';
    compartilharTela.id = 'compartilhar-tela';
    camera.id = cameraAberto ? 'camera-aberto' : 'camera-fechado';
    microfone.id = microfoneAberto ? 'microfone-aberto' : 'microfone-fechado';
    game.appendChild(telaReuniao);
    game.appendChild(compartilharTela);
    game.appendChild(camera);
    game.appendChild(microfone);

    camera.addEventListener('click', () => {
        camera.id = cameraAberto ? 'camera-fechado' : 'camera-aberto';
        cameraAberto = !cameraAberto;

        if (cameraAberto) {
            if (ligarCameraDesb7) {
                desbloquearConquista(7);
            }
            clearInterval(intervaloCamera);
            const notificacaoCamera = Array.from(document.querySelectorAll('.notificacao')).find(n =>
                n.querySelector('.texto-notificacao')?.textContent.startsWith('Religue a câmera')
            );
            notificacaoCamera?.remove();
        } else {
            iniciarEventoCamera();
        }
    });

    microfone.addEventListener('click', () => {
        microfone.id = microfoneAberto ? 'microfone-fechado' : 'microfone-aberto';
        microfoneAberto = !microfoneAberto;

        if (!microfoneAberto && eventoAtivo === 'microfone') {
            notificar(5);
            const notificacaoFalando = Array.from(document.querySelectorAll('.notificacao')).find(n =>
                n.querySelector('.texto-notificacao')?.textContent.startsWith('Falando...')
            );
            notificacaoFalando?.remove();
        } else if (microfoneAberto && eventoAtivo === 'microfone') {
            if (verifDesb14) {
                quantMicNinjaDesb14++;
                if (quantMicNinjaDesb14 >= 5) {
                    desbloquearConquista(14);
                }
            }
            if (jogoRodando && !estaPausado) {
                notificar(14);
                const notificacaoFalando = Array.from(document.querySelectorAll('.notificacao')).find(n =>
                    n.querySelector('.texto-notificacao')?.textContent.startsWith('Falando...')
                );
                notificacaoFalando?.remove();
                return;
            }
        }
    });

    const xisReuniao = document.createElement('div');
    const minimizarReuniao = document.createElement('div');
    xisReuniao.id = 'xis-reuniao';
    minimizarReuniao.id = 'minimizar-reuniao';
    game.appendChild(xisReuniao);
    game.appendChild(minimizarReuniao);

    xisReuniao.addEventListener('click', () => {
        const confirmacaoSaida = document.createElement('div');
        confirmacaoSaida.id = 'confirmacao-saida-reuniao';
        game.appendChild(confirmacaoSaida);

        const botaoConfirmar = document.createElement('div');
        botaoConfirmar.id = 'botao-confirmar-saida-reuniao';
        botaoConfirmar.addEventListener('click', () => {
            let conquistasGO = [];
            if (tempoRestante > 530) {
                conquistasGO.push(18);
            }
            gameOver(2);
        });
        game.appendChild(botaoConfirmar);

        const botaoCancelar = document.createElement('div');
        botaoCancelar.id = 'botao-cancelar-saida-reuniao';
        botaoCancelar.addEventListener('click', () => {
            confirmacaoSaida.remove();
            botaoConfirmar.remove();
            botaoCancelar.remove();
        });
        game.appendChild(botaoCancelar);
    });

    minimizarReuniao.addEventListener('click', () => {
        destruirTelaReuniao();
        game.querySelector('#tb-reuniao-selecionado')?.remove();
        const reuniaoAberto = document.createElement('div');
        reuniaoAberto.id = 'tb-reuniao-aberto';
        reuniaoAberto.className = 'aberto';
        game.appendChild(reuniaoAberto);
        statusReuniao = 'aberto';
    });

    const reuniaoAberto = game.querySelector('#tb-reuniao-aberto');
    if (reuniaoAberto) {
        reuniaoAberto.remove();
    }

    const reuniaoSelecionado = document.createElement('div');
    reuniaoSelecionado.id = 'tb-reuniao-selecionado';
    reuniaoSelecionado.className = 'selecionado';
    game.appendChild(reuniaoSelecionado);

    document.querySelector('#compartilhar-tela').addEventListener('click', async () => {
        const notificacaoCompartilharTela = Array.from(document.querySelectorAll('.notificacao')).find(n =>
            n.querySelector('.texto-notificacao')?.textContent.startsWith('Compartilhe ')
        );
        const textoNotificacaoCompartilharTela = notificacaoCompartilharTela?.querySelector('.texto-notificacao');
        const countdownNotificacaoCompartilharTela = notificacaoCompartilharTela?.querySelector('.countdown-notificacao');
        const documento = textoNotificacaoCompartilharTela?.textContent.split('documento ')[1]?.split(',')[0];

        if (eventoAtivo === 'compartilharTela') {
            eventoAtendido = true;
            clearInterval(intervaloEvento);

            if (statusPasta === 'aberto') {
                selecionaPasta();
            } else {
                minimizarReuniao.click();
            }

            if (statusLista === 'aberto' || statusTarefa === 'aberto' || statusJogo === 'aberto') {
                eventoAtivo = null;
                iniciarEventosAleatorios();
                notificacaoCompartilharTela?.remove();
                notificar(11);
                setTimeout(selecionaReuniao, 500);
            } else if (!documentoAberto) {
                eventoAtivo = null;
                iniciarEventosAleatorios();
                notificacaoCompartilharTela?.remove();
                notificar(9);
                setTimeout(selecionaReuniao, 500);
            } else if (documentoAberto != documento) {
                eventoAtivo = null;
                iniciarEventosAleatorios();
                notificacaoCompartilharTela?.remove();
                notificar(10);
                setTimeout(selecionaReuniao, 500);
            } else {
                let texto = textoNotificacaoCompartilharTela.textContent;
                const listaBaloes = ['#balao-mesa', '#balao-escritorio', '#balao-cafeteira'];
                listaBaloes.forEach(balaoId => {
                    const balao = document.querySelector(balaoId);
                    if (balao) {
                        let textoAtual = balao.innerHTML;
                        textoAtual = textoAtual.replace('<br>', '\n');
                        textoAtual = textoAtual.replace(texto, '');
                        textoAtual.replace('\n', '<br>');
                        textoAtual = textoAtual.replace('<br>', '').replace('<br>', '');
                        balao.innerHTML = textoAtual;
                    }

                    if (balao.textContent.trim() === '') {
                        balao.style.display = 'none';
                    }
                });
                textoNotificacaoCompartilharTela.textContent = 'Compartilhando...';
                notificacaoCompartilharTela.style.backgroundImage = 'url("../../assets/pc/notificacoes/verde.png")';
                countdownNotificacaoCompartilharTela.style.color = '#00cf0a';
                countdownNotificacaoCompartilharTela.textContent = '3s';

                let countdownCompartilhando = 3;
                const intervaloCompartilhando = setInterval(() => {
                    countdownCompartilhando--;
                    countdownNotificacaoCompartilharTela.textContent = `${countdownCompartilhando}s`;
                    if (countdownCompartilhando <= 0) {
                        abasCT.forEach(selector => {
                            try {
                                document.querySelector(selector)?.removeEventListener('click', handleClick);
                            } finally { }
                        });
                        notificacaoCompartilharTela.remove();
                        clearInterval(intervaloCompartilhando);
                        eventoAtivo = null;
                        iniciarEventosAleatorios();
                        selecionaReuniao();
                    }
                }, 1000);

                const verificarInterrupcao = () => {
                    const abas = ['#tb-reuniao', '#tb-pasta', '#tb-lista', '#tb-jogo', '#tb-tarefa', '#xis-pasta', '#minimizar-pasta', '#documento-aberto-fechar', '#documento-aberto-minimizar', '#doc-1', '#doc-2', '#doc-3', '#doc-4', '#doc-5'];

                    switch (documento) {
                        case 'slides_site.docx':
                            abas.splice(abas.indexOf('#doc-1'), 1);
                            break;
                        case 'dados_aplicativo.docx':
                            abas.splice(abas.indexOf('#doc-2'), 1);
                            break;
                        case 'index.pdf':
                            abas.splice(abas.indexOf('#doc-3'), 1);
                            break;
                        case 'banco_app.txt':
                            abas.splice(abas.indexOf('#doc-4'), 1);
                            break;
                        case 'server.txt':
                            abas.splice(abas.indexOf('#doc-5'), 1);
                            break;
                    }

                    handleClick = () => {
                        if (eventoAtivo !== 'compartilharTela') return;
                        notificacaoCompartilharTela.remove();
                        clearInterval(intervaloCompartilhando);
                        eventoAtivo = null;
                        iniciarEventosAleatorios();
                        selecionaReuniao();
                        notificar(15);

                        // Remove o evento de todos os elementos
                        abas.forEach(selector => {
                            document.querySelector(selector)?.removeEventListener('click', handleClick);
                        });
                    };

                    abas.forEach(selector => {
                        document.querySelector(selector)?.addEventListener('click', handleClick, { once: true });
                    });
                };

                verificarInterrupcao();
            }
        } else {
            if (statusPasta === 'aberto') {
                selecionaPasta();
            } else {
                minimizarReuniao.click();
            }
            notificar(13);
            setTimeout(selecionaReuniao, 500);
        }
        const usuario = await Usuario.getUsuarioLogado();
        const usuarioId = usuario.id;
        await Usuario.aumentarQuantTelaCompartilhada(usuarioId, 1);
        const quantTelaCompartilhada = usuario.quant_tela_compartilhada;
        if (quantTelaCompartilhada >= 30) {
            desbloquearConquista(1);
        }
    });

    // Simular jogador ligando o microfone
    document.querySelector('#microfone-fechado')?.addEventListener('click', () => {
        if (!microfoneAberto) {
            return;
        }
        const notificacao = Array.from(document.querySelectorAll('.notificacao')).find(n =>
            n.querySelector('.texto-notificacao')?.textContent.startsWith('Ligue o microfone')
        );
        const textoNotificacao = notificacao?.querySelector('.texto-notificacao');
        const countdownNotificacao = notificacao?.querySelector('.countdown-notificacao');
        if (eventoAtivo === 'microfone') {
            eventoAtendido = true;
            clearInterval(intervaloEvento);
            if (textoNotificacao) {
                let texto = textoNotificacao.textContent;
                textoNotificacao.textContent = 'Falando...';
                notificacao.style.backgroundImage = 'url("../../assets/pc/notificacoes/verde.png")';
                const listaBaloes = ['#balao-mesa', '#balao-escritorio', '#balao-cafeteira'];
                listaBaloes.forEach(balaoId => {
                    const balao = document.querySelector(balaoId);
                    if (balao) {
                        let textoAtual = balao.innerHTML;
                        textoAtual = textoAtual.replace('<br>', '\n');
                        textoAtual = textoAtual.replace(texto, '');
                        textoAtual.replace('\n', '<br>');
                        textoAtual = textoAtual.replace('<br>', '').replace('<br>', '');
                        balao.innerHTML = textoAtual;
                    }

                    if (balao.textContent.trim() === '') {
                        balao.style.display = 'none';
                    }
                });
            }

            countdownNotificacao.style.color = '#00cf0a';
            countdownNotificacao.textContent = '3s';

            let countdownFalando = 3;
            const intervaloCompartilhando = setInterval(() => {
                countdownFalando--;
                countdownNotificacao.textContent = `${countdownFalando}s`;
                if (countdownFalando <= 0) {
                    notificacao.remove();
                    clearInterval(intervaloCompartilhando);
                    eventoAtivo = null;
                    iniciarEventosAleatorios();
                    document.querySelector('#microfone-aberto')?.click();
                }
            }, 1000);

        } else {
            notificar(12); // Advertência por ligar o microfone fora do evento
            setTimeout(() => {
                // Desligar automaticamente
                document.querySelector('#microfone-aberto')?.click();
            }, 500);
        }
    });
}

let documentoAberto;

function selecionaPasta() {
    desselecionaAbas();
    destruirTelaReuniao();
    destruirTelaDocumento();
    destruirTelaLista();
    destruirTelaTarefa();
    destruirTelaJogo();
    statusPasta = 'selecionado';

    const telaPasta = document.createElement('div');
    const minimizarPasta = document.createElement('div');
    const xisPasta = document.createElement('div');
    const doc1 = document.createElement('div');
    const doc2 = document.createElement('div');
    const doc3 = document.createElement('div');
    const doc4 = document.createElement('div');
    const doc5 = document.createElement('div');
    telaPasta.id = 'tela-pasta';
    minimizarPasta.id = 'minimizar-pasta';
    xisPasta.id = 'xis-pasta';
    doc1.id = 'doc-1';
    doc2.id = 'doc-2';
    doc3.id = 'doc-3';
    doc4.id = 'doc-4';
    doc5.id = 'doc-5';
    game.appendChild(telaPasta);
    game.appendChild(minimizarPasta);
    game.appendChild(xisPasta);
    game.appendChild(doc1);
    game.appendChild(doc2);
    game.appendChild(doc3);
    game.appendChild(doc4);
    game.appendChild(doc5);

    const pastaAberto = game.querySelector('#tb-pasta-aberto');
    if (pastaAberto) {
        pastaAberto.remove();
    }

    xisPasta.addEventListener('click', () => {
        destruirTelaPasta();
        destruirTelaDocumento();
        documentoAberto = null;
        game.querySelector('#tb-pasta-selecionado')?.remove();
        statusPasta = 'fechado';
    });

    const nomesDocs = ['slides_site.docx', 'dados_aplicativo.docx', 'index.pdf', 'banco_app.txt', 'server.txt'];

    [doc1, doc2, doc3, doc4, doc5].forEach((doc, index) => {
        doc.addEventListener('click', () => {
            if (documentoAberto === nomesDocs[index]) return;

            destruirTelaDocumento();
            documentoAberto = nomesDocs[index];

            const documentoAbertoDiv = document.createElement('div');
            documentoAbertoDiv.id = 'documento-aberto';
            const documentoAbertoTexto = document.createElement('div');
            documentoAbertoTexto.id = 'documento-aberto-texto';
            documentoAbertoTexto.textContent = nomesDocs[index];
            const documentoAbertoFechar = document.createElement('div');
            const documentoAbertoMinimizar = document.createElement('div');
            documentoAbertoFechar.id = 'documento-aberto-fechar';
            documentoAbertoMinimizar.id = 'documento-aberto-minimizar';
            game.appendChild(documentoAbertoDiv);
            game.appendChild(documentoAbertoTexto);
            game.appendChild(documentoAbertoFechar);
            game.appendChild(documentoAbertoMinimizar);

            documentoAbertoFechar.addEventListener('click', () => {
                destruirTelaDocumento();
                documentoAberto = null;
            });
            documentoAbertoMinimizar.addEventListener('click', () => {
                destruirTelaDocumento();
            });
        });
    });

    if (documentoAberto) {
        const documentoAbertoDiv = document.createElement('div');
        documentoAbertoDiv.id = 'documento-aberto';
        const documentoAbertoTexto = document.createElement('div');
        documentoAbertoTexto.id = 'documento-aberto-texto';
        documentoAbertoTexto.textContent = documentoAberto;
        const documentoAbertoFechar = document.createElement('div');
        const documentoAbertoMinimizar = document.createElement('div');
        documentoAbertoFechar.id = 'documento-aberto-fechar';
        documentoAbertoMinimizar.id = 'documento-aberto-minimizar';
        game.appendChild(documentoAbertoDiv);
        game.appendChild(documentoAbertoTexto);
        game.appendChild(documentoAbertoFechar);
        game.appendChild(documentoAbertoMinimizar);

        documentoAbertoFechar.addEventListener('click', () => {
            destruirTelaDocumento();
            documentoAberto = null;
        });
        documentoAbertoMinimizar.addEventListener('click', () => {
            destruirTelaDocumento();
        });
    }

    minimizarPasta.addEventListener('click', () => {
        destruirTelaPasta();
        game.querySelector('#tb-pasta-selecionado')?.remove();
        const pastaAberto = document.createElement('div');
        pastaAberto.id = 'tb-pasta-aberto';
        pastaAberto.className = 'aberto';
        game.appendChild(pastaAberto);
        statusPasta = 'aberto';
    });

    const pastaSelecionado = document.createElement('div');
    pastaSelecionado.id = 'tb-pasta-selecionado';
    pastaSelecionado.className = 'selecionado';
    game.appendChild(pastaSelecionado);
}

function selecionaLista() {
    desselecionaAbas();
    destruirTelaReuniao();
    destruirTelaDocumento();
    destruirTelaPasta();
    destruirTelaTarefa();
    destruirTelaJogo();
    statusLista = 'selecionado';

    const listaAberto = game.querySelector('#tb-lista-aberto');
    if (listaAberto) {
        listaAberto.remove();
    }

    const telaLista = document.createElement('div');
    const minimizarLista = document.createElement('div');
    const xisLista = document.createElement('div');

    telaLista.id = 'tela-lista';
    minimizarLista.id = 'minimizar-lista';
    xisLista.id = 'xis-lista';

    game.appendChild(telaLista);
    game.appendChild(minimizarLista);
    game.appendChild(xisLista);

    minimizarLista.addEventListener('click', () => {
        destruirTelaLista();

        game.querySelector('#tb-lista-selecionado')?.remove();
        const listaAberto = document.createElement('div');
        listaAberto.id = 'tb-lista-aberto';
        listaAberto.className = 'aberto';
        game.appendChild(listaAberto);

        // Adiciona o evento para reabrir a lista ao clicar no ícone minimizado
        listaAberto.addEventListener('click', () => {
            selecionaLista();
        });
    });

    xisLista.addEventListener('click', () => {
        destruirTelaLista();
        document.querySelector('#tb-lista-selecionado')?.remove();
        statusLista = 'fechado';
    });

    game.querySelector('#tb-lista-selecionado')?.remove();

    const listaSelecionado = document.createElement('div');
    listaSelecionado.id = 'tb-lista-selecionado';
    listaSelecionado.className = 'selecionado';
    game.appendChild(listaSelecionado);

    porTarefasNaTelaLista();
}

let posicaoAtual = 1;
let jogoRodando = false;
let jogoEstavaSelecionado = false;
let estaPausado = false;

const imagensPrecarregadas = {};

function preCarregarImagens(lista) {
    lista.forEach(src => {
        const img = new Image();
        img.src = src;
        imagensPrecarregadas[src] = img;
    });
}

preCarregarImagens([
    '../../assets/pc/jogo/mapa1_0.png',
    '../../assets/pc/jogo/mapa1_1.png',
    '../../assets/pc/jogo/mapa1_2.png',
    '../../assets/pc/jogo/mapa1_3.png',
    '../../assets/pc/jogo/mapa1_4.png',
    '../../assets/pc/jogo/mapa1_5.png',
    '../../assets/pc/jogo/mapa1_6.png',
    '../../assets/pc/jogo/mapa1_7.png',
    '../../assets/pc/jogo/mapa2_0.png',
    '../../assets/pc/jogo/mapa2_1.png',
    '../../assets/pc/jogo/mapa2_2.png',
    '../../assets/pc/jogo/mapa2_3.png',
    '../../assets/pc/jogo/mapa2_4.png',
    '../../assets/pc/jogo/mapa2_5.png',
    '../../assets/pc/jogo/mapa2_6.png',
    '../../assets/pc/jogo/mapa2_7.png',
    '../../assets/pc/jogo/mapa3_0.png',
    '../../assets/pc/jogo/mapa3_1.png',
    '../../assets/pc/jogo/mapa3_2.png',
    '../../assets/pc/jogo/mapa3_3.png',
    '../../assets/pc/jogo/mapa3_4.png',
    '../../assets/pc/jogo/mapa3_5.png',
    '../../assets/pc/jogo/mapa3_6.png',
    '../../assets/pc/jogo/mapa3_7.png',
    '../../assets/pc/jogo/mapa4_0.png',
    '../../assets/pc/jogo/mapa4_1.png',
    '../../assets/pc/jogo/mapa4_2.png',
    '../../assets/pc/jogo/mapa4_3.png',
    '../../assets/pc/jogo/mapa4_4.png',
    '../../assets/pc/jogo/mapa4_5.png',
    '../../assets/pc/jogo/mapa4_6.png',
    '../../assets/pc/jogo/mapa4_7.png',
]);

const mataInimigo = {
    "mapa 1": [
        [null, null, null, '../../assets/pc/jogo/mapa1_0.png'],
        [0, null, null, '../../assets/pc/jogo/mapa1_1.png'],
        [null, 0, null, '../../assets/pc/jogo/mapa1_2.png'],
        [null, null, 0, '../../assets/pc/jogo/mapa1_3.png'],
        [2, 1, null, '../../assets/pc/jogo/mapa1_4.png'],
        [3, null, 1, '../../assets/pc/jogo/mapa1_5.png'],
        [null, 3, 2, '../../assets/pc/jogo/mapa1_6.png'],
        [6, 5, 4, '../../assets/pc/jogo/mapa1_7.png'],
        0
    ],
    "mapa 2": [
        [null, null, null, '../../assets/pc/jogo/mapa2_0.png'],
        [0, null, null, '../../assets/pc/jogo/mapa2_1.png'],
        [null, 0, null, '../../assets/pc/jogo/mapa2_2.png'],
        [null, null, 0, '../../assets/pc/jogo/mapa2_3.png'],
        [2, 1, null, '../../assets/pc/jogo/mapa2_4.png'],
        [3, null, 1, '../../assets/pc/jogo/mapa2_5.png'],
        [null, 3, 2, '../../assets/pc/jogo/mapa2_6.png'],
        [6, 5, 4, '../../assets/pc/jogo/mapa2_7.png'],
        0
    ],
    "mapa 3": [
        [null, null, null, '../../assets/pc/jogo/mapa3_0.png'],
        [0, null, null, '../../assets/pc/jogo/mapa3_1.png'],
        [null, 0, null, '../../assets/pc/jogo/mapa3_2.png'],
        [null, null, 0, '../../assets/pc/jogo/mapa3_3.png'],
        [2, 1, null, '../../assets/pc/jogo/mapa3_4.png'],
        [3, null, 1, '../../assets/pc/jogo/mapa3_5.png'],
        [null, 3, 2, '../../assets/pc/jogo/mapa3_6.png'],
        [6, 5, 4, '../../assets/pc/jogo/mapa3_7.png'],
        0
    ],
    "mapa 4": [
        [null, null, null, '../../assets/pc/jogo/mapa4_0.png'],
        [0, null, null, '../../assets/pc/jogo/mapa4_1.png'],
        [null, 0, null, '../../assets/pc/jogo/mapa4_2.png'],
        [null, null, 0, '../../assets/pc/jogo/mapa4_3.png'],
        [2, 1, null, '../../assets/pc/jogo/mapa4_4.png'],
        [3, null, 1, '../../assets/pc/jogo/mapa4_5.png'],
        [null, 3, 2, '../../assets/pc/jogo/mapa4_6.png'],
        [6, 5, 4, '../../assets/pc/jogo/mapa4_7.png'],
        0
    ],
}

async function eliminarInimigo(ladoInimigo) {
    const telaJogo = document.querySelector('#tela-jogo');
    const inimigo = document.querySelector(`#inimigo-${posicaoAtual}-${ladoInimigo}`);

    if (felicidade < 5) {
        desbloquearConquista(34);
    }

    let srcMapa;

    let posicaoMapa = mataInimigo[`mapa ${posicaoAtual}`][8];

    switch (posicaoMapa) {
        case 1:
            srcMapa = mataInimigo[`mapa ${posicaoAtual}`][0][3];
            posicaoMapa = 0;
            break;
        case 2:
            srcMapa = mataInimigo[`mapa ${posicaoAtual}`][0][3];
            posicaoMapa = 0;
            break;
        case 3:
            srcMapa = mataInimigo[`mapa ${posicaoAtual}`][0][3];
            posicaoMapa = 0;
            break;
        case 4:
            if (ladoInimigo == 'esquerda') {
                srcMapa = mataInimigo[`mapa ${posicaoAtual}`][2][3];
                posicaoMapa = 2;
            } else {
                srcMapa = mataInimigo[`mapa ${posicaoAtual}`][1][3];
                posicaoMapa = 1;
            }
            break;
        case 5:
            if (ladoInimigo == 'esquerda') {
                srcMapa = mataInimigo[`mapa ${posicaoAtual}`][3][3];
                posicaoMapa = 3;
            } else {
                srcMapa = mataInimigo[`mapa ${posicaoAtual}`][1][3];
                posicaoMapa = 1;
            }
            break;
        case 6:
            if (ladoInimigo == 'meio') {
                srcMapa = mataInimigo[`mapa ${posicaoAtual}`][3][3];
                posicaoMapa = 3;
            } else {
                srcMapa = mataInimigo[`mapa ${posicaoAtual}`][2][3];
                posicaoMapa = 2;
            }
            break;
        case 7:
            if (ladoInimigo == 'esquerda') {
                srcMapa = mataInimigo[`mapa ${posicaoAtual}`][6][3];
                posicaoMapa = 6;
            } else if (ladoInimigo == 'meio') {
                srcMapa = mataInimigo[`mapa ${posicaoAtual}`][5][3];
                posicaoMapa = 5;
            } else {
                srcMapa = mataInimigo[`mapa ${posicaoAtual}`][4][3];
                posicaoMapa = 4;
            }
            break;
    }

    inimigo?.remove();
    mataInimigo[`mapa ${posicaoAtual}`][8] = posicaoMapa;

    felicidade = Math.min(100, felicidade + felicidadeInimigoDerrotado);
    atualizarHUD();

    if (statusJogo == 'selecionado') {
        telaJogo.style.backgroundImage = `url(${imagensPrecarregadas[srcMapa].src})`;
    }

    Usuario.aumentarQuantInimigosDerrotados(usuarioId, 1);
    const usuario = await Usuario.getUsuarioLogado();
    if (usuario.inimigos_derrotados >= 100) {
        desbloquearConquista(10);
    }
}

function gerarInimigo() {
    if (estaPausado) return;
    if (jogoRodando) {
        const numero = Math.floor(Math.random() * 3) + 1;
        if (numero == 1 || numero == 2) {
            const telaJogo = document.querySelector('#tela-jogo');

            const numeroMapa = Math.floor(Math.random() * 4) + 1;
            if (mataInimigo[`mapa ${numeroMapa}`][8] == 7) {
                return;
            }
            const mapa = mataInimigo[`mapa ${numeroMapa}`];
            const indiceMapaInicial = mapa[8];

            let numeroInimigo;
            let inimigo = document.createElement('div');
            let ladoInimigo;
            let indiceMapa;

            switch (mapa[8]) {
                case 0:
                    numeroInimigo = Math.floor(Math.random() * 3) + 1;

                    if (numeroInimigo == 1) {
                        ladoInimigo = "esquerda";
                        indiceMapa = 1;
                    } else if (numeroInimigo == 2) {
                        ladoInimigo = "meio";
                        indiceMapa = 2;
                    } else {
                        ladoInimigo = "direita";
                        indiceMapa = 3;
                    }

                    mapa[8] = indiceMapa;
                    break;
                case 1:
                    numeroInimigo = Math.floor(Math.random() * 2) + 2;
                    if (numeroInimigo == 2) {
                        ladoInimigo = "meio";
                        indiceMapa = 4;
                    } else {
                        ladoInimigo = "direita";
                        indiceMapa = 5;
                    }

                    mapa[8] = indiceMapa;
                    break;
                case 2:
                    numeroInimigo = Math.random() < 0.5 ? 1 : 3;
                    if (numeroInimigo == 1) {
                        ladoInimigo = "esquerda";
                        indiceMapa = 4;
                    } else {
                        ladoInimigo = "direita";
                        indiceMapa = 6;
                    }

                    mapa[8] = indiceMapa;
                    break;
                case 3:
                    numeroInimigo = Math.floor(Math.random() * 2) + 1;
                    if (numeroInimigo == 1) {
                        ladoInimigo = "esquerda";
                        indiceMapa = 5;
                    } else {
                        ladoInimigo = "meio";
                        indiceMapa = 6;
                    }

                    mapa[8] = indiceMapa;
                    break;
                case 4:
                    ladoInimigo = "direita";
                    indiceMapa = 7;

                    mapa[8] = indiceMapa;
                    break;
                case 5:
                    ladoInimigo = "meio";
                    indiceMapa = 7;

                    mapa[8] = indiceMapa;
                    break;
                case 6:
                    ladoInimigo = "esquerda";
                    indiceMapa = 7;

                    mapa[8] = indiceMapa;
                    break;
                case 7:
                    inimigo.remove();
                    break;
            }

            if (posicaoAtual == numeroMapa) {
                if (indiceMapaInicial != 7) {
                    if (statusJogo == 'selecionado') {
                        telaJogo.style.backgroundImage = `url(${imagensPrecarregadas[mapa[indiceMapa][3]].src})`;
                        inimigo.id = `inimigo-${numeroMapa}-${ladoInimigo}`;
                        game.appendChild(inimigo);
                        inimigo.addEventListener('click', () => {
                            eliminarInimigo(ladoInimigo);
                        });
                    }
                }
            }
        }
    }
}

function pausarJogo() {
    estaPausado = true;

    document.getElementById("pause-jogo")?.remove();

    const blur = document.createElement('div');
    blur.id = 'blur-jogo';
    game.appendChild(blur);

    const textoJogo = document.createElement('h3');
    textoJogo.id = 'texto-jogo';
    textoJogo.textContent = 'Jogo Pausado';
    game.appendChild(textoJogo);

    const play = document.createElement('div');
    play.id = 'play-jogo';
    game.appendChild(play);
    play.addEventListener('click', () => {
        document.getElementById("play-jogo").remove();
        document.getElementById("blur-jogo")?.remove();
        document.getElementById("texto-jogo")?.remove();
        estaPausado = false;
        const pause = document.createElement('div');
        pause.id = 'pause-jogo';
        game.appendChild(pause);
        pause.addEventListener('click', pausarJogo);
    });
}

let trocaMapaBloqueada = false;

function setaDireitaJogo() {
    if (trocaMapaBloqueada) return;
    trocaMapaBloqueada = true;
    setTimeout(() => trocaMapaBloqueada = false, 300);

    const telaJogo = document.querySelector('#tela-jogo');

    document.getElementById("seta-direita-jogo")?.remove();
    document.getElementById("seta-esquerda-jogo")?.remove();
    document.getElementById("inimigo-1-esquerda")?.remove();
    document.getElementById("inimigo-1-meio")?.remove();
    document.getElementById("inimigo-1-direita")?.remove();
    document.getElementById("inimigo-2-esquerda")?.remove();
    document.getElementById("inimigo-2-meio")?.remove();
    document.getElementById("inimigo-2-direita")?.remove();
    document.getElementById("inimigo-3-esquerda")?.remove();
    document.getElementById("inimigo-3-meio")?.remove();
    document.getElementById("inimigo-3-direita")?.remove();
    document.getElementById("inimigo-4-esquerda")?.remove();
    document.getElementById("inimigo-4-meio")?.remove();
    document.getElementById("inimigo-4-direita")?.remove();

    const setaDireita = document.createElement('div');
    setaDireita.id = 'seta-direita-jogo';
    game.appendChild(setaDireita);
    setaDireita.addEventListener('click', setaDireitaJogo);
    const setaEsquerda = document.createElement('div');
    setaEsquerda.id = 'seta-esquerda-jogo';
    game.appendChild(setaEsquerda);
    setaEsquerda.addEventListener('click', setaEsquerdaJogo);

    if (posicaoAtual < 4) {
        posicaoAtual++;
    }

    const posicaoMapa = mataInimigo[`mapa ${posicaoAtual}`][8];
    telaJogo.style.backgroundImage = `url(${imagensPrecarregadas[mataInimigo[`mapa ${posicaoAtual}`][posicaoMapa][3]].src})`;

    switch (posicaoAtual) {
        case 1:
            setaEsquerda?.remove();
            break;
        case 4:
            setaDireita?.remove();
            break;
    }

    if (posicaoMapa != 0) {
        const inimigo1 = document.createElement('div');
        const inimigo2 = document.createElement('div');
        const inimigo3 = document.createElement('div');
        if (posicaoMapa == 1) {
            inimigo1.id = `inimigo-${posicaoAtual}-esquerda`;
            game.appendChild(inimigo1);
            inimigo1.addEventListener('click', () => {
                eliminarInimigo("esquerda");
            });
            inimigo2.remove();
            inimigo3.remove();
        } else if (posicaoMapa == 2) {
            inimigo1.id = `inimigo-${posicaoAtual}-meio`;
            game.appendChild(inimigo1);
            inimigo1.addEventListener('click', () => {
                eliminarInimigo("meio");
            });
            inimigo2.remove();
            inimigo3.remove();
        } else if (posicaoMapa == 3) {
            inimigo1.id = `inimigo-${posicaoAtual}-direita`;
            game.appendChild(inimigo1);
            inimigo1.addEventListener('click', () => {
                eliminarInimigo("direita");
            });
            inimigo2.remove();
            inimigo3.remove();
        } else if (posicaoMapa == 4) {
            inimigo1.id = `inimigo-${posicaoAtual}-esquerda`;
            game.appendChild(inimigo1);
            inimigo1.addEventListener('click', () => {
                eliminarInimigo("esquerda");
            });
            inimigo2.id = `inimigo-${posicaoAtual}-meio`;
            game.appendChild(inimigo2);
            inimigo2.addEventListener('click', () => {
                eliminarInimigo("meio");
            });
            inimigo3.remove();
        } else if (posicaoMapa == 5) {
            inimigo1.id = `inimigo-${posicaoAtual}-esquerda`;
            game.appendChild(inimigo1);
            inimigo1.addEventListener('click', () => {
                eliminarInimigo("esquerda");
            });
            inimigo2.id = `inimigo-${posicaoAtual}-direita`;
            game.appendChild(inimigo2);
            inimigo2.addEventListener('click', () => {
                eliminarInimigo("direita");
            });
            inimigo3.remove();
        } else if (posicaoMapa == 6) {
            inimigo1.id = `inimigo-${posicaoAtual}-meio`;
            game.appendChild(inimigo1);
            inimigo1.addEventListener('click', () => {
                eliminarInimigo("meio");
            });
            inimigo2.id = `inimigo-${posicaoAtual}-direita`;
            game.appendChild(inimigo2);
            inimigo2.addEventListener('click', () => {
                eliminarInimigo("direita");
            });
            inimigo3.remove();
        } else if (posicaoMapa == 7) {
            inimigo1.id = `inimigo-${posicaoAtual}-esquerda`;
            game.appendChild(inimigo1);
            inimigo1.addEventListener('click', () => {
                eliminarInimigo("esquerda");
            });
            inimigo2.id = `inimigo-${posicaoAtual}-meio`;
            game.appendChild(inimigo2);
            inimigo2.addEventListener('click', () => {
                eliminarInimigo("meio");
            });
            inimigo3.id = `inimigo-${posicaoAtual}-direita`;
            game.appendChild(inimigo3);
            inimigo3.addEventListener('click', () => {
                eliminarInimigo("direita");
            });
        }
    }
}

function setaEsquerdaJogo() {
    if (trocaMapaBloqueada) return;
    trocaMapaBloqueada = true;
    setTimeout(() => trocaMapaBloqueada = false, 300);

    const telaJogo = document.querySelector('#tela-jogo');

    document.getElementById("seta-direita-jogo")?.remove();
    document.getElementById("seta-esquerda-jogo")?.remove();
    document.getElementById("inimigo-1-esquerda")?.remove();
    document.getElementById("inimigo-1-meio")?.remove();
    document.getElementById("inimigo-1-direita")?.remove();
    document.getElementById("inimigo-2-esquerda")?.remove();
    document.getElementById("inimigo-2-meio")?.remove();
    document.getElementById("inimigo-2-direita")?.remove();
    document.getElementById("inimigo-3-esquerda")?.remove();
    document.getElementById("inimigo-3-meio")?.remove();
    document.getElementById("inimigo-3-direita")?.remove();
    document.getElementById("inimigo-4-esquerda")?.remove();
    document.getElementById("inimigo-4-meio")?.remove();
    document.getElementById("inimigo-4-direita")?.remove();

    const setaDireita = document.createElement('div');
    setaDireita.id = 'seta-direita-jogo';
    game.appendChild(setaDireita);
    setaDireita.addEventListener('click', setaDireitaJogo);
    const setaEsquerda = document.createElement('div');
    setaEsquerda.id = 'seta-esquerda-jogo';
    game.appendChild(setaEsquerda);
    setaEsquerda.addEventListener('click', setaEsquerdaJogo);

    if (posicaoAtual > 1) {
        posicaoAtual--;
    }

    const posicaoMapa = mataInimigo[`mapa ${posicaoAtual}`][8];
    telaJogo.style.backgroundImage = `url(${imagensPrecarregadas[mataInimigo[`mapa ${posicaoAtual}`][posicaoMapa][3]].src})`;

    switch (posicaoAtual) {
        case 1:
            setaEsquerda?.remove();
            break;
        case 4:
            setaDireita?.remove();
            break;
    }

    if (posicaoMapa != 0) {
        const inimigo1 = document.createElement('div');
        const inimigo2 = document.createElement('div');
        const inimigo3 = document.createElement('div');
        if (posicaoMapa == 1) {
            inimigo1.id = `inimigo-${posicaoAtual}-esquerda`;
            game.appendChild(inimigo1);
            inimigo1.addEventListener('click', () => {
                eliminarInimigo("esquerda");
            });
            inimigo2.remove();
            inimigo3.remove();
        } else if (posicaoMapa == 2) {
            inimigo1.id = `inimigo-${posicaoAtual}-meio`;
            game.appendChild(inimigo1);
            inimigo1.addEventListener('click', () => {
                eliminarInimigo("meio");
            });
            inimigo2.remove();
            inimigo3.remove();
        } else if (posicaoMapa == 3) {
            inimigo1.id = `inimigo-${posicaoAtual}-direita`;
            game.appendChild(inimigo1);
            inimigo1.addEventListener('click', () => {
                eliminarInimigo("direita");
            });
            inimigo2.remove();
            inimigo3.remove();
        } else if (posicaoMapa == 4) {
            inimigo1.id = `inimigo-${posicaoAtual}-esquerda`;
            game.appendChild(inimigo1);
            inimigo1.addEventListener('click', () => {
                eliminarInimigo("esquerda");
            });
            inimigo2.id = `inimigo-${posicaoAtual}-meio`;
            game.appendChild(inimigo2);
            inimigo2.addEventListener('click', () => {
                eliminarInimigo("meio");
            });
            inimigo3.remove();
        } else if (posicaoMapa == 5) {
            inimigo1.id = `inimigo-${posicaoAtual}-esquerda`;
            game.appendChild(inimigo1);
            inimigo1.addEventListener('click', () => {
                eliminarInimigo("esquerda");
            });
            inimigo2.id = `inimigo-${posicaoAtual}-direita`;
            game.appendChild(inimigo2);
            inimigo2.addEventListener('click', () => {
                eliminarInimigo("direita");
            });
            inimigo3.remove();
        } else if (posicaoMapa == 6) {
            inimigo1.id = `inimigo-${posicaoAtual}-meio`;
            game.appendChild(inimigo1);
            inimigo1.addEventListener('click', () => {
                eliminarInimigo("meio");
            });
            inimigo2.id = `inimigo-${posicaoAtual}-direita`;
            game.appendChild(inimigo2);
            inimigo2.addEventListener('click', () => {
                eliminarInimigo("direita");
            });
            inimigo3.remove();
        } else if (posicaoMapa == 7) {
            inimigo1.id = `inimigo-${posicaoAtual}-esquerda`;
            game.appendChild(inimigo1);
            inimigo1.addEventListener('click', () => {
                eliminarInimigo("esquerda");
            });
            inimigo2.id = `inimigo-${posicaoAtual}-meio`;
            game.appendChild(inimigo2);
            inimigo2.addEventListener('click', () => {
                eliminarInimigo("meio");
            });
            inimigo3.id = `inimigo-${posicaoAtual}-direita`;
            game.appendChild(inimigo3);
            inimigo3.addEventListener('click', () => {
                eliminarInimigo("direita");
            });
        }
    }
}

function criarMapaJogo() {
    const botaoIniciar = document.querySelector('#botao-iniciar-jogo');
    botaoIniciar?.remove();

    posicaoAtual = 1;

    const telaJogo = document.querySelector('#tela-jogo');

    const posicaoMapa = mataInimigo[`mapa ${posicaoAtual}`][8];
    telaJogo.style.backgroundImage = `url(${imagensPrecarregadas[mataInimigo[`mapa ${posicaoAtual}`][posicaoMapa][3]].src})`;

    if (posicaoMapa != 0) {
        const inimigo1 = document.createElement('div');
        const inimigo2 = document.createElement('div');
        const inimigo3 = document.createElement('div');
        if (posicaoMapa == 1) {
            inimigo1.id = `inimigo-${posicaoAtual}-esquerda`;
            game.appendChild(inimigo1);
            inimigo1.addEventListener('click', () => {
                eliminarInimigo("esquerda");
            });
            inimigo2.remove();
            inimigo3.remove();
        } else if (posicaoMapa == 2) {
            inimigo1.id = `inimigo-${posicaoAtual}-meio`;
            game.appendChild(inimigo1);
            inimigo1.addEventListener('click', () => {
                eliminarInimigo("meio");
            });
            inimigo2.remove();
            inimigo3.remove();
        } else if (posicaoMapa == 3) {
            inimigo1.id = `inimigo-${posicaoAtual}-direita`;
            game.appendChild(inimigo1);
            inimigo1.addEventListener('click', () => {
                eliminarInimigo("direita");
            });
            inimigo2.remove();
            inimigo3.remove();
        } else if (posicaoMapa == 4) {
            inimigo1.id = `inimigo-${posicaoAtual}-esquerda`;
            game.appendChild(inimigo1);
            inimigo1.addEventListener('click', () => {
                eliminarInimigo("esquerda");
            });
            inimigo2.id = `inimigo-${posicaoAtual}-meio`;
            game.appendChild(inimigo2);
            inimigo2.addEventListener('click', () => {
                eliminarInimigo("meio");
            });
            inimigo3.remove();
        } else if (posicaoMapa == 5) {
            inimigo1.id = `inimigo-${posicaoAtual}-esquerda`;
            game.appendChild(inimigo1);
            inimigo1.addEventListener('click', () => {
                eliminarInimigo("esquerda");
            });
            inimigo2.id = `inimigo-${posicaoAtual}-direita`;
            game.appendChild(inimigo2);
            inimigo2.addEventListener('click', () => {
                eliminarInimigo("direita");
            });
            inimigo3.remove();
        } else if (posicaoMapa == 6) {
            inimigo1.id = `inimigo-${posicaoAtual}-meio`;
            game.appendChild(inimigo1);
            inimigo1.addEventListener('click', () => {
                eliminarInimigo("meio");
            });
            inimigo2.id = `inimigo-${posicaoAtual}-direita`;
            game.appendChild(inimigo2);
            inimigo2.addEventListener('click', () => {
                eliminarInimigo("direita");
            });
            inimigo3.remove();
        } else if (posicaoMapa == 7) {
            inimigo1.id = `inimigo-${posicaoAtual}-esquerda`;
            game.appendChild(inimigo1);
            inimigo1.addEventListener('click', () => {
                eliminarInimigo("esquerda");
            });
            inimigo2.id = `inimigo-${posicaoAtual}-meio`;
            game.appendChild(inimigo2);
            inimigo2.addEventListener('click', () => {
                eliminarInimigo("meio");
            });
            inimigo3.id = `inimigo-${posicaoAtual}-direita`;
            game.appendChild(inimigo3);
            inimigo3.addEventListener('click', () => {
                eliminarInimigo("direita");
            });
        }
    }

    const pause = document.createElement('div');
    pause.id = 'pause-jogo';
    game.appendChild(pause);
    pause.addEventListener('click', pausarJogo);

    const setaDireita = document.createElement('div');
    setaDireita.id = 'seta-direita-jogo';
    game.appendChild(setaDireita);
    setaDireita.addEventListener('click', setaDireitaJogo);

    const setaEsquerda = document.createElement('div');
    setaEsquerda.id = 'seta-esquerda-jogo';
    game.appendChild(setaEsquerda);
    setaEsquerda.addEventListener('click', setaEsquerdaJogo);

    setaEsquerda?.remove();

    jogoRodando = true;

    if (estaPausado) {
        pausarJogo();
    }
}

let botaoIniciarJogoJaClicado = false;

function criarTelaJogo() {
    destruirTelaReuniao();
    destruirTelaDocumento();
    destruirTelaPasta();
    destruirTelaTarefa();
    destruirTelaJogo();

    const telaJogo = document.createElement('div');
    telaJogo.id = 'tela-jogo';
    game.appendChild(telaJogo);

    const xisJogo = document.createElement('div');
    const minimizarJogo = document.createElement('div');
    xisJogo.id = 'xis-jogo';
    minimizarJogo.id = 'minimizar-jogo';
    game.appendChild(xisJogo);
    game.appendChild(minimizarJogo);

    xisJogo.addEventListener('click', () => {
        destruirTelaJogo();
        game.querySelector('#tb-jogo-selecionado')?.remove();
        statusJogo = 'fechado';
        jogoRodando = false;
        estaPausado = false;
        botaoIniciarJogoJaClicado = false;
    });

    minimizarJogo.addEventListener('click', () => {
        destruirTelaJogo();
        game.querySelector('#tb-jogo-selecionado')?.remove();
        const jogoAberto = document.createElement('div');
        jogoAberto.id = 'tb-jogo-aberto';
        jogoAberto.className = 'aberto';
        game.appendChild(jogoAberto);
        statusJogo = 'aberto';
    });

    const jogoAberto = game.querySelector('#tb-jogo-aberto');
    if (jogoAberto) {
        jogoAberto.remove();
    }

    if (jogoEstavaSelecionado && botaoIniciarJogoJaClicado) {
        criarMapaJogo();
        return;
    }

    const botaoIniciar = document.createElement('div');
    botaoIniciar.id = 'botao-iniciar-jogo';
    game.appendChild(botaoIniciar);

    botaoIniciar.addEventListener('click', () => {
        botaoIniciarJogoJaClicado = true;
        criarMapaJogo();
    });
}

function selecionaJogo() {
    desselecionaAbas();
    if (statusJogo == 'aberto') {
        jogoEstavaSelecionado = true;
    } else {
        jogoEstavaSelecionado = false;
    }
    statusJogo = 'selecionado';

    const jogoAberto = game.querySelector('#tb-jogo-aberto');
    if (jogoAberto) {
        jogoAberto.remove();
    }

    const jogoSelecionado = document.createElement('div');
    jogoSelecionado.id = 'tb-jogo-selecionado';
    jogoSelecionado.className = 'selecionado';
    game.appendChild(jogoSelecionado);
    criarTelaJogo()
}

function selecionaTarefa(indiceTarefa) {
    tarefaAberta = indiceTarefa;
    desselecionaAbas();
    destruirTelaReuniao();
    destruirTelaPasta();
    destruirTelaDocumento();
    destruirTelaLista();
    destruirTelaTarefa();
    destruirTelaJogo();

    document.querySelector('#tb-tarefa').style.display = 'block';

    const tarefaAberto = game.querySelector('#tb-tarefa-aberto');
    if (tarefaAberto) {
        tarefaAberto.remove();
    }

    const tarefaSelecionado = document.createElement('div');
    tarefaSelecionado.id = 'tb-tarefa-selecionado';
    tarefaSelecionado.className = 'selecionado';
    game.appendChild(tarefaSelecionado);

    const i = indiceTarefa - 1;
    const tarefa = tarefas[i];
    const funcoesTarefaPorTipo = {
        1: criarTelaTarefaTipo1,
        2: criarTelaTarefaTipo2,
        3: criarTelaTarefaTipo3,
        4: criarTelaTarefaTipo4,
        5: criarTelaTarefaTipo5,
        6: criarTelaTarefaTipo6,
        7: criarTelaTarefaTipo7
    };

    funcoesTarefaPorTipo[tarefa['tipo']](indiceTarefa);
}

function clicaAba(aba) {
    const game = document.querySelector('#game');
    switch (aba) {
        case 'reuniao':
            if (statusReuniao === 'fechado' || statusReuniao === 'aberto') {
                selecionaReuniao();
            } else {
                statusReuniao = 'aberto';
                destruirTelaReuniao();
                const reuniaoSelecionado = game.querySelector('#tb-reuniao-selecionado');
                if (reuniaoSelecionado) {
                    reuniaoSelecionado.remove();
                }
                const reuniaoAberto = document.createElement('div');
                reuniaoAberto.id = 'tb-reuniao-aberto';
                reuniaoAberto.className = 'aberto';
                game.appendChild(reuniaoAberto);
            }
            break;

        case 'pasta':
            if (statusPasta === 'fechado' || statusPasta === 'aberto') {
                selecionaPasta();
            } else {
                statusPasta = 'aberto';
                destruirTelaPasta();
                const pastaSelecionado = game.querySelector('#tb-pasta-selecionado');
                if (pastaSelecionado) {
                    pastaSelecionado.remove();
                }
                const pastaAberto = document.createElement('div');
                pastaAberto.id = 'tb-pasta-aberto';
                pastaAberto.className = 'aberto';
                game.appendChild(pastaAberto);
            }
            break;
        case 'lista':
            if (statusLista === 'fechado' || statusLista === 'aberto') {
                selecionaLista();
            } else {
                statusLista = 'aberto';
                destruirTelaLista();
                const listaSelecionado = game.querySelector('#tb-lista-selecionado');
                if (listaSelecionado) {
                    listaSelecionado.remove();
                }
                const listaAberto = document.createElement('div');
                listaAberto.id = 'tb-lista-aberto';
                listaAberto.className = 'aberto';
                game.appendChild(listaAberto);
            }
            break;

        case 'jogo':
            if (statusJogo === 'fechado' || statusJogo === 'aberto') {
                selecionaJogo();
            } else {
                statusJogo = 'aberto';
                destruirTelaJogo();
                const jogoSelecionado = game.querySelector('#tb-jogo-selecionado');
                if (jogoSelecionado) {
                    jogoSelecionado.remove();
                }
                const jogoAberto = document.createElement('div');
                jogoAberto.id = 'tb-jogo-aberto';
                jogoAberto.className = 'aberto';
                game.appendChild(jogoAberto);
            }
            break;

        case 'tarefa':
            if (statusTarefa === 'fechado' || statusTarefa === 'aberto') {
                selecionaTarefa(tarefaAberta);
            } else {
                statusTarefa = 'aberto';
                destruirTelaTarefa();
                const tarefaSelecionado = game.querySelector('#tb-tarefa-selecionado');
                if (tarefaSelecionado) {
                    tarefaSelecionado.remove();
                }
                const tarefaAberto = document.createElement('div');
                tarefaAberto.id = 'tb-tarefa-aberto';
                tarefaAberto.className = 'aberto';
                game.appendChild(tarefaAberto);
            }
            break;

        default:
            break;
    }
}

document.querySelector('#tb-reuniao').addEventListener('click', () => clicaAba('reuniao'));
document.querySelector('#tb-pasta').addEventListener('click', () => clicaAba('pasta'));
document.querySelector('#tb-lista').addEventListener('click', () => clicaAba('lista'));
document.querySelector('#tb-jogo').addEventListener('click', () => clicaAba('jogo'));
document.querySelector('#tb-tarefa').addEventListener('click', () => clicaAba('tarefa'));

async function atualizarTempo() {
    if (tempoRestante > 0) {
        tempoRestante--;
        atualizarHUD();
    }

    if (tempoRestante <= 0) {
        if (pontuacao >= pontuacaoMinima) {
            let conquistasGO = [];
            if (advertencias.length === 0) {
                Usuario.aumentarRunsConsecutivasSemAdvertencia(usuarioId, 1);
                const usuario = await Usuario.getUsuario(usuarioId);
                if (usuario.runsConsecutivasSemAdvertencia >= 5) {
                    conquistasGO.push(17);
                }
            }

            if (energiaDesb8) {
                conquistasGO.push(8);
            }

            if (felicidadeDesb9) {
                conquistasGO.push(9);
            }

            if (verifDesb15) {
                conquistasGO.push(15);
            }

            const dificuldadeSelecionada = localStorage.getItem('dificuldadeSelecionada');
            switch (dificuldadeSelecionada) {
                case '1':
                    conquistasGO.push(19);
                    break;
                case '2':
                    conquistasGO.push(20);
                    break;
                case '3':
                    conquistasGO.push(21);
                    break;
                default:
                    conquistasGO.push(22);
            }

            if (nenhumaTarefaFalha && advertencias.length === 0) {
                switch (dificuldadeSelecionada) {
                    case '1':
                        conquistasGO.push(23);
                        break;
                    case '2':
                        conquistasGO.push(24);
                        break;
                    case '3':
                        conquistasGO.push(26);
                        break;
                    default:
                        conquistasGO.push(27);
                }
            }

            gameOver(0, conquistasGO);
        } else {
            let conquistasGO = [];
            if (tempoRestante > 530) {
                conquistasGO.push(18);
            }
            gameOver(6);
        }
    }
}

let countdownDesb32 = 0;

function atualizarDecaimento() {
    energia = Math.max(0, energia - 1);
    felicidade = Math.max(0, felicidade - 1);
    atualizarHUD();

    if (Math.abs(energia - felicidade) < 10) {
        countdownDesb32++;
        if (countdownDesb32 >= 300) {
            desbloquearConquista(32);
        }
    } else {
        countdownDesb32 = 0;
    }

    if (energia <= 75) {
        energiaDesb8 = false;
    }

    if (energia <= 0 || felicidade <= 0) {
        let conquistasGO = [];
        if (tempoRestante > 530) {
            conquistasGO.push(18);
        }
        if (energia <= 0 && felicidade <= 0) {
            conquistasGO.push(29, 30);
            gameOver(5, conquistasGO);
        } else if (energia <= 0) {
            conquistasGO.push(30);
            gameOver(3, conquistasGO);
        } else {
            conquistasGO.push(29);
            gameOver(4, conquistasGO);
        }
    }
}

function atualizarHUD() {
    const minutos = Math.floor(tempoRestante / 60).toString().padStart(2, '0');
    const segundos = Math.floor(tempoRestante % 60).toString().padStart(2, '0');
    document.querySelector('#tempo').textContent = `${minutos}:${segundos}`;

    document.querySelector('#energia').textContent = `${Math.round(energia)}%`;
    document.querySelector('#felicidade').textContent = `${Math.round(felicidade)}%`
    document.querySelector('#icone-felicidade').style.backgroundImage = `url("../../assets/hud/felicidade/${Math.max(1, Math.ceil(felicidade / 25))}.png")`;
}

const intervaloTempo = setInterval(atualizarTempo, 1000);
const intervaloDecaimento = setInterval(atualizarDecaimento, decaimentoEnergiaEFelicidadeEmS * 1000);

const intervaloInimigo = setInterval(gerarInimigo, 1000);

let eventoAtivo = null;
let intervaloAleatorio;

function iniciarEventosAleatorios() {
    const intervalo = Math.random() * (frequenciaEventosMaximo - frequenciaEventosMinimo) + frequenciaEventosMinimo;
    intervaloAleatorio = setTimeout(() => {
        eventoAtendido = false;
        const tipoEvento = Math.random() < 0.5 ? 'microfone' : 'compartilharTela';
        if (tipoEvento === 'microfone') {
            iniciarEventoMicrofone();
        } else {
            iniciarEventoCompartilharTela();
        }
    }, intervalo * 1000);
}

function iniciarEventoMicrofone() {
    eventoAtivo = 'microfone';
    notificar(1);
    let countdown = toleranciaMicrofone;
    verifDesb14 = true;
    const notificacao = Array.from(document.querySelectorAll('.notificacao')).find(n =>
        n.querySelector('.texto-notificacao')?.textContent.startsWith('Ligue o microfone')
    );
    const textoNotificacao = notificacao?.querySelector('.texto-notificacao');
    const countdownNotificacao = notificacao?.querySelector('.countdown-notificacao');

    clearInterval(intervaloEvento);
    intervaloEvento = setInterval(() => {
        if (countdown < toleranciaMicrofone) {
            verifDesb14 = false;
        }
        countdown--;
        if (textoNotificacao) {
            countdownNotificacao.textContent = `${countdown}s`;
        }
        if (countdown <= 0) {
            clearInterval(intervaloEvento);
            notificar(4); // Advertência por não ligar o microfone
            eventoAtivo = null;
            iniciarEventosAleatorios();
        }
    }, 1000);
}

function iniciarEventoCompartilharTela() {
    eventoAtivo = 'compartilharTela';
    notificar(2);
    let countdown = toleranciaCompartilhamento;

    const notificacaoCompartilharTela = Array.from(document.querySelectorAll('.notificacao')).find(n =>
        n.querySelector('.texto-notificacao')?.textContent.startsWith('Compartilhe ')
    );
    const textoNotificacaoCompartilharTela = notificacaoCompartilharTela?.querySelector('.texto-notificacao');
    const countdownNotificacaoCompartilharTela = notificacaoCompartilharTela?.querySelector('.countdown-notificacao');

    clearInterval(intervaloEvento);
    intervaloEvento = setInterval(() => {
        countdown--;
        if (textoNotificacaoCompartilharTela) {
            countdownNotificacaoCompartilharTela.textContent = `${countdown}s`;
        }

        if (countdown <= toleranciaCompartilhamento - 3) {
            verifDesb15 = false;
        }

        if (countdown <= 0) {
            abasCT.forEach(selector => {
                try {
                    document.querySelector(selector)?.removeEventListener('click', handleClick);
                } finally { }
            });
            clearInterval(intervaloEvento);
            notificar(8); // Advertência por não compartilhar a tela
            eventoAtivo = null;
            iniciarEventosAleatorios();
        }
    }, 1000);
}

function iniciarEventoCamera() {
    notificar(3);
    let countdown = toleranciaCamera;
    const notificacaoCamera = Array.from(document.querySelectorAll('.notificacao')).find(n =>
        n.querySelector('.texto-notificacao')?.textContent.startsWith('Religue a câmera')
    );
    const textoNotificacaoCamera = notificacaoCamera?.querySelector('.texto-notificacao');
    const countdownNotificacaoCamera = notificacaoCamera?.querySelector('.countdown-notificacao');

    clearInterval(intervaloCamera);
    intervaloCamera = setInterval(() => {
        countdown--;
        if (textoNotificacaoCamera) {
            countdownNotificacaoCamera.textContent = `${countdown}s`;
        }
        if (countdown <= 1) {
            ligarCameraDesb7 = true;
        }
        if (countdown <= 0) {
            ligarCameraDesb7 = false;
            notificacaoCamera.remove();
            clearInterval(intervaloCamera);
            if (!cameraAberto) {
                notificar(6); // Advertência por não religar a câmera
                iniciarEventoCamera();
            }
        }
    }, 1000);
}

iniciarEventosAleatorios();
selecionaReuniao();

['#balao-mesa', '#balao-escritorio', '#balao-cafeteira', '#balao-espetado-mesa', '#balao-espetado-escritorio', '#balao-espetado-cafeteira'].forEach((id) => document.querySelector(id).style.display = 'none');
