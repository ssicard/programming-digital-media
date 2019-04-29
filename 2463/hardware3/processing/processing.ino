const int led1Pin = 9;

const int led2Pin = 10;
int input;

void setup() {
  Serial.begin(9600);
  pinMode(led1Pin, OUTPUT);
  digitalWrite(led1Pin, HIGH);
}

void loop() {
  //for potentiometer
  int potentiometer = analogRead(A0);
  int mappedPot = map(potentiometer, 0, 1023, 0, 255);
  Serial.write(mappedPot);
  delay(1);

  //for click
  if(Serial.available() > 0){
    input = Serial.read();
    if(input == 1){
      digitalWrite(led2Pin, HIGH);
    }
    else if(input == 0){
      digitalWrite(led2Pin, LOW);
    }
  } else { }

/*
  int sensorValue;
  sensorValue = analogRead(sensorPin);
  brightness = map(sensorValue, 0, 1023, 0, 255);
  Serial.write(brightness);

  if(sensorValue >=0){
    analogWrite(led1Pin, brightness);
  } else {
    digitalWrite(led1Pin, LOW);
  }

  */
  /*
  if(Serial.available() > 0){
    input = Serial.read();
    led2brightness = map(input, 0, 255, 0, 255);
  } else {}

  analogWrite(led2Pin, brightness);
  */
}
