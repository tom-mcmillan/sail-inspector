import { InspectorConfig } from "./configurationTypes";

// OAuth-related session storage keys
export const SESSION_KEYS = {
  CODE_VERIFIER: "mcp_code_verifier",
  SERVER_URL: "mcp_server_url",
  TOKENS: "mcp_tokens",
  CLIENT_INFORMATION: "mcp_client_information",
  SERVER_METADATA: "mcp_server_metadata",
  AUTH_DEBUGGER_STATE: "mcp_auth_debugger_state",
} as const;

// Generate server-specific session storage keys
export const getServerSpecificKey = (
  baseKey: string,
  serverUrl?: string,
): string => {
  if (!serverUrl) return baseKey;
  return `[${serverUrl}] ${baseKey}`;
};

export type ConnectionStatus =
  | "disconnected"
  | "connected"
  | "error"
  | "error-connecting-to-proxy";

export const DEFAULT_MCP_PROXY_LISTEN_PORT = "6277";

/**
 * Default configuration for the MCP Inspector, Currently persisted in local_storage in the Browser.
 * Future plans: Provide json config file + Browser local_storage to override default values
 **/
export const DEFAULT_INSPECTOR_CONFIG: InspectorConfig = {
  MCP_SERVER_REQUEST_TIMEOUT: {
    label: "Setting 1",
    description: "Setting 1 configuration",
    value: "",
    is_session_item: false,
  },
  MCP_REQUEST_TIMEOUT_RESET_ON_PROGRESS: {
    label: "Setting 2", 
    description: "Setting 2 configuration",
    value: "",
    is_session_item: false,
  },
} as const;
