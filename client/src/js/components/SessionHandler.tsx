import React, { Component } from 'react';

import { connect } from 'react-redux';

import {
    sessionActions
} from '../actions/actions';

const mapStateToProps = (state:any, props:any) => ({
  session: state.session
});

const mapDispatchToProps = {
    login: sessionActions.login,
    logout: sessionActions.logout
}

interface SessionProps {
    session: {
        loggedin: boolean
    },
    login: () => {},
    logout: () => {}
}

class SessionHandlerBind extends Component<SessionProps> {

    componentDidMount() {
        fetch('/api/getSession', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'withCredentials':'true'
            }
        })
        .then(response => response.json())
        .then(data => {
            if(data.loggedout) {
                this.props.logout();
            } else {
                this.props.login();
            }
        })
        .catch(error => {
            console.error('Error: ' +  error);
        })
    }

    render() {
        return(
            <div>
            </div>
        )
    }
}

const SessionHandler = connect(
    mapStateToProps,
    mapDispatchToProps
)(SessionHandlerBind);

export default SessionHandler;