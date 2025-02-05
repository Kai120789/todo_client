import React, { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import { createTask, getAllBoards, getAllBoardsByUserId, getAllTasks, getStatuses, deleteBoard } from "../../api/taskAPI";
import { Form } from "react-router-dom";
import {createBoard, addUserToBoard, getOneBoard} from "../../api/taskAPI"
import { jwtDecode } from "jwt-decode";
import BoardForm from "../../components/BoardForm/BoardForm";
import styles from "./Todo.module.scss"
import Tasks from "../../components/Tasks/Tasks";
import Header from "../../components/Header/Header";
import { observer } from "mobx-react-lite";

const Todo = () => {
    const {task, user} = useContext(Context)
    const [name, setName] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [userId, setUserId] = useState('')
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [showUserForm, setShowUserForm] = useState(false);
    const [showTasks, setShowTasks] = useState(false)
    const [activeBoardId, setActiveBoardId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            user.setUser(jwtDecode(token));
            user.setIsAuth(true);
        }
    })

    

    useEffect(() => {
        if (localStorage.getItem("token")) {
            Promise.all([
                setActiveBoardId(null),
                getStatuses().then(data => task.setStatuses(data)),
                getAllBoards().then(data => task.setBoards(data)),
                getAllTasks().then(data => {
                    task.setTasks(data);
                    localStorage.setItem("tasks", JSON.stringify(data));
                }),
                getAllBoardsByUserId(user.user.id).then(data => {
                    task.setBoardsIds(data);
                    return Promise.all(data.map(board => getOneBoard(board.boardId)));
                }).then(fetchedBoards => task.setUserBoards(fetchedBoards))
            ]).finally(() => setLoading(false));
        }
    }, [user.user.id]);

    

    const getUserTasks = async (boardId) => {
        const userTasks = task.tasks.filter(t => t.userId === user.user.id);
        const boardTasks = userTasks.filter(t => t.boardId === boardId)
        setShowTasks(boardTasks)
        setActiveBoardId(boardId);
    }

    const taskFunc = async () => {
        if (activeBoardId) {
            try {
                const newTask = await createTask({
                    title, 
                    description, 
                    boardId: activeBoardId, 
                    userId: user.user.id
                });
        
                task.setTasks([...task.tasks, newTask])
                setTitle("")
                setDescription("")
                setShowTaskForm(false)
                getUserTasks(activeBoardId)
    
            } catch (e) {
                
                alert(e.response?.data?.message)
            }
        } else {
            alert("board is not selected or unauthorized")
            setTitle("")
            setDescription("")
            setShowTaskForm(false)
        }
       
    }

    const userFunc = async () => {
        if (activeBoardId) {
            try {
                const user2Board = await addUserToBoard(activeBoardId, userId)
                setUserId("")
                setShowUserForm(false)
    
            } catch (e) {
                alert(e.response?.data?.message)
            }
        } else {
            alert("board is not selected or unauthorized")
            setUserId("")
            setShowUserForm(false)
        }
        
    }

    const delBoard = async () => {
        try {
            await deleteBoard(activeBoardId);
            task.setUserBoards(task.userBoards.filter(board => board.id !== activeBoardId));
            task.setBoards(task.boards.filter(board => board.id !== activeBoardId));
            setActiveBoardId(null);
            setShowTasks([]);
    
        } catch (e) {
            alert(e.response?.data?.message);
        }
    };
    

    const click = async () => {
        try {
            const newBoard = await createBoard(name)
            task.setBoards([...task.boards, newBoard]);
            const boardIds = await addUserToBoard(newBoard.id, user.user.id)

            const updatedBoards = await getAllBoardsByUserId(user.user.id);
            const fetchedBoards = await Promise.all(updatedBoards.map(board => getOneBoard(board.boardId)));
            task.setUserBoards(fetchedBoards);

            setName("");
            setShowForm(false);
        } catch (e) {
            alert(e.response?.data?.message)
        }
    }

    return (
        <>
            <Header />
            <section className={styles.container}>
                <div className={styles.boards}>
                    {!showForm? (
                        <button className={styles.button_todo} onClick={() => setShowForm(true)}>Добавить доску</button>
                    ) : (
                        <div>
                            <input
                                className={styles.input_todo}
                                value={name}
                                type="text"
                                placeholder="Название доски"
                                onChange={(e) => setName(e.target.value)}
                            />
                            <div className={styles.button_group}>
                                <button className={styles.button_todo_mini} onClick={click}>Создать</button>
                                <button className={styles.button_todo_mini} onClick={() => setShowForm(false)}>Отмена</button>
                            </div>
                        </div>
                    )}
                    {loading ? (
                        <p>Загрузка...</p>
                    ) : task.userBoards.length === 0 ? (
                        <p>У вас пока нет досок.</p>
                    ) : (
                        task.userBoards.map(board => (
                            <BoardForm 
                                onClick={() => getUserTasks(board.id)}
                                key={board.id} 
                                board={board} 
                                isActive={activeBoardId === board.id}>
                            </BoardForm>
                        ))
                    )}
                    
                    
                </div>
                
                <div className={styles.tasksContainer}>
                    <div className={styles.container_btn}>
                        {!showTaskForm ? (
                            <button className={styles.button_todo} onClick={() => setShowTaskForm(true)}>Добавить задачу</button>
                        ) : (
                            <div>
                                <input
                                    className={styles.input_todo}
                                    value={title}
                                    type="text"
                                    placeholder="Название задачи"
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <input
                                    className={styles.input_todo}
                                    value={description}
                                    type="text"
                                    placeholder="Описание задачи"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <div className={styles.button_group}>
                                    <button className={styles.button_todo_mini} onClick={taskFunc}>Создать</button>
                                    <button className={styles.button_todo_mini} onClick={() => setShowTaskForm(false)}>Отмена</button>
                                </div>
                            </div>
                        )}

                        {!showUserForm ? (
                            <button className={styles.button_todo} onClick={() => setShowUserForm(true)}>Добавить пользователя</button>
                        ) : (
                            <div>
                                <input
                                    className={styles.input_todo}
                                    value={userId}
                                    type="text"
                                    placeholder="ID пользователя"
                                    onChange={(e) => setUserId(e.target.value)}
                                />
                                <div className={styles.button_group}>
                                    <button className={styles.button_todo_mini} onClick={userFunc}>Добавить</button>
                                    <button className={styles.button_todo_mini} onClick={() => setShowUserForm(false)}>Отмена</button>
                                </div>
                            </div>
                        )}
                        {!activeBoardId?
                            <></>
                            :
                            <button className={styles.button_todo_del} onClick={delBoard}>Удалить доску</button>
                        }
                    </div>

                    <Tasks tasks={showTasks} />
                </div>

            </section>
        </>
        
    );
    
}

export default Todo