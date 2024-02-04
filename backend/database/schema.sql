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
      role_id int not null default 2,
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
        "Vie",
        "L'état caractérisé par la croissance, la reproduction, la réponse à l'environnement et parfois la conscience ou la subjectivité."
        ), 
        (
        "Mort",
        "La cessation permanente des fonctions vitales d'un être vivant, marquée par l'arrêt du fonctionnement du corps ou de la conscience."
        ), 
        (
        "Relations",
        "Interactions entre individus, impliquant souvent des liens émotionnels et sociaux."
        ),
        (
        "Caractère",
        "Ensemble des traits distinctifs et des comportements moraux qui définissent une personne."
        ), 
        (
        "Amour",
        "Un état complexe d'attachement, de préoccupation et de soin envers autrui."
        ), 
        (
        "Plasirs",
        "Expériences agréables ou satisfaisantes, souvent liées au bien-être et à la jouissance."
        ), 
        (
        "Mariage",
        " Institution sociale et contractuelle où deux personnes s'engagent à partager leur vie de manière intime et légale."
        ), 
        (
        "Personnalité",
        "Configuration unique de traits psychologiques et comportementaux qui caractérise un individu."
        ), 
        (
        "Tristesse",
        "Émotion souvent associée à la perte, à la déception ou à d'autres expériences négatives."
        ), 
        (
        "Philosophie",
        "Discipline intellectuelle qui explore des questions fondamentales sur la réalité, la connaissance, la morale et l'existence."
        ), 
        (
        "Fortuna",
        " Le concept de chance ou de hasard, souvent discuté en relation avec le destin et la fortune."
        ), 
        (
        "Apprendre",
        " Processus d'acquisition de connaissances, de compétences et de compréhension."
        ), 
        (
        "Problèmes",
        " Défis ou difficultés qui nécessitent une résolution ou une réflexion approfondie."
        ), 
        (
        "Attitude",
        "Orientation mentale ou émotionnelle envers un objet, une personne ou une situation."
        ), 
        (
        "Joie",
        "Émotion positive et agréable, souvent associée à des expériences heureuses."
        ),
        (
        "Travail",
        "Activité réalisée en échange d'une rémunération, mais aussi source de réalisation personnelle et d'accomplissement."
        ), (
        "Amitié",
        "Relation étroite entre des individus basée sur l'affection, la confiance et le soutien mutuel."
        ), 
        (
        "Famille",
        "Unité sociale fondamentale, souvent liée par des liens de parenté, partageant des responsabilités et des relations affectives."
        ), 
        (
        "Argent",
        "Moyen d'échange et de mesure de la valeur, souvent lié à des considérations économiques et sociales."
        );

INSERT into events (title, category_id)
VALUES (
        "Je viens de perdre mon travail", 
        16
        ), 
        (
        "Faire de nouveaux amis"
        ,3
        ), 
        (
        "Je viens de perdre un proche"
        ,18
        ), 
        (
        "Résoudre un conflit"
        ,3
        ), 
        (
        "Avoir une conversation significative avec un proche"
        ,18
        ), 
        (
        "Faire preuve de compassion envers quelqu'un dans le besoin"
        ,4
        ), 
        (
        "Prendre une décision morale difficile"
        ,4
        ), 
        (
        "Montrer de la persévérance face à l'adversité"
        ,4
        ), 
        (
        "Exprimer des sentiments amoureux"
        ,5
        ), 
        (
        "Soutenir un être cher dans les moments difficiles"
        ,5
        ), 
        (
        "Je me sens triste",
        9
        ), 
        (
        "Quelle est le sense de la vie"
        ,1
        ), 
        (
        "Mon Collège de travail parle mal de moi"
        ,16
        ), 
        (
        "Mes collègues parlent dans mon dos"
        ,16
        ), 
        ("Mon ami m'a trahi",
        3
        ), 
        (
        "Je ne suis pas une bonne personne"
        ,4
        ), 
        (
        "Savourer un repas délicieux",
        6
        ), 
        (
        "Écouter de la musique relaxante",
        6
        ), 
        (
        "Pratiquer un hobby apprécié",
        6
        ), 
        (
        "Célébrer un mariage",
        7
        ), 
        (
        "Discuter des projets d'avenir en couple",
        7
        ), 
        (
        "Résoudre des problèmes familiaux ensemble.",
        7
        ), 
        (
        "Réagir de manière caractéristique à une situation",
        8
        ), 
        (
        "Démontrer des qualités personnelles telles que l'empathie ou le leadership",
        8
        ), 
        (
        "Faire face à la perte d'un proche",
        9
        ), 
        (
        "Surmonter une déception personnelle",
        9
        ), 
        (
        "Soutenir quelqu'un en deuil",
        9
        ), 
        (
        "Participer à un débat philosophique",
        10
        ), 
        (
        "Remettre en question ses propres croyances",
        10
        ), 
        (
        "Étudier des textes philosophiques",
        10
        ), 
        (
        "Gagner à la loterie",
        11
        ), 
        (
        "Rencontrer une opportunité inattendue",
        11
        ), 
        (
        "Faire face à des revers de fortune",
        11
        ), 
        (
        "Acquérir de nouvelles compétences au travail",
        12
        ), 
        (
        "Étudier pour un examen",
        12
        ), 
        (
        "Découvrir quelque chose de nouveau chaque jour",
        12
        ), 
        (
        "Trouver des solutions à des problèmes au travail",
        13
        ), 
        (
        "Résoudre des désaccords interpersonnels",
        13
        ), 
        (
        "Gérer des difficultés financières",
        13
        ), 
        (
        " Adopter une attitude positive face à un défi",
        14
        ), 
        (
        "Changer son point de vue après une discussion",
        14
        ), 
        (
        "Maintenir une perspective optimiste",
        14
        ), 
        (
        "Célébrer un événement heureux",
        15
        ), 
        (
        "Passer du temps avec des amis proches",
        15
        ), 
        (
        "Accomplir un objectif important",
        15
        ), 
        (
        "Aller au bureau tous les jours",
        16
        ), 
        (
        "Collaborer avec des collègues sur un projet",
        16
        ), 
        (
        "Atteindre des objectifs professionnels",
        16
        ), 
        (
        "Organiser une soirée avec des amis",
        17
        ), 
        (
        "Offrir un soutien à un ami en difficulté",
        17
        ), 
        (
        "Partager des moments de rire et de détente",
        17
        ), 
        (
        "Célébrer des occasions spéciales en famille",
        18
        ), 
        (
        "Aider un membre de la famille dans le besoin",
        18
        ), 
        (
        "Partager des repas ensemble",
        18
        ), 
        (
        "Économiser pour un achat important",
        19
        ), 
        (
        "Gérer un budget",
        19
        ), 
        (
        "Investir dans des projets financiers",
        19
        ), 
        (
        "Je veux disparaître",
        2
        ), 
        (
        "Je veux mourir",
        2
        );

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
        "0470-01-01",
        "0399-01-01",
        "BCE"
    ),
     (
        "Descartes",
        "René",
        "Descartes",
        3,
        46,
       "1596-02-31",
        "1560-02-11",
        "CE"
    ), 
    (
        "Aristote",
        null,
        null,
        1,
        1,
         "0384-01-01",
        "0322-01-01",
        "BCE"
    ), 
    (
        "Marc Aurèle",
        "Marc",
        "Aurèle",
        1,
        55,
        "0121-04-26",
        "0180-03-17",
        "CE"
    ), 
    (
        "Luc Ferry",
        "Luc",
        "Ferry",
        3,
        41,
        "1951-01-03",
        "1951-01-03",
        "CE"
    ), 
    (
        "Schopenhauer",
        "Arthur",
        "Schopenhauer",
        3,
        37,
        "1788-02-22",
        "1860-09-21",
        "CE"
    ), 
    (
        "Héraclite",
        "Héraclite",
        "d'Éphèse",
        1,
        32,
        "0544-01-01",
        "0480-01-01",
        "BCE"
    ), 
    (
        "Confucius",
        null,
        null,
        1,
        5,
        "0551-09-28",
        "0479-04-11",
        "BCE"
    );

INSERT into
    phrases (
        phrase,
        author_id
    )
VALUES (
        "“Si vous avez un ennemi, asseyez-vous au bord de la rivière et attendez. Tôt ou tard, vous verrez passer son cadavre.”",
        8
    ), (
        "“Celui qui ne croit pas que l'incroyable peut se produire ne trouvera pas la vérité.”",
        7
    ), (
        "“Tout coule.”",
        7
    ), (
        "“Exigez beaucoup de vous-même et attendez peu des autres. Vous éviterez ainsi bien des tracas.”",
        8
    ), (
        "“Ce que l'homme supérieur cherche, c'est en lui-même. Ce que le petit homme cherche, c'est dans les autres.”",
        8
    ), (
        "“Il est inutile d'essayer d'aider ceux qui ne s'aident pas eux-mêmes.”",
        8
    ), (
        "“Pourquoi s'inquiéter de la mort ? La vie a tellement de problèmes que nous devons les résoudre en premier lieu.”",
        8
    ), (
        "“On ne peut pas changer le vent, mais on peut ajuster les voiles du bateau pour aller où l'on veut.”",
        8
    ), (
        "“Qui ne se préoccupe pas de l'avenir lointain, se condamne aux soucis immédiats.”",
        8
    ), (
        "“Il n'existe pas de méthode simple pour résoudre les problèmes difficiles.”",
        2
    ), (
        "“Mon conseil est de se marier. Si vous avez une bonne femme, vous serez heureux et si vous avez une mauvaise femme, vous deviendrez philosophe, ce qui est excellent pour l'homme.”",
        1
    ), (
        "“La manière d'acquérir une bonne réputation réside dans l'effort d'être ce que vous voulez paraître.”",
        1
    ), (
        "“Il est généralement conseillé de manifester son intelligence par ce que l'on tait plutôt que par ce que l'on dit. La première alternative est la sagesse, la seconde est la vanité.”",
        6
    ), (
        "“Il n'y a pas de rose sans épines. Mais il y a beaucoup d'épines sans roses.”",
        6
    ), (
        "“Comment une personne cruelle envers les animaux peut-elle être une bonne personne?”",
        6
    ), (
        "“Entre les hommes, il n'y a, par nature, que de l'indifférence; mais entre les femmes, déjà par nature, il y a de l'inimitié.”",
        6
    ), (
        "“Il n'y a qu'une seule erreur innée, celle de croire que nous existons pour être heureux.”",
        6
    ), (
        "“Nous ne nous rendons compte des jours heureux de notre vie que lorsqu'ils ont fait place à des jours malheureux.”",
        6
    );

INSERT INTO
    events_phrases (event_id, phrase_id)
VALUES 
  (1, 9), 
  (1, 8), 
  (1, 7), 
  (3, 3), 
  (4, 1), 
  (5, 9), 
  (5, 3), 
  (6, 8), 
  (6, 9), 
  (6, 10), 
  (6, 11), 
  (6, 12), 
  (6, 2), 
  (7, 4), 
  (7, 5), 
  (8, 8), 
  (8, 1), 
  (8, 3), 
  (8, 14), 
  (8, 13), 
  (9, 5), 
  (9, 7), 
  (10, 6), 
  (10, 12), 
  (12, 8), 
  (16, 15),
  (25, 3), 
  (26, 2), 
  (26, 5), 
  (38, 7), 
  (40, 2), 
  (40, 3), 
  (40, 4), 
  (41, 5), 
  (42, 18), 
  (45, 4), 
  (45, 7), 
  (59, 7);
