---
title: "Two Sum — From Brute Force to Optimal"
description: "Deconstruct the classic array search problem from O(N²) down to O(N) using a hash map."
category: "DSA"
slug: "two-sum"
date: "2026-09-28"
---

# Two Sum

Given an array of integers `nums` and an integer `target`, return the indices of the two numbers that add up to `target`. Assume exactly one solution exists.

## The brute-force approach

Check every pair. It is simple, uses no extra memory, but takes **O(N²)** time.

```python
def two_sum_brute(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
```

## Trade memory for time

For each number `n`, we only need to know whether `target - n` has already appeared. A hash map answers that in O(1).

```python
def two_sum(nums, target):
    seen = {}  # value -> index
    for i, n in enumerate(nums):
        if target - n in seen:
            return [seen[target - n], i]
        seen[n] = i
```

## Complexity

| Approach    | Time  | Space |
| ----------- | ----- | ----- |
| Brute force | O(N²) | O(1)  |
| Hash map    | O(N)  | O(N)  |

> Checking the map *before* inserting the current number prevents an element from pairing with itself.
