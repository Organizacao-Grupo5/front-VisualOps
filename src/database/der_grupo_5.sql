-- SQLBook: Code
drop database der_grupo_5;
CREATE DATABASE der_grupo_5;
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
(1, 'Plano Freelancer', 'Foco: Freelancers (monitora uma máquina).
Monitoramento de Hardware: Processador, RAM, disco, conexão USB, placa gráfica'),
(2, 'Plano Empresarial', 'Foco: Pequenas e Médias Empresas (monitora até 100 máquinas).
Monitoramento de Hardware: Processador, RAM, disco, conexão USB, placa gráfica.'),
(3, 'Plano Corporativo', 'Foco: Grandes Empresas.
Monitoramento de Hardware: Processador, RAM, disco, conexão USB, placa gráfica.');

INSERT INTO empresa (nome, cnpj, fkPlano) VALUES
('Visual Ops', '12345678901234', 3);

INSERT INTO endereco (cep, logradouro, numero, bairro, estado, complemento, fkEmpresa) VALUES
('09930220', 'Rua Londres', '68', 'Bairro Jardim das Nações', 'São Paulo', '', 1);

INSERT INTO usuario (nome, email, senha, cargo, fkEmpresa) VALUES
('clau', 'clau@gmail.com', '123', 'Gerente', 1);

INSERT INTO contato (telefone, fkUsuario) VALUES
('11944636705', 1);

INSERT INTO maquina (username, hostname, fkUsuario) VALUES
('clau', 'clau', 1);

INSERT INTO ipv4 (numeroIP, nomeLocal, fkMaquina, fkUsuario) VALUES
('10.18.35.68', 'CASA', 1, 1);
-- ip sptech : 10.18.35.68

select * from usuario;
SELECT * FROM maquina JOIN usuario on maquina.fkUsuario = usuario.idUsuario JOIN ipv4 ON ipv4.fkMaquina = maquina.idMaquina WHERE idUsuario = 1;
SELECT * FROM maquina JOIN componente ON componente.fkMaquina = maquina.idMaquina WHERE maquina.idMaquina = 1;
SELECT * FROM captura JOIN componente ON componente.idComponente = captura.fkComponente JOIN maquina ON maquina.idMaquina = componente.fkMaquina JOIN usuario on usuario.idUsuario = maquina.fkUsuario WHERE idUsuario = 1;

SELECT ipv4.numeroIP FROM ipv4 INNER JOIN Maquina ON ipv4.fkMaquina = Maquina.idMaquina where ipv4.numeroIP = "26.245.80.14";

