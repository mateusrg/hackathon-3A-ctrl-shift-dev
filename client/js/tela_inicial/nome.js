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

verificarLogin();

document.querySelector('#voltar').addEventListener('click', () => window.location.href = '../../html/tela_inicial/dificuldade.html');

function conferirNome() {
    const nomeStorage = JSON.parse(localStorage.getItem('usuario')).nome;
    
    if (nomeStorage != null) {
        document.querySelector('#nome').value = nomeStorage;
    }
}

conferirNome();

document.querySelector('form').addEventListener('submit', async (e) => {
    if (!e.target.checkValidity()) {
        return;
    }
    e.preventDefault();
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    const nome = document.querySelector('#nome').value;
    usuario['nome'] = nome;
    localStorage.setItem('usuario', JSON.stringify(usuario));
    await Usuario.alterarNomeUsuario(usuario['id'], nome);
    window.location.href = '../../html/tela_inicial/premissa.html';
});