CREATE DATABASE projetoA3;

USE projetoA3;

CREATE TABLE Usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
    login VARCHAR(50) NOT NULL,
    email VARCHAR(200) NOT NULL,
    dataNascimento DATE NOT NULL,
    nome VARCHAR(50) NOT NULL,
    sobrenome VARCHAR(200) NOT NULL,
    telefone VARCHAR(11),
    endereco VARCHAR(200),
    cidade VARCHAR(30),
    cep VARCHAR(8)
);
    
CREATE TABLE Psicologo (
	crp INT PRIMARY KEY,
    cpf VARCHAR(11) NOT NULL,
    usuario_id INT NOT NULL,
    titulacao VARCHAR(100) NOT NULL,
    especialidade VARCHAR(100),
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
);

CREATE TABLE Paciente (
	cpf VARCHAR(11) PRIMARY KEY,
    usuario_id INT NOT NULL,
    psicologo_crp INT,
    valorConsulta DOUBLE,
    responsavel VARCHAR(100),
	FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
    FOREIGN KEY (psicologo_crp) REFERENCES Psicologo(crp)
);

CREATE TABLE Agendamento (
	id INT PRIMARY KEY AUTO_INCREMENT,
    ag_data DATE NOT NULL,
    hora TIME NOT NULL,
    sala VARCHAR(50) NOT NULL,
    paciente_id VARCHAR(11) NOT NULL,
    sessao_id INT NOT NULL,
    FOREIGN KEY (paciente_id) REFERENCES Paciente(cpf)
);

CREATE TABLE Sessao (
	id INT PRIMARY KEY AUTO_INCREMENT,
    observacoes TEXT,
    notas TEXT,
    agendamento_id INT NOT NULL,
    paciente_id VARCHAR(11) NOT NULL,
    psicologo_id INT NOT NULL,
    FOREIGN KEY (agendamento_id) REFERENCES Agendamento(id),
    FOREIGN KEY (paciente_id) REFERENCES Paciente(cpf),
    FOREIGN KEY (psicologo_id) REFERENCES Psicologo(crp)
);

ALTER TABLE Agendamento
	ADD CONSTRAINT sessao_agendamento
    FOREIGN KEY (sessao_id) REFERENCES Sessao(id);