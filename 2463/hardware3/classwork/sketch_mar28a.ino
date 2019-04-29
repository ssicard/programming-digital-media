const int buttonPin = 2;

void setup() {
  Serial.begin(9600);
  pinMode(buttonPin, INPUT);

  while(Serial.available() <= 0){
    Serial.println("hello");
    delay(300); //only send when need to send
  }
}

void loop() {
  if(Serial.available() > 0){
    int sensorValue = analogRead(A0);

    Serial.print(sensorValue); //think of it as a send to p5
    Serial.print(",");
  
    int sensorValue2 = analogRead(A1);
    Serial.print(sensorVaue2);
    Serial.print(",");
  
    int button = digitalRead(); //digital is for 0/1, analog for everything else
    Serial.println(button);
  
    delay(10);
  }
}
