import React, { Component } from 'react';

import '../../../css/dashboard-card.scss';

interface DashboardCardProps {
  name: string,
  author: string,
  previewImageURL: string
}

export default class DashboardCard extends Component<DashboardCardProps> {
    render() {
        return(
            <div className="card dashboard-card">
              <img className="card-image-top preview" src={this.props.previewImageURL}></img>
              <div className="date-overlay">Last Modified Today</div>
              <div className="card-header">
                {this.props.name}
              </div>
              <div className="text-subtle">
                {this.props.author}
              </div>
            </div>
        )
    }
}
