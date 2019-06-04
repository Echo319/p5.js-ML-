let walls = [];
let particle;


const sceneW = 1600;
const sceneH = 900;

function setup() {
	createCanvas(800, 600);
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
}

function keyPressed() {
	particle.move(keyCode)
}

function keyReleased() {
	particle.move(0)
}