document.querySelector('#voltar').addEventListener('click', () => window.location.href = '../../html/tela_inicial/dificuldade.html');
const nomeStorage = localStorage.getItem('nome');
if (nomeStorage != null) document.querySelector('#nome').value = nomeStorage;

document.querySelector('form').addEventListener('submit', async (e) => {
    if (!e.target.checkValidity()) return;
    e.preventDefault();
    const nome = document.querySelector('#nome').value;
    localStorage.setItem('nome', nome);
    window.location.href = '../../html/tela_inicial/premissa.html';
});