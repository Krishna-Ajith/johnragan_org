#define LED 9     // the pin for the LED
#define BUTTON 7  // input pin of the pushbutton

int val = 0;      // stores the state of the input pin

int oldVal = 0;  // stores the previous value of "val"
int state = 0;    // 0 = LED off while 1 = LED on

int brightness = 128;  // Stores the brightness value
unsigned long startTime = 0;   // when did we start pressing?

void setup() {
  pinMode(LED, OUTPUT);
  pinMode(BUTTON, INPUT);
}

void loop() {
  val = digitalRead(BUTTON);
  
  // check for transition
  if ((val == HIGH) && (oldVal == LOW)) {
    state = 1 - state;
    startTime = millis();
    delay(10);
  } 
  
  // check if button is being held down
  if ((val == HIGH) && (oldVal == HIGH)) {
    if (state == 1 && (millis() - startTime > 500)) {
      brightness++;
      delay(10);
      if (brightness > 255) {
        brightness = 0;
      }
    }
  }
  
  oldVal = val;
  
  if (state == 1) {
    analogWrite(LED, brightness);  
  } else {
    analogWrite(LED, 0);
  }
}


