import ApiManager from '../api/ApiManager';

class UserService {

    async login(login, password) {
        try {
            const data = await ApiManager.post('/login', { login, password });

            if (data.token) {
                localStorage.setItem('token', data.token);
                return null
            } else {
                throw new Error("Токен не найден в ответе");
            }
        } catch (error) {
            console.error("Ошибка логина:", error);
            return error.message;
        }
    }

    logout() {
        localStorage.removeItem('token');
    }
}

export default UserService;