import $api from "../http";
import { AxiosResponse } from 'axios';
import { UserResponse } from "../models/response/UserResponse";

export default class AuthService{    
    static async getUserData(): Promise <AxiosResponse<UserResponse>>{
        return $api.get<UserResponse>("/users/get-user-data");
    }

    static async updateUserData(username:String, email: String): Promise <AxiosResponse<UserResponse>>{
        return $api.put<UserResponse>("/users/update-user-data", {username, email});
    }

    static async deleteUserProfile(username:String): Promise <AxiosResponse<Response>>{
        return $api.delete<Response>(`/users/delete-user/${username}`);
    }

}