"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar";
import Chat from "@/components/chat";

export default function Home() {
  const [serverUrl, setServerUrl] = useState("");
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected" | "error">("disconnected");

  const handleConnect = () => {
    if (!serverUrl.trim()) {
      setConnectionStatus("error");
      return;
    }

    // TODO: Replace with actual connection logic to your MCP server
    // For now, simulate a successful connection
    setConnectionStatus("connected");
    console.log("Connecting to:", serverUrl);
  };

  const handleDisconnect = () => {
    setConnectionStatus("disconnected");
    console.log("Disconnected from:", serverUrl);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-80 min-w-80 max-w-80">
        <Sidebar
          connectionStatus={connectionStatus}
          serverUrl={serverUrl}
          setServerUrl={setServerUrl}
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Chat
          serverUrl={serverUrl}
          isConnected={connectionStatus === "connected"}
        />
      </div>
    </div>
  );
}
