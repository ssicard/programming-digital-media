function setup() {
  createCanvas(800, 600);
  background(220);
}

let color = 0;
function draw() {
	
	//paint colors
	stroke('white');
	strokeWeight(2);
	fill(255,0,0);
	rect(0,0,20,20);
	fill(255,127,11);
	rect(0,20,20,20);
	fill(255, 255, 0);
	rect(0,40,20,20);
	fill(0,255,0);
	rect(0,60,20,20);
	fill(0,255,255);
	rect(0,80,20,20);
	fill(0,0,255);
	rect(0,100,20,20);
	fill(255,0,255);
	rect(0,120,20,20);
	fill(139,69,19);
	rect(0,140,20,20);
	fill(255,255,255);
	rect(0,160,20,20);
	fill(0,0,0);
	rect(0,180,20,20);
	
}

function mouseDragged(){
	noStroke();
	if (!(mouseX < 20 && mouseY < 200)) {
		stroke(color);
		strokeWeight(10);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

function mousePressed(){
	if(mouseX < 20){
		if(mouseY < 20){
			color = 'rgb(255,0,0)';
		}
		else if(mouseY < 40){
			color = 'rgb(255,127,11)';
		}
		else if(mouseY < 60){
			color = 'rgb(255, 255, 0)';
		}
		else if(mouseY < 80){
			color = 'rgb(0,255,0)';
		}
		else if(mouseY < 100){
			color = 'rgb(0,255,255)';
		}
		else if(mouseY < 120){
			color = 'rgb(0,0,255)';
		}
		else if(mouseY < 140){
			color = 'rgb(255,0,255)';
		}
		else if(mouseY < 160){
			color = 'rgb(139,69,19)';
		}
		else if(mouseY <180){
			color = 'rgb(255,255,255)';
		}
		else if(mouseY < 200){
			color = 'rgb(0,0,0)';
		}
	}
}
