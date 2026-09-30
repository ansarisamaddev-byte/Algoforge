---
title: "Binary Search Without the Off-by-One Bugs"
description: "A reliable template for binary search, and the mistakes that break it."
category: "DSA"
slug: "binary-search"
date: "2026-09-20"
---

## The idea

On a **sorted** array, compare the target with the middle element and discard the half that cannot contain it. Each step halves the search space, giving O(log N) time.

## A reliable template

Keep an inclusive range `[lo, hi]` and loop while it is non-empty.

```python
def binary_search(a, x):
    lo, hi = 0, len(a) - 1
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if a[mid] == x:
            return mid
        if a[mid] < x:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1
```

## Common pitfalls

- Writing `(lo + hi) / 2` can overflow in fixed-width integer languages such as Java or C++; use `lo + (hi - lo) / 2`.
- Mixing inclusive and exclusive bounds. Pick one convention and keep it consistent.
- Forgetting `mid + 1` / `mid - 1`, which causes infinite loops.

## Complexity

Time is O(log N) and space is O(1) for the iterative version.
