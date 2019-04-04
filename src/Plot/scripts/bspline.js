
var matrix = require('./matrix')

export class Bspline{
    static generateQuadraticBspline(points, numPoints=20){
        var m = 
        [
            [  1,  1, 0],
            [ -2,  2, 0],
            [  1, -2, 1],
        ]

        m = matrix.scalarMultiply(0.5, m)
        
        var space = matrix.linspace(0, 1, numPoints), u = []

        for (let i = 0; i < space[0].length; i++){
            var currVal = space[0][i]
            var temp = []
            for (let j = 0; j < 3 ; j++){
                temp.push(Math.pow(currVal , j))
            }
            u.push(temp)
        }

        var curve = []
        points.unshift(points[0])
        points.push(points[points.length-1])
        for (let i = 0; i < points.length - 2; i++){
            var p = [
                points[i],
                points[i + 1],
                points[i + 2]
            ]

            var result = matrix.multiply(u, m)
            result = matrix.multiply(result, p)
            result.forEach(element => {
                curve.push(element)
            });
           
        } 

        return curve
    }

    static generateCubicBspline(points, numPoints=20){
        var m = 
        [
            [  -1,  3, -3, 1],
            [   3, -6,  3, 0],
            [  -3,  0,  3, 0],
            [   1,  4,  1, 0],
        ]

        m = matrix.scalarMultiply(1.0/6.0, m)
        
        var space = matrix.linspace(0, 1, numPoints), u = []

        for (let i = 0; i < space[0].length; i++){
            var currVal = space[0][i]
            var temp = [], tmp=[]
            for (let j = 3; j > -1; j--){
                temp.push(Math.pow(currVal , j))
                tmp.push(`u ^ ${j}`)
            }
            u.push(temp)
        }
        
        var curve = []
        points.unshift(points[0])
        points.unshift(points[0])
        points.push(points[points.length-1])
        points.push(points[points.length-1])
        
        for (let i = 0; i < points.length - 3; i++){
            var p = [
                points[i],
                points[i + 1],
                points[i + 2],
                points[i + 3]
            ]

            var result = matrix.multiply(u, m)
            result = matrix.multiply(result, p)
            result.forEach(element => {
                curve.push(element)
            });
           
        } 
        
        return curve
    }
}
