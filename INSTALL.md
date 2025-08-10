# Installation and Setup Guide

This guide will help you set up the complete IoT Car Parking System for training and development purposes.

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Arduino IDE** - [Download here](https://www.arduino.cc/en/software)
- **Git** - [Download here](https://git-scm.com/)

For mobile development:
- **Expo CLI** - `npm install -g @expo/cli`

## Complete Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/jay-sambhu/IOT_car-parking.git
cd IOT_car-parking
```

### 2. Backend Server Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the server
npm start
```

The backend server will be available at: `http://localhost:5000`

**Test the backend:**
```bash
npm test
```

### 3. Mobile App Setup

```bash
# Navigate to mobile app directory
cd ../iot-parking-app

# Install dependencies
npm install

# Start Expo development server
npx expo start
```

**Using the mobile app:**
- Scan QR code with Expo Go app (iOS/Android)
- Press 'i' for iOS simulator
- Press 'a' for Android emulator
- Press 'w' for web browser

### 4. Hardware Setup (ESP32)

#### Required Components:
- ESP32 development board
- 4x LDR sensors
- 4x 10kΩ resistors
- I2C LCD display (16x2)
- Breadboard and jumper wires

#### Arduino IDE Setup:
1. Install ESP32 board package in Arduino IDE
2. Install required libraries:
   - LiquidCrystal_I2C
   - WiFi (built-in)
   - WebServer (built-in)

#### Programming the ESP32:
1. Open `hardware/sketch/sketch.ino` in Arduino IDE
2. Update WiFi credentials:
   ```cpp
   const char* ssid = "YOUR_WIFI_SSID";
   const char* password = "YOUR_WIFI_PASSWORD";
   ```
3. Connect ESP32 to computer
4. Select board: "ESP32 Dev Module"
5. Upload the sketch

## System Architecture

```
┌─────────────────┐    WiFi/HTTP    ┌─────────────────┐    WebSocket    ┌─────────────────┐
│   ESP32 + LDR   │───────────────▶│  Backend Server │◀──────────────▶│   Mobile App    │
│   (Hardware)    │                │   (Node.js)     │                │ (React Native)  │
│                 │                │  Port: 5000     │                │     (Expo)      │
│  - 4 LDR sensors│                │  WS Port: 8081  │                │                 │
│  - LCD display  │                │                 │                │                 │
│  - WiFi enabled │                │                 │                │                 │
└─────────────────┘                └─────────────────┘                └─────────────────┘
```

## Development Workflow

### For Learning and Training:

1. **Start with Backend** (Easiest):
   ```bash
   cd backend
   npm install
   npm start
   npm test
   ```

2. **Add Hardware Integration**:
   - Set up ESP32 with sensors
   - Test sensor readings
   - Integrate with backend API

3. **Mobile App Development**:
   ```bash
   cd iot-parking-app
   npm install
   npx expo start
   ```

4. **System Integration**:
   - Connect all components
   - Test end-to-end functionality
   - Monitor real-time updates

## API Endpoints

### Backend Server (`http://localhost:5000`)

- **GET /** - Main dashboard
- **GET /sensor-data?type={0-3}** - Receive sensor data

### ESP32 Device

- **GET /status** - Get sensor readings (returns: "1,0,1,0")

## Troubleshooting

### Backend Issues:
- **Port 5000 in use**: Change port in `server.js`
- **Dependencies error**: Run `npm install`
- **Tests failing**: Ensure server is running

### Mobile App Issues:
- **Expo not found**: `npm install -g @expo/cli`
- **Bundle error**: `npx expo start --clear`
- **Network issues**: Use tunnel mode `npx expo start --tunnel`

### Hardware Issues:
- **WiFi connection**: Check credentials and 2.4GHz network
- **Sensor readings**: Verify LDR connections and threshold
- **LCD blank**: Check I2C address and connections

## Project Structure

```
IOT_car-parking/
├── backend/               # Node.js Express server
│   ├── server.js         # Main server file
│   ├── test/             # Basic tests
│   ├── views/            # EJS templates
│   └── package.json      # Dependencies
├── hardware/             # ESP32 Arduino code
│   ├── sketch/
│   │   └── sketch.ino    # Main Arduino sketch
│   └── README.md         # Hardware documentation
├── iot-parking-app/      # React Native mobile app
│   ├── app/              # App screens
│   ├── components/       # UI components
│   └── package.json      # Mobile dependencies
├── INSTALL.md            # This file
└── README.md             # Main documentation
```

## Next Steps

After successful setup:

1. **Experiment with the system**:
   - Modify sensor thresholds
   - Add new API endpoints
   - Customize mobile UI

2. **Learn IoT concepts**:
   - Sensor interfacing
   - WiFi communication
   - Real-time data processing

3. **Extend functionality**:
   - Add more sensors
   - Implement notifications
   - Create web dashboard

## Support

For issues or questions:
1. Check component-specific README files
2. Review troubleshooting section
3. Test individual components separately

This repository serves as a comprehensive training foundation for IoT development with real-world applications.