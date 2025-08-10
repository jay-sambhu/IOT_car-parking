# IoT Car Parking Mobile App

A React Native mobile application built with Expo for monitoring car parking spaces in real-time.

## Features

- Real-time parking space monitoring
- Cross-platform (iOS and Android)
- Modern UI with React Navigation
- WebSocket integration for live updates
- Integration with IoT backend server

## Prerequisites

Before running this app, ensure you have:

- Node.js (v16 or higher)
- npm or yarn package manager
- Expo CLI (install with `npm install -g @expo/cli`)
- Expo Go app on your mobile device (for testing)

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Install Expo CLI (if not already installed)

```bash
npm install -g @expo/cli
```

### 3. Start Development Server

```bash
npx expo start
```

### 4. Run on Device/Simulator

After starting the development server, you can:

- **Physical Device**: Open Expo Go app and scan the QR code
- **iOS Simulator**: Press 'i' in the terminal (requires Xcode)
- **Android Emulator**: Press 'a' in the terminal (requires Android Studio)
- **Web Browser**: Press 'w' in the terminal

## Project Structure

```
iot-parking-app/
├── app/                    # Main app screens (Expo Router)
│   ├── (tabs)/            # Tab-based navigation
│   ├── +not-found.tsx     # 404 page
│   └── _layout.tsx        # Root layout
├── components/            # Reusable UI components
├── constants/             # App constants
├── hooks/                 # Custom React hooks
├── assets/               # Images, fonts, etc.
└── package.json          # Dependencies and scripts
```

## Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Open on Android emulator
- `npm run ios` - Open on iOS simulator
- `npm run web` - Open in web browser
- `npm run lint` - Run ESLint code analysis
- `npm run reset-project` - Reset to blank project

## Configuration

### Backend Integration

To connect the mobile app to your IoT backend:

1. Update the backend server URL in your app configuration
2. Ensure CORS is enabled on the backend (already configured)
3. Configure WebSocket connection for real-time updates

### Customization

You can customize the app by:

- Modifying screens in the `app/` directory
- Creating new components in `components/`
- Updating styling and themes in `constants/`
- Adding new navigation routes

## Development Workflow

### For Training and Learning:

1. **Start with Basic Setup**:
   - Understand Expo project structure
   - Learn React Native basics
   - Practice with component creation

2. **Add IoT Integration**:
   - Implement HTTP requests to backend
   - Add WebSocket for real-time data
   - Handle parking status display

3. **UI/UX Development**:
   - Design parking lot visualization
   - Add status indicators
   - Implement navigation

4. **Testing and Deployment**:
   - Test on multiple devices
   - Handle different screen sizes
   - Prepare for app store deployment

## Troubleshooting

### Common Issues:

1. **Expo CLI Not Found**:
   ```bash
   npm install -g @expo/cli
   ```

2. **Metro Bundler Issues**:
   ```bash
   npx expo start --clear
   ```

3. **Network Connection Problems**:
   - Ensure mobile device and computer are on same WiFi
   - Check firewall settings
   - Try using tunnel mode: `npx expo start --tunnel`

4. **Package Installation Errors**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

## Technologies Used

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and toolchain
- **React Navigation**: Navigation and routing
- **TypeScript**: Type-safe JavaScript
- **ESLint**: Code quality and consistency

## Backend Integration

This mobile app is designed to work with the IoT Car Parking backend server. Make sure to:

1. Start the backend server first
2. Update API endpoints in the app configuration
3. Ensure both devices are on the same network

## Contributing

When working on this training project:

1. Follow React Native best practices
2. Use TypeScript for type safety
3. Test on both iOS and Android
4. Document any new features or changes

## Deployment

### For Development:
- Use Expo Go for quick testing
- Share with team using Expo sharing features

### For Production:
- Build standalone apps using `eas build`
- Distribute through App Store/Google Play
- Consider using Expo Application Services (EAS)

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [TypeScript with React Native](https://reactnative.dev/docs/typescript)
