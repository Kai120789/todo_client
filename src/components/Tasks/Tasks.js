import React, { useContext } from "react";
import { Context } from "../..";
import styles from "./Tasks.module.scss"

const Tasks = ({tasks}) => {
    const {user} = useContext(Context);
    if (!tasks || tasks.length === 0) {
        return <p className={styles.task}>Задач нет</p>;
    }

    return (
        <div className={styles.tasks}>
            
            {(!tasks || tasks.length === 0) ?
                <p>Задач нет</p>
                :
                tasks.map(task => (
                <div className={styles.task_card} key={task.id}>
                    <p className={styles.task_title}>{task.title}</p>
                    <p className={styles.task_description}>{task.description}</p>
                </div>
            ))}
        </div>
            
            
    )
}

export default Tasks