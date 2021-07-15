<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");
$method = $_SERVER['REQUEST_METHOD'];
include "connection.php";
$mysqli = conectionDB();

$JSONData = file_get_contents("php://input");
$dataObject = json_decode($JSONData);
$mysqli->set_charset('utf8');

$useremail = $dataObject->email;
$pas =  $dataObject->password;
setcookie("cookie_log", '');

if ($query1 = $mysqli->prepare("SELECT * FROM users WHERE email = ?")) {
  $query1->bind_param('s', $useremail);
  $query1->execute();
  $resultado = $query1->get_result();
  if ($resultado->num_rows == 1) {
    $datos = $resultado->fetch_assoc();
    $encriptado_db = $datos['password'];
    if /*(password_verify($pas, $encriptado_db))*/(!empty($query2 = $mysqli->query("SELECT * FROM users WHERE email = '.$useremail.' AND users.password = '.$pas.'"))) {
    setcookie("cookie_log", $datos['id'], time()+60/**60*24*/);
      echo json_encode(array('connection' => true, 'email' => $datos['email'], 'phone' => $datos['phone'],  'name' => $datos['name'], 'id' => $datos['id'], 'surname' => $datos['surname']));
    } else {

      echo json_encode(array('connection' => false, 'error' => 'Пароль неверный! Пожалуйста, попробуйте еще раз!'));
    }
  } else {
    echo json_encode(array('connection' => false, 'error' => 'Указанная почта неверна! Пожалуйста попробуйте еще раз!'));
  }
  $query1->close();
} else {
  echo json_encode(array('connection' => false, 'error' => 'Не удалось подключиться к БД!'));
}
// }
$mysqli->close();
