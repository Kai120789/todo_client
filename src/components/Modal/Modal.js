import React, { useContext, useState } from "react";
import styles from "./Modal.module.scss";
import { Context } from "../..";
import { deleteTask, getAllTasks, updateTask } from "../../api/taskAPI";

const Modal = ({ tasksUpd, isOpen, onClose, oneTask, statuses }) => {
    const {task} = useContext(Context)

    const taskFunc = async () => {
        try {
            const newTask = await updateTask({
                title: oneTask.title,
                description: oneTask.description,
                boardId: oneTask.boardId,
                userId: oneTask.userId,
                statusId: 2,
            },  oneTask.id);
            onClose();
            const updatedTasks = await getAllTasks();
            task.setTasks(updatedTasks);
            tasksUpd(oneTask.boardId)
        } catch (e) {
            
            alert(e.response?.data?.message)
        }
       
    }
    
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
                <h2 className={oneTask.statusId === 2 ? styles.title2 : styles.title}>
                    {oneTask.title}
                </h2>
                <p><strong>Описание:</strong> {oneTask.description}</p>
                <p><strong>Статус:</strong> {statusName}</p>
                <button onClick={onClose} className={styles.updButton}>Редактировать</button>
                <button onClick={taskFunc} className={styles.doneButton}>Завершить</button>
                <button onClick={deleteT} className={styles.delButton}>Удалить</button>
            </div>
        </div>
    );
};


export default Modal;
