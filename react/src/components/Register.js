import React, { useContext, useState } from 'react'
import { MyContext } from '../contexts/MyContext'

import styles from '../css/register.module.css'

function Register() {
    const { toggleNav, registerUser } = useContext(MyContext);
    const initialState = {
        userInfo: {
            email: '',
            name: '',
            surname: '',
            patronymic: '',
            phone: '',
            password: '',
            password2: '',
        },
        errorMsg: '',
        successMsg: '',
    }
    const [state, setState] = useState(initialState);

    // Отправка формы регистрации
    const submitForm = async (event) => {
        event.preventDefault();
        const data = await registerUser(state.userInfo);
        if (data.success) {
            setState({
                ...initialState,
                successMsg: data.message,
            });
        }
        // Если отправка не успешна
        else {
            setState({
                ...state,
                successMsg: '',
                errorMsg: data.message
            });
        }
    }

    // Функция на изменение инпутов
    const onChangeValue = (e) => {
        setState({
            ...state,
            userInfo: {
                ...state.userInfo,
                [e.target.name]: e.target.value
            }
        });
    }

    // Сообщения об ошибке или успехе
    let successMsg = '';
    let errorMsg = '';
    if (state.errorMsg) {
        errorMsg = <div className={`${styles['alert']} alert alert-danger`}>{state.errorMsg}</div>;
    }
    if (state.successMsg) {
        successMsg = <div className={`${styles['alert']} alert alert-success`}>{state.successMsg}</div>;
    }

    return (
        <div className= {styles.registerBody}>
            <div className={styles.form}>
                <form onSubmit={submitForm} noValidate autoComplete="off">

                    <div className={`${styles['formHeader']} text-center`}>
                        Регистрация
                    </div>

                    <div className={styles.formBody}>

                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">📧</span>
                            <input name="email" type="email" className="form-control"
                                required placeholder="Ваш email" aria-label="Useremail"
                                aria-describedby="basic-addon1" value={state.userInfo.email} onChange={onChangeValue} />
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon2">✏️</span>
                            <input name="name" type="text" className="form-control"
                                required placeholder="Ваше имя" aria-label="Username"
                                aria-describedby="basic-addon2" value={state.userInfo.name} onChange={onChangeValue} />
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon3">✏️</span>
                            <input name="surname" type="text" className="form-control"
                                required placeholder="Ваша фамилия" aria-label="Usersurname"
                                aria-describedby="basic-addon3" value={state.userInfo.surname} onChange={onChangeValue} />
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon4">✏️</span>
                            <input name="patronymic" type="text" className="form-control"
                                required placeholder="Ваше отчество" aria-label="Userpatronymic"
                                aria-describedby="basic-addon4" value={state.userInfo.patronymic} onChange={onChangeValue} />
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon5">☎️</span>
                            <input name="phone" type="phone" className="form-control"
                                required placeholder="Ваш номер телефона" aria-label="Userphone"
                                aria-describedby="basic-addon5" value={state.userInfo.phone} onChange={onChangeValue} />
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon6">🔑</span>
                            <input name="password" type="password" className="form-control"
                                required placeholder="Придумайте пароль" aria-label="Password" aria-describedby="basic-addon6"
                                value={state.userInfo.password} onChange={onChangeValue} />
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon7">🔑</span>
                            <input name="password2" type="password" className="form-control"
                                required placeholder="Подтвердите пароль" aria-label="Password2" aria-describedby="basic-addon7"
                                value={state.userInfo.password2} onChange={onChangeValue} />
                        </div>
                        
                        {errorMsg}    
                        {successMsg}

                        <button className={`${styles['btn']} btn`} type="submit">Зарегистрироваться</button>

                    </div>
                </form>

                <div className={styles.formFooter}>
                    <span>Уже есть аккаунт? </span><button className={styles.link} type="button" onClick={toggleNav}>Войти</button>
                </div>
            </div>
        </div>
    );
}

export default Register