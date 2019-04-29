// BUG VARIABLES
var bug = [];
var COUNT = 3;
var bugWidth = 250;
var bugHeight = 180;
var DEATH_COUNT = 0;
var cur_deaths = 0; //current clicks in game round
// ENVIRONMENT VARIABLES
var BOUNDARY_X = 620;
var BOUNDARY_Y = 460;
var TIMER = 30;
var secondCount = 60; //delays timer
var game = 0;
var over = false;
var canvasWidth = 640;
var canvasHeight = 480;
// SOUND VARIABLES
var parkMusic, gameOverVoice, sndMiss, sndSquish, sndWings;
// CURSOR VARIABLES
var cursorX = canvasWidth/2;
var cursorY = canvasHeight/2;
var cursor;
// SERIAL VARIABLES
var serial;
var portName = '/dev/ttyACM0';
var inData;
var outByte = 0;


function preload(){
	 spawnBugs();
	 initSounds();
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  imageMode(CENTER);

  textSize(15);
  textAlign(LEFT);
  textStyle(BOLD);
  fill(0);

  cursor = loadImage('images/cursor.png');


    for(var i = 0; i < COUNT; i++){
	    bug[i].go();
    }


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


function draw() {
	background(0,255,255);

	// ####### GAMEPLAY #######
	if(TIMER > 0){
		if(cur_deaths == COUNT){
			spawnBugs();
			cur_deaths = 0;
			sndWings.volume = sndWings.volume*2;
			parkMusic.playbackRate *= 2;
		}
		else{
			//draw the bug
			for(var i = 0; i < COUNT; i++){
				bug[i].draw();
			}

			//text
			text("TIMER: " + TIMER, 20, 20);
			text("BUGS SQUISHED: " + DEATH_COUNT, 20, 50);

			//check if cursor is on the bug
			for(var i = 0; i < COUNT; i++){
				if (cursorX > bug[i].x - 20 && cursorX < bug[i].x + 20 && cursorY > bug[i].y - 20 && cursorY < bug[i].y + 20) {
		    		bug[i].onBug = true;  
			  	}
			  	else{
			  		bug[i].onBug = false;
			  	}
			}


  			// ## BUG HIT ##
  			if(inData){ //button is pressed
	  			if(TIMER > 0){
					var miss = true;
					for(var i = 0; i < COUNT; i++){
						if(bug[i].onBug && !bug[i].dead){
							bug[i].stop();
							bug[i].dead = true;
							miss = false;
							sndSquish.start();
						}
					}
					if(miss){
						sndMiss.start();
					}
				}
  			}

			// Timer count
			if(secondCount == 0){
				TIMER--;
				secondCount = 60;
				sndWings.start();
			}
			secondCount--;
		}
	}
	else{
		if(!over){
			triggerEndMusic();
			over = true;
		}

		textSize(60);
		text("GAME OVER", 150, 250);
		textSize(40);
		text("BUGS SQUISHED: " + DEATH_COUNT, 120, 300);
	}

	// ### CURSOR ### //
	image(cursor, cursorX, cursorY, 30, 30);

	if(cursorX + 15 >= canvasWidth){
		x=15;
	}
	else if(cursorX - 15 <= 0){
		x = canvasWidth - 15;
	}
	if(cursorY + 15 >= canvasHeight){
		y=15;
	}
	else if(cursorY -15 <= 0){
		y = canvasHeight - 15;
	}
	
}

function keyPressed() {

  //  ## CURSOR MOVEMENT ##
  if (keyCode === UP_ARROW) {
    cursorY = cursorY - 10;
  } else if (keyCode === DOWN_ARROW) {
    cursorY = cursorY + 10;
  }
  if (keyCode === LEFT_ARROW) {
    cursorX = cursorX - 5;
  } else if (keyCode === RIGHT_ARROW) {
    cursorX = cursorX + 5;
  }
}

//################## BUG FUNCTION / OBJECT ###############


function spawnBugs(){
  	game++;
  	COUNT = COUNT*game;
	for(var i = 0; i < COUNT; i++){
    	bug[i] = new Bug(random(30, BOUNDARY_X),random(30, BOUNDARY_Y), game, random([-1, 1]));
  		bug[i].go();
  	}
}

function Bug(x, y, speedModifier, direction){
	this.spriteSheet;

	this.frame = 0;
	this.moving = 0;
	this.facing = 0;
  	this.spriteSheet = loadImage("../images/dabees.png");
  	this.x = x;
  	this.y = y;

	var speed = 1*speedModifier;
	var onBug;
	var squishTime = 30;

	this.draw = function(){
    	push();
    	translate(this.x,this.y);

    	if(speed > 0){
			if(this.moving == -1){
				scale(-1,1);
			}

			//animation
			if(this.frame == 0){
				image(this.spriteSheet, 0, 0, 80, 80, 0, 0,bugWidth,bugHeight);
			}
			else if(this.frame == 1){
				image(this.spriteSheet, 0, 0, 80, 80, 260,0,bugWidth,bugHeight);
			}
			else if(this.frame == 2){
				image(this.spriteSheet, 0, 0, 80, 80, 520,0,bugWidth,bugHeight);
			}
			else if(this.frame == 3){
				image(this.spriteSheet, 0, 0, 80, 80, 0, 180,bugWidth,bugHeight);
			}
			else if (this.frame == 4){
				image(this.spriteSheet, 0, 0, 80, 80, 260, 180,bugWidth,bugHeight);
			}
			else if (this.frame == 5){
				image(this.spriteSheet, 0, 0, 80, 80, 520, 190, bugWidth,bugHeight);
			}
			else if(this.frame == 6){
				image(this.spriteSheet, 0, 0, 80, 80, 0, 380, bugWidth,bugHeight);
			}


			if(frameCount % 6 == 0){
				this.frame = (this.frame + 1) % 7;
				this.x = this.x + 6*speed*this.moving;

				//creates walls
			    if(this.x <= (0 + 40)){
			      this.moving = 1;
			      this.facing = 1;
			    }
			    else if(this.x >= (width - 40)){
			      this.moving = -1;
			      this.facing = -1;
			    }
			}
    	}
    	else{
    		if(this.facing < 0){
				scale(-1,1);
			}

    		//show squish to user
    		if(squishTime > 0){
    			image(this.spriteSheet, 0, 0, 80, 80, 260, 380, bugWidth,bugHeight);
    			squishTime--;
    		}
    		else{
    			//death image
    			image(this.spriteSheet, 0, 0, 80, 80, 520, 380, bugWidth,bugHeight);
    		}
    	}
		
    	pop();
	}

	this.go = function(){
		this.moving = direction;
	    this.facing = direction;
	    onBug = false;
	    dead = false;
	}

  	this.stop = function(){
    	this.moving = 0;
    	speed = 0;

	    DEATH_COUNT++;
	    cur_deaths++;
		serial.write(1);

  	}
}



//################ SOUND FUNCTIONS #######################
function initSounds(){
	parkMusic = new Tone.Player({
		"url": "./sounds/parknoise.mp3",
		"autostart" : true,
	}).toMaster();
	gameOverVoice = new Tone.Player("./sounds/gameover.mp3").toMaster();
	sndMiss = new Tone.Player("./sounds/miss.mp3").toMaster();
	sndSquish = new Tone.Player("./sounds/squish.mp3").toMaster();
	sndWings = new Tone.Player({
		"url": "./sounds/wings.mp3",
		volume : 1,
		playbackRate : 1
	}).toMaster();
}


//TODO schedule this instead of triggered
function triggerEndMusic(){
	parkMusic.stop();
	sndWings.stop();
	gameOverVoice.start();
}


//################ SERIAL FUNCTIONS #######################

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

