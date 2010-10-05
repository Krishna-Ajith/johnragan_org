#define SENSOR 0

int val = 0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  val = analogRead(SENSOR); // analog pin 0
  Serial.println(val);
  delay(100);
}
