import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Context } from "../..";
import "./Auth.scss"
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { REGISTER_ROUTE, LOGIN_ROUTE } from "../../utils/consts";

const Auth = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const {user} = useContext(Context);

    const click = async () => {
        try {
            let data
            if (isLogin) {
                data = await user.login(login, password)
            } else {
                data = await user.registration(login, password)
            }
            navigate('/')
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <div class="container">
            <h1>Регистрация | TODO</h1>
            <input
                value={login}
                type="text"
                placeholder='Логин'
                onChange={e => setLogin(e.target.value)}
            />
            <input
                value={password}
                type="password"
                placeholder='Пароль'
                onChange={e => setPassword(e.target.value)}
            />
            {isLogin ?
                <div>
                    Нет аккаунта? <NavLink to={REGISTER_ROUTE}>Зарегистрируйся</NavLink>
                </div>
                :
                <div>
                    Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войти</NavLink>
                </div>
            }
            {isLogin ?
                <div className="button-group">
                    <button onClick={click}>
                        Логин
                    </button>
                    <button className="inactive_button">
                        Регистрация
                    </button>
                </div>
                :
                <div className="button-group">
                    <button className="inactive_button">
                        Логин
                    </button>
                    <button onClick={click}>
                        Регистрация
                    </button>
                </div>
            }
            
            
        </div>
    );
}

export default observer(Auth)