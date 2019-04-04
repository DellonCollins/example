import React, { Component } from 'react';
import sketch from './sketch'
import Canvas from './p5Wrapper';

class Processing extends Component {
  constructor(props) {
		super(props);
		this.state = {
			rotation: 150,
			stateSketch: sketch,
		};
		
	}

	rotationChange(e){
    console.log(e.target.value)
		this.setState({rotation:e.target.value});
	}

	pressEvent(){
		// this.state.stateSketch === sketch ? this.setState({stateSketch:sketch2}) : this.setState({stateSketch:sketch});
	}

	render () {
		return (
				<Canvas sketch={this.state.stateSketch} rotation={this.state.rotation}>
				<input type="range" value={this.state.rotation}  min="0"  max="360" step="1" onChange={this.rotationChange.bind(this)}/>
				<button onClick={this.pressEvent.bind(this)}>Change Sketch</button>
        		</Canvas>
		);
	}
}

export default Processing;
