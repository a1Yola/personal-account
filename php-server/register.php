<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

function msg($success, $status, $message, $extra = [])
{
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message
    ], $extra);
}

// Подключение БД и создание объекта
require __DIR__ . '/classes/Database.php';
$db_connection = new Database();
$conn = $db_connection->dbConnection();

// Получение данных из формы
$data = json_decode(file_get_contents("php://input"));
$returnData = [];

// Если запрос выполнен не методом POST
if ($_SERVER["REQUEST_METHOD"] != "POST") :
    $returnData = msg(0, 404, 'Page Not Found!');

// Проверка пустых полей
elseif (
    !isset($data->name)
    || !isset($data->email)
    || !isset($data->surname)
    || !isset($data->patronymic)
    || !isset($data->phone)
    || !isset($data->password)
    || !isset($data->password2)
    || empty(trim($data->name))
    || empty(trim($data->email))
    || empty(trim($data->surname))
    || empty(trim($data->patronymic))
    || empty(trim($data->phone))
    || empty(trim($data->password))
    || empty(trim($data->password2))
) :

    $fields = ['fields' => ['name', 'surname', 'phone', 'email', 'password', 'password2']];
    $returnData = msg(0, 422, 'Не все поля заполнены!', $fields);

// Если проверка успешна
else :

    $name = trim($data->name);
    $email = trim($data->email);
    $surname = trim($data->surname);
    $patronymic = trim($data->patronymic);
    $phone = trim($data->phone);
    $password = trim($data->password);
    $password2 = trim($data->password2);

    // Валидация полей
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) :
        $returnData = msg(0, 422, 'Некорректно введен email!');

    elseif (strlen($password) < 5) :
        $returnData = msg(0, 422, 'Ваш пароль должен содержать не менее 5 символов!');

    elseif (strlen($name) < 2) :
        $returnData = msg(0, 422, 'Ваше имя должно содержать не менее 2 символов!');

    elseif (strlen($surname) < 2) :
        $returnData = msg(0, 422, 'Ваша фамилия должна содержать не менее 2 символов!');

    elseif (strlen((string)$phone) != 11) :
        $returnData = msg(0, 422, 'Ваш номер телефона должен содержать 11 цифр!');

    elseif ($password !== $password2) :
        $returnData = msg(0, 422, 'Пароли не совпадают!');

    else :
        try {

            $check_email = "SELECT `email` FROM `users` WHERE `email`=:email";
            $check_email_stmt = $conn->prepare($check_email);
            $check_email_stmt->bindValue(':email', $email, PDO::PARAM_STR);
            $check_email_stmt->execute();

            // Проверка на уникальность почты
            if ($check_email_stmt->rowCount()) :
                $returnData = msg(0, 422, 'Этот email уже используется!');

            else :
                $insert_query = "INSERT INTO `users` (`id`, `email`, `name`, `surname`, `patronymic`, `phone`, `password`) 
                VALUES (NULL, :email, :name, :surname, :patronymic, :phone, :password)";

                $insert_stmt = $conn->prepare($insert_query);

                // Привязка данных
                $insert_stmt->bindValue(':name', htmlspecialchars(strip_tags($name)), PDO::PARAM_STR);
                $insert_stmt->bindValue(':surname', htmlspecialchars(strip_tags($surname)), PDO::PARAM_STR);
                $insert_stmt->bindValue(':patronymic', htmlspecialchars(strip_tags($patronymic)), PDO::PARAM_STR);
                $insert_stmt->bindValue(':email', $email, PDO::PARAM_STR);
                $insert_stmt->bindValue(':phone', htmlspecialchars(strip_tags((string)$phone)), PDO::PARAM_STR);
                // Хешируем пароль
                $insert_stmt->bindValue(':password', password_hash($password, PASSWORD_DEFAULT), PDO::PARAM_STR);

                $insert_stmt->execute();

                $returnData = msg(1, 201, 'Регистрация прошла успешно!');

            endif;
        } catch (PDOException $e) {
            $returnData = msg(0, 500, $e->getMessage());
        }
    endif;

endif;

echo json_encode($returnData);
