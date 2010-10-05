int val = 128;
char buff[]= "0000";

void setup() {
  Serial.begin(9600);
  pinMode(13, OUTPUT);
}

void loop() {
  analogWrite(13, val);
  while (Serial.available() > 0) {
    for (int i=0; i<4; i++) {
      buff[i]=buff[i+1];
    }
    buff[4]=Serial.read();
    if (buff[4]=='G') {
      buff[4] = '\0';
      val = atoi(&buff[1]);
    }
  }
  Serial.println(val);
  delay(10);
  if (val < 120) {
    val = 0;
  }
}
