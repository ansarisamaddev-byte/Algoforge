---
title: "Trapping Rain Water"
description: "Calculate the water trapped between bars using a two-pointer scan."
category: "DSA"
slug: "trapping-rain-water"
date: "2026-09-30"
---

# Trapping Rain Water

Given an array arr[] with non-negative integers representing the height of blocks. If the width of each block is 1, compute how much water can be trapped between the blocks during the rainy season.

Input: arr[] = [3, 0, 1, 0, 4, 0, 2]

Output: 10

Trapping Rain Water requires calculating the total units of rainwater collected between vertical bars based on their heights.

## Key Intuition & Strategy

**Water at Any Single Index:** For any block at index i, the height of water it can hold above itself is determined by the shorter of the tallest boundary to its left and the tallest boundary to its right:

Water at i = max(0, min(max_left, max_right) - arr[i])

**Two-Pointer Approach (O(n) Time, O(1) Space):**

Instead of precomputing prefix and suffix arrays using O(n) extra space, we maintain two pointers: left = 0 and right = n - 1.

We also keep track of left_max and right_max.

**Core Insight:** If arr[left] <= arr[right], we know for a fact that left_max is the limiting boundary for index left (since right_max is guaranteed to be at least arr[right] >= arr[left]). Thus, we can process index left safely and move inward (left += 1).

Conversely, if arr[left] > arr[right], right_max is the bottleneck for index right, so we process right and move inward (right -= 1).

## Algorithm Logic

1. Initialize:
   - left = 0, right = n - 1
   - left_max = 0, right_max = 0
   - total_water = 0
2. Two-Pointer Loop: While left <= right:
   - Case 1 (arr[left] <= arr[right]):
     - If arr[left] >= left_max, update left_max = arr[left].
     - Else, add left_max - arr[left] to total_water.
     - Move left += 1.
   - Case 2 (arr[left] > arr[right]):
     - If arr[right] >= right_max, update right_max = arr[right].
     - Else, add right_max - arr[right] to total_water.
     - Move right -= 1.
3. Return total_water.

### Python Implementation

```python
def trap_rain_water(arr: list[int]) -> int:
    if not arr:
        return 0

    left, right = 0, len(arr) - 1
    left_max, right_max = 0, 0
    total_water = 0

    while left <= right:
        if arr[left] <= arr[right]:
            if arr[left] >= left_max:
                left_max = arr[left]
            else:
                total_water += left_max - arr[left]
            left += 1
        else:
            if arr[right] >= right_max:
                right_max = arr[right]
            else:
                total_water += right_max - arr[right]
            right -= 1

    return total_water


# Example Walkthrough
if __name__ == "__main__":
    arr = [3, 0, 1, 0, 4, 0, 2]
    print("Total Trapped Water:", trap_rain_water(arr))  # Output: 10
```

### Java Implementation

```java
public class Solution {
    public static int trapRainWater(int[] arr) {
        if (arr == null || arr.length == 0) {
            return 0;
        }

        int left = 0;
        int right = arr.length - 1;
        int leftMax = 0;
        int rightMax = 0;
        int totalWater = 0;

        while (left <= right) {
            if (arr[left] <= arr[right]) {
                if (arr[left] >= leftMax) {
                    leftMax = arr[left];
                } else {
                    totalWater += leftMax - arr[left];
                }
                left++;
            } else {
                if (arr[right] >= rightMax) {
                    rightMax = arr[right];
                } else {
                    totalWater += rightMax - arr[right];
                }
                right--;
            }
        }

        return totalWater;
    }

    public static void main(String[] args) {
        int[] arr = {3, 0, 1, 0, 4, 0, 2};
        System.out.println("Total Trapped Water: " + trapRainWater(arr)); // Output: 10
    }
}
```

## Complexity Analysis

Time Complexity: O(n) — Single linear scan using two pointers, where left and right meet in the middle.

Space Complexity: O(1) — Optimal constant auxiliary space (no array allocation).