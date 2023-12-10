<?php
require_once('dbConnect.php');

function getUserWithHisPassword($userMail): array
{
    $DB = connectToDB();
    $query = $DB->prepare(
        "SELECT * 
                FROM utilisateur
                WHERE userMail LIKE ?
                LIMIT 1;"
    );
    $query->execute([$userMail]);
    $row = $query->fetch();
    $user = [
        'userLogin'=>$row['id_utilisateur'],
        'userName'=>$row['userLogin'],
        'userMail'=>$row['userMail'],
        'userPassword'=>$row['userPassword'],
        'isEnable'=>$row['isEnable']
    ];
    return $user;
}

function getUserFavorite($userMail) : array
{
    $DB = connectToDB();
    $query = $DB->prepare(
        "SELECT G.nomGare, U.userLogin, U.userMail
                FROM utilisateur U
                INNER JOIN favoris F ON F.idUtilisateurFav = U.id_utilisateur
                INNER JOIN gare G ON G.idGare = F.idGareFav
                WHERE U.userMail LIKE ? ;"
    );
    $query->execute([$userMail]);
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

