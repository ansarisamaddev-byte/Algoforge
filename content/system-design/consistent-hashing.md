---
title: "Consistent Hashing Explained"
description: "How distributed caches and databases minimize key remapping when nodes are added or removed."
category: "System Design"
slug: "consistent-hashing"
date: "2026-09-30"
readTime: "5 min read"
featured: true
---

# Consistent Hashing

## Why normal hashing breaks

Distributing keys with `hash(key) % N` works until `N` changes. Add or remove one server and almost every key maps to a different server, so a cache suddenly misses on nearly everything.

## The hash ring

Consistent hashing places both servers and keys on the same circular hash space. A key belongs to the first server found moving clockwise from the key's position. When a server joins or leaves, only the keys between it and its neighbour move — roughly `1/N` of the total.

## Virtual nodes

With few servers, a single position each gives uneven load. Each physical server is therefore placed on the ring many times (virtual nodes), which smooths the distribution and lets you weight bigger machines.

## Example

```python
import bisect
import hashlib

def h(key):
    return int(hashlib.md5(key.encode()).hexdigest(), 16)

class Ring:
    def __init__(self, nodes, vnodes=100):
        self.ring = sorted((h(f"{n}#{i}"), n) for n in nodes for i in range(vnodes))
        self.keys = [k for k, _ in self.ring]

    def get(self, key):
        i = bisect.bisect(self.keys, h(key)) % len(self.keys)
        return self.ring[i][1]
```

## Trade-offs

- Far fewer keys move on topology changes.
- Lookup is O(log N) with a sorted structure.
- Replication typically stores each key on the next several distinct nodes on the ring.
