export interface IUser{
    username: string;
    role: string;
    email: string;
}

export type UserField = keyof IUser;