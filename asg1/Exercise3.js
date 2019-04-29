 /* Exercise 3 */


function setup() {
    createCanvas(400, 200);
  }
  
  function draw() {
    background(0,0,0);
      noStroke();
      
      /* Pacman */
      fill(255, 255, 0);
      ellipse(100, 100, 160, 160);
      fill(0,0,0);
      arc(100, 100, 170, 170, PI - QUARTER_PI, PI + QUARTER_PI);
      //do meee
      
      /* Ghost */
      fill(255, 0, 10);
      rect(220, 100, 160, 80);
      ellipse(300, 100, 160, 160);
      fill(255,255,255);
      ellipse(265, 90, 50, 50);
      ellipse(335, 90, 50, 50);
      fill(0,0,255);
      ellipse(265, 90, 30, 30);
      ellipse(335, 90, 30, 30);
  
      
  }