import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../../../css/dashboard-card.scss';
import graphimg from '../../../images/graph1.png';

interface DashboardCardProps {
  name: string,
  url: string,
  author: string,
  previewImageURL: string,
  dateModified: string
}

export default class DashboardCard extends Component<DashboardCardProps> {
    render() {
        return(
            <div className="card dashboard-card">
              <Link to={this.props.url} className="link">
                <div className="preview flex center-child">
                  <img className="card-image-top" alt="preview" src={graphimg}></img>
                </div>
              </Link>
              <div className="date-overlay">{this.props.dateModified}</div>
              <div className="card-header">
                <Link to={this.props.url} className="link">{this.props.name}</Link>
              </div>
              <div className="text-subtle">
                {this.props.author}
                </div>
            </div>
        )
    }
}
