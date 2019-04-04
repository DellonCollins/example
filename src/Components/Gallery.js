import React from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'; 

class Gallery extends React.Component{
  constructor(){
    super();
    this.state = {
      items : [
        {
          src : 'gallery/plot_2.png',
          label : '2D Curve Generation',
          description : 'Place control points to generate curves using various algorithms',
          link : 'plot'
        },
        {
          src : 'gallery/chart.png',
          label : 'Interactive Graphing Tool',
          description : 'Creative visually impressive graphs using chart.js\' API',
          link : 'chart'
        },
      ],
      index : 0
    }
    this.renderCarouselItems = this.renderCarouselItems.bind(this)
  }

  componentDidMount(){
    $("#carousel").carousel()
    $("#carousel").on('slide.bs.carousel', this.updateCarouselIndex);
  }

  updateCarouselIndex = (event) => {
    this.setState({index : event.to})
    console.log('index:', event.to);
  }

   
    renderCarouselItems(){
      var carItems = []
      var clsName = "carousel-item active"
      
      this.state.items.forEach(
        (element, index) => {
          carItems.push(
            <Link key={index} className={clsName} to={`/${element.link}`}>
              <img src={element.src} className="d-block w-100 img-filter"/>
              <div className="carousel-caption d-none d-md-block bg-dark">
                <h5>{element.label}</h5>
                <p>{element.description}</p>
              </div>
            </Link>
          )
          clsName="carousel-item"
        }
      )
      return carItems
    }

    render(){
        return (
            <div className="container-fluid">
              <div className="row fadein py-4 mx-lg-5">
                <div id="carousel" className="carousel slide offset-md-1 col-md-10"  data-interval={false} onChange={(event) => {console.log(event)}}  data-ride="carousel">
                  
                  <div className="carousel-inner">
                    {this.renderCarouselItems()}
                  </div>

                  <a id='prev' className="carousel-control-prev" href="#carousel" 
                  role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                  </a>

                  <a id='next' className="carousel-control-next" href="#carousel" 
                  role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                  </a>
                </div>
              </div>
              <div className='row'>
               
                <div className="d-block d-md-none bg-dark w-100 pt-2 mx-5">
                    <div className='text-light text-center'>
                      <h5>{this.state.items[this.state.index].label}</h5>
                      <p>{this.state.items[this.state.index].description}</p>
                    </div>
                  </div>
              </div>
            </div>
        )
    }
}

export default Gallery;