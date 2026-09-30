---
title: "Triplet Sum in Array"
description: "Determine whether three array elements add up to a target value."
category: "DSA"
slug: "triplet-sum-in-array"
date: "2026-09-30"
---

# Triplet Sum in Array

Given an array arr[] and an integer target, determine if there exists a triplet in the array whose sum equals the given target.

Return true if such a triplet exists, otherwise, return false.

Input: arr[] = [1, 4, 45, 6, 10, 8], target = 13

Output: true

Triplet Sum in Array requires determining if there exist three elements at distinct indices in an array whose sum equals a given target.

## Key Intuition & Strategy

**Brute Force Approach (O(n^3)):** Checking all combinations of three elements requires three nested loops, which is too slow for large inputs.

**Sorting + Two-Pointer Strategy (O(n^2)):**

If we sort the array first (O(nlog n)), we can fix one element at index i and reduce the problem to finding Two Sum in the remaining sorted subarray to the right of i.

For a fixed element arr[i], we need two other elements arr[left] and arr[right] such that:

arr[i] + arr[left] + arr[right] = target

- If the sum is too small (< target), increment left to increase the sum.
- If the sum is too large (> target), decrement right to decrease the sum.
- If the sum matches, return True immediately.

## Algorithm Logic

1. Sort the Array: Sort arr in non-decreasing order.
2. Fix First Element: Loop index i from 0 to n - 3:
   - Set two pointers: left = i + 1 and right = n - 1.
3. Two-Pointer Search Loop: While left < right:
   - Compute curr_sum = arr[i] + arr[left] + arr[right].
   - If curr_sum == target: Return True.
   - If curr_sum < target: Increment left (left += 1).
   - If curr_sum > target: Decrement right (right -= 1).
4. No Triplet Found: If the loops finish without finding a match, return False.

### Python Implementation

```python
def has_triplet_sum(arr: list[int], target: int) -> bool:
    n = len(arr)
    if n < 3:
        return False

    # Step 1: Sort the array
    arr.sort()

    # Step 2: Fix the first element and use two pointers for the remaining two
    for i in range(n - 2):
        left = i + 1
        right = n - 1

        while left < right:
            curr_sum = arr[i] + arr[left] + arr[right]

            if curr_sum == target:
                return True
            elif curr_sum < target:
                left += 1
            else:
                right -= 1

    return False


# Example Walkthrough
if __name__ == "__main__":
    arr = [1, 4, 45, 6, 10, 8]
    target = 13
    print("Triplet exists:", has_triplet_sum(arr, target))  # Output: True
```

### Java Implementation

```java
import java.util.Arrays;

public class Solution {
    public static boolean hasTripletSum(int[] arr, int target) {
        int n = arr.length;
        if (n < 3) {
            return false;
        }

        // Step 1: Sort the array
        Arrays.sort(arr);

        // Step 2: Fix the first element and use two pointers for the remaining two
        for (int i = 0; i < n - 2; i++) {
            int left = i + 1;
            int right = n - 1;

            while (left < right) {
                int currSum = arr[i] + arr[left] + arr[right];

                if (currSum == target) {
                    return true;
                } else if (currSum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }

        return false;
    }

    public static void main(String[] args) {
        int[] arr = {1, 4, 45, 6, 10, 8};
        int target = 13;
        System.out.println("Triplet exists: " + hasTripletSum(arr, target)); // Output: true
    }
}
```

## Complexity Analysis

Time Complexity: O(n^2)

Sorting the array takes O(nlog n) time.

The outer loop runs n - 2 times, and the inner two-pointer scan takes O(n) time for each fixed index i, giving O(n^2) overall.

Space Complexity: O(1) or O(log n) auxiliary space used for sorting (in-place).