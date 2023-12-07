<?php
require_once('models/authentification.php');

function userPage(string $userMail, string $userPsw){
    /*s$myUser = getUserWithHisPassword($userMail);
    if ($myUser['userMail']== $userMail && $myUser['userPassword']== $userPsw){
        require('vues/userPage.php');
    }*/

    /* vérifier mot de passe utilisateur*/
    require('vues/userPage.php');
}


