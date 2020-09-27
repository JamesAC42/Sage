import React, { Component } from 'react';
import '../../css/login.css';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import validateEmail from '../validateEmail';

import LoginState from './state/LoginState';
import { InputItem, PasswordItem } from './InputItem';
import { sessionActions } from '../actions/actions';

interface LoginProps {
    session : {
        loggedin: boolean
    },
    login: () => {}
}

const mapStateToProps = (state: any, props: any) => ({
    session: state.session
})

const mapDispatchToProps = {
    login: sessionActions.login
}

class LoginBind extends Component<LoginProps> {

    state: LoginState;
    constructor(props: LoginProps) {
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
        fetch('/api/login', {
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
                this.props.login();
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
                    register: 'Passwords do not match'
                }
            });
            return;
        }
        fetch('/api/register', {
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
                this.props.login();
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
        if(this.props.session.loggedin === undefined) return null;
        if(this.props.session.loggedin) {
            return(
                <Redirect to="/profile" />
            )
        }
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
            </div>
        )
    }
}

const Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginBind);

export default Login;