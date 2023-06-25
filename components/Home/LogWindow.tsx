// connect to localhost:3002/ws to see the log

import { use, useEffect, useRef, useState } from "react";

const getClassName = (prefix: string) => {
  switch (prefix) {
    case "[INFO]":
      return "text-blue-500 font-semibold";
    case "[WARNING]":
      return "text-yellow-500 font-semibold";
    case "[ERROR]":
      return "text-red-500 font-semibold";
    default:
      return "";
  }
};

export default function LogWindow() {
  const [logs, setLogs] = useState(["...Connecting to server"]);
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    divRef.current?.scrollTo(0, divRef.current.scrollHeight);
  }, [logs]);
  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:3002/ws");
    ws.onopen = () => {
      setLogs((prev) => [...prev, "Connected to log server"]);
    };
    ws.onmessage = (e) => {
      setLogs((prev) => [...prev, e.data]);
    };
    ws.onclose = () => {
      setLogs((prev) => [...prev, "Disconnected from log server"]);
    };
  }, []);

  return (
    <div
      ref={divRef}
      className="w-full h-[calc(48vh)] flex-col flex overflow-scroll rounded-md mb-2 shadow-inner bg-gray-100"
    >
      {logs.map((log, index) => {
        const mathes = log.match(/\[(INFO|WARNING|ERROR)\]/g);
        if (mathes) {
          const prefix = mathes[0];
          const content = log.replace(prefix, "");
          return (
            <div
              key={index}
              className="px-2 py-1 font-light text-sm whitespace-pre-wrap"
            >
              <span className={getClassName(prefix)}>{prefix}</span>
              {content}
            </div>
          );
        }
        return (
          <div
            key={index}
            className="px-2 py-1 font-light text-sm whitespace-pre-wrap"
          >
            {log}
          </div>
        );
      })}
    </div>
  );
}
