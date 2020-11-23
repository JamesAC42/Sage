import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import DashboardCard from "./reusable/DashboardCard";
import { InputItem } from "./InputItem";
import { IDashboard } from './types/Dashboard';

import { FaChevronRight } from "react-icons/fa";

import "../../css/profile.scss";

import { SessionProps } from "./props/Session";

import User from "./types/User";

const mapStateToProps = (state: any, props: any) => ({
  session: state.session,
});

class ProfileState {
  user: User;
  redirect: string;
  dashboards: Array<IDashboard>;
  constructor() {
    this.user = new User();
    this.redirect = '';
    this.dashboards = [];
  }
}

class ProfileBind extends Component<SessionProps> {
  state: ProfileState;
  constructor(props: SessionProps) {
    super(props);
    this.state = new ProfileState();
  }

  componentDidMount() {
    fetch("/api/getUser", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.success) {
          this.setState({
            user: data.user
          })
        } else {
          this.setState({
            redirect: 'logout'
          });
        }
      });

    fetch("/api/getDashboards?user=true",  {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.success) {
          this.setState({
            dashboards: data.dashboards
          })
        } else {
          this.setState({
            redirect: 'logout'
          });
        }
      });
  }
  
  readable(date:string) {
    if(!date) return '';
    const d = new Date(date);
    return d.toDateString();
  }

  render() {
    if (!this.props.session.loggedin) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <div className="container bg">
          <div className="unbordered card">
            <span className="container-heading">
              {this.state.user.first_name + " " + this.state.user.last_name}
            </span>
            <span className="container-heading-subtle"> @{this.state.user.username}</span>
          </div>

          <div className="card">
            <div className="card-body profile-header">
              <div className="left flex-col flex-center">
                <img
                  className="profile-picture"
                  src="https://via.placeholder.com/150"
                ></img>
                <div className="creation-date">
                  User since: {this.readable(this.state.user.created_on)}
                </div>
              </div>
              <div className="right">
                <div className="input-label">Username</div>
                <input className="text-input" type="text" />
                <br />
                some sort of other password reset stuff here
              </div>
            </div>
          </div>
          <div className="unbordered card">
            <div className="card-header favorites">
              My Dashboards:
            </div>
          </div>

          <div className="card-deck">
            { this.state.dashboards.map((item, index) => 
             <DashboardCard
              key={index}
              name={item.name}
              url={`/edit/${item.id}`}
              author={item.creator_username}
              previewImageURL="https://via.placeholder.com/150"
              dateModified={this.readable(item.created_on)} />
            ) }
          </div>
          <div className="unbordered card">
            <div className="card-header favorites">
              Favorites:
              <div className="favorites-link">
                <a href="/explore">
                  All Favorites <FaChevronRight />
                </a>
                {/* TODO: fix vertical alignment with icon */}
              </div>
            </div>
          </div>

          <div className="card-deck">
          </div>
        </div>
      </div>
    );
  }
}

const Profile = connect(mapStateToProps, null)(ProfileBind);

export default Profile;
