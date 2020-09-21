interface IUser {
    id: string,
    username: string,
    password: string,
    email: string,
    creationDate: number
}

export default class User implements IUser {
    id: string;
    username: string;
    password: string;
    email: string;
    creationDate: number;
    constructor(
        id:string,
        username:string,
        password:string,
        email:string
    ) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.creationDate = Date.now();
    }
}