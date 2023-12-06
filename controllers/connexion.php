<?php
require_once('./models/authentification.php');

function userPage(string $userMail, string $userPsw){
    $myUser = getUserWithHisPassword($user);
    /* vérifier mo de passe utilisateur*/
    require('./vues/templates/home.php');
}