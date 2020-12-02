import React, { Component } from 'react';
import {
    Redirect
} from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

import { IDashboard } from './types/Dashboard';
import { IEndpoint } from './types/Endpoint';

import DataItem from './DataItem';

import { RiMenuLine, RiAddLine, RiCloseLine, RiDeleteBinLine } from 'react-icons/ri';
import { GoGraph } from 'react-icons/go';
import '../../css/edit.scss';

interface ParamTypes {
    match: {[key:string]: {id:string}}
}

const getDashboard = (id:string) => {
    return true;
}

interface IDashData {
    data: {},
    endpoint: IEndpoint
}

class DashboardState {
    dashboard: IDashboard;
    data: Array<IDashData>;
    sidePanelVisible:boolean;
    showDialogue:boolean;
    socket: Socket;
    redirect: boolean;
    constructor() {
        this.sidePanelVisible = true;
        this.dashboard = {} as IDashboard;
        this.data = new Array<IDashData>();
        this.showDialogue = false;
        this.socket = io('http://localhost:3500/');
        this.redirect = false;
    }
}

class Edit extends Component<ParamTypes>{

    state: DashboardState;
    constructor(props:any) {
        super(props);
        this.state = new DashboardState();
    }

    componentDidMount()  {

        const id = this.props.match.params.id;

        const socket = io('http://localhost:3500/', {
            query: `room=${id}`
        });

        socket.on('pushData', (data:any) => {
            this.setState({
                data: JSON.parse(data)
            });
        });

        this.setState({socket});

        const url = `/api/getDashboard?id=${id}`
        fetch(url, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                this.setState({
                    dashboard: data.dashboard,
                    data: data.data
                })
            }
        });
    }

    componentWillUnmount() {
        this.state.socket.disconnect();
    }

    readableDate(date:string) {
        const d = new Date(date);
        return d.toDateString();
    }

    toggleSidePanel = () => {
        this.setState({
            sidePanelVisible: !this.state.sidePanelVisible,
        })
    }

    toggleDialogue() {
        this.setState({
            showDialogue: !this.state.showDialogue
        });
    }

    deleteDashboard() {
        fetch('/api/deleteDashboard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.props.match.params.id
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                this.setState({redirect: true})
            } else {
                console.log("failure");
            }
        });
    }

    render() {
        const id = this.props.match.params.id;
        if(!getDashboard(id)) {
            return(
                <Redirect to="/home" />
            )
        }
        if(this.state.redirect) {
            return(
                <Redirect to="/profile" />
            )
        }

        const sidePanelClass = this.state.sidePanelVisible ?
            "side-panel-visible" : "";
        const sidePanelControlIcon = this.state.sidePanelVisible ?
            <RiMenuLine /> : <RiCloseLine />;

        const blur = this.state.showDialogue ? "blur" : "";

        return(
            <div className="container container-fill bg flex-row">
                {
                    this.state.showDialogue ? 
                    <div className="dialogue-container">
                        <div className="dialogue">
                            <div className="dialogue-message">
                                Are you sure you want to delete this dashboard?
                            </div>
                            <div className="dialogue-button-container">
                                <div 
                                    className="dialogue-button confirm"
                                    onClick={() => this.deleteDashboard()}>
                                        Yes
                                </div>
                                <div 
                                    className="dialogue-button deny"
                                    onClick={() => this.toggleDialogue()}>
                                        Cancel
                                </div>
                            </div>
                        </div>
                    </div> : null
                }
                <div className={`panel control-bar ${blur}`}>
                    <div
                        className={`control-item ${sidePanelClass}`}
                        onClick={this.toggleSidePanel}>
                        {sidePanelControlIcon}
                    </div>
                    <div 
                        className="control-item delete"
                        onClick={() => this.toggleDialogue()}>
                        <RiDeleteBinLine />
                    </div>
                    <div className="control-item">
                        <RiMenuLine />
                    </div>
                </div>
                <div className={`panel side-panel ${sidePanelClass} ${blur}`}>
                    <div className="side-panel-inner flex-col">
                        <div className="panel-header">
                            <span>Data</span>
                            <span className="right"><RiAddLine /></span>
                        </div>
                        {
                            this.state.data.map((item, index) =>
                                <DataItem item={item} key={index}/>
                            )
                        }
                    </div>
                </div>
                <div className={`panel main-panel ${blur}`}>
                    <div className="panel-header">
                        {this.state.dashboard.name}
                        <span className="subtle">
                            {this.readableDate(this.state.dashboard.created_on)}
                        </span>
                    </div>
                    <div className="edit-space">
                        <div className="visual">
                            <GoGraph/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Edit;
