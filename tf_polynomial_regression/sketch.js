let x_val = [];
let y_val = [];

let a, b, c, d;
let dragging = false;

//Stochastic gradient descent for optimize function
const learningRate = 0.2;
const optimizer = tf.train.adam(learningRate);

function setup() {
	createCanvas(400, 400);
	// background(0);

	a = tf.variable(tf.scalar(random(-1,1)));
	b = tf.variable(tf.scalar(random(-1,1)));
	c = tf.variable(tf.scalar(random(-1,1)));
	d = tf.variable(tf.scalar(random(-1,1)));

}

function loss(pred, label) {

	return pred.sub(label).square().mean();
	// (pred, label) => pred.sub(label).square().mean();


}
function predict(x) {
	const xs = tf.tensor1d(x);
	// y = ax^3 + bx^2 + cx + d;
	const ys = xs.pow(tf.scalar(3)).mul(a)
		.add(xs.square().mul(b))
		.add(xs.mul(c))
		.add(d);	
	return ys;
}

function mousePressed() {
	dragging = true; 
}

function mouseReleased() {
	dragging = false;
}

// function mouseDragged() {
// 	let x = map(mouseX, 0, width, -1, 1);
// 	let y = map(mouseY, 0, height, 1, -1);
// 	x_val.push(x);
// 	y_val.push(y);
// }

function draw() {

	if(dragging) {
		let x = map(mouseX, 0, width, -1, 1);
		let y = map(mouseY, 0, height, 1, -1);
		x_val.push(x);
		y_val.push(y);
	} else {
		tf.tidy(() => {
			if(x_val.length > 0) {
				const ys = tf.tensor1d(y_val);
				optimizer.minimize(() => loss(predict(x_val),ys));
			}
		});
}

	background(0);

	stroke(255);
	strokeWeight(8);

	for (let i = 0; i < x_val.length; i++) {
		let px = map(x_val[i], -1, 1, 0, width);
		let py = map(y_val[i], -1, 1, height, 0);
		point(px, py);
	}



	const curveX = [];

	for(let x = -1; x < 1.01; x += 0.05) {
		curveX.push(x);
	}

	const ys = tf.tidy(() => predict(curveX));
	let curveY = ys.dataSync();
	ys.dispose();

	beginShape();
	strokeWeight(2);
	noFill();
	stroke(255);
	strokeWeight(2);
	for (let i = 0; i < curveX.length; i++) {
		let x = map(curveX[i], -1, 1, 0, width);
		let y = map(curveY[i], -1, 1, height, 0);
		vertex(x, y);

	}
	endShape();

	console.log(tf.memory().numTensors);
	ys.dispose();
	//noLoop();
}