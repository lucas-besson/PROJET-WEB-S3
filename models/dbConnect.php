<?php

function connectToDB(): PDO
{
    $userName = 'lbesson4';
    $userPassword = '2609';
    try {
        $DB = new PDO('mysql:host=localhost;dbname=BDD-PROJET-WEB-S3;charset=utf8;port=8889;', $userName, $userPassword);
    } catch (Exception $e) {
       die('Erreur : '.$e->getMessage());
    } 
    return $DB;
}