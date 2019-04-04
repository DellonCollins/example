import React from 'react';
import Plotly from "plotly.js";
import AddPoint from './addpoint'
import CurveSelector from './curveselector'
import { isNull } from 'util';
import {Bezier} from '../scripts/bezier'
import {CatmullRom} from '../scripts/catmullrom'
import {Bspline} from '../scripts/bspline'
import SetCoord from './setcoord';
import InstructionCard from './instructions';
import PointSlider from './pointsSlider'



class PlotComponent extends React.Component {
  constructor(){
    super();

    this.state = {_x : [0, 1, 2], _y :[2, 1, 2], currentPoint : [], selectedIndex : 0, numPoints : 3, curve : 'bezier', curvePoints : 10}

    this.attach = this.attach.bind(this)
    this.graphEventListener = this.graphEventListener.bind(this)
    this.onClickHandler = this.onClickHandler.bind(this)
    this.getCoordChange = this.getCoordChange.bind(this)
    this.draw = this.draw.bind(this)
    this.preprocessPoints = this.preprocessPoints.bind(this)
    this.addPoint = this.addPoint.bind(this)
    this.deletePoint = this.deletePoint.bind(this)
    this.setCoord = this.setCoord.bind(this)
    this.onDoubleClickHandler = this.onDoubleClickHandler.bind(this)
    this.getOffset = this.getOffset.bind(this);
    this.onIndexSelectorChange = this.onIndexSelectorChange.bind(this);
    this.changeCurve = this.changeCurve.bind(this)
  }

  locked = null;
  gd = null;
  d3 = null;
  _fullLayout = null;

  setCoord(){
    this.setState({_x : this.state._x, _y : this.state._y})
  }

  getOffset(){
    var rect = this.gd.getBoundingClientRect()
    return {top : rect.top , left : rect.left } 
  }

  componentDidMount(){
    this.d3 = Plotly.d3;
    this.gd = document.getElementById('graph');
    this.draw(true);
  }

  draw(initial = false, selectedCurve = this.state.curve, curvePoints = this.state.curvePoints){
    var curve;

    console.log(initial, selectedCurve, curvePoints)

    if (selectedCurve === 'bezier'){
      var b = Bezier.generateBezier(this.preprocessPoints(), curvePoints)
      curve = this.postprocessPoints(b)
    }
    else if (selectedCurve === 'catmullrom'){
      curve = this.postprocessPoints(CatmullRom.generateCRSpline(this.preprocessPoints(), curvePoints))
    }
    else if (selectedCurve === 'quadraticBspline'){
      curve = this.postprocessPoints(Bspline.generateQuadraticBspline(this.preprocessPoints(), curvePoints))
    }
    else if (selectedCurve === 'cubicBspline'){
      curve = this.postprocessPoints(Bspline.generateCubicBspline(this.preprocessPoints(), curvePoints))
    }
    
    var data = 
    [
      {
        x: this.state._x,
        y: this.state._y,
        mode: 'markers',
        name: 'control points',
        text: this.pointLabels(this.state._x.length),
        textposition: 'bottom center'
      },
      {
        x: curve.x,
        y: curve.y,
        name: 'curve',
        mode: 'lines'
      },
    ]

    
    var config = {responsive: true, doubleClick: false}
    var layout = {
      paper_bgcolor: '#3333'
    // plot_bgcolor: 'rgba(7,7,7,9)'
  }
    if (initial){
      Plotly.newPlot('graph', data, null, config)
      .then(this.attach())
    }
    else{
      layout = {
        xaxis: {range: this._fullLayout.xaxis.range},
        yaxis: {range: this._fullLayout.xaxis.range}
      } ; 
      Plotly.react('graph', data, layout)
    }
  }

  preprocessPoints(){
    var points = []
    for (let i = 0; i < this.state._x.length; i++){
      points.push([this.state._x[i], this.state._y[i]])
    }
    return points;
  }
  postprocessPoints(points){
    var xCoord = [], yCoord = [];
    try {
      for (let i = 0; i < points.length; i++){
        xCoord.push(points[i][0])
        yCoord.push(points[i][1])
      }
      return {"x": xCoord, "y": yCoord}
    }
    catch (e){
      return {"x": this.state._x, "y": this.state._y}
    }
    
  }

  pointLabels(numPoints){
    let l = [];
    for(let i = 0; i < numPoints; i++){
      l.push(`Point ${i}`);
    }
    return l;
  }

  attach() {
    this._fullLayout = this.gd._fullLayout;
    this.gd.oncontextmenu = () => {return false;}
    this.gd.addEventListener('mousemove', this.graphEventListener);
    this.gd.on('plotly_click', this.onClickHandler);
    this.gd.on('plotly_doubleclick', this.onDoubleClickHandler);
  }

  graphEventListener(evt){
    var offset = this.getOffset();
    this._fullLayout = this.gd._fullLayout;
    var xInDataCoord = this._fullLayout.xaxis.p2c(evt.x - this._fullLayout.margin.l - offset.left);
    var yInDataCoord = this._fullLayout.yaxis.p2c(evt.y - this._fullLayout.margin.t - offset.top);
    this.setState({currentPoint : [xInDataCoord, yInDataCoord]})
    if (! isNull(this.locked)){
      this.state._x[this.locked] = xInDataCoord;
      this.state._y[this.locked] = yInDataCoord;
      this.setCoord();
      this.draw();
    }
    Plotly.relayout(this.gd, 'title', ['x: ' + xInDataCoord.toFixed(3), 'y : ' + yInDataCoord.toFixed(3)].join('<br>'));
  }

  onClickHandler(data) {
    if (isNull(this.locked)){
      if (data.event.which === 1){
        for(var i=0; i < data.points.length; i++){
            if (data.points[i].curveNumber === 0){
              var index = data.points[i].pointIndex
            }
        }
        this.locked = index
      }
      else if (data.event.which === 3){
        for(i=0; i < data.points.length; i++){
          if (data.points[i].curveNumber === 0){
            this.deletePoint(data.points[i].pointIndex)
          }
        }
      }
    }
    else {
      this.locked = null
    }
  }

  onDoubleClickHandler(data){
    var coord = {x : this.state.currentPoint[0], y : this.state.currentPoint[1]}
    console.log(coord)
    this.addPoint(coord)
  }

  onIndexSelectorChange(index){
    this.setState({selectedIndex: index})
  }

  changeCurve(curve){
    this.setState({"curve" : curve})
    this.draw(undefined, curve)
  }
  getCoordChange(data){
    console.log(data)
    this.state._x[data.index] = data.x;
    this.state._y[data.index] = data.y;
    this.setCoord()
    this.draw()
  }

  addPoint(coord){
    this.state._x.push(coord.x)
    this.state._y.push(coord.y)
    this.setState({numPoints : this.state.numPoints + 1})
    this.setCoord()
    this.draw();
  }

  deletePoint(index){
    var temp_x = [], temp_y = []
    for (let i = 0; i < this.state._x.length; i++){
      if (i !== index){
        temp_x.push(this.state._x[i])
        temp_y.push(this.state._y[i])
      }
    }
    this.state._x = temp_x
    this.state._y = temp_y
    this.setState({numPoints : this.state.numPoints - 1})
    this.setCoord()
    this.draw()
  }

  render() {
    return (
      <div className='container'>
        <div className="row pt-3">
          <div className="col-lg-8 mx-3 mx-lg-0">
            <div className="row mb-3">
              <CurveSelector _onChange={this.changeCurve}/>
            </div>
            <div className="row mb-3">
              <PointSlider initialNum={this.state.curvePoints} _changeNumPoints={(num) => {this.setState({curvePoints: num}); this.draw(undefined, undefined, num);}}/>
            </div>
            <div id="graph"/>
          </div>
          <div className="col-lg mx-3 mx-lg-0 ml-0 ml-lg-3 mt-3 mt-lg-0 px-3">
            <div className="row mb-3">
              <InstructionCard/>
            </div>
            <div className="row mb-3">
              <SetCoord numPoints={this.state.numPoints} _setCoord={this.getCoordChange} _onchange={this.onIndexSelectorChange} _getPoint={(index) => {return {x: this.state._x[index], y: this.state._y[index]}}} />
            </div>
            <div className="row">
              <AddPoint _addPoint={this.addPoint}/>
            </div>
            
          </div>
        </div>
      </div>
    );
  }
}

export default PlotComponent;

