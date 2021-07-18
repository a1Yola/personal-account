<?php
require __DIR__ . '/../jwt/JWT.php';
require __DIR__ . '/../jwt/ExpiredException.php';
require __DIR__ . '/../jwt/SignatureInvalidException.php';
require __DIR__ . '/../jwt/BeforeValidException.php';

use \Firebase\JWT\JWT;

class JwtHandler
{
    protected $jwt_secrect;
    protected $token;
    protected $issuedAt;
    protected $expire;
    protected $jwt;

    public function __construct()
    {
        date_default_timezone_set('Europe/Moscow');
        $this->issuedAt = time();

        // Устанавливаем токен на 1 час
        $this->expire = $this->issuedAt + 3600;

        // Устанавливаем секретную подпись
        $this->jwt_secrect = "this_is_my_secrect";
    }

    // Кодируем токен
    public function _jwt_encode_data($iss, $data)
    {

        $this->token = array(
            //Добавление идентификатора к токену
            "iss" => $iss,
            "aud" => $iss,
            // Добавление текущей метки времени к токену
            "iat" => $this->issuedAt,
            // Срок действия токена
            "exp" => $this->expire,
            // Данные
            "data" => $data
        );

        $this->jwt = JWT::encode($this->token, $this->jwt_secrect);
        return $this->jwt;
    }

    protected function _errMsg($msg)
    {
        return [
            "auth" => 0,
            "message" => $msg
        ];
    }

    // Расшифровка токена
    public function _jwt_decode_data($jwt_token)
    {
        try {
            $decode = JWT::decode($jwt_token, $this->jwt_secrect, array('HS256'));
            return [
                "auth" => 1,
                "data" => $decode->data
            ];
        } catch (\Firebase\JWT\ExpiredException $e) {
            return $this->_errMsg($e->getMessage());
        } catch (\Firebase\JWT\SignatureInvalidException $e) {
            return $this->_errMsg($e->getMessage());
        } catch (\Firebase\JWT\BeforeValidException $e) {
            return $this->_errMsg($e->getMessage());
        } catch (\DomainException $e) {
            return $this->_errMsg($e->getMessage());
        } catch (\InvalidArgumentException $e) {
            return $this->_errMsg($e->getMessage());
        } catch (\UnexpectedValueException $e) {
            return $this->_errMsg($e->getMessage());
        }
    }
}
