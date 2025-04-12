import $api from "../http";
import { AxiosResponse } from 'axios';
import { ImageResponse } from "../models/response/ImageResponse";

export default class PostService{   
    static async getImage(imageName: String): Promise <AxiosResponse<ImageResponse>>{
        return $api.get<ImageResponse>(`/images/${imageName}`, {
            responseType: 'blob'
          });;
    }
}