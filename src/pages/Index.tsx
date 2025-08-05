import { useState } from 'react';
import { YonyChatInterface } from "@/components/chat/YonyChatInterface";
import { N8nApiTester } from "@/components/debug/N8nApiTester";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, TestTube } from "lucide-react";

const Index = () => {
  const [view, setView] = useState<'chat' | 'tester'>('chat');

  return (
    <div className="h-screen bg-background">
      {/* View Toggle */}
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        <Button
          variant={view === 'chat' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setView('chat')}
          className="flex items-center gap-1"
        >
          <MessageCircle size={14} />
          Chat
        </Button>
        <Button
          variant={view === 'tester' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setView('tester')}
          className="flex items-center gap-1"
        >
          <TestTube size={14} />
          API Tester
        </Button>
      </div>

      {/* Content */}
      {view === 'chat' ? (
        <YonyChatInterface />
      ) : (
        <div className="h-full overflow-y-auto pt-16">
          <N8nApiTester />
        </div>
      )}
    </div>
  );
};

export default Index;