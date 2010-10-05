#define LED 13   // the pin for the LED
#define BUTTON 7 // the input pin where the pushbutton is connected

int val = 0;     // val will be used to store the store of the input pin
int old_val = 0; // stores the previous value of "val"
int state = 0; // 0 = LED off and 1 = LED on

void setup() {
  pinMode(LED, OUTPUT);    // tell Arduino LED is an output
  pinMode(BUTTON, INPUT);  // and BUTTON is an input
}

void loop() {
  val = digitalRead(BUTTON); // read input value and store it
  
  if ((val == HIGH) && (old_val == LOW)) {
    state = 1 - state;
    delay(10);
  }
  
  old_val = val;
  
  if (state == 1) {
    digitalWrite(LED, HIGH); // turn LED on
  } else {
    digitalWrite(LED, LOW);
  }
}
