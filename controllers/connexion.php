<?php
require_once('models/authentification.php');

function userPage(string $userMail, string $userPsw){
    $myUser = getUserWithHisPassword();
    var_dump($userMail);
    var_dump($userPsw);
    if ($myUser['userMail']== $userMail && $myUser['userPassword']== $userPsw){
        require('vues/userPage.php');
    }

    /* vérifier mot de passe utilisateur*/
    require('vues/homePage.php');
}


