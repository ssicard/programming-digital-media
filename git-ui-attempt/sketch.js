var addBtn, commitBtn, pushBtn;
var bkColor = "#5f0f40";
var txtColor = "#e3e4db"

//FOR sprite
var spriteImage = "./imgs/SpelunkyGirl.png";
var neutralX = 50;
var neutralY = 50;

function preload(){


  sprite = new Walker(neutralX, neutralY, spriteImage);
  sprite.setButtons();

  //TODO on sound click, have add noise
  //
  // commitBtn = createButton("Commit");
  // //TODO on sound click, have commit noise
  // //TODO deal with commit message
  //
  // pushBtn = createButton("Push");
  // //TODO on sound click, have push noise

}

function setup(){
  createCanvas(windowWidth,windowHeight);
  background(227, 228, 219);
  imageMode(CENTER);

  statusBox = createElement('h5', 'this is my status');
  statusBox.position(windowWidth/2, 50);

  // addDiv = createElement('div');
  // addDiv.id("add");
  // addDiv.position(windowWidth, windowHeight/4)
  addBtn = createButton('Git Add');
  addBtn.position(windowWidth/2, windowHeight/4);
  addBtn.mousePressed(gitAdd);
  addBtn.class("btn");

  commitBtn = createButton('Git Commit');
  commitBtn.position(windowWidth/2 + windowWidth*.1, windowHeight/2);
  commitBtn.class("btn");
  input = createInput();
  input.position(windowWidth*.1, windowHeight/2);
  input.value("Enter commit message here.");
  input.class("inpt");
  commitBtn.mousePressed(gitCommit);

  pushBtn = createButton("Git Push");
  pushBtn.position(windowWidth/2, 3*windowHeight/4);
  pushBtn.mousePressed(gitPush);
  pushBtn.class("btn");
}

function draw(){
  background(227, 228, 219);

  sprite.draw();
}

function gitAdd(){
  sprite.moveToAdd();
  $.ajax({
    url:'./test.php',
    success: function(data){
      statusBox.value(data);
    }
  })
}

function gitCommit(){
  console.log("git commit not implemented");
  const message = input.value();
  input.value('');
  //move girl to right by the git
}

function gitPush(){
  console.log("git push not implemented");
  //move girl to neutral position
}

function Walker(x, y, imageName){
	this.spriteSheet;

	this.frame = 0;
	this.movingX = 0;
  this.movingY = 0;
	this.facing = 0;
  this.destination = 0; //neutral

  this.spriteSheet = loadImage(imageName);
  this.x = x;
  this.y = y;

  this.setButtons = function() {
    //set vars
    this.addY = windowHeight/4;
    this.commitY = windowHeight/2;
    this.pushY = 3*windowHeight/4;
    this.buttonXRight = windowWidth/2 + 150;
    this.buttonXLeft = windowWidth/2 - 75;

  }

	this.draw = function(){
    push();
		translate(this.x,this.y);

		if(this.movingX == 0 && this.movingY == 0){
			if(this.facing < 0){
				scale(-1,1);
			}
			image(this.spriteSheet, 0, 0, 80,80,0,0,80,80);
		}
		else{ //moving

			if (this.movingX == 1 || this.movingY == 1){ //right
				image(this.spriteSheet, 0, 0, 80,80,80 + this.frame*80,0,80,80);
      }

      if(this.destination == 0){ //neutral

      }
      else if(this.destination == 1) { //add
          //if past right of button but not in right position

          if(this.x > this.buttonXRight){
            this.stopX();
            if(this.y != this.addY){
              this.goY(1);
            }
          }
          if((this.y > (this.addY - 50) && this.movingX == 1) || (this.y > this.addY)){
            this.stopY();
          }
      }
      else if(this.destination == 2) { //commit
        if(this.x > this.buttonXLeft){

        }
      }
      else if (this.destination == 3) { //push
        if(this.y > this.buttonXRight){

        }
      }


			if(frameCount % 4 == 0){
				this.frame = (this.frame + 1) % 8;
				this.x = this.x + 6 * this.movingX; //speed
        this.y = this.y + 4 * this.movingY;
			}
		}
    pop();
	}

  this.go = function(direction, destination){
    this.facing = direction;
    this.destination = destination;
    this.goX(1);
    this.goY(1);
  }

  this.goX = function(direction){
      this.movingX = direction;
  }

  this.goY = function(direction){
      this.movingY = direction;
  }

  this.stopX = function(){
    this.movingX = 0;
    this.facing = 3;
  }

  this.stopY = function(){
    this.movingY = 0;
  }

  this.moveToAdd = function() {
    this.go(1, 1);
  }

  this.moveToCommit = function() {
    console.log("moveToCommit not done");
  }

  this.moveToPush = function() {
    console.log("moveToPush not done");
  }
}
