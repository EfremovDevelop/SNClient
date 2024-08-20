import { useNavigate } from "react-router-dom"

class ApiManager {
    async get(endpoint) {
        return this.request(endpoint, 'GET');
    }

    async post(endpoint, data) {
        return this.request(endpoint, 'POST', data);
    }

    async request(endpoint, method, body = null) {
        const token = localStorage.getItem('token');

        const response = await fetch(`${endpoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: token ? `Bearer ${token}` : '',
            },
            body: body ? JSON.stringify(body) : null,
        });

        if (response.status === 401) {
            // Обработка 401 ошибки и перенаправление на страницу входа
            const navigate = useNavigate();
            navigate("/login");
            throw new Error('Unauthorized');
        }

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    }
}

export default new ApiManager();