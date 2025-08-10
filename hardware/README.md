# ESP32 Car Parking Sensor System

This Arduino sketch implements a parking space monitoring system using ESP32 and LDR (Light Dependent Resistor) sensors.

## Hardware Components

- ESP32 development board
- 4x LDR sensors (for 4 parking spots)
- 4x 10kΩ resistors
- I2C LCD display (16x2, address 0x27)
- Connecting wires

## Pin Configuration

| ESP32 Pin | Component | Description |
|-----------|-----------|-------------|
| GPIO 34   | LDR 1     | Parking Spot 1 sensor |
| GPIO 32   | LDR 2     | Parking Spot 2 sensor |
| GPIO 33   | LDR 3     | Parking Spot 3 sensor |
| GPIO 25   | LDR 4     | Parking Spot 4 sensor |
| GPIO 21   | LCD SDA   | I2C Data line |
| GPIO 22   | LCD SCL   | I2C Clock line |

## Circuit Diagram

```
LDR Sensor Connection (repeat for all 4 sensors):
                      ESP32
                   ┌─────────┐
    LDR            │         │
    ┌─┐            │ GPIO XX │
    │ │            │         │
    └─┼────────────┤         │
      │            │         │
      │ 10kΩ       │   GND   │
      └────────────┤         │
                   └─────────┘
```

## Features

- **WiFi Connectivity**: Connects to specified WiFi network
- **Sensor Reading**: Continuously monitors 4 LDR sensors
- **LCD Display**: Shows parking status on 16x2 I2C LCD
- **Web Server**: Provides HTTP endpoint for status queries
- **Real-time Updates**: 1-second refresh rate

## Setup Instructions

1. **Install Required Libraries**:
   - WiFi (built-in)
   - WebServer (built-in)
   - Wire (built-in)
   - LiquidCrystal_I2C

2. **Configure WiFi**:
   ```cpp
   const char* ssid = "YOUR_WIFI_SSID";
   const char* password = "YOUR_WIFI_PASSWORD";
   ```

3. **Upload to ESP32**:
   - Connect ESP32 to computer
   - Select board: "ESP32 Dev Module"
   - Upload the sketch

## Operation

### Startup Sequence:
1. Initialize LCD and display "Connecting to WiFi"
2. Connect to WiFi network
3. Display IP address on LCD
4. Start web server on port 80

### Normal Operation:
- Continuously read LDR sensors
- Display parking status on LCD (P1, P2, P3, P4)
- Respond to HTTP requests at `/status` endpoint
- Print sensor values to Serial Monitor

### LCD Display Format:
```
P1:X P2:X
P3:X P4:X
```
Where X = 1 (occupied) or 0 (free)

## API Endpoint

### GET /status
Returns comma-separated sensor values:
```
Response: "1,0,1,0"
```
This indicates:
- Spot 1: Occupied (1)
- Spot 2: Free (0)
- Spot 3: Occupied (1)
- Spot 4: Free (0)

## Threshold Configuration

The system uses a threshold value to determine HIGH/LOW states:
```cpp
const int threshold = 512;  // Adjust based on lighting conditions
```

**Calibration Tips**:
- Higher threshold = less sensitive (fewer false positives)
- Lower threshold = more sensitive (better detection in low light)
- Test in actual deployment environment

## Troubleshooting

### Common Issues:

1. **WiFi Connection Failed**:
   - Check SSID and password
   - Ensure network is 2.4GHz (ESP32 doesn't support 5GHz)
   - Check signal strength

2. **LCD Not Working**:
   - Verify I2C address (use I2C scanner if needed)
   - Check SDA/SCL connections
   - Ensure proper power supply to LCD

3. **Inconsistent Sensor Readings**:
   - Adjust threshold value
   - Check LDR placement and lighting conditions
   - Verify resistor values (10kΩ recommended)

4. **Web Server Not Responding**:
   - Check if ESP32 is connected to WiFi
   - Verify IP address from LCD display
   - Ensure no firewall blocking port 80

## Serial Monitor Output

Expected output format:
```
Connecting to WiFi.....
WiFi connected! IP address: 192.168.1.100
LDR States: P1=1, P2=0, P3=1, P4=0
LDR States: P1=1, P2=0, P3=1, P4=0
...
```

## Future Enhancements

- Add MQTT support for IoT cloud integration
- Implement deep sleep mode for battery operation
- Add ultrasonic sensors for more accurate detection
- Include LED indicators for visual status
- Add OTA (Over-The-Air) update capability