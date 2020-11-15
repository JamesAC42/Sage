import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import DashboardCard from './reusable/DashboardCard';
import { InputItem } from './InputItem';

import { FaChevronRight } from 'react-icons/fa';

import '../../css/profile.scss';

import { SessionProps } from './props/Session';

const mapStateToProps = (state:any, props:any) => ({
    session: state.session
});

class ProfileBind extends Component<SessionProps> {
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
                  <div className="card-body profile-header">
                    <div className="left">
                      <img className="profile-picture" src="https://via.placeholder.com/150"></img>
                      <div>maybe some sort of<br /> text here?</div>
                    </div>
                    <div className="right">
                      <div className="input-label">Username</div>
                      <input className="text-input" type="text" /><br />
                      some sort of other password reset stuff here
                    </div>
                  </div>
                </div>
                <div className="unbordered card">
                  <div className="card-header favorites">
                    Favorites:
                    <div className="favorites-link">
                      <a href="/link/to/favorites/page">All Favorites <FaChevronRight /></a>
                      {/* TODO: fix vertical alignment with icon */}
                    </div>
                  </div>
                </div>

                <div className="card-deck">
                  <DashboardCard name="Project 1" author="bob" url="" dateModified="" previewImageURL="https://via.placeholder.com/150" />
                  <DashboardCard name="Project 2" author="bob" url="" dateModified="" previewImageURL="https://via.placeholder.com/150" />
                  <DashboardCard name="Project 3" author="bob" url="" dateModified="" previewImageURL="https://via.placeholder.com/150" />
                  <DashboardCard name="Project 4" author="bob" url="" dateModified="" previewImageURL="https://via.placeholder.com/150" />
                  {/* TODO: load lazily as the user scrolls down the page */}
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
