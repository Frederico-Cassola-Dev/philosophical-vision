-- Active: 1688546505483@@127.0.0.1@3306@philosophical_vision

create table
    users (
        id int primary key auto_increment NOT NULL,
        first_name varchar(100) NOT NULL,
        last_name varchar(100) NOT NULL,
        email varchar(254) NOT NULL unique,
        password varchar(254) NOT NULL,
        reset_token varchar(254),
        reset_token_expires_at DATETIME
    );

create table
    roles (
      id int primary key auto_increment NOT NULL,
      role_name varchar(100) NOT NULL
    );

create table 
    users_roles (
      id int primary key auto_increment NOT NULL,
      user_id int not null,
      role_id int not null,
      FOREIGN KEY (user_id) REFERENCES users(id)
      on delete cascade,
      FOREIGN KEY (role_id) REFERENCES roles(id)
      on delete cascade
);

create table
    categories(
        id int primary key auto_increment NOT NULL,
        title varchar(249) NOT NULL,
        description VARCHAR(249)
    );

create table
    events (
        id int primary key auto_increment NOT NULL,
        title varchar(254) NOT NULL,
        category_id INT NOT NULL,
        FOREIGN KEY(category_id) REFERENCES categories(id)
        on delete cascade
    );

create table periods (
     id int PRIMARY KEY auto_increment NOT NULL,
     title varchar(254) NOT NULL
    );

create table philo_currents (
     id int PRIMARY KEY auto_increment NOT NULL,
     title varchar(254) NOT NULL
    );

create table
    authors (
        id int PRIMARY KEY auto_increment NOT NULL,
        known_name varchar(100) NOT NULL,
        first_name varchar(100),
        last_name varchar(100),
        period_id int NOT NULL,
        philo_current_id int NOT NULL,
        born_date varchar(100),
        dead_date varchar(100),
        era varchar(50) NOT NULL,
        FOREIGN KEY(period_id) REFERENCES periods(id),
        FOREIGN KEY(philo_current_id) REFERENCES philo_currents(id)
    );

create table
    phrases (
        id int primary key auto_increment NOT NULL,
        phrase varchar(254) NOT NULL,
        author_id int NOT NULL,
        Foreign Key (author_id) REFERENCES authors(id)
    );

create table
    users_phrases (
        id int primary key auto_increment NOT NULL,
        user_id int,
        phrase_id int,
        is_liked TINYINT default 0,
        is_favorite TINYINT default 0,
        FOREIGN KEY(user_id) REFERENCES users(id)
        on delete cascade,
        FOREIGN KEY(phrase_id) REFERENCES phrases(id)
        on delete cascade
    );

create table
    events_phrases (
        id int primary key auto_increment NOT NULL,
        event_id int,
        phrase_id int,
        FOREIGN KEY(event_id) REFERENCES events(id)
        on delete cascade,
        FOREIGN KEY(phrase_id) REFERENCES phrases(id)
        on delete cascade
    );

INSERT INTO categories(title, description)
VALUES (
        "Socialle",
        "Socialle bla bla bla"
    ), (
        "Mort",
        "Mort bla bla bla"
    ), ("Vie", "Vie bla bla bla"), (
        "Tristesse",
        "Tristesse bla bla bla"
    ), ("Joie", "Joie bla bla bla"), ("Travail", "Travail bla bla bla"), (
        "Amitié",
        "Amitié bla bla bla"
    ), (
        "Famille",
        "Famille bla bla bla"
    ), ("Argent", "Argent bla bla bla");

INSERT into events (title, category_id)
VALUES (
        "Je viens de perdre mon travail", 2
    ), (
        "Je viens de perdre un proche"
    ,3), ("Je me sens triste",1), (
        "Quelle est le sense de la vie"
    ,5), (
        "Mon Collège de travail parle mal de moi"
    ,4), (
        "Mes collègues parlent dans mon dos"
    ,4), ("Mon ami m'a trahi",1), (
        "Je ne suis pas une bonne personne"
    ,7), ("Je veux disparaître",4), ("Je veux mourir",3);

INSERT into
    users (
        first_name,
        last_name,
        email,
        password,
        reset_token,
        reset_token_expires_at
    )
VALUES (
        "admin",
        "admin",
        "admin@admin.com",
        "$argon2id$v=19$m=65536,t=3,p=1$vmZ5cEJ0bV14hWy1OPv5gQ$wjUBwUERQn7MNyqJuUXBkXtNflzRXcxLRwKAE55VGHw",
        null,
        null
    ),(
        "John",
        "Springfield",
        "john.springfield@springfield.com",
       "$argon2id$v=19$m=65536,t=3,p=1$vmZ5cEJ0bV14hWy1OPv5gQ$wjUBwUERQn7MNyqJuUXBkXtNflzRXcxLRwKAE55VGHw",
       null,
       null
    ), (
        "Anna",
        "Springfield",
        "anna.springfield@springfield.com",
       "$argon2id$v=19$m=65536,t=3,p=1$vmZ5cEJ0bV14hWy1OPv5gQ$wjUBwUERQn7MNyqJuUXBkXtNflzRXcxLRwKAE55VGHw",
       null,
       null
    ), (
        "Philip",
        "Gotham",
        "philip.gotham@gotham.com",
       "$argon2id$v=19$m=65536,t=3,p=1$vmZ5cEJ0bV14hWy1OPv5gQ$wjUBwUERQn7MNyqJuUXBkXtNflzRXcxLRwKAE55VGHw",
       null,
       null
    ), (
        "Susan",
        "Gotham",
        "susan.gotham@gotham.com",
       "$argon2id$v=19$m=65536,t=3,p=1$vmZ5cEJ0bV14hWy1OPv5gQ$wjUBwUERQn7MNyqJuUXBkXtNflzRXcxLRwKAE55VGHw",
       null,
       null
    ), (
        "Andrea",
        "Fritz",
        "andrea.fritz@fritz.com",
       "$argon2id$v=19$m=65536,t=3,p=1$vmZ5cEJ0bV14hWy1OPv5gQ$wjUBwUERQn7MNyqJuUXBkXtNflzRXcxLRwKAE55VGHw",
       null,
       null
    ), (
        "carlos",
        "cassola",
        "cfcassola@gmail.com",
        "$argon2id$v=19$m=65536,t=3,p=1$vmZ5cEJ0bV14hWy1OPv5gQ$wjUBwUERQn7MNyqJuUXBkXtNflzRXcxLRwKAE55VGHw",
        null,
        null
    );


INSERT INTO 
roles (
      role_name
    ) Values ( "administrator"), ("user");

INSERT INTO 
users_roles (
      user_id, role_id
    ) Values ( 1, 1), 
    (2, 2),
    (3, 2),
    (4, 2),
    (5, 2),
    (6, 2),
    (7, 2);

INSERT INTO 
periods (
      title
    ) Values ( "Ancient"), ("Medieval"), ("Modern");

INSERT INTO 
philo_currents (
      title
    ) Values 
    ( "Aristotélisme"), 
    ("Bergsonisme"), 
    ("Bouddhisme"), 
    ("Cartésianisme"), 
    ("Confucianisme"), 
    ("Contractualisme"), 
    ("Cynisme"), 
    ("Darwinisme"), 
    ("Décolonialisme"), 
    ("Décolonialisme"), 
    ("Déconstruction"), 
    ("École de Francfort"), 
    ("Éléatisme"), 
    ("Empirisme"), 
    ("Épicurisme"), 
    ("Éthique minimale"), 
    ("Études post-coloniales"), 
    ("Évolutionnisme"), 
    ("Existentialisme"), 
    ("Féminisme"), 
    ("Hédonisme"), 
    ("Herméneutique"), 
    ("Humanisme"), 
    ("Idéalisme"), 
    ("Idéalisme allemand"), 
    ("Libéralisme"), 
    ("Libertarianisme"), 
    ("Libertarisme"), 
    ("Lumières"), 
    ("Marxisme"), 
    ("Matérialisme"), 
    ("Métaphysique"), 
    ("Moralisme"), 
    ("Néo-kantisme"), 
    ("Néo-platonisme"), 
    ("Pensée complexe"), 
    ("Pessimisme"), 
    ("Phénoménologie"), 
    ("Philosophie analytique"), 
    ("Platonisme"), 
    ("Politique"), 
    ("Pop-philosophie"), 
    ("Postmodernisme"), 
    ("Pragmatisme"), 
    ("Pyrrhonisme"), 
    ("Rationalisme"), 
    ("Réalisme"), 
    ("Scepticisme"), 
    ("Scolastique"), 
    ("Sensualisme"), 
    ("Socialisme"), 
    ("Socialisme libertaire"), 
    ("Socratisme"), 
    ("Sophistique"), 
    ("Stoïcisme"), 
    ("Structuralisme"), 
    ("Taoïsme"), 
    ("Théologie rationnelle"), 
    ("Thomisme"), 
    ("Transcendantalisme"), 
    ("Utilitarisme"), 
    ("Vitalisme");

INSERT INTO
    authors (
        known_name,
        first_name,
        last_name,
        period_id,
        philo_current_id,
        born_date,
        dead_date,
        era
    )
VALUES (
        "Socrates",
        null,
        null,
        1,
        53,
        "01/01/470",
        "01/01/399",
        "BCE"
    ),
     (
        "Descartes",
        "René",
        "Descartes",
        3,
        46,
       "02/31/1596",
        "02/11/1560",
        "CE"
    ), 
    (
        "Aristote",
        null,
        null,
        1,
        1,
         "01/01/384",
        "01/01/322",
        "BCE"
    ), 
    (
        "Marc Aurèle",
        "Marc",
        "Aurèle",
        1,
        55,
        "04/26/121",
        "03/17/180",
        "CE"
    ), 
    (
        "Luc Ferry",
        "Luc",
        "Ferry",
        3,
        41,
        "01/03/1951",
        "01/03/1951",
        "CE"
    ), 
    (
        "Schopenhauer",
        "Arthur",
        "Schopenhauer",
        3,
        37,
        "02/22/1788",
        "09/21/1860",
        "CE"
    ), 
    (
        "Héraclite",
        "Héraclite",
        "d'Éphèse",
        1,
        32,
        "01/01/544",
        "01/01/480",
        "BCE"
    ), 
    (
        "Confucius",
        null,
        null,
        1,
        5,
        "09/28/551",
        "04/11/479",
        "BCE"
    );

INSERT into
    phrases (
        phrase,
        author_id
    )
VALUES (
        "The unexamined life is not worth living",
        1
    ), (
        "Whereof one cannot speak, thereof one must be silent",
        2
    ), (
        "I think therefore I am",
        3
    ), (
        "2 The unexamined life is not worth living",
        5
    ), (
        "3 The unexamined life is not worth living",
        5
    ), (
        "4 The unexamined life is not worth living",
        5
    ), (
        "5 The unexamined life is not worth living",
        5
    ), (
        "6 The unexamined life is not worth living",
        3
    ), (
        "7 The unexamined life is not worth living",
        3
    ), (
        "8 The unexamined life is not worth living",
        3
    ), (
        "9 The unexamined life is not worth living",
        3
    ), (
        "10 The unexamined life is not worth living",
        3
    ), (
        "11 The unexamined life is not worth living",
        3
    ), (
        "12 The unexamined life is not worth living",
        3
    );

INSERT INTO
    events_phrases (event_id, phrase_id)
VALUES 
  (1, 1), 
  (9, 1), 
  (1, 2), 
  (4, 2), 
  (5, 2), 
  (9, 2), 
  (3, 3), 
  (5, 3), 
  (1, 4), 
  (2, 4), 
  (3, 4), 
  (5, 4), 
  (7, 5), 
  (9, 5), 
  (10, 6), 
  (1, 7), 
  (9, 7), 
  (1, 8), 
  (6, 8), 
  (1, 9), 
  (5, 9), 
  (6, 9), 
  (6, 10), 
  (6, 11), 
  (6, 12), 
  (10, 12),
  (8, 13), 
  (8, 14);
