import React, { useContext, useState } from 'react'
import { MyContext } from '../contexts/MyContext'

import styles from '../css/login.module.css'


function Login() {

    const { toggleNav, loginUser, isLoggedIn } = useContext(MyContext);

    const initialState = {
        userInfo: {
            email: '',
            password: '',
        },
        errorMsg: '',
        successMsg: '',
    }

    const [state, setState] = useState(initialState);

    // Функция для инпутов
    const onChangeValue = (e) => {
        setState({
            ...state,
            userInfo: {
                ...state.userInfo,
                [e.target.name]: e.target.value
            }
        });
    }

    // Вход в личный кабинет
    const submitForm = async (event) => {
        event.preventDefault();
        const data = await loginUser(state.userInfo);
        if (data.success && data.token) {
            setState({
                ...initialState,
            });
            localStorage.setItem('loginToken', data.token);
            await isLoggedIn();
        }
        // Если вход не успешен
        else {
            setState({
                ...state,
                successMsg: '',
                errorMsg: data.message
            });
        }
    }

    // Сообщения об ошибке или успехе
    let successMsg = '';
    let errorMsg = '';
    if (state.errorMsg) {
        errorMsg = <div className={`${styles['alert']} alert alert-danger`}>{state.errorMsg}</div>;
    }
    if (state.successMsg) {
        successMsg = <div className="success-msg">{state.successMsg}</div>;
    }


    return (
        <div className= {styles.loginBody}>
            <div className={styles.form}>
                <form onSubmit={submitForm} noValidate autoComplete="off">

                    <div className={`${styles['formHeader']} text-center`}>
                        Вход
                    </div>

                    <div className={styles.formBody}>

                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">📧</span>
                            <input name="email" type="email" className="form-control"
                                required placeholder="Электронная почта" aria-label="Useremail"
                                aria-describedby="basic-addon1" value={state.userInfo.email} onChange={onChangeValue} />
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon2">🔑</span>
                            <input name="password" type="password" className="form-control"
                                required placeholder="Пароль" aria-label="Password" aria-describedby="basic-addon2"
                                value={state.userInfo.password} onChange={onChangeValue} />
                        </div>

                        {errorMsg}    
                        {successMsg}

                        <button className={`${styles['btn']} btn`} type="submit">Войти</button>

                    </div>
                </form>

                <div className={styles.formFooter}>
                    <span>Еще не зарегистрированы? </span><button className={styles.link} type="button" onClick={toggleNav}>Регистрация</button>
                </div>
            </div>
        </div>
    );
}

export default Login;