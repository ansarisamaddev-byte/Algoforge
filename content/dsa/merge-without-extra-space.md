---
title: "Merge Without Extra Space"
description: "Merge two sorted arrays in place while keeping each array's section sorted."
category: "DSA"
slug: "merge-without-extra-space"
date: "2026-09-30"
---

# Merge Without Extra Space

Given two sorted arrays a[] and b[] of size n and m respectively, the task is to merge them in sorted order without using any extra space. Modify a[] so that it contains the first n elements and modify b[] so that it contains the last m elements.

Input: a[] = [2, 4, 7, 10], b[] = [2, 3]

Output: a[] = [2, 2, 3, 4], b[] = [7, 10]

Merge Without Extra Space requires merging two pre-sorted arrays a[] and b[] in-place such that a[] receives the smallest n elements (sorted) and b[] receives the remaining m elements (sorted), using O(1) auxiliary space.

## Key Intuition & Strategy

Since both arrays are already sorted individually, merging them without extra space means partitioning all n + m elements so that array a[] holds the smallest n elements and array b[] holds the largest m elements.

**The Observation:** Any element at the end of a[] that is larger than an element at the beginning of b[] is in the wrong array.

**Greedy Boundary Swap:** Compare elements from the back of a[] (left = n - 1) and the front of b[] (right = 0). Whenever a[left] > b[right], swap them to push the larger value to b[] and pull the smaller value to a[].

**Early Termination:** Stop as soon as a[left] <= b[right]—since both arrays are pre-sorted, no further swaps across the arrays are needed.

**Local Sort:** Finally, sort both arrays independently to restore their internal sorted order.

## Algorithm Logic

**Initialize Pointers:**

- Set left = n - 1 (last index of a[]) and right = 0 (first index of b[]).

**Swap Misplaced Elements Across Arrays:**

- Loop while left >= 0 and right < m:
  - If a[left] > b[right]:
    - Swap a[left] and b[right].
    - Decrement left by 1 (left--).
    - Increment right by 1 (right++).
  - Else (a[left] <= b[right]):
    - Break out of the loop early (all remaining elements are already in their correct respective arrays).

**Restore Internal Order:**

- Sort array a[] independently.
- Sort array b[] independently.

### Python Implementation

```python
def merge_arrays(a: list[int], b: list[int]) -> None:
    n, m = len(a), len(b)
    left = n - 1
    right = 0

    # Phase 1: Swap misplaced elements between end of a[] and start of b[]
    while left >= 0 and right < m:
        if a[left] > b[right]:
            a[left], b[right] = b[right], a[left]
            left -= 1
            right += 1
        else:
            break

    # Phase 2: Re-sort both arrays to restore proper internal order
    a.sort()
    b.sort()


# Example Walkthrough
if __name__ == "__main__":
    a = [2, 4, 7, 10]
    b = [2, 3]
    merge_arrays(a, b)
    print("a[] =", a)  # Output: [2, 2, 3, 4]
    print("b[] =", b)  # Output: [7, 10]
```

### Java Implementation

```java
import java.util.Arrays;

public class Solution {
    public static void mergeArrays(int[] a, int[] b) {
        int n = a.length;
        int m = b.length;
        int left = n - 1;
        int right = 0;

        // Phase 1: Swap misplaced elements between end of a[] and start of b[]
        while (left >= 0 && right < m) {
            if (a[left] > b[right]) {
                int temp = a[left];
                a[left] = b[right];
                b[right] = temp;
                left--;
                right++;
            } else {
                break;
            }
        }

        // Phase 2: Re-sort both arrays to restore proper internal order
        Arrays.sort(a);
        Arrays.sort(b);
    }

    public static void main(String[] args) {
        int[] a = {2, 4, 7, 10};
        int[] b = {2, 3};
        mergeArrays(a, b);
        System.out.println("a[] = " + Arrays.toString(a)); // Output: [2, 2, 3, 4]
        System.out.println("b[] = " + Arrays.toString(b)); // Output: [7, 10]
    }
}
```