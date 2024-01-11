<?php

function connectToDB(): PDO
{
    $userName = 'root';
    $userPassword = '';
    try {
        $DB = new PDO('mysql:host=localhost;dbname=bdd_projet_web;charset=utf8;', $userName, $userPassword);
    } catch (Exception $e) {
        die('Erreur : '.$e->getMessage());
    }
    return $DB;
}