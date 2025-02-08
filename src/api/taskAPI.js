import { $host, $authHost } from ".";
import jwtDecode from "jwt-decode"

export const createBoard = async(name) => {
    const {data} = await $authHost.post('api/board', {name},  { withCredentials: true })
    return data
}

export const deleteBoard = async(boardId) => {
    const {data} = await $authHost.delete('api/board/'+ boardId,  { withCredentials: true })
    return data
}

export const getOneBoard = async(id) => {
    const {data} = await $authHost.get('api/board/' + id)
    return data
}

export const getAllBoards = async() => {
    const {data} = await $authHost.get('api/board')
    return data
}

export const getStatuses = async() => {
    const {data} = await $authHost.get('api/status')
    return data
}

export const createTask = async(task) => {
    const {data} = await $authHost.post('api/task', task)
    return data
}

export const updateTask = async(task, id) => {
    const {data} = await $authHost.put('api/task/' + id, task)
    return data
}

export const getOneTask = async(id) => {
    const {data} = await $authHost.get('api/task/' + id)
    return data
}

export const deleteTask = async(id) => {
    const {data} = await $authHost.delete('api/task/' + id)
    return data
}

export const getAllTasks = async() => {
    const {data} = await $authHost.get('api/task')
    return data
}

export const addUserToBoard = async(boardId, userId) => {
    const {data} = await $authHost.post('api/board/' + boardId, {userId})
    return data
}

export const getAllBoardsByUserId = async(userId) => {
    const {data} = await $authHost.get('api/board/user/' + userId)
    return data
}