//https://photos.app.goo.gl/rnBoEhggQREvxBhb7
int player1LED= 8;
int player1Button = 4;
int player1State = 0;
int pl1BulletsLeft = 3;

int player2LED = 13;
int player2Button = 2;
int player2State = 0;
int pl2BulletsLeft = 3;

int winRepeat = 5;
int winPlayerLED;
bool inPlay = true;

void setup() {
  pinMode(player1Button, INPUT);
  pinMode(player2Button, INPUT);
  pinMode(player1LED, OUTPUT);
  pinMode(player2LED, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  if(inPlay){
    player1State = digitalRead(player1Button);
    player2State = digitalRead(player2Button);

    if(player1State){ //button pressed
      digitalWrite(player1LED, LOW); 
      
    Serial.println("player1 =" + player1State);
    Serial.println("player2 =" + player2State);
    }
    else{
      digitalWrite(player1LED, HIGH);
    }

    if(player2State == HIGH){ //button released
      digitalWrite(player2LED, LOW);
    Serial.println("player1 =" + player1State);
    Serial.println("player2 =" + player2State);
    }
    else{
      digitalWrite(player2LED, HIGH);
      
    }

    //theres a bug somewhere thats not letting it blink
    if(player1State == HIGH && player2State == LOW){ //if p2 shot p1
      winPlayerLED = player2LED;
      inPlay = false;
      Serial.println("p2 shot");
    }
    else if(player1State == HIGH && player2State == LOW){ //if p1 shot p2
      winPlayerLED = player1LED;
      inPlay = false;
      Serial.println("p1 shot");
    }
  }
  else{
    if(winRepeat > 0){
      digitalWrite(winPlayerLED, HIGH);
      delay(100);
      digitalWrite(winPlayerLED, LOW);
      delay(100);
      winRepeat--;
    }
    else{
      winRepeat = 5;
      inPlay = true;
      
    }
  }
}
