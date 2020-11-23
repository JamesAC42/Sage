import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DashboardCard from './reusable/DashboardCard';

import { IDashboard } from './types/Dashboard';

import { FaSearch } from 'react-icons/fa';

import '../../css/explore.scss';

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
          <div>
            <div className="sidebar">
              <div className="search">
                <FaSearch className="search-icon"/>
                <input placeholder="Search" type="text"></input>
              </div>

              <div className="dropdown-list">
                <select id="cars" name="cars">
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="fiat">Fiat</option>
                  <option value="audi">Audi</option>
                </select>
              </div>

              <div className="tag-container">
                <span className="tag">test</span>
                <span className="tag">test</span>
                <span className="tag">test</span>
                <span className="tag selected">test</span>
                <span className="tag">test</span>
                <span className="tag">test</span>
              </div>
            </div>
            <div className="container-wrapper">
              <div className="container">
                <div className="unbordered card">
                    <div className="container-heading">
                        Dashboards
                    </div>
                </div>
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
            </div>
          </div>
        )
    }
}
