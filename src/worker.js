export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/auth') return handleAuth(url, env);
    if (url.pathname === '/api/callback') return handleCallback(url, env);
    return env.ASSETS.fetch(request);
  },
};

function handleAuth(url, env) {
  const scope = url.searchParams.get('scope') || 'repo,user';
  const authUrl = new URL('https://github.com/login/oauth/authorize');
  authUrl.searchParams.set('client_id', env.OAUTH_CLIENT_ID);
  authUrl.searchParams.set('redirect_uri', `${url.origin}/api/callback`);
  authUrl.searchParams.set('scope', scope);
  return Response.redirect(authUrl.toString(), 302);
}

async function handleCallback(url, env) {
  const code = url.searchParams.get('code');
  if (!code) return renderCallback('error', { message: 'Missing code' });

  const res = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': 'arsovo-cms-oauth',
    },
    body: JSON.stringify({
      client_id: env.OAUTH_CLIENT_ID,
      client_secret: env.OAUTH_CLIENT_SECRET,
      code,
    }),
  });
  const data = await res.json();
  if (data.error || !data.access_token) {
    return renderCallback('error', {
      message: data.error_description || data.error || 'No access token',
    });
  }
  return renderCallback('success', { token: data.access_token, provider: 'github' });
}

function renderCallback(status, content) {
  const message = `authorization:github:${status}:${JSON.stringify(content)}`;
  const html = `<!doctype html>
<html>
<head><meta charset="utf-8"><title>Authorizing</title></head>
<body>
<p>Authorizing, please wait...</p>
<script>
(function() {
  if (!window.opener) {
    document.body.innerText = 'No opener window. Start auth from the CMS admin page.';
    return;
  }
  function receive(e) {
    if (e.data !== 'authorizing:github') return;
    window.removeEventListener('message', receive);
    window.opener.postMessage(${JSON.stringify(message)}, e.origin);
  }
  window.addEventListener('message', receive);
  window.opener.postMessage('authorizing:github', '*');
})();
</script>
</body>
</html>`;
  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
