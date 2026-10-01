export const runtime = "nodejs";

/**
 * Contact form delivery via Web3Forms.
 *
 * The access key is read here, on the server, and is never sent to the browser. Note that
 * `VITE_` is a Vite prefix and is meaningless in Next.js — it is accepted here purely so the
 * variable name in your existing `.env` works unchanged. Unprefixed `WEB3FORMS_ACCESS_KEY` is
 * also accepted as a fallback.
 *
 * Web3Forms access keys are designed to be client-visible, but proxying through this route
 * keeps the key out of the shipped bundle regardless. The trade-off is that the form needs a
 * running server, so it will not work on a purely static host.
 */
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_TIMEOUT_MS = 15_000;
const EMAIL_SUBJECT_PREFIX = "Portfolio Contact";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const MAX_BODY_BYTES = 12_000;
const RATE_LIMITS = new Map<string, { count: number; startedAt: number }>();

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
  // Honeypot: report success so a bot gets no signal, but send nothing.
  if (typeof values.website === "string" && values.website.trim()) {
    return jsonResponse({ success: true });
  }

  const name = typeof values.name === "string" ? values.name.trim() : "";
  const email = typeof values.email === "string" ? values.email.trim() : "";
  // Strip control characters and line breaks so the subject cannot be used for header injection.
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

  const accessKey = (
    process.env.VITE_WEB3FORMS_ACCESS_KEY ??
    process.env.WEB3FORMS_ACCESS_KEY ??
    ""
  ).trim();

  if (!accessKey) {
    // Visitors only ever see a generic message, so this log is the only way to tell a missing
    // configuration apart from a genuine Web3Forms outage. Name the exact missing variable.
    console.error(
      "Contact form is not configured: missing VITE_WEB3FORMS_ACCESS_KEY. " +
        "Copy .env.example to .env.local, paste your Web3Forms access key, then restart the server. " +
        "If deploying to Vercel, add the same variable to Project Settings > Environment Variables."
    );
    return jsonResponse({ error: "Message delivery is not configured." }, 503);
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

  const outgoingSubject = `${EMAIL_SUBJECT_PREFIX} — ${subject}`;

  const formData = new FormData();
  formData.append("access_key", accessKey);
  formData.append("name", name);
  formData.append("email", email);
  formData.append("subject", outgoingSubject);
  formData.append("message", message);
  // Labels the sending party so the delivered email shows who wrote it. Swap this for a fixed
  // string such as "Niel Arthur Rocacurva - Portfolio" if you would rather brand the sender.
  formData.append("from_name", name);
  // Makes Reply-To go to the visitor rather than to Web3Forms' no-reply address.
  formData.append("replyto", email);

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      body: formData,
      signal: AbortSignal.timeout(WEB3FORMS_TIMEOUT_MS),
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    const result = (await response.json().catch(() => null)) as
      | { success?: boolean; message?: string }
      | null;

    // Verified against the live API: an invalid access key comes back as HTTP 403 with an
    // empty body, while other rejections are reported as HTTP 200 with success:false. So the
    // status code alone is not a reliable signal — treat a non-JSON or non-success body as a
    // failure regardless of which one arrived.
    if (!result || result.success !== true) {
      console.error(
        `Web3Forms rejected the submission (HTTP ${response.status}): ${
          result?.message ?? "no message returned"
        }`
      );
      return jsonResponse({ error: "Message delivery failed." }, 502);
    }

    return jsonResponse({ success: true });
  } catch (error) {
    const reason =
      error instanceof Error
        ? error.name === "TimeoutError"
          ? `timed out after ${WEB3FORMS_TIMEOUT_MS}ms`
          : error.message
        : "unknown error";
    console.error("Contact form delivery to Web3Forms failed:", reason);
    return jsonResponse({ error: "Message delivery failed." }, 502);
  }
}
