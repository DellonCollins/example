import React from 'react'
class InstructionCard extends React.Component{
    render(){
        return (
            <div className="card w-100 bg-transparent">
                <div className="card-header btn btn-success bg-success font-weight-bold" id="instructionHeader" data-toggle="collapse" data-target="#instructionBody" aria-expanded="false" aria-controls="instructionBody">
                Instructions
                </div>
                <div id="instructionBody" className="collapse" aria-labelledby="instructionHeader">
                <div className="card-body text-white">
                    <p>
                    This plot generates curves using an ordered list of control points. Rearrange the points to 
                    manipulate the curve. Keep in mind that the order of points matters in rendering the curve.
                    To see the index of a point, hover over it (indexing begins at 0).
                    </p>
                    <p>
                    Left click on a control point to pick it up. Once selected you can drag and control
                    its position. Left click again to set the point at that position. Be careful not to 
                    double click or a new point will appear on your cursor. Alternatively you can select the index
                    of the point below the graph and directly enter a number to change a point's coordinates.
                    </p>
                    <p>
                    There are two ways to add a point. You may double click on the graph as mentioned above or you can
                    enter the (x,y) coordinates in the "Add Points" panel and click the button below the input boxes.
                    New points are added the end of the points list.
                    </p>
                    <p>Right-click on a control point to delete it.</p>
                </div>
                </div>
            </div>
        )
    }  
}

export default InstructionCard;
