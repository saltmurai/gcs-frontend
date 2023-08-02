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
  mission_items: any[];
};
const WebSocketContext = createContext<WebSocketContextType>({
  socket: null,
  restartWebSocket: () => {},
  mission_items: [],
});

const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<any>(null);
  const [mission_items, setMissionItems] = useState<any[]>([]);

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
    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      if (data.type === "mission_items") {
        setMissionItems((prev) => {
          // find if missionitems for data.drone_id already exists
          const index = prev.findIndex(
            (item) => item.drone_id === data.drone_id
          );
          if (index === -1) {
            return [...prev, data];
          }
          // if exists, replace it
          const newMissionItems = [...prev];
          newMissionItems[index] = data;
          return newMissionItems;
        });
      }
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
      newSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);
        if (data.type === "mission_items") {
          setMissionItems((prev) => {
            // find if missionitems for data.drone_id already exists
            const index = prev.findIndex(
              (item) => item.drone_id === data.drone_id
            );
            if (index === -1) {
              return [...prev, data];
            }
            // if exists, replace it
            const newMissionItems = [...prev];
            newMissionItems[index] = data;
            return newMissionItems;
          });
        }
      };
      setSocket(newSocket);
    }, 500);
  };

  return (
    <WebSocketContext.Provider
      value={{ socket, restartWebSocket, mission_items }}
    >
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
