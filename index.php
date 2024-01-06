<?php

require_once('controllers/connexion.php');
require_once('controllers/inscription.php');
require_once('controllers/home.php');
require_once('controllers/addFav.php');

session_start();
if (isset($_GET['action'])) {
    switch ($_GET['action']) {
        case 'deconnexion':
            session_destroy();
            homePage();
        case 'favoris':
            ajoutFavoris($_SESSION['login'], $_POST['gare']);
        case 'inscription':
            inscriptionPage();
            break;
        case 'connecter':
            try {
                if (isset($_POST['userName']) && isset($_POST['userPassword'])) {

                    $_SESSION['login'] = $_POST['userName'];

                    userPage($_POST['userName'], $_POST['userPassword']);
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
