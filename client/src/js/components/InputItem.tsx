import React, { Component } from 'react';

interface UpdateProps {
    maxLength: number,
    value: string,
    name: string,
    updateValue: (e:React.ChangeEvent<HTMLInputElement>) => void
}

export class InputItem extends Component<UpdateProps> {
    render() {
        return(
                <input 
                    className="text-input"
                    type="text"
                    name={this.props.name}
                    maxLength={this.props.maxLength}
                    value={this.props.value}
                    onChange={(
                        ev: React.ChangeEvent<HTMLInputElement>,
                    ): void => this.props.updateValue(ev)}/>
        )
    }
}

export class PasswordItem extends Component<UpdateProps> {
    render() {
        return(
                <input 
                    className="text-input"
                    type="password" 
                    name={this.props.name}
                    maxLength={this.props.maxLength}
                    value={this.props.value}
                    onChange={(
                        ev: React.ChangeEvent<HTMLInputElement>,
                    ): void => this.props.updateValue(ev)}/>
        )
    }
}