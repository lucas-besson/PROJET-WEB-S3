<?php
require_once('dbConnect.php');

function addUser($userLogin,$userMail, $userPassword): bool
{
    $DB = connectToDB();
    $query = $DB->prepare(
        "INSERT INTO utilisateur (userLogin,userMail,userPassword, isEnable)
        VALUES (?, ?,?, 1)"
    );

    $success = $query->execute([$userLogin,$userMail, $userPassword]);
    return $success;
}