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

document.querySelector('#ok').addEventListener('click', () => window.location.href = '../../html/tela_inicial/tutorial.html');