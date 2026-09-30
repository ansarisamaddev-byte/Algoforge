---
title: "Minimize the Heights II"
description: "Choose whether to increase or decrease each tower by k to minimize the difference in heights."
category: "DSA"
slug: "minimize-heights-ii"
date: "2026-09-30"
---

# Minimize the Heights II

Given an array arr[] representing the heights of n towers and a positive integer k. For each tower, perform exactly one of the following operations exactly once:

- Increase its height by k, or
- Decrease its height by k.

The height of any tower must not become negative.

Return the minimum possible difference between the heights of the tallest and the shortest towers after modifying all the towers.

Input: k = 2, arr[] = [1, 5, 8, 10]

Output: 5

## Key Intuition & Strategy

**Sort the Array:** Sorting the array arr in ascending order simplifies the decision process. After sorting, initial candidates for shortest and tallest modified towers would typically be arr[0] + k and arr[n-1] - k.

**Greedy Partitioning:** To minimize the overall difference, smaller towers should generally be increased by k, and larger towers should be decreased by k.

**Partition Point Split:** If we split the sorted array at index i (0 <= i < n - 1):

- All elements from index 0 to i are increased by k.
- All elements from index i+1 to n-1 are decreased by k.

**Evaluating Candidates at Split i:**

- Smallest potential tower: min(arr[0] + k, arr[i+1] - k)
- Largest potential tower: max(arr[i] + k, arr[n-1] - k)

**Non-Negativity Guard:** If arr[i+1] - k < 0, that split is invalid because height cannot become negative; skip it.

## Algorithm Logic

1. Sort the array arr.
2. Initialize ans = arr[n-1] - arr[0] (the baseline difference without modifications or by shifting all elements equally).
3. Set base limits: smallest = arr[0] + k and largest = arr[n-1] - k.
4. Iterate i from 0 to n-2:
   - If arr[i+1] - k < 0, continue to the next iteration.
   - min_height = min(smallest, arr[i+1] - k)
   - max_height = max(arr[i] + k, largest)
   - ans = min(ans, max_height - min_height)
5. Return ans.

### Python Implementation

```python
def get_min_diff(arr: list[int], k: int) -> int:
    n = len(arr)
    if n == 1:
        return 0
    arr.sort()
    ans = arr[n - 1] - arr[0]
    smallest = arr[0] + k
    largest = arr[n - 1] - k
    for i in range(n - 1):
        # Height cannot be negative
        if arr[i + 1] < k:
            continue
        min_height = min(smallest, arr[i + 1] - k)
        max_height = max(arr[i] + k, largest)
        ans = min(ans, max_height - min_height)
    return ans


if __name__ == "__main__":
    arr = [1, 5, 8, 10]
    k = 2
    print(f"Minimum Difference: {get_min_diff(arr, k)}")  # Output: 5
```

### Java Implementation

```java
import java.util.Arrays;

public class Solution {
    public static int getMinDiff(int[] arr, int k) {
        int n = arr.length;
        if (n == 1) return 0;
        Arrays.sort(arr);
        int ans = arr[n - 1] - arr[0];
        int smallest = arr[0] + k;
        int largest = arr[n - 1] - k;

        for (int i = 0; i < n - 1; i++) {
            if (arr[i + 1] < k) {
                continue;
            }
            int minHeight = Math.min(smallest, arr[i + 1] - k);
            int maxHeight = Math.max(arr[i] + k, largest);
            ans = Math.min(ans, maxHeight - minHeight);
        }
        return ans;
    }

    public static void main(String[] args) {
        int[] arr = {1, 5, 8, 10};
        int k = 2;
        System.out.println("Minimum Difference: " + getMinDiff(arr, k)); // Output: 5
    }
}
```