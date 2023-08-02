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
  clearLogs: () => void;
};
const WebSocketContext = createContext<WebSocketContextType>({
  socket: null,
  logs: null,
  restartWebSocket: () => {},
  clearLogs: () => {},
});

const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<any>(null);
  const [logs, setLogs] = useState([`Connecting...`]);
  useEffect(() => {
    const newSocket = new WebSocket(`${process.env.NEXT_PUBLIC_LOG_SERVER_WS}`);

    newSocket.onopen = () => {
      notifications.show({
        title: "Logs Server Connected",
        message: "Logs server websocket connected",
        color: "blue",
      });
      setLogs((prev) => [...prev, `Connected`]);
    };
    newSocket.onmessage = (e) => {
      const timestamp = new Date().toLocaleTimeString();
      setLogs((prev) => [...prev, ` ${timestamp} - ${e.data}`]);
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
    }
    // timeout to allow socket to close
    notifications.show({
      title: "Logs Server Reconnecting",
      message: "Logs server reconnecting",
      color: "yellow",
    });
    setTimeout(() => {
      console.log("restarting");
      const newSocket = new WebSocket(
        `${process.env.NEXT_PUBLIC_LOG_SERVER_WS}`
      );
      newSocket.onopen = () => {
        notifications.show({
          title: "Logs Server Connected",
          message: "Logs server websocket connected",
          color: "blue",
        });
        setLogs((prev) => [...prev, `Reconnected`]);
      };
      newSocket.onmessage = (e) => {
        const timestamp = new Date().toLocaleTimeString();
        setLogs((prev) => [...prev, ` ${timestamp} - ${e.data}`]);
      };
      setSocket(newSocket);
    }, 1000);
  };
  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <WebSocketContext.Provider
      value={{ socket, restartWebSocket, logs, clearLogs }}
    >
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
