import React, { useRef } from 'react';
import '../css/login.css';
const url_login = "http://practice/login.php";

const sendData = async (url, data) => {

    const resp = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        header: {
            'Content-Type': 'application/json'
        }
    });
    console.log(resp);
    const json = await resp.json();
    console.log(json);
}


export default function Login(props) {

    const refEmail = useRef(null);
    const refPassword = useRef(null);

    const handleLogin = () => {
        const data = {
            "email": refEmail.current.value,
            "password": refPassword.current.value
        }
        sendData(url_login, data);
    }

    return (
        <div className="loginBody">
            <div className="form">
                <div className="formHeader text-center">
                    Вход
                </div>

                <div className="formBody">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">📧</span>
                        <input type="email" className="form-control" placeholder="Электронная почта"
                            aria-label="Useremail" aria-describedby="basic-addon1" ref={refEmail} />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon2">🔑</span>
                        <input type="password" className="form-control" placeholder="Пароль"
                            aria-label="Password" aria-describedby="basic-addon2" ref={refPassword} />
                    </div>

                    <button onClick={handleLogin} className="btn" type="button" > Войти </button>
                </div>

                <div className="formFooter">
                    <span>Еще не зарегистрированы? </span><a href="//http:">Регистрация!</a>
                </div>
            </div>
        </div>
    )
}