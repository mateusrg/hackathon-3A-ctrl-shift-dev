import Usuario from '../funcoes/usuario.js';

document.querySelector('form').addEventListener('submit', async function (e) {
    if (!e.target.checkValidity()) {
        return;
    }
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const senha = document.querySelector('#senha').value;
    const res = await Usuario.login(email, senha);
    if (res.success) {
        window.location.href = '../../html/tela_inicial/pagina_inicial.html';
    }
});