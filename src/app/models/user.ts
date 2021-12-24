export class User {
    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    get username(): string {
        return this.username;
    }

    set username(username: string) {
        this.username = username;
    }

    get password(): string {
        return this.password;
    }

    set password(password: string) {
        this.password = password;
    }
}