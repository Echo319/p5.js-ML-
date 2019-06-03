class Particle {
    constructor() {
        this.pos = createVector(width / 4, height / 2);
        this.rays = [];
        this.heading = 0;

        let numberOfRays = 90;
        const angleStep = 90 / numberOfRays;
        // for (let i = -numberOfRays/2; i < numberOfRays/2; i += angleStep) {
        for (let i = -45; i < 45; i++) {
            this.rays.push(new Ray(this.pos, radians(i)));
        }
    }

    rotate(angle) {
        this.heading -= angle;
        let index = 0;
        //for (let i = -(this.numberOfRays / 2); i < (this.numberOfRays / 2); i += 1) {
        for (let i = -45; i < 45; i++) {
            this.rays[index].setAngle(radians(i) + this.heading);
            index++;
        }
    }

    update(x, y) {
        this.pos.x = x;
        this.pos.y = y;
    }

    move(step) {
        const vel = p5.Vector.fromAngle(this.heading);
        vel.setMag(step);
        this.pos.add(vel);
    }

    strafe(step) {
        const vel = p5.Vector.fromAngle(this.heading + HALF_PI);
        vel.setMag(step);
        this.pos.add(vel);
    }

    show() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, 4);

        for (let ray of this.rays) {
            ray.show();
        }
    }

    look(walls) {
        const scene = [];
        for (let i = 0; i < this.rays.length; i++) {
            let closest = null;
            let record = Infinity;
            for (let wall of walls) {
                const pt = this.rays[i].cast(wall);
                if (pt) {
                    let d = p5.Vector.dist(this.pos, pt);
                    let a = this.rays[i].dir.heading() - this.heading;
                    d *= cos(a);
                    if (d < record) {
                        record = d;
                        closest = pt;
                    }
                }
            }
            this.draw_ray(closest);

            scene[i] = record;

        }
        return scene;
    }

    draw_ray(closest) {
        if (closest) {
            stroke('rgb(100%,0%,10%)');
            strokeWeight(1);
            line(this.pos.x, this.pos.y, closest.x, closest.y);
        }
    }
}