import $api from "../http";
import { AxiosResponse } from 'axios';
import { PostResponse } from "../models/response/PostResponse";

export default class PostService{    
    static async getPostData(postID: String): Promise <AxiosResponse<PostResponse>>{
        return $api.get<PostResponse>(`/posts/get-post-data/${postID}`);
    }
}