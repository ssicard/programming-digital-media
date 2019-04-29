var WIDTH = 600;
var HEIGHT = 400;
var ENDGAME_ANCHOR_Y = HEIGHT/2 - 40;
var yCap = 215;

//==== FOR GAMEPLAY ====
var SCORE = 0;
var LEVEL = 1;
var BULLET_COUNT = 0;
var TIMER = 300;
var SHOOT_TIMER = 0;
var obstacle = [];
var bullet = [];

//===== FOR SPRITES =====
var spriteImage = "./imgs/SpelunkyGirl.png";
var obstacleImage = "./imgs/rock.png";
var backgroundImage = "./imgs/background.png";
var bx1 = 0;
var bx2;

//===== FOR SERIAL ====
var serial;
var portName = '/dev/ttyACM0';
var inData;
//for led click
var outByte = 0;

function preload(){
  backgrnd = loadImage(backgroundImage);
  bx2 = WIDTH;

  initSounds();
  sprite = new Walker(WIDTH/3, HEIGHT/2);
  generateObstacles();
}

//===== FOR SOUND ====
var sndBackgroundMusic, sndHit, sndShoot;

function setup(){
  createCanvas(WIDTH,HEIGHT);
  imageMode(CENTER);
  textAlign(LEFT);
  textSize(15);
  textStyle(BOLD);

  serial = new p5.SerialPort();
  serial.on('list', printList);
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing

  serial.open(portName);
}

function draw(){
  background(227,228,219);
  imageMode(LEFT);
  image(backgrnd, bx1, HEIGHT/2, WIDTH, HEIGHT);
  image(backgrnd, bx2, HEIGHT/2, WIDTH, HEIGHT);
  imageMode(CENTER);

  if(!sprite.isDead()){
    bx1-= LEVEL;
    bx2 -= LEVEL;
    if(bx1 < -WIDTH/2){
      bx1 = WIDTH + WIDTH/2 - 1;
    }
    if(bx2 < -WIDTH/2){
      bx2 = WIDTH + WIDTH/2 -1;
    }

    sprite.y = map(inData, 0, HEIGHT, 0, HEIGHT) + yCap;
    if(sprite.y > HEIGHT){
      sprite.y = HEIGHT - 30;
    }

    if(SHOOT_TIMER == 0){
      outByte = 0;
      serial.write(outByte);
    }
    else if(SHOOT_TIMER > 0){
      SHOOT_TIMER--;
    }

    if(obstacle.length == 0 || TIMER == 0){
      generateObstacles();
      TIMER = 300;
    }
    LEVEL = Math.floor(SCORE/5) + 1;


    text("Level: " + LEVEL, 20, 20);
    text("Score: " + SCORE, 20, 50);
    sprite.draw();
    for(var i = 0; i < bullet.length; i++){
        bullet[i].draw();
    }
    for(var i = 0; i < obstacle.length; i++){
      obstacle[i].draw();
    }

    checkBulletCollision();
    checkPlayerCollision();
    checkWalls();
    TIMER--;
  }
  else{
    textAlign(CENTER);
    textSize(14);
    stroke(0);
    strokeWeight(2);
    fill(255);
    text("GAME OVER", WIDTH/2, ENDGAME_ANCHOR_Y);
    text("Level: " + LEVEL, WIDTH/2, ENDGAME_ANCHOR_Y + 30);
    text("Rocks Hit: " + SCORE, WIDTH/2, ENDGAME_ANCHOR_Y + 50);
    text("Wasted Bullets: " + (BULLET_COUNT - SCORE), WIDTH/2, ENDGAME_ANCHOR_Y + 70);
    text("Final Score: " + (SCORE - (BULLET_COUNT - SCORE)*.5), WIDTH/2, ENDGAME_ANCHOR_Y + 100);
  }
}

function shoot(){
  if(!sprite.isDead()){
    bullet[bullet.length] = new Bullet(sprite.x + 30, sprite.y);
    sndShoot.start();
    BULLET_COUNT++;
  }
}

function generateObstacles(){
  //console.log('generateObstacles');
  obstacleCount = Math.floor(random(1, LEVEL+1));
  for(var i = 0; i < obstacleCount; i++){
    obstacle[obstacle.length] = new Obstacle(WIDTH, random(yCap,HEIGHT - 50), LEVEL);
  }
}

function checkBulletCollision(){
  for(var i = 0; i < obstacle.length; i++){
    if(bullet.length > 0){
      for(var j = 0; j < bullet.length; j++){
        if(obstacle.length > 0){
          if(((bullet[j].x > obstacle[i].x - 30) && (bullet[j].x < obstacle[i].x + 50)) && (bullet[j].y < (obstacle[i].y + 30) && bullet[j].y > (obstacle[i].y -30))){
              bullet.splice(j, 1);
              obstacle.splice(i, 1);
              sndHit.start();
              outByte = 1;
              serial.write(outByte);
              SCORE++;
          }
        }
      }
    }
  }
}

function checkPlayerCollision(){
  for(var i = 0; i < obstacle.length; i++){
      if(obstacle.length > 0){
        if(((sprite.x > obstacle[i].x - 30) && (sprite.x < obstacle[i].x + 50)) && (sprite.y < (obstacle[i].y + 30) && sprite.y > (obstacle[i].y -30))){
              sprite.die();
              obstacle.splice(i, 1);
        }
    }
  }
}

function checkWalls(){
  for(var i = 0; i < obstacle.length; i++){
    if(obstacle[i].x < -30){
      obstacle.splice(i, 1);
    }
  }
}

function initSounds(){
  sndBackgroundMusic = new Tone.Player({
		"url": "./snds/backgroundmusic.mp3",
		"autostart" : true,
    "loop" : true
	}).toMaster();
  sndHit = new Tone.Player("./snds/rock.mp3").toMaster();
	sndShoot = new Tone.Player({
    "url" : "./snds/gun.mp3",
    "volume" : -15
  }).toMaster();
  sndWalk = new Tone.Player({
    "url": "./snds/walk.mp3",
    "autostart" : true,
    "loop" : true,
    "playbackRate" : 1.7,
    "volume" : -10
  }).toMaster();
  sndEnd = new Tone.Player("./snds/gameover.mp3").toMaster();
}

//============= SERIAL FUNCTIONS ==============
function printList(portList){
  for(var i = 0; i < portList.length; i++){
    //console.log(i + " " + portList[i]);
  }
}

function serverConnected() {
  console.log('connected to server.');
}

function portOpen() {
  console.log('the serial port opened.')
}

function serialEvent() {
  serialInput = serial.read();

  if(serialInput == 0){
    if(inData !=255){
      shoot();
      SHOOT_TIMER = 75;
    }
  }
  else{
    inData = Number(serialInput);
  }
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}

//============= OBJECTS ==============
function Walker(x, y){
	this.frame = 0;
	this.moving = 1;
  this.dead = false;

  this.spriteSheet = loadImage(spriteImage);
  this.x = x;
  this.y = y;

	this.draw = function(){
    if(!this.dead){
      push();
      translate(this.x,this.y);

      if(this.moving){
        image(this.spriteSheet, 0, 0, 80,80,80 + this.frame*80,0,80,80);

    	  if(frameCount % (LEVEL + 8) == 0){
    		    this.frame = (this.frame + 1) % 8;
    	  }
      }
      else{
        image(this.spriteSheet, 0, 0, 80,80,80 + this.frame*80,0,80,80);
      }
      pop();
    }
	}

  this.go = function(){
    this.moving = 1;
  }

  this.stop = function(){
    this.moving = 0;
  }

  this.die = function(){
    this.dead = true;
    sndBackgroundMusic.stop();
    sndWalk.stop();
    sndEnd.start();
  }

  this.isDead = function(){
    if(this.dead){
      return true;
    }
    else{
      return false;
    }
  }
}

function Obstacle(x, y, level){
  this.sprite = loadImage(obstacleImage);
  this.x = x;
  this.y = y;
  this.moving = 1;
  this.level = level;

	this.draw = function(){
    if(this.moving && this.deleted != true){
      push();
      image(this.sprite, this.x, this.y, this.sprite.width/3, this.sprite.height/3);
      this.x -= this.level;
      pop();
    }
	}

  this.stop = function(){
    this.moving = 0;
  }
}

function Bullet(x, y){
	this.sprite;
	this.frame = 0;
	this.moving = 1;
  this.deleted = false;
  this.x = x;
  this.y = y;

	this.draw = function(){
    if(this.moving && this.deleted != true){
      stroke(50);
      fill(100);
      ellipse(this.x, this.y, 24, 24);

      this.x = this.x + 2;
    }
	}

  this.delete = function(){
    this.x = -1000
    this.y = -1000;
    this.moving = 0;
    this.deleted = true;
  }
}
