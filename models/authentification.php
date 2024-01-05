<?php
require_once('dbConnect.php');

function getUserWithHisPassword($userMail) :array
{
    $DB = connectToDB();
    $query = $DB->prepare(
        "SELECT * 
        FROM utilisateur
        WHERE userMail = ?;"
    );
    $query->execute([$userMail]);
    $users = [];

    while ($row = $query->fetch()) {
        $user = [
            'userLogin' => $row['id_utilisateur'],
            'userName' => $row['userLogin'],
            'userMail' => $row['userMail'],
            'userPassword' => $row['userPassword'],
            'isEnable' => $row['isEnable']
        ];

        $users[] = $user;
    }

    return $users;
}



function getUserFavorite($id): array
{
    $DB = connectToDB();
    $query = $DB->prepare(
        "SELECT G.nomGare, U.userLogin, U.id_utilisateur
         FROM utilisateur U
         INNER JOIN favoris F ON F.idUtilisateurFav = U.id_utilisateur
         INNER JOIN gare G ON G.idGare = F.idGareFav
         WHERE id_utilisateur = ? ;"
    );
    $query->execute([$id]);

    $favoris = [];
    while ($row = $query->fetch()) {
        $fav = [
            'gare' => $row['nomGare'],
            'name' => $row['userLogin']
        ];
        $favoris[] = $fav;
    }

    return $favoris;
}
/*
function getAllStation():array
{
    $DB = connectToDB();
    $query = $DB->prepare(
        "SELECT G.nomGare, U.userLogin, U.id_utilisateur
         FROM utilisateur U
         INNER JOIN favoris F ON F.idUtilisateurFav = U.id_utilisateur
         INNER JOIN gare G ON G.idGare = F.idGareFav
         WHERE id_utilisateur = ? ;"
    );
    $query->execute([$id]);

    $favoris = [];
    while ($row = $query->fetch()) {
        $fav = [
            'gare' => $row['nomGare'],
            'name' => $row['userLogin']
        ];
        $favoris[] = $fav;
    }

    return $favoris;
}
*/