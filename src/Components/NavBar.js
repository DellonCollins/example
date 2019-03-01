import React , {Component} from 'react'

class NavBar extends Component{
    render(){
        return (
            <nav class="navbar fixed-top navbar-light bg-light justify-content-center">
                <div className="row">
                    <a class="navbar-brand col mx-4">Home</a>
                    <a class="navbar-brand col mx-4" href="#">Gallery</a>
                    <a class="navbar-brand col mx-4" href="#">Contact</a>
                </div>
            </nav>
        )
    }
}

export default NavBar;