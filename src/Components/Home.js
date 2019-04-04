import React , {Component} from 'react'
import Fade from 'react-reveal/Fade'
import Zoom from 'react-reveal/Zoom'

import StyledButton from './StyledButton'

class Home extends Component{
    render(){
        return(
            <div className="container py-md-5">
                <Zoom delay={1000} duration={2000}>
                    <div className="row my-2 ">
                        <div className="main-text">
                            Dellon Collins                         
                        </div>
                    </div>
                </Zoom>

                <div className= 'container ml-md-5 mt-md-3'>
                    <Fade right cascade duration={2200}>
                        <div className="row px-4 px-md-0 my-2 mb-5">
                            <div className="col col-md-7 p-md-2 bg-dark-faded round sub-text">
                                Hi, I am a software associate from Columbus, OH and 
                                am currently living in Indianapolis. My area of work
                                is Digital Experience/UI. I have a BS in Computer Science and Engineering
                                from The Ohio State University. My hobbies include making music, online gaming,
                                and reading. If you are interested in my work feel free to contact me.
                            </div>
                        </div>
                    </Fade>

                    <Fade up delay={500} duration={3250}>
                        <div className="row w-50 mt-md-5">
                            <div className="col-lg my-3 my-lg-0">
                                <StyledButton link='gallery' text="See my work" backgroundColor={{r : 55, g : 55, b : 55, a: 150} }/>
                            </div>
                            <div className="col-lg my-3 my-lg-0">
                                <StyledButton link='contact' text="Get in touch" backgroundColor={{r : 55, g : 55, b : 55, a: 150} }/>
                            </div>
                        </div>
                    </Fade>
                </div>
            </div>
        )
    }
}

export default Home;