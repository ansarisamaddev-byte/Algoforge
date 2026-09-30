---
title: "Find the Duplicate Number"
description: "Find the repeated value in an array without modifying it or using extra space."
category: "DSA"
slug: "find-the-duplicate-number"
date: "2026-09-30"
---

# Find the Duplicate Number

Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.

There is only one repeated number in nums, return this repeated number.

You must solve the problem without modifying the array nums and using only constant extra space.

Example 1:

Input: nums = [1,3,4,2,2]

Output: 2

Find the Duplicate Number requires finding the single repeated element in an array of n + 1 integers where each integer lies in the inclusive range [1, n]. Crucially, the constraints state that you cannot modify the array and must use O(1) extra space.

## Key Intuition & Strategy (Floyd's Cycle Detection)

Because elements are in the range [1, n], each value in nums can act as a pointer to another index: index -> nums[index].

Because there are n + 1 elements and values are only up to n, at least two indices will point to the same next index.

This forms a linked list with a cycle, where the entry point of the cycle corresponds to the duplicate number.

We use Floyd's Tortoise and Hare Algorithm (Fast & Slow Pointers) in two phases:

- **Phase 1 (Detect Cycle):** Advance slow by 1 step (slow = nums[slow]) and fast by 2 steps (fast = nums[nums[fast]]) until they intersect inside the cycle.
- **Phase 2 (Find Cycle Entry Point):** Keep fast at the intersection point, reset slow to the start (nums[0]), and advance both pointers 1 step at a time until they meet. Their meeting point is the repeated number.

## Algorithm Logic

**Phase 1:**

1. Set slow = nums[0] and fast = nums[0].
2. Loop: slow = nums[slow], fast = nums[nums[fast]] until slow == fast.

**Phase 2:**

1. Set slow = nums[0].
2. Loop: slow = nums[slow], fast = nums[fast] until slow == fast.
3. Return slow (or fast).

### Python Implementation

```python
def find_duplicate(nums: list[int]) -> int:
    # Phase 1: Detect intersection point in the cycle
    slow = nums[0]
    fast = nums[0]

    while True:
        slow = nums[slow]
        fast = nums[nums[fast]]
        if slow == fast:
            break

    # Phase 2: Find the entrance to the cycle (the duplicate number)
    slow = nums[0]
    while slow != fast:
        slow = nums[slow]
        fast = nums[fast]

    return slow


if __name__ == "__main__":
    nums = [1, 3, 4, 2, 2]
    print(f"Duplicate Number: {find_duplicate(nums)}")  # Output: 2
```

### Java Implementation

```java
public class Solution {
    public static int findDuplicate(int[] nums) {
        // Phase 1: Detect intersection point in the cycle
        int slow = nums[0];
        int fast = nums[0];

        do {
            slow = nums[slow];
            fast = nums[nums[fast]];
        } while (slow != fast);

        // Phase 2: Find the entrance to the cycle (the duplicate number)
        slow = nums[0];
        while (slow != fast) {
            slow = nums[slow];
            fast = nums[fast];
        }

        return slow;
    }

    public static void main(String[] args) {
        int[] nums = {1, 3, 4, 2, 2};
        System.out.println("Duplicate Number: " + findDuplicate(nums)); // Output: 2
    }
}
```