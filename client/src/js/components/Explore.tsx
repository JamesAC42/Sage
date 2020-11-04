import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export interface IDashboard {
    name:string,
    creator_username:string,
    creator_id:string,
    created_on:string,
    endpoints:string,
    id:string
}

class ExploreState {
    dashboards:Array<IDashboard>;
    constructor(){
        this.dashboards = new Array<IDashboard>();
    }
}

export default class Explore extends Component {

    state: ExploreState;
    constructor(props:any) {
        super(props);
        this.state = new ExploreState();
    }

    readable(date:string) {
        const d = new Date(date);
        return d.toDateString();
    }

    componentDidMount() {
        fetch('/api/getDashboards', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                this.setState({
                    dashboards: data.dashboards
                })
            }
        })
    }

    render() {
        return(
            <div className="container">
                <div className="container-header">
                    Dashboards
                </div>
                <div className="card-list">
                    {
                        this.state.dashboards.map((item, index) =>
                            <div className="card flex-col flex-center" key={index}>
                                <Link to={`/edit/${item.id}`}>
                                    {item.name}
                                </Link>
                                <div>{this.readable(item.created_on)}</div>
                                <div>{item.creator_username}</div>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}