import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

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
            <div className="profile-outer"></div>
        )
    }
}

const Profile = connect(
    mapStateToProps,
    null
)(ProfileBind);

export default Profile;
