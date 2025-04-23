import $api from "../http";
import { AxiosResponse } from 'axios';
import { UserResponse } from "../models/response/UserResponse";

export default class UserService{    
    static async getUserData(): Promise <AxiosResponse<UserResponse>>{
        return $api.get<UserResponse>("/users/get-user-data");
    }

    static async resetUserImage(): Promise <AxiosResponse<UserResponse>>{
        return $api.post<UserResponse>("/users/reset-user-image");
    }

    static async updateUserData(username:String, email:String, image?: File): Promise <AxiosResponse<UserResponse>>{
        const formData = new FormData();

        formData.append('user', new Blob([JSON.stringify({
            username,
            email,
        })], { type: 'application/json' }));
        
        if (image) {
            formData.append('image', image);
        }

        return $api.put<UserResponse>('/users/update-user-data', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
    
    static async changePassword(oldPassword: String, newPassword: String): Promise <AxiosResponse<Response>>{
        return $api.put<Response>("/users/change-password", {oldPassword, newPassword});
    }
}