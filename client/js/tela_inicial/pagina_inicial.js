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

const contaVerificada = setInterval(verificarLogin, 1000);

function iniciar() {
    window.location.href = '../../html/tela_inicial/dificuldade.html';
}

function conquistas() {
    window.location.href = '../tela_inicial/conquistas.html';
}

function sair() {
    Usuario.logout();
    window.location.href = '../login/pagina_inicial_deslogado.html';
}

function editar() {
    window.location.href = '../tela_inicial/editar_senha.html';
}


document.querySelector('#iniciar').addEventListener('click', iniciar);
document.querySelector('#conquistas').addEventListener('click', conquistas);
document.querySelector('#sair').addEventListener('click', sair);
document.querySelector('#botao-editar').addEventListener('click', editar);