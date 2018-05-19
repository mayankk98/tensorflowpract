function setup() {
	noCanvas();

	// // Tensors	

	// const data = tf.tensor([1,2,3,4]);
	// const data1 = tf.tensor([0,0,127,255], [2,2]);
	// const data2 = tf.tensor([0,0,127,255.5, 32.6, 44, 100, 80], [2, 2,2], 'int32');
	// // data.print();
	// console.log(data.toString());
	// console.log(data1.toString());
	// console.log(data2.toString());
	// console.log(data2);



	// const values = [];
	// for (let i = 0; i < 15; i++){
	// 	values[i] = random(0, 100);
	// }

	// const shape = [2, 5, 3];

	// const data3 = tf.tensor3d(values, shape, 'int32');

	// console.log(data3.toString());
	// console.log(data3.dataSync());
	// console.log(data3.get(29));

	// // promises-then, await, async

	// console.log(data3.dataSync());

	// // Variables and math operations

	// const vtense = tf.variable(data3);
	// console.log(vtense);


	// const a = tf.tensor3d(values, shape, 'int32');	
	// const b = tf.tensor3d(values, shape, 'int32');

	// const c = a.add(b);
	// // a.print();
	// // b.print();
	// c.print();

	// a.mul(b).print();


	// const shapeA = [5,3];
	// const shapeB = [3,5];


	// const d = tf.tensor3d(values, shapeA, 'int32');	
	// const e = tf.tensor3d(values, shapeB, 'int32');

	// d.matMul(e).print();

	//Memory management

	function draw() {

		const values = [];
		for (let i = 0; i < 15; i++){
		values[i] = random(0, 100);
		}
	const shape = [5,3];

		tf.tidy(() => {

			const x = tf.tensor3d(values, shape, 'int32');
			const y = tf.tensor3d(values, shape, 'int32');
			const b_t = y.transpose();

			const z = x.matMul(b_t);
			console.log('hello');
		});
		// console.log('hello');

		// a.dispose();
		// b.dispose();
		// b_t.dispose();

		console.log(tf.memory().numTensors);
	 }


}