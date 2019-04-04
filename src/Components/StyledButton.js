import React , {Component} from 'react'
import { Link } from 'react-router-dom'

class StyledButton extends Component{
    parseColor(){
        var hex ="#"
        hex += this.props.backgroundColor.r.toString(16)
        hex += this.props.backgroundColor.g.toString(16)
        hex += this.props.backgroundColor.b.toString(16)
        hex += this.props.backgroundColor.a.toString(16)
        return hex;
    }

    render(){
        var styles = {
            backgroundColor : this.parseColor()
        }
        return (
            <Link to={this.props.link}>
            <button className="btn sub-text w-100 wobble" style={styles}>
                <div className="btn-text-sm "> {this.props.text} </div>
            </button>
            </Link>
        )
    }
}

StyledButton.defaultProps = {
    text : "Default text",
    backgroundColor : {r : 100, g:100, b:100, a:100}
}

export default StyledButton;