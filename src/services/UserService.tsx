import $api from "../http";
import { AxiosResponse } from 'axios';
import { UserResponse } from "../models/response/UserResponse";

export default class UserService{    
    static async getUserData(): Promise <AxiosResponse<UserResponse>>{
        return $api.get<UserResponse>("/users/get-user-data");
    }

    static async updateUserData(username:String, email:String, image?: File): Promise <AxiosResponse<UserResponse>>{
        const formData = new FormData();
        formData.append('post', JSON.stringify({ "username": username, "email": email }));
        
        if (image) {
            formData.append('image', image);
        }

        return $api.put<UserResponse>('/users/update-user-data', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}