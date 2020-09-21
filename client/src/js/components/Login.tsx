import React, { Component } from 'react';
import '../../css/login.css';
import { Redirect } from 'react-router';

interface UpdateProps {
    updateValue: (value:string) => void
}

class InputItem extends Component<UpdateProps> {
    render() {
        return(
            <div className="login-input-item">
                <input 
                    type="text" 
                    maxLength={50}
                    onChange={(
                        ev: React.ChangeEvent<HTMLInputElement>,
                    ): void => this.props.updateValue(ev.target.value)}/>
            </div>
        )
    }
}

class PasswordItem extends Component<UpdateProps> {
    render() {
        return(
            <div className="login-input-item">
                <input 
                    type="password" 
                    maxLength={50}
                    onChange={(
                        ev: React.ChangeEvent<HTMLInputElement>,
                    ): void => this.props.updateValue(ev.target.value)}/>
            </div>
        )
    }
}

interface ILogin {
    username:string,
    password:string
}

interface IRegister {
    email:string,
    username:string,
    password:string,
    passwordConfirm:string
}

interface ILoginState {
    login:ILogin,
    register:IRegister,
    error: { login: string, register: string };
    redirect: boolean;
}

class LoginState implements ILoginState {
    login: ILogin;
    register: IRegister;
    error: { login: string, register: string };
    redirect: boolean;
    constructor() {
        this.login = {
            username: '',
            password: '',
        }
        this.register = {
            email: '',
            username: '',
            password: '',
            passwordConfirm: ''
        }
        this.error = {
            login: '',
            register: ''
        }
        this.redirect = false;
    }
}

function validateEmail(email:string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default class Login extends Component {
    state: LoginState;
    constructor(props:{}) {
        super(props);
        this.state = new LoginState();
    }
    updateLoginUsername = (a:string) => {
        this.setState({
            ...this.state,
            login: {
                ...this.state.login,
                username: a
            }
        });
    }
    updateLoginPassword = (a:string) => {
        this.setState({
            ...this.state,
            login: {
                ...this.state.login,
                password: a
            }
        });
    }
    updateRegisterEmail = (a:string) => {
        this.setState({
            ...this.state,
            register: {
                ...this.state.register,
                email: a
            }
        });
    }
    updateRegisterUsername = (a:string) => {
        this.setState({
            ...this.state,
            register: {
                ...this.state.register,
                username: a
            }
        });
    }
    updateRegisterPassword = (a:string) => {
        this.setState({
            ...this.state,
            register: {
                ...this.state.register,
                password: a
            }
        });
    }
    updateRegisterPasswordConfirm = (a:string) => {
        this.setState({
            ...this.state,
            register: {
                ...this.state.register,
                passwordConfirm: a
            }
        });
    }
    login = () => {
        if( 
            this.state.login.username === '' || 
            this.state.login.password === '') {
            this.setState({
                ...this.state,
                error: {
                    ...this.state.error,
                    login: 'Invalid username or password'
                }
            });
            return;
        }
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...this.state.login
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                this.setState({
                    ...this.state,
                    redirect: true
                });
            } else {
                this.setState({
                    ...this.state,
                    error: {
                        ...this.state.error,
                        login: data.error
                    }
                })
            }
        })
        .catch(error => {
            console.error('Error: ' +  error);
        })
    }
    register = () => {
        if(
            this.state.register.email === '' ||
            this.state.register.username === '' ||
            this.state.register.password === '' ||
            this.state.register.passwordConfirm === ''
        ) {
            this.setState({
                ...this.state,
                error: {
                    ...this.state.error,
                    register: 'Invalid input'
                }
            });
            return;
        }
        if(!validateEmail(this.state.register.email)) {
            this.setState({
                ...this.state,
                error: {
                    ...this.state.error,
                    register: 'Invalid email address'
                }
            });
            return;
        }
        if(
            this.state.register.password !==
            this.state.register.passwordConfirm
        ) {
            this.setState({
                ...this.state,
                error: {
                    ...this.state.error,
                    register: 'Passwords do no match'
                }
            });
            return;
        }
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...this.state.register
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                this.setState({
                    ...this.state,
                    redirect: true
                });
            } else {
                this.setState({
                    ...this.state,
                    error: {
                        ...this.state.error,
                        register: data.error
                    }
                })
            }
        })
        .catch(error => {
            console.error('Error: ' +  error);
        })
    }
    render() {
        return(
            <div>
                <div className="login-container">
                    <div className="login">
                        <div className="login-header">
                            LOGIN
                        </div>
                        <div className="login-input-container">
                            <div className="login-input-label">
                                <div className="login-input-label-inner">
                                    Username
                                </div>
                            </div>
                            
                            <InputItem updateValue={this.updateLoginUsername} />

                            <div className="login-input-label">
                                <div className="login-input-label-inner">
                                    Password
                                </div>
                            </div>
                            
                            <PasswordItem updateValue={this.updateLoginPassword} />

                        </div>
                        <div className="login-submit-container">
                            <div 
                                className="login-submit-button"
                                onClick={this.login}>
                                LOG IN
                            </div>
                        </div>
                        <div className="login-error">
                            {this.state.error.login}
                        </div>
                    </div>
                    <div className="register">
                        <div className="register-header">
                            REGISTER
                        </div>
                        <div className="login-input-container">
                            <div className="login-input-label">
                                <div className="login-input-label-inner">
                                    Email Address
                                </div>
                            </div>

                            <InputItem updateValue={this.updateRegisterEmail} />

                            <div className="login-input-label">
                                <div className="login-input-label-inner">
                                    Username
                                </div>
                            </div>

                            <InputItem updateValue={this.updateRegisterUsername} />

                            <div className="login-input-label">
                                <div className="login-input-label-inner">
                                    Password
                                </div>
                            </div>

                            <PasswordItem updateValue={this.updateRegisterPassword} />

                            <div className="login-input-label">
                                <div className="login-input-label-inner">
                                    Confirm Password
                                </div>
                            </div>
                            
                            <PasswordItem updateValue={this.updateRegisterPasswordConfirm} />

                        </div>
                        <div className="login-submit-container">
                            <div 
                                className="register-submit-button"
                                onClick={this.register}>
                                REGISTER
                            </div>
                        </div>

                        <div className="login-error">
                            {this.state.error.register}
                        </div>
                    </div>
                </div>
                {
                    this.state.redirect ?
                        <Redirect to="/profile" /> : null
                }
            </div>
        )
    }
}