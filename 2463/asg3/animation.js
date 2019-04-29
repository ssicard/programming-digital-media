var sprite = [];
var spriteImages = ["SpelunkyGuy.png", "SpelunkyGirl.png", "yeti.png"];
COUNT = spriteImages.length;
BOUNDARY_X = 620;
BOUNDARY_Y = 460;


function preload(){
  //ask user if they would like sprites to move automatically or control sprite
  console.log("preload");

  for(var i = 0; i < COUNT; i++){
    sprite[i] = new Walker(random(30, BOUNDARY_X),random(30, BOUNDARY_Y), spriteImages[i], random([-1, 1]));
  }

}

function setup() {
  createCanvas(640, 480);
  imageMode(CENTER);
  console.log("setup");

}

function draw() {
  background(0,255,0);

  for(var i = 0; i < COUNT; i++){
    sprite[i].draw();
  }
}

// function keyPressed(){
// 	if(keyCode == RIGHT_ARROW){
//     for(var i = 0; i < COUNT; i++){
// 		    sprite[i].go(1);
//     }
// 	}
// 	else if(keyCode == LEFT_ARROW){
//     for(var i = 0; i < COUNT; i++){
// 		    sprite[i].go(-1);
//     }
// 	}
//
// }
//
// function keyReleased(){
// 	if(keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW){
//     for(var i = 0; i < COUNT; i++){
// 		    sprite[i].stop();
//     }
// 	}
// }

function mousePressed(){
  for(var i = 0; i < COUNT; i++){
    sprite[i].grab(mouseX, mouseY);
  }
}

function mouseDragged(){
  for(var i = 0; i < COUNT; i++){
    sprite[i].drag(mouseX, mouseY);
  }
}

function mouseReleased(){
  for(var i = 0; i < COUNT; i++){
    sprite[i].drop(mouseX, mouseY);
  }
}

function Walker(x, y, imageName, direction){
	this.spriteSheet;

	this.frame = 0;
	this.moving = direction;
	this.facing = direction;

  this.spriteSheet = loadImage(imageName);
  this.x = x;
  this.y = y;

	this.draw = function(){
    push();
		translate(this.x,this.y);

		if(this.moving == 0){
			if(this.facing < 0){
				scale(-1,1);
			}
			image(this.spriteSheet, 0, 0, 80,80,0,0,80,80);
		}
		else{ //moving
			if (this.moving == 1){ //right
				image(this.spriteSheet, 0, 0, 80,80,80 + this.frame*80,0,80,80);

			}
			else if(this.moving == -1){ //left
				scale(-1,1);
				image(this.spriteSheet, 0, 0, 80,80,80 + this.frame*80,0,80,80);
			}

			if(frameCount % 4 == 0){
				this.frame = (this.frame + 1) % 8;
				this.x = this.x + 6 * this.moving;
        if(this.x < 0 + 30){
          this.moving = 1;
          this.facing = 1;
        }
        else if(this.x > (width - 30)){
          this.moving = -1;
          this.facing = -1;
        }
			}
		}
    pop();
	}

  this.go = function(direction){
    this.moving = direction;
    this.facing = direction;
  }

  this.stop = function(){
    this.moving = 0;
    this.facing = 3;
  }

  this.grab = function(){
    //is it in the area of the sprite
    if(this.x-40 < x && x<this.x+40 && this.y-40<y && y<this.y+40){
      this.stop();
      this.mouseX = x;
      this.mousY = y;
      this.initialX = this.x;
      this.initialY = this.y;
    }
  }

  this.drag = function(){
    if(this.moving == 0){
      this.x = (x - this.mouseX) + this.initialX;
      this.y = (x - this.mouseY) + this.initialY;
    }
  }

  this.drop = function(x, y){
    this.go(this.facing);
  }
}
