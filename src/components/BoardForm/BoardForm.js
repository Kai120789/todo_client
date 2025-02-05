import React, { useContext } from "react";
import { Context } from "../..";
import styles from "./BoardForm.module.scss";

const BoardForm = ({ board, onClick, isActive }) => {
    const { user, task } = useContext(Context);

    return (
        <div onClick={onClick} className={`${styles.board_form} ${isActive ? styles.active : ''}`}>
            <p className={styles.board_text}>{board.name}</p>
        </div>
    );
}

export default BoardForm;
