-- Active: 1688546505483@@127.0.0.1@3306@philosophical_vision

create table
    users (
        id int primary key auto_increment not null,
        firstname varchar(100) not null,
        lastname varchar(100) not null,
        email varchar(254) not null unique,
        password varchar(100) not null,
        avatar varchar(254) not null
    );

create table
    categories(
        id int primary key auto_increment not null,
        title varchar(249) not null,
        description VARCHAR(249)
    );

create table
    events (
        id int primary key auto_increment not null,
        title varchar(254) not null,
        category_id INT NOT NULL,
        FOREIGN KEY(category_id) REFERENCES categories(id)
    );

create table
    authors (
        id int PRIMARY KEY auto_increment not null,
        known_name varchar(100) not null,
        firstname varchar(100),
        lastname varchar(100),
        period varchar(100) not null,
        philo_current varchar(100) not null,
        born_date INT,
        dead_date INT,
        era varchar(50) not null
    );

create table
    phrases (
        id int primary key auto_increment not null,
        phrase varchar(254) not null,
        likes INT DEFAULT 0,
        dislikes INT DEFAULT 0,
        is_favorite TINYINT default 0,
        authors_id int not null,
        Foreign Key (authors_id) REFERENCES authors(id)
    );

create table
    users_phrases (
        id int primary key auto_increment not null,
        users_id int,
        phrases_id int,
        FOREIGN KEY(users_id) REFERENCES users(id),
        FOREIGN KEY(phrases_id) REFERENCES phrases(id)
    );

create table
    events_phrases (
        id int primary key auto_increment not null,
        events_id int,
        phrases_id int,
        FOREIGN KEY(events_id) REFERENCES events(id),
        FOREIGN KEY(phrases_id) REFERENCES phrases(id)
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
        avatar
    )
VALUES (
        "John",
        "Springfield",
        "john.springfield@springfield.com",
        "12345678",
        "default_avatar.png"
    ), (
        "Anna",
        "Springfield",
        "anna.springfield@springfield.com",
        "12345678",
        "default_avatar.png"
    ), (
        "Philip",
        "Gotham",
        "philip.gotham@gotham.com",
        "12345678",
        "default_avatar.png"
    ), (
        "Susan",
        "Gotham",
        "susan.gotham@gotham.com",
        "12345678",
        "default_avatar.png"
    ), (
        "Andrea",
        "Fritz",
        "andrea.fritz@fritz.com",
        "12345678",
        "default_avatar.png"
    ), (
        "Claude",
        "Liege",
        "claude.liege@liege.com",
        "12345678",
        "default_avatar.png"
    );

INSERT INTO
    authors (
        known_name,
        firstname,
        lastname,
        period,
        philo_current,
        born_date,
        dead_date,
        era
    )
VALUES (
        "Socrates",
        null,
        null,
        "Classical",
        "Socratic",
        469,
        399,
        "BCE"
    ), (
        "Ludwig",
        "Ludwig",
        "Wittgenstein",
        "20th Century",
        "Modern",
        1889,
        1951,
        "CE"
    ), (
        "Ludwig1",
        "Ludwig",
        "Wittgenstein",
        "20th Century",
        "Modern",
        1889,
        1951,
        "CE"
    ), (
        "Ludwig2",
        "Ludwig",
        "Wittgenstein",
        "20th Century",
        "Modern",
        1889,
        1951,
        "CE"
    ), (
        "Ludwig3",
        "Ludwig",
        "Wittgenstein",
        "20th Century",
        "Modern",
        1889,
        1951,
        "CE"
    ), (
        "Ludwig4",
        "Ludwig",
        "Wittgenstein",
        "20th Century",
        "Modern",
        1889,
        1951,
        "CE"
    ), (
        "Descartes",
        "René",
        "Descartes",
        "Modern",
        "Rationalism",
        1596,
        1650,
        "CE"
    ), (
        "Socrates1",
        null,
        null,
        "Classical",
        "Socratic",
        469,
        399,
        "BCE"
    ), (
        "Socrates2",
        null,
        null,
        "Classical",
        "Socratic",
        469,
        399,
        "BCE"
    ), (
        "Socrates3",
        null,
        null,
        "Classical",
        "Socratic",
        469,
        399,
        "BCE"
    );

INSERT into
    phrases (
        phrase,
        likes,
        dislikes,
        is_favorite,
        authors_id
    )
VALUES (
        "The unexamined life is not worth living",
        10,
        3,
        1,
        1
    ), (
        "Whereof one cannot speak, thereof one must be silent",
        3,
        10,
        0,
        2
    ), (
        "I think therefore I am",
        2,
        0,
        0,
        3
    ), (
        "The unexamined life is not worth living",
        0,
        15,
        0,
        5
    ), (
        "The unexamined life is not worth living",
        7,
        7,
        0,
        6
    );

INSERT INTO
    users_phrases (users_id, phrases_id)
VALUES (1, 3), (2, 3), (3, 2), (4, 2), (4, 4), (4, 5), (1, 1);



INSERT INTO
    events_phrases (events_id, phrases_id)
VALUES (1, 2), (1, 1), (3, 3), (2, 4), (3, 4), (7, 5), (4, 2), (6, 3);