import React from "react";
import styles from "./Modal.module.scss";

const Modal = ({ isOpen, onClose, task }) => {
    if (!isOpen || !task) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <h2>{task.title}</h2>
                <p>{task.description}</p>
                <p><strong>Статус:</strong> {task.statusId}</p>
                <button onClick={onClose} className={styles.closeButton}>Закрыть</button>
            </div>
        </div>
    );
};

export default Modal;
