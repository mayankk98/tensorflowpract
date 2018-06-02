
// This is the model
const model = tf.sequential();


// Create the hidden layer
// Dense is a 'fully connected layer'
const hidden = tf.layers.dense({
	units: 4,	// number of nodes
	inputShape: [2], //input shape
	activation: 'sigmoid'
});
// Add the layer
model.add(hidden);



// Create another layer
const output = tf.layers.dense({
	units: 1, 
	// here the input shape is 'inferred from the previous layer'
	activation: 'sigmoid'
});
model.add(output);



// optimizer using stochastic gradient descent 
const sgdOpt = tf.train.sgd(0.5);



// Compiling the model after it is configured
model.compile({
	optimizer: sgdOpt,
	loss: tf.losses.meanSquaredError,
});



const xs = tf.tensor2d([
	[0.1, 0.1],
	[0.9, 0.9],
	[0.5, 0.5],
]);

const ys = tf.tensor2d([
	[0.9],
	[0.1],
	[0.5],
]);


train().then(() => {
	console.log('training complete');
	let outputs = model.predict(xs);
	outputs.print();

});

async function train () {
	for(let i = 0; i < 1000; i++) {		
		const response = await model.fit(xs, ys, {
			shuffle: true,
			epoch: 10
		});
		console.log(response.history.loss[0]);
	}
}




// const xs = tf.tensor2d([
// 	[0.25, 0.92],
// 	[0.25, 0.92],
// 	[0.25, 0.92],
// 	[0.25, 0.92],
// ]);
// let ys = model.predict(xs);
// ys.print();