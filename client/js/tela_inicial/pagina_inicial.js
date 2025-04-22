function iniciar() {
    window.location.href = '../../html/tela_inicial/dificuldade.html';
}

function conquistas() {
    window.location.href = '../html/teste.html';
}

function sair() {
    window.location.href = '../html/teste.html';
}


document.querySelector('#iniciar').addEventListener('click', iniciar);
document.querySelector('#conquistas').addEventListener('click', conquistas);
document.querySelector('#sair').addEventListener('click', sair);