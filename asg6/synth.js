/* PDM Course: Sound Unit

  Remake Tone.NoiseSynth
  see:  https://tonejs.github.io/docs/r13/NoiseSynth
*/

var noiseEnvelope;
var genNoise;
var oscEnv,
	ampEnv,
	gainNode,
	freqEnv,
	modEnv;
//======LFO=====
var osc,
	ampLFO,
	lfo,
	highFilter,
	lowFilter,
	noise,
	ampEnvNoise;

function setup() {
  createCanvas(640, 480);

  //==========Noise===============///
  //noise visuals   
  Nexus.context = Tone.context 
  var spectrogram = new Nexus.Spectrogram('#target') 
  spectrogram.connect( Tone.Master);
  // noiseEnvelope
  noiseEnvelope = new Tone.AmplitudeEnvelope({
    "attack": 1,
    "decay": 0.5,
    "sustain": 0.2,
    "release": 0.1
  }).toMaster()  
  // lets put a filter between the noise and envelope
  //   hi pass filter - lets the highs pass through
  //  filter 
  filter = new Tone.Filter({
    "type": "highpass",
    "frequency": 800
  }).connect(noiseEnvelope)
  genNoise = new Tone.Noise()
    .connect(filter)
    .start()
  // filter freq 
  filter.frequency.value = 1000
  // brown, white, pink 
  genNoise.type = "brown"
  // noise.type


  //============Envelopes=================//
  oscEnv  = new Tone.OmniOscillator('440', 'pwm').start()
  // gain node 
  gainNode = new Tone.Gain();
  
	//to control the gain, but can really control anything
  ampEnv = new Tone.Envelope({
    "attack": 1,
    "decay": 0.2,
    "sustain": 1,
    "release": 0.1
  })
  
  freqEnv = new Tone.ScaledEnvelope({
    "attack": 1,
    "decay": 0.2,
    "sustain": 1,
    "release": 0.1,
    "min": 50,
    "max": 1000
  })
  
  modEnv = new Tone.ScaledEnvelope({
    "attack": 1,
    "decay": 0.2,
    "sustain": 1,
    "release": 0.1,
    "min": 1,
    "max": 100
  })

  ampEnv.connect(gainNode.gain);
  freqEnv.connect(oscEnv.frequency);
  modEnv.connect(oscEnv.modulationFrequency);
  oscEnv.connect(gainNode);
  gainNode.toMaster()


  //===========LFO===============================
  lfo = new Tone.LFO(10, 400, 1000).start()
  lfo2 = new Tone.LFO(10, 50, 500).start()
  
  // high and low filter
  highFilter = new Tone.Filter(200, "highpass")
  lowFilter = new Tone.Filter(200, "lowpass")

  // amoscillator
  osc = new Tone.AMOscillator({
    frequency: '400', 
    type: "sine", 
    modulationType: "square"
  }).start();
  
	noise = new Tone.Noise().start();

	ampLFO = new Tone.AmplitudeEnvelope({
		"attack": 0.1,
		"decay": 0.2,
		"sustain": 1,
		"release": 0.8
	}).toMaster();

  // connect lfo to filter freq
  lfo.connect(highFilter.frequency);
  lfo2.connect(lowFilter.frequency);
  
  // connect filter to ampenv
  highFilter.connect(ampLFO);
  lowFilter.connect(ampLFO);
  
  // connect sound sorces to filters
  osc.connect(highFilter);
  noise.connect(lowFilter);



  setValueCurveAtTime = createButton("setValueCurveAtTime");
  setValueCurveAtTime.position(width / 2, height / 2 + 30 * 4);
  setValueCurveAtTime.mousePressed(() => {
    const duration = 3
    ampEnvelope.triggerAttackRelease(duration);

    // values in an array, startTime, duration
    noise.volume.setValueCurveAtTime([-20, -10, -6, -30, -6], Tone.now(), duration)
  });
}

function draw() {
  background(255);
  text("Left Arrow: short wave noise", 20, 20);
  text("Space Bar: dark white noise", 20, 40);
  text("One: low frequency", 20, 60);
  text("Two: high frequency", 20, 80);
  text("Right Arrow: ", 20, 100);
}

function keyPressed(){
  console.log(keyCode);
  if(keyCode == 39){ //right arrow

  }
  else if(keyCode == 37){ //left arrow
    noiseEnvelope.triggerAttackRelease('2n');
  }

	if (keyCode == 49) { //1
		oscEnv.frequency.value = 50;
		ampEnv.triggerAttackRelease(2);
		freqEnv.triggerAttackRelease(2);
		modEnv.triggerAttackRelease(2);
	} else if (keyCode == 50) { //2
		oscEnv.frequency.value = 400;
		freqEnv.triggerAttackRelease(2);
		ampEnv.triggerAttackRelease(2);
		modEnv.triggerAttackRelease(2);

  } 
  
  //==============LFO==================
  console.log(keyCode);
	if (keyCode == 32) {
    ampEnv.triggerAttackRelease(1);
  }	else if (keyCode == 51) { //3
		lfo2.frequency.value = 40;
		lfo.frequency.value = '32n';
	} else if (keyCode == 52) { //4
		lfo2.frequency.value = 50;
		lfo.frequency.value = '2n';
	}
}

