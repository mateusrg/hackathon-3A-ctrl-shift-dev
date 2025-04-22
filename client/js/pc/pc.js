const dificuldade = Number(localStorage.getItem('dificuldadeSelecionada'));

let limiteAdvertencias;
let decaimentoEnergiaEmS;
let decaimentoFelicidadeEmS;
let aumentoTempoCafeteiraVazamento;
let toleranciaMicrofone;
let toleranciaCompartilhamento;
let pontuacaoMinima;
let energiaCafeRestaura;
let felicidadeInimigoDerrotado;
let frequenciaEventosMinimo;
let frequenciaEventosMaximo;

switch (dificuldade) {
    case 1:
        limiteAdvertencias = 3;
        decaimentoEnergiaEmS = 1 / 0.5;
        decaimentoFelicidadeEmS = 1 / 0.5;
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
        decaimentoEnergiaEmS = 1 / 1;
        decaimentoFelicidadeEmS = 1 / 1;
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
        decaimentoEnergiaEmS = 1 / 1.5;
        decaimentoFelicidadeEmS = 1 / 1.5;
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
        decaimentoEnergiaEmS = 1 / 2;
        decaimentoFelicidadeEmS = 1 / 2;
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

function gameOver() {
    clearInterval(intervaloTempo);
    clearInterval(intervaloDecaimento);
    console.log('Fim do jogo!');
}

let tempoRestante = 600;
let energia = 100;
let felicidade = 100;

let statusReuniao = 'fechado'; // "fechado", "aberto", "selecionado"
let statusPasta = 'fechado'; // "fechado", "aberto", "selecionado"
let statusLista = 'fechado'; // "fechado", "aberto", "selecionado"
let statusJogo = 'fechado'; // "fechado", "aberto", "selecionado"
let statusTarefa = 'fechado'; // "fechado", "aberto", "selecionado"
let tarefaAberta = -1; // -1 (nenhuma), [índices das tarefas]

let microfoneAberto = false;
let cameraAberto = true;

document.querySelector('#seta-baixo-pc').addEventListener('click', () => {
    document.querySelector('#pc').style.display = 'none';
    document.querySelector('#game').style.backgroundImage = 'url("../../assets/pc/mesa.png")';
});

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
    } catch {}
}

function destruirTelaDocumento() {
    document.querySelector('#documento-aberto').remove();
    document.querySelector('#documento-aberto-fechar').remove();
    document.querySelector('#documento-aberto-minimizar').remove();
    document.querySelector('#documento-aberto-texto').remove();
}

function selecionaReuniao() {
    desselecionaAbas();
    destruirTelaPasta(); // Garante que a tela de pasta seja removida
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
    });

    microfone.addEventListener('click', () => {
        microfone.id = microfoneAberto ? 'microfone-fechado' : 'microfone-aberto';
        microfoneAberto = !microfoneAberto;
    });

    const xisReuniao = document.createElement('div');
    const minimizarReuniao = document.createElement('div');
    xisReuniao.id = 'xis-reuniao';
    minimizarReuniao.id = 'minimizar-reuniao';
    game.appendChild(xisReuniao);
    game.appendChild(minimizarReuniao);

    xisReuniao.addEventListener('click', () => {
        destruirTelaReuniao();
        microfoneAberto = false;
        cameraAberto = true;
        game.querySelector('#tb-reuniao-selecionado')?.remove();
        statusReuniao = 'fechado';
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
}

function selecionaPasta() {
    desselecionaAbas();
    destruirTelaReuniao(); // Garante que a tela de reunião seja removida
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
        game.querySelector('#tb-pasta-selecionado')?.remove();
        statusPasta = 'fechado';
    });

    const nomesDocs = ['slides_site.docx', 'dados_aplicativo.docx', 'index.pdf', 'banco_app.txt', 'server.txt'];

    [doc1, doc2, doc3, doc4, doc5].forEach((doc, index) => {
        doc.addEventListener('click', () => {
            let documentoAberto = document.querySelector('#documento-aberto');
            if (documentoAberto) {
                if (documentoAberto.querySelector('div').textContent === nomesDocs[index]) return;
            }
            documentoAberto = document.createElement('div');
            documentoAberto.id = 'documento-aberto';
            const documentoAbertoTexto = document.createElement('div');
            documentoAbertoTexto.id = 'documento-aberto-texto';
            documentoAbertoTexto.textContent = nomesDocs[index];
            const game = document.querySelector('#game');
            const documentoAbertoFechar = document.createElement('div');
            const documentoAbertoMinimizar = document.createElement('div');
            documentoAbertoFechar.id = 'documento-aberto-fechar';
            documentoAbertoMinimizar.id = 'documento-aberto-minimizar';
            game.appendChild(documentoAberto);
            game.appendChild(documentoAbertoTexto);
            game.appendChild(documentoAbertoFechar);
            game.appendChild(documentoAbertoMinimizar);

            documentoAbertoFechar.addEventListener('click', destruirTelaDocumento);
            documentoAbertoMinimizar.addEventListener('click', destruirTelaDocumento);
        });
    });

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
    statusLista = 'selecionado';

    const listaAberto = game.querySelector('#tb-lista-aberto');
    if (listaAberto) {
        listaAberto.remove();
    }

    const listaSelecionado = document.createElement('div');
    listaSelecionado.id = 'tb-lista-selecionado';
    listaSelecionado.className = 'selecionado';
    game.appendChild(listaSelecionado);
}

function selecionaJogo() {
    desselecionaAbas();
    statusJogo = 'selecionado';

    const jogoAberto = game.querySelector('#tb-jogo-aberto');
    if (jogoAberto) {
        jogoAberto.remove();
    }

    const jogoSelecionado = document.createElement('div');
    jogoSelecionado.id = 'tb-jogo-selecionado';
    jogoSelecionado.className = 'selecionado';
    game.appendChild(jogoSelecionado);
}

function selecionaTarefa(indiceTarefa) {
    desselecionaAbas();
    statusTarefa = 'selecionado';

    const tarefaAberto = game.querySelector('#tb-tarefa-aberto');
    if (tarefaAberto) {
        tarefaAberto.remove();
    }

    const tarefaSelecionado = document.createElement('div');
    tarefaSelecionado.id = 'tb-tarefa-selecionado';
    tarefaSelecionado.className = 'selecionado';
    game.appendChild(tarefaSelecionado);
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
                selecionaTarefa(1);
            } else {
                statusTarefa = 'aberto';
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

function atualizarTempo() {
    if (tempoRestante > 0) {
        tempoRestante--;
        atualizarHUD();
    }

    if (tempoRestante <= 0) {
        gameOver();
    }
}

function atualizarDecaimento() {
    energia = Math.max(0, energia - 1);
    felicidade = Math.max(0, felicidade - 1);
    atualizarHUD();

    if (energia <= 0 || felicidade <= 0) {
        gameOver();
    }
}


function atualizarHUD() {
    const minutos = Math.floor(tempoRestante / 60).toString().padStart(2, '0');
    const segundos = Math.floor(tempoRestante % 60).toString().padStart(2, '0');
    document.querySelector('#tempo').textContent = `${minutos}:${segundos}`;

    document.querySelector('#energia').textContent = `${Math.round(energia)}%`;
    document.querySelector('#felicidade').textContent = `${Math.round(felicidade)}%`;
    document.querySelector('#icone-felicidade').style.backgroundImage = `url("../../assets/hud/felicidade/${Math.max(1, Math.ceil(felicidade / 25))}.png")`;
}

const intervaloTempo = setInterval(atualizarTempo, 1000);
const intervaloDecaimento = setInterval(atualizarDecaimento, decaimentoEnergiaEmS * 1000);