import React, { Component } from 'react';

interface UpdateProps {
    updateValue: (value:string) => void
}

export class InputItem extends Component<UpdateProps> {
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

export class PasswordItem extends Component<UpdateProps> {
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