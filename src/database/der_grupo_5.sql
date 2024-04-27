CREATE DATABASE der_grupo_5;

USE der_grupo_5;

CREATE TABLE cargos (
    idCargos INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL UNIQUE
);

select * from cargos;

CREATE TABLE plano (
    idPlano INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(30) NOT NULL,
    descricao VARCHAR(45) NOT NULLx 
);

CREATE TABLE empresa (
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    cnpj CHAR(14)
);

CREATE TABLE endereco (
    idEndereco INT PRIMARY KEY AUTO_INCREMENT,
    cep CHAR(8) NOT NULL,
    logradouro VARCHAR(60) NOT NULL,
    numero VARCHAR(4) NOT NULL,
    bairro VARCHAR(40) NOT NULL,
    estado VARCHAR(30) NOT NULL,
    complemento VARCHAR(45),
    fkEmpresa INT NOT NULL,
        CONSTRAINT fkEmpresaEndereco FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60) NOT NULL,
    email VARCHAR(60) NOT NULL,
    senha VARCHAR(45) NOT NULL,
    fkCargos INT NOT NULL,
        CONSTRAINT fkCargosUsuario FOREIGN KEY (fkcargos) REFERENCES cargos(idCargos),
    fkEmpresa INT NOT NULL, 
        CONSTRAINT fkEmpresaUsuario FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
    fkPlano INT NOT NULL,
        CONSTRAINT fkPlanoEmpresaUsuario FOREIGN KEY (fkPlano) REFERENCES empresa(fkPlano)
);

CREATE TABLE contato (
    idContato INT AUTO_INCREMENT,
    telefone VARCHAR(10) NOT NULL,
    fkUsuario INT NOT NULL,
        CONSTRAINT fkUsuarioContato FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
    PRIMARY KEY (idContato, fkUsuario)
);

CREATE TABLE maquina (
    idMaquina INT AUTO_INCREMENT,
    ipv4 VARCHAR(15) NOT NULL,
    fkUsuario INT NOT NULL,
        CONSTRAINT fkUsuarioMaquina FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
    PRIMARY KEY (idMaquina, fkUsuario)
);

CREATE TABLE app (
    idApp INT PRIMARY KEY AUTO_INCREMENT,
    nomeApp VARCHAR(45) NOT NULL,
    dtInstalacao DATE NOT NULL,
    ultimaAtualizacao DATE,
    tamanhoMB DOUBLE(5,2)
);

CREATE TABLE app_acessado (
    fkApp INT AUTO_INCREMENT,
        CONSTRAINT fkAppApp_acessado FOREIGN KEY (fkApp) REFERENCES app(idApp),
    fkMaquina INT NOT NULL,
        CONSTRAINT fkMaquinaApp_acessado FOREIGN KEY (fkMaquina) REFERENCES maquina(idMaquina),
    fkUsuario INT NOT NULL,
        CONSTRAINT fkMaquinaUsuarioApp_acessado FOREIGN KEY (fkUsuario) REFERENCES maquina(fkUsuario),
    PRIMARY KEY (fkApp, fkMaquina, fkUsuario),
    hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP        
);

CREATE TABLE alertas(
    idAlertas INT PRIMARY KEY AUTO_INCREMENT,
    tipoAlertas VARCHAR(45) NOT NULL,
    mensagem VARCHAR(60) NOT NULL
);

CREATE TABLE componente (
    idComponente INT AUTO_INCREMENT,
    componente VARCHAR(45) NOT NULL,
    modelo VARCHAR(45) NOT NULL,
    fabricante VARCHAR(45) NOT NULL,
    preferenciaAlerta VARCHAR(45),
    fkMaquina INT NOT NULL,
        CONSTRAINT fkMaquinaComponente FOREIGN KEY (fkMaquina) REFERENCES maquina(idMaquina),
    fkUsuario INT NOT NULL,
        CONSTRAINT fkMaquinaUsuarioComponente FOREIGN KEY (fkUsuario) REFERENCES maquina(fkUsuario),
    PRIMARY KEY (idComponente, fkMaquina, fkUsuario),
    hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE captura(
    idCaptura INT AUTO_INCREMENT,
    captura VARCHAR(45) NOT NULL,
    unidadeMedida VARCHAR(5) NOT NULL,
    dataCaptura DATETIME NOT NULL,
    fkComponente INT NOT NULL,
        CONSTRAINT fkComponenteCaptura FOREIGN KEY (fkComponente) REFERENCES componente(idComponente),
    PRIMARY KEY (idCaptura, fkComponente)
);

CREATE TABLE registroAlertas(
    idRegistroAlertas INT AUTO_INCREMENT,
    horario TIMESTAMP,
    fkCaptura INT NOT NULL,
        CONSTRAINT fkRegistroAlertasCaptura FOREIGN KEY (fkCaptura) REFERENCES captura(idCaptura),
    fkComponente INT NOT NULL,
        CONSTRAINT fkRegistroAlertasCapturaComponente FOREIGN KEY (fkComponente) REFERENCES captura(fkComponente),
    PRIMARY KEY (idRegistroAlertas, fkCaptura, fkComponente)
)