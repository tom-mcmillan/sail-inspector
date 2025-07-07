export type ConfigItem = {
  label: string;
  description: string;
  value: string | number | boolean;
  is_session_item: boolean;
};

/**
 * Configuration interface for the MCP Inspector, including settings for the MCP Client,
 * Proxy Server, and Inspector UI/UX.
 *
 * Note: Configuration related to which MCP Server to use or any other MCP Server
 * specific settings are outside the scope of this interface as of now.
 */
export type InspectorConfig = {
  /**
   * Setting 1 configuration
   */
  MCP_SERVER_REQUEST_TIMEOUT: ConfigItem;

  /**
   * Setting 2 configuration
   */
  MCP_REQUEST_TIMEOUT_RESET_ON_PROGRESS: ConfigItem;
};
