<?php

require_once('controllers/connexion.php');
require_once('controllers/home.php');

try{
    if (isset($_GET['action']) == 'connexion') {
            userPage($_GET['userMail'],$_GET['userPassword']);
    } else {
        homePage();
    }
} catch (Exception $e){
    $errorMessage = $e->getMessage();
}