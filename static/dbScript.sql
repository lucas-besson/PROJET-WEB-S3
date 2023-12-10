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
    nomGare VARCHAR(255),
    idGare INT AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE favoris (
    idUtilisateurFav INT,
    idGareFav INT,
    FOREIGN KEY (idUtilisateurFav) REFERENCES utilisateur(id_utilisateur),
    FOREIGN KEY (idGareFav) REFERENCES gare(idGare)
);

INSERT INTO utilisateur(id_utilisateur, userLogin, userMail,
                        userPassword, isEnable)
VALUES (1, 'admin', 'admin@admin.fr','admin', '1'),
       (2, 'client', 'client@client.fr','client', '1');

INSERT INTO gare(nomGare) VALUES ('Charles de Gaules Etoile');
INSERT INTO gare(nomGare) VALUES ('Auber');
INSERT INTO gare(nomGare) VALUES ('La Défense');

INSERT INTO favoris(idUtilisateurFav, idGareFav) VALUES (1, 1);
INSERT INTO favoris(idUtilisateurFav, idGareFav) VALUES (1, 2);
INSERT INTO favoris(idUtilisateurFav, idGareFav) VALUES (2, 3);

SELECT * FROM utilisateur;
SELECT * FROM favoris;
SELECT * FROM gare;

SELECT G.nomGare, U.userLogin, U.id_utilisateur
FROM utilisateur U
INNER JOIN favoris F ON F.idUtilisateurFav = U.id_utilisateur
INNER JOIN gare G ON G.idGare = F.idGareFav
WHERE u.id_utilisateur = 1;
