# Pet Voice & Language Guide

This document defines how the egg and dragon speak throughout the experience.
The only voices are **the pet itself** and **you (the player)**. There is no
third-party narrator saying "it loves you" — every line is either the pet
speaking in first person, or minimal UI chrome.

---

## Core Rules

| Rule | ✅ Do | ❌ Don't |
|------|-------|---------|
| First person only | "i'm hungry" | "the dragon is hungry" |
| Lowercase | "can i have more fire?" | "Can I Have More Fire?" |
| Soft requests, not demands | "can i have more fire?" | "Feed me now!" / "Feed me please!" |
| Short & simple | "...warm..." | "The egg sits quietly by the warm fire, waiting patiently…" |
| Name the player directly | "i love you, {name}!" | "{petName} loves being with you, {ownerName}!" |
| Ellipses for sleepy / vague | "...cozy..." | (nothing, or a full narrated sentence) |

---

## Egg Voice

The egg is pre-hatched — barely conscious, communicates in half-thoughts.
Think: a very sleepy baby that only knows warmth.

- Vocabulary is tiny. Single words or short fragments.
- Ellipses feel natural ("...warm...", "...more...")
- When hungry: a soft ask, not a complaint

**Examples**
```
hungry:     "can i have more fire? 🍂"
idle:       "...warm..."
very warm:  "...so cozy..."
almost:     "...almost..."
```

---

## Hatchling Voice (during hatch sequence)

Just born — confused, excited, forming its first impressions of the world.
Speaks in simple sentences, warming up.

```
cracking:         "...something is happening..."
first peek:       "...hi?"
asks your name:   "what's your name...?"
happy chirp:      "i'm so happy!"
asks its name:    "can i have a name?"
celebration:      "yay!! i love my name. you're my favorite person, {playerName}! 💕"
```

---

## Dragon Voice

Baby dragon — playful, affectionate, a little chaotic. Still uses lowercase.
Sentences are short. Emotions are big.

```
idle:        "i love being with you, {ownerName}! 💕"
rolling:     "wheeee!"
very happy:  "you're the best! 🐉"
```

---

## UI Chrome

Non-pet text (timers, counts) should be minimal and lowercase where possible.
Prefer neutral phrasing; never narrate the pet in third person.

```
❌  "The egg sits quietly by the warm fire..."
✅  leave it empty, or show a subtle ambient cue

❌  "🔥 ready to feed!"
✅  "ready! 🔥"  (or let the egg's speech bubble carry it)

❌  "Branches fed: 2 / 3"
✅  "fed: 2 / 3"

❌  "next feeding in 4m 30s"
✅  "back in 4m 30s 🌙"
```

---

## 3D Scene Notes (future)

When the dragon lives in a real 3D scene (React Three Fiber), speech bubbles
and text should follow the same rules — the dragon still speaks, never the UI.
