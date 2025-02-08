import React, { useContext, useState } from "react";
import styles from "./Modal.module.scss";
import { Context } from "../..";
import { deleteTask, getAllTasks, updateTask } from "../../api/taskAPI";

const Modal = ({ tasksUpd, isOpen, onClose, oneTask, statuses }) => {
    const {task} = useContext(Context)
    const [showInputs, setShowInputs] = useState(false)
    const [newTitle, setNewTitle] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [newStatusId, setNewStatusId] = useState('')

    const cleanInputs = async () => {
        setNewTitle('')
        setNewDescription('')
        setNewStatusId(null)
        setShowInputs(false)
    }

    const taskFunc = async () => {
        try {
            if (oneTask.statusId === 1) {
                const newTask = await updateTask({
                    title: oneTask.title,
                    description: oneTask.description,
                    boardId: oneTask.boardId,
                    userId: oneTask.userId,
                    statusId: 2,
                },  oneTask.id);
            } else {
                const newTask = await updateTask({
                    title: oneTask.title,
                    description: oneTask.description,
                    boardId: oneTask.boardId,
                    userId: oneTask.userId,
                    statusId: 1,
                },  oneTask.id);
            }
            
            onClose();
            const updatedTasks = await getAllTasks();
            task.setTasks(updatedTasks);
            tasksUpd(oneTask.boardId)
        } catch (e) {
            
            alert(e.response?.data?.message)
        }
       
    }

    const updTaskFunc = async () => {
        try {
            const newTask = await updateTask({
                title: (newTitle === '')? oneTask.title : newTitle,
                description: (newDescription === '')? oneTask.description : newDescription,
                boardId: oneTask.boardId,
                userId: oneTask.userId,
                statusId: (newStatusId === null)? oneTask.statusId : newStatusId,
            },  oneTask.id);
            
            cleanInputs()
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
                
                {!showInputs?
                    <div>
                        <h2 className={oneTask.statusId === 2 ? styles.title2 : oneTask.statusId === 1 ? styles.title : styles.title3}>
                            {oneTask.title}
                        </h2>
                        <p><strong>Описание:</strong> {oneTask.description}</p>
                        <p><strong>Статус:</strong> {statusName}</p>
                        <button onClick={() => setShowInputs(true)} className={styles.updButton}>Редактировать</button>
                        {oneTask.statusId !== 2?
                            <button onClick={taskFunc} className={styles.doneButton}>Завершить</button>
                            :
                            <button onClick={taskFunc} className={styles.doneButton}>Вернуть</button>
                        }
                        <button onClick={deleteT} className={styles.delButton}>Удалить</button>
                    </div>

                    
                    :
                    <div>
                        <h2>Название:</h2>
                        <input 
                            className={oneTask.statusId === 2 ? styles.title2_input : oneTask.statusId === 1 ? styles.title_input : styles.title3_input} 
                            placeholder={oneTask.title}
                            value={newTitle}
                            type="text"
                            onChange={(e) => setNewTitle(e.target.value)}
                        >
                            
                        </input>
                        <p><strong>Описание:</strong></p>
                        <input 
                            className={styles.upd_input} 
                            placeholder={oneTask.description}
                            value={newDescription}
                            type="text"
                            onChange={(e) => setNewDescription(e.target.value)}
                        >
                            
                        </input>
                        <p><strong>Статус:</strong></p>
                        <select 
                            className={styles.upd_input} 
                            value={newStatusId} 
                            onChange={(e) => setNewStatusId(e.target.value)}
                        >
                            {statuses.map((status) => (
                                <option key={status.id} value={status.id}>
                                    {status.status}
                                </option>
                            ))}
                        </select>
                        <button onClick={updTaskFunc} className={styles.mini_button}>Сохранить</button>
                        <button onClick={cleanInputs} className={styles.mini_button}>Отменить</button>

                    </div>
                }
            </div>
        </div>
    );
};


export default Modal;
