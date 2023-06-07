import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

export const Map = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const socket = socketIOClient('http://127.0.0.1:5000'); 

    socket.on('connect', () => {
      console.log('Conectado ao servidor SocketIO');
    });

    socket.on('dados_gps', (data) => {
      setMessage(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Recebendo Dados do SocketIO</h1>
      <p>{message}</p>
    </div>
  );
};

