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
    const email = document.querySelector('#email').value;
    const senha = document.querySelector('#senha').value;
    const usuarios = await Usuario.listarUsuarios();
    const usuario = usuarios.find(usuario => usuario['email'] === email);
    if (usuario) {
        let erro = "Email já está em uso!"
        mostrarAlert(erro);
        return;
    }
    await Usuario.criarUsuario(email, senha);
    await Usuario.login(email, senha);
    window.location.href = '../../html/tela_inicial/pagina_inicial.html';
});