export default async function handler(req, res) {
  // CORSヘッダーを設定
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONSリクエストの処理
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // OpenAI APIキーの確認
    if (!process.env.OPENAI_API_KEY) {
      console.error('❌ OPENAI_API_KEY is not set');
      return res.status(500).json({ 
        error: 'Server configuration error',
        details: 'API key not configured'
      });
    }

    // ChatKit REST API を使用してセッションを作成
    const response = await fetch('https://api.openai.com/v1/chatkit/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'chatkit_beta=v1',
      },
      body: JSON.stringify({
        workflow: {
          id: 'wf_68e4692701c88190b320ee7546ec44d70e84b98b70d37035'
        },
        user: req.body?.deviceId || 'anonymous-' + Date.now(),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ ChatKit API error:', response.status, errorText);
      return res.status(response.status).json({ 
        error: 'Failed to create session',
        details: errorText 
      });
    }

    const session = await response.json();
    console.log('✅ ChatKit session created successfully');

    return res.status(200).json({ 
      client_secret: session.client_secret 
    });

  } catch (error) {
    console.error('❌ ChatKit session creation failed:', error);
    return res.status(500).json({ 
      error: 'Failed to create session',
      details: error.message 
    });
  }
}


