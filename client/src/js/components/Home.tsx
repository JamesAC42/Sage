import React, { Component } from 'react';
import '../../css/home.scss';

import {
	Slide,
	slides1,
	slides2,
	slides3
} from './data/slides';

class SlideshowState {
	active:number;
	constructor() {
		this.active = 0;
	}
}

interface SlideshowProps {
	slides:Array<Slide>,
	reversed:boolean
}

class Slideshow extends Component<SlideshowProps> {
	state:SlideshowState;
	constructor(props:SlideshowProps) {
		super(props);
		this.state = new SlideshowState();
	}
	componentDidMount() {
		setInterval(() => {
			const next = this.state.active === this.props.slides.length - 1 ?
				0 : this.state.active + 1;
			this.setState({
				active: next
			});
		}, 10000);
	}
	render(){
		return(
			<div className="presentation-row slideshow">
				{
					this.props.reversed ? 
					<div className="col">
						<img src={this.props.slides[this.state.active].img} alt={"Image"} />
					</div> : null
				}
				<div className="col slide">
					<div className="info-header">
						{this.props.slides[this.state.active].header}
					</div>
					<ul className="info">
						<li>{this.props.slides[this.state.active].text}</li>
					</ul>
				</div>
				{
					!this.props.reversed ? 
					<div className="col">
						<img src={this.props.slides[this.state.active].img} alt={"Image"} />
					</div> : null
				}
			</div>
		)
	}
}

class HomeState {
	scrollPercent:number;
	constructor() {
		this.scrollPercent = 0;
	}
}

export default class Home extends Component {

	state:HomeState;
	constructor(props:{}) {
		super(props);
		this.state = new HomeState();
	}

	handleScroll = (e: React.UIEvent<HTMLElement>): void => {
		const scrollPercent = 
			e.currentTarget.scrollTop / (e.currentTarget.scrollHeight - e.currentTarget.clientHeight);
		this.setState({scrollPercent});
	}

    render() {

		const parallax = this.state.scrollPercent * 100;
		const translate = "translate(-50%, calc(-50% + " + parallax + "vh)) rotate(45deg)";
        return(			
			<div
				className="container container-fill scroll"
				onScroll={this.handleScroll}>

				<div className="home-content">
					<div className="presentation-row title">
						<div className="title-card">
							<div className="title-card-inner">
								Sage
							</div>
							<div 
								className="title-card-background"
								style={{
									transform:translate
								}}>
							</div>
						</div>
					</div>
					<div className="presentation-row info">
						<div className="col">
							<div className="info-header">What is Sage?</div>
							<ul className="info">
								<li>Sage is a Web Based Data Visualization and Analytics Software for easily creating dashboards, monitoring trends, and generally making information available, digestible, and customizable.</li>
							</ul>
						</div>
						<div className="col">
							<div className="info-header">Why Sage?</div>
							<ul className="info">
								<li>Sage provides a user friendly, community driven service for consolidating, monitoring, and analyzing information from the level of large corporations to small organizations to the average consumer.</li>
								<li>Sage accepts various types of endpoints including REST, RSS, ODATA, and spreadsheets, retrieve and consolidate the data for the user who can then create custom dashboards that can be published publicly or privately.</li>
							</ul>
						</div>
						<div className="col">
							<div className="info-header">What Sage Offers</div>
							<ul className="info">
								<li>Users can create accounts and publish custom reports using data from REST endpoints, RSS feeds, or even upload their own spreadsheets.</li>
								<li>Check out the slideshow below for more details.</li>
							</ul>
						</div>
					</div>
					
				</div>

				<Slideshow 
					reversed={false}
					slides={slides1}/>
				<Slideshow 
					reversed={true}
					slides={slides2}/>
				<Slideshow 
					reversed={false}
					slides={slides3}/>

				<div className="footer-card"> 
					<div className="row">
						<div>SAGE</div>
						<div>800-000-000</div>
						<div>Troy, NY</div>
					</div>
					<div className="presentation-row links">
						{/* column 1 */}
						<div className="col">
							<div> SOMETHING </div>
						</div>
						{/* column 2 */}
						<div className="col">
							<div> SOMETHING </div>
						</div>
						{/* column 3*/}
						<div className="col">
							<div> SOMETHING </div>
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
        )
    }
}