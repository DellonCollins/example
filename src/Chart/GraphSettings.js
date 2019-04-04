import React from 'react'

export default class GraphSetting extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            title : '',
            xLabel : '',
            yLabel : '',
            dataLabels : '',
            datasets : [{},{},{},{},{},{},{}],
            graphType : 'bar',
            numberDatasets : 1,
        }
    }

    onKeyUp = (event) => {
        if(event.key === 'Enter'){
            this.props._onChange(this.state)
        }
    }

    onInputChange = (event) => {
        switch(event.target.id){
            case 'title':
                this.setState({title : event.target.value})
                break;
            case 'xLabel':
                this.setState({xLabel : event.target.value})
                break;
            case 'yLabel':
                this.setState({yLabel : event.target.value})
                break;
            case 'dataLabels':
                this.setState({dataLabels : event.target.value})
                break;
            case 'graphType':
                this.setState({graphType : event.target.value})
                break;
            case 'numberDatasets':
                this.setState({numberDatasets : event.target.value})
                break;
            default:
                var length = 0;
                var index = ''
                var id = event.target.id
                var _dataSets = [];
                if (id.match(/(dataValues)/)){
                    length = id.match(/(dataValues)/)[0].length
                    index = parseInt(id.substring(length))
                    _dataSets = this.state.datasets
                    _dataSets[index].dataValues = event.target.value
                    this.setState({datasets : _dataSets})
                }
                else if (id.match(/(lineLabel)/)){
                    length = id.match(/(lineLabel)/)[0].length
                    index = parseInt(id.substring(length))
                    _dataSets = this.state.datasets
                    _dataSets[index].lineLabel = event.target.value
                    this.setState({datasets : _dataSets})
                }
                else if (id.match(/(color)/)){
                    length = id.match(/(color)/)[0].length
                    index = parseInt(id.substring(length))
                    _dataSets = this.state.datasets
                    _dataSets[index].color = event.target.value
                    this.setState({datasets : _dataSets})
                }
                break;
        }
    }

    renderValueInputs = () => {
        var inputs = [] 
        for (let i = 0; i < this.state.numberDatasets; i++){
            inputs.push(<div key={i} className='form-group w-100'>
                <label className='m-0'>Data Values: {i + 1}</label>
                <div className='row'>
                    <div className='col-12'>
                        <input id={`dataValues${i}`} className='form-control' type='text' placeholder='value_1 value_2 value_3 . . .' onChange={this.onInputChange} onKeyPress={this.onKeyUp}/>
                    </div>
                    <div className='col-12'>
                        <input id={`lineLabel${i}`} className='form-control' type='text' placeholder='Line Label' onChange={this.onInputChange} onKeyPress={this.onKeyUp}/>
                    </div>
                    <div className='col-12'>
                        <input id={`color${i}`} className='form-control' type='color' defaultValue='#aa22aa' onChange={this.onInputChange} onKeyPress={this.onKeyUp}/>
                    </div>
                </div>
            </div>) 
        }
        return inputs
    }
    renderGraph(){
        return (
            <React.Fragment>
                <div className='scroll-y'>
                    <div className='form-group w-100'>
                        <label className='m-0'>Graph Type</label>
                        <select defaultValue='bar' id='graphType' className='form-control' onChange={this.onInputChange} onKeyPress={this.onKeyUp}>
                            <option value='bar'>Bar</option>
                            <option value='line'>Line</option>
                            <option value='pie'>Pie</option>
                            <option value='radar'>Radar</option>
                        </select>
                    </div>
                    <div className='form-group w-100'>
                        <label className='m-0'>Graph Title</label>
                        <input id='title' className='form-control' type='text' placeholder='Graph Title' onChange={this.onInputChange} onKeyPress={this.onKeyUp}/>
                    </div>
                    <div className='form-group w-100'>
                        <label className='m-0'>Horizontal Label</label>
                        <input id='xLabel' className='form-control' type='text' placeholder='X Axis Label' onChange={this.onInputChange} onKeyPress={this.onKeyUp}/>
                    </div>
                    <div className='form-group w-100'>
                        <label className='m-0'>Vertical Label</label>
                        <input id='yLabel' className='form-control' type='text' placeholder='Y Axis Label' onChange={this.onInputChange} onKeyPress={this.onKeyUp}/>
                    </div>
                    <div className='form-group w-100'>
                        <label className='m-0'>Data Labels</label>
                        <input id='dataLabels' className='form-control' type='text' placeholder='label_1 label_2 label_3 . . .' onChange={this.onInputChange} onKeyPress={this.onKeyUp}/>
                    </div>
                    <div className='form-group w-100'>
                        <label className='m-0'>Number Datasets</label>
                        <input id='numberDatasets' defaultValue={1} className='form-control' type='number' min={1} max={7} onChange={this.onInputChange} onKeyPress={this.onKeyUp}/>
                    </div>
                    {this.renderValueInputs()}
                </div>
                <button className='btn btn-dark' onClick={()=>{this.props._onChange(this.state)}}>Update Graph</button>
            </React.Fragment>
        )
    }
    render(){
        return (
            <div className='container'>
                <div className='row'>
                    {this.renderGraph()}
                </div>
            </div>
        )
    }
}