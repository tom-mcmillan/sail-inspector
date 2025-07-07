import React, { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatProps {
  serverUrl?: string;
  isConnected?: boolean;
}

const Chat: React.FC<ChatProps> = ({ 
  serverUrl, 
  isConnected = false 
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!isConnected || !serverUrl) {
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call to your OpenAI Agents backend
      // For now, simulate a response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Echo: ${content} (This is a placeholder response. Will be replaced with your OpenAI Agents API.)`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-3">
            <h3 className="text-lg font-medium text-foreground">
              Connect to start chatting
            </h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Enter your MCP Server URL in the sidebar to begin a conversation with your AI agent.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="border-b border-border p-4">
        <h2 className="font-semibold text-foreground">AI Assistant</h2>
        <p className="text-sm text-muted-foreground">
          Connected to: {serverUrl}
        </p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-3">
              <h3 className="text-lg font-medium text-foreground">
                Start a conversation
              </h3>
              <p className="text-sm text-muted-foreground">
                Ask me anything! I'm here to help.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex gap-3 p-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground">
                    AI is thinking...
                  </p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Chat Input */}
      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={isLoading || !isConnected}
        placeholder={isLoading ? "AI is responding..." : "Send a message..."}
      />
    </div>
  );
};

export default Chat;