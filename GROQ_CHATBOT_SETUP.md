# NootBot Groq AI Setup

NootBot calls Groq from the server through `src/app/api/chat/route.ts`. The API
key is never sent to the browser.

## 1. Create a Groq API key

1. Create or sign into a GroqCloud account at https://console.groq.com.
2. Open https://console.groq.com/keys.
3. Create an API key and copy it.

Groq provides free-tier access with model-specific rate limits. Current limits
are listed at https://console.groq.com/docs/rate-limits.

## 2. Configure local development

Create `.env.local` in the project root:

```env
GROQ_API_KEY=gsk_your_real_key
GROQ_MODEL=llama-3.1-8b-instant
```

Restart the development server after changing environment variables.

Never prefix the key with `NEXT_PUBLIC_`; doing so would expose it in browser
code. `.env.local` is ignored by Git.

## 3. Configure Vercel

1. Open the Vercel project.
2. Go to Settings, then Environment Variables.
3. Add `GROQ_API_KEY`.
4. Optionally add `GROQ_MODEL`.
5. Redeploy the project.

## Fallback behavior

If the key is missing, Groq is unavailable, or a rate limit is reached, NootBot
falls back to its built-in site-guide answers. Navigation help therefore keeps
working without AI.

Official documentation:

- https://console.groq.com/docs/quickstart
- https://console.groq.com/docs/api-reference
- https://console.groq.com/docs/rate-limits
- https://console.groq.com/docs/models
