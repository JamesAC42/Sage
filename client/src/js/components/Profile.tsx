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
            <div className="profile-outer"></div>
        )
    }
}

const Profile = connect(
    mapStateToProps,
    null
)(ProfileBind);

export default Profile;
