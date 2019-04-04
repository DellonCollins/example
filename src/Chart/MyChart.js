import React from 'react'
import Chart from 'chart.js'
import GraphSetting from './GraphSettings';
import './chart.css';

export default class MyChart extends React.Component{
    constructor(){
        super()
        this.state = {chart : null, right : "-750px", width : 0, height : 0}
        this.getContainerDim = this.getContainerDim.bind(this)
    }

    componentDidMount(){
        var chart = new Chart(`chart`, 
        {
            type: 'bar',
            data: {},
            options: {
                tooltips: {
                    mode: 'index',
                },
                title : {
                    display : true,
                    text : ''
                }
            }
        })
        this.setState({chart : chart})
        this.interval = setInterval( this.getContainerDim, 500)
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    getContainerDim(){
        var chartContainer = document.getElementById('chart-container')
		var newWidth = chartContainer.clientWidth - 80
        var newHeight = chartContainer.clientHeight
        var parent = this.state.chart.canvas.parentNode

		if(this.state.width !== newWidth || this.state.height !== newHeight){
            console.log('changing',newWidth, newHeight, 'parent:', parent, chartContainer.getBoundingClientRect())
            parent.style.height = `${newHeight}px`
            parent.style.width = `${newWidth}px`
			this.setState({width : newWidth, height : newHeight})
		}
	}

    onSettingRecieved = (config) => {
        var _chart = this.state.chart
        console.log(_chart.config)

        _chart.data.labels = config.dataLabels.split(' ')

        _chart.data.datasets = []
        for(let i = 0; i < config.numberDatasets; i++){
            var color = config.datasets[i].color ? config.datasets[i].color : '#aa22aa'
            var data = config.datasets[i].dataValues ? config.datasets[i].dataValues.split(' ') : []
            _chart.data.datasets.push({
                data : data,
                label : config.datasets[i].lineLabel,
                backgroundColor : color + '77',
                hoverBackgroundColor : color + 'cc'
            }) 
        }

        _chart.options.title.text = config.title
        if(config.graphType !== 'pie' && config.graphType !== 'doughnut'){
            _chart.options.scales = {
                xAxes: [{
                    display : true,
                    scaleLabel : {display: true, labelString : config.xLabel}
                }],
                yAxes: [{
                    display : true,
                    scaleLabel : {display: true, labelString : config.yLabel},
                    ticks : {beginAtZero : true}
                }]
            }
        }
       else{
            _chart.options.scales = {
                xAxes: [{
                    display : false
                }],
                yAxes: [{
                    display : false,
                }]
            }
        }
        _chart.options.maintainAspectRatio = false

        _chart.config.type = config.graphType
        
        _chart.update()

        this.setState({chart : _chart})
    }

    toggleMenu = (event) => {
        var id = event.target.id;
        
        var menuToggle = document.getElementById(id)
        
        if(this.state.right === '-350px'){
            menuToggle.parentElement.classList.remove(['menu-active'])
            this.setState({right : '-750px'})
        }
        else{
            menuToggle.parentElement.classList.add(['menu-active'])
            this.setState({right : '-350px'})
        }
        
    }

    render(){
        return( 
            <React.Fragment>
                <div className='menu-container'>
                    <div  id='menu' className='menu border border-secondary' onClick={this.toggleMenu}/>
                    <div className='w-50 settings border border-secondary'>
                        <GraphSetting _onChange={this.onSettingRecieved}/>
                    </div>
                </div>
                <div  className='h-100 noscroll-y'>
                    <div id='chart-container' className='container-fluid ml-2 px-lg-5 h-100'>
                        <div className='row'>
                            <div className='col-lg bg-light' style={{borderRadius : '15px'}}>
                                <div className='chart-wrapper' width={this.state.width} height={this.state.height}>
                                    <canvas id='chart'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}