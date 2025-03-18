import $api from "../http";
import { AxiosResponse } from 'axios';
import { AuthResponse } from "../models/response/AuthResponse";

export default class AuthService{
    static async login(username: String, password: String): Promise <AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>("/auth/sign-in", {username, password});
    }
}