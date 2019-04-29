const int analogPin = A0;
const int outPin = 5;
int sensorVal;

void setup() {
  pinMode(analogPin, INPUT);
  pinMode(outPin, OUTPUT);
  Serial.begin(9600);

  digitalWrite(outPin, LOW);
}

void loop() {
  sensorVal = analogRead(analogPin);
  sensorVal = map(sensorVal, 0, 1023, 0, 255); //the range for colors
  Serial.println(outputVal);

  if(Serail.available() > 0){ //if incoming data
    incomingData = Serial.read();
    if(incomingData == '1'){
      digitalWrite(outPin, HIGH);
    }
    else{
      digitalWrite(outPin, LOW);
    }
  }
  delay(2);
}
