import OpenAI from 'openai';

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

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // ChatKitセッションを作成
    const session = await openai.chatkit.sessions.create({
      workflow: { 
        id: 'wf_68e4692701c88190b320ee7546ec44d70e84b98b70d37035' 
      },
      user: req.body?.deviceId || 'anonymous-' + Date.now(),
    });

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
