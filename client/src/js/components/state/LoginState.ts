interface ILogin {
    username:string,
    password:string
}

interface IRegister {
    firstname: string,
    lastname: string,
    email:string,
    username:string,
    password:string,
    passwordConfirm:string
}

interface ILoginState {
    login:ILogin,
    register:IRegister,
    error: { login: string, register: string };
}

class LoginState implements ILoginState {
    login: ILogin;
    register: IRegister;
    error: { login: string, register: string };
    constructor() {
        this.login = {
            username: '',
            password: '',
        }
        this.register = {
            firstname: '',
            lastname: '',
            email: '',
            username: '',
            password: '',
            passwordConfirm: ''
        }
        this.error = {
            login: '',
            register: ''
        }
    }
}

export default LoginState;