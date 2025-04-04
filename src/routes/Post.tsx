import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import PostsService from "../services/PostsService";
import NotFound from '../routes/Errors';

function Post() {
    const { postID } = useParams() as { postID: string };
    const [post, setPost] = useState({
            id: '',
            name: '',
            description: '',
        });

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await PostsService.getPostData(postID);
            console.log(response.data)
            setPost(prevPost => ({
                ...prevPost,
                username: response.data.id,
                email: response.data.name,
                description: response.data.description,
            }));

        } catch (error) {
            console.error('Ошибка при загрузке данных поста:', error);
        }
    };

    if (post) {
        return (
            <div>
                <p>{post.name}</p>
                <p>{post.description}</p>
            </div>
        );
    }
    else {
        return <NotFound />;
    }
};
export default React.memo(Post);