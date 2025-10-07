import { ChatKit, useChatKit } from '@openai/chatkit-react';
import './App.css';

function App() {
  const { control } = useChatKit({
    api: {
      async getClientSecret(existing) {
        if (existing) {
          // セッション更新の実装（オプション）
          return existing;
        }

        // サーバーから新しいclient_secretを取得
        const res = await fetch('/api/chatkit/session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            deviceId: 'web-user-' + Date.now() 
          }),
        });

        if (!res.ok) {
          throw new Error('Failed to get client secret');
        }

        const { client_secret } = await res.json();
        return client_secret;
      },
    },
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>🤖 FAQ検索エージェント</h1>
        <p>OpenAI Agent Builderで作成したFAQ検索エージェントです</p>
      </header>

      <main className="chat-container">
        <ChatKit 
          control={control} 
          className="chatkit-widget"
        />
      </main>

      <footer className="App-footer">
        <p>
          Powered by <strong>OpenAI Agent Builder</strong> & <strong>ChatKit</strong>
        </p>
      </footer>
    </div>
  );
}

export default App;