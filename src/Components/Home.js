import React , {Component} from 'react'
import NavBar from './NavBar'
import StyledButton from './StyledButton'

class Home extends Component{
    render(){
        return(
            // <div className="bg">
            //     <NavBar/>
                
            <div className="container py-5">
                <div className="row my-2 fadein">
                    <div className="main-text">
                        Dellon Collins
                    </div>
                </div>

                <div className="row w-75 px-4 px-md-0 my-2 mb-5 fadein">
                    <div className="sub-text">
                    I am a software associate from Columbus, OH and 
                    am currently living in Indianapolis. My area of work
                    is Digital Experience/UI. If you are interested in my work
                    please do not hesitate to contact me.
                    </div>
                </div>

                <div className="row w-50 mt-5">
                    <div className="col-lg my-3 my-lg-0">
                        <StyledButton text="See my work" backgroundColor={{r : 200, g : 55, b : 150, a: 150} }/>
                    </div>
                    <div className="col-lg my-3 my-lg-0">
                        <StyledButton text="Get in touch" backgroundColor={{r : 200, g : 55, b : 150, a: 150} }/>
                    </div>
                </div>
            </div>
            // </div>
        )
    }
}

export default Home;