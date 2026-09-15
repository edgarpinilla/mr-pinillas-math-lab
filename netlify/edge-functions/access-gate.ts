const COOKIE_NAME = "mathlab_netlify_session";
const SESSION_SECONDS = 8 * 60 * 60;

async function sha256(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function getCookie(request: Request, name: string): string | null {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = cookieHeader.split(";");

  for (const cookie of cookies) {
    const [key, ...valueParts] = cookie.trim().split("=");
    if (key === name) {
      return valueParts.join("=");
    }
  }

  return null;
}

function loginPage(error = false): Response {
  const errorMessage = error
    ? `<p class="error">Incorrect access code. Please try again.</p>`
    : "";

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Mr. Pinilla's Math Lab</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: Arial, Helvetica, sans-serif;
      background: linear-gradient(135deg, #eef6ff, #f7fbff);
      color: #1f2937;
    }
    .card {
      width: min(420px, 90%);
      background: white;
      padding: 36px;
      border-radius: 18px;
      box-shadow: 0 12px 35px rgba(0,0,0,.12);
      text-align: center;
    }
    h1 {
      margin-top: 0;
      font-size: 28px;
    }
    p {
      line-height: 1.5;
    }
    input {
      width: 100%;
      padding: 14px;
      margin: 12px 0;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      font-size: 17px;
    }
    button {
      width: 100%;
      padding: 14px;
      border: 0;
      border-radius: 10px;
      background: #2563eb;
      color: white;
      font-size: 17px;
      font-weight: bold;
      cursor: pointer;
    }
    .error {
      color: #b91c1c;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <main class="card">
    <h1>Mr. Pinilla's Math Lab</h1>
    <p>Enter the classroom access code to continue.</p>
    ${errorMessage}
    <form method="POST">
      <input
        type="password"
        name="password"
        placeholder="Access code"
        autocomplete="current-password"
        required
        autofocus
      >
      <button type="submit">Enter Math Lab</button>
    </form>
  </main>
</body>
</html>`;

  return new Response(html, {
    status: 401,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

export default async function handler(
  request: Request,
  context: any
) {
  const password = Netlify.env.get("PROTECTED_PAGE_PASSWORD");

  if (!password) {
    return new Response(
      "This site is not yet configured. The site owner needs to set the PROTECTED_PAGE_PASSWORD environment variable.",
      {
        status: 503,
        headers: {
          "content-type": "text/plain; charset=utf-8",
          "cache-control": "no-store",
        },
      }
    );
  }

  const expectedToken = await sha256(password);
  const url = new URL(request.url);

  if (url.searchParams.get("logout") === "1") {
    url.searchParams.delete("logout");

    return new Response(null, {
      status: 303,
      headers: {
        location: url.toString(),
        "set-cookie":
          `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`,
        "cache-control": "no-store",
      },
    });
  }

  const sessionToken = getCookie(request, COOKIE_NAME);

  if (sessionToken === expectedToken) {
    return context.next();
  }

  if (request.method === "POST") {
    try {
      const formData = await request.formData();
      const submittedPassword = String(formData.get("password") || "");
      const submittedToken = await sha256(submittedPassword);

      if (submittedToken === expectedToken) {
        return new Response(null, {
          status: 303,
          headers: {
            location: url.toString(),
            "set-cookie":
              `${COOKIE_NAME}=${expectedToken}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_SECONDS}`,
            "cache-control": "no-store",
          },
        });
      }

      return loginPage(true);
    } catch {
      return loginPage(true);
    }
  }

  return loginPage(false);
}

export const config = {
  path: "/*",
};
