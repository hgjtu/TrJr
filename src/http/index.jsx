import axios from "axios";

const API_URL = 'http://127.0.0.1:8010/api/v1';

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
}) 

export default $api;
