# Stripe and Payoneer setup for L JAI

The pricing cards are quote-based until you choose real prices and currency. Their payment buttons do not collect money yet. They call a browser hook named `window.createLJAICheckoutSession({ provider, plan })` and expect a secure checkout URL in return.

## Payment integration contract

Implement `window.createLJAICheckoutSession` in the site configuration. It should send the selected plan (`starter`, `business`, or `custom`) and provider (`stripe` or `payoneer`) to your server, then return `{ url: "https://..." }`.

The server must map plan IDs to the approved amount and currency. Do not accept a price from the browser and do not put secret keys in the website source.

- **Stripe:** create a Checkout Session on the server, return its URL, and redirect the customer to it. Confirm payment from Stripe webhooks rather than trusting the return page. [Stripe Checkout documentation](https://docs.stripe.com/payments/existing-customers?platform=web&ui=stripe-hosted)
- **Payoneer:** use the hosted Checkout/API integration offered for your merchant account, or a Payoneer payment request/link endpoint. Confirm eligibility and regional availability with Payoneer before launch; Checkout availability depends on merchant program and market. [Payoneer Checkout](https://www.payoneer.com/checkout/) · [Payoneer developer platform](https://www.payoneer.com/developers-docs/)

No payment provider keys or actual package prices have been added. The cards display “Custom quote” until you provide the approved rates.
