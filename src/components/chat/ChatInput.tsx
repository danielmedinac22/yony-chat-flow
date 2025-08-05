import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const ChatInput = ({ 
  onSendMessage, 
  disabled = false,
  placeholder = "Escribe tu mensaje a YonY..." 
}: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="border-t border-border bg-background/95 backdrop-blur-sm p-4">
      <form onSubmit={handleSubmit} className="flex gap-2 items-end">
        <div className="flex-1 relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              "min-h-[44px] pr-12 resize-none",
              "focus:ring-2 focus:ring-primary/20",
              "placeholder:text-muted-foreground"
            )}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1 h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            title="Adjuntar archivo"
          >
            <Paperclip size={16} />
          </Button>
        </div>
        
        <Button 
          type="submit" 
          disabled={!message.trim() || disabled}
          className={cn(
            "h-[44px] w-[44px] p-0",
            "bg-primary hover:bg-primary/90",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
          title="Enviar mensaje"
        >
          <Send size={18} />
        </Button>
      </form>
      
      <div className="flex items-center justify-center mt-2">
        <p className="text-xs text-muted-foreground">
          Presiona <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Enter</kbd> para enviar
        </p>
      </div>
    </div>
  );
};