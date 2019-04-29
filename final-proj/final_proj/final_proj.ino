const int buttonPin = 7;
bool sent = false;

void setup() {
  Serial.begin(9600);

  pinMode(buttonPin, INPUT);
}

void loop() {
  int potentiometer = analogRead(A0);
  int mappedPot = map(potentiometer, 0, 1023, 1, 256); // remap the pot value to fit in 1 byte
  Serial.write(mappedPot);

  int buttonState = digitalRead(buttonPin);

  if(buttonState == LOW && sent == false){ //pressed
    Serial.write(0);
    sent = true;
  } 
  else if(buttonState == HIGH && sent == true){ //on release, reset var
    sent = false;
  }
  
  delay(1);
}
