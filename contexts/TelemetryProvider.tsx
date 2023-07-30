import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { notifications } from "@mantine/notifications";

type WebSocketContextType = {
  socket: any;
  restartWebSocket: () => void;
};
const WebSocketContext = createContext<WebSocketContextType>({
  socket: null,
  restartWebSocket: () => {},
});

const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const newSocket = new WebSocket(`${process.env.NEXT_PUBLIC_MAVLINK_WS}`);

    newSocket.onopen = () => {
      notifications.show({
        title: "Telemetry Connected",
        message: "Telemetry websocket connected",
        color: "blue",
      });
    };
    newSocket.onclose = () => {
      notifications.show({
        title: "Telemetry Disconnected",
        message: "Telemetry websocket disconnected",
        color: "red",
      });
    };

    setSocket(newSocket);

    // Clean up the WebSocket on unmount
    return () => {
      newSocket.close();
    };
  }, []);
  const restartWebSocket = () => {
    if (socket) {
      socket.close();
    }
    // timeout to allow socket to close
    notifications.show({
      title: "Telemetry Reconnecting",
      message: "Telemetry websocket reconnecting",
      color: "yellow",
    });
    setTimeout(() => {
      console.log("restarting");
      const newSocket = new WebSocket(`${process.env.NEXT_PUBLIC_MAVLINK_WS}`);
      newSocket.onopen = () => {
        notifications.show({
          title: "Telemetry Connected",
          message: "Telemetry websocket connected",
          color: "blue",
        });
      };
      setSocket(newSocket);
    }, 3000);
  };

  return (
    <WebSocketContext.Provider value={{ socket, restartWebSocket }}>
      {children}
    </WebSocketContext.Provider>
  );
};

const useWebSocketContext = () => {
  return useContext(WebSocketContext);
};

export {
  WebSocketProvider as TelemetryProvider,
  useWebSocketContext as useTelemetryContext,
};
