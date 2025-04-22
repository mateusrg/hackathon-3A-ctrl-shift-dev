CREATE DATABASE ctrl_shift_dev;
USE ctrl_shift_dev;

CREATE TABLE usuarios (
	id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    nome VARCHAR(30) DEFAULT NULL,
    senha VARCHAR(60) NOT NULL,
    conquistas_desbloqueadas VARCHAR(36) NOT NULL DEFAULT '000000000000000000000000000000000000',
    quant_tela_compartilhada INT NOT NULL DEFAULT 0,
    tarefas_concluidas INT NOT NULL DEFAULT 0,
    inimigos_derrotados INT NOT NULL DEFAULT 0,
    testes_feitos INT NOT NULL DEFAULT 0,
    quizzes_gabaritados INT NOT NULL DEFAULT 0,
    runs_consecutivas_sem_advertencia INT NOT NULL DEFAULT 0,
    runs_jogadas INT NOT NULL DEFAULT 0,
    dificuldade_maxima_desbloqueada ENUM("Pleno", "Sênior", "Tech Lead") NOT NULL DEFAULT "Pleno"
);
