const fs = require('fs').promises;
const path = require('path');

const arquivo = path.join(__dirname, 'perguntas.json');
let perguntas = [];
let i = 0;

function shuffle(arr) {
  const a = [...arr];
  for (let j = a.length - 1; j > 0; j--) {
    const k = Math.floor(Math.random() * (j + 1));
    [a[j], a[k]] = [a[k], a[j]];
  }
  return a;
}

async function init() {
  const raw = await fs.readFile(arquivo, 'utf8');
  const dados = JSON.parse(raw).perguntas;
  perguntas = shuffle(dados);
}

function getNextQuestion() {
  const q = perguntas[i % perguntas.length];
  
  const alternativas = q.alternativas.map((grupo, idx) => {
    const embaralhado = shuffle(grupo);
    const indiceCorreta = embaralhado.indexOf(q.correta[idx]);
    return { opcoes: embaralhado, indiceCorreta };
  });

  i += 1;

  return {
    titulo: q.titulo,
    alternativas
  };
}

(async () => {
  try {
    await init();

    const resultados = Array.from({ length: 1 }, () => getNextQuestion());

    console.log(JSON.stringify(resultados, null, 2));
  } catch (err) {
    console.error('Erro no quiz:', err);
  }
})();