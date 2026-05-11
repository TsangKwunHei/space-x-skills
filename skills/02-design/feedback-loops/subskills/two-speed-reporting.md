---
name: two-speed-reporting
description: Run two reporting cadences with hard deadlines - a fast unblock report that returns the immediate signal customers need to keep moving, and a slow learning report that does the full root-cause and environments work. Use this skill whenever the user is designing post-incident, post-deploy, or post-experiment reporting; especially when one cadence is starving either the unblock signal or the teach signal. Conflating the two collapses both.
---

# Two-Speed Reporting

Falcon's customer reporting runs at two deliberate, named speeds. Falcon User's Guide §10.6.4 (p.83) is direct: "SpaceX will provide a quick-look orbit injection report to the customer shortly after spacecraft separation, including a best-estimate spacecraft separation state vector. A final, detailed post-flight report is provided within eight weeks of launch."

Table 9-1 in §9.4 (p.72) names both reports as line items with hard deadlines:

- **Separation + TBD minutes - Orbit injection report** - "Delivers best-estimate state vector, attitude, and attitude rate based on initial data."
- **Launch + 8 weeks - Flight report** - "Reports the flight, environments, separation state, and a description of any mission-impacting anomalies and progress on their resolution."

Two loops, two deadlines, both shipped. The fast one unblocks the customer's next operation (the satellite operator needs the state vector to start station-keeping; they cannot wait eight weeks). The slow one teaches the next design (the flight environments and anomaly analysis need time to compute properly). Conflating them - waiting 8 weeks for the unblock signal, or rushing root-cause to fit a same-day deadline - collapses both into a useless middle.

## What this is

A pattern for running two parallel reporting cadences after any execution where there are two distinct audiences with two distinct latency requirements:

- The **unblock report**: fast, narrow, best-estimate. Delivered on a tight clock measured in minutes or hours. Tells the immediate downstream consumer what just happened so they can act.
- The **learning report**: slow, broad, properly computed. Delivered on a longer clock measured in days or weeks. Tells the design team, the safety team, and future projects what the execution actually revealed.

Both ship. Both have hard deadlines. Neither pretends to be the other.

## When to use this

- A deploy, launch, release, or experiment has both an immediate downstream consumer (customer, on-call team, follow-up sprint) and a learning audience (design team, post-mortem authors, future-design owners).
- Today there is only one report, and it is either too slow to unblock or too rushed to teach.
- A draft "we'll write the post-mortem when we have time" plan exists. That document does not get written. Either commit a deadline or remove the report from the plan.
- Customer SLA requires a fast acknowledgment but the team cannot do root cause in that window.

## When NOT to use this

- Single-audience executions where one report serves both unblock and learning. Do not split for the sake of splitting.
- Internal dashboards and observability streams that are continuous, not point-in-time. Two-speed reporting is for discrete execution events.
- Cases where the fast signal is genuinely the same data as the slow signal (rare). Verify by asking whether the slow report could be drafted in the unblock window; if no, you have two reports.

## How to apply

1. **Name both audiences and both decisions.** Who needs to act on the unblock signal, and what decision do they make with it? Who needs to learn from the slow report, and what design or process change does it inform? "Customer needs state vector to start station-keeping" and "design team needs flight environments to update Mach 1.1 model" are both legitimate, both irreducibly different.

2. **Set two hard deadlines.** Falcon's are "Separation + TBD minutes" and "L + 8 weeks." Yours are likely "incident + 4 hours" for the unblock and "incident + 14 days" for the learning report, or something in that shape. The numbers matter less than the commitment that both ship.

3. **Define the unblock report as best-estimate, not final.** "Delivers best-estimate state vector, attitude, and attitude rate based on initial data" (Falcon User's Guide §9.4 Table 9-1, p.72). The unblock report says "here is what we know now, with the uncertainty that implies." It does not pretend to be root-cause.

4. **Define the learning report as comprehensive, with anomalies and resolutions.** "Reports the flight, environments, separation state, and a description of any mission-impacting anomalies and progress on their resolution" (Falcon User's Guide §9.4 Table 9-1, p.72). The slow report owes the depth that the fast report cannot afford.

5. **Do not let the fast report swallow the slow one.** A fast report that grows to include "preliminary findings" of root cause is the trap. Customers learn to wait for "preliminary," and the slow learning report becomes optional. Keep the unblock report narrow on purpose.

6. **Do not let the slow report swallow the fast one.** A team that says "we'll have the full report in two weeks, please be patient" has starved the unblock audience. The customer is blocked, makes their own assumption, and acts on it. Better a best-estimate at separation + 30 minutes than a perfect report at L+8 weeks with a customer who has already moved on.

## Worked example

A SaaS team has an outage. Today, they have one report cadence: a Jira ticket that the on-call writes "when things settle down." Sometimes the ticket exists in 6 hours. Sometimes it exists in 6 days. Customers complain they do not know what happened. The design team complains the post-mortem is too thin to drive a real fix.

They split into two reports:

- **Status snapshot (incident close + 4 hours)**: short, customer-facing. "What happened, who was affected, when it ended, what we did, what we know is true now, what we are still investigating." Hard deadline. Goes to status page and account team. Customer can decide whether to extend SLA, file a credit, or escalate. The unblock decision is real.
- **Post-mortem (incident close + 14 days)**: long, design-facing. "Timeline, contributing factors, root cause, design changes, test changes, doc changes, owner per change, due dates." Reviewed in engineering all-hands. Drives next sprint priorities and the four-box-closure check.

After one quarter, customer NPS on incident communication rises sharply, and the design team has a post-mortem stack with real action items rather than a backlog of half-written tickets. Neither report does both jobs; both ship.

This is Falcon's separation-plus-minutes / launch-plus-eight-weeks split applied to a software incident loop.

## Anti-pattern

A team writes one post-mortem document, due "when complete." In practice, this means: when the immediate firefight is over, the on-call writes a paragraph, leaves the rest as a Jira draft, and moves on to the next ticket. Three weeks later, the doc has six bullet points and no root cause. Six months later, the same incident recurs because the design change never happened.

The same anti-pattern in the other direction: a team commits to a 2-hour public post-mortem after every incident. The 2-hour post-mortem is best-estimate by definition (you cannot do real root cause in two hours), but it is published as if it were final. Customers and exec teams treat it as the answer. Three weeks later, when the actual root cause emerges, no one reads the update because everyone has already moved on.

Falcon refuses both shapes. The orbit injection report at separation+minutes is explicitly best-estimate. The flight report at L+8 weeks is the durable artifact. The customer is unblocked on the tight clock; the design is informed on the proper one. Both ship.

## Related skills

- Parent: [feedback-loops](../SKILL.md)
- Pairs with: [model-fudge-factor](model-fudge-factor.md) - the slow report is where flight findings land in models, not the fast one
- Pairs with: signed-contracts (route via your parent spine to infrastructure) - both reports are committed deliverables, not best-effort
- Compose with: four-box-closure (route via your parent spine to iterate-fast) - the slow report is where the four boxes (root cause, design, test, doc) actually get checked

## Source

- Primary: Falcon User's Guide §10.6.4, p.83 ("quick-look orbit injection report ... shortly after spacecraft separation, including a best-estimate spacecraft separation state vector. A final, detailed post-flight report is provided within eight weeks"); Falcon User's Guide §9.4 Table 9-1, p.72 (Separation + TBD minutes - Orbit injection report; Launch + 8 weeks - Flight report); Falcon User's Guide §9.3, p.72 (standard service includes both reports as committed deliverables)
