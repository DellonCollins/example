import React from 'react'

class NavIcon extends React.Component{

    render(){
        return (
            <div className="container">
                {/* <div className="row justify-content-md-center ">
                    <img height="42" width="42" src={`icons/${this.props.src}`}></img>
                </div> */}
                <div className="row">
                    <div className="grow text sub-text text-center">
                        {this.props.text}
                    </div>
                </div>
            </div>
        )
    }
}

export default NavIcon