import React, { useState } from "react";
import styles from "./Tasks.module.scss";
import Modal from "../Modal/Modal";

const Tasks = ({ tasksUpd, tasks, statuses }) => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
    };

    if (!tasks || tasks.length === 0) {
        return <p className={styles.task}>Задач нет</p>;
    }

    return (
        <div className={styles.tasks}>
            {tasks.map(task => (
                <div 
                    className={styles.task_card} 
                    key={task.id} 
                    onClick={() => openModal(task)}
                >
                    <p className={task.statusId === 2 ? styles.task_title2 : task.statusId === 1 ? styles.task_title : styles.task_title3}>
                        {task.title}
                    </p>
                    <p className={styles.task_description}>{task.description}</p>
                </div>
            ))}
            <Modal tasksUpd={tasksUpd} isOpen={isModalOpen} onClose={closeModal} oneTask={selectedTask} statuses={statuses} />
        </div>
    );
};

export default Tasks;
