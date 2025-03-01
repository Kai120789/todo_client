import { $host, $authHost } from "./index";

export default class AuthService {
    static async login(login, password) {
        return $host.post('api/user/login', {login, password})
    }

    static async registration(login, password) {
        return $host.post('api/user/registration', {login, password})
    }

    static async logout(login) {
        return $authHost.delete('api/user/logout', { data: { login } })
    }

}
