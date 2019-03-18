import React from 'react'

class CurveSelector extends React.Component{
        
    render(){
        return (
            <div className="input-group">
                <div className="input-group-prepend">
                    <label className="input-group-text bg-success text-white">Curve Algorithm Selector</label>
                </div>
                <select onChange={(event) => this.props._onChange(event.target.value)} className="form-control">
                    <option value="bezier">Bézier Curve</option>
                    <option value="catmullrom">Catmull Rom Spline</option>
                </select>
                <div className="input-group-append">
                    <span className="input-group-text" id="basic-addon2"  data-toggle="popover" title="The same set of control points will yield different result with different algorithms">?</span>
                </div>
            </div>
        )
    }
}

export default CurveSelector