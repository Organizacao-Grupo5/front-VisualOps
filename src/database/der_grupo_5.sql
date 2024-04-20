CREATE DATABASE der_grupo_5;

USE der_grupo_5;

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60) NOT NULL,
    cpf VARCHAR(14),
    ativo BOOLEAN NOT NULL,
    email VARCHAR(60) NOT NULL,
    senha VARCHAR(45) NOT NULL,
    fkPlano INT NOT NULL,
        CONSTRAINT fkPlanoUsuario FOREIGN KEY  (fkPlano) REFERENCES plano(id),
    cargos INT NOT NULL,
        CONSTRAINT fkCargosUsuario FOREIGN KEY (cargos) REFERENCES cargos(id)
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
        CONSTRAINT fkEnderecoEmpresa FOREIGN KEY (fkEndereco) REFERENCES endereco(id),
    
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
    id INT AUTO_INCREMENT,
    telefone VARCHAR(10) NOT NULL,
    fkUsuario INT NOT NULL,
        CONSTRAINT fkUsuarioContato FOREIGN KEY (fkUsuario) REFERENCES usuario(id),
    PRIMARY KEY (id, fkUsuario)
);

CREATE TABLE maquina (
    id INT AUTO_INCREMENT,
    ipv4 VARCHAR(15) NOT NULL,
    fkUsuario INT NOT NULL,
        CONSTRAINT fkUsuarioMaquina FOREIGN KEY (fkUsuario) REFERENCES usuario(id),
    PRIMARY KEY (id, fkUsuario)
);

CREATE TABLE placa_mae (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fabricante VARCHAR(45) NOT NULL,
    modelo VARCHAR(45) NOT NULL,
    fkMaquina INT NOT NULL,
        CONSTRAINT fkMaquinaPlaca_mae FOREIGN KEY (fkMaquina) REFERENCES maquina(id),
    fkMaquinaUsuario INT NOT NULL,
        CONSTRAINT fkMaquinaUsuarioPlaca_mae FOREIGN KEY (fkMaquinaUsuario) REFERENCES maquina(fkUsuario),
    PRIMARY KEY (id, fkMaquina, fkMaquinaUsuario)
);

CREATE TABLE sistema_operacional (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    versao VARCHAR(45) NOT NULL,
    usuario VARCHAR(45) NOT NULL,
    usoCpu DOUBLE(5,2) NOT NULL,
    usoRam DOUBLE(5,2) NOT NULL
);

CREATE TABLE relacao_maquina_so (
    fkMaquina INT NOT NULL,
        CONSTRAINT fkMaquinaRelacao_maquina_so FOREIGN KEY (fkMaquina) REFERENCES maquina(id),
    fkMaquinaUsuario INT NOT NULL,
        CONSTRAINT fkMaquinaUsuarioRelacao_maquina_so FOREIGN KEY (fkMaquinaUsuario) REFERENCES maquina(fkUsuario),
    fkSistemaOperacional INT NOT NULL,
        CONSTRAINT fkSistemaOperacionalRelacao_maquina_so FOREIGN KEY (fkSistemaOperacional) REFERENCES sistema_operacional(id),
    PRIMARY KEY (fkMaquina, fkMaquinaUsuario, fkSistemaOperacional)
);

CREATE TABLE hdd (
    id INT, 
    capacidadeTotal DOUBLE(5,2),
    numeroParticoes INT NOT NULL,
    espacoDisponivel VARCHAR(45) NOT NULL,
    fkMaquina INT NOT NULL,
        CONSTRAINT fkMaquinaHhd FOREIGN KEY (fkMaquina) REFERENCES maquina(id),
    fkMaquinaUsuario INT NOT NULL,
        CONSTRAINT fkMaquinaUsuarioHhd FOREIGN KEY (fkMaquinaUsuario) REFERENCES maquina(fkUsuario),
    PRIMARY KEY (id, fkMaquina, fkMaquinaUsuario)
);

CREATE TABLE cpu (
    id INT,
    modelo VARCHAR(60) NOT NULL,
    numeroSerie VARCHAR(50) NOT NULL,
    fabricante VARCHAR(50) NOT NULL,
    cache VARCHAR(45),
    fkMaquina INT NOT NULL,
        CONSTRAINT fkMaquinaCpu FOREIGN KEY (fkMaquina) REFERENCES maquina(id),
    fkMaquinaUsuario INT NOT NULL,
        CONSTRAINT fkMaquinaUsuarioCpu FOREIGN KEY (fkMaquinaUsuario) REFERENCES maquina(fkUsuario),
    PRIMARY KEY (id, fkMaquina, fkMaquinaUsuario)
);

CREATE TABLE ram (
    id INT,
    capacidadeTotal DOUBLE(5,2) NOT NULL,
    numeroModulo INT NOT NULL,
    porcetagemUtilizada DOUBLE(5,2) NOT NULL,
    fkMaquina INT NOT NULL,
        CONSTRAINT fkMaquinaRam FOREIGN KEY (fkMaquina) REFERENCES maquina(id),
    fkMaquinaUsuario INT NOT NULL,
        CONSTRAINT fkMaquinaUsuarioRam FOREIGN KEY (fkMaquinaUsuario) REFERENCES maquina(fkUsuario),
    PRIMARY KEY (id, fkMaquina, fkMaquinaUsuario)
);

CREATE TABLE gpu (
    id INT AUTO_INCREMENT,
    modelo VARCHAR(60) NOT NULL,
    memoria DOUBLE(5,2) NOT NULL,
    versaoDriver VARCHAR(45) NOT NULL,
    fkMaquina INT NOT NULL,
        CONSTRAINT fkMaquinaGpu FOREIGN KEY (fkMaquina) REFERENCES maquina(id),
    fkMaquinaUsuario INT NOT NULL,
        CONSTRAINT fkMaquinaUsuarioGpu FOREIGN KEY (fkMaquinaUsuario) REFERENCES maquina(fkUsuario),
    PRIMARY KEY (id, fkMaquina, fkMaquinaUsuario)    
);

CREATE TABLE usb (
    id INT AUTO_INCREMENT,
    totalPortas INT NOT NULL,
    fkMaquina INT NOT NULL,
        CONSTRAINT fkMaquinaUsb FOREIGN KEY (fkMaquina) REFERENCES maquina(id),
    fkMaquinaUsuario INT NOT NULL,
        CONSTRAINT fkMaquinaUsuarioUsb FOREIGN KEY (fkMaquinaUsuario) REFERENCES maquina(fkUsuario),
    PRIMARY KEY (id, fkMaquina, fkMaquinaUsuario)    
);

CREATE TABLE app (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nomeApp VARCHAR(45) NOT NULL,
    dtInstalcao DATE NOT NULL,
    ultimaAtualizacao DATE,
    tamanhoMB DOUBLE(5,2)
);

CREATE TABLE app_acessado (
    fkApp INT NOT NULL,
        CONSTRAINT fkAppApp_acessado FOREIGN KEY (fkApp) REFERENCES app(id),
    fkMaquina INT NOT NULL,
        CONSTRAINT fkMaquinaApp_acessado FOREIGN KEY (fkMaquina) REFERENCES maquina(id),
    fkMaquinaUsuario INT NOT NULL,
        CONSTRAINT fkMaquinaUsuarioApp_acessado FOREIGN KEY (fkMaquinaUsuario) REFERENCES maquina(fkUsuario),
    PRIMARY KEY (fkApp, fkMaquina, fkMaquinaUsuario),
    hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE velocidade_componente (
    id INT AUTO_INCREMENT,
    numero DOUBLE(5,2) NOT NULL,
    tipo VARCHAR(45) NOT NULL,
    hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fkMaquina INT NOT NULL,
        CONSTRAINT fkMaquinaVelocidade_componente FOREIGN KEY (fkMaquina) REFERENCES maquina(id),
    fkMaquinaUsuario INT NOT NULL,
        CONSTRAINT fkMaquinaUsuarioVelocidade_componente FOREIGN KEY (fkMaquinaUsuario) REFERENCES maquina(fkUsuario),
    PRIMARY KEY (id, fkMaquina, fkMaquinaUsuario)
);

CREATE TABLE temperatura_componente (
    id INT AUTO_INCREMENT,
    temperaturaC° DOUBLE(4,2) NOT NULL,
    hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fkMaquina INT NOT NULL,
        CONSTRAINT fkMaquinaTemperatura_componente FOREIGN KEY (fkMaquina) REFERENCES maquina(id),
    fkMaquinaUsuario INT NOT NULL,
        CONSTRAINT fkMaquinaUsuarioTemperatura_componente FOREIGN KEY (fkMaquinaUsuario) REFERENCES maquina(fkUsuario),
    PRIMARY KEY (id, fkMaquina, fkMaquinaUsuario)
);

CREATE TABLE informacao_componente (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR(45) NOT NULL,
    dado VARCHAR(45) NOT NULL,
    fkMaquina INT NOT NULL,
        CONSTRAINT fkMaquinaInformacao_componente FOREIGN KEY (fkMaquina) REFERENCES maquina(id),
    fkMaquinaUsuario INT NOT NULL,
        CONSTRAINT fkMaquinaUsuarioInformacao_componente FOREIGN KEY (fkMaquinaUsuario) REFERENCES maquina(fkUsuario),
    PRIMARY KEY (id, fkMaquina, fkMaquinaUsuario),
    hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


