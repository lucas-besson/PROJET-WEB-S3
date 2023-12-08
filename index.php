<?php

require_once('controllers/connexion.php');
require_once('controllers/home.php');

session_start();
$userMail= isset($_POST['userMail'])?($_POST['userMail']):'';
$userPassword= isset($_POST['userPassword'])?($_POST['userPassword']):'';
userPage($userMail,$userPassword);
//session_destroy();
/*
try{
    if ($userMail) {
            userPage($userMail,$userPassword);
    } else {
        homePage();
    }
} catch (Exception $e){
    $errorMessage = $e->getMessage();
}*/