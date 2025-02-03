import { makeAutoObservable } from "mobx";

export default class TaskStore {

    constructor() {
        this.statuses = []
        this.boards = []
        this.tasks = []
        this.boardsIds = []
        this.userBoards = []
        this.selectedBoard = {}
        this.selectedTask = {}
        makeAutoObservable(this)
    }

    setStatuses(statuses) {
        this.statuses = statuses
    }

    setBoards(boards) {
        this.boards = boards
    }

    setBoardsIds(boardsIds) {
        this.boardsIds = boardsIds
    }

    setUserBoards(userBoards) {
        this.userBoards = userBoards
    }

    setTasks(tasks) {
        this.tasks = tasks
    }

    setSelectedBoard(board) {
        this.board = board
    }

    setSelectedTask(task) {
        this.task = task
    }

    getStatuses() {
        return this.statuses
    }

    getBoards() {
        return this.boards
    }

    getBoardsIds() {
        return this.boardsIds
    }

    getUserBoards() {
        return this.userBoards
    }

    getTasks() {
        return this.tasks 
    }

    getSelectedBoard() {
        return this.board
    }

    getSelectedTask() {
        return this.task
    }
}