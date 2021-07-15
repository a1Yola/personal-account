<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");
$method = $_SERVER['REQUEST_METHOD'];

function conectionDB()
{

    $host = "127.0.0.1";
    $user = "mysql";
    $password = "mysql";
    $database = "practice";

    $connection = mysqli_connect($host, $user, $password, $database);

    if ($connection) {
        echo "";
    } else {
        echo 'Ошибка при подключении к базе данных!';
    }

    return $connection;
}
