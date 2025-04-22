import Usuario from '../funcoes/usuario.js';

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
        alert('E-mail já cadastrado!');
        return;
    }
    await Usuario.criarUsuario(email, senha);
    await Usuario.login(email, senha);
    window.location.href = '../../html/tela_inicial/pagina_inicial.html';
});