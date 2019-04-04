import React from 'react'

import Rotate from 'react-reveal/Rotate'
import Zoom from 'react-reveal/Zoom'
import Slide from 'react-reveal/Slide'
import Fade from 'react-reveal/Fade'

import StyledButton from './StyledButton'

class Contact extends React.Component{
    render(){
        return (
            <div className="container py-5">
                <Slide left duration={2000}>
                    <div className="row my-2 ">
                        <div className="main-text">
                            <Rotate top cascade duration={1000}>
                            Contact                      
                            </Rotate>
                        </div>
                        
                    </div>
                </Slide>

                <div className= 'container ml-md-5 mt-md-3'>
                    <div className="row px-4 px-md-0 my-2 mb-5">
                        <div className="col col-md-8 sub-text">
                        <Fade right delay={0} duration={1600}>
                        <p>Personal Email:</p>
                        </Fade>
                        <Fade right delay={600} duration={1600}>
                        <p className='hop mb-5'>collins.dellon@gmail.com</p>
                        </Fade>
                        <Fade right delay={1200} duration={1600}>
                        <p>Work Email:</p>
                        </Fade>
                        <Fade right delay={1800} duration={1600}>
                        <p className='hop'>dellon.collins@infosys.com</p>
                        </Fade>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Contact