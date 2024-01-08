<?php
require_once('models/addFavorisToAUser.php');

function ajoutFavoris(string $userLogin, string $idStation){

   if ($userLogin && $idStation) {
       addAFavStation($idStation, $userLogin);
   }
    $myUser = getUserWithHisPassword($userLogin)[0];
    $favs = getUserFavorite($myUser['userId']);
    $allStation = getAllStation();
    require('vues/userPage.php');
}
