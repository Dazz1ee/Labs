CREATE TABLE users(
    id serial,
    email varchar (60) NOT NULL,
    username varchar(60) NOT NULL,
    password varchar(60) NOT NULL,
    avatar TEXT,
    CONSTRAINT uniq_email UNIQUE (email),
    CONSTRAINT uniq_name UNIQUE (username),
    PRIMARY KEY (id)
);

CREATE TABLE roles(
    id serial,
    name varchar(60) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE user_role (
    user_id serial,
    role_id serial,
    CONSTRAINT user_fk FOREIGN KEY (user_id) references users(id),
    CONSTRAINT role_fk FOREIGN KEY (role_id) references roles(id)
);

CREATE TABLE products(
    id serial,
    cost integer NOT NULL,
    name varchar(60) NOT NULL,
    path TEXT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE cart(
    product_id serial,
    user_id serial,
    amount integer DEFAULT 1,
    CONSTRAINT user_id_fk FOREIGN KEY (user_id) references users(id),
    CONSTRAINT product_id_fk FOREIGN KEY (product_id) references products(id),
    PRIMARY KEY (product_id, user_id)
);

INSERT INTO roles (name) values ('ROLE_ADMIN'), ('ROLE_USER');
INSERT INTO users(username, email, password) values ('ADMIN', 'admin@gmail.com', 'password');
INSERT INTO user_role(user_id, role_id) values ('1','1'), ('1','2');