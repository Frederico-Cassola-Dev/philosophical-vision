-- Active: 1688546505483@@127.0.0.1@3306@philosophical_vision

create table
    users (
        id int primary key auto_increment NOT NULL,
        firstname varchar(100) NOT NULL,
        lastname varchar(100) NOT NULL,
        email varchar(254) NOT NULL unique,
        password varchar(100) NOT NULL,
        is_admin TINYINT default 0
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
    );

create table periods (
     id int PRIMARY KEY auto_increment NOT NULL,
     title varchar(100) NOT NULL
    );

create table
    authors (
        id int PRIMARY KEY auto_increment NOT NULL,
        known_name varchar(100) NOT NULL,
        firstname varchar(100),
        lastname varchar(100),
        period_id int NOT NULL,
        philo_current varchar(100) NOT NULL,
        born_date varchar(100),
        dead_date varchar(100),
        era varchar(50) NOT NULL,
        FOREIGN KEY(period_id) REFERENCES periods(id)
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
        FOREIGN KEY(user_id) REFERENCES users(id),
        FOREIGN KEY(phrase_id) REFERENCES phrases(id)
        on delete cascade
    );

create table
    events_phrases (
        id int primary key auto_increment NOT NULL,
        event_id int,
        phrase_id int,
        FOREIGN KEY(event_id) REFERENCES events(id),
        FOREIGN KEY(phrase_id) REFERENCES phrases(id)
        on delete cascade
    );

INSERT INTO categories(title, description)
VALUES (
        "Social",
        "social bla bla bla"
    ), (
        "Dead",
        "Dead bla bla bla"
    ), ("Live", "Live bla bla bla"), (
        "Sadness",
        "Sadness bla bla bla"
    ), ("Joy", "Joy bla bla bla"), ("Work", "Work bla bla bla"), (
        "Friends",
        "Friends bla bla bla"
    ), (
        "Family",
        "Family bla bla bla"
    ), ("Money", "Money bla bla bla");

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
        firstname,
        lastname,
        email,
        password,
        is_admin
    )
VALUES (
        "John",
        "Springfield",
        "john.springfield@springfield.com",
       "$argon2id$v=19$m=65536,t=3,p=1$vmZ5cEJ0bV14hWy1OPv5gQ$wjUBwUERQn7MNyqJuUXBkXtNflzRXcxLRwKAE55VGHw",
        0
    ), (
        "Anna",
        "Springfield",
        "anna.springfield@springfield.com",
       "$argon2id$v=19$m=65536,t=3,p=1$vmZ5cEJ0bV14hWy1OPv5gQ$wjUBwUERQn7MNyqJuUXBkXtNflzRXcxLRwKAE55VGHw",
        0
    ), (
        "Philip",
        "Gotham",
        "philip.gotham@gotham.com",
       "$argon2id$v=19$m=65536,t=3,p=1$vmZ5cEJ0bV14hWy1OPv5gQ$wjUBwUERQn7MNyqJuUXBkXtNflzRXcxLRwKAE55VGHw",
        0
    ), (
        "Susan",
        "Gotham",
        "susan.gotham@gotham.com",
       "$argon2id$v=19$m=65536,t=3,p=1$vmZ5cEJ0bV14hWy1OPv5gQ$wjUBwUERQn7MNyqJuUXBkXtNflzRXcxLRwKAE55VGHw",
        0
    ), (
        "Andrea",
        "Fritz",
        "andrea.fritz@fritz.com",
       "$argon2id$v=19$m=65536,t=3,p=1$vmZ5cEJ0bV14hWy1OPv5gQ$wjUBwUERQn7MNyqJuUXBkXtNflzRXcxLRwKAE55VGHw",
        0
    ), (
        "admin",
        "admin",
        "admin@admin.com",
        "$argon2id$v=19$m=65536,t=3,p=1$vmZ5cEJ0bV14hWy1OPv5gQ$wjUBwUERQn7MNyqJuUXBkXtNflzRXcxLRwKAE55VGHw",
        1
    ), (
        "carlos",
        "cassola",
        "cfcassola@gmail.com",
        "$argon2id$v=19$m=65536,t=3,p=1$vmZ5cEJ0bV14hWy1OPv5gQ$wjUBwUERQn7MNyqJuUXBkXtNflzRXcxLRwKAE55VGHw",
        0
    );


INSERT INTO 
periods (
      title
    ) Values ( "Ancient"), ("Medieval"), ("Modern");

INSERT INTO
    authors (
        known_name,
        firstname,
        lastname,
        period_id,
        philo_current,
        born_date,
        dead_date,
        era
    )
VALUES (
        "Socrates",
        null,
        null,
        1,
        "Socratic",
        "11/11/1234",
        "12/01/2132",
        "BCE"
    ), (
        "Ludwig",
        "Ludwig",
        "Wittgenstein",
        3,
        "Modern",
        "14/04/923",
        "20/07/04",
        "CE"
    ), (
        "Ludwig1",
        "Ludwig",
        "Ludwig",
        3,
        "Modern",
        "14/04/923",
        "20/07/04",
        "CE"
    ), (
        "Ludwig2",
        "Ludwig",
        "Ludwig",
        3,
        "Modern",
        "14/04/923",
        "20/07/04",
        "CE"
    ), (
        "Ludwig3",
        "Ludwig",
        "Ludwig",
        3,
        "Modern",
        "14/04/923",
        "20/07/04",
        "CE"
    ), (
        "Ludwig4",
        "Ludwig",
        "Ludwig",
        3,
        "Modern",
        "14/04/923",
        "20/07/04",
        "CE"
    ), (
        "Descartes",
        "René",
        "Descartes",
        2,
        "Rationalism",
       "14/04/923",
        "14/04/923",
        "CE"
    ), (
        "Socrates1",
        null,
        null,
        1,
        "Socratic",
        "11/11/1234",
        "12/01/2132",
        "BCE"
    ), (
        "Socrates2",
        null,
        null,
        1,
        "Socratic",
        "11/11/1234",
        "12/01/2132",
        "BCE"
    ), (
        "Socrates3",
        null,
        null,
        1,
        "Socratic",
        "11/11/1234",
        "12/01/2132",
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
        6
    ), (
        "4 The unexamined life is not worth living",
        6
    ), (
        "5 The unexamined life is not worth living",
        6
    ), (
        "6 The unexamined life is not worth living",
        6
    ), (
        "7 The unexamined life is not worth living",
        6
    ), (
        "8 The unexamined life is not worth living",
        6
    ), (
        "9 The unexamined life is not worth living",
        6
    ), (
        "10 The unexamined life is not worth living",
        6
    ), (
        "11 The unexamined life is not worth living",
        6
    ), (
        "12 The unexamined life is not worth living",
        6
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
