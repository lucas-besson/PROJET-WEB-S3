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
            break;
        case 'favoris':
            if (isset($_SESSION['login']) && isset( $_POST['gare'])) {
                ajoutFavoris($_SESSION['login'], $_POST['gare']);
            }
            break;
        case 'inscription':
            inscriptionPage();
            break;
        case 'connecter':
            if (isset($_POST['userName']) && isset($_POST['userPassword']) && $_POST['userName'] && $_POST['userPassword']) {
                $_SESSION['login'] = $_POST['userName'];
                userPage($_POST['userName'], $_POST['userPassword']);
            } else {
                homePage();
            }
            break;
        default:
            homePage();
            break;
    }
} else {
    homePage();
}
