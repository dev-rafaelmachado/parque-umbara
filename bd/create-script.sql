use parque_umbara;

create table person(
	cpf char(14) not null,
    nome varchar(50) not null,
    senha varchar(100) not null,
    email varchar(70) not null,
    sexo char(1) not null,
    data_nasc date not null,
    PRIMARY KEY (cpf)
);

create table client(
	cpf_client char(14) not null,
	PRIMARY KEY (cpf_client),
    FOREIGN KEY (cpf_client) REFERENCES person(cpf)
);

create table func(
	cpf_func char(14) not null,
    salario double not null,
    data_emissao datetime not null,
	PRIMARY KEY (cpf_func),
    FOREIGN KEY (cpf_func) REFERENCES person(cpf)
);


create table attractions(
	id INT auto_increment not null,
    nome varchar(40) not null,
    cordenada point not null,
	PRIMARY KEY (id)
);

create table func_attractions(
	cpf_func char(14) not null,
    id_attraction int not null,
	PRIMARY KEY (cpf_func,id_attraction),
    foreign key (cpf_func) references func(cpf_func),
    foreign key (id_attraction) references attractions(id)
);

create table bangle(
	id int auto_increment not null,
	primary key(id)
);

create table register(
	id int auto_increment not null,
    cpf_client char(14) not null,
    id_bangle int not null,
    data_aberto datetime not null,
    data_fechado datetime,
    PRIMARY KEY (id),
	foreign key (cpf_client) references client(cpf_client),
    foreign key (id_bangle) references bangle(id)
);

create table uni_location(
	id_bangle int not null,
    cordenada point not null,
    data_registro datetime not null,
    foreign key (id_bangle) references bangle(id)
);

create table alert(
	id int auto_increment not null,
    id_register int not null,
    data_aberto datetime not null,
    data_fechado datetime,
    primary key(id),
    foreign key (id_register) references register(id)
);

create table flag(
	id int auto_increment not null,
    id_alert int not null,
    id_attraction int not null,
    data_aberto datetime not null,
    data_fechado datetime,
    primary key(id),
    foreign key(id_alert) references alert(id),
    foreign key(id_attraction) references attractions(id)
);

DELIMITER //
CREATE PROCEDURE cadastrar_usuario(
    IN p_cpf char(14),
    IN p_nome VARCHAR(50),
    IN p_senha VARCHAR(100),
    IN p_email VARCHAR(70),
    IN p_sexo char(1),
    IN p_data_nasc DATE
)
BEGIN
    INSERT INTO person (cpf, nome, senha, email, sexo, data_nasc)
    VALUES (p_cpf, p_nome, p_senha, p_email, p_sexo, p_data_nasc);

    INSERT INTO client (cpf_client)
    VALUES (p_cpf);
END //
DELIMITER ;

