---
title: "Count Inversions"
description: "Count pairs where an earlier array element is greater than a later one."
category: "DSA"
slug: "count-inversions"
date: "2026-09-30"
---

# Count Inversions

Given an array of integers arr[]. You have to find the Inversion Count of the array. Inversion count is the number of pairs of elements (i, j) such that i < j and arr[i] > arr[j].

Input: arr[] = [2, 4, 1, 3, 5]

Output: 3

Count Inversions requires finding the total number of pairs (i, j) in an array such that i < j and arr[i] > arr[j]. An inversion indicates how far (or close) the array is from being completely sorted.

## Key Intuition & Strategy

Instead of checking all O(n^2) pairs:

- **Divide & Conquer (Merge Sort):** We can count inversions naturally while sorting the array using Merge Sort.
- **Split into Regions:** During a split into a left half and a right half, inversions fall into three categories:
  - Inversions within the left subarray.
  - Inversions within the right subarray.
  - Cross Inversions: Where element i is in the left half and element j is in the right half, with arr[i] > arr[j].
- **Observation:** During the merge step, if both the left and right halves are already sorted and we find arr[left_ptr] > arr[right_ptr], then all remaining elements in the left half starting from left_ptr will also be greater than arr[right_ptr].

Thus, the number of cross inversions contributed by arr[right_ptr] is simply: mid - left_ptr + 1.

## Algorithm Logic

1. Base Case: If subarray length is 1 or 0, return 0 (no inversions).
2. Recursive Split:
   - Find mid = (left + right) // 2.
   - Recursively count inversions in the left half: count_inversions(arr, left, mid).
   - Recursively count inversions in the right half: count_inversions(arr, mid + 1, right).
3. Merge and Count Cross Inversions:
   - Use two pointers: i = left (for left sorted array) and j = mid + 1 (for right sorted array).
   - Compare arr[i] and arr[j]:
     - If arr[i] <= arr[j]: Move arr[i] into temporary array, increment i.
     - If arr[i] > arr[j]: Move arr[j] into temporary array, increment j, and add (mid - i + 1) to the inversion count.
4. Copy Back: Copy merged elements from the temporary array back into the original array.
5. Return left_inversions + right_inversions + cross_inversions.

### Python Implementation

```python
def inversion_count(arr: list[int]) -> int:
    def merge_and_count(arr: list[int], temp: list[int], left: int, mid: int, right: int) -> int:
        i = left       # Starting index for left subarray
        j = mid + 1    # Starting index for right subarray
        k = left       # Starting index for merged temp array
        inv_count = 0

        while i <= mid and j <= right:
            if arr[i] <= arr[j]:
                temp[k] = arr[i]
                i += 1
            else:
                temp[k] = arr[j]
                # Key step: All remaining elements in left half form inversions with arr[j]
                inv_count += (mid - i + 1)
                j += 1
            k += 1

        # Copy remaining elements of left subarray, if any
        while i <= mid:
            temp[k] = arr[i]
            i += 1
            k += 1

        # Copy remaining elements of right subarray, if any
        while j <= right:
            temp[k] = arr[j]
            j += 1
            k += 1

        # Copy sorted temp back to original array
        for idx in range(left, right + 1):
            arr[idx] = temp[idx]

        return inv_count

    def merge_sort_and_count(arr: list[int], temp: list[int], left: int, right: int) -> int:
        inv_count = 0
        if left < right:
            mid = (left + right) // 2

            inv_count += merge_sort_and_count(arr, temp, left, mid)
            inv_count += merge_sort_and_count(arr, temp, mid + 1, right)
            inv_count += merge_and_count(arr, temp, left, mid, right)

        return inv_count

    temp = [0] * len(arr)
    return merge_sort_and_count(arr, temp, 0, len(arr) - 1)


# Example Walkthrough
if __name__ == "__main__":
    arr = [2, 4, 1, 3, 5]
    print("Inversion Count:", inversion_count(arr))  # Output: 3
```

### Java Implementation

```java
public class Solution {
    public static long inversionCount(long[] arr) {
        long[] temp = new long[arr.length];
        return mergeSortAndCount(arr, temp, 0, arr.length - 1);
    }

    private static long mergeSortAndCount(long[] arr, long[] temp, int left, int right) {
        long invCount = 0;
        if (left < right) {
            int mid = left + (right - left) / 2;

            invCount += mergeSortAndCount(arr, temp, left, mid);
            invCount += mergeSortAndCount(arr, temp, mid + 1, right);
            invCount += mergeAndCount(arr, temp, left, mid, right);
        }
        return invCount;
    }

    private static long mergeAndCount(long[] arr, long[] temp, int left, int mid, int right) {
        int i = left;      // Starting index for left subarray
        int j = mid + 1;   // Starting index for right subarray
        int k = left;      // Starting index for merged temp array
        long invCount = 0;

        while (i <= mid && j <= right) {
            if (arr[i] <= arr[j]) {
                temp[k++] = arr[i++];
            } else {
                temp[k++] = arr[j++];
                // Key step: All remaining elements in left half form inversions with arr[j]
                invCount += (mid - i + 1);
            }
        }

        // Copy remaining elements
        while (i <= mid) temp[k++] = arr[i++];
        while (j <= right) temp[k++] = arr[j++];

        // Copy back to original array
        for (int idx = left; idx <= right; idx++) {
            arr[idx] = temp[idx];
        }

        return invCount;
    }

    public static void main(String[] args) {
        long[] arr = {2, 4, 1, 3, 5};
        System.out.println("Inversion Count: " + inversionCount(arr)); // Output: 3
    }
}
```