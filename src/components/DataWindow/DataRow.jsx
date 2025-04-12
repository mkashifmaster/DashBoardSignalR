import React from 'react';

const DataRow = ({ label, value, highlight = false }) => (
  <div className={`data-row ${highlight ? 'highlight' : ''}`}>
    <span>{label}</span>
    <strong>{value}</strong>
  </div>
);

export default DataRow;