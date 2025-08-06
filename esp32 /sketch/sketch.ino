#include <WiFi.h>
#include <WebServer.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

// WiFi credentials
const char* ssid = "Pranjal_DHFiberNet"; // Your hotspot SSID
const char* password = "DHFibernet@0331824"; // Password for the network

// LCD setup
LiquidCrystal_I2C lcd(0x27, 16, 2); // I2C address, 16 columns, 2 rows

// LDR analog pins
const int ldr1DigitalPin = 34;
const int ldr2DigitalPin = 32;
const int ldr3DigitalPin = 33;
const int ldr4DigitalPin = 25;

// Threshold for determining HIGH/LOW
const int threshold = 512;

// Web server on port 80
WebServer server(80);

void setup() {
  Serial.begin(115200);

  // Start I2C for LCD
  Wire.begin(21, 22); // SDA, SCL
  lcd.init();
  lcd.backlight();

  // Setup LDR pins
  pinMode(ldr1DigitalPin, INPUT);
  pinMode(ldr2DigitalPin, INPUT);
  pinMode(ldr3DigitalPin, INPUT);
  pinMode(ldr4DigitalPin, INPUT);

  // Display connecting message on LCD
  lcd.setCursor(0, 0);
  lcd.print("Connecting to WiFi");
  
  // Connect to WiFi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  // WiFi connected
  Serial.println("\nWiFi connected! IP address: ");
  Serial.println(WiFi.localIP());

  // Clear the LCD and display the IP address
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("WiFi Connected");
  lcd.setCursor(0, 1);
  lcd.print(WiFi.localIP().toString()); // Display IP address

  // Define endpoint
  server.on("/status", HTTP_GET, []() {
    int ldr1 = analogRead(ldr1DigitalPin) > threshold ? HIGH : LOW;
    int ldr2 = analogRead(ldr2DigitalPin) > threshold ? HIGH : LOW;
    int ldr3 = analogRead(ldr3DigitalPin) > threshold ? HIGH : LOW;
    int ldr4 = analogRead(ldr4DigitalPin) > threshold ? HIGH : LOW;

    String data = String(ldr1 == HIGH ? 1 : 0) + "," +
                  String(ldr2 == HIGH ? 1 : 0) + "," +
                  String(ldr3 == HIGH ? 1 : 0) + "," +
                  String(ldr4 == HIGH ? 1 : 0);

    server.send(200, "text/plain", data);
  });

  server.begin();
}

void loop() {
  server.handleClient();

  // Read LDR values
  int ldr1Value = analogRead(ldr1DigitalPin);
  int ldr2Value = analogRead(ldr2DigitalPin);
  int ldr3Value = analogRead(ldr3DigitalPin);
  int ldr4Value = analogRead(ldr4DigitalPin);

  // Convert to digital state
  int ldr1State = (ldr1Value > threshold) ? HIGH : LOW;
  int ldr2State = (ldr2Value > threshold) ? HIGH : LOW;
  int ldr3State = (ldr3Value > threshold) ? HIGH : LOW;
  int ldr4State = (ldr4Value > threshold) ? HIGH : LOW;

  // Display LDR states on LCD
  lcd.setCursor(0, 0);
  lcd.print("P1:");
  lcd.print(ldr1State == HIGH ? "1" : "0");
  lcd.print(" P2:");
  lcd.print(ldr2State == HIGH ? "1" : "0");

  lcd.setCursor(0, 1);
  lcd.print("P3:");
  lcd.print(ldr3State == HIGH ? "1" : "0");
  lcd.print(" P4:");
  lcd.print(ldr4State == HIGH ? "1" : "0");

  // Print LDR states to Serial Monitor
  Serial.print("LDR States: P1=");
  Serial.print(ldr1State == HIGH ? "1" : "0");
  Serial.print(", P2=");
  Serial.print(ldr2State == HIGH ? "1" : "0");
  Serial.print(", P3=");
  Serial.print(ldr3State == HIGH ? "1" : "0");
  Serial.print(", P4=");
  Serial.println(ldr4State == HIGH ? "1" : "0");

  delay(1000);
}