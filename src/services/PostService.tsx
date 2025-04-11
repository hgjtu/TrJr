import $api from "../http";
import { AxiosResponse } from 'axios';
import { PostResponse } from "../models/response/PostResponse";

export default class PostService{    
    static async createPost(title: String, location: String, description: String, image?: File): Promise <AxiosResponse<PostResponse>>{
        const formData = new FormData();
        const postBlob = new Blob([JSON.stringify({
            title,
            location,
            description
        })], { type: 'application/json' });
        
        formData.append('post', postBlob);
        
        // formData.append('post', JSON.stringify({
        //     title,
        //     location,
        //     description
        // }));

        // formData.append('image', new Blob([JSON.stringify({
        //     image
        // })], { type: "multipart/form-data" }));
        
        if (image) {
            formData.append('image', image);
        }
    
        return $api.post<PostResponse>('/posts/create-post', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
    }
    static async getPostData(postID: String): Promise <AxiosResponse<PostResponse>>{
        return $api.get<PostResponse>(`/posts/get-post-data/${postID}`);
    }
    static async updatePostData(id: String, title: String, location: String, description: String, image?: File): Promise <AxiosResponse<PostResponse>>{
        const formData = new FormData();
        formData.append('post', new Blob([JSON.stringify({
            id, 
            title,
            location,
            description
        })], { type: "application/json" }));

        if (image) {
            formData.append('image', image);
        }

        return $api.put<PostResponse>('/posts/update-post-data', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
    static async deletePost(postID: String): Promise <AxiosResponse<Response>>{
        return $api.delete<Response>(`/posts/delete-post/${postID}`);
    }
    static async likePost(postID: String): Promise <AxiosResponse<Response>>{
        return $api.post<Response>(`/posts/like-post/${postID}`);
    }
    static async getPostsData(page: String, postsPerPage: String, sort: String, searchQuery: String): Promise <AxiosResponse<Response>>{
        return $api.get<Response>(`/posts/get-posts-data?page=${page}&limit=${postsPerPage}&sort=${sort}&search=${searchQuery}`);
    }
}