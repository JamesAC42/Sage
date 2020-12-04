import React, { Component } from 'react';
import Slide from './types/Slide';

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
						<img src={this.props.slides[this.state.active].img} alt="Slide" />
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
						<img src={this.props.slides[this.state.active].img} alt="Slide" />
					</div> : null
				}
			</div>
		)
	}
}

export default Slideshow;