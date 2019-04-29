var serial;


function setup() {
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  serial.open("/dev/cu.usbmodem14201");

  serial.onData(gotData);

  createCanvas(800, 600);

  // Set background colour
  background( 204 );
}

function gotData() {
  
}

function draw() {
  
}