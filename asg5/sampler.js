/* PDM Course: Sound Unit

Loading and Playing a Sample

Code by Tate Carson & Anthony T. Marasco [2018]
*/

var plStorm, plBlizzard, plCreek, plWind;
var btnThunder, btnBlizzard, btnCreek, btnWind;

//effect variables
var delay;
var reverbSlider;
var reverb;
var roomSlider;


function preload(){
  delay = new Tone.FeedbackDelay(0.5, 0.5).toMaster();
  reverb = new Tone.JCReverb(0.5).toMaster();

  //REQ1: have 4 audio files
  plStorm = new Tone.Player("./sounds/thunder.mp3").connect(reverb);
  plBlizzard = new Tone.Player("./sounds/blizzard.mp3").toMaster();
  plCreek = new Tone.Player("./sounds/creek.mp3").connect(delay);
  plWind = new Tone.Player("./sounds/wind.mp3").toMaster();
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  reverbSlider = createSlider(0, 1, 1, 0);
  reverbSlider.style("width", "250px");
  reverbSlider.position(width/2 - 50, height/7 + 65);

  roomSlider = createSlider(0,1,0.5,0);
  roomSlider.style("width", "200px");
  roomSlider.position(width/2-30, height/7+100);

  //REQ2: have 4 buttons to trigger each sample
  //REQ5: label the sampler appropriately
  btnThunder = createButton("Play Thunderstorm");
  btnThunder.position(width/2, height/7);
  btnThunder.mousePressed(playThunder);

  btnBlizzard = createButton("Play Blizzard");
  btnBlizzard.position(width/2, height/5*2);
  btnBlizzard.mousePressed(playBlizzard);
  text('Thunderstorm playback speed', width/2, 70);
  //REQ4: control the effect in some fashion
  delaySlider =createSlider(0.1, 2, 1, 0.1)
  delaySlider.position(width/2, height/5*2 + 70);
  delaySlider.style('width', '100px');

  btnCreek = createButton("Play Creek");
  btnCreek.position(width/2, height/5 * 3);
  btnCreek.mousePressed(playCreek);

  btnWind = createButton("Play Wind");
  btnWind.position(width/2, height/5 *4);
  btnWind.mousePressed(playWind);


  textSize(10);
  fill("white");
  textAlign(CENTER);
}

function draw() {
  background(92,173,191);
  
  //REQ3: add an effect to the signal chain

  // Thunderstorm - reverb effect
  reverb.wet.value = reverbSlider.value();
  reverb.roomSize.value = roomSlider.value();
  text(int(reverbSlider.value() * 100) + "% effected sound", reverbSlider.x+125, reverbSlider.y-5);
  text("Room size parameter: "+ roomSlider.value().toFixed(2) +"%", roomSlider.x+100, roomSlider.y-5); 
  

  // Blizzard - delay effect
  plBlizzard.playbackRate = delaySlider.value();
  text(int(delaySlider.value() * 100) + "% delayed sound", delaySlider.x+50, delaySlider.y-5); 
}

function playThunder(){
  plStorm.start();
}

function playBlizzard(){
  plBlizzard.start();
}

function playCreek(){
  plCreek.start();
}

function playWind(){
  plWind.start();
}