class Particle {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.nextPos = this.pos.copy();
        this.dir = createVector(1, 0);

        this.vel = 0; //velocity
        this.maxVel = 2; //Max velocity
        this.turnSpeed = 0; //TurnSpeed
        this.maxTurnSpeed = 0.05; // max turn speed

        this.directions = {}

        this.range = 300; // Max sight distance.
        this.diameter = 16; // Give the paricle a size
        this.collide = false; //Walls should block it.

        this.rays = []
        let numberOfRays = 8000;
        let fov = 90;

        for (let a = -fov / 2; a < fov / 2; a += 360 / numberOfRays) {
            this.rays.push(new Ray(this.pos, this.dir, radians(a)));
        }

        // Array to keep track of where the rays hit to render the visual field
        this.shape = [];

    }

    update(walls) {
        this.getNextPosition();
        this.blocked(walls);
        this.updatePos();

        for (let ray of this.rays) {
            ray.update();
        }
        this.look(walls)
        this.show()
    }

    move(key) {
        switch (key) {
            // W 
            case 87:
                this.vel = this.maxVel;
                break;
                // S
            case 83:
                this.vel = -this.maxVel;
                break;
                // A 
            case 65:
                this.turnSpeed = -this.maxTurnSpeed;
                break;
                // Dwww
            case 68:
                this.turnSpeed = this.maxTurnSpeed;
                break;

            case 0:
                this.vel = 0;
                this.turnSpeed = 0;
                break;
        }
    }


    getNextPosition() {
        this.dir.rotate(this.turnSpeed);

        const step = this.dir.copy().mult(this.vel);
        this.nextPos = this.pos.copy().add(step);
    }

    updatePos() {
        if (!this.collide) {
            this.pos.x = this.nextPos.x
            this.pos.y = this.nextPos.y
          }
        }


    blocked(walls) {
        this.collide = false;
        const dMax = (this.diameter / 2) + (2);

        for (let wall of walls) {
            //Vertical
            if (wall.a.x === wall.b.x) {
                if (abs(this.nextPos.x - wall.a.x) < dMax) {
                    const yMin = min(wall.a.y, wall.b.y);
                    const yMax = max(wall.a.y, wall.b.y);
                    if (yMin < this.nextPos.y + dMax && this.nextPos.y < yMax + dMax) {
                        this.collide = true;
                    }
                }
            } else {
                //Horizontal
                if (abs(this.nextPos.y - wall.a.y) < dMax) {
                    const xMin = min(wall.a.x, wall.b.x)
                    const xMax = max(wall.a.x, wall.b.x)
                    if (xMin < this.nextPos.x + dMax && this.nextPos.x < xMax + dMax) {
                        this.collide = true;
                    }
                }
            }
        }
    }

    look(walls) {
        this.shape = [];

        for (let ray of this.rays) {
            let closest = this.pos.copy().add(ray.dir.mult(this.range));
            let record = this.range;
            let wallHitId = null; //need to know which wall the ray hit to render correctly.

            for (let wall of walls) {
                let pt = ray.cast(wall);
                if (pt) {
                    const d = p5.Vector.dist(this.pos, pt);
                    if (d < record) {
                        closest = pt;
                        wallHitId = wall.id;
                        record = d;
                    }
                }
            }

            const point = {
                pos: createVector(closest.x, closest.y),
                wallHitId
            }
            this.shape.push(point)
        }
    }


    // DISPLAYS THE PARTICLE AND THE VISUAL FIELD
    show() {
        // Initialize variables to highlight the walls in the visual field
        // "highlight" is an array of fragments
        // A "fragment" is a series of points on the same wall
        // Each "fragment" will be rendered as a white stroke (with vertices)
        let highlight = []
        let fragmentId = 0

        // Draw the vision (grey area) and prepare the "highlight" array
        noStroke()
        fill(100)

        beginShape()
        vertex(this.pos.x, this.pos.y)

        for (let i = 0; i < this.shape.length; i++) {
            // Set the vertex for the vision
            const p = this.shape[i]
            vertex(p.pos.x, p.pos.y)

            // Build an array of arrays, to highlight the walls
            if (i === 0) {
                // Initialize with the first point if i = 0
                highlight[fragmentId] = []
                highlight[fragmentId].push(p.pos)
                continue
            } else if (p.wallHitId === null) {
                // Skip to the next point if it doesn't hit a wall
                // So that the end of the visual field is not white, if there is no wall here
                continue
            } else if (p.wallHitId !== this.shape[i - 1].wallHitId) {
                // Create a new fragment if the wall hit changes
                // So that there is no white stroke linking these two points
                fragmentId++
                highlight[fragmentId] = []
            }

            // Wether it is a new fragment or not, push the position in the fragment
            highlight[fragmentId].push(p.pos)
        }

        vertex(this.pos.x, this.pos.y)
        endShape()

        // Draw the end of the rays on the walls
        stroke(255)
        strokeWeight(4)
        noFill()

        for (let fragment of highlight) {
            // Make a stroke for each fragment
            beginShape()
            for (let pos of fragment) {
                vertex(pos.x, pos.y)
            }
            endShape()
        }

        // Draw the particle
        noStroke()
        fill(255)

        ellipse(this.pos.x, this.pos.y, this.diameter)
    }
}