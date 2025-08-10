# Smart Car Parking IoT System - Backend

This is the backend server component of the IoT Car Parking System. It provides a web interface and API endpoints to monitor parking space availability using ESP32 sensors.

## Features

- Real-time parking space monitoring
- WebSocket support for live updates
- REST API for sensor data
- Web dashboard for visualization
- Support for 4 parking spaces with LDR sensors

## Installation

1. Install Node.js dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

The server will start on `http://localhost:5000` with WebSocket on port 8081.

## API Endpoints

### GET /
Main dashboard showing parking space status

### GET /sensor-data?type={status}
Receive sensor data from ESP32 devices
- `type`: Status value (-1, 0, 1, 2, 3)
  - -1: Error state
  - 0: All spaces free
  - 1-3: Number of occupied spaces

## Technology Stack

- Node.js
- Express.js
- WebSocket (ws)
- EJS templating
- CORS enabled for cross-origin requests