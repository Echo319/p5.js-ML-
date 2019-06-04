let walls = [];
let particle;


const sceneW = 1600;
const sceneH = 900;

function setup() {
	createCanvas(800, 600);
	particle = new Particle(25,25);
	//init some boundrys
	
	 for(let i = 0; i < 6; i++) {
	 	let x1 = random(sceneW);
	 	let y1 = random(sceneH);
	 	let x2 = random(sceneW);
	 	let y2 = random(sceneH);

	 	walls.push(new Boundary(i, x1,y1,x2,y2));
	 }


}

function draw() {
	background(0);

	for(let wall of walls) {
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