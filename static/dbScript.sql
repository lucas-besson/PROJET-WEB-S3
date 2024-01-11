DROP TABLE IF EXISTS favoris;
DROP TABLE IF EXISTS gare;
DROP TABLE IF EXISTS utilisateur;

CREATE TABLE utilisateur (
    id_utilisateur INT AUTO_INCREMENT PRIMARY KEY,
    userLogin VARCHAR(255),
    userMail VARCHAR(255),
    userPassword VARCHAR(255),
    isEnable TINYINT(1)
);

CREATE TABLE gare (
    idGare INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    stop_id VARCHAR(255),
    stop_name VARCHAR(255),
    route_long_name VARCHAR(255)
);

CREATE TABLE favoris (
    idUtilisateurFav INT,
    idGareFav INT,
    FOREIGN KEY (idUtilisateurFav) REFERENCES utilisateur(id_utilisateur),
    FOREIGN KEY (idGareFav) REFERENCES gare(idGare)
);

SET GLOBAL local_infile=1;
SHOW VARIABLES LIKE 'local_infile';

LOAD DATA LOCAL INFILE '/Users/lucasbesson/Desktop/IUT_RDS/PERIODE-B/DEV-WEB/PROJET-WEB-S3/static/refs/arrets-db.csv'
    INTO TABLE gare
    FIELDS TERMINATED BY ';'
    ENCLOSED BY '"'
    LINES TERMINATED BY '\n'
    IGNORE 1 LINES
    (@pasdedata, route_long_name, @pasdedata, @pasdedata, stop_id, stop_name, @pasdedata, @pasdedata, @pasdedata, @pasdedata, @pasdedata, @pasdedata);

INSERT INTO utilisateur(id_utilisateur, userLogin, userMail,
                        userPassword, isEnable)
VALUES (1, 'admin', 'admin@admin.fr','admin', '1'),
       (2, 'client', 'client@client.fr','client', '1');

SELECT * FROM utilisateur;
SELECT * FROM favoris;
SELECT * FROM gare;