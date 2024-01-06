<?php
require_once('models/authentification.php');

function userPage(string $userName, string $userPsw){

    $users = getUserWithHisPassword($userName);
    foreach ($users as $myUser) {
        if ($myUser['userName'] == $userName && $myUser['userPassword'] == $userPsw) {
            $favs = getUserFavorite($myUser['userId']);

            $allStation = getAllStation();
            require('vues/userPage.php');
        }
    }
    require('vues/homePage.php');
}
