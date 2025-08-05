import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { YonyAvatar } from "./YonyAvatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export const ChatContainer = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Mensaje de bienvenida inicial
  useEffect(() => {
    const welcomeMessage: Message = {
      id: "welcome",
      content: "¡Hola! Soy YonY, tu agente de IA especializado en automatización y flujos de trabajo. ¿En qué puedo ayudarte hoy?",
      isUser: false,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, []);

  // Auto-scroll al último mensaje
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    // Añadir mensaje del usuario
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // TODO: Integrar con n8n API aquí
      // Por ahora, simulamos una respuesta
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const botResponse: Message = {
        id: `bot-${Date.now()}`,
        content: `Entiendo tu consulta sobre "${content}". Como agente de IA de YonY, puedo ayudarte con automatización de procesos, integración de sistemas y optimización de flujos de trabajo. ¿Te gustaría que profundice en algún aspecto específico?`,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error enviando mensaje:', error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        content: "Disculpa, hubo un problema procesando tu mensaje. Por favor, inténtalo nuevamente.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-screen bg-background">
      {/* Header del Chat */}
      <Card className="rounded-none border-b shadow-sm">
        <CardHeader className="py-4">
          <div className="flex items-center gap-3">
            <YonyAvatar size="md" />
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-foreground">YonY</h2>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  Agente de IA
                </Badge>
                <span className="text-xs text-muted-foreground">En línea</span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Área de Mensajes */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea ref={scrollAreaRef} className="h-full">
          <div className="p-4 space-y-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.content}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
            ))}
            
            {/* Indicador de escritura */}
            {isLoading && (
              <ChatMessage
                message=""
                isUser={false}
                timestamp={new Date()}
                isTyping={true}
              />
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Input de Mensaje */}
      <ChatInput 
        onSendMessage={handleSendMessage}
        disabled={isLoading}
        placeholder="Pregúntame sobre automatización, IA o flujos de trabajo..."
      />
    </div>
  );
};