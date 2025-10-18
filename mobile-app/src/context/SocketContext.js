import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from './AuthContext';
import { API_CONFIG } from '../config/api.js';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user, token } = useAuth();

  useEffect(() => {
    if (user && token) {
      initializeSocket();
    } else {
      disconnectSocket();
    }

    return () => {
      disconnectSocket();
    };
  }, [user, token]);

  const initializeSocket = () => {
    const newSocket = io(API_CONFIG.SOCKET_URL, {
      auth: {
        token: token,
      },
      transports: ['websocket'],
    });

    newSocket.on('connect', () => {
      console.log('Connected to server');
      setConnected(true);
      
      // Join user to their personal room
      newSocket.emit('join', user._id);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
      setConnected(false);
    });

    newSocket.on('onlineUsers', (users) => {
      setOnlineUsers(users);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      setConnected(false);
    });

    setSocket(newSocket);
  };

  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
      setConnected(false);
      setOnlineUsers([]);
    }
  };

  const emitEvent = (event, data) => {
    if (socket && connected) {
      socket.emit(event, data);
    }
  };

  const onEvent = (event, callback) => {
    if (socket) {
      socket.on(event, callback);
    }
  };

  const offEvent = (event, callback) => {
    if (socket) {
      socket.off(event, callback);
    }
  };

  const value = {
    socket,
    connected,
    onlineUsers,
    emitEvent,
    onEvent,
    offEvent,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};