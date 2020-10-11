import React, { Component } from 'react';
import '../../css/login.scss';
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
                <div className="modal login-modal flex-row flex-stretch">
                    <div className="login flex-col flex-stretch">
                        <div className="modal-header login-header">
                            Login
                        </div>
                        <div className="login-input-container flex-col flex-stretch">
                            
                            <div className="input-label">Username</div>
                            <InputItem updateValue={this.updateLoginUsername} />

                            <div className="input-label">Password</div>
                            <PasswordItem updateValue={this.updateLoginPassword} />

                        </div>
                        <div className="login-submit-container center-child">
                            <div
                                className="button button-success"
                                onClick={this.login}>
                                LOG IN
                            </div>
                        </div>
                        <div className="login-error">
                            {this.state.error.login}
                        </div>
                    </div>
                    <div className="register flex-col flex-stretch">
                        <div className="modal-header register-header">
                            Register
                        </div>
                        <div className="login-input-container flex-col flex-stretch">
                            
                            <div className="input-label">Email Address</div>
                            <InputItem updateValue={this.updateRegisterEmail} />

                            <div className="input-label">Username</div>
                            <InputItem updateValue={this.updateRegisterUsername} />

                            <div className="input-label">Password</div>
                            <PasswordItem updateValue={this.updateRegisterPassword} />

                            <div className="input-label">Confirm Password</div>
                            <PasswordItem updateValue={this.updateRegisterPasswordConfirm} />

                        </div>
                        <div className="login-submit-container center-child">
                            <div
                                className="button button-default"
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
