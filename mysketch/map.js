class Map {

    walls = []
    checkpoints = []

    trackWidth = 50;

    constructor() {}
    

    genWalls() {
        // outer 
        var outer = []
        // inner 
        var inner = []
        // checkpoints
        var checkpoints = []

        let noiseMax = 5;
        for (let a = 0; a <= TWO_PI; a += radians(5)) {
            let xoff = map(cos(a), -1, 1, 0, noiseMax)
            let yoff = map(sin(a), -1, 1, 0, noiseMax)
            let r = map(noise(xoff, yoff), 0, 1, 100, height / 2)

            let xTranslate = width / 2
            let yTranslate = height / 2

            let x = xTranslate + r * cos(a);
            let y = yTranslate + r * sin(a);

            let x1 = xTranslate + (r + this.trackWidth) * cos(a);
            let y1 = yTranslate + (r + this.trackWidth) * sin(a);

            let x2 = xTranslate + (r - this.trackWidth) * cos(a);
            let y2 = yTranslate + (r - this.trackWidth) * sin(a);

            //point c = createVector(x,y);
            checkpoints.push(createVector(x, y))
            outer.push(createVector(x1, y1))
            inner.push(createVector(x2, y2))

        }

        // These might actually be the other way around 
        for (let i = 0; i < checkpoints.length; i++) {
            // inside boundrys
            let a1 = inner[i]
            let b1 = inner[(i + 1) % checkpoints.length]
            walls.push(new Boundary(walls.length, a1.x, a1.y, b1.x, b1.y))
            // outside boundrys
            let a2 = outer[i]
            let b2 = outer[(i + 1) % checkpoints.length]
            walls.push(new Boundary(walls.length, a2.x, a2.y, b2.x, b2.y))
        }

        return walls;
    }

    getCheckpoints() {
        return checkpoints
    }
}