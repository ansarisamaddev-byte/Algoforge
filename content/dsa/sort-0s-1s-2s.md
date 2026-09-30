---
title: "Sort 0s, 1s and 2s"
description: "Sort an array containing only 0s, 1s, and 2s without using the built-in sort function."
category: "DSA"
slug: "sort-0s-1s-2s"
date: "2026-09-30"
---

# Sort 0s, 1s and 2s

Given an array arr[] containing only 0s, 1s, and 2s. Sort the array in ascending order.

Note: You need to solve this problem without utilizing the built-in sort function.

Examples:

Input: arr[] = [0, 1, 2, 0, 1, 2]

Output: [0, 0, 1, 1, 2, 2]

## Approach 1: Counting Approach (Two-Pass)

Algorithm:

1. Traverse the array once and count the number of 0s, 1s, and 2s.
2. Overwrite the array: first fill 0s, then 1s, and finally 2s based on their respective counts.

Complexity:

- Time Complexity: O(N) + O(N) = O(N) (Two passes through the array)
- Space Complexity: O(1) (Auxiliary space for count variables)

### Python Implementation (Counting Approach)

```python
def sort_012_counting(arr: list[int]) -> None:
    count0 = count1 = count2 = 0

    # Pass 1: Count occurrences
    for num in arr:
        if num == 0:
            count0 += 1
        elif num == 1:
            count1 += 1
        else:
            count2 += 1

    # Pass 2: Overwrite original array
    index = 0
    for _ in range(count0):
        arr[index] = 0
        index += 1
    for _ in range(count1):
        arr[index] = 1
        index += 1
    for _ in range(count2):
        arr[index] = 2
        index += 1
```

### Java Implementation (Counting Approach)

```java
public class Solution {
    public static void sort012Counting(int[] arr) {
        int count0 = 0, count1 = 0, count2 = 0;

        // Pass 1: Count occurrences
        for (int num : arr) {
            if (num == 0) count0++;
            else if (num == 1) count1++;
            else if (num == 2) count2++;
        }

        // Pass 2: Overwrite original array
        int index = 0;
        while (count0-- > 0) arr[index++] = 0;
        while (count1-- > 0) arr[index++] = 1;
        while (count2-- > 0) arr[index++] = 2;
    }
}
```

## Approach 2: Dutch National Flag Algorithm

This optimal approach uses three pointers (low, mid, and high) to partition the array into four regions in a single pass:

- [0 ... low-1]: Contains 0s
- [low ... mid-1]: Contains 1s
- [mid ... high]: Unknown elements to be processed
- [high+1 ... end]: Contains 2s

Algorithm:

1. Initialize low = 0, mid = 0, high = len(arr) - 1.
2. Loop while mid <= high:
3. If arr[mid] == 0, swap arr[low] and arr[mid], then increment low and mid.
4. If arr[mid] == 1, increment mid.
5. If arr[mid] == 2, swap arr[mid] and arr[high], then decrement high. Do not increment mid because the swapped element still needs to be processed.
6. Repeat until mid > high.

Complexity:

- Time Complexity: O(n) — exactly 1 pass.
- Space Complexity: O(1) — in-place pointers.

### Python Implementation (Dutch National Flag Algorithm)

```python
def sort_012_dutch_flag(arr: list[int]) -> None:
    low, mid, high = 0, 0, len(arr) - 1

    while mid <= high:
        if arr[mid] == 0:
            arr[low], arr[mid] = arr[mid], arr[low]
            low += 1
            mid += 1
        elif arr[mid] == 1:
            mid += 1
        else:  # arr[mid] == 2
            arr[mid], arr[high] = arr[high], arr[mid]
            high -= 1
```

### Java Implementation (Dutch National Flag Algorithm)

```java
public class Solution {
    public static void sort012DutchFlag(int[] arr) {
        int low = 0, mid = 0, high = arr.length - 1;

        while (mid <= high) {
            if (arr[mid] == 0) {
                swap(arr, low, mid);
                low++;
                mid++;
            } else if (arr[mid] == 1) {
                mid++;
            } else { // arr[mid] == 2
                swap(arr, mid, high);
                high--;
            }
        }
    }

    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}
```