import React from 'react'

class PointSlider extends React.Component{
    constructor(props){
        super(props);
        this.state = {numPoints : this.props.initialNum}
    }
    onChangeHandler = (event) => {
        this.setState({numPoints : event.target.value})
        this.props._changeNumPoints(event.target.value)
    }

    render(){
        return (
            <div className="input-group align-items-center ">
                <div className="input-group-prepend ">
                    <label htmlFor='range' className="input-group-text bg-success text-white">Points per Segment</label>
                </div>
                <input className='form-control h-100 no-border custom-range px-0 px-lg-3' id ="range" value={this.state.numPoints}type='range' min='2' max='30' onChange={this.onChangeHandler}/>
                <div className="input-group-append">
                    <span className="input-group-text" id="basic-addon2"  data-toggle="popover" title="The same set of control points will yield different result with different algorithms">{this.state.numPoints}</span>
                </div>
            </div>
        )
    }
}
export default PointSlider