import React, { createContext, Component } from "react";
import axios from 'axios'
export const MyContext = createContext();

// Указываем базовый URL
const Axios = axios.create({
    baseURL: 'http://practice/',
});

class MyContextProvider extends Component {
    constructor() {
        super();
        this.isLoggedIn();
    }

    // Начальное состояние
    state = {
        showLogin: true,
        isAuth: false,
        theUser: null,
    }

    // Переход между страницами входа и регистрации
    toggleNav = () => {
        const showLogin = !this.state.showLogin;
        this.setState({
            ...this.state,
            showLogin
        })
    }

    // Выход из кабинета
    logoutUser = () => {
        localStorage.removeItem('loginToken');
        this.setState({
            ...this.state,
            isAuth: false
        })
    }

    registerUser = async (user) => {

        // Отправка запроса на регистрацию пользователя
        const register = await Axios.post('register.php', {
            name: user.name,
            surname: user.surname,
            patronymic: user.patronymic,
            phone: user.phone,
            email: user.email,
            password: user.password,
            password2: user.password2
        });

        return register.data;
    }


    loginUser = async (user) => {

        // Отправка запроса на авторизацию пользователя
        const login = await Axios.post('login.php', {
            email: user.email,
            password: user.password
        });
        return login.data;
    }

    // Проверяем залогинен ли пользователь
    isLoggedIn = async () => {
        const loginToken = localStorage.getItem('loginToken');

        // Проверяем есть ли токен
        if (loginToken) {

            //Добавление токена в заголовок по умолчанию
            Axios.defaults.headers.common['Authorization'] = 'bearer ' + loginToken;

            // Получение информации о пользователе
            const { data } = await Axios.get('user-info.php');

            // Если информация о пользователе получена успешно
            if (data.success && data.user) {
                this.setState({
                    ...this.state,
                    isAuth: true,
                    theUser: data.user
                });
            }

        }
    }

    render() {
        const contextValue = {
            rootState: this.state,
            toggleNav: this.toggleNav,
            isLoggedIn: this.isLoggedIn,
            registerUser: this.registerUser,
            loginUser: this.loginUser,
            logoutUser: this.logoutUser
        }
        return (
            <MyContext.Provider value={contextValue}>
                {this.props.children}
            </MyContext.Provider>
        )
    }

}

export default MyContextProvider;