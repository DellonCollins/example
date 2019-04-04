import Point from './point'
import Delaunator from 'delaunator';


export default function sketch (p) {
    var width = 600,  height = 400
    var points = []
    var coords = []
    var triangles = []
    var delaunayCoords = []
    var numPoints = 25
    var maxDistForConnection = 250;
    var dpi_x = 1, dpi_y = 1;
    var first = true;

    function distance(p1, p2){
      var dx = Math.pow( (p1[0] - p2[0]) , 2)
      var dy = Math.pow( (p1[1] - p2[1]) , 2)
      return Math.sqrt( dx + dy )
    }

    function updatePoints(){
      var len = points.length
      if(len < numPoints){
        while(points.length < numPoints){
          points.push(new Point(p, 0, width, 0, height))
        }
      }
      else if (len > numPoints){
        points = points.slice(0, numPoints)
      }
    }
    p.setup = function () {
      p.createCanvas(width, height, p.P2D);
      // for (let i = 0; i < numPoints; i++){
      //   points.push(new Point(p, 0, width, 0, height))
      // }
      updatePoints()
    };
  
    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
      if(props.dpix){
        dpi_x = props.dpix
      }
      if(props.dpiy){
        dpi_y = props.dpiy
      }

      if (props.width || props.height){
        if (props.width){
          width = props.width
        }
        if (props.height){
          height = props.height
        }

        var numPixels = width / dpi_x * height /dpi_y
        numPoints = parseInt(Math.log(numPixels)/ Math.log(1.25))
        console.log('numpix', numPixels, 'numpoints', numPoints)
        updatePoints()

        p.resizeCanvas(width, height);
      }
    };
  
    p.draw = function () {
      p.background(175);
      p.noStroke();
      coords = []
      points.forEach((element, index) => {
        coords.push([element.x, element.y])
        if (element.x < 0 + element.size/2){
          element.turnAround('x', 0 + element.size/2)
        }
        else if (element.x > width -element.size/2){
          element.turnAround('x', width -element.size/2)
        }
        else if (element.y < 0 + element.size/2){
          element.turnAround('y',  0 + element.size/2)
        }
        else if (element.y > height - element.size/2){
          element.turnAround('y',  height - element.size/2)
        }

        for (let j = index + 1; j < points.length; j++){
          element.applyForce(points[j])
        }

        element.active = 0;
        element.updateVelocity()
      })
      
      
      triangles = Delaunator.from(coords).triangles
      delaunayCoords = []
      
      for (let i = 0; i < triangles.length; i += 3) {
        delaunayCoords.push([
            coords[triangles[i]],
            coords[triangles[i + 1]],
            coords[triangles[i + 2]],              
            [triangles[i], triangles[i + 1], triangles[i + 2]]
        ]);
      }
      
      p.stroke("#F4D3C4");

      for (let i = 0; i < delaunayCoords.length; i++){
        var p0 = delaunayCoords[i][0]
        var p1 = delaunayCoords[i][1]
        var p2 = delaunayCoords[i][2]
        var tri = delaunayCoords[i][3]

        if (distance(p0, p1) < maxDistForConnection){
          points[tri[0]].active++
          points[tri[1]].active++
          p.line(p0[0], p0[1], p1[0], p1[1])
        }

        if (distance(p1, p2) < maxDistForConnection){
          points[tri[1]].active++
          points[tri[2]].active++
          p.line(p1[0], p1[1], p2[0], p2[1])
        }

        if (distance(p0, p2) < maxDistForConnection){
          points[tri[0]].active++
          points[tri[2]].active++
          p.line(p2[0], p2[1], p0[0], p0[1])
        }
      }

      p.noStroke();

      points.forEach((element) => {element.draw()})
      first = false
    };
  };