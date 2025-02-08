import React from "react";
import styles from "./Modal.module.scss";

const Modal = ({ isOpen, onClose, task, statuses }) => {
    if (!isOpen || !task) return null;

    const statusName = statuses.find(status => status.id === task.statusId)?.status || "Неизвестный статус";

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <h2 className={styles.title}>{task.title}</h2>
                <p><strong>Описание:</strong> {task.description}</p>
                <p><strong>Статус:</strong> {statusName}</p>
                <button onClick={onClose} className={styles.updButton}>Редактировать</button>
                <button onClick={onClose} className={styles.doneButton}>Завершить</button>
                <button onClick={onClose} className={styles.delButton}>Закрыть</button>
            </div>
        </div>
    );
};


export default Modal;
