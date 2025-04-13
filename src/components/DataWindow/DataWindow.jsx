import React, { memo } from "react";
import WindowHeader from "./WindowHeader";
import WindowContent from "./WindowContent";
import "../styles/window.css";

const DataWindow = memo(({ data }) => {
  const topItems = [...data.items]
    .sort((a, b) => b.Amount - a.Amount)
    .slice(0, 5);

  return (
    <div className="data-window enhanced-window">
      <WindowHeader code={data.LocationCode} description={data.LocationDesc} />

      <div className="items-container">
        <div className="items-header">
          <span className="item-col">Code</span>
          <span className="desc-col">Description</span>
          <span className="qty-col">Qty</span>
          <span className="amount-col">Amount</span>
        </div>

        <div className="items-list">
          {topItems.map((item, index) => (
            <div key={index} className="item-row">
              <span className="item-col">{item.ItemCode}</span>
              <span className="desc-col">{item.ItemDesc}</span>
              <span className="qty-col">{item.Qty}</span>
              <span className="amount-col">
                ${parseFloat(item.Amount).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default DataWindow;
