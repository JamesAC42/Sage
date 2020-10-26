import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import '../../css/profile.scss';

const mapStateToProps = (state:any, props:any) => ({
    session: state.session
});

interface ProfileProps {
    session: {
        loggedin: boolean
    }
}

class ProfileBind extends Component<ProfileProps> {
    render() {
        if(!this.props.session.loggedin) {
            return(
                <Redirect to="/login" />
            )
        }
        return(
          <div>
            <div className="container">
              <div className="unbordered card">
                <span className="container-heading">Insert Name </span>
                <span className="container-heading-subtle"> @username</span>
              </div>

              <div className="card">
                <div className="card-header">Account</div>
                <div className="card-body">test</div>
              </div>

              <div className="unbordered card">
                <div className="card-header favorites">
                  Favorites:
                  <div className="favorites-link">
                    <a href="/link/to/favorites/page">All Favorites &gt; </a>
                  </div>
                </div>
              </div>

              <div className="card-deck four-cols">
                <div className="card">
                  <img className="preview" src="https://via.placeholder.com/150"></img>
                  <div className="card-header">Project 1</div>
                  <div className="card-body">test</div>
                </div>
                <div className="card">
                  <div className="card-header">Project 2</div>
                  <div className="card-body">test</div>
                </div>
                <div className="card">
                  <div className="card-header">Project 3</div>
                  <div className="card-body">test</div>
                </div>
                <div className="card">
                  <div className="card-header">Project 4</div>
                  <div className="card-body">test</div>
                </div>
              </div>

              <div className="unbordered card">
                <div className="card-header">
                  Dashboards:
                </div>
              </div>

              <div className="card">
                <div className="card-header">Project 4</div>
                <div className="card-body">test</div>
              </div>
            </div>
          </div>
        )
    }
}

const Profile = connect(
    mapStateToProps,
    null
)(ProfileBind);

export default Profile;
