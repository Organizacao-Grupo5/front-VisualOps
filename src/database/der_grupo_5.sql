-- SQLBook: Code
CREATE DATABASE der_grupo_5;

CREATE USER "client"@'%' identified by "Client123$";
grant Select, Update, Delete, Insert on der_grupo_5.* to "client";
flush privileges;

USE der_grupo_5;

CREATE TABLE plano (
    idPlano INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(30) NOT NULL,
    descricao VARCHAR(200) NOT NULL
);

CREATE TABLE empresa (
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    cnpj CHAR(18),
    fkPlano INT,
    constraint fkPlano foreign key (fkPlano) references plano(idPlano)
);

CREATE TABLE endereco (
    idEndereco INT PRIMARY KEY AUTO_INCREMENT,
    cep CHAR(9) NOT NULL,
    logradouro VARCHAR(60) NOT NULL,
    numero VARCHAR(4) NOT NULL,
    bairro VARCHAR(40),
    estado VARCHAR(30),
    complemento VARCHAR(45),
    fkEmpresa INT NOT NULL,
        CONSTRAINT fkEmpresaEndereco FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60) NOT NULL,
    email VARCHAR(60) NOT NULL UNIQUE,
    senha VARCHAR(45) NOT NULL,
    cargo varchar(45),
    fkEmpresa INT NOT NULL, 
        CONSTRAINT fkEmpresaUsuario FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

CREATE TABLE contato (
    idContato INT AUTO_INCREMENT,
    telefone CHAR(12) NOT NULL,
    tipo VARCHAR(30) NOT NULL,
    fkUsuario INT NOT NULL,
        CONSTRAINT fkUsuarioContato FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
    PRIMARY KEY (idContato, fkUsuario)
);

CREATE TABLE maquina (
    idMaquina INT AUTO_INCREMENT,
    numeroIdentificacao VARCHAR(25),
    modelo VARCHAR(45),
    marca VARCHAR (45),
    username VARCHAR(45),
    hostname VARCHAR(45),
    fkUsuario INT NOT NULL,
        CONSTRAINT fkUsuarioMaquina FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
    PRIMARY KEY (idMaquina, fkUsuario)
);

CREATE TABLE ipv4(
    idIpv4 INT AUTO_INCREMENT,
    numeroIP VARCHAR(18),
    nomeLocal VARCHAR(45),
    fkMaquina INT NOT NULL,
        CONSTRAINT fkMaquinaIPV4 FOREIGN KEY (fkMaquina) REFERENCES maquina(idMaquina),
    fkUsuario INT NOT NULL,
        CONSTRAINT fkUsuarioMaquinaIPV4 FOREIGN KEY (fkUsuario) REFERENCES maquina(fkUsuario),
    PRIMARY KEY (idIpv4, fkMaquina, fkUsuario)
);


CREATE TABLE alertas(
    idAlertas INT PRIMARY KEY AUTO_INCREMENT,
    tipoAlertas VARCHAR(45) NOT NULL,
    mensagem VARCHAR(60) NOT NULL
);

CREATE TABLE componente (
    idComponente INT AUTO_INCREMENT,
    componente VARCHAR(200) NOT NULL,
    modelo VARCHAR(200) NOT NULL,
    fabricante VARCHAR(200) NOT NULL,
    fkMaquina INT NOT NULL,
        CONSTRAINT fkMaquinaComponente FOREIGN KEY (fkMaquina) REFERENCES maquina(idMaquina),
    fkUsuario INT NOT NULL,
        CONSTRAINT fkMaquinaUsuarioComponente FOREIGN KEY (fkUsuario) REFERENCES maquina(fkUsuario),
    PRIMARY KEY (idComponente, fkMaquina, fkUsuario)
);


CREATE TABLE captura(
    idCaptura INT AUTO_INCREMENT,
    dadoCaptura VARCHAR(45) NOT NULL,
    unidadeMedida VARCHAR(5) NOT NULL,
    dataCaptura DATETIME NOT NULL,
    fkComponente INT NOT NULL,
        CONSTRAINT fkComponenteCaptura FOREIGN KEY (fkComponente) REFERENCES componente(idComponente),
    PRIMARY KEY (idCaptura, fkComponente)
);

CREATE TABLE registroAlertas(
    idRegistroAlertas INT AUTO_INCREMENT,
    horario TIMESTAMP,
    fkAlertas INT NOT NULL,
    constraint fkAlertas foreign key (fkAlertas) references alertas(idAlertas),
    fkCaptura INT NOT NULL,
        CONSTRAINT fkRegistroAlertasCaptura FOREIGN KEY (fkCaptura) REFERENCES captura(idCaptura),
    fkComponente INT NOT NULL,
        CONSTRAINT fkRegistroAlertasCapturaComponente FOREIGN KEY (fkComponente) REFERENCES captura(fkComponente),
    PRIMARY KEY (idRegistroAlertas, fkCaptura, fkComponente)
);


insert into plano values
(null, 'Plano Freelancer', 'Foco: Freelancers (monitora uma máquina).
Monitoramento de Hardware: Processador, RAM, disco, conexão USB, placa gráfica'),
(null, 'Plano Empresarial', 'Foco: Pequenas e Médias Empresas (monitora até 100 máquinas).
Monitoramento de Hardware: Processador, RAM, disco, conexão USB, placa gráfica.'),
(null, 'Plano Corporativo', 'Foco: Grandes Empresas.
Monitoramento de Hardware: Processador, RAM, disco, conexão USB, placa gráfica.');

-- Inserções para a tabela 'empresa'
INSERT INTO empresa (nome, cnpj, fkPlano) VALUES
('Empresa A', '12345678901234', 1),
('Empresa B', '98765432109876', 2),
('Empresa C', '56789012345678', 3);

select * from maquina;

insert into ipv4(numeroIP, nomeLocal, fkMaquina, fkUsuario) values 
	('192.168.15.6', 'Home', '4', 4),
    ('192.168.15.6', 'Empresa', 5, 5);

-- Inserções para a tabela 'endereco'
INSERT INTO endereco (cep, logradouro, numero, fkEmpresa) VALUES
('12345-678', 'Rua A', '123', 4),
('98765-432', 'Rua B', '456', 5),
('56789-012', 'Rua C', '789', 6);

-- Inserções para a tabela 'usuario'
INSERT INTO usuario (nome, email, senha, fkEmpresa) VALUES
('Usuário 1', 'usuario1@empresa.com', 'senha123', 4),
('Usuário 2', 'usuario2@empresa.com', 'senha456', 5),
('Usuário 3', 'usuario3@empresa.com', 'senha789', 6);

SELECT * FROM maquina JOIN usuario on maquina.fkUsuario = usuario.idUsuario JOIN ipv4 ON ipv4.fkMaquina = maquina.idMaquina WHERE idUsuario = 5;

select * from ipv4;

update ipv4 set numeroIp = '192.168.15.5' where idipv4 = 1;


select * from usuario;


-- Inserções para a tabela 'maquina'
INSERT INTO maquina (fkUsuario) VALUES
(4),
(5),
(6);
