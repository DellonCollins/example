var matrix = require('./matrix')

export class Bezier {
    static bezierMatrix(degree){
        var m = matrix.zeros(degree, degree);
        var diagonalMatrix = matrix.zeros(1, degree);

        for (let index = 0; index < degree; index++){
            diagonalMatrix[index] = matrix.nCr(degree - 1, index)
        }

        for (let i =0; i<  degree; i++){
            for (let j=0; j < degree - i; j++){
                m[i][j] = matrix.nCr((degree-1)-i, j) * diagonalMatrix[i]
            }
        }

        for (let i = 0; i < degree; i++){
            var sign = 1
            for (let j = degree - 1 - i; j > -1; j--){
                m[i][j] = m[i][j] * sign
                sign = -sign
            }
        }

        return m
    }

    static generateBezier(points, numPoints=20){
        var u = []
        var degree = points.length;
        var space = matrix.linspace(0, 1, numPoints)
        for (let i = 0; i < space[0].length; i++){
            var currVal = space[0][i]
            var temp = []
            for (let j = degree- 1; j > -1; j--){
                temp.push(Math.pow(currVal , j))
            }
            u.push(temp)
        }

        var m = this.bezierMatrix(degree)

        var result = matrix.multiply(u, m)
        result = matrix.multiply(result, points)

        return result
    }

    static dim = matrix.dim
}