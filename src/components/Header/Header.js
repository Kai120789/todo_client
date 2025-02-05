import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { Context } from "../..";

const Header = () => {
    const navigate = useNavigate();
    const { user } = useContext(Context);

    const logoutUser = async () => {
        try {
            await user.logout(user.user.login);
            localStorage.removeItem("token");
            user.setIsAuth(false);
            user.setUser({});
            
            navigate("/login");
        } catch (error) {
            console.error("Ошибка при выходе:", error);
            alert("Произошла ошибка при выходе. Попробуйте снова.");
        }
    };

    return (
        <header className={styles.header}>
            <div className={styles.logo}>TODO</div>
            {user.isAuth && localStorage.getItem("token") ? (
                <div className={styles.authButtons}>
                    <p className={styles.user_text}>{user.user?.login || "Гость"}</p>
                    <button className={styles.button} onClick={logoutUser}>Выйти</button>
                </div>
            ) : (
                <div className={styles.authButtons}>
                    <button className={styles.button} onClick={() => navigate("/login")}>Войти</button>
                    <button className={styles.button} onClick={() => navigate("/registration")}>Зарегистрироваться</button>
                </div>
            )}
        </header>
    );
};

export default Header;
