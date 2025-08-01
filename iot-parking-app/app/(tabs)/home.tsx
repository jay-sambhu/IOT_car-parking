import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { useWebSocket } from '../../components/WebSocketProvider';

const HomeScreen = () => {
  const { status, lastMessage, sendMessage, reconnect } = useWebSocket();
  const [parkingStatus, setParkingStatus] = useState<string>('Unknown');
  const [gateState, setGateState] = useState<string>('Unknown');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (lastMessage) {
      if (lastMessage.type === 'status') {
        setParkingStatus(lastMessage.data);
      } else if (lastMessage.type === 'gate') {
        setGateState(lastMessage.data);
      }
    }
  }, [lastMessage]);

  const handleCheckStatus = () => {
    setLoading(true);
    sendMessage('getStatus');
    setTimeout(() => setLoading(false), 1000);
  };

  const handleOpenGate = () => {
    setLoading(true);
    sendMessage('openGate');
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Smart Car Parking</Text>
      {status === 'connecting' && <ActivityIndicator size="large" color="#007AFF" />}
      {status === 'disconnected' && (
        <View>
          <Text style={styles.error}>Connection lost. Reconnecting...</Text>
          <Button title="Reconnect" onPress={reconnect} />
        </View>
      )}
      {status === 'connected' && (
        <>
          <Button title="Check Parking Status" onPress={handleCheckStatus} />
          <Button title="Open Gate" onPress={handleOpenGate} />
          {loading && <ActivityIndicator size="small" color="#007AFF" />}
          <Text style={styles.status}>Parking Status: {parkingStatus}</Text>
          <Text style={styles.status}>Gate State: {gateState}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  status: {
    fontSize: 18,
    marginTop: 16,
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
});

export default HomeScreen;
