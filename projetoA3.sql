CREATE DATABASE projetoA3;

USE projetoA3;

CREATE TABLE Usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
    login VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(50) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    dataNascimento DATE NOT NULL,
    nome VARCHAR(50) NOT NULL,
    sobrenome VARCHAR(200) NOT NULL,
    telefone VARCHAR(11),
    endereco VARCHAR(200),
    cidade VARCHAR(30),
    cep VARCHAR(8),
    tipo VARCHAR(9) NOT NULL
);
    
CREATE TABLE Psicologo (
	crp INT PRIMARY KEY,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    usuario_id INT NOT NULL,
    titulacao VARCHAR(100) NOT NULL,
    especialidade VARCHAR(100),
    atendimento VARCHAR(200) NOT NULL,
    valor DOUBLE NOT NULL,
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
    data_hora DATETIME NOT NULL UNIQUE,
    sala VARCHAR(50) NOT NULL,
    paciente_id VARCHAR(11) NOT NULL,
    psicologo_crp INT NOT NULL,
    sessao_id INT DEFAULT NULL,
    FOREIGN KEY (paciente_id) REFERENCES Paciente(cpf),
    FOREIGN KEY (psicologo_crp) REFERENCES Psicologo(crp)
);

CREATE TABLE Sessao (
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    sobrenome VARCHAR(200) NOT NULL,
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

USE projetoA3;

INSERT INTO Usuario(
	id,
    login,
    senha,
    email,
    dataNascimento,
    nome,
    sobrenome,
    telefone,
    endereco,
    cidade,
    cep,
    tipo) VALUES (
    1,
	'bvsilva',
    '123',
    'bvsilva@hotmail.com',
    '1990-08-29',
    'Bruno',
    'Venâncio',
    '11987786706',
    'Rua Suarella, 99 - Vila Missionária',
    'São Paulo - SP',
    '04430080',
    'paciente');
    
INSERT INTO Paciente(cpf, usuario_id) VALUES ('38434365847', 1);
    
INSERT INTO Usuario(
	id,
    login,
    senha,
    email,
    dataNascimento,
    nome,
    sobrenome,
    telefone,
    endereco,
    cidade,
    cep,
    tipo) VALUES (
    2,
	'pripontes',
    '123',
    'psicopri@hotmail.com',
    '1986-06-21',
    'Priscila',
    'Pontes',
    '11123456789',
    'Avenida José André de Moraes, 1143 - Jardim Monte Alegre',
    'Taboão da Serra - SP',
    '06755260',
    'psicologo');

INSERT INTO Psicologo(crp, cpf, usuario_id, titulacao, atendimento, valor) VALUES (
	'123456', 
    '12345678910', 
    2,
    'Graduada em Psicologia',
    'Rua Teste, nº00 - Sala 00',
    200);
    
UPDATE Paciente SET psicologo_crp = 123456, valorConsulta = 100.00 WHERE cpf='38434365847';