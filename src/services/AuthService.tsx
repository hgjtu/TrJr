import $api from "../http";
import { AxiosResponse } from 'axios';
import { AuthResponse } from "../models/response/AuthResponse";

export default class AuthService{
    static async login(username: String, password: String): Promise <AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>("/auth/sign-in", {username, password});
    }

    static async registration(username: String, email: String, password: String): Promise <AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>("/auth/sign-up", {username, email, password});
    }

    static async checkSession(): Promise <AxiosResponse<Response>>{
        return $api.get<Response>("/users/check-session");
    }

    static async logout(): Promise <void>{
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        window.location.reload();
    }
}