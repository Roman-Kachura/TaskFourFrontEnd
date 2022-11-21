import axios, {AxiosRequestConfig} from 'axios';

export const $api = axios.create({
    baseURL: process.env.NODE_ENV !== 'development' ? 'https://task-four-back-end.herokuapp.com/' : `http://localhost:3020/`,
    withCredentials: true
});

$api.interceptors.request.use((config: AxiosRequestConfig) => {
    const app = localStorage.getItem('app');
    if (app) {
        const token = JSON.parse(app.toString()).auth.user.accessToken;
        config.headers = {
            Authorization: `Bearer ${token}`
        }
    }
    return config;
});