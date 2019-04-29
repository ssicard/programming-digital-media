var serial; //serial port
var currentString; //current data

var sensors = [];
var portName = "/dev/ttyACM0";

var inData;
var outData = 0;
var outMessage;

var rightSlider;
var rightBrightness;

function setup() {
	createCanvas(512, 512);

	serial = new p5.SerialPort();

	serial.list();
	serial.open(portName);

  	serial.on('connected', serverConnected);
	serial.on('list', printList);
	serial.on('data', gotData);
	serial.on('error', throwError);
	serial.on('open', gotOpen);
}

function serverConnected(){
	print("server is connected.");
}

function printList(theList){
	for(var i = 0; i < theList.length; i++){
		print(i + " " + theList[i]);
	}
}

function gotData(){
	var temp = serial.readStringUntil("\r\n");
	print(temp);
	if(temp){
		currentString = temp;
	}
	sensors = currentString;
}

function throwError(error){
	print(error);
}

function gotOpen(){
	print("Serial port is open");
}

function draw(){
	background(0);

	var leftBrightness = map(inData, 0, 255, 0, 255);
	fill(leftBrightness);
	rect(0,0,width/2,height);

	outData = rightBrightness;
	serial.write(outData);

	var textRColor = map(rightBrightness, 0, 255, 255, 0);
	fill(textRColor);
	textSize(16);
	text("ME", width- 200, 30);
	textSize(12);
	text("BRIGHTNESS LEVEL: " + rightBrightness, width - 250, 50);

	fill(255);
	rect(width/2 - .5, 0, 1, height);
}

function mouseReleased(){
	if(outMessage == '1'){
		outMessage = '0';
	}
	else{
		outMessage = '1';
	}
	serial.write(outMessage);
	print(outMessage);
}