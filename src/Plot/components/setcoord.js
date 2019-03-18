import React from 'react'

class SetCoord extends React.Component{
    constructor(props){
        super(props);
        this.state = {x : 0, y : 0, index : 0}
        this.onChange = this.onChange.bind(this)
        this.setCoordinates = this.setCoordinates.bind(this)
    }

    componentDidMount(){
        var coords = this.props._getPoint(0);
        this.setState({x : coords.x, y : coords.y})
    }

    // shouldComponentUpdate(nextProps){
    //     return this.props.data == nextProps.data
    // }

    // componentDidUpdate(prevProps) {
    //     console.log(prevProps, this.props)
    // }

    isEnabled(){
        try {
            var x = this.state.x, y = this.state.y;
        } catch (error) { return false; }
        x = parseFloat(x)
        y = parseFloat(y)
        return !isNaN(x) && !isNaN(y)
    }

    setCoordinates(){
        console.log(`Setting point ${this.state.index} to (${this.state.x}, ${this.state.y})`)
        this.props._setCoord({index: parseInt(this.state.index), x: parseFloat(this.state.x), y: parseFloat(this.state.y)})
    }

    onChange(event){
        if (event.target.id === 'indexSelect'){
            this.props._onchange(event.target.value)
            var coords = this.props._getPoint(parseInt(event.target.value));
            this.setState({x : coords.x, y : coords.y, index : event.target.value})
        }         
        else if (event.target.id === 'xInput'){
            this.setState({x : event.target.value})
        }
        else if (event.target.id === 'yInput'){
            this.setState({y : event.target.value})
        }
    }

    renderOptions(){
        var oList = [];
        for (var i = 0; i < this.props.numPoints; i++ ){
            if (i === 0)
                oList.push(<option value={i} key={i}>{i}</option>)
            else
                oList.push(<option value={i} key={i}>{i}</option>)
        }
        return oList
    }

    render(){
        return (
            <div className="card w-100 bg-transparent">
                <div className="card-header btn btn-success bg-success font-weight-bold" id="header" data-toggle="collapse" data-target="#setcoordbody" aria-expanded="false" aria-controls="setcoordbody">
                    Set Point (x,y)
                </div>
                <div className="card-body collapse" aria-labelledby="header" id="setcoordbody">
                    <div className="row mb-4">
                        <div className="col">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <label className="input-group-text" htmlFor="xInput">Point Index</label>
                                </div>  
                                <select onChange={this.onChange} type="text" id="indexSelect" className="form-control">
                                    {this.renderOptions()}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-lg">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <label className="input-group-text" htmlFor="xInput">X</label>
                                </div>  
                                <input value={this.state.x} onChange={this.onChange} type="text" id="xInput" className="form-control"/>
                            </div>
                        </div>
                        <div className="col-lg">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <label className="input-group-text" htmlFor="xInput">Y</label>
                                </div>  
                                <input value={this.state.y} onChange={this.onChange} type="text" id="yInput" className="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <button disabled={!this.isEnabled()} className="col-8 btn btn-success" onClick={this.setCoordinates}>Set Coordinates</button>
                    </div>
                </div>
            </div>  
        )
    }
}
export default SetCoord