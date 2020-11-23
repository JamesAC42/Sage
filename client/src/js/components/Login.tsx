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

type formEvent = React.ChangeEvent<HTMLInputElement>;

class LoginBind extends Component<LoginProps> {

    state: LoginState;
    constructor(props: LoginProps) {
        super(props);
        this.state = new LoginState();
    }

    updateLoginValues = (a:formEvent) => {
        this.setState({
            ...this.state,
            login: {
                ...this.state.login,
                [a.target.name] : a.target.value
            }
        });
    }

    updateRegisterValues = (a:formEvent) => {
        this.setState({
            ...this.state,
            register: {
                ...this.state.register,
                [a.target.name] : a.target.value
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
            this.state.register.firstname === '' ||
            this.state.register.lastname === '' ||
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
                            <InputItem 
                                value={this.state.login.username} 
                                maxLength={50}
                                name={"username"}
                                updateValue={this.updateLoginValues} />

                            <div className="input-label">Password</div>
                            <PasswordItem 
                                value={this.state.login.password}
                                maxLength={200}
                                name={"password"}
                                updateValue={this.updateLoginValues} />

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
                            
                            <div className="name-row flex-row flex-stretch">
                                <div>
                                    <div className="input-label">First Name</div>
                                    <InputItem 
                                        value={this.state.register.firstname} 
                                        maxLength={100} 
                                        name={"firstname"}
                                        updateValue={this.updateRegisterValues} />
                                </div>
                                <div>
                                    <div className="input-label">Last Name</div>
                                    <InputItem 
                                        value={this.state.register.lastname}
                                        maxLength={100}
                                        name={"lastname"}
                                        updateValue={this.updateRegisterValues} />
                                </div>

                            </div>

                            <div className="input-label">Username</div>
                            <InputItem 
                                value={this.state.register.username}
                                maxLength={50}
                                name={"username"}
                                updateValue={this.updateRegisterValues} />
                                
                            <div className="input-label">Email Address</div>
                            <InputItem 
                                value={this.state.register.email} 
                                maxLength={250} 
                                name={"email"}
                                updateValue={this.updateRegisterValues} />

                            <div className="input-label">Password</div>
                            <PasswordItem
                                value={this.state.register.password} 
                                maxLength={200}
                                name={"password"}
                                updateValue={this.updateRegisterValues} />

                            <div className="input-label">Confirm Password</div>
                            <PasswordItem
                                value={this.state.register.passwordConfirm} 
                                maxLength={200}
                                name={"passwordConfirm"}
                                updateValue={this.updateRegisterValues} />

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
