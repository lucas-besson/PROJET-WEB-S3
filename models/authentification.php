<?php
require_once('dbConnect.php');

function getUserWithHisPassword($userName) :array
{
    $DB = connectToDB();
    $query = $DB->prepare(
        "SELECT * 
        FROM utilisateur
        WHERE userLogin = ?;"
    );
    $query->execute([$userName]);
    $users = [];

    while ($row = $query->fetch()) {
        $user = [
            'userId' => $row['id_utilisateur'],
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
        "SELECT DISTINCT G.stop_name, U.userLogin, U.id_utilisateur
         FROM utilisateur U
         INNER JOIN favoris F ON F.idUtilisateurFav = U.id_utilisateur
         INNER JOIN gare G ON G.idGare = F.idGareFav
         WHERE id_utilisateur = ? ;"
    );
    $query->execute([$id]);

    $favoris = [];
    while ($row = $query->fetch()) {
        $fav = [
            'gare' => $row['stop_name'],
            'name' => $row['userLogin']
        ];
        $favoris[] = $fav;
    }

    return $favoris;
}

function getAllStation():array
{
    $DB = connectToDB();
    $query = $DB->prepare(
        "SELECT stop_name
            FROM gare;"
    );
    $query->execute();

    $stations = [];
    while ($row = $query->fetch()) {
        $station = [
            'gare' => $row['stop_name']
        ];
        $stations[] =  $station;
    }

    return $stations;
}