import React, { useContext } from "react";
import { Context } from "../..";
import styles from "./BoardForm.module.scss";
import { motion } from "framer-motion";

const BoardForm = ({ board, onClick, isActive }) => {
    const { user, task } = useContext(Context);

    return (
        <motion.div
            onClick={onClick}
            className={`${styles.board_form} ${isActive ? styles.active : ''}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <p className={styles.board_text}>{board.name}</p>
        </motion.div>
    );
}

export default BoardForm;
