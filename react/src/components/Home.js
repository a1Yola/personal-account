import React, { useContext } from 'react'
import { MyContext } from '../contexts/MyContext'

import styles from '../css/home.module.css'
// Импортируем компоненты входа и регистрации
import Login from './Login'
import Register from './Register'

function Home() {

    const { rootState, logoutUser } = useContext(MyContext);
    const { isAuth, theUser, showLogin } = rootState;

    // Если пользователь авторизован
    if (isAuth) {
        return (
            <div className={styles.homeBody}>

                <div className={styles.cabinetHeader}>
                    <button className={`${styles['btn']} btn`} onClick={logoutUser}>Выйти</button>
                </div>
                
                <div className={styles.userInfo}>

                    <div className={styles.img}><span role="img" aria-label="User Image">👦</span></div>
                    <div className={styles.infoData}>

                        <div className={styles.infoFirst}>
                            <div className={styles.userSurname}><span>Фамилия: </span>{theUser.surname}</div>
                            <div className={styles.userName}><span>Имя: </span>{theUser.name}</div>
                            <div className={styles.userPatr}><span>Отчество: </span>{theUser.patronymic}</div>
                        </div>

                        <div className={styles.infoSecond}>
                            <div className={styles.userEmail}><span>Email: </span>{theUser.email}</div>
                            <div className={styles.userPhone}><span>Телефон: </span>{theUser.phone}</div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
    // Выводим страницу входа или регистрации
    else if (showLogin) {
        return <Login />;
    }
    else {
        return <Register />;
    }

}

export default Home;