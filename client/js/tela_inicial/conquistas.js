import Usuario from '../funcoes/usuario.js';

async function verificarLogin() {
    const usuarioStorage = JSON.parse(localStorage.getItem('usuario')); 

    if (usuarioStorage == null || usuarioStorage.length == 0) {
        window.location.href = '../../html/login/pagina_inicial_deslogado.html';
    }

    const usuario = await Usuario.selecionarUsuarioPorId(usuarioStorage.id);

    if (usuario.email != usuarioStorage.email) {
        window.location.href = '../../html/login/pagina_inicial_deslogado.html';
    }
}

const contaVerificada = setInterval(verificarLogin, 1000);

function voltar() {
    window.location.href = '../../html/tela_inicial/pagina_inicial.html';
}

document.querySelector('#voltar').addEventListener('click', voltar);

const conquistasDescricao = [
    {
        nome: "Mestre do Compartilhamento",
        descricao: "Compartilhe a tela 30 vezes.",
        imagem: "../../assets/conquistas/icones/conquistas01.png"
    },
    {
        nome: "Relâmpago do Código",
        descricao: "Conclua 10 tarefas em menos de 2 minutos de tempo de jogo.",
        imagem: "../../assets/conquistas/icones/conquistas02.png"
    },
    {
        nome: "Task Slayer",
        descricao: "Finalize 50 tarefas no total.",
        imagem: "../../assets/conquistas/icones/conquistas03.png"
    },
    {
        nome: "Sem Condições",
        descricao: "Desista de uma tarefa.",
        imagem: "../../assets/conquistas/icones/conquistas04.png"
    },
    {
        nome: "Café com Leite",
        descricao: "Beba café 30 vezes em uma única run.",
        imagem: "../../assets/conquistas/icones/conquistas05.png"
    },
    {
        nome: "Barista Desastrado",
        descricao: "Deixe a xícara vazar 3 vezes numa única run.",
        imagem: "../../assets/conquistas/icones/conquistas06.png"
    },
    {
        nome: "Equilíbrio Tóxico",
        descricao: "Religue a câmera com menos de 1 segundo restante do limite de tempo.",
        imagem: "../../assets/conquistas/icones/conquistas07.png"
    },
    {
        nome: "Maratona de Energético",
        descricao: "Complete uma run mantendo energia sempre acima de 75%.",
        imagem: "../../assets/conquistas/icones/conquistas08.png"
    },
    {
        nome: "Zen Developer",
        descricao: "Termine uma run mantendo felicidade sempre acima de 80%.",
        imagem: "../../assets/conquistas/icones/conquistas09.png"
    },
    {
        nome: "Jogador Incansável",
        descricao: "Mate 100 inimigos no jogo.",
        imagem: "../../assets/conquistas/icones/conquistas10.png"
    },
    {
        nome: "Dev Relâmpago",
        descricao: "Termine uma tarefa em menos de 3 segundos.",
        imagem: "../../assets/conquistas/icones/conquistas11.png"
    },
    {
        nome: "Testador Implacável",
        descricao: "Execute mais de 30 testes em tarefas de preencher valor.",
        imagem: "../../assets/conquistas/icones/conquistas12.png"
    },
    {
        nome: "Quizmaníaco",
        descricao: "Acerte 10 quizzes técnicos sem falhas.",
        imagem: "../../assets/conquistas/icones/conquistas13.png"
    },
    {
        nome: "Microfone Ninja",
        descricao: "Ative o microfone em menos de 1 segundo em 5 solicitações.",
        imagem: "../../assets/conquistas/icones/conquistas14.png"
    },
    {
        nome: "Campeão do Compartilhamento",
        descricao: "Inicie o compartilhamento de tela em menos de 3 s em todas as solicitações de uma run.",
        imagem: "../../assets/conquistas/icones/conquistas15.png"
    },
    {
        nome: "Bebum Profissional",
        descricao: "Ganhe o máximo de energia possível com uma única xícara de café (210 no Júnior, 150 no Pleno, 120 no Sênior e 90 no Tech Lead).",
        imagem: "../../assets/conquistas/icones/conquistas16.png"
    },
    {
        nome: "Advertência Zero",
        descricao: "Acumule 0 advertências em 10 runs consecutivas.",
        imagem: "../../assets/conquistas/icones/conquistas17.png"
    },
    {
        nome: "Incompetente",
        descricao: "Perca em menos de 30 segundos de jogo.",
        imagem: "../../assets/conquistas/icones/conquistas18.png"
    },
    {
        nome: "Promovido a Pleno",
        descricao: "Seja promovido a Pleno.",
        imagem: "../../assets/conquistas/icones/conquistas19.png"
    },
    {
        nome: "Promovido a Sênior",
        descricao: "Seja promovido a Sênior.",
        imagem: "../../assets/conquistas/icones/conquistas20.png"
    },
    {
        nome: "Promovido a Tech Lead",
        descricao: "Seja promovido a Tech Lead.",
        imagem: "../../assets/conquistas/icones/conquistas21.png"
    },
    {
        nome: "Sobrevivente Tech Lead",
        descricao: "Complete uma run na dificuldade Tech Tead.",
        imagem: "../../assets/conquistas/icones/conquistas22.png"
    },
    {
        nome: "Júnior Competente",
        descricao: "Complete uma run na dificuldade Júnior sem nenhuma advertência e sem falhar em nenhuma tarefa.",
        imagem: "../../assets/conquistas/icones/conquistas23.png"
    },
    {
        nome: "Pleno Superior",
        descricao: "Complete uma run na dificuldade Pleno sem nenhuma advertência e sem falhar em nenhuma tarefa.",
        imagem: "../../assets/conquistas/icones/conquistas24.png"
    },
    {
        nome: "Easter Eggs",
        descricao: "Clique aqui.",
        imagem: "../../assets/conquistas/icones/conquistas25.png"
    },
    {
        nome: "Sênior Absoluto",
        descricao: "Complete uma run na dificuldade Sênior sem nenhuma advertência e sem falhar em nenhuma tarefa.",
        imagem: "../../assets/conquistas/icones/conquistas26.png"
    },
    {
        nome: "Tech Lead Perfeito",
        descricao: "Complete uma run na dificuldade Tech Lead sem nenhuma advertência e sem falhar em nenhuma tarefa.",
        imagem: "../../assets/conquistas/icones/conquistas27.png"
    },
    {
        nome: "Amante do Caos",
        descricao: "Perca por advertência.",
        imagem: "../../assets/conquistas/icones/conquistas28.png"
    },
    {
        nome: "Chega",
        descricao: "Perca por Burnout.",
        imagem: "../../assets/conquistas/icones/conquistas29.png"
    },
    {
        nome: "Mais café",
        descricao: "Perca por desmaio.",
        imagem: "../../assets/conquistas/icones/conquistas30.png"
    },
    {
        nome: "Maratona de Runs",
        descricao: "Jogue 50 runs completas.",
        imagem: "../../assets/conquistas/icones/conquistas31.png"
    },
    {
        nome: "Diversão Equilibrada",
        descricao: "Manter energia e felicidade sincronizados (diferença < 10%) por 5 minutos seguidos.",
        imagem: "../../assets/conquistas/icones/conquistas32.png"
    },
    {
        nome: "Um Último Suspiro",
        descricao: "Tomar café com menos de 5% de energia.",
        imagem: "../../assets/conquistas/icones/conquistas33.png"
    },
    {
        nome: "Pós-Depressão",
        descricao: "Mate um inimigo com menos de 5% de felicidade.",
        imagem: "../../assets/conquistas/icones/conquistas34.png"
    },
    {
        nome: "O Verdadeiro Deus Gamer",
        descricao: "Faça 60 pontos na dificuldade Tech Lead.",
        imagem: "../../assets/conquistas/icones/conquistas35.png"
    },
    {
        nome: "Ctrl+Shift+Dev",
        descricao: "Consiga todas as conquistas.",
        imagem: "../../assets/conquistas/icones/conquistas36.png"
    }
]

let secaoConquista = 0;

const usuarioStorage = JSON.parse(localStorage.getItem('usuario'));
const usuario = await Usuario.selecionarUsuarioPorId(usuarioStorage.id);
let easterEggLiberado;
if (usuario.conquistas_desbloqueadas == '000000000000000000000000000000000000') {
    easterEggLiberado = false;
} else {
    easterEggLiberado = true;
}

async function conquista24() {
    easterEggLiberado = true;

    const usuarioStorage = JSON.parse(localStorage.getItem('usuario'));
    const usuario = await Usuario.selecionarUsuarioPorId(usuarioStorage.id);
    
    const usuarioAtualizado = await Usuario.desbloquearConquista(usuario.id, 25);

    const secaoConquistaNotificacao = document.querySelector('#div-notificacao-conquista');

    const conquistaNotificacao = document.createElement('div');
    conquistaNotificacao.classList.add('conquista-notificacao');
    // conquistaNotificacao.style.backgroundImage = `url('../../assets/conquistas/amarelo-grande.png')`;
    secaoConquistaNotificacao.appendChild(conquistaNotificacao);

    const imagemConquista = document.createElement('div');
    imagemConquista.classList.add('imagem-conquista-notificacao');
    console.log(conquistasDescricao[24].imagem);
    imagemConquista.style.backgroundImage = `url('../../assets/conquistas/icones/conquistas25.png')`;
    conquistaNotificacao.appendChild(imagemConquista);

    const nomeConquista = document.createElement('h4');
    nomeConquista.classList.add('nome-conquista-notificacao');
    nomeConquista.innerText = "Easter Eggs";
    conquistaNotificacao.appendChild(nomeConquista);

    setTimeout(() => {
        conquistaNotificacao?.remove();
        imagemConquista?.remove();
        nomeConquista?.remove();
        abrirModalConquista(24, true);
        carregarConquistas(secaoConquista);
    }, 3000);
}

function abrirModalConquista(index, desbloqueada) {
    document.querySelector('.imagem-conquista')?.remove();
    document.querySelector('.nome-conquista')?.remove();
    document.querySelector('.descricao-conquista')?.remove();
    document.querySelector('#clique-aqui')?.remove();

    const tela = document.querySelector('#game');
    tela.style.backgroundImage = `url('../../assets/conquistas/tela-conquista-selecionado.png')`;

    for (let i = 0; i < 12; i++) {
        const caixaConquista = document.querySelector(`.conq-${i + 1}`);
        caixaConquista.style.backgroundImage = `url('../../assets/conquistas/azul.png')`;
    }

    const caixaConquista = document.querySelector(`.conq-${index + 1}`);
    caixaConquista.style.backgroundImage = `url('../../assets/conquistas/amarelo.png')`;

    const setaCima = document.querySelector('#seta-cima');
    const setaBaixo = document.querySelector('#seta-baixo');

    setaCima.style.top = 'calc(70 * var(--un))';
    setaBaixo.style.top = 'calc(535 * var(--un))';

    const secaoConquistaCima = document.querySelector('#conquistas-cima');
    const secaoConquistaBaixo = document.querySelector('#conquistas-baixo');

    secaoConquistaCima.style.top = 'calc(152 * var(--un))';
    secaoConquistaBaixo.style.top = 'calc(352 * var(--un))';

    const voltar = document.querySelector('#voltar');

    voltar.style.top = 'calc(563 * var(--un))';

    if (index == 24 && !easterEggLiberado) {
        const cliqueAqui = document.createElement('div');
        cliqueAqui.id = 'clique-aqui';
        tela.appendChild(cliqueAqui);
        cliqueAqui.addEventListener('click', conquista24)
    }

    const imagemConquista = document.createElement('div');
    imagemConquista.classList.add('imagem-conquista');
    imagemConquista.style.backgroundImage = `url('${conquistasDescricao[index].imagem}')`;
    tela.appendChild(imagemConquista);
    if (!desbloqueada) {
        imagemConquista.style.filter = 'brightness(0)';
    };

    const nomeConquista = document.createElement('h4');
    nomeConquista.classList.add('nome-conquista');
    nomeConquista.innerText = conquistasDescricao[index].nome;
    tela.appendChild(nomeConquista);

    const descricaoConquista = document.createElement('p');
    descricaoConquista.classList.add('descricao-conquista');
    descricaoConquista.innerText = conquistasDescricao[index].descricao;
    tela.appendChild(descricaoConquista);
}

async function carregarConquistas(nivel) {
    const usuarioStorage = JSON.parse(localStorage.getItem('usuario'));
    const usuario = await Usuario.selecionarUsuarioPorId(usuarioStorage.id);
    const conquistas = usuario.conquistas_desbloqueadas;
    const conquistaIndividual = conquistas.split('');

    document.querySelectorAll(".conquista-item").forEach(el => el.remove());

    for (let i = 0; i < 12; i++) {
        const container = document.querySelector(`.conq-${i + 1 + nivel}`);

        let index = i + nivel;

        const conquista = document.createElement('div');
        conquista.classList.add('conquista-item');
        conquista.style.backgroundImage = `url('${conquistasDescricao[index].imagem}')`;

        let desbloqueada = true;
        if (conquistaIndividual[index] === '0') {
            desbloqueada = false;
            conquista.style.filter = 'brightness(0)';
        };

        conquista.addEventListener('click', () => {
            abrirModalConquista(index, desbloqueada);
        });

        container.appendChild(conquista);
    }
}

carregarConquistas(secaoConquista);

function setaCima() {
    for (let i = 0; i < 12; i++) {
        const caixaConquista = document.querySelector(`.conq-${i + 1}`);
        caixaConquista.style.backgroundImage = `url('../../assets/conquistas/azul.png')`;
    }
    secaoConquista -= 12;
    carregarConquistas(secaoConquista);
    if (secaoConquista == 0) {
        setaCimaBtn.style.display = 'none';
    } else {
        setaCimaBtn.style.display = 'flex';
    }
    if (secaoConquista == 24) {
        setaBaixoBtn.style.display = 'none';
    } else {
        setaBaixoBtn.style.display = 'flex';
    }
}

function setaBaixo() {
    for (let i = 0; i < 12; i++) {
        const caixaConquista = document.querySelector(`.conq-${i + 1}`);
        caixaConquista.style.backgroundImage = `url('../../assets/conquistas/azul.png')`;
    }
    secaoConquista += 12;
    carregarConquistas(secaoConquista);
    if (secaoConquista == 0) {
        setaCimaBtn.style.display = 'none';
    } else {
        setaCimaBtn.style.display = 'flex';
    }
    if (secaoConquista == 24) {
        setaBaixoBtn.style.display = 'none';
    } else {
        setaBaixoBtn.style.display = 'flex';
    }
}

const setaCimaBtn = document.querySelector('#seta-cima');
setaCimaBtn.addEventListener('click', setaCima);
if (secaoConquista == 0) {
    setaCimaBtn.style.display = 'none';
}

const setaBaixoBtn = document.querySelector('#seta-baixo');
setaBaixoBtn.addEventListener('click', setaBaixo);
if (secaoConquista == 24) {
    setaBaixoBtn.style.display = 'none';
}