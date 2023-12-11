<?php
require_once('models/authentification.php');

function userPage(string $userMail, string $userPsw){
    $myUser = getUserWithHisPassword($userMail);
    if ($myUser['userMail']== $userMail && $myUser['userPassword']== $userPsw){
        $favs = getUserFavorite($myUser['userLogin']);
        require('vues/userPage.php');
    }
    require('vues/homePage.php');
}


