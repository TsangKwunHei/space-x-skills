---
name: versioned-specs
description: A spec without a version and an itemized changelog is a spec that breaks integrators silently; visible semver and section-level diffs are the price of trust. Use this skill when shipping or maintaining a public spec, an SDK, an API, a config schema, a protocol, a deliverables list, an SLA, an environments table, an ICD, or any artifact a downstream consumer integrates against. Especially load this skill when "the spec changed" surfaces as the root cause of an integration break, when consumers cannot pin against a known good version, when changes ship without a changelog, or when a "v2" was published without naming what moved.
---

# Versioned Specs

The Falcon User's Guide has eight published versions over ten years. v1 in October 2015. v2 in May 2016. v3 in January 2019. v4 in April 2020. v5 in August 2020. v6 in August 2021. v7 in September 2021. v8 in March 2025.

The v8 changelog is itemized, section by section: §3.3 Launch Windows, §3.6 Multiple Payloads & Constellation, §4 Interfaces, §5 Environments, §6 Payload Design Requirements, §7 Verification, Appendices A–I.

The front matter is explicit: "SpaceX reserves the right to update this user's guide as required. Future revisions are assumed to always be in process as SpaceX gathers additional data and works to improve its launch vehicle design."

Translation: the spec is alive, every revision is numbered, every revision tells integrators exactly which sections moved. Customers can audit the diff. Trust is preserved because surprise is eliminated.

## What this is

A versioned spec is a published artifact with a visible version identifier, a fixed canonical location for each version, and an itemized changelog at every release. It lets integrators pin against a specific version, audit changes against the prior version, and migrate on their own schedule.

The opposite - a "spec" that lives at one URL, mutates silently, has no version label, and ships changes without a changelog - is a trap. Integrators who wrote against last quarter's version do not know they are now broken. The first signal is a production incident, weeks after the silent change.

The discipline has four parts: visible version identifier, fixed canonical artifact per version (immutable), itemized changelog per release (section-level granularity), and explicit policy for breaking vs non-breaking change.

## When to use this

- A spec, SDK, API, schema, protocol, or contract is being shipped to integrators outside the team
- A spec change is about to ship and "we'll just update the doc" is the proposed plan
- An integration broke and "the spec changed" is the root cause
- Consumers cannot answer "which version of the spec are you integrated against?"
- A migration path is needed but consumers do not have version pinning to migrate from
- Two integrators report different behavior and the team cannot reproduce the divergence (likely two different effective spec versions)
- A new release is being cut and nobody has written a changelog

## When NOT to use this

- The spec is internal to a single team that controls every consumer and can deploy them in lockstep - overhead may exceed value, though pinning is still cheap insurance
- The artifact is a moving target by design (a research dataset published as a snapshot, not a contract) - name it as such; do not pretend it is versioned
- The spec is genuinely v1 and there is no v0 to diff against - do start with v1 anyway; the discipline begins now, not after the first painful migration

## How to apply

1. **Pick a visible version identifier.** Semver (v1.2.3), date (2025-03), or sequential (v8). Falcon User's Guide uses sequential (v1 through v8 over ten years). Whatever the scheme, the version must be visible on every page of the artifact, in the filename, and in any URL that serves it.

2. **Make each version immutable at a fixed location.** "Falcon User's Guide v7" must always mean the same document. A reader who downloaded v7 in September 2021 must be able to fetch the same v7 in 2026 and get the same bytes. The current version may have a stable "latest" URL too, but it points to a specific version.

3. **Ship an itemized changelog at every release.** The Falcon User's Guide v8 changelog calls out: §3.3 Launch Windows, §3.6 Multiple Payloads & Constellation, §4 Interfaces, §5 Environments, §6 Payload Design Requirements, §7 Verification, Appendices A–I. Section-level granularity. An integrator can read the changelog, know which sections affect them, and audit those diffs.

4. **Distinguish breaking from non-breaking change.** Semver makes this mechanical (major bump for breaking, minor for additive, patch for fix). For non-semver schemes (sequential, date), name the policy in the spec itself. A breaking change without a major-version signal is a betrayal of trust.

5. **Let consumers pin.** Falcon User's Guide §1.1 is explicit about scope: "This user's guide is intended for pre-contract mission planning." A customer signing a contract under v7 is contracting against v7-specific behavior; the v8 release in March 2025 does not retroactively rewrite their contract. Pinning is what makes versioning worth doing.

6. **Publish a migration path for breaking changes.** "v7 → v8 migration" should name what changed, why it changed, and how an integrator updates. The Falcon User's Guide release notes itemize sections; a software API spec should itemize fields, behaviors, deprecations, and replacements.

7. **Pair the version with the contract.** A signed ICD references the spec version it was signed against. See [signed-contracts](signed-contracts.md). When the spec rev's, existing contracts continue against their pinned version; new contracts pick up the new version. No retroactive change.

## Worked example

A team ships a public REST API. The OpenAPI spec lives at `/api/openapi.yaml` - one URL, mutated in place, no version. Integrators report intermittent breaks. The team's response: "did you read the changelog?" There is no changelog. The team's deeper response: "we pushed a fix on Tuesday." That fix changed the response shape for one endpoint. Three integrators broke silently.

Apply the skill:

- **Visible version**: Adopt semver. Current spec becomes v1.0.0. Each release bumps appropriately.
- **Immutable per version**: Publish at `/api/v1.0.0/openapi.yaml`, `/api/v1.1.0/openapi.yaml`, etc. The current `/api/latest/openapi.yaml` URL points to the current version but is a redirect, not a separate artifact.
- **Itemized changelog**: A `CHANGELOG.md` in the spec repo, with section-level entries per release. v1.1.0: "Endpoint `/users/{id}` - added optional field `last_login_at` to response (additive, non-breaking)." v2.0.0: "Endpoint `/orders/{id}` - `status` field replaced enum value `pending` with `awaiting_payment` (breaking). Migration: see v1→v2 guide." Falcon User's Guide v8 changelog (§3.3, §3.6, §4, §5, §6, §7, Appendices A–I) is the model.
- **Breaking vs non-breaking**: Semver enforces. v1.x → v2.0 means a breaking change. Customers know what to expect.
- **Pinning**: Each integrator pins their client against a specific spec version. The platform team publishes versioned client SDKs. Old versions remain served until a sunset date, announced in advance.
- **Migration**: Each major bump ships with a `vN-to-vM-migration.md` that itemizes changed endpoints, replaced fields, deprecation timelines.
- **Contract pairing**: Each customer's integration agreement (see [signed-contracts](signed-contracts.md)) references the spec version they integrated against. v2.0 does not retroactively rewrite their agreement.

The Tuesday push that broke three integrators silently becomes impossible. A breaking change is a major bump. A major bump is announced with a migration guide and a sunset window. Integrators choose when to migrate. Trust is preserved because surprise is eliminated.

## Anti-pattern

The "spec at one URL, mutated in place" trap. The spec lives at `/docs/integration.md` or `/api/openapi.yaml` or `/contracts/sla.pdf`. There is no version. There is no changelog. Each push to main updates the spec. Integrators integrate against "the spec" with no way to know which version of the spec.

When something breaks, the team's diagnostic is "did the spec change recently?" The answer requires git archaeology against the spec repo. The integrator cannot answer it themselves.

This is the inverse of the Falcon User's Guide's eight published versions over ten years, each numbered, each with a changelog, each pinnable. The Falcon discipline is what eight years of teaching customers to integrate against your spec looks like. The "one URL, mutated" pattern is what one quarter of teaching customers to file post-mortems against your spec looks like.

The cost is not theoretical. Integrators who cannot pin will either (a) refuse to integrate against you, or (b) integrate cautiously with defensive coding everywhere ("maybe the field exists, maybe it doesn't"), or (c) integrate eagerly and break in production. None of those is the customer relationship a versioned spec produces.

## Related skills

- Parent: [infrastructure](../SKILL.md)
- Pairs with: [signed-contracts](signed-contracts.md) (the contract pins the spec version), [machine-consumable-artifacts](machine-consumable-artifacts.md) (machine-readable formats diff cleanly across versions; PDFs do not)
- Compose with: [standard-menu](standard-menu.md) (the menu is itself a versioned spec), feedback-loops (route via the infrastructure spine, then to feedback-loops) (the changelog is feedback to integrators on what just moved)

## Source

- Primary: Falcon User's Guide v8 (March 2025) - eight published versions over ten years (v1 Oct 2015 → v8 Mar 2025), itemized v8 changelog covering §3.3, §3.6, §4, §5, §6, §7, Appendices A–I; front matter "SpaceX reserves the right to update this user's guide as required."
- Secondary: Falcon User's Guide §1.1 (user's guide is for pre-contract planning; contract pins the spec version), §9.2 (configuration control after ICD signature is the version-pinning equivalent for the per-mission spec).
