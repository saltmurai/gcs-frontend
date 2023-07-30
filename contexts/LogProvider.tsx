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
  logs: any;
  restartWebSocket: () => void;
};
const WebSocketContext = createContext<WebSocketContextType>({
  socket: null,
  logs: null,
  restartWebSocket: () => {},
});

const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<any>(null);
  const [logs, setLogs] = useState(["Connecting to Logs Server..."]);
  useEffect(() => {
    const newSocket = new WebSocket(`${process.env.NEXT_PUBLIC_LOG_SERVER_WS}`);

    newSocket.onopen = () => {
      notifications.show({
        title: "Logs Server Connected",
        message: "Logs server websocket connected",
        color: "blue",
      });
    };
    newSocket.onmessage = (e) => {
      setLogs((prev) => [...prev, e.data]);
    };
    newSocket.onclose = () => {
      notifications.show({
        title: "Logs Server Disconnected",
        message: "Logs server websocket disconnected",
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
      notifications.show({
        title: "Logs Server Disconnected",
        message: "Logs server websocket disconnected",
        color: "red",
      });
    }
    // timeout to allow socket to close
    notifications.show({
      title: "Logs Server Reconnecting",
      message: "Logs server reconnecting",
      color: "yellow",
    });
    setTimeout(() => {
      console.log("restarting");
      const newSocket = new WebSocket(`${process.env.NEXT_PUBLIC_MAVLINK_WS}`);
      newSocket.onopen = () => {
        notifications.show({
          title: "Logs server Connected",
          message: "Logs server websocket connected",
          color: "blue",
        });
      };
      newSocket.onmessage = (e) => {
        setLogs((prev) => [...prev, e.data]);
      };
      setSocket(newSocket);
    }, 3000);
  };

  return (
    <WebSocketContext.Provider value={{ socket, restartWebSocket, logs }}>
      {children}
    </WebSocketContext.Provider>
  );
};

const useWebSocketContext = () => {
  return useContext(WebSocketContext);
};

export {
  WebSocketProvider as LogsProvider,
  useWebSocketContext as useLogsContext,
};
