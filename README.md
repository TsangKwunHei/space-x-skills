# SpaceX-Inspired Agent Code Guidelines

System-engineering skills for coding agents, derived from public SpaceX and NASA engineering documents.

## The Problems

From Andrej Karpathy's post:

> "The models make wrong assumptions on your behalf and just run along with them without checking."

> "They really like to overcomplicate code and APIs, bloat abstractions..."

> "They still sometimes change/remove comments and code they don't sufficiently understand..."

Those problems get worse as tasks get longer.

## The Solution

Seven system-engineering skill areas that make long-horizon agent work explicit:

| Principle | Addresses |
|---|---|
| First-Principles Thinking | Fake constraints, copied assumptions, vague goals |
| System Engineering | Hidden dependencies, blast radius, single points of failure |
| Architecture | Feature-first design, decorative redundancy, poor inspectability |
| Feedback Loops | Slow learning, weak signals, repeated mistakes |
| Testing Sequencing | Wrong test order, false passes, missing retest triggers |
| Infrastructure | Unclear contracts, nonstandard handoffs, unversioned specs |
| Iterate Fast | Expensive failures, no recovery path, open anomalies |

## The Seven Principles in Detail

### 1. First-Principles Thinking

Do not copy surface patterns. Re-derive the problem from constraints, assumptions, cost floors, and capability gates.

This helps the agent ask: what must be true for this to work, what is physically or structurally impossible, and what is the cheapest way to test the next assumption?

### 2. System Engineering

Stop seeing components and start seeing the graph: nodes, interfaces, flows, blast radius, and apex dependencies.

This helps the agent trace cascading failures before approving local changes that look harmless in isolation.

### 3. Architecture

Design around failure modes, not feature categories.

This helps the agent decide where redundancy matters, which interfaces should be deleted, what must be inspectable, and which subsystem can be folded into another.

### 4. Feedback Loops

Shorten the distance between decision, evidence, and correction.

This helps the agent measure loop latency, separate deterministic signal from noise, and make sure learning reaches the next design decision.

### 5. Testing Sequencing

Testing is a sequence, not a checkbox.

This helps the agent build fidelity ladders, rank objectives before execution, define numeric retest triggers, and write "not because of X" clauses so tests cannot pass for the wrong reason.

### 6. Infrastructure

Make handoffs explicit.

This helps the agent create signed contracts, standard menus, machine-consumable artifacts, versioned specs, and clear ownership across boundaries.

### 7. Iterate Fast

Fail cheaply, recover evidence, and close the loop.

This helps the agent design cheap abort paths, capture recovery signal, and close every anomaly with root cause, design change, test change, and documentation change.

## Install

Install the skills into a project-level `.agents/skills/` directory:

```bash
./scripts/install.sh
```

Install into another project:

```bash
./scripts/install.sh /path/to/project
```

Then restart your agent so it can discover the new skills.

## Using the Skills

Use these skills when the task is larger than a local code edit:

- multi-step implementation
- architecture decisions
- integration across systems or teams
- production rollout
- incident response
- test planning
- migration or deprecation
- any change with meaningful blast radius

For small edits, use judgment. A typo fix does not need a launch campaign.

## Key Insight

Agents do not usually fail because they cannot write the next line of code.

They fail because production work is a chain:

```text
goal -> architecture -> interface -> test -> readiness -> execution -> feedback
```

Each step changes what the next step depends on. These skills make that chain explicit.

## How to Know It's Working

These guidelines are working if your agent starts to:

- ask for success criteria before building
- name assumptions before acting
- identify blast radius before changing architecture
- define interfaces before integration
- sequence tests from cheap to expensive
- set rollback or abort conditions before execution
- close incidents with changes to design, tests, and docs
- leave cleaner, smaller diffs with fewer unrelated edits

## Customization

These guidelines are designed to be combined with project-specific instructions.

Add rules like:

```md
## Project-Specific Guidelines

- All public APIs require an interface definition.
- Production migrations require a retest trigger matrix.
- Incidents must close the anomaly loop before being marked resolved.
- Shared infrastructure changes must include blast-radius analysis.
```

## Tradeoff Note

These guidelines bias toward rigor over speed. For trivial edits, typo fixes, or obvious one-line changes, use judgment.

The goal is reducing expensive long-horizon failures, not slowing down simple work.

## Sources and Disclaimer

Derived from public SpaceX and NASA engineering documents, including public launch-system guides, flight-test papers, and mishap investigation reports.

This project is not affiliated with, endorsed by, or sponsored by SpaceX, NASA, Andrej Karpathy, or any related organization or person.

## License

MIT
