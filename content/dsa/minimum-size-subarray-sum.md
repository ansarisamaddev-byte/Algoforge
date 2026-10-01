---
title: "Minimum Size Subarray Sum"
description: "Find the shortest contiguous subarray whose sum is at least a target."
category: "DSA"
slug: "minimum-size-subarray-sum"
date: "2026-10-01"
---

# Minimum Size Subarray Sum

Given an array of positive integers `nums` and a positive integer `target`, return the minimal length of a contiguous subarray whose sum is greater than or equal to `target`. If no such subarray exists, return `0`.

**Input:** `target = 7`, `nums = [2, 3, 1, 2, 4, 3]`

**Output:** `2`

The subarray `[4, 3]` has the smallest length while meeting the target.

## Key Intuition & Strategy

Because every number is positive, extending a window to the right increases its sum, and removing values from the left decreases it. This makes a sliding window effective:

- Expand the window by advancing the right pointer and adding each value to the running sum.
- Whenever the sum reaches the target, record the window length, then shrink from the left while it still meets the target.

Each pointer moves forward at most `n` times, so the algorithm runs in O(n) time with O(1) auxiliary space.

## Algorithm Logic

1. Initialize `left` and `current_sum` to `0`, and `min_length` to infinity.
2. For each index `right`, add `nums[right]` to `current_sum`.
3. While `current_sum >= target`, update `min_length`, subtract `nums[left]`, and advance `left`.
4. Return `min_length`, or `0` if it was never updated.

### Python Implementation

```python
def min_sub_array_len(target: int, nums: list[int]) -> int:
    left = 0
    current_sum = 0
    min_length = float("inf")

    for right, value in enumerate(nums):
        current_sum += value

        while current_sum >= target:
            min_length = min(min_length, right - left + 1)
            current_sum -= nums[left]
            left += 1

    return min_length if min_length != float("inf") else 0


if __name__ == "__main__":
    target = 7
    nums = [2, 3, 1, 2, 4, 3]
    print("Minimal Subarray Length:", min_sub_array_len(target, nums))  # Output: 2
```

### Java Implementation

```java
public class Solution {
    public static int minSubArrayLen(int target, int[] nums) {
        int left = 0;
        int currentSum = 0;
        int minLength = Integer.MAX_VALUE;

        for (int right = 0; right < nums.length; right++) {
            currentSum += nums[right];

            while (currentSum >= target) {
                minLength = Math.min(minLength, right - left + 1);
                currentSum -= nums[left];
                left++;
            }
        }

        return minLength == Integer.MAX_VALUE ? 0 : minLength;
    }

    public static void main(String[] args) {
        int target = 7;
        int[] nums = {2, 3, 1, 2, 4, 3};
        System.out.println("Minimal Subarray Length: " + minSubArrayLen(target, nums)); // Output: 2
    }
}
```

## Trace Walkthrough

For `target = 7` and `nums = [2, 3, 1, 2, 4, 3]`:

| `right` | Value added | Window sum | Shrinking windows and lengths | Minimum |
| ---: | ---: | ---: | --- | ---: |
| 0 | 2 | 2 | None | - |
| 1 | 3 | 5 | None | - |
| 2 | 1 | 6 | None | - |
| 3 | 2 | 8 | `[2, 3, 1, 2]` (4), then sum becomes 6 | 4 |
| 4 | 4 | 10 | `[3, 1, 2, 4]` (4), `[1, 2, 4]` (3), then sum becomes 6 | 3 |
| 5 | 3 | 9 | `[2, 4, 3]` (3), `[4, 3]` (2), then sum becomes 3 | 2 |

The shortest qualifying window is `[4, 3]`, so the result is `2`.

## Complexity

- **Time:** O(n), because each element is added once and removed at most once.
- **Space:** O(1), using a fixed number of variables.