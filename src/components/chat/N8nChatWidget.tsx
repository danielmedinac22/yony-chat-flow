import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

export const N8nChatWidget = () => {
  useEffect(() => {
    // Initialize n8n chat widget with YonY configuration
    createChat({
      webhookUrl: 'https://yony-agents-n8n.evpwva.easypanel.host/webhook/fced9613-a284-4bf3-bfc3-7811acd0013f/chat',
      mode: 'fullscreen',
      target: '#n8n-chat-container',
      showWelcomeScreen: true,
      loadPreviousSession: true,
      enableStreaming: true,
      chatInputKey: 'chatInput',
      chatSessionKey: 'sessionId',
      defaultLanguage: 'en',
      initialMessages: [
        '¡Hola! 👋',
        'Soy YonY, tu agente de IA especializado en automatización.',
        '¿En qué puedo ayudarte hoy?'
      ],
      i18n: {
        en: {
          title: '¡Hola! Soy YonY 👋',
          subtitle: 'Tu agente de IA para automatización y flujos de trabajo inteligentes.',
          footer: 'Powered by YonY Agency',
          getStarted: 'Nueva Conversación',
          inputPlaceholder: 'Escribe tu pregunta aquí...',
          closeButtonTooltip: 'Cerrar chat'
        }
      },
      metadata: {
        source: 'yony-web-chat',
        version: '1.0.0'
      },
      webhookConfig: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Source': 'YonY-WebChat'
        }
      }
    });
  }, []);

  return (
    <div 
      id="n8n-chat-container" 
      className="h-full w-full"
      style={{
        width: '100%',
        height: '100vh'
      }}
    />
  );
};