
CREATE TABLE products (
    id serial,
    name text,
    cost int,
    image text,
    PRIMARY KEY (id)
);

CREATE TABLE users (
                       id serial,
                       username varchar(60) NOT NULL,
                       password varchar(60) NOT NULL,
                       PRIMARY KEY(id),
                        CONSTRAINT uniq_name UNIQUE (username)
);

CREATE TABLE roles (
                            id serial PRIMARY KEY,
                           name varchar(60) NOT NULL
);

CREATE TABLE users_roles (
  user_id serial,
  role_id serial,
  PRIMARY KEY (user_id, role_id),
  CONSTRAINT users_roles_ufk FOREIGN KEY (user_id) references users (id),
  CONSTRAINT users_roles_rfk FOREIGN KEY (role_id) references roles (id)
);

CREATE TABLE cart(
                     product_id serial,
                     user_id serial,
                     count BIGINT DEFAULT 1,
                     PRIMARY KEY(product_id, user_id),
                     CONSTRAINT user_id_fk FOREIGN KEY(user_id) REFERENCES users(id),
                     CONSTRAINT user_product_id_fk FOREIGN KEY(product_id) REFERENCES products(id)
);