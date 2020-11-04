import React, { Component, MouseEvent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import "../../css/create.scss";
import { SessionProps } from './props/Session';

import CreateInputRouter from './CreateInputRouter';

const mapStateToProps = (state:any, props:any) => ({
    session: state.session
})

interface ICreateState {
    active:number
}

class CreateState implements ICreateState {
    active: number;
    constructor() {
        this.active = 0;
    }
}

class CreateBind extends Component<SessionProps> {
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
        if(!this.props.session.loggedin) {
            return(
                <Redirect to="/login" />
            )
        }
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

const Create = connect(
    mapStateToProps,
    null
)(CreateBind);

export default Create;
