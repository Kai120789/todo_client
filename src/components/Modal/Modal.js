import React, { useContext, useState } from "react";
import styles from "./Modal.module.scss";
import { Context } from "../..";
import { deleteTask, getAllTasks } from "../../api/taskAPI";
import { useNavigate } from "react-router-dom";

const Modal = ({ tasksUpd, isOpen, onClose, oneTask, statuses }) => {
    const {task} = useContext(Context)

    const navigate = useNavigate()
    
    if (!isOpen || !oneTask) return null;

    const deleteT = async() => {
        try {
            await deleteTask(oneTask.id)
            onClose();
            const updatedTasks = await getAllTasks();
            task.setTasks(updatedTasks);
            tasksUpd(oneTask.boardId)
        } catch (error) {
            console.error("delete task error:", error);
            alert("Can't delete task");
        }
        
    }

    const statusName = statuses.find(status => status.id === oneTask.statusId)?.status || "Неизвестный статус";

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <h2 className={styles.title}>{oneTask.title}</h2>
                <p><strong>Описание:</strong> {oneTask.description}</p>
                <p><strong>Статус:</strong> {statusName}</p>
                <button onClick={onClose} className={styles.updButton}>Редактировать</button>
                <button onClick={onClose} className={styles.doneButton}>Завершить</button>
                <button onClick={deleteT} className={styles.delButton}>Удалить</button>
            </div>
        </div>
    );
};


export default Modal;
