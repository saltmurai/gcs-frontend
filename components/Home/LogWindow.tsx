// connect to localhost:3002/ws to see the log

import { useLogsContext } from "@/contexts/LogProvider";
import { use, useEffect, useRef, useState } from "react";
import { TfiReload } from "react-icons/tfi";

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
  const { logs, restartWebSocket } = useLogsContext();
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    divRef.current?.scrollTo(0, divRef.current.scrollHeight);
  }, [logs]);

  return (
    <div
      ref={divRef}
      className="w-full h-[calc(50vh)] flex-col flex overflow-scroll rounded-md mb-2 shadow-inner bg-gray-100"
    >
      {logs.map((log: any, index: any) => {
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
