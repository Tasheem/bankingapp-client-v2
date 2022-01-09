export class User {
    public username: string | undefined;
    public password: string | undefined;
    public firstName: string | undefined;
    public lastName: string | undefined;
    public email: string | undefined;
    public gender: string | undefined;
    public preferredPronoun: string | undefined;
    public birthday: string | undefined;
    
    constructor(username?: string, password?: string) {
        this.username = username;
        this.password = password;
    }
}

export interface IUser {
    username: string | undefined;
    password: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
    gender: string | undefined;
    preferredPronoun?: string;
    birthday: string | undefined;
}