import React from 'react'

class AddPoint extends React.Component{
    constructor(props){
        super(props);

        this.state = {x : "", y : ""}

        this.isEnabled = this.isEnabled.bind(this);
        this.renderButton = this.renderButton.bind(this);   
        this.onInputChange = this.onInputChange.bind(this);
        this.onAddPointClick = this.onAddPointClick.bind(this);
    }

    onInputChange(event){
        switch (event.target.id){
            case 'xInput':
                this.setState({x : event.target.value})
                break;
            case 'yInput':
                this.setState({y : event.target.value})
                break;
            default:
                break;
        }
    }

    onAddPointClick(){
        var x = this.refs.xInput.value, y = this.refs.yInput.value
        console.log("adding point", x, y)
        this.props._addPoint({"x": x, "y": y})
    }

    isEnabled(){
        try {
            var x = this.refs.xInput.value, y = this.refs.yInput.value;
        } catch (error) { return false; }
        x = parseFloat(x)
        y = parseFloat(y)
        return !isNaN(x) && !isNaN(y)
    }


    renderButton(){
        if (this.isEnabled()){
            return <button className="btn btn-success" onClick={this.onAddPointClick}>Add Point</button>
        }
        else {
            return <button className="btn btn-success" onClick={this.onAddPointClick} disabled >Add Point</button>
        }
    }

    renderBody(){
        return (
            <div className="d-flex justify-content-center align-items-start flex-wrap">
                <div className="input-group mx-0">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="xInput">X</label>
                    </div>
                    <input id="xInput" type="text" ref="xInput" onChange={this.onInputChange} className="form-control"/>
                </div>
                <div className="input-group my-2">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="yInput">Y</label>
                    </div>
                    <input id="yInput" type="text" ref="yInput" onChange={this.onInputChange} className="form-control"/>
                </div>
                <div className="mt-2">
                    {this.renderButton()}
                </div>
            </div>
        )
    }
    render(){
        return (
            <div className="card w-100 bg-transparent">
                <div className="card-header btn btn-success bg-success font-weight-bold" id="header" data-toggle="collapse" data-target="#body" aria-expanded="false" aria-controls="body">
                    Add Point (x,y)
                </div>
                <div className="card-body collapse" aria-labelledby="instructionHeader" id="body">
                    {this.renderBody()}
                </div>
            </div>  
        )
    }
}

export default AddPoint;