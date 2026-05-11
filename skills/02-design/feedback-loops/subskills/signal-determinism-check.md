---
name: signal-determinism-check
description: Audit telemetry, logging, and observability configuration for buffering, sampling, batching, and async-without-backpressure patterns that make signals non-deterministic under load - exactly when you need them most. Use this skill whenever the user proposes a new logging pipeline, evaluates an observability vendor, ships an OTel collector config, or asks "why didn't we catch this?" Especially load this when a modernization promises higher throughput, since throughput improvements often ride on buffering or sampling that erodes determinism.
---

# Signal Determinism Check

CRS-7 broke up in an 800-to-900-millisecond window. Of 115 telemetry indications recorded during the anomaly, 9 were never explained (CRS-7 IRT p.6). The IRT named the cause directly in Technical Finding #4: "SpaceX's new implementation (for Falcon 9 'Full Thrust' flights) of non-deterministic network packets in their flight telemetry increases latency, directly resulting in substantial portions of the anomaly data being lost due to network buffering in the Stage 2 flight computer" (CRS-7 IRT p.8).

The fix was Technical Recommendation #3, also blunt: "SpaceX needs to re-think new telemetry architecture and greatly improve their telemetry implementation documentation" (CRS-7 IRT p.8).

This is the cardinal sin of feedback design. The architecture sounded modern - non-deterministic packets, decoupled, async. Under nominal load it worked. Under the load of an actual anomaly, the buffering ate the data. The signal was lost at exactly the moment it was needed.

## What this is

A check for any pattern in your observability or telemetry config that makes a signal non-deterministic - that is, where the same physical event can produce different recorded data depending on load, timing, or queue state. Buffers, batches, samples, async dispatch without backpressure, lossy transports, and aggregation windows all qualify. Each one is often correct in production. The point of the check is to make every one a conscious choice, not an inheritance.

A non-deterministic signal under nominal load looks fine. The bug is that "nominal load" is exactly the load you do not need debugging help with. The load you need help with is the spike, the anomaly, the failure cascade - and that is when buffers fill, queues drop, samplers lie.

## When to use this

- A new telemetry, logging, or observability config is being landed. Run the check before merge.
- Throughput is being optimized. Suspect that the gain is being financed by determinism.
- An incident review names "we couldn't see what was happening" as a root cause. The signal architecture is on trial, not just the code.
- Vendor migration. The new vendor's defaults are not your old vendor's defaults; assume non-deterministic until proven otherwise.

## When NOT to use this

- Signals that are advisory and lossy by design (random sampling for trend dashboards, where statistical accuracy is the contract). Confirm the contract is explicit, then move on.
- Pure cost optimization on signals you have already decided do not matter. Drop them entirely instead of half-collecting them.
- Hot-path performance tuning where the trade is well understood and documented in the signed-contracts skill.

## How to apply

1. **Enumerate every signal path.** Where do telemetry/log records originate, what transport carries them, what process aggregates them, what stores them? If you cannot draw the path, the patterns hiding in it cannot be audited.

2. **Run the determinism check.** For each hop, ask: under sustained load 10x normal, will the same input produce the same recorded output? If "no" or "I don't know," flag it.

3. **Look for the named patterns.** Buffering (`buffer`, `batch_size`, `flush_interval`, `linger_ms`); lossy semantics (`drop`, `best_effort`, `fire_and_forget`, `sample_rate`); async without backpressure; UDP or other unreliable transports; compression that can delay flush; aggregation that hides per-event detail (`rate_limit`, `throttle`, `coalesce`). Each of these has a legitimate use and a determinism cost.

4. **Decide explicitly per pattern.** For each flagged pattern: keep it (with a comment naming why), replace it with a deterministic alternative, or add a circuit-break that converts overflow into a counted, surfaced metric ("dropped 4,317 events in window") instead of a silent loss.

5. **Test under load that exceeds nominal.** A determinism check that passes at nominal proves nothing. The failure mode lives at peak. Drive the system to 5–10x nominal and verify the recorded output matches the input record-for-record (or that loss is counted and surfaced).

6. **Document the architecture.** TR-3 named the second half of the fix: "greatly improve their telemetry implementation documentation" (CRS-7 IRT p.8). An undocumented architecture is one nobody can audit, which means the next non-deterministic optimization will land unchallenged.

## Worked example

A team is rolling out an OTel collector config. They run the CLI:

```bash
node tools/clis/signal-determinism.js otel-collector.yaml fluent-bit.conf
```

The tool flags four issues:

- `batch/0: send_batch_size: 8192, timeout: 5s` - buffering. Up to 5 seconds of latency under low load; under high load, batch fills and flushes faster, but the signal sequence ordering across batches is no longer guaranteed.
- `processor: filter/sampler: sampling_percentage: 10` - lossy by design. Acceptable for traces, but flagged because it is being applied to logs, where any individual record may be the one that explains the incident.
- `exporters: otlp: sending_queue: enabled: true, num_consumers: 4` - async without explicit backpressure. Under sustained overload the queue fills and drops silently.
- `protocol: udp` on a metrics endpoint - unreliable transport. Acceptable if metrics are advisory, deadly if any one metric is load-bearing for an alert.

The team's response is not "remove all four." It is: keep the trace sampler (advisory), remove sampling on logs (load-bearing), add a `sending_queue.queue_size` and surface the drop counter as a first-class alert metric, and switch the metrics path to gRPC where any individual data point can drive a page. Each change is justified in a comment in the config alongside the pattern.

This is the pattern TR-3 demands: every non-deterministic element a deliberate choice, documented, with the loss surfaced rather than silent.

## Anti-pattern

"We log everything; we'll grep later." This is the CRS-7 architecture in two sentences. Under nominal load, "logging everything" works because the buffers never fill. Under the load that produces the incident, the buffers fill, the flush gets behind, the queue drops, and the records you most need are the ones that vanish. The team discovers the architecture only post-mortem, by which time the data they would have used to debug the incident is gone. The non-deterministic signal looks fine until the moment it doesn't, and the moment it doesn't is the only moment that matters.

A second flavor: a vendor sales engineer brags about a new collector that handles "10x throughput at half the cost." Throughput is up because the new collector batches more aggressively. Half the cost because it samples on the way out. Both gains are paid for in determinism, and the bill arrives during the next incident.

## Related skills

- Parent: [feedback-loops](../SKILL.md)
- Pairs with: [loop-latency-measurement](loop-latency-measurement.md) - flake rate and signal non-determinism are the same defect from two angles
- Pairs with: recovery-as-instrumentation (route via your parent spine to iterate-fast) - recovered hardware/state is the deterministic signal of last resort
- Compose with: versioned-specs (route via your parent spine to infrastructure) - telemetry implementation must be documented per TR-3

## Source

- Primary: CRS-7 IRT TF-4, p.8 (non-deterministic network packets, network buffering in Stage 2 flight computer); CRS-7 IRT TR-3, p.8 ("re-think new telemetry architecture and greatly improve their telemetry implementation documentation"); CRS-7 IRT p.6 (115 indications, 9 unexplained)
- Tool: `tools/clis/signal-determinism.js`
