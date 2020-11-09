import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DashboardCard from './reusable/DashboardCard';

import DashboardCard from './reusable/DashboardCard';

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
                <div className="unbordered card">
                    <div className="container-heading">
                        Dashboards
                    </div>
                </div>
                <hr />{/* TODO: Add styling to <hr> element */}
                <div className="card-deck">
                    {
                        this.state.dashboards.map((item, index) =>
                            <DashboardCard name={item.name}
                                           url={`/edit/${item.id}`}
                                           author={item.creator_username}
                                           previewImageURL="https://via.placeholder.com/150"
                                           dateModified={this.readable(item.created_on)} />
                        )
                    }
                </div>
            </div>
        )
    }
}
