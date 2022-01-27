export default class Auth {
    static login(token) {
        localStorage.setItem('token', token)
    }
    static logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('customer')
        localStorage.removeItem('assessment')
    }
    static isAuthenticated() {
        const token = localStorage.getItem('token')
        if (token) {
            return true
        } else {
            return false
        }
    }
    static getToken() {
        return localStorage.getItem('token')
    }
    static setToken(token) {
        localStorage.setItem('token', token)
    }
}
