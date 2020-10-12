import React, { Component, MouseEvent } from 'react';
import "../../css/create.scss";

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
            return "vertical-tab vertical-tab-active";
        } else {
            return "vertical-tab";
        }
    }
    render() {
        return(
            <div className="modal create-modal flex-col flex-stretch">
                <div className="modal-header create-header">Create a Dashboard</div>
                <div className="create-content flex-row flex-stretch">
                    <div className="create-dialogue">
                        <div className="create-dialogue-inner">
                            Provide data endpoints that will form the basis of your dashboard.
                            You can use REST APIs, GraphQL, ODATA, or RSS feeds.
                        </div>
                    </div>
                    <div className="endpoint-type-select">
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
                    <CreateInputRouter active={this.state.active}/>
                </div>
            </div>
        )
    }
}
export default Create;
