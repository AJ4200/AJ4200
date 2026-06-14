# Contact Form Gmail Draft Setup

The contact form does not use an API key or email service.

When a visitor submits it:

1. Every form field is compiled into an email subject and body.
2. A Gmail compose window opens with the email addressed to
   `abeljackson33@gmail.com`.
3. If Gmail cannot open, the browser falls back to a standard `mailto:` link.
4. The visitor reviews the draft and presses Send.

The site does not store or transmit the form data itself.

## Change the destination Gmail

Edit `CONTACT_EMAIL` near the top of:

`src/components/Contact/MainContact.tsx`

```ts
const CONTACT_EMAIL = "abeljackson33@gmail.com";
```

## Important limitation

Browsers cannot silently send email through `mailto:` or Gmail compose links.
The visitor must be signed into Gmail or have an email application configured,
and must press Send. Automatic delivery requires a server-side email provider.
