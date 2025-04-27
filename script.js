function gerarDesafioTipo1() {
    const lista = [1, 2, 3, 4, 5];
    for (let i = lista.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lista[i], lista[j]] = [lista[j], lista[i]];
    }
    return lista;
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
let questoes = [];

function gerarDesafioTipo6() {
  const fs = require('fs');

  // Carrega e embaralha apenas na primeira chamada
  if (!Array.isArray(questoes) || questoes.length === 0) {
    const lista = JSON.parse(fs.readFileSync('questoes.json', 'utf-8')).questoes;

    // Marca a primeira alternativa como correta e embaralha cada conjunto de alternativas
    for (const pergunta of lista) {
      pergunta.alternativas = pergunta.alternativas
        .map((texto, indice) => ({ texto, correta: indice === 0 }))
        .sort(() => Math.random() - 0.5);
    }

    // Embaralha a ordem das perguntas
    for (let i = lista.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [lista[i], lista[j]] = [lista[j], lista[i]];
    }

    questoes = lista;
  }

  // Retira os próximos 3 desafios
  const desafio = questoes.splice(0, 3);

  // Embaralha as perguntas do subset
  desafio.sort(() => Math.random() - 0.5);

  // Embaralha novamente as alternativas de cada pergunta
  for (const pergunta of desafio) {
    pergunta.alternativas.sort(() => Math.random() - 0.5);
  }

  // Reinsere no pool para uso futuro (mantendo o ciclo)
  questoes.push(...desafio);

  return desafio;
}


function main() {
    const desafio = gerarDesafioTipo6();
    desafio.forEach((q) => {
        console.log('Pergunta: ' + q['pergunta']);
        console.log('Alternativa 1: ' + q['alternativas'][0]['texto']);
        console.log('Alternativa 2: ' + q['alternativas'][1]['texto']);
        console.log('Alternativa 3: ' + q['alternativas'][2]['texto']);
        console.log('Alternativa 4: ' + q['alternativas'][3]['texto']);
        const indiceCorreto = q['alternativas'].findIndex(a => a.correta);
        console.log('Resposta correta: ' + q['alternativas'][indiceCorreto]['texto']);
        console.log('\n');
    });
}
main();

// console.log(gerarDesafioTipo1());
// console.log(gerarDesafioTipo4());