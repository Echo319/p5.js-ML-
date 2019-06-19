let walls = [];
let particle;


const sceneW = 1600;
const sceneH = 900;

function setup() {
	createCanvas(1600, 900);

	background(0);
	frameRate(60);
	// start of course pointing north
	particle = new Particle(150, 550, -90);

	// create random map 
	let map = new Map();
	walls = map.genWalls();
	translate(width / 2, height / 2)
	stroke(255)
	noFill()


}

function draw() {

	for (let wall of walls) {
		wall.show();
	}

	// particle.update(walls);

	// this.move();


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
	if (keyCode == 87 || keyCode == 83) {
		particle.setVel(0);
	}

	if (keyCode == 65 || keyCode == 68) {
		particle.setRot(0);
	}
}