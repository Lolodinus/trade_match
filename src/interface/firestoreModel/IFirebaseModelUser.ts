export type Roles = "USER" | "MODERATOR" | "ADMINISTRATOR";

export interface IFirebaseModelSingIn {
    email: string;
    password: string;
}

export interface IFirebaseModelCreateUser extends IFirebaseModelSingIn {
    login: string;
}

export interface IFirebaseModelUser {
    login: string;
    email: string;
    role: Roles;
}