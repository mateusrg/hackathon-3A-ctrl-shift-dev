document.querySelector('#sim').addEventListener('click', () => {
    localStorage.setItem('dificuldadeSelecionada', '0');
    window.location.href = '../../html/tela_inicial/nome.html';
});
document.querySelector('#nao').addEventListener('click', () => window.location.href = '../../html/tela_inicial/dificuldade.html');