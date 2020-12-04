import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
    render() {
        return(
            <div className="footer-card"> 
                <div className="row">
                    <div>SAGE</div>
                    <div>800-000-000</div>
                    <div>Troy, NY</div>
                </div>
                <div className="presentation-row links">
                    <div className="col">
                        <a href="https://rcos.io/projects/jamesac42/sage/profile">RCOS</a>
                    </div>
                    <div className="col">
                        <Link to={"/explore"}>Explore</Link>
                    </div>
                    <div className="col">
                        <a href="https://github.com/jamesac42/sage">GitHub</a>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <p className="col-sm">
                        &copy;{new Date().getFullYear()} SAGE | All Rights Reserved | Terms Of Service | Privacy
                    </p>
                </div>
            </div>
        )
    }
}

export default Footer;