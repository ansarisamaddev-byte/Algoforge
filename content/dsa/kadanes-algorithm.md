---
title: "Kadane's Algorithm"
description: "Find the maximum sum of a subarray containing at least one element."
category: "DSA"
slug: "kadanes-algorithm"
date: "2026-09-30"
---

# Kadane's Algorithm

You are given an integer array arr[]. You need to find the maximum sum of a subarray (containing at least one element) in the array arr[].

Examples:

Input: arr[] = [2, 3, -8, 7, -1, 2, 3]

Output: 11

## Algorithm Logic

1. Initialize `curr_max` and `max_so_far` to the first element. This ensures the subarray contains at least one element, including when every element is negative.
2. Loop through the array from index 1 to the end.
3. For each element, set `curr_max` to the larger of the current element and `curr_max` plus the current element. This either starts a new subarray or extends the existing one.
4. Update `max_so_far` if `curr_max` is larger.
5. Return `max_so_far`.

### Python Implementation

```python
def max_subarray_sum(arr: list[int]) -> int:
    max_so_far = arr[0]
    curr_max = arr[0]

    for i in range(1, len(arr)):
        # Decide whether to add current element to existing sum or start fresh
        curr_max = max(arr[i], curr_max + arr[i])

        # Update overall maximum
        max_so_far = max(max_so_far, curr_max)

    return max_so_far


if __name__ == "__main__":
    arr = [2, 3, -8, 7, -1, 2, 3]
    print(f"Maximum Subarray Sum: {max_subarray_sum(arr)}")

# Output: 11
```

### Java Implementation

```java
public class Solution {
    public static int maxSubarraySum(int[] arr) {
        int maxSoFar = arr[0];
        int currMax = arr[0];

        for (int i = 1; i < arr.length; i++) {
            currMax = Math.max(arr[i], currMax + arr[i]);
            maxSoFar = Math.max(maxSoFar, currMax);
        }

        return maxSoFar;
    }

    public static void main(String[] args) {
        int[] arr = {2, 3, -8, 7, -1, 2, 3};
        System.out.println("Maximum Subarray Sum: " + maxSubarraySum(arr)); // Output: 11
    }
}
```