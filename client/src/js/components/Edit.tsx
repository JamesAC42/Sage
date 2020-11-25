import React, { Component } from 'react';
import {
    Redirect
} from 'react-router-dom';
import { io } from 'socket.io-client';

import { IDashboard } from './types/Dashboard';

import { RiBracesLine, RiMenuLine } from 'react-icons/ri';
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
    endpoint: {
        url: string,
        type: number,
        parameters: string
    }
}

class DashboardState {
    dashboard: IDashboard;
    data: Array<IDashData>;
    sidePanelVisible:boolean;
    constructor() {
        this.sidePanelVisible = true;
        this.dashboard = {} as IDashboard;
        this.data = new Array<IDashData>();
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

    readableDate(date:string) {
        const d = new Date(date);
        return d.toDateString();
    }

    toggleSidePanel = () => {
        this.setState({
            sidePanelVisible: !this.state.sidePanelVisible
        })
    }

    render() {
        const id = this.props.match.params.id;
        if(!getDashboard(id)) {
            return(
                <Redirect to="/home" />
            )
        }

        const sidePanelClass = this.state.sidePanelVisible ?
            "side-panel-visible" : "";

        return(
            <div className="container container-fill bg flex-row">
                <div className="panel control-bar center-child">
                    <div
                        className="control-item"
                        onClick={this.toggleSidePanel}>
                        <RiMenuLine />
                    </div>
                </div>
                <div className={`panel side-panel ${sidePanelClass}`}>
                    <div className="side-panel-inner flex-col">
                        <div className="panel-header">
                            Data
                        </div>
                        {
                        this.state.data.map((item, index) => 
                            <div key={index}>
                                <div className="side-panel-p">
                                    {item.endpoint.url}
                                </div>
                                <div className="data-container" key={index}>
                                    <pre>
                                    {JSON.stringify(item.data, null, "  ")}
                                    </pre>
                                </div>
                            </div>
                        )
                        }
                    </div>
                </div>
                <div className="panel main-panel">
                    <div className="panel-header">
                        Dashboard Name
                        {this.state.dashboard.name}
                        <span className="subtle">
                            {this.readableDate(this.state.dashboard.created_on)}
                        </span>
                    </div>
                    <div className="edit-space">
                        <div className="visual"><GoGraph /></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Edit;
