<?php

require_once('controllers/connexion.php');
require_once('controllers/home.php');

try{
    if (isset($_GET['connexion']) && $_GET['userMail'] !== '') {
        userPage($_GET['userMail']);
    } else {
        homePage();
    }
} catch (Exception $e){
    $errorMessage = $e->getMessage();
}