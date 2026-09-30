---
title: "Java Memory: Heap, Stack and Garbage Collection"
description: "Where Java stores your data, how the garbage collector reclaims it, and how leaks still happen."
category: "Engineering"
slug: "java-memory"
date: "2026-09-18"
---

## Stack and heap

Each thread has its own **stack** holding method frames, local primitives and references. All objects live on the shared **heap**. When a method returns, its frame is discarded, but the objects it created stay on the heap until they become unreachable.

## Garbage collection

The JVM's garbage collector frees objects that can no longer be reached from GC roots (thread stacks, static fields and so on). Most objects die young, so collectors optimize for short-lived allocations. G1 has been the default collector since Java 9.

## How leaks still happen

Java leaks are objects that are still *reachable* but no longer needed:

```java
class Cache {
    // Grows forever: nothing ever removes entries.
    private static final Map<String, byte[]> ENTRIES = new HashMap<>();

    static void put(String key, byte[] value) {
        ENTRIES.put(key, value);
    }
}
```

- Static collections that only grow.
- Listeners or callbacks that are never unregistered.
- `ThreadLocal` values in pooled threads that are never cleared.

Bound your caches (size or time based) and profile with a heap dump before guessing.
