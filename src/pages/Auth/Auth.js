import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Context } from "../..";
import { motion } from "framer-motion";
import styles from "./Auth.module.scss";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { REGISTER_ROUTE, LOGIN_ROUTE } from "../../utils/consts";

const Auth = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const { user } = useContext(Context);

    const click = async () => {
        try {
            let data
            if (isLogin) {
                data = await user.login(login, password)

            } else {
                data = await user.registration(login, password)
            }

            if (localStorage.getItem("token")) {
                navigate('/')
            } else {
                alert("uncorrect login or password")
                setLogin('')
                setPassword('')
            }

        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <section className={styles.wrapper}>
            <div className={styles.container}>
                <motion.h1
                    className={styles.main_text}
                    onClick={() => navigate('/')}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    TODO
                </motion.h1>
                <input
                    className={styles.input_log_pas}
                    value={login}
                    type="text"
                    placeholder='Логин'
                    onChange={e => setLogin(e.target.value)}
                />
                <input
                    className={styles.input_log_pas}
                    value={password}
                    type="password"
                    placeholder='Пароль'
                    onChange={e => setPassword(e.target.value)}
                />
                {isLogin ?
                    <div className={styles.is_login}>
                        Нет аккаунта? <NavLink to={REGISTER_ROUTE}>Зарегистрируйся</NavLink>
                    </div>
                    :
                    <div className={styles.is_login}>
                        Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войти</NavLink>
                    </div>
                }
                {isLogin ?
                    <div className={styles.button_group}>
                        <button onClick={click} className={styles.button_reg}>
                            Логин
                        </button>
                        <button className={styles.inactive_button}>
                            Регистрация
                        </button>
                    </div>
                    :
                    <div className={styles.button_group}>
                        <button className={styles.inactive_button}>
                            Логин
                        </button>
                        <button onClick={click} className={styles.button_reg}>
                            Регистрация
                        </button>
                    </div>
                }
            </div>
        </section>
    );
}

export default observer(Auth)
