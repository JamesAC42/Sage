import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import { sessionActions } from '../actions/actions';

const mapStateToProps = (state:any, props:any) => ({
    session: state.session
});

const mapDispatchToProps = {
    logout: sessionActions.logout
}

interface LogoutState {
    redirect: boolean
}

interface LogoutProps {
    session: {
        loggedin:boolean
    },
    logout: () => {}
}

class LogoutBind extends Component<LogoutProps> {
    state: LogoutState;
    constructor(props:LogoutProps) {
        super(props);
        this.state = {
            redirect: false
        }
    }
    componentDidMount() {
        fetch('/api/destroySession', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                this.setState({redirect: true});
                this.props.logout();
            }
        })
        .catch(error => {
            console.error('Error: ' +  error);
        })
    }
    render() {
        if(this.state.redirect || !this.props.session.loggedin) {
            return(
                <Redirect to="/" />
            )
        } else {
            return null;
        }
    }
}

const Logout = connect(
    mapStateToProps,
    mapDispatchToProps
)(LogoutBind);

export default Logout;