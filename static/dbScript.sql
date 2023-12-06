DROP TABLE IF EXISTS utilisateur;

CREATE TABLE utilisateur (
                             id_utilisateur INT AUTO_INCREMENT PRIMARY KEY,
                             userLogin VARCHAR(255),
                             userMail VARCHAR(255),
                             userPassword VARCHAR(255),
                             isEnable TINYINT(1)
);

INSERT INTO utilisateur(id_utilisateur, userLogin, userMail,
                        userPassword, isEnable)
VALUES (1, 'admin', 'admin@admin.fr','admin', '1'),
       (2, 'client', 'client@client.fr','client', '1');

SELECT * FROM utilisateur;