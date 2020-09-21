import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import '../../css/navbar.css';

import sun from '../../images/sun-black.png';
import moon from '../../images/moon-white.png';

import {
    settingsActions
} from '../actions/actions';

const mapStateToProps = (state:any, props:any) => ({
    settings: state.settings
});

const mapDispatchToProps = {
    toggleDarkmode: settingsActions.toggleDarkmode
}

interface NavbarProps {
    settings: {
        darkMode: boolean
    },
    toggleDarkmode: (enabled: boolean) => {}
}

class NavbarBind extends Component<NavbarProps> {
    handleClick = () => {
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
                <div className="nav-item">
                    <Link to="/profile">Profile</Link>
                </div>
                <div className="nav-item">
                    <Link to="/login">Login</Link>
                </div>
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