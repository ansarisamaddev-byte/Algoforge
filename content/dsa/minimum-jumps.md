---
title: "Minimum Jumps"
description: "Find the minimum number of jumps needed to reach the last array index."
category: "DSA"
slug: "minimum-jumps"
date: "2026-09-30"
---

# Minimum Jumps

Given an array arr[] of non-negative numbers. Each number tells you the maximum number of steps you can jump forward from that position.

For example:

- If arr[i] = 3, you can jump to index i + 1, i + 2, or i + 3 from position i.
- If arr[i] = 0, you cannot jump forward from that position.

Find the minimum number of jumps needed to move from the first position in the array to the last position.

Note: Return -1 if you can't reach the end of the array.

Input: arr[] = [1, 3, 5, 8, 9, 2, 6, 7, 6, 8, 9]

Output: 3

Minimum Jumps to Reach End requires finding the minimum number of jumps needed to reach the last index of an array, where each element represents the maximum forward step size from that index.

## Key Intuition & Strategy

Instead of trying all possible jumps (which leads to an exponential dynamic programming approach), use a Greedy Approach using three state variables:

- **max_reach:** The furthest index reachable using at most 1 additional jump from any of the indices evaluated so far.
- **steps:** How many steps are remaining in the current jump range before forced to make another jump.
- **jumps:** The total count of jumps taken so far.

At each step, update max_reach = max(max_reach, i + arr[i]). Decrement steps as you move forward. When steps == 0, increment jumps and refresh steps to max_reach - i.

## Algorithm Logic

**Base Checks:**

- If n <= 1, return 0 (already at or beyond the last index).
- If arr[0] == 0, return -1 (cannot make even the first step).

1. Initialize max_reach = arr[0], steps = arr[0], and jumps = 1.
2. Iterate i from 1 to n - 2 (up to the second-to-last index):
   - Update max_reach = max(max_reach, i + arr[i]).
   - Decrement steps by 1.
   - If steps == 0:
     - Take a jump: jumps += 1.
     - Check if index i has exceeded max_reach (i.e., i >= max_reach). If so, return -1 (stuck).
     - Reset steps = max_reach - i.
3. After the loop, verify if max_reach >= n - 1. If yes, return jumps, otherwise return -1.

### Python Implementation

```python
def min_jumps(arr: list[int]) -> int:
    n = len(arr)
    if n <= 1:
        return 0
    if arr[0] == 0:
        return -1
    max_reach = arr[0]
    steps = arr[0]
    jumps = 1
    for i in range(1, n - 1):
        max_reach = max(max_reach, i + arr[i])
        steps -= 1

        # If no steps left, must jump
        if steps == 0:
            jumps += 1
            if i >= max_reach:
                return -1
            steps = max_reach - i
    return jumps if max_reach >= n - 1 else -1


if __name__ == "__main__":
    arr = [1, 3, 5, 8, 9, 2, 6, 7, 6, 8, 9]
    print(f"Minimum Jumps: {min_jumps(arr)}")  # Output: 3
```

### Java Implementation

```java
public class Solution {
    public static int minJumps(int[] arr) {
        int n = arr.length;

        // Base cases
        if (n <= 1) return 0;
        if (arr[0] == 0) return -1;

        int maxReach = arr[0];
        int steps = arr[0];
        int jumps = 1;

        for (int i = 1; i < n - 1; i++) {
            // Update furthest reachable index
            maxReach = Math.max(maxReach, i + arr[i]);

            // Use one step to move to current index
            steps--;

            // If no steps left, must jump
            if (steps == 0) {
                jumps++;

                // Check if stuck at a zero or unreachable state
                if (i >= maxReach) return -1;

                // Re-fill steps for the new jump window
                steps = maxReach - i;
            }
        }

        // Final reachability check
        return maxReach >= n - 1 ? jumps : -1;
    }

    public static void main(String[] args) {
        int[] arr = {1, 3, 5, 8, 9, 2, 6, 7, 6, 8, 9};
        System.out.println("Minimum Jumps: " + minJumps(arr)); // Output: 3
    }
}
```