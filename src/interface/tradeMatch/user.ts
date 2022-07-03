export type Roles = "USER" | "MODERATOR" | "ADMINISTRATOR"

export interface IUser {
    login: string;
    role: Roles;
}