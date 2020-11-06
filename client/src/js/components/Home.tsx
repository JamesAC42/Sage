import React, { Component } from 'react';
import '../../css/home.scss';
import '../../css/master.scss'; 
import img1 from '../../images/d-1.jpg' 
import img2 from '../../images/d-2.jpg'
import img3 from '../../images/d-3.jpg'
import img4 from '../../images/d-4.jpg' 

export default class Home extends Component {
    render() {
		
        return(			
			<div className="home-container">
				<div className="header-card">
					<div className="head">SAGE</div>
					<div className="row">
						{/* Column 1 */ }
						<div className="col">
							<ul className="list-unstyled left">
								<ul className="title1">WHAT IS SAGE:</ul>
								<ul>Sage is a Web Based Data Visualization and Analytics Software for easily creating dashboards, monitoring trends, and generally making information available, digestible, and customizable.</ul>
							</ul>
						</div>
						{/* Column 2 */}
						<div className="col">
							<ul className="list-unstyled left">
								<ul className="title1">WHY SAGE:</ul>
								<ul>Sage provides a user friendly, community driven service for consolidating, monitoring, and analyzing information from the level of large corporations to small organizations to the average consumer.</ul>
								<ul>Sage accepts various types of endpoints including REST, RSS, ODATA, and spreadsheets, retrieve and consolidate the data for the user who can then create custom dashboards that can be published publicly or privately.</ul>
							</ul>
						</div>
						{/* Column 3 */}
						<div className="col">
							<ul className="list-unstyled left">
								<ul className="title1">WHAT SAGE OFFERS:</ul>
								<ul>Users can create accounts and publish custom reports using data from REST endpoints, RSS feeds, or even upload their own spreadsheets.</ul>
								<ul>Check out the slideshow below for more details.</ul>
							</ul>
						</div>
					</div>
				</div>
				<div className="fling-minislide">
					<div className="row">
						{/* Column 1 */}
						<div className="col2">
							<img src={img4} alt="Slide 4" />
							<img src={img3} alt="Slide 3" />
							<img src={img2} alt="Slide 2" />
							<img src={img1} alt="Slide 1" />
						</div>
						{/* Column 2 */}
						<div className="col2">
							<ul>HELLO</ul>
						</div>
					</div>
				</div>
				<div className="footer-card"> 
					<div className="row">
						{/* Column1 */}
						<div className="col">
							<h4>SAGE</h4>
							<ul>800-000-000</ul>
							<ul>Troy, NY</ul>
						</div>	
					</div>
					<hr />
					<div className="row">
						<p className="col-sm">
							&copy;{new Date().getFullYear()} SAGE | All Rights Reserved | Terms Of Service | Privacy
						</p>
					</div>
				</div>
			</div>
        );
    }
}