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
    events (
        id int primary key auto_increment not null,
        title varchar(254) not null
    );

create table
    phrases (
        id int primary key auto_increment not null,
        phrase varchar(254) not null,
        author varchar(100) not null,
        period varchar(100) not null,
        philosophical_current varchar(100) not null,
        start_date INT,
        final_date INT,
        is_favorite TINYINT default 0
    );

create table
    like_dislikes (
        id int primary key auto_increment not null,
        likes int not null,
        dislikes int not null,
        users_id int,
        phrases_id int,
        FOREIGN KEY(users_id) REFERENCES users(id),
        FOREIGN KEY(phrases_id) REFERENCES phrases(id)
    );

create table
    categories(
        id int primary key auto_increment not null,
        theme varchar(249) not null
    );

create table
    events_phrases (
        id int primary key auto_increment not null,
        events_id int,
        phrases_id int,
        FOREIGN KEY(events_id) REFERENCES events(id),
        FOREIGN KEY(phrases_id) REFERENCES phrases(id)
    );

create table
    events_categories (
        id int primary key auto_increment not null,
        events_id int,
        categories_id int,
        FOREIGN KEY(events_id) REFERENCES events(id),
        FOREIGN KEY(categories_id) REFERENCES categories(id)
    );

INSERT into events (title)
VALUES (
        "Je viens de perdre mon travail"
    ), (
        "Je viens de perdre un proche"
    ), ("Je me sens triste"), (
        "Quelle est le sense de la vie"
    ), (
        "Mon Collège de travail parle mal de moi"
    ), (
        "Mes collègues parlent dans mon dos"
    ), ("Mon ami m'a trahi"), (
        "Je ne suis pas une bonne personne"
    ), ("Je veux disparaître"), ("Je veux mourir");

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

INSERT into
    phrases (
        phrase,
        author,
        period,
        philosophical_current,
        start_date,
        final_date,
        is_favorite
    )
VALUES (
        "The unexamined life is not worth living",
        "Socrates",
        "Classical",
        "Socratic",
        469,
        399,
        1
    ), (
        "Whereof one cannot speak, thereof one must be silent",
        "Ludwig Wittgenstein",
        "20th Century",
        "Modern",
        1889,
        1951,
        0
    ), (
        "I think therefore I am",
        "René Descartes",
        "Modern",
        "Rationalism",
        1596,
        1650,
        0
    ), (
        "The unexamined life is not worth living",
        "Socrates",
        "Classical",
        "Socratic",
        469,
        399,
        0
    ), (
        "The unexamined life is not worth living",
        "Socrates",
        "Classical",
        "Socratic",
        469,
        399,
        0
    );

INSERT INTO
    like_dislikes (
        likes,
        dislikes,
        users_id,
        phrases_id
    )
VALUES (0, 1, 1, 3), (2, 0, 2, 3), (3, 1, 3, 2), (3, 1, 4, 2), (3, 1, 4, 4), (3, 1, 4, 5), (0, 0, 1, 1);

INSERT INTO categories(theme)
VALUES ("Social"), ("Dead"), ("Live"), ("Sadness"), ("Joy"), ("Work"), ("Friends"), ("Family"), ("Money");

INSERT INTO
    events_phrases (events_id, phrases_id)
VALUES (1, 2), (1, 1), (3, 3), (2, 2), (3, 4), (7, 5), (4, 2), (6, 3);

INSERT INTO
    events_categories (events_id, categories_id)
VALUES (1, 2), (1, 1), (3, 3), (2, 5), (3, 7), (7, 3), (4, 9), (6, 8);