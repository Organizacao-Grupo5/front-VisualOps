-- SQLBook: Code
-- USER-Script
DROP USER IF EXISTS 'client'@'%';
FLUSH PRIVILEGES;

CREATE USER 'client'@'%' identified by 'Client123$';
GRANT SELECT, UPDATE, DELETE, INSERT ON der_grupo_5.* TO 'client';
flush privileges;

-- CREATE-Script
DROP DATABASE der_grupo_5;
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
	imagemPerfil VARCHAR(100),
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
    idMaquina INT PRIMARY KEY AUTO_INCREMENT,
    numeroIdentificacao VARCHAR(25),
    modelo VARCHAR(45),
    marca VARCHAR (45),
    mac VARCHAR(20),
    fkUsuario INT,
        CONSTRAINT fkUsuarioMaquina FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario) ON DELETE CASCADE,
	fkEmpresa INT NOT NULL,
		CONSTRAINT fkEmpresaMaquina FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa) ON DELETE CASCADE
);


CREATE TABLE apps(
idApp INT PRIMARY KEY AUTO_INCREMENT,
nomeApp VARCHAR(50) NOT NULL,
pid INT NOT NULL,
ramConsumida INT NOT NULL, 
localidade varchar(60) NOT NULL
);

CREATE TABLE appAcessado(
fkApp INT NOT NULL,
	CONSTRAINT fkAppMaquina FOREIGN KEY (fkApp) REFERENCES apps(idApp),
fkMaquina INT NOT NULL,
	CONSTRAINT fkMaquina FOREIGN KEY (fkMaquina) REFERENCES maquina(idMaquina),
hora TIMESTAMP,
PRIMARY KEY (fkApp, fkMaquina)
);

CREATE TABLE rede (
    idRede INT PRIMARY KEY AUTO_INCREMENT,
    nomeRede VARCHAR(45) NOT NULL,
    interfaceRede VARCHAR(45) NOT NULL,
    sinalRede INT NOT NULL,
    transmissaoRede DOUBLE NOT NULL,
    bssidRede VARCHAR(20) NOT NULL
);

CREATE TABLE ipv4(
    idIpv4 INT PRIMARY KEY AUTO_INCREMENT,
    numeroIP VARCHAR(18),
    nomeLocal VARCHAR(45),
    fkMaquina INT NOT NULL,
        CONSTRAINT fkMaquinaIPV4 FOREIGN KEY (fkMaquina) REFERENCES maquina(idMaquina) ON DELETE CASCADE
);

CREATE TABLE relRedeIpv4 (
    fkRede INT NOT NULL,
		CONSTRAINT fkRedeRRI FOREIGN KEY (fkRede) REFERENCES rede(idRede) ON DELETE CASCADE,
	fkIpv4 INT NOT NULL,
		CONSTRAINT fkIpv4RRI FOREIGN KEY (fkIpv4) REFERENCES ipv4(idIpv4) ON DELETE CASCADE,
	PRIMARY KEY (fkRede, fkIpv4),
	dataConexao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE componente (
    idComponente INT PRIMARY KEY AUTO_INCREMENT,
    componente VARCHAR(200) NOT NULL,
    modelo VARCHAR(200) NOT NULL,
    fabricante VARCHAR(200) NOT NULL,
    fkMaquina INT NOT NULL,
        CONSTRAINT fkMaquinaComponente FOREIGN KEY (fkMaquina) REFERENCES maquina(idMaquina) ON DELETE CASCADE
);

CREATE TABLE configuracao (
	idConfig INT PRIMARY KEY AUTO_INCREMENT,
    minimoParaSerMedio FLOAT NOT NULL DEFAULT 30,
		CONSTRAINT ckMinimoParaSerMedio CHECK (minimoParaSerMedio < 100 AND minimoParaSerMedio > 0 AND minimoParaSerMedio < minimoParaSerRuim),
	minimoParaSerRuim FLOAT NOT NULL DEFAULT 60,
        CONSTRAINT ckMinimoParaSerRuim CHECK (minimoParaSerRuim < 100 AND minimoParaSerRuim > 0),    
    dataModificacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	fkComponente INT NOT NULL,
		CONSTRAINT fkConfigComponente FOREIGN KEY (fkComponente) REFERENCES componente(idComponente)
);

CREATE TABLE alerta (
    idAlerta INT PRIMARY KEY AUTO_INCREMENT,
    mensagem VARCHAR(60) NOT NULL,
	tipoAlerta VARCHAR(5) NOT NULL,
		CONSTRAINT ckTipoAlerta CHECK (tipoAlerta IN ('BOM', 'MÉDIO', 'RUIM'))
);

CREATE TABLE captura (
    idCaptura INT PRIMARY KEY AUTO_INCREMENT,
    dadoCaptura DOUBLE NOT NULL,
    unidadeMedida VARCHAR(5) NOT NULL,
    dataCaptura DATETIME NOT NULL,
    fkComponente INT NOT NULL,
        CONSTRAINT fkComponenteCaptura FOREIGN KEY (fkComponente) REFERENCES componente(idComponente) 
);

CREATE TABLE registroAlerta (
    idRegistroAlertas INT PRIMARY KEY AUTO_INCREMENT,
    horario TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fkAlerta INT NOT NULL,
    constraint fkRegistroAlertasAlerta foreign key (fkAlerta) references alerta(idAlerta),
    fkCaptura INT NOT NULL,
        CONSTRAINT fkRegistroAlertasCaptura FOREIGN KEY (fkCaptura) REFERENCES captura(idCaptura)
);

-- INSERT-Script
INSERT INTO plano VALUES
	(NULL, 'Plano Freelancer', 'Foco: Freelancers (monitora uma máquina). Monitoramento de Hardware: Processador, RAM, disco, conexão USB, placa gráfica'),
	(NULL, 'Plano Empresarial', 'Foco: Pequenas e Médias Empresas (monitora até 100 máquinas). Monitoramento de Hardware: Processador, RAM, disco, conexão USB, placa gráfica.'),
	(NULL, 'Plano Corporativo', 'Foco: Grandes Empresas. Monitoramento de Hardware: Processador, RAM, disco, conexão USB, placa gráfica.');

INSERT INTO empresa (nome, cnpj, fkPlano) VALUES
	('Empresa A', '12345678901234', 1),
	('Empresa B', '98765432109876', 2),
	('Empresa C', '56789012345678', 3);

INSERT INTO endereco (cep, logradouro, numero, fkEmpresa) VALUES
	('12345-678', 'Rua A', '123', 1),
	('98765-432', 'Rua B', '456', 2),
	('56789-012', 'Rua C', '789', 3);

INSERT INTO usuario (nome, email, senha, fkEmpresa) VALUES
	('Gui', 'gui@gmail.com', '@Senha123', 1),
	('Usuário 2', 'usuario2@empresa.com', 'senha456', 1),
	('Usuário 3', 'usuario3@empresa.com', 'senha789', 2);

INSERT INTO maquina (fkUsuario, fkEmpresa) VALUES 
	(1, 1),
    (2, 1),
    (3, 2);

INSERT INTO alerta VALUES
	(null, "Componente em ótimo estado!", "BOM"),
    (null, "Componente bom porém está sendo comprometido!", "MÉDIO"),
    (null, "Componente está comprometido!!", "RUIM");

INSERT INTO ipv4(numeroIP, nomeLocal, fkMaquina) VALUES 
	('26.245.80.14', 'Home', 1);

INSERT INTO rede (nomeRede, interfaceRede, sinalRede, transmissaoRede, bssidRede) 
VALUES ('Nome da Rede', 'Interface da Rede', 80, 2.4, '00:11:22:33:44:55');

INSERT INTO relRedeIpv4 VALUES
	(1, 1, DEFAULT);

-- SELECT-Script
SHOW TABLES;

SELECT * FROM alerta;

SELECT * FROM captura;

SELECT * FROM componente;

SELECT * FROM configuracao;

SELECT * FROM contato;

SELECT * FROM empresa;

SELECT * FROM endereco;

SELECT * FROM ipv4;

SELECT * FROM maquina;

SELECT * FROM plano;

SELECT * FROM rede;

SELECT * FROM registroalerta;

SELECT * FROM relredeipv4;

SELECT * FROM usuario;

SELECT * FROM maquina JOIN usuario ON maquina.fkUsuario = usuario.idUsuario JOIN ipv4 ON ipv4.fkMaquina = maquina.idMaquina WHERE idUsuario = 2;

SELECT * FROM ipv4 JOIN usuario ON fkUsuario = idUsuario WHERE fkEmpresa = 1;

SELECT * FROM maquina JOIN ipv4 ON idMaquina = fkMaquina;

SELECT * FROM ipv4 WHERE numeroIP = '192.168.15.6' AND fkMaquina = '1';

SELECT * FROM rede WHERE bssidRede = 'e6:54:20:c3:b5:2e';

SELECT COUNT(*) from maquina as m
	JOIN componente as c ON m.fkComponente = c.idComponente WHERE fkUsuario = 1;

SELECT COLUMN_NAME, COLUMN_TYPE, COLUMN_DEFAULT, IS_NULLABLE, COLUMN_KEY, EXTRA, COLUMN_COMMENT FROM information_schema.columns WHERE TABLE_SCHEMA = 'der_grupo_5' AND TABLE_NAME = "alertas";

SELECT dadoCaptura, componente FROM captura JOIN componente ON componente.idComponente = captura.fkComponente JOIN maquina ON maquina.idMaquina = componente.fkMaquina JOIN usuario ON usuario.idUsuario = maquina.fkUsuario 
    JOIN (SELECT fkComponente, MAX(dataCaptura) AS MaxDate FROM captura GROUP BY fkComponente) AS LatestCaptura ON captura.fkComponente = LatestCaptura.fkComponente 
        AND captura.dataCaptura = LatestCaptura.MaxDate WHERE usuario.idUsuario = idUsuario AND componente.componente IN ('MemoriaRam', 'HDD', 'CPU', 'GPU', 'Volume') ORDER BY componente.componente;

-- UPDATE-Script
UPDATE ipv4 SET numeroIP = '26.245.80.14' WHERE idIpv4 =  1;