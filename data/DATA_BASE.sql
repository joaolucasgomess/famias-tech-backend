CREATE TABLE Usuario(
	id_usuario VARCHAR PRIMARY KEY,
	nome VARCHAR NOT NULL,
	email VARCHAR NOT NULL UNIQUE,
	senha VARCHAR NOT NULL,
	tipo_usuario VARCHAR NOT NULL 
);

CREATE TABLE Aluno( 
 	id_aluno VARCHAR PRIMARY KEY,  
 	matricula VARCHAR NOT NULL UNIQUE,
	id_usuario VARCHAR	REFERENCES Usuario (id_usuario) 
); 

CREATE TABLE Empresa( 
 	id_empresa VARCHAR PRIMARY KEY,  
 	razao_social VARCHAR NOT NULL,  
 	cnpj VARCHAR NOT NULL UNIQUE
); 

CREATE TABLE Visitante( 
 	id_visitante VARCHAR PRIMARY KEY,  
 	cargo VARCHAR NOT NULL,  
 	id_empresa VARCHAR REFERENCES Empresa (id_empresa),
	id_usuario VARCHAR	REFERENCES Usuario (id_usuario)
); 

CREATE TABLE Projeto( 
 	id_projeto VARCHAR PRIMARY KEY,  
 	nome_projeto VARCHAR NOT NULL,  
 	descricao_projeto VARCHAR NOT NULL,  	
 	url_projeto VARCHAR NOT NULL UNIQUE,  
 	id_usuario VARCHAR REFERENCES Usuario (id_usuario),
	id_mesa VARCHAR REFERENCES Mesa (id_mesa)
); 

CREATE TABLE Mesa( 
 	id_mesa VARCHAR PRIMARY KEY,  
 	numero_mesa INT NOT NULL UNIQUE
); 


CREATE TABLE Mesa_visitada( 
 	id_mesa VARCHAR REFERENCES Mesa (id_mesa),  
 	id_visitante VARCHAR REFERENCES Visitante (id_visitante),  
	PRIMARY KEY(id_mesa, id_visitante)
); 
