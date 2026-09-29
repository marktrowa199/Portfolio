import nodemailer from "nodemailer";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const MAX_BODY_BYTES = 12_000;
const RATE_LIMITS = new Map<string, { count: number; startedAt: number }>();

/**
 * Defaults to Gmail SMTP. `CONTACT_SMTP_HOST` / `CONTACT_SMTP_PORT` allow pointing at any
 * other provider (or a local sink during testing) without touching the code. Credentials are
 * always read from server-only environment variables and never reach the client bundle.
 */
function createTransporter(user: string, pass: string) {
  const host = process.env.CONTACT_SMTP_HOST?.trim();
  const port = Number(process.env.CONTACT_SMTP_PORT ?? "") || undefined;

  return nodemailer.createTransport({
    ...(host
      ? { host, ...(port ? { port, secure: port === 465 } : {}) }
      : { service: "gmail" as const }),
    auth: { user, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
}

function jsonResponse(body: Record<string, string | boolean>, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim();
  return ip || request.headers.get("x-real-ip") || "unknown";
}

function checkRateLimit(key: string) {
  const now = Date.now();

  for (const [address, limit] of RATE_LIMITS) {
    if (now - limit.startedAt >= RATE_LIMIT_WINDOW_MS) RATE_LIMITS.delete(address);
  }

  const existing = RATE_LIMITS.get(key);
  if (!existing || now - existing.startedAt >= RATE_LIMIT_WINDOW_MS) {
    RATE_LIMITS.set(key, { count: 1, startedAt: now });
    return { allowed: true, retryAfter: 0 };
  }

  if (existing.count >= RATE_LIMIT_MAX) {
    return {
      allowed: false,
      retryAfter: Math.ceil((RATE_LIMIT_WINDOW_MS - (now - existing.startedAt)) / 1000),
    };
  }

  existing.count += 1;
  return { allowed: true, retryAfter: 0 };
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const requestHost = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (origin && requestHost) {
    try {
      if (new URL(origin).host.toLowerCase() !== requestHost.toLowerCase()) {
        return jsonResponse({ error: "Request origin is not allowed." }, 403);
      }
    } catch {
      return jsonResponse({ error: "Request origin is not allowed." }, 403);
    }
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return jsonResponse({ error: "Expected a JSON request." }, 415);
  }

  const declaredSize = Number(request.headers.get("content-length") ?? 0);
  if (declaredSize > MAX_BODY_BYTES) return jsonResponse({ error: "Message is too large." }, 413);

  let body: unknown;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return jsonResponse({ error: "Message is too large." }, 413);
    }
    body = JSON.parse(rawBody);
  } catch {
    return jsonResponse({ error: "Invalid request body." }, 400);
  }

  if (!body || typeof body !== "object") return jsonResponse({ error: "Invalid request body." }, 400);

  const values = body as Record<string, unknown>;
  if (typeof values.website === "string" && values.website.trim()) {
    return jsonResponse({ success: true });
  }

  const name = typeof values.name === "string" ? values.name.trim() : "";
  const email = typeof values.email === "string" ? values.email.trim() : "";
  const subject = typeof values.subject === "string" ? values.subject.trim().replace(/[\r\n\u0000-\u001f\u007f]+/g, " ") : "";
  const message = typeof values.message === "string" ? values.message.trim() : "";
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (
    name.length < 2 || name.length > 120 ||
    email.length > 254 || !emailPattern.test(email) ||
    subject.length < 2 || subject.length > 160 ||
    message.length < 10 || message.length > 5000
  ) {
    return jsonResponse({ error: "Please check the required fields and try again." }, 400);
  }

  const gmailUser = process.env.CONTACT_GMAIL_USER?.trim();
  const gmailAppPassword = process.env.CONTACT_GMAIL_APP_PASSWORD?.replace(/\s/g, "");
  if (!gmailUser || !gmailAppPassword) {
    return jsonResponse({ error: "Email delivery is not configured." }, 503);
  }

  const rate = checkRateLimit(getClientKey(request));
  if (!rate.allowed) {
    return new Response(JSON.stringify({ error: "Too many messages. Please wait before trying again." }), {
      status: 429,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "application/json",
        "Retry-After": String(rate.retryAfter),
      },
    });
  }

  try {
    const transporter = createTransporter(gmailUser, gmailAppPassword);

    await transporter.sendMail({
      from: { name: "Portfolio Contact Form", address: gmailUser },
      to: gmailUser,
      replyTo: { name, address: email },
      subject: `Portfolio message: ${subject}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject / Position: ${subject}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    return jsonResponse({ success: true });
  } catch (error) {
    console.error("Contact form email delivery failed:", error instanceof Error ? error.message : "Unknown SMTP error");
    return jsonResponse({ error: "Message delivery failed." }, 502);
  }
}
