import React from 'react';

const ConnectionStatus = ({ isConnected }) => (
  <div className={`status ${isConnected ? 'connected' : 'disconnected'}`}>
    {isConnected ? '✅ Live Data' : '❌ Disconnected'}
  </div>
);

export default ConnectionStatus;