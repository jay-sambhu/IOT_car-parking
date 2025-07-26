#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <SPI.h>
#include <MFRC522.h>
#include <Servo.h>

// Pin Config
#define LDR1 34
#define LDR2 35
#define LDR3 32
#define LDR4 33
#define SERVO_PIN 18
#define SS_PIN 5
#define RST_PIN 4

// Objects
MFRC522 mfrc522(SS_PIN, RST_PIN);
Servo gateServo;
AsyncWebServer server(80);
AsyncWebSocket ws("/ws");

const char* ssid = "YourWiFi";
const char* password = "YourPassword";

bool slotAvailable() {
  int threshold = 1000;  // adjust based on your LDR setup
  return analogRead(LDR1) > threshold || analogRead(LDR2) > threshold ||
         analogRead(LDR3) > threshold || analogRead(LDR4) > threshold;
}

bool checkUID(MFRC522::Uid uid) {
  byte allowed[4] = {0xDE, 0xAD, 0xBE, 0xEF};
  for (byte i = 0; i < 4; i++) {
    if (uid.uidByte[i] != allowed[i]) return false;
  }
  return true;
}

void openGate() {
  gateServo.write(90);
  delay(3000);
  gateServo.write(0);
}

void sendSlotStatus() {
  String message = "SLOTS:";
  message += analogRead(LDR1) > 1000 ? "1" : "0";
  message += analogRead(LDR2) > 1000 ? "1" : "0";
  message += analogRead(LDR3) > 1000 ? "1" : "0";
  message += analogRead(LDR4) > 1000 ? "1" : "0";
  ws.textAll(message);
}

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected to WiFi");

  SPI.begin();
  mfrc522.PCD_Init();

  gateServo.attach(SERVO_PIN);
  gateServo.write(0);

  ws.onEvent([](AsyncWebSocket *server, AsyncWebSocketClient *client,
                AwsEventType type, void *arg, uint8_t *data, size_t len) {
    if (type == WS_EVT_CONNECT) {
      Serial.println("WebSocket client connected");
    }
  });
  server.addHandler(&ws);
  server.begin();
}

void loop() {
  if (mfrc522.PICC_IsNewCardPresent() &&
      mfrc522.PICC_ReadCardSerial()) {
    if (checkUID(mfrc522.uid) && slotAvailable()) {
      Serial.println("Access granted. Opening gate...");
      openGate();
      sendSlotStatus();
    } else {
      Serial.println("Access denied or no free slot.");
    }
    mfrc522.PICC_HaltA();
    mfrc522.PCD_StopCrypto1();
  }

  delay(100);
}

