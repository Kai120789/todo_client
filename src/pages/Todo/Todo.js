import React, { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import { getAllBoards, getAllBoardsByUserId, getAllTasks, getStatuses } from "../../api/taskAPI";
import { Form } from "react-router-dom";
import {createBoard, addUserToBoard, getOneBoard} from "../../api/taskAPI"
import "./Todo.scss"
import { jwtDecode } from "jwt-decode";

const Todo = () => {
    const {task, user} = useContext(Context)
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
        user.setUser(jwtDecode(token));
        user.setIsAuth(true);
        }
        Promise.all([
            getStatuses().then(data => task.setStatuses(data)),
            getAllBoards().then(data => task.setBoards(data)),
            getAllTasks().then(data => {
                task.setTasks(data);
                localStorage.setItem("tasks", JSON.stringify(data));
            }),
            getAllBoardsByUserId(user.user.id).then(data => 
                task.setBoardsIds(data),
                
            ),
            
        ]).finally(() => setLoading(false));
    }, []);

    const userTasks = task.tasks.filter(t => t.userId === user.user.id);
    const userBoards = task.boardsIds.map(boardId => getOneBoard(boardId.boardId))
    task.setUserBoards(userBoards)

    console.log(task)

    const click = async () => {
        try {
            const newBoard = await createBoard(name)
            task.setBoards([...task.boards, newBoard]);
            const boardIds = await addUserToBoard(newBoard.id, user.user.id)
            setName("");
            setShowForm(false);
        } catch (e) {
            alert(e.response?.data?.message)
        }
    }

    return (
        <div>
            {!showForm ? (
                <button onClick={() => setShowForm(true)}>Добавить доску</button>
            ) : (
                <div>
                    <input
                        value={name}
                        type="text"
                        placeholder="Название доски"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button onClick={click}>Создать</button>
                    <button onClick={() => setShowForm(false)}>Отмена</button>
                    {userBoards.map(board =>
                        <div key={board.id}>{board.name}</div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Todo