import { makeAutoObservable } from "mobx";
import AuthService from "../api/userAPI";
import axios from "axios";
import { $authHost } from "../api";
import { useContext } from "react";
import { Context } from "..";
import {jwtDecode} from "jwt-decode"

export default class UserStore {
    isAuth = !!localStorage.getItem("token");
    isLoading = false
    user = {}

    constructor() {
        
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

    setLoading(bool) {
        this.loading = bool;
    }

    async registration(login, password) {
        try {
            const response = await AuthService.registration(login, password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            this.setIsAuth(true);
            this.setUser(jwtDecode(response.data.accessToken));
            
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async login(login, password) {
        try {
            const response = await AuthService.login(login, password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            this.setIsAuth(true);
            this.setUser(jwtDecode(response.data.accessToken));
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async logout(login) {
        try {
            const response = await AuthService.logout(login);
            localStorage.removeItem('token');
            this.setIsAuth(false);
            this.setUser({});
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await $authHost.get(`${process.env.REACT_APP_API_URL}api/user/`, {withCredentials: true})
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setIsAuth(true);
        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }
}