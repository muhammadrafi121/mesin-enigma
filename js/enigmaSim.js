let letters = [];
let letterOrder 		 = 'QWERTYUIOPASDFGHJKLZXCVBNM';
let letterOrderLowerCase = 'qwertyuiopasdfghjklzxcvbnm';
let keyIsDown = false;
let keyDown;
let keyLight;

let enigma;

function setup() {
	frameRate(30);
	createCanvas(window.innerWidth, window.innerHeight);

	for (let i = 0; i < 26; i++) {
		let l = new Light(letterOrder[i], i);
		letters.push(l);
	}
	enigma = new Enigma();
	enigma.randomRotor();
	enigma.randomPosition();
}

function draw() {
	background(50, 50, 50);
	enigma.show();
}

function mousePressed() {
	enigma.click(mouseX, mouseY);
}

function keyPressed() {
	if (letterOrderLowerCase.indexOf(key) != -1 && !keyIsDown && !enigma.showPlugs) {
		let output = enigma.runMachine(key);
		if(output == '1'){
		  return;
		  
		}
		keyLight = output;
		letters[letterOrderLowerCase.indexOf(output)].lightUp = true;
		keyIsDown = true;
		keyDown = key;
	}
}

function keyReleased() {
	if (letterOrderLowerCase.indexOf(key) != -1 && key == keyDown) {
		letters[letterOrderLowerCase.indexOf(keyLight)].lightUp = false;
		keyIsDown = false;
	}
}