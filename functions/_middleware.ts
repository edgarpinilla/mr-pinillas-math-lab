interface Env {
  CLASS_ACCESS_CODE?: string;
  SESSION_SECRET?: string;
}

interface EventContext<Env, P extends string, Data> {
  request: Request;
  functionPath: string;
  waitUntil: (promise: Promise<unknown>) => void;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
  env: Env;
  params: Record<P, string | string[]>;
  data: Data;
}

type PagesFunction<
  Env = unknown,
  Params extends string = any,
  Data extends Record<string, unknown> = Record<string, unknown>
> = (context: EventContext<Env, Params, Data>) => Response | Promise<Response>;

const SESSION_MESSAGE = 'mr-pinillas-math-lab-session-v1';

/**
 * Computes an HMAC-SHA-256 session token using SESSION_SECRET as the key and a fixed message.
 * This ensures the session token is cryptographically signed and decoupled from the class access code.
 */
async function computeSessionToken(sessionSecret: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(sessionSecret);
  const messageData = encoder.encode(SESSION_MESSAGE);

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
  const hashArray = Array.from(new Uint8Array(signature));
  return hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Extracts a cookie value by name from the request headers.
 */
function getCookie(request: Request, name: string): string | null {
  const cookieHeader = request.headers.get('Cookie');
  if (!cookieHeader) return null;
  const cookies = cookieHeader.split(';');
  for (const cookie of cookies) {
    const [key, ...val] = cookie.trim().split('=');
    if (key === name) {
      return decodeURIComponent(val.join('='));
    }
  }
  return null;
}

/**
 * Renders a clean, self-contained, responsive login page without external dependencies,
 * fonts, tracking, or scripts.
 */
function renderLoginPage(errorMessage?: string): Response {
  const errorHtml = errorMessage
    ? `<div class="error-box" role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <span>${errorMessage.replace(/[&<>"']/g, '')}</span>
      </div>`
    : '';

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mr. Pinilla's Math Lab - Access Protection</title>
  <style>
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #0f172a;
      color: #f8fafc;
      padding: 1.25rem;
    }
    .card {
      width: 100%;
      max-width: 420px;
      background-color: #1e293b;
      border: 1px solid #334155;
      border-radius: 16px;
      padding: 2.25rem 2rem;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5);
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      background-color: rgba(37, 99, 235, 0.15);
      border: 1px solid rgba(59, 130, 246, 0.3);
      color: #93c5fd;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      padding: 0.25rem 0.625rem;
      border-radius: 9999px;
      margin-bottom: 1rem;
    }
    h1 {
      font-size: 1.5rem;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 0.5rem;
      letter-spacing: -0.02em;
    }
    .subtitle {
      font-size: 0.9375rem;
      color: #94a3b8;
      margin-bottom: 1.75rem;
      line-height: 1.4;
    }
    .error-box {
      display: flex;
      align-items: center;
      gap: 0.625rem;
      background-color: rgba(239, 68, 68, 0.12);
      border: 1px solid rgba(239, 68, 68, 0.35);
      color: #fca5a5;
      font-size: 0.875rem;
      padding: 0.75rem 0.875rem;
      border-radius: 8px;
      margin-bottom: 1.25rem;
    }
    .form-group {
      margin-bottom: 1.5rem;
    }
    label {
      display: block;
      font-size: 0.875rem;
      font-weight: 600;
      color: #cbd5e1;
      margin-bottom: 0.5rem;
    }
    input[type="password"] {
      width: 100%;
      background-color: #0f172a;
      border: 1px solid #475569;
      border-radius: 8px;
      padding: 0.75rem 1rem;
      font-size: 1rem;
      color: #ffffff;
      outline: none;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }
    input[type="password"]:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
    }
    input[type="password"]::placeholder {
      color: #64748b;
    }
    button {
      width: 100%;
      background-color: #2563eb;
      color: #ffffff;
      border: none;
      border-radius: 8px;
      padding: 0.875rem 1.25rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: background-color 0.15s ease;
    }
    button:hover {
      background-color: #1d4ed8;
    }
    button:active {
      background-color: #1e40af;
    }
    .footer-note {
      margin-top: 1.5rem;
      text-align: center;
      font-size: 0.75rem;
      color: #64748b;
      line-height: 1.4;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
      Secure Student Portal
    </div>
    <h1>Mr. Pinilla's Math Lab</h1>
    <p class="subtitle">Enter your classroom access code to continue to the math portal.</p>
    ${errorHtml}
    <form method="POST" action="/__login">
      <div class="form-group">
        <label for="access_code">Enter Class Access Code</label>
        <input
          type="password"
          id="access_code"
          name="access_code"
          placeholder="Enter code provided by Mr. Pinilla"
          required
          autofocus
          autocomplete="off"
        />
      </div>
      <button type="submit">
        <span>Enter Math Lab</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </button>
    </form>
    <p class="footer-note">Student privacy protected &bull; No accounts, email, or passwords stored</p>
  </div>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const accessSecret = env.CLASS_ACCESS_CODE;
  const sessionSecret = env.SESSION_SECRET;

  // Fail closed if either required Cloudflare secret is missing
  if (
    !accessSecret ||
    accessSecret.trim() === '' ||
    !sessionSecret ||
    sessionSecret.trim() === ''
  ) {
    return new Response(
      '503 Service Unavailable: Math Lab access protection is not configured. Please configure both CLASS_ACCESS_CODE and SESSION_SECRET in your Cloudflare Pages project settings.',
      {
        status: 503,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-store',
        },
      }
    );
  }

  const url = new URL(request.url);

  // Handle logout endpoint: clear session cookie and redirect to root
  if (url.pathname === '/__logout') {
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/',
        'Set-Cookie':
          'mathlab_session=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
        'Cache-Control': 'no-store',
      },
    });
  }

  // Handle login form submission
  if (url.pathname === '/__login' && request.method === 'POST') {
    try {
      const formData = await request.formData();
      const submittedCode = formData.get('access_code');

      if (typeof submittedCode === 'string' && submittedCode.trim() === accessSecret.trim()) {
        const sessionToken = await computeSessionToken(sessionSecret.trim());
        return new Response(null, {
          status: 303,
          headers: {
            Location: '/',
            'Set-Cookie': `mathlab_session=${sessionToken}; Path=/; Max-Age=28800; HttpOnly; Secure; SameSite=Lax`,
            'Cache-Control': 'no-store',
          },
        });
      }

      return renderLoginPage('Incorrect access code. Please check with Mr. Pinilla and try again.');
    } catch {
      return renderLoginPage('Invalid login request. Please try again.');
    }
  }

  // If user navigates directly to /__login via GET, redirect to home
  if (url.pathname === '/__login' && request.method === 'GET') {
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/',
      },
    });
  }

  // Check existing session cookie
  const sessionCookie = getCookie(request, 'mathlab_session');
  const expectedSession = await computeSessionToken(sessionSecret.trim());

  if (sessionCookie && sessionCookie === expectedSession) {
    // Authenticated: proceed to serve the React/Vite application
    return context.next();
  }

  // Unauthenticated: present login page
  return renderLoginPage();
};
