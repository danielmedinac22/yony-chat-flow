import { useEffect, useRef } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

export const N8nChatWidget = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    console.log('🚀 YonY: Initializing n8n chat widget...');

    try {
      // Initialize n8n chat widget with YonY configuration
      createChat({
        webhookUrl: 'https://yony-agents-n8n.evpwva.easypanel.host/webhook/fced9613-a284-4bf3-bfc3-7811acd0013f/chat',
        mode: 'fullscreen',
        target: '#n8n-chat-container',
        showWelcomeScreen: true,
        loadPreviousSession: false, // Disable to avoid conflicts
        enableStreaming: false, // Disable streaming to debug
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
          version: '1.0.0',
          agent: 'yony-automation-assistant'
        },
        webhookConfig: {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Source': 'YonY-WebChat',
            'Accept': 'application/json'
          }
        }
      });

      console.log('✅ YonY: n8n chat widget initialized successfully');
      
      // Add event listeners for debugging
      window.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'n8n-chat') {
          console.log('📨 YonY: n8n chat event:', event.data);
        }
      });

    } catch (error) {
      console.error('❌ YonY: Error initializing n8n chat:', error);
    }
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