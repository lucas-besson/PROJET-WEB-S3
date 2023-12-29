<?php

require_once('models/inscriptiondb.php');
require_once('controllers/connexion.php');
function inscriptionPage()
{
    $erreur = '';
        try {
            if (isset($_POST['UserID']) && isset($_POST['UserMail']) && isset($_POST['UserPassword']) && $_POST['UserMail'] && $_POST['UserID'] && $_POST['UserPassword']) {
                $userLogin = $_POST['UserID'];
                $userMail = $_POST['UserMail'];
                $userPassword = $_POST['UserPassword'];
                $success = addUser($userLogin,$userMail, $userPassword);
                if ($success) {
                    userPage($userMail, $userPassword);
                    exit;
                } else {
                    $erreur = "L'inscription n'a pas fonctionne";
                }
            }
        } catch (Exception $e) {
            $erreur = $e->getMessage();
        }
    require('vues/inscriptionPage.php');
}
?>
