---
title: "Maximum Product Subarray"
description: "Find a contiguous subarray with the largest product, including arrays with negative values and zeroes."
category: "DSA"
slug: "maximum-product-subarray"
date: "2026-09-30"
---

# Maximum Product Subarray

Given an array arr[] that contains positive and negative integers (may contain 0 as well). Find the maximum product that we can get in a subarray of arr[].

Note: It is guaranteed that the answer fits in a 32-bit integer.

Input: arr[] = [-2, 6, -3, -10, 0, 2]

Output: 180

Maximum Product Subarray requires finding a contiguous subarray within a one-dimensional array of numbers (which may include positive, negative, and zero values) that yields the largest product.

## Key Intuition & Strategy

- **The Negative Sign Swap:** Unlike Maximum Subarray Sum (Kadane's Algorithm), multiplication introduces a unique behavior: multiplying a large negative number by another negative number yields a large positive number.
- **Track Both Min and Max:** At any index i, the maximum product ending at i can come from:
  - The element arr[i] itself.
  - arr[i] * current_max (if arr[i] is positive).
  - arr[i] * current_min (if arr[i] is negative, turning a large negative minimum into a large positive maximum).
- **Handling Zeros:** A zero resets both current_max and current_min back to 1 when evaluating subsequent elements, naturally splitting the problem into non-zero segments.

## Algorithm Logic

1. Initialize State: Set max_prod, curr_max, and curr_min to the first element arr[0].
2. Iterate: For each element x from index 1 to n - 1:
   - If x < 0: Swap curr_max and curr_min (since multiplying by a negative flips the largest value to the smallest and vice versa).
   - Update Local Max: curr_max = max(x, curr_max * x).
   - Update Local Min: curr_min = min(x, curr_min * x).
   - Update Global Result: max_prod = max(max_prod, curr_max).
3. Return max_prod.

### Python Implementation

```python
def max_product(arr: list[int]) -> int:
    if not arr:
        return 0

    # Initialize overall result, current max, and current min
    max_prod = arr[0]
    curr_max = arr[0]
    curr_min = arr[0]

    for i in range(1, len(arr)):
        x = arr[i]

        # Swapping max and min when encountering a negative number
        if x < 0:
            curr_max, curr_min = curr_min, curr_max

        # Update local maximum and minimum products
        curr_max = max(x, curr_max * x)
        curr_min = min(x, curr_min * x)

        # Update the global maximum product
        max_prod = max(max_prod, curr_max)

    return max_prod


# Example Walkthrough
if __name__ == "__main__":
    arr = [-2, 6, -3, -10, 0, 2]
    print("Maximum Product Subarray:", max_product(arr))  # Output: 180
```

### Java Implementation

```java
public class Solution {
    public static int maxProduct(int[] arr) {
        if (arr == null || arr.length == 0) {
            return 0;
        }

        int maxProd = arr[0];
        int currMax = arr[0];
        int currMin = arr[0];

        for (int i = 1; i < arr.length; i++) {
            int x = arr[i];

            // Swapping max and min when encountering a negative number
            if (x < 0) {
                int temp = currMax;
                currMax = currMin;
                currMin = temp;
            }

            // Update local maximum and minimum products
            currMax = Math.max(x, currMax * x);
            currMin = Math.min(x, currMin * x);

            // Update global maximum product
            maxProd = Math.max(maxProd, currMax);
        }

        return maxProd;
    }

    public static void main(String[] args) {
        int[] arr = {-2, 6, -3, -10, 0, 2};
        System.out.println("Maximum Product Subarray: " + maxProduct(arr)); // Output: 180
    }
}
```

## Complexity Analysis

Time Complexity: O(n) — Single pass through the array.

Space Complexity: O(1) — Constant auxiliary space using primitive variables (curr_max, curr_min, max_prod).