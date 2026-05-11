# Test plan: payment service refresh

Run not-because-of-x.js against this file to see how each objective gets hardened:

```
node tools/clis/not-because-of-x.js tools/clis/examples/test-plan.md
```

## Objectives

- API rejects requests with invalid HMAC signature
- API processes a valid charge end-to-end against the sandbox processor
- DB row is written for the charge with the correct idempotency key
- UI checkout button transitions to "processing" within 200ms of click
- p99 latency stays under 400ms at 200 RPS sustained
- Retry logic recovers from a single 503 from the processor
- Charge is not double-processed when the client retries within the idempotency window
