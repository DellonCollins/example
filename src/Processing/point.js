export default class Point {
    colors = [
        "#E0BBE4",
        "#957DAD",
        "#D291BC",
        "#FEC8D8",
        "#FFDFD3",

        "#F4D3C4",
        "#F2AEBB",
        "#D895DA",
        "#A091D6",
        "#696FC7",
        "#A7AAE1"
    ]
    
    constructor(sketch, xMin, xMax, yMin, yMax){
        var speed = 0.02;
        this.maxSpeed = 0.4;
        this.sketch = sketch
        this.size = this.randomInterval(25, 65)

        this.active = 0;
        this.xVelocity = this.randomInterval(-1, 1) * speed
        this.yVelocity = this.randomInterval(-1, 1) * speed

        this.x = this.randomInterval(xMin, xMax)
        this.y = this.randomInterval(yMin, yMax);
    }
    hexToRGBA (hexString) {
        var r = '0x' + hexString.substring(1, 3)
        var g = '0x' + hexString.substring(3, 5)
        var b = '0x' + hexString.substring(5, 7)
        return this.sketch.color(parseInt(r), parseInt(g), parseInt(b), 105)
    }
    randomInterval(min, max){
        return Math.random() * (max - min + 1) + min;
    }

    turnAround(axis, value){
        if(axis === 'x'){
            this.x = value
            this.xVelocity = -this.xVelocity
        }
        else if(axis === 'y'){
            this.y = value
            this.yVelocity = -this.yVelocity
        }
    }

    applyForce(point){
        var dist = this.distance(point)

        // if( dist > 250){return}

        var dx = this.x - point.x
        var dy = this.y - point.y
        
        var fx = Math.sqrt(this.size + point.size) * dx / (Math.pow(dist, 3))
        var fy = Math.sqrt(this.size + point.size)* dy / (Math.pow(dist, 3))

        this.xVelocity += fx
        this.yVelocity += fy

        point.xVelocity -= fx
        point.yVelocity -= fy
    }

    distance(point){
        var dx = this.x - point.x;
        var dy = this.y - point.y;
        dx *= dx;
        dy *= dy;
        return Math.sqrt(dx + dy)
    }

    bound(value, bound){
        if (bound < 0 && value < bound){
            return bound
        }
        else if (bound >= 0 && value > bound) {
            return bound
        }
        return value
    }

    draw(){
        var color = this.hexToRGBA("#F2AEBB")
        if (this.active < this.colors.length){
            color = this.hexToRGBA(this.colors[this.active])
        }
        else {
            color = this.hexToRGBA(this.colors[this.colors.length - 1])
        }
       
        this.sketch.fill(color)
        this.sketch.ellipse(this.x, this.y, this.size, this.size)
    }

    updateVelocity(){
        this.xVelocity = this.bound(this.xVelocity, this.maxSpeed)
        this.yVelocity = this.bound(this.yVelocity, this.maxSpeed)
        this.x += this.xVelocity;
        this.y += this.yVelocity;
    }
}