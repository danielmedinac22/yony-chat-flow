import { useEffect, useState } from 'react';
import { N8nChatWidget } from "@/components/chat/N8nChatWidget";
import { ChatContainer } from "@/components/chat/ChatContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, MessageCircle, Zap } from "lucide-react";

export const YonyChatInterface = () => {
  const [chatMode, setChatMode] = useState<'n8n' | 'fallback'>('n8n');
  const [n8nLoaded, setN8nLoaded] = useState(false);
  const [debugInfo, setDebugInfo] = useState({
    webhookUrl: 'https://yony-agents-n8n.evpwva.easypanel.host/webhook/fced9613-a284-4bf3-bfc3-7811acd0013f/chat',
    timestamp: new Date().toISOString(),
    mode: 'n8n-integration'
  });

  useEffect(() => {
    // Check if n8n chat loads successfully
    const checkN8nLoad = setTimeout(() => {
      const n8nContainer = document.getElementById('n8n-chat-container');
      if (n8nContainer && n8nContainer.children.length > 0) {
        setN8nLoaded(true);
        console.log('✅ YonY: n8n chat widget loaded successfully');
      } else {
        console.warn('⚠️ YonY: n8n chat widget not detected, using fallback');
        setChatMode('fallback');
      }
    }, 3000);

    return () => clearTimeout(checkN8nLoad);
  }, []);

  if (chatMode === 'fallback') {
    return (
      <div className="h-screen flex flex-col bg-background">
        {/* Debug Header */}
        <Card className="m-4 border-destructive">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-destructive flex items-center gap-2">
                <Settings size={16} />
                YonY Debug Mode
              </CardTitle>
              <Badge variant="destructive">n8n Fallback</Badge>
            </div>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            <p>Webhook: {debugInfo.webhookUrl}</p>
            <p>Status: Using local chat fallback - n8n integration will be available once configured</p>
            <Button 
              size="sm" 
              variant="outline" 
              className="mt-2"
              onClick={() => setChatMode('n8n')}
            >
              Retry n8n Connection
            </Button>
          </CardContent>
        </Card>

        {/* Fallback Chat */}
        <div className="flex-1">
          <ChatContainer />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background relative">
      {/* Success indicator */}
      {n8nLoaded && (
        <div className="absolute top-4 right-4 z-50">
          <Badge variant="secondary" className="bg-secondary text-secondary-foreground flex items-center gap-1">
            <Zap size={12} />
            YonY Connected
          </Badge>
        </div>
      )}

      {/* Debug info for development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-4 left-4 z-50">
          <Card className="w-64 text-xs">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs flex items-center gap-1">
                <MessageCircle size={12} />
                YonY Debug
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <p>Mode: {chatMode}</p>
              <p>N8N Loaded: {n8nLoaded ? '✅' : '⏳'}</p>
              <p>Webhook: Active</p>
              <Button 
                size="sm" 
                variant="ghost" 
                className="w-full"
                onClick={() => setChatMode(chatMode === 'n8n' ? 'fallback' : 'n8n')}
              >
                Toggle Mode
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main N8N Chat */}
      <N8nChatWidget />
    </div>
  );
};