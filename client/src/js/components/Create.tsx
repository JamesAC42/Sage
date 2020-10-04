import React, { Component, MouseEvent } from 'react';
import "../../css/create.css";

import CreateInputRouter from './CreateInputRouter';

interface ICreateState {
    active:number
}

class CreateState implements ICreateState {
    active: number;
    constructor() {
        this.active = 0;
    }
}

class Create extends Component {
    state:CreateState;
    constructor(props:any) {
        super(props);
        this.state = new CreateState();
    }
    updateActive = (item: number) => {
        this.setState({
            ...this.state,
            active:item
        });
    }
    activeTabClass = (i: number) => {
        if(i === this.state.active) {
            return "tab-item tab-item-active";
        } else {
            return "tab-item";
        }
    }
    render() {
        return(
            <div className="create-outer">
                <div className="create-header">Create a Dashboard</div>
                <div className="create-content">
                    <div className="create-dialogue">
                        <div className="create-dialogue-inner">
                            Provide data endpoints that will form the basis of your dashboard.
                            You can use REST APIs, GraphQL, ODATA, or RSS feeds.
                        </div>
                    </div>
                    <div className="input-tab-outer">
                        <div 
                            className={this.activeTabClass(0)}
                            onClick={(e:MouseEvent) => this.updateActive(0)}>Basic Web</div>
                        <div className={this.activeTabClass(1)}
                            onClick={(e:MouseEvent) => this.updateActive(1)}>GraphQL</div>
                        <div className={this.activeTabClass(2)}
                            onClick={(e:MouseEvent) => this.updateActive(2)}>ODATA</div>
                        <div className={this.activeTabClass(3)}
                            onClick={(e:MouseEvent) => this.updateActive(3)}>RSS</div>
                    </div>
                    <div className="create-input-outer">
                        <CreateInputRouter active={this.state.active}/>
                        <div className="submit-form-outer">
                            <div className="submit-button">CREATE</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Create;