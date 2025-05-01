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

function iniciar() {
    window.location.href = '../../html/tela_inicial/dificuldade.html';
}

function conquistas() {
    window.location.href = '../tela_inicial/conquistas.html';
}

function sair() {
    window.location.href = '../html/teste.html';
}


document.querySelector('#iniciar').addEventListener('click', iniciar);
document.querySelector('#conquistas').addEventListener('click', conquistas);
document.querySelector('#sair').addEventListener('click', sair);