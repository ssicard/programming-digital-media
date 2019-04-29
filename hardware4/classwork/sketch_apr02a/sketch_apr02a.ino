const int buttonPin = 2;     // the number of the pushbutton pin
const int ledPin =  13;      // the number of the LED pin
 
int buttonState = 0;
 
void setup() {
  Serial.begin(9600);
  
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT);
  
  digitalWrite(ledPin, HIGH);
}
 
void loop() {
  buttonState = digitalRead(buttonPin);
  Serial.write(buttonState);
 
  if (buttonState == HIGH) {
    Serial.write("push");
    digitalWrite(ledPin, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
  }
}
