import React, { useState } from "react";
import styles from "./Tasks.module.scss";
import Modal from "../Modal/Modal";

const Tasks = ({ tasks }) => {
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
                    <p className={styles.task_title}>{task.title}</p>
                    <p className={styles.task_description}>{task.description}</p>
                </div>
            ))}
            <Modal isOpen={isModalOpen} onClose={closeModal} task={selectedTask} />
        </div>
    );
};

export default Tasks;
