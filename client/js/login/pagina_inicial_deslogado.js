function entrar() {
    window.location.href = '../../html/login/login.html';
}

function cadastrar() {
    window.location.href = '../../html/login/cadastro.html';
}

document.querySelector('#entrar').addEventListener('click', entrar);
document.querySelector('#cadastrar').addEventListener('click', cadastrar);