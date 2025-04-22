import Usuario from '../funcoes/usuario.js';

document.querySelector('#voltar').addEventListener('click', () => window.location.href = '../../html/tela_inicial/dificuldade.html');

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
    window.location.href = '../../html/pc/pc.html';
});