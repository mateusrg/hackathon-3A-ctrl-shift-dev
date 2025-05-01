import Usuario from '../funcoes/usuario.js';

async function verificarLogin() {
    const usuarioStorage = JSON.parse(localStorage.getItem('usuario')); 

    if (usuarioStorage == null || usuarioStorage.length == 0) {
        window.location.href = '../../html/login/pagina_inicial_deslogado.html';
    }

    const usuario = await Usuario.selecionarUsuarioPorId(usuarioStorage.id);

    if (usuario.email != usuarioStorage.email) {
        window.location.href = '../../html/login/pagina_inicial_deslogado.html';
    }
}

const contaVerificada = setInterval(verificarLogin, 1000);

function voltar() {
    window.location.href = '../../html/tela_inicial/pagina_inicial.html';
}

document.querySelector('#voltar').addEventListener('click', voltar);

function adicionarImagemSobreBotao(botaoId, imagemSrc) {
    const botao = document.querySelector(botaoId);
    if (botao) {
        const imagem = document.createElement('img');
        imagem.src = imagemSrc;
        imagem.style.position = 'absolute';
        imagem.style.top = `calc(-15 * var(--un))`;
        imagem.style.left = '0';
        imagem.style.width = '100%';
        imagem.style.pointerEvents = 'none';
        botao.style.position = 'relative';
        botao.style.cursor = 'not-allowed';
        botao.appendChild(imagem);
    }
}


async function main() {
    const id = JSON.parse(localStorage.getItem('usuario'))['id'];
    const usuario = await Usuario.selecionarUsuarioPorId(id);
    const dificuldadeMaximaDesbloqueada = usuario['dificuldade_maxima_desbloqueada'];
    
    document.querySelector('#botao-junior').addEventListener('click', () => {
        localStorage.setItem('dificuldadeSelecionada', '1');
        window.location.href = '../../html/tela_inicial/nome.html';
    });

    document.querySelector('#botao-pleno').addEventListener('click', () => {
        localStorage.setItem('dificuldadeSelecionada', '2');
        window.location.href = '../../html/tela_inicial/nome.html';
    });

    if (dificuldadeMaximaDesbloqueada < 3) {
        adicionarImagemSobreBotao('#botao-senior', '../../assets/dificuldade/dificuldade_bloqueada.png');
    } else {
        document.querySelector('#botao-senior').addEventListener('click', () => {
            localStorage.setItem('dificuldadeSelecionada', '3');
            window.location.href = '../../html/tela_inicial/nome.html';
        });
    }
    
    if (dificuldadeMaximaDesbloqueada < 4) {
        adicionarImagemSobreBotao('#botao-tech-lead', '../../assets/dificuldade/dificuldade_bloqueada.png');
    } else {
        document.querySelector('#botao-tech-lead').addEventListener('click', () => {
            localStorage.setItem('dificuldadeSelecionada', '4');
            window.location.href = '../../html/tela_inicial/nome.html';
        });
    }

}

main();