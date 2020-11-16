interface IUser {
    first_name: string,
    last_name: string,
    username: string,
    created_on: string,
    email: string,
    verified: boolean,
    profile: string
}

export default class User implements IUser {
    first_name: string;
    last_name: string;
    username: string;
    created_on: string;
    email: string;
    verified: boolean;
    profile: string;
    constructor() {
        this.first_name = '';
        this.last_name = '';
        this.username = '';
        this.created_on = '';
        this.email = '';
        this.verified = false;
        this.profile = '';
    }
}