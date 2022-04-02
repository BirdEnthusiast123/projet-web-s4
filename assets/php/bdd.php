<?php
include 'pdo.php';

$users = $pdo->query('SELECT * FROM user')->fetchAll();

echo json_encode($users);