import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../css/navbar.scss';

import storageAvailable from '../checkStorage';

import sun from '../../images/sun-black.png';
import moon from '../../images/moon-white.png';

import {
    settingsActions
} from '../actions/actions';

const mapStateToProps = (state:any, props:any) => ({
    settings: state.settings,
    session: state.session
});

const mapDispatchToProps = {
    toggleDarkmode: settingsActions.toggleDarkmode
}

interface NavbarProps {
    settings: {
        darkMode: boolean
    },
    session: {
        loggedin: boolean
    },
    toggleDarkmode: (enabled: boolean) => {}
}

class NavbarBind extends Component<NavbarProps> {
    componentDidMount() {
        if(storageAvailable()) {
            if(localStorage['darkMode'] === undefined) return;
            const dark:boolean = JSON.parse(localStorage['darkMode']);
            if(dark) {
                this.props.toggleDarkmode(dark);
            }
        }
    }
    handleClick = () => {
        if(storageAvailable()) {
            localStorage['darkMode'] = JSON.stringify(!this.props.settings.darkMode);
        }
        this.props.toggleDarkmode(!this.props.settings.darkMode);
    }
    render() {
        return(
            <div className="navbar">
                <div className="nav-item nav-title">
                    <Link to="/">SAGE</Link>
                </div>
                <div className="nav-item">
                    <Link to="/explore">Explore</Link>
                </div>
                <div className="nav-item">
                    <Link to="/create">Create</Link>
                </div>
                {
                    this.props.session.loggedin ?
                    <div className="nav-item">
                        <Link to="/profile">Profile</Link>
                    </div> : null
                }
                {
                    this.props.session.loggedin ?
                    <div className="nav-item">
                        <Link to="/logout">Logout</Link>
                    </div> : null
                }
                {
                    !this.props.session.loggedin?
                    <div className="nav-item">
                        <Link to="/login">Login</Link>
                    </div> : null
                }
                <div className="nav-item">
                    <img
                    src={
                        this.props.settings.darkMode ?
                            moon : sun
                    }
                    alt={"darkmode-img"}
                    className="darkmode-img"
                    onClick={(
                        ev: React.MouseEvent,
                    ): void => {this.handleClick()}}/>
                </div>
            </div>
        )
    }
}

const Navbar = connect(
    mapStateToProps,
    mapDispatchToProps
)(NavbarBind);

export default Navbar;
