import React , {Component} from 'react'

class NavBar extends Component{
    render(){
        var styles = {
            backgroundColor : "#08080840"
        }
        return (
            <nav className="navbar navbar-dark navbar-expand-md">
                {/* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button> */}
                <div className="row justify-content-start justify-content-med-between">
                    <a className="navbar-brand col mx-4" href="/">Home</a>
                    <a className="navbar-brand col mx-4" href="/">Gallery</a>
                    <a className="navbar-brand col mx-4" href="/">Contact</a>
                </div>
            </nav>
        )
    }
}

export default NavBar;