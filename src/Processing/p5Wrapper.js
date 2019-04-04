import React from "react";
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch'

export default class Canvas extends React.Component {
    constructor(props) {
		super(props);
		this.state = {width : window.innerWidth, height : window.innerHeight, sketch : sketch}
		
		this.getWindowDim = this.getWindowDim.bind(this)
	}
	p5Canvas = null
	componentDidMount(){
		console.log('remove',this.props.sketch)
		this.p5Canvas = document.getElementById('p5-canvas')
		this.interval = setInterval( this.getWindowDim, 500)

		var dpi_x = document.getElementById('dpi').offsetWidth;
		var dpi_y = document.getElementById('dpi').offsetHeight;
		console.log('dpi-x', dpi_x, 'dpi-y', dpi_y)
		this.setState({dpix : dpi_x, dpiy : dpi_y})
	}
	
	getWindowDim(){
		var newWidth = window.innerWidth
		var newHeight = window.innerHeight

		if(this.state.width !== newWidth || this.state.height !== newHeight){
			//console.log('changing',newWidth, newHeight)
			this.setState({width : newWidth, height : newHeight})
		}

	}
	componentWillUnmount(){
		this.refs.p5.canvas.remove()
	}

	// componentWillReceiveProps(newprops) {
	// 	if (this.props.sketch !== newprops.sketch) {
	// 		this.wrapper.removeChild(this.wrapper.childNodes[0]);
	// 		this.canvas = new p5(newprops.sketch, this.wrapper);
	// 	}
	// 	if (this.canvas.myCustomRedrawAccordingToNewPropsHandler) {
	// 		this.canvas.myCustomRedrawAccordingToNewPropsHandler(newprops);
	// 	}
	// }

	// componentWillUnmount() {
	// 	this.canvas.remove();
	// }

	render() {
		return (
			<React.Fragment>
				<div id="dpi" style={{height: "1in", width: "1in", left: "100%", position: "fixed", top: "100%"}}/>
            	<P5Wrapper  ref='p5'sketch={this.state.sketch} width={this.state.width} height={this.state.height} dpix={this.state.dpix} dpiy={this.state.dpiy}/>
			</React.Fragment>
		)
	}
}