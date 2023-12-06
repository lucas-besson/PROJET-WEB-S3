<?php
require_once('models/dbConnect.php');

function getUserWithHisPassword(string $userMail): array
{
    $DB = connectToDB();
    $query = $DB->prepare(
        "SELECT * FROM utilisateur"
    );
    $query->execute();

    
    $user = [];
    $row = $query->fetch();
    $user = [
        'userLogin'=>$row['login'],
        'userMail'=>$row['email'],
        'userPassword'=>$row['password'],
        'isEnable'=>$row['isEnable']
    ];
    echo($user);
    return $user;
}