var matrix = require('./matrix')


export class CatmullRom {
    static calculateKnot(t_i, p_i, p_j, alpha=0.5){
        var x_i = p_i[0]
        var y_i = p_i[1]

        var x_j = p_j[0]
        var y_j = p_j[1]

        var knot = ( ( (x_j-x_i)**2 + (y_j-y_i)**2 )**0.5 )**alpha + t_i
        return knot
    }

    static generateCRSpline(points){
        var p0, p1, p2, p3, t0, t1, t2, t3, u, numpoints
        numpoints = 20;

        var prepend, append
        prepend = [2 * points[0][0] - points[1][0], 2 * points[0][1] - points[1][1]]
        append = [ 2 * points[points.length-1][0] - points[points.length-2][0], 2*points[points.length-1][1] - points[points.length-2][1]]
        
        points.unshift(prepend)
        points.push(append)
        var curve = [];
        for (var i = 0; i < points.length-3; i++){
            p0 = points[i]
            p1 = points[i+1]
            p2 = points[i+2]
            p3 = points[i+3]

            

            t0 = 0;
            t1 = this.calculateKnot(t0, p0, p1);
            t2 = this.calculateKnot(t1, p1, p2);
            t3 = this.calculateKnot(t2, p2, p3);

            u = matrix.linspace(t1,t2,numpoints)

            for (var j = 0; j < u[0].length; j++){
                var t = u[0][j]
                
                var A1 = matrix.add(matrix.scalarMultiply((t1-t)/(t1-t0), p0) , matrix.scalarMultiply((t-t0)/(t1-t0),p1))
                var A2 = matrix.add(matrix.scalarMultiply((t2-t)/(t2-t1), p1) , matrix.scalarMultiply((t-t1)/(t2-t1),p2))
                var A3 = matrix.add(matrix.scalarMultiply((t3-t)/(t3-t2), p2) , matrix.scalarMultiply((t-t2)/(t3-t2),p3))
                
                var B1 = matrix.add(matrix.scalarMultiply((t2-t)/(t2-t0), A1) , matrix.scalarMultiply((t-t0)/(t2-t0), A2))
                var B2 = matrix.add(matrix.scalarMultiply((t3-t)/(t3-t1), A2) , matrix.scalarMultiply((t-t1)/(t3-t1), A3))

                var C = matrix.add(matrix.scalarMultiply((t2-t)/(t2-t1), B1) , matrix.scalarMultiply((t-t1)/(t2-t1), B2))
                curve.push(C[0])            
            }
        }
        return curve
    }
}
