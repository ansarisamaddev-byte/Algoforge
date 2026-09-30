---
title: "Designing a URL Shortener"
description: "Requirements, Base62 short codes, storage and caching for a read-heavy service."
category: "System Design"
slug: "url-shortener"
date: "2026-09-25"
---

## Requirements

Functional: create a short link for a long URL, and redirect short links to the original. Non-functional: low-latency redirects, high availability, and a read-heavy workload where reads vastly outnumber writes.

## Generating short codes

Assign each URL a unique integer ID, then encode it in Base62 (`0-9a-zA-Z`). Seven characters give 62⁷ ≈ 3.5 trillion possible codes.

```python
ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

def encode(n: int) -> str:
    if n == 0:
        return ALPHABET[0]
    out = []
    while n:
        n, r = divmod(n, 62)
        out.append(ALPHABET[r])
    return "".join(reversed(out))
```

Sequential IDs are guessable. If that matters, shuffle the alphabet or use randomly generated codes with a uniqueness check.

## Storage and caching

The access pattern is a simple key lookup (`code → long URL`), which suits a key-value store or a sharded relational table. Put a cache such as Redis in front for hot links; most traffic concentrates on a small set of URLs.

## Scaling notes

- Generate IDs with a distributed ID service or pre-allocated ranges per app server.
- Use a `301` for permanent redirects or `302` when you need to count every click.
- Shard by short code to spread both reads and writes.
