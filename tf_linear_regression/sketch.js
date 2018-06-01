let x_val = [];
let y_val = [];

let m, b;

//Stochastic gradient descent for optimize function
const learningRate = 0.2;
const optimizer = tf.train.sgd(learningRate);

function setup() {
	createCanvas(400, 400);
	// background(0);

	m = tf.variable(tf.scalar(random(1)));
	b = tf.variable(tf.scalar(random(1)));
}

function loss(pred, label) {

	return pred.sub(label).square().mean();
	// (pred, label) => pred.sub(label).square().mean();


}
function predict(x) {
	const xs = tf.tensor1d(x);
	// y = mx + b;
	const ys = xs.mul(m).add(b);
	return ys;
}

function mousePressed() {

	let x = map(mouseX, 0, width, 0, 1);
	let y = map(mouseY, 0, height, 1, 0);
	x_val.push(x);
	y_val.push(y);
}

function draw() {

	tf.tidy(() => {
		if(x_val.length > 0) {
			const ys = tf.tensor1d(y_val);
			optimizer.minimize(() => loss(predict(x_val),ys));
		}
	});

	background(0);

	stroke(255);
	strokeWeight(8);

	for (let i = 0; i < x_val.length; i++) {
		let px = map(x_val[i], 0, 1, 0, width);
		let py = map(y_val[i], 0, 1, height, 0);
		point(px, py);
	}



	const lineX = [0, 1];

	const ys = tf.tidy(() => predict(lineX));
	let lineY = ys.dataSync();
	ys.dispose();

	let x1 = map(lineX[0], 0, 1, 0, width);
	let x2 = map(lineX[1], 0, 1, 0, width);

	

	let y1 = map(lineY[0], 0, 1, height, 0);
	let y2 = map(lineY[1], 0, 1, height, 0);
	strokeWeight(2);
	line(x1, y1, x2, y2);
	

	ys.dispose();
	//noLoop();
}