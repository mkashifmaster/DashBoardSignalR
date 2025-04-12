import React, { useState, useEffect } from "react";
import DataWindow from "../components/DataWindow/DataWindow";
import ConnectionStatus from "../components/DataWindow/ConnectionStatus";
import "./styles/dashboard.css";
import AddItemWindow from "../components/AddItemWindow";
import signalRService from "../services/signalRService";

const DashboardContainer = () => {
  const [windowsData, setWindowsData] = useState({});
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    let unsubscribe = () => {};

    const handleDataUpdate = (newData) => {
      setWindowsData((prev) => {
        const transformedData = {};
        for (const [key, value] of Object.entries(newData)) {
          transformedData[key] = {
            locationCode: value.locationCode,
            locationDesc: value.locationDesc,
            items: value.items || [],
          };
        }
        console.log("newdata", newData);
        return transformedData;
      });
    };

    const initializeConnection = async () => {
      try {
        if (!isMounted) return;

        setIsLoading(true);
        setError(null);

        console.log("Initializing SignalR connection...");
        const connected = await signalRService.startConnection();

        if (connected) {
          console.log("SignalR connected successfully");
          setIsConnected(true);

          // Subscribe to data updates
          unsubscribe = signalRService.onReceiveData(handleDataUpdate);

          // Verify initial connection
          console.log("Waiting for initial data...");
        } else {
          console.warn("SignalR connection failed");
          setIsConnected(false);
          setError("Failed to connect to real-time service");
        }
      } catch (err) {
        console.error("Connection initialization error:", err);
        if (isMounted) {
          setIsConnected(false);
          setError("Connection error occurred. Please refresh.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initializeConnection();

    return () => {
      isMounted = false;
      unsubscribe(); // Clean up the event listener
      console.log("Cleaning up SignalR connection...");
      // Note: We're not stopping the connection here to allow reconnection
    };
  }, []);

  const handleAddItem = (newItem) => {
    setWindowsData((prev) => ({
      ...prev,
      [newItem.LocationCode]: {
        ...prev[newItem.LocationCode],
        ...newItem,
        items: [...(prev[newItem.LocationCode]?.items || []), ...newItem.items],
      },
    }));
  };

  return (
    <div className="dashboard">
      <h1>Real-Time Data Dashboard</h1>
      <ConnectionStatus isConnected={isConnected} />

      {error && (
        <div className="error-message">
          {error}
          <button
            onClick={() => window.location.reload()}
            className="retry-button"
          >
            Retry Connection
          </button>
        </div>
      )}

      {isLoading && (
        <div className="loading-message">
          Connecting to real-time service...
          <div className="spinner"></div>
        </div>
      )}

      <div className="windows-grid">
        {Object.entries(windowsData)
          .slice(0, 8)
          .map(([locationCode, data]) => (
            <DataWindow key={locationCode} data={data} />
          ))}
      </div>

      <AddItemWindow onAddItem={handleAddItem} />
    </div>
  );
};

export default DashboardContainer;
