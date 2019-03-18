import React from 'react'
import * as Matrix from '../scripts/matrix'
import * as CM from '../scripts/catmullrom'

class Test extends React.Component{
    onClick(){
        var p = 
        [
            [1, 1],
            [2, 5],
            [5, 3],
            [4, 5],
        ]
        //console.log(Matrix.createMatrix(1, 2))
        CM.CatmullRom.generateCRSpline(p)
    }

    render(){
        return <button className="btn btn-primary" onClick={this.onClick}>Click</button>
    }
}

export default Test