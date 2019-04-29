/* Exercise 4 */

function setup() {
    createCanvas(300, 300);
}
  
function draw() {
    background(0, 0, 127);
      
    /* circle */
    strokeWeight(4);
    stroke(255);
    fill(1,127,1);
    ellipse(150, 150, 150, 150);
      
    /* star */
    fill(248,2,4);
    translate(width*0.5, height*0.5);
    rotate(50);
    star(0, 0, 30, 75, 5);   
}
  
  
function star(x, y, radius1, radius2, npoints) {
    var angle = TWO_PI / npoints;
    var halfAngle = angle/2.0;
    beginShape();
    for (var a = 0; a < TWO_PI; a += angle) {
      var sx = x + cos(a) * radius2;
      var sy = y + sin(a) * radius2;
      vertex(sx, sy);
      sx = x + cos(a+halfAngle) * radius1;
      sy = y + sin(a+halfAngle) * radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
}