<?php
require_once('models/authentification.php');

function userPage(string $userMail, string $userPsw){
    $myUser = getUserWithHisPassword($user);
    /* vérifier mot de passe utilisateur*/
    require('vues/userPage.php');
}