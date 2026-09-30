---
title: "Next Permutation"
description: "Rearrange an array in place into its next lexicographically greater permutation."
category: "DSA"
slug: "next-permutation"
date: "2026-09-30"
---

# Next Permutation

A permutation of an array of integers is an arrangement of its members into a sequence or linear order.

For example, for arr = [1,2,3], the following are all the permutations of arr: [1,2,3], [1,3,2], [2, 1, 3], [2, 3, 1], [3,1,2], [3,2,1].

The next permutation of an array of integers is the next lexicographically greater permutation of its integer. More formally, if all the permutations of the array are sorted in one container according to their lexicographical order, then the next permutation of that array is the permutation that follows it in the sorted container. If such arrangement is not possible, the array must be rearranged as the lowest possible order (i.e., sorted in ascending order).

For example, the next permutation of arr = [1,2,3] is [1,3,2].

Similarly, the next permutation of arr = [2,3,1] is [3,1,2].

While the next permutation of arr = [3,2,1] is [1,2,3] because [3,2,1] does not have a lexicographical larger rearrangement.

Given an array of integers nums, find the next permutation of nums.

The replacement must be in place and use only constant extra memory.

Example 1:

Input: nums = [1,2,3]

Output: [1,3,2]

Next Permutation requires rearranging a sequence of numbers into the lexicographically next greater permutation. If no such arrangement exists (i.e., the array is sorted in descending order), it must be rearranged to the lowest possible order (sorted in ascending order).

## Key Intuition & Strategy

To find the smallest possible increase in lexicographical value:

- **Find the Pivot:** Traverse from right to left to locate the first pair of adjacent elements where nums[i] < nums[i + 1]. The index i is our pivot point. Elements to the right of i are in strict descending order, meaning no greater permutation can be formed using only those right-hand elements.
- **Swap with Smallest Greater Element:** To make the permutation just slightly larger, find the smallest element to the right of i that is strictly greater than nums[i] (index j), and swap nums[i] with nums[j].
- **Reverse the Tail:** The sequence to the right of index i is still in descending order. Reverse it to make it ascending, ensuring the smallest possible value for that suffix.
- **Edge Case (Entirely Descending):** If no pivot exists (i.e., array is fully sorted in descending order), simply reverse the entire array to get the lowest possible order.

## Algorithm Logic

1. Locate Pivot (i): Scan from right to left (starting at n - 2) until nums[i] < nums[i + 1].
2. Locate Successor (j) & Swap:
   - If a valid pivot i >= 0 is found:
   - Scan again from right to left starting from n - 1 to find the first index j where nums[j] > nums[i].
   - Swap nums[i] and nums[j].
3. Reverse Suffix: Reverse the subarray from index i + 1 to n - 1.

### Python Implementation

```python
def next_permutation(nums: list[int]) -> None:
    n = len(nums)
    i = n - 2

    # Step 1: Find the first decreasing element from the right
    while i >= 0 and nums[i] >= nums[i + 1]:
        i -= 1

    # Step 2: If a valid pivot is found, swap it with the next larger element
    if i >= 0:
        j = n - 1
        while nums[j] <= nums[i]:
            j -= 1
        nums[i], nums[j] = nums[j], nums[i]

    # Step 3: Reverse the suffix starting at index i + 1
    left, right = i + 1, n - 1
    while left < right:
        nums[left], nums[right] = nums[right], nums[left]
        left += 1
        right -= 1


# Example Walkthrough
if __name__ == "__main__":
    nums = [1, 2, 3]
    next_permutation(nums)
    print("Next Permutation:", nums)  # Output: [1, 3, 2]
```

### Java Implementation

```java
import java.util.Arrays;

public class Solution {
    public static void nextPermutation(int[] nums) {
        int n = nums.length;
        int i = n - 2;

        // Step 1: Find the first decreasing element from the right
        while (i >= 0 && nums[i] >= nums[i + 1]) {
            i--;
        }

        // Step 2: If a valid pivot is found, swap it with the next larger element
        if (i >= 0) {
            int j = n - 1;
            while (nums[j] <= nums[i]) {
                j--;
            }
            swap(nums, i, j);
        }

        // Step 3: Reverse the suffix starting at index i + 1
        reverse(nums, i + 1, n - 1);
    }

    private static void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }

    private static void reverse(int[] nums, int left, int right) {
        while (left < right) {
            swap(nums, left, right);
            left++;
            right--;
        }
    }

    public static void main(String[] args) {
        int[] nums = {1, 2, 3};
        nextPermutation(nums);
        System.out.println("Next Permutation: " + Arrays.toString(nums)); // Output: [1, 3, 2]
    }
}
```