"use client";

import { useState } from "react";
import { Play, ChevronDown, ChevronRight, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SidebarProps {
  connectionStatus: "connected" | "disconnected" | "error";
  serverUrl: string;
  setServerUrl: (url: string) => void;
  onConnect: () => void;
  onDisconnect: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  connectionStatus,
  serverUrl,
  setServerUrl,
  onConnect,
  onDisconnect,
}) => {
  const [showConfig, setShowConfig] = useState(false);
  const [setting1, setSetting1] = useState("");
  const [setting2, setSetting2] = useState("");

  return (
    <div className="bg-card border-r border-border flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-border">
        <div className="flex items-center">
          <h1 className="ml-2 text-lg font-semibold">
            Sail MCP Platform
          </h1>
        </div>
      </div>

      <div className="p-4 flex-1 overflow-auto">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="server-url-input">
              MCP Server URL
            </label>
            <Input
              id="server-url-input"
              placeholder="https://your-mcp-server.run.app"
              value={serverUrl}
              onChange={(e) => setServerUrl(e.target.value)}
              className="font-mono"
            />
          </div>

          {/* Configuration */}
          <div className="space-y-2">
            <Button
              variant="outline"
              onClick={() => setShowConfig(!showConfig)}
              className="flex items-center w-full"
              data-testid="config-button"
              aria-expanded={showConfig}
            >
              {showConfig ? (
                <ChevronDown className="w-4 h-4 mr-2" />
              ) : (
                <ChevronRight className="w-4 h-4 mr-2" />
              )}
              <Settings className="w-4 h-4 mr-2" />
              Configuration
            </Button>
            {showConfig && (
              <div className="space-y-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-green-600">
                    Setting 1
                  </label>
                  <Input
                    value={setting1}
                    onChange={(e) => setSetting1(e.target.value)}
                    className="font-mono"
                    placeholder="Setting 1 configuration"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-green-600">
                    Setting 2
                  </label>
                  <Input
                    value={setting2}
                    onChange={(e) => setSetting2(e.target.value)}
                    className="font-mono"
                    placeholder="Setting 2 configuration"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            {connectionStatus === "connected" ? (
              <div className="grid grid-cols-2 gap-4">
                <Button
                  data-testid="connect-button"
                  onClick={() => {
                    onDisconnect();
                    onConnect();
                  }}
                >
                  Reconnect
                </Button>
                <Button onClick={onDisconnect}>
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button className="w-full" onClick={onConnect}>
                <Play className="w-4 h-4 mr-2" />
                Connect
              </Button>
            )}

            <div className="flex items-center justify-center space-x-2 mb-4">
              <div
                className={`w-2 h-2 rounded-full ${(() => {
                  switch (connectionStatus) {
                    case "connected":
                      return "bg-green-500";
                    case "error":
                      return "bg-red-500";
                    default:
                      return "bg-gray-500";
                  }
                })()}`}
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {(() => {
                  switch (connectionStatus) {
                    case "connected":
                      return "Connected";
                    case "error":
                      return "Connection Error - Check if your MCP server is running";
                    default:
                      return "Disconnected";
                  }
                })()}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <select 
            className="w-[100px] rounded border border-input bg-background px-3 py-1 text-sm"
            defaultValue="system"
          >
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;