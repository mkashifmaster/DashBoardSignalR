import React, { useState, useEffect, useCallback } from "react";
import DataWindow from "../components/DataWindow/DataWindow";
import ConnectionStatus from "../components/DataWindow/ConnectionStatus";
import "./styles/dashboard.css";

const DashboardContainer = () => {
  const [windowsData, setWindowsData] = useState({});
  const [isConnected, setIsConnected] = useState(false);

  const connectToApi = useCallback(() => {
    // Simulate API connection
    setIsConnected(true);
    const interval = setInterval(() => {
      const mockData = generateMockData();
      processDataUpdate(mockData);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const processDataUpdate = useCallback((newData) => {
    setWindowsData((prev) => {
      if (newData.LocationCode && prev[newData.LocationCode]) {
        return { ...prev, [newData.LocationCode]: newData };
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    const initialData = {};
    const locationCodes = Array.from(
      { length: 10 },
      (_, i) => `LOC${String(i + 1).padStart(3, "0")}`
    );

    locationCodes.forEach((code) => {
      initialData[code] = createEmptyWindowData(code);
    });

    setWindowsData(initialData);
    connectToApi();
  }, [connectToApi]);

  return (
    <div className="dashboard">
      <h1>Real-Time Data Dashboard</h1>
      <ConnectionStatus isConnected={isConnected} />

      <div className="windows-grid">
        {Object.entries(windowsData)
          .slice(0, 8) // Show first 8 windows (4x2)
          .map(([locationCode, data]) => (
            <DataWindow key={locationCode} data={data} />
          ))}
      </div>
    </div>
  );
};

// Helper functions
function createEmptyWindowData(locationCode) {
    return {
      LocationCode: locationCode,
      LocationDesc: `Location ${locationCode.substring(3)}`,
      items: Array.from({ length: 10 }, (_, i) => ({
        ItemCode: `ITEM${String(i+1).padStart(3, '0')}`,
        ItemDesc: `Product ${i+1}`,
        Qty: 0,
        Rate: 0,
        Amount: 0
      }))
    };
  }
  
  function generateMockData() {
    const locationCodes = Array.from({ length: 10 }, (_, i) => `LOC${String(i+1).padStart(3, '0')}`);
    const randomLoc = locationCodes[Math.floor(Math.random() * locationCodes.length)];
    
    return {
      LocationCode: randomLoc,
      LocationDesc: `Updated ${randomLoc.substring(3)}`,
      items: Array.from({ length: 10 }, (_, i) => ({
        ItemCode: `ITEM${String(i+1).padStart(3, '0')}`,
        ItemDesc: `Product ${Math.floor(Math.random() * 100)}`,
        Qty: Math.floor(Math.random() * 100),
        Rate: (Math.random() * 100).toFixed(2),
        Amount: (Math.random() * 1000).toFixed(2)
      }))
    };
  }

export default DashboardContainer;
