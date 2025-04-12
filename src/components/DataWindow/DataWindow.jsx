import React, { memo } from "react";
import WindowHeader from "./WindowHeader";
import "../styles/window.css";

const DataWindow = memo(({ data }) => {
  console.log("DataWindow rendering with data:", data);

  // Validate data structure
  if (!data || typeof data !== 'object') {
    console.error("Invalid data prop:", data);
    return (
      <div className="data-window error-window">
        <p>Error: Invalid data format</p>
      </div>
    );
  }

  // Safely extract items (note the lowercase property names)
  const items = Array.isArray(data.items) ? data.items : [];
  console.log("Processing items:", items);

  // Sort and limit to top 5 items
  const topItems = [...items]
    .sort((a, b) => (b.amount || 0) - (a.amount || 0))
    .slice(0, 5);

  return (
    <div className="data-window enhanced-window">
      {/* Note: Using data.locationCode instead of data.LocationCode */}
      <WindowHeader 
        code={data.locationCode || "N/A"} 
        description={data.locationDesc || "No description"} 
      />

      <div className="items-container">
        <div className="items-header">
          <span className="item-col">Code</span>
          <span className="desc-col">Description</span>
          <span className="qty-col">Qty</span>
          <span className="amount-col">Amount</span>
        </div>

        <div className="items-list">
          {topItems.map((item) => (
            <div 
              key={`${item.itemCode}-${item.amount}`}
              className="item-row"
            >
              {/* Note: Using item.itemCode instead of item.ItemCode */}
              <span className="item-col">{item.itemCode || "N/A"}</span>
              <span className="desc-col">{item.itemDesc || "No description"}</span>
              <span className="qty-col">{item.qty ?? "N/A"}</span>
              <span className="amount-col">
                ${typeof item.amount === 'number' ? item.amount.toFixed(2) : "0.00"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default DataWindow;