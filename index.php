<?php

require_once('controllers/connexion.php');
require_once('controllers/inscription.php');
require_once('controllers/home.php');

if (isset($_GET['action'])) {
    $action = $_GET['action'];
    switch ($action) {
        case 'inscription':
            inscriptionPage();
            break;
        case 'connecter':
            try {
                if (isset($_POST['userMail']) && isset($_POST['userPassword']) && $_POST['userMail'] && $_POST['userPassword']) {
                    userPage($_POST['userMail'], $_POST['userPassword']);
                } else {
                    homePage();
                }
            } catch (Exception $e) {
                $errorMessage = $e->getMessage();
            }
        default:
            homePage();
            break;
    }
} else {
    homePage();
}
