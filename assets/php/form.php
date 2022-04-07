<?php

include 'pdo.php';

$username = htmlspecialchars($_POST['username']);
$password = password_hash(
    htmlspecialchars($_POST['password']),
    PASSWORD_BCRYPT,
);

/*
 * password_verify($passwordAVerifier, $hash);
 */

// Vérification de la qualité des données en typage et en longueur
try {
    // Changement de session en fonction de l'user
    session_start();
    $_SESSION["user_session"]=$username; 

    $statement = $pdo->prepare("INSERT INTO user ('username', 'password') VALUES (:username, :password)");
    $statement->bindValue('username', $username);
    $statement->bindValue('password', $password);
    $statement->execute();

    header('Location: http://localhost:8000');



} catch (PDOException $exception) {
    var_dump($exception->getMessage());
}