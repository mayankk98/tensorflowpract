function setup() {
	createCanvas(200, 200);

	let r = floor(random(256));
	let g = floor(random(256));
	let b = floor(random(256));
	background(r, g, b);

	let radioButtons = createRadio();
	radioButtons.option('red-ish');
	radioButtons.option('blue-ish');
	radioButtons.option('green-ish');

	let submit = createButton('submit');
	submit.mousePressed(sendData);


}
	function sendData() {
		//send data to firebase
	}