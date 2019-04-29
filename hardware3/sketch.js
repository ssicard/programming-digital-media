var serial;
var portName = '/dev/ttyACM0';

//for pot / background change
var inData;
var backgroundColor;

//for led click
var outByte = 0;


function setup(){
	createCanvas(400, 300);

	serial = new p5.SerialPort();
	serial.on('list', printList);
	serial.on('connected', serverConnected);
	serial.on('open', portOpen);
	serial.on('data', serialEvent);
	serial.on('error', serialError);
	serial.on('close', portClose);

	serial.list();
	serial.open(portName);
}

function printList(portList){
	for(var i = 0; i < portList.length; i++){
		print(i + " " + portList[i]);
	}
}

function serverConnected() {
	print('Connected to server!');
}

function portOpen(){
	print('Serial port open');
}

function serialEvent(){
	inData = Number(serial.read());
}

function serialError(err){
	print('Something went wrong with the serial port.');
}

function portClose(){
	print('The serial port closed.');
}

function draw(){
	backgroundColor = map(inData, 0, 255, 0, 255);
	background(backgroundColor);
}

function mouseReleased(){
	if(outByte){
		outByte = 0;
	} else {
		outByte = 1;
	}
	print(outByte);
	serial.write(outByte);
}