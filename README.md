# IoT Car Parking System

A comprehensive IoT solution for smart car parking management using ESP32 microcontrollers, Node.js backend, and React Native mobile application.

## System Overview

This project demonstrates a complete IoT car parking system that monitors parking space availability using Light Dependent Resistors (LDR) sensors connected to ESP32 microcontrollers. The system provides real-time monitoring through a web dashboard and mobile application.

### Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   ESP32 + LDR   │───▶│  Backend Server │───▶│   Mobile App    │
│   (Hardware)    │    │   (Node.js)     │    │ (React Native)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
       WiFi                 WebSocket/HTTP           HTTP/WebSocket
```

## Project Structure

```
├── backend/                 # Node.js Express server
│   ├── server.js           # Main server file
│   ├── views/              # EJS templates
│   ├── public/             # Static assets
│   └── package.json        # Backend dependencies
├── hardware/               # ESP32 Arduino code
│   └── sketch/
│       └── sketch.ino      # ESP32 LDR sensor code
├── iot-parking-app/        # React Native mobile app
│   ├── app/                # App screens
│   ├── components/         # Reusable components
│   └── package.json        # Mobile app dependencies
└── README.md               # This file
```

## Components

### 1. Hardware (ESP32)
- **Location**: `hardware/sketch/sketch.ino`
- **Purpose**: Reads 4 LDR sensors to detect car presence
- **Features**:
  - WiFi connectivity
  - I2C LCD display (16x2)
  - Analog sensor reading
  - HTTP endpoint for status reporting

### 2. Backend Server
- **Location**: `backend/`
- **Purpose**: Processes sensor data and provides web interface
- **Features**:
  - Express.js REST API
  - WebSocket for real-time updates
  - EJS templating for web dashboard
  - CORS enabled for mobile app access

### 3. Mobile Application
- **Location**: `iot-parking-app/`
- **Purpose**: Mobile interface for parking status monitoring
- **Technology**: React Native with Expo
- **Features**:
  - Real-time parking status
  - Cross-platform (iOS/Android)
  - Modern UI with navigation

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Arduino IDE (for ESP32 programming)
- Expo CLI (for mobile development)

### 1. Backend Setup
```bash
cd backend
npm install
npm start
```
Server will be available at `http://localhost:5000`

### 2. Mobile App Setup
```bash
cd iot-parking-app
npm install
npx expo start
```

### 3. Hardware Setup
1. Open `hardware/sketch/sketch.ino` in Arduino IDE
2. Install required libraries:
   - WiFi library
   - LiquidCrystal_I2C
   - WebServer
3. Update WiFi credentials in the code
4. Upload to ESP32

## Hardware Requirements

### Components Needed:
- ESP32 development board
- 4x LDR (Light Dependent Resistor) sensors
- 4x 10kΩ resistors (pull-down)
- I2C LCD display (16x2)
- Breadboard and jumper wires
- Power supply (5V/3.3V)

### Pin Configuration:
```
ESP32 Pin    │ Component
─────────────┼─────────────
GPIO 34      │ LDR 1 (Parking Spot 1)
GPIO 32      │ LDR 2 (Parking Spot 2)
GPIO 33      │ LDR 3 (Parking Spot 3)
GPIO 25      │ LDR 4 (Parking Spot 4)
GPIO 21      │ LCD SDA
GPIO 22      │ LCD SCL
```

## API Documentation

### Backend Endpoints

#### GET /
- **Description**: Main dashboard
- **Returns**: HTML page with parking status

#### GET /sensor-data?type={status}
- **Description**: Receive sensor data from ESP32
- **Parameters**:
  - `type`: Parking status (0-3, or -1 for error)
- **Returns**: Status confirmation message

### ESP32 Endpoints

#### GET /status
- **Description**: Get current sensor readings
- **Returns**: Comma-separated LDR values (e.g., "1,0,1,0")

## Development Workflow

### For Training and Learning:

1. **Start with Hardware**:
   - Understand sensor interfacing
   - Learn ESP32 WiFi programming
   - Practice I2C communication

2. **Backend Development**:
   - Learn Node.js/Express fundamentals
   - Understand WebSocket real-time communication
   - Practice API design

3. **Mobile Development**:
   - React Native basics
   - Expo development workflow
   - Cross-platform considerations

4. **System Integration**:
   - End-to-end data flow
   - Real-time communication
   - Error handling

## Contributing

This repository serves as a training foundation for IoT development. When contributing:

1. Maintain minimal, focused changes
2. Document any new features thoroughly
3. Test all components after modifications
4. Follow existing code style and structure

## License

This project is open source and available under the MIT License.

## Support

For questions or issues related to this training repository, please refer to the component-specific README files in each directory.