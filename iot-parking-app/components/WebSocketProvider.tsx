import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';

const WS_URL = 'ws://<ESP32-IP>:<port>'; // Replace with your ESP32 IP and port

interface IWebSocketContext {
  status: 'connecting' | 'connected' | 'disconnected';
  lastMessage: any;
  sendMessage: (msg: string) => void;
  reconnect: () => void;
}

const WebSocketContext = createContext<IWebSocketContext | undefined>(undefined);

export const useWebSocket = () => {
  const ctx = useContext(WebSocketContext);
  if (!ctx) throw new Error('useWebSocket must be used within WebSocketProvider');
  return ctx;
};

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const [lastMessage, setLastMessage] = useState<any>(null);
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);

  const connect = () => {
    setStatus('connecting');
    wsRef.current = new WebSocket(WS_URL);
    wsRef.current.onopen = () => setStatus('connected');
    wsRef.current.onclose = () => {
      setStatus('disconnected');
      //reconnectTimeout.current = setTimeout(connect, 3000);
    };
    wsRef.current.onerror = () => {
      setStatus('disconnected');
      wsRef.current?.close();
    };
    wsRef.current.onmessage = (e) => {
      try {
        setLastMessage(JSON.parse(e.data));
      } catch {
        setLastMessage(e.data);
      }
    };
  };

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
    };
  }, []);

  const sendMessage = (msg: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(msg);
    }
  };

  const reconnect = () => {
    wsRef.current?.close();
    connect();
  };

  return (
    <WebSocketContext.Provider value={{ status, lastMessage, sendMessage, reconnect }}>
      {children}
    </WebSocketContext.Provider>
  );
};
