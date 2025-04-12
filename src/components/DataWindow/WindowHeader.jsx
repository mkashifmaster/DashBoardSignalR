import React from 'react';

const WindowHeader = ({ code, description }) => (
  <div className="window-header">
    <h3>{code}</h3>
    <span>{description}</span>
  </div>
);

export default WindowHeader;
