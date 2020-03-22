export interface User {
    name: string;
    email: string;
    _id: string;
}

export interface UpdateUser extends Pick<User, Exclude<keyof User, "_id">> {
    
};