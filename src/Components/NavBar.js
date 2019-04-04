import React , {Component} from 'react'
import { Link } from 'react-router-dom'
import { Route, HashRouter } from 'react-router-dom';

import NavIcon from './NavIcon'


class NavBar extends Component{
    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this)
        this.state = {path : this.props.path}
    }
    componentDidMount(){
        console.log(this.props.path)
    }
    onClick(event) {
        this.setState({path : window.location.hash})
        // var currentTarget = event.currentTarget
        // var navbar = document.getElementsByClassName('navbar-nav')[0]
        // var navItems = navbar.children
        // for(let i = 0; i < navItems.length; i++){
        //     navItems[i].classList.remove('active')
        // }
        // currentTarget.classList.add('active')
    }

    render(){
        return (
            <nav className="navbar navbar-expand-lg fadein navbar-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item mx-3" onClick={this.onClick}>
                            <Link className="nav-link" to="/home">
                                <NavIcon src='home.png' text='Home'/>
                            </Link>
                        </li>
                        <li className="nav-item mx-3" onClick={this.onClick}>
                            <Link className="nav-link" to="/gallery">
                                <NavIcon src='gallery.png' text='Gallery'/>
                            </Link>
                        </li> 
                        <li className="nav-item mx-3" onClick={this.onClick}>
                            <Link className="nav-link" to="/contact">
                                <NavIcon src='card.png' text='Contact'/>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default NavBar;