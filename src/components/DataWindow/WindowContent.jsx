import React from 'react';
import DataRow from './DataRow';

const WindowContent = ({ data }) => (
  <div className="window-content">
    <DataRow label="Item Code:" value={data.ItemCode} />
    <DataRow label="Description:" value={data.ItemDesc} />
    <DataRow label="Quantity:" value={data.Qty} />
    <DataRow label="Rate:" value={`$${data.Rate}`} />
    <DataRow 
      label="Amount:" 
      value={`$${data.Amount}`} 
      highlight 
    />
  </div>
);

export default WindowContent;