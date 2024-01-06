<?php
require_once('dbConnect.php');

function addAFavStation($station, $userLogin): bool
{
    $DB = connectToDB();
    $query = $DB->prepare(
"INSERT INTO favoris(idGareFav, idUtilisateurFav)
    VALUES (?, ?);"
    );
    if($query->execute([getFunctionId($station) , getUserId($userLogin)])){
        return true;
    }
   return false;
}

function getUserId($login): int{
    $DB = connectToDB();
    $query = $DB->prepare(
        "SELECT id_utilisateur
        FROM utilisateur
        WHERE userLogin = ?"
    );
    $query->execute([$login]);
    $row = $query->fetch();
    $id = [
        'utilisateur' => $row['id_utilisateur']
    ];
    return $id['utilisateur'];
}

function getFunctionId($station): int{
    $DB = connectToDB();
    $query = $DB->prepare(
        "SELECT idGare
        FROM gare
        WHERE stop_name = ?"
    );
    $query->execute([$station]);
    $row = $query->fetch();
    $id = [
        'station' => $row['idGare']
    ];
    return $id['station'];
}