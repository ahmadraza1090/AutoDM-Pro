import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Setup Supabase Client (if ENVs exist)
const supabaseUrl = process.env.SUPABASE_URL || 'https://mock.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'mock-key';
const supabase = createClient(supabaseUrl, supabaseKey);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON middleware
  app.use(express.json());

  // OAuth Route 1: Get Authorization URL
  app.get('/api/auth/instagram/url', (req, res) => {
    // Determine the exact callback URL for the OAuth app
    // We use APP_URL environment variable provided by AI Studio
    const appUrl = process.env.APP_URL || `http://localhost:${PORT}`;
    const redirectUri = `${appUrl}/api/auth/instagram/callback`;

    // Construct the Instagram Basic Display API OAuth URL
    const params = new URLSearchParams({
      client_id: process.env.INSTAGRAM_CLIENT_ID || 'mock_client_id',
      redirect_uri: redirectUri,
      scope: 'user_profile,user_media', // Or whatever scope is required
      response_type: 'code',
    });

    const providerAuthUrl = 'https://api.instagram.com/oauth/authorize';
    const authUrl = `${providerAuthUrl}?${params}`;

    res.json({ url: authUrl });
  });

  // OAuth Route 2: Callback Handler
  app.get(['/api/auth/instagram/callback', '/api/auth/instagram/callback/'], async (req, res) => {
    const { code, error } = req.query;

    if (error) {
      res.send(`
        <html><body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'OAUTH_AUTH_ERROR', error: '${error}' }, '*');
              window.close();
            }
          </script>
          <p>Authentication failed: ${error}. This window should close automatically.</p>
        </body></html>
      `);
      return;
    }

    try {
      // 1. Exchange the code for an access token using Instagram's API
      const appUrl = process.env.APP_URL || `http://localhost:${PORT}`;
      
      const formData = new URLSearchParams();
      formData.append('client_id', process.env.INSTAGRAM_CLIENT_ID || '');
      formData.append('client_secret', process.env.INSTAGRAM_CLIENT_SECRET || '');
      formData.append('grant_type', 'authorization_code');
      formData.append('redirect_uri', `${appUrl}/api/auth/instagram/callback`);
      formData.append('code', code as string);

      const tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
      });
      
      if (!tokenResponse.ok) {
         const errText = await tokenResponse.text();
         throw new Error(`Token exchange failed: ${errText}`);
      }
      
      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;
      const userId = tokenData.user_id;

      // 2. Store the token securely in the database
      // Here we assume a 'connected_accounts' table exists in Supabase.
      if (process.env.SUPABASE_URL) {
        await supabase.from('connected_accounts').upsert({
          provider: 'instagram',
          provider_user_id: userId.toString(),
          access_token: accessToken,
          updated_at: new Date().toISOString()
        });
      }

      // 3. Complete the flow: Message the parent window and close popup
      res.send(`
        <html><body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS', payload: { provider: 'instagram' } }, '*');
              window.close();
            } else {
              window.location.href = '/';
            }
          </script>
          <p>Instagram authentication successful! Securing your connection...</p>
          <p>This window should close automatically.</p>
        </body></html>
      `);
    } catch (err: any) {
      console.error('OAuth token exchange error:', err);
      res.send(`
        <html><body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'OAUTH_AUTH_ERROR', error: 'Token exchange failed' }, '*');
              window.close();
            }
          </script>
          <p>Authentication failed. This window should close automatically.</p>
        </body></html>
      `);
    }
  });

  // Integration Check Route
  app.get('/api/auth/instagram/status', async (req, res) => {
    // In a real app we would check session. Here we send a mocked status
    res.json({ connected: true, username: 'creatorhub', provider: 'instagram' });
  });

  // Vite Integration for frontend
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});
