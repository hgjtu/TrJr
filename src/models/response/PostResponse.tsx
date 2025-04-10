export interface PostResponse {
    id: string;
    title: string;
    author: string;
    date: string;
    location: string;
    description: string;
    imageUrl: string;
    likes: Number;
    isLiked: Boolean;
}