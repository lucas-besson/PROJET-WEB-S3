<?php
require_once('models/authentification.php');

function userPage(string $userMail, string $userPsw){
    $users = getUserWithHisPassword($userMail);
    foreach ($users as $myUser) {
        if ($myUser['userMail'] == $userMail && $myUser['userPassword'] == $userPsw) {
            $favs = getUserFavorite($myUser['userLogin']);
            $allStation = getAllStation();
            require('vues/userPage.php');
        }
    }
    require('vues/homePage.php');
}
?>
