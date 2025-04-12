import * as signalR from "@microsoft/signalr";

class SignalRService {
  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7221/datahub", {
        skipNegotiation: false,
        transport: signalR.HttpTransportType.WebSockets,
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Debug) // Increased logging
      .build();

    // Enhanced connection monitoring
    this.connection.onclose((error) => {
      console.log("Connection closed:", error);
      setTimeout(() => this.startConnection(), 5000);
    });

    this.connection.onreconnecting((error) => {
      console.log("Connection reconnecting:", error);
    });

    this.connection.onreconnected((connectionId) => {
      console.log("Connection reestablished. Connected with ID:", connectionId);
    });
  }

  async startConnection() {
    try {
      await this.connection.start();
      console.log(
        "SignalR Connected - Connection State:",
        this.connection.state
      );

      // Join group after connection is established
      await this.connection
        .invoke("JoinDashboardGroup")
        .then(() => console.log("Successfully joined DashboardGroup"))
        .catch((err) => console.error("Error joining group:", err));

      return true;
    } catch (err) {
      console.error("Connection failed:", err);
      return false;
    }
  }

  onReceiveData(callback) {
    this.connection.on("ReceiveData", (data) => {
      console.log("Received data from server:", data); // Log incoming data
      callback(data);
    });
  }

  async stopConnection() {
    await this.connection.stop();
    console.log("SignalR connection stopped");
  }
}

export default new SignalRService();
