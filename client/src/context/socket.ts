import { io } from 'socket.io-client';
import React from 'react';
export const socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5002');
export const SocketContext = React.createContext(socket);
export const SocketProvider = SocketContext.Provider;