CREATE DATABASE der_grupo_5;

USE der_grupo_5;

CREATE TABLE usuario (
    id INT AUTO_INCREMENT,
    nome VARCHAR(60) NOT NULL,
    cpf VARCHAR(14),
    ativo BOOLEAN NOT NULL,
    email VARCHAR(60) NOT NULL,
    senha VARCHAR(45) NOT NULL,
    fkPlano INT NOT NULL,
        CONSTRAINT fkPlanoUsuario FOREIGN KEY  (fkPlano) REFERENCES plano(id),
    cargos INT NOT NULL,
        CONSTRAINT fkCargosUsuario FOREIGN KEY (cargos) REFERENCES cargos(id),
    PRIMARY KEY (id, cargos)
);

CREATE TABLE cargos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL
);

CREATE TABLE identificacao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cpf/cnpj VARCHAR(18) NOT NULL,
    fkUsuario INT NOT NULL,
        CONSTRAINT fkUsuarioIdentificacao FOREIGN KEY (fkUsuario) REFERENCES usuario(id),
    fkCargosUsuario INT NOT NULL,
        CONSTRAINT fkCargosUsuarioIdentificacao FOREIGN KEY (fkCargosUsuario) REFERENCES cargos(id),
    fkEmpresa INT NOT NULL,
        CONSTRAINT fkEmpresaIdenficacao FOREIGN KEY (fkEmpresa) REFERENCES empresa(id)
);

CREATE TABLE empresa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    fkEndereco INT NOT NULL,
        CONSTRAINT fkEnderecoEmpresa FOREIGN KEY (fkEndereco) REFERENCES endereco(id)
);

CREATE TABLE endereco (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cep CHAR(8) NOT NULL,
    logradouro VARCHAR(60) NOT NULL,
    numero VARCHAR(4) NOT NULL,
    bairro VARCHAR(40) NOT NULL,
    cidade VARCHAR (40) NOT NULL,
    estado VARCHAR(30) NOT NULL,
    complemento VARCHAR(45)
);

CREATE TABLE plano (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(30) NOT NULL,
    descricao VARCHAR(45) NOT NULL
);

CREATE TABLE contato (
    id INT PRIMARY KEY AUTO_INCREMENT,
    telefone VARCHAR(10) NOT NULL,
    fkUsuario INT NOT NULL,
        CONSTRAINT fkUsuarioContato FOREIGN KEY (fkUsuario) REFERENCES usuario(id)
);
