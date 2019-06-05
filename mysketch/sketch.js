let walls = [];
let particle;


const sceneW = 1600;
const sceneH = 900;

function setup() {
	createCanvas(800, 600);
	frameRate(60);
	// start of course pointing north
	particle = new Particle(150, 550, -90);

	//init some boundrys
	walls.push(new Boundary(walls.length, 100, 550, 100, 300));
	walls.push(new Boundary(walls.length, 200, 550, 200, 300));

	walls.push(new Boundary(walls.length, 100, 300, 150, 200));
	walls.push(new Boundary(walls.length, 200, 300, 300, 200));

	walls.push(new Boundary(walls.length, 150, 200, 250, 100));
	walls.push(new Boundary(walls.length, 300, 200, 800, 200));

	walls.push(new Boundary(walls.length, 250, 100, 800, 100))

}

function draw() {
	background(0);

	for (let wall of walls) {
		wall.show();
	}

	particle.update(walls);

	this.move();
}


function move() {
	// w 
	if (keyIsDown(87)) {
		particle.setVel(2)
	}
	// s
	if (keyIsDown(83)) {
		particle.setVel(-2)
	}
	// a
	if (keyIsDown(65)) {
		particle.setRot(-0.05)
	}
	// d
	if (keyIsDown(68)) {
		particle.setRot(0.05)
	}

	//particle.setVel(0);
	//particle.setRot(0);
}

function keyReleased() {
	if(keyCode == 87 || keyCode == 83) {
		particle.setVel(0);
	}

	if(keyCode == 65 || keyCode == 68) {
		particle.setRot(0);
	}
}