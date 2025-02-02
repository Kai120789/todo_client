import { makeAutoObservable } from "mobx";

export default class UserStore {
    constructor() {
        this.isAuth = true
        this.user = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this.isAuth = bool
    }

    setUser(user) {
        this.user = user
    }

    getIsAuth() {
        return this.isAuth
    }

    getUser() {
        return this.user
    } 
}