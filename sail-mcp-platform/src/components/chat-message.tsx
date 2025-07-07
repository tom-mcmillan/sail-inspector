import React from "react";
import { User, Bot } from "lucide-react";

interface ChatMessageProps {
  message: {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp?: Date;
  };
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 p-4 ${isUser ? "bg-muted/50" : ""}`}>
      <div className="flex-shrink-0">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isUser 
            ? "bg-primary text-primary-foreground" 
            : "bg-secondary text-secondary-foreground"
        }`}>
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="prose prose-sm max-w-none break-words">
          <p className="text-sm leading-6 text-foreground m-0">
            {message.content}
          </p>
        </div>
        {message.timestamp && (
          <div className="text-xs text-muted-foreground mt-2">
            {message.timestamp.toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;