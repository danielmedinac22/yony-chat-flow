import { YonyAvatar } from "./YonyAvatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
  isTyping?: boolean;
}

export const ChatMessage = ({ message, isUser, timestamp, isTyping = false }: ChatMessageProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (isUser) {
    return (
      <div className="flex justify-end mb-4 animate-in slide-in-from-right duration-300">
        <div className="max-w-[80%] lg:max-w-[60%]">
          <Card className="bg-primary text-primary-foreground shadow-md">
            <CardContent className="p-3">
              <p className="text-sm leading-relaxed">{message}</p>
              <p className="text-xs opacity-70 mt-1">{formatTime(timestamp)}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 mb-4 animate-in slide-in-from-left duration-300">
      <YonyAvatar size="sm" showStatus={false} />
      <div className="flex-1 max-w-[80%] lg:max-w-[60%]">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-foreground">YonY</span>
          <span className="text-xs text-muted-foreground">{formatTime(timestamp)}</span>
        </div>
        
        <Card className="bg-card shadow-md border border-border">
          <CardContent className="p-3">
            {isTyping ? (
              <div className="flex gap-1 items-center">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-xs text-muted-foreground ml-2">YonY está escribiendo...</span>
              </div>
            ) : (
              <p className="text-sm leading-relaxed text-card-foreground">{message}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};