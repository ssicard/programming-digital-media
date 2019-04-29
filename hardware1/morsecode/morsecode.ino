//**************************************************//
//   Type the String to Convert to Morse Code Here  //
//**************************************************//
String message = "Hi LEEZ";

// Create variable to define the output pins
int led13 = 13;
int dotLen = 100;     // length of the morse code 'dot'
int dashLen = dotLen * 3;    // length of the morse code 'dash'
int elemPause = dotLen;  // length of the pause between elements of a character
int spaces = dotLen * 3;     // length of the spaces between characters
int wordPause = dotLen * 7;  // length of the pause between words

void setup() {
  pinMode(led13, OUTPUT); 
  message.toLowerCase();
}

void loop()
{ 
  for (int i = 0; i < message.length() - 1; i++)
  {
    Output(message.charAt(i));
  }
  
  // At the end of the string long pause before looping and starting again
  off(8000);      
}

void dot()
{
  digitalWrite(led13, HIGH);  // turn the LED on 
  delay(dotLen);              // hold in this position
  off(elemPause);
}

void dash()
{
  digitalWrite(led13, HIGH);    // turn the LED on
  delay(dashLen);               // hold in this position
  off(elemPause);   
}

void off(int delayTime)
{
  digitalWrite(led13, LOW);     // turn the LED off   
  delay(delayTime);             // hold in this position
}

void Output(char letter)
{
  switch (letter) {
    case 'a': 
      dot();
      dash();
      break;
    case 'b':
      dash();
      dot();
      dot();
      dot();
      break;
    case 'c':
      dash();
      dot();
      dash();
      dot();
      break;
    case 'd':
      dash();
      dash();
      dot();
      break;
    case 'e':
      dot();
      break;
    case 'f':
      dot();
      dot();
      dash();
      dot();
      break;
    case 'g':
      dash();
      dash();
      dot();
      break;
    case 'h':
      dot();
      dot();
      dot();
      dot();
      break;
    case 'i':
      dot();
      dot();
      break;
    case 'j':
      dot();
      dash();
      dash();
      dash();
      break;
    case 'k':
      dash();
      dot();
      dash();
      break;
    case 'l':
      dot();
      dash();
      dot();
      dot();
      break;
    case 'm':
      dash(); 
      dash();
      break;
    case 'n':
      dash();
      dot();
      break;
    case 'o':
      dash();
      dash();
      dash();     
      break;
    case 'p':
      dot();
      dash();
      dash();
      dot();
      break;
    case 'q':
      dash();
      dash();
      dot();
      dash();
      break;
    case 'r':
      dot();
      dash();
      dot();
      break;
    case 's':
      dot();
      dot();
      dot();
      break;
    case 't':
      dash();
      break;
    case 'u':
      dot();
      dot();
      dash();
      break;
    case 'v':
      dot();
      dot();
      dot();
      dash();
      break;
    case 'w':
      dot();
      dash();
      dash();
      break;
    case 'x':
      dash();
      dot();
      dot();
      dash();
      break;
    case 'y':
      dash();
      dot();
      dash();
      dash();
      break;
    case 'z':
      dash();
      dash();
      dot();
      dot();
      break;
    default:
      off(spaces);      
  }
}
