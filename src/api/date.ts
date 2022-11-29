import axios, {AxiosRequestConfig} from 'axios';
//http://localhost:3020
//https://task-four-back-end.herokuapp.com
export const $api = axios.create({
    baseURL: `http://localhost:3020`,
    withCredentials: true
});

$api.interceptors.request.use((config: AxiosRequestConfig) => {
    const app = localStorage.getItem('app');
    if (app) {
        const token = JSON.parse(app.toString()).auth.user.token;
        config.headers = {
            Authorization: `Bearer ${token}`
        }
    }
    return config;
});