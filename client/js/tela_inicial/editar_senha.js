import Usuario from '../funcoes/usuario.js';

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