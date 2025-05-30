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

function mostrarAlert(erro) {
    const game = document.querySelector('#game');

    const alert = document.createElement('div');
    alert.classList.add('alert-erro');
    game.appendChild(alert);

    const mensagem = document.createElement('p');
    mensagem.innerText = `${erro}`;
    mensagem.classList.add('mensagem-erro');
    game.appendChild(mensagem);

    const ok = document.createElement('button');
    ok.classList.add('ok-erro');
    game.appendChild(ok);
    ok.addEventListener('click', () => {
        document.querySelector('.alert-erro')?.remove();
        document.querySelector('.ok-erro')?.remove();
        document.querySelector('.mensagem-erro')?.remove();
    });
}

document.querySelector('form').addEventListener('submit', async function (e) {
    if (!e.target.checkValidity()) {
        return;
    }
    e.preventDefault();

    const usuarioStorage = JSON.parse(localStorage.getItem('usuario'));

    const senhaAtual = document.querySelector('#senhaAtual').value;
    const senhaNova = document.querySelector('#senhaNova').value;
    const res = await Usuario.atualizarUsuario({
        id: usuarioStorage.id,
        email: usuarioStorage.email,
        nome: usuarioStorage.nome,
        senhaAtual,
        senhaNova
      });
    if (res.success) {
        window.location.href = '../../html/tela_inicial/pagina_inicial.html';
    } else {
        mostrarAlert(res.message);
    }
});

function voltar() {
    window.location.href = '../tela_inicial/pagina_inicial.html';
}

document.querySelector('#voltar').addEventListener('click', voltar);