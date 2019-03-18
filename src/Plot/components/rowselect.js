import React from 'react'

class CoodinateSetter extends React.Component {
    constructor(props){
        super(props)
        this.state = {select : "", input : ""}
        this.dataToSend = this.dataToSend.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount(){
        this.setState({select : this.refs.select.value}) 
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

    dataToSend(){
        console.log(this.state)
        return {coord: this.props.label, select: this.state.select, input: this.state.input}
    }

    onChange(event){
        this.state[event.target.id] = event.target.value;
        this.setState(this.state)
    }

    render(){
        return ( 
        <div className="row">
            <div className="col-sm">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="select">{this.props.label.toUpperCase()}</label>
                    </div>
                    <select value='0' onChange={this.onChange} ref="select" className="custom-select" id="select">
                        {this.renderOptions()}
                    </select>  
                </div>
            </div>
            <div className="col-sm">
                <input onChange={this.onChange} type="text" ref="input" id="input" className="form-control"/>
            </div>
            <div className="col-sm">
                <button onClick={() => this.props._onClick(this.dataToSend())} className="btn btn-success">Set {this.props.label.toUpperCase()}</button>
            </div>
        </div>
        )
    }
}

export default CoodinateSetter;