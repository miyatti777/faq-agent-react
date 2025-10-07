import { ChatKit, useChatKit } from '@openai/chatkit-react';
import './App.css';

function App() {
  const { control } = useChatKit({
    api: {
      async getClientSecret(existing) {
        if (existing) {
          // Implement session refresh if needed
          console.log('Refreshing existing session...');
        }

        const res = await fetch('/api/chatkit/session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
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
          className="h-[600px] w-[320px]"
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