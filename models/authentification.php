<?php
require_once('dbConnect.php');

function getUserWithHisPassword(): array
{
    $DB = connectToDB();
    $query = $DB->prepare(
        "SELECT * FROM utilisateur;"
    );
    $query->execute();
    $user = [];
    $row = $query->fetch();
    $user = [
        'userLogin'=>$row['id_utilisateur'],
        'userMail'=>$row['userMail'],
        'userPassword'=>$row['userPassword'],
        'isEnable'=>$row['isEnable']
    ];
    var_dump($user);
    return $user;
}
getUserWithHisPassword();

