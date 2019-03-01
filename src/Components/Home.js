import React , {Component, Fragment} from 'react'
import NavBar from './NavBar'

class Home extends Component{
    render(){
        return(
            <div className="bg">
                <NavBar></NavBar>
                <div className="container-fluid transparent popup ">
                    <div className="row justify-content-center">
                        <h1 className="h-1">Dellon Collins</h1>
                    </div>
                    
                </div>
            </div>
            
        )
    }
}

export default Home;