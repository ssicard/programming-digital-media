const int ledPin = 8;
int input;

const int buttonPin = 4;
int buttonState;

void setup() {
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, HIGH);
}

void loop() {
  buttonState = digitalRead(buttonPin);
  Serial.println(buttonState);
  Serial.write(buttonState);
  delay(1);

  if(Serial.available() > 0){
    input = Serial.read();
    if(input == 1){ //when a bug dies, light led
      digitalWrite(ledPin, HIGH);
    }
    else if(input == 0){
      digitalWrite(ledPin, LOW);
    }
  } else { }
}
