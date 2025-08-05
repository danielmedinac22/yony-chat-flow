import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";

export const N8nApiTester = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('Hola, soy YonY, tu agente de automatización');
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState(`test-${Date.now()}`);

  const webhookUrl = 'https://yony-agents-n8n.evpwva.easypanel.host/webhook/fced9613-a284-4bf3-bfc3-7811acd0013f/chat';

  const testWebhook = async () => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      console.log('🧪 Testing n8n webhook with message:', message);
      
      const requestBody = {
        action: 'sendMessage',
        sessionId: sessionId,
        chatInput: message,
        metadata: {
          source: 'yony-web-chat',
          version: '1.0.0',
          agent: 'yony-automation-assistant',
          test: true
        }
      };

      console.log('📤 Request body:', requestBody);

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Source': 'YonY-ApiTester',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      console.log('📥 Response status:', response.status);
      console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()));

      const data = await response.json();
      console.log('📥 Response data:', data);

      if (response.ok) {
        setResponse({
          status: response.status,
          headers: Object.fromEntries(response.headers.entries()),
          data: data
        });
      } else {
        setError(`HTTP ${response.status}: ${JSON.stringify(data)}`);
      }
    } catch (err: any) {
      console.error('❌ Test failed:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send size={20} />
            YonY n8n API Tester
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Session ID:</label>
            <Input
              value={sessionId}
              onChange={(e) => setSessionId(e.target.value)}
              placeholder="session-id"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">Message:</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe tu mensaje aquí..."
              rows={3}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Webhook URL:</label>
            <Input
              value={webhookUrl}
              disabled
              className="bg-muted"
            />
          </div>

          <Button
            onClick={testWebhook}
            disabled={isLoading || !message.trim()}
            className="w-full"
          >
            {isLoading ? (
              <Loader2 className="animate-spin mr-2" size={16} />
            ) : (
              <Send className="mr-2" size={16} />
            )}
            Test Webhook
          </Button>
        </CardContent>
      </Card>

      {response && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="text-green-500" size={20} />
              Success Response
              <Badge variant="secondary">HTTP {response.status}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium mb-2">Response Data:</h4>
                <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                  {JSON.stringify(response.data, null, 2)}
                </pre>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Response Headers:</h4>
                <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                  {JSON.stringify(response.headers, null, 2)}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle size={20} />
              Error Response
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-destructive/10 p-3 rounded text-sm text-destructive">
              {error}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
};