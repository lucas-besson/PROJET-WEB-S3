<?php
require_once('./models/dbConnect.php');

function getUserWithHisPassword(string $userMail): array
{
    $DB = connectToDB();
    $query = $DB->prepare(
        /* Mettre la requêtes*/
    );
    $query->execute([$userMail]);
    
    $user = [];
    $row = $query->fetch()
    $user = [
        'userLogin'=>$row['login'],
        'userMail'=>$row['email'],
        'userPassword'=>$row['password'],
        'isEnable'=>$row['isEnable']
    ];
    return $user;
}