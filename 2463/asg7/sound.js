/* PDM Course: Sound Unit

  Preset-AlienChorus
*/

var synth, chord;
// create a keyboard
var keyboard = new AudioKeys();
let img;
var mouseIsHeld;
var waterNoiseEnv;

function setup() {
  createCanvas(640, 480);
  imageMode(CENTER);  
  img = loadImage("feesh.jpeg");


  //==========Water Noise============///
  waterNoiseEnv = new Tone.AmplitudeEnvelope({
    "attack": .25,
    "decay": 0.5,
    "sustain": 0.2,
    "release": 0.25
  }).toMaster()
  filter = new Tone.Filter({
    "type": "highpass",
    "frequency": 800
  }).connect(waterNoiseEnv);
  genNoise = new Tone.Noise()
    .connect(filter)
    .start();
  filter.frequency.value = 1000;
  genNoise.type = "brown";


  synth = make_DuoSynth().instrument;

  Tone.Transport.schedule(time => {
    synth.triggerAttackRelease('c6', '8n')
  }, '3m');

  Tone.Transport.scheduleRepeat(time => {
    synth.triggerAttackRelease('g2', '8n')
  }, '4n', '', "2m")
  
  
  slider = createSlider(40, 200, 120, 0)
  slider.position(20, 175)

  //initial jump
  chord = new Tone.Event(
    (time, chord) => {
      synth.triggerAttackRelease(chord, "3s", time);
    },
    ["D4", "E4", "F4"]
  );
  chord.playbackRate = 1
  chord.probability = 0.5;
}

function make_DuoSynth() {
  // create synth
  var instrument = new Tone.DuoSynth();
  var synthJSON = {
    vibratoAmount: 0.5,
    vibratoRate: 10,
    harmonicity: 1.3,
    voice0: {
      volume: -10,
      portamento: 2,
      oscillator: {
        type: "square"
      },
      filterEnvelope: {
        attack: 0.01,
        decay: 0,
        sustain: 1,
        release: 0.5
      },
      envelope: {
        attack: 0.01,
        decay: 0,
        sustain: 1,
        release: 0.5
      }
    },
    voice1: {
      volume: -20,
      portamento: 0.02,
      oscillator: {
        type: "sine"
      },
      filterEnvelope: {
        attack: 0.01,
        decay: 0,
        sustain: 1,
        release: 0.5
      },
      envelope: {
        attack: 0.01,
        decay: 0,
        sustain: 1,
        release: 0.5
      }
    }
  };

  instrument.set(synthJSON);

  var effect1, effect2, effect3;

  // make connections
  instrument.connect(Tone.Master);

  // define deep dispose function
  function deep_dispose() {
    if (instrument != undefined && instrument != null) {
      instrument.dispose();
      instrument = null;
    }
  }

  return {
    instrument: instrument,
    deep_dispose: deep_dispose
  };
}

function draw(){
  background(255);
  text("Fish out of water sound effect", 20, 20);
  text("Click and hold to hear the sound effect", 20, 40);
  text("Move slider to change the beats per minute", 20, 60);


  Tone.Transport.bpm.value = slider.value();
  text("BPM " + Tone.Transport.bpm.value.toFixed(0), 20, 200);

  if(mouseIsHeld){
    image(img, 150, 75);
  }
}

function mousePressed(){
  mouseIsHeld = true;
  Tone.Transport.start();
  chord.start();
  waterNoiseEnv.triggerAttack('2n');
}

function mouseReleased(){
  mouseIsHeld = false;
  waterNoiseEnv.triggerRelease();
  Tone.Transport.stop()
  chord.stop();
  //splash
  instrument.triggerAttackRelease("C4", .5, 1);
}
