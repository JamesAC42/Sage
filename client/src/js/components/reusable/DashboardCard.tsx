import React, { Component } from 'react';

import '../../../css/dashboard-card.scss';

interface DashboardCardProps {
  name: string,
  previewImageURL: string
}

export default class DashboardCard extends Component<DashboardCardProps> {
    render() {
        return(
            <div className="card dashboard-card">
              <img className="card-image-top preview" src={this.props.previewImageURL}></img>
              <div className="card-header">
                {this.props.name}
              </div>
            </div>
        )
    }
}
