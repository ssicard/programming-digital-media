var serial;


function preload() {
    imgleft = loadImage('leftheart.png');
    imgright = loadImage('rightheart.png');
}

function setup() {
    createCanvas(1000, 550);
    // Instantiate our SerialPort object
    serial = new p5.SerialPort();

    serial.open("/dev/cu.usbmodem14201");

    serial.onData(gotData);
}

// This happens when there is data
function gotData() {
    
}

function draw() {
   
}

