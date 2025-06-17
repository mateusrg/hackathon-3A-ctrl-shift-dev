document.querySelector('#iniciar').addEventListener('click', () => window.location.href = '../../html/tela_inicial/dificuldade.html');
document.querySelector('#conquistas').addEventListener('click', () => window.location.href = '../tela_inicial/conquistas.html');
document.querySelector('#tutorial').addEventListener('click', () => {
    localStorage.setItem('iniciarJogo', 'false');
    window.location.href = '../../html/tela_inicial/tutorial.html';
});