import React , {Component} from 'react'

class NavBar extends Component{
    render(){
        return (
            <nav class="navbar sticky-top transparent navbar-dark justify-content-center font">
                <div className="row">
                    <a class="navbar-brand col mx-4" href="/">Home</a>
                    <a class="navbar-brand col mx-4" href="/">Gallery</a>
                    <a class="navbar-brand col mx-4" href="/">Contact</a>
                </div>
            </nav>
        )
    }
}

export default NavBar;