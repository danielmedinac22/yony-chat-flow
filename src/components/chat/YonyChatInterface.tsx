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
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [debugInfo, setDebugInfo] = useState({
    webhookUrl: 'https://yony-agents-n8n.evpwva.easypanel.host/webhook/fced9613-a284-4bf3-bfc3-7811acd0013f/chat',
    timestamp: new Date().toISOString(),
    mode: 'n8n-integration',
    lastResponse: null as any,
    requestCount: 0
  });

  useEffect(() => {
    // Test webhook connectivity
    const testWebhook = async () => {
      try {
        console.log('🔍 YonY: Testing webhook connectivity...');
        const response = await fetch(debugInfo.webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Source': 'YonY-ConnectivityTest'
          },
          body: JSON.stringify({
            action: 'testConnection',
            sessionId: 'test-session',
            chatInput: 'test connectivity',
            metadata: {
              source: 'yony-web-chat',
              version: '1.0.0',
              test: true
            }
          })
        });

        const data = await response.json();
        console.log('🔍 YonY: Webhook test response:', data);
        
        setDebugInfo(prev => ({
          ...prev,
          lastResponse: data,
          requestCount: prev.requestCount + 1
        }));

        if (response.ok) {
          setConnectionStatus('connected');
          console.log('✅ YonY: Webhook is accessible');
        } else {
          setConnectionStatus('error');
          console.warn('⚠️ YonY: Webhook returned error:', response.status);
        }
      } catch (error) {
        console.error('❌ YonY: Webhook test failed:', error);
        setConnectionStatus('error');
        setDebugInfo(prev => ({
          ...prev,
          lastResponse: { error: error.message }
        }));
      }
    };

    testWebhook();

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
    }, 5000); // Increased timeout

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
                YonY Debug Mode - Connection: {connectionStatus}
              </CardTitle>
              <Badge variant="destructive">n8n Fallback</Badge>
            </div>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground space-y-2">
            <p>Webhook: {debugInfo.webhookUrl}</p>
            <p>Status: Using local chat fallback</p>
            <p>Requests sent: {debugInfo.requestCount}</p>
            {debugInfo.lastResponse && (
              <div className="bg-muted p-2 rounded text-xs">
                <p><strong>Last Response:</strong></p>
                <pre className="whitespace-pre-wrap overflow-x-auto">
                  {JSON.stringify(debugInfo.lastResponse, null, 2)}
                </pre>
              </div>
            )}
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => setChatMode('n8n')}
              >
                Retry n8n Connection
              </Button>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => window.location.reload()}
              >
                Reload Page
              </Button>
            </div>
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
      <div className="absolute top-4 left-4 z-50">
        <Card className="w-80 text-xs">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs flex items-center gap-1">
              <MessageCircle size={12} />
              YonY Debug Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>Mode: {chatMode}</div>
              <div>N8N Loaded: {n8nLoaded ? '✅' : '⏳'}</div>
              <div>Connection: {connectionStatus}</div>
              <div>Requests: {debugInfo.requestCount}</div>
            </div>
            {debugInfo.lastResponse && (
              <div className="bg-muted p-2 rounded max-h-32 overflow-y-auto">
                <p className="font-medium mb-1">Last Response:</p>
                <pre className="text-xs whitespace-pre-wrap">
                  {JSON.stringify(debugInfo.lastResponse, null, 2)}
                </pre>
              </div>
            )}
            <div className="flex gap-1">
              <Button 
                size="sm" 
                variant="ghost" 
                className="text-xs p-1 h-6"
                onClick={() => setChatMode(chatMode === 'n8n' ? 'fallback' : 'n8n')}
              >
                Toggle Mode
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="text-xs p-1 h-6"
                onClick={() => window.location.reload()}
              >
                Reload
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main N8N Chat */}
      <N8nChatWidget />
    </div>
  );
};