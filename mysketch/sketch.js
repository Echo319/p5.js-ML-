let walls = [];
let particle;


const sceneW = 1600;
const sceneH = 900;

function setup() {
	createCanvas(sceneW,sceneH);

	for(let i = 0; i < 6; i++ ) {
		let x1 = random(sceneW);
		let y1 = random(sceneH);
		let x2 = random(sceneW);
		let y2 = random(sceneH);

		walls.push(new Boundary(x1, y1,x2,y2));
	}

	
	// walls.push(new Boundary(0, 0, sceneW,0))
	// walls.push(new Boundary(sceneW, 0, sceneW, sceneH))
	// walls.push(new Boundary(sceneW, sceneH, 0,sceneH))
	// walls.push(new Boundary(0, sceneH, 0,0))

	particle = new Particle();
}

function draw() {
	background(0);

	//Turning
	if(keyIsDown(81)) {
		particle.rotate(0.05);
	} else if (keyIsDown(69)) {
		particle.rotate(-0.05);
	}

	//Moving 
	if(keyIsDown(87)) {
		//w - forward
		particle.move(2);
	} 
	if (keyIsDown(65)) {
		//a - left
		particle.strafe(-2);
	} 
	if (keyIsDown(83)) {
		particle.move(-2);
	} 
	if (keyIsDown(68)) {
		//d - right
		particle.strafe(2);
	}
	const scene = particle.look(walls);
	draw_2d();
	//draw_3d(scene);
	
	//particle.update(mouseX,mouseY);



}

function draw_2d() {
	for(let wall of walls) {
		wall.show();
	}
	particle.show();
}

function draw_3d(scene) {
	
	
	const w = sceneW / scene.length;

	push();
	//translate(sceneW, 0);
	for(let i = 0; i < scene.length; i++) {
		noStroke();

		const sq = scene[i]*scene[i];
		const wSq = sceneW * sceneW;

		const b = map(sq, 0, wSq, 255, 0);
		const h = map(scene[i], 0, sceneW, sceneH, 0);
		fill(b);
		rectMode(CENTER);

		rect(i * w + w / 2, sceneH / 2, w + 1, h);
	}
	pop();
}