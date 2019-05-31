class Particle {
    constructor() {
        this.pos = createVector(width/2,height/2);
        this.rays = [];

        let numberOfRays = 36;
        let angleStep = 360 / numberOfRays;
        for(let i = 0; i < 360; i+= angleStep) {
            this.rays.push(new Ray(this.pos, radians(i)));
        }
    }

    update(x,y) {
        this.pos.x = x;
        this.pos.y = y;
    }

    show() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, 4);

        for(let ray of this.rays) {
            ray.show();
        }
    }

    look(wall) {
        for (let ray of this.rays ) {
            const pt = ray.cast(wall);

            if(pt) {
                line(this.pos.x, this.pos.y, pt.x, pt.y)
            }
        }
    }   
} 