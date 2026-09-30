---
title: "Merge Intervals"
description: "Combine overlapping intervals into a set of non-overlapping intervals."
category: "DSA"
slug: "merge-intervals"
date: "2026-09-30"
---

# Merge Intervals

Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

Example 1:

Input: intervals = [[1,3],[2,6],[8,10],[15,18]]

Output: [[1,6],[8,10],[15,18]]

Merge Intervals requires combining all overlapping interval pairs into single merged intervals that cover the same range, returning a list of mutually exclusive, non-overlapping intervals.

## Key Intuition & Strategy

Instead of checking all pairs of intervals against each other:

- **Sort First:** Sorting the intervals by their start times brings all intervals that could potentially overlap right next to each other.
- **Sequential Comparison:** Once sorted, interval A and the next interval B overlap if and only if B.start <= A.end.
- **Merging Logic:**
  - If they overlap: Extend interval A's end boundary to max(A.end, B.end).
  - If they don't overlap: Interval A is fully processed, so add it to the result list and set interval B as the new current interval to evaluate.

## Algorithm Logic

1. Edge Case: If len(intervals) <= 1, return intervals.
2. Sort intervals in non-decreasing order based on their start values (interval[0]).
3. Initialize Result: Create a result list merged and add the first interval intervals[0] to it.
4. Iterate: For each remaining interval current in intervals[1:]:
   - Fetch the last added interval in merged (let's call it prev).
   - If current[0] <= prev[1] (Overlap Detected):
     - Update prev[1] = max(prev[1], current[1]).
   - Else (No Overlap):
     - Append current to merged.
5. Return merged.

### Python Implementation

```python
def merge(intervals: list[list[int]]) -> list[list[int]]:
    if not intervals:
        return []

    # Step 1: Sort intervals by start time
    intervals.sort(key=lambda x: x[0])

    merged = [intervals[0]]

    # Step 2: Iterate and merge overlapping intervals
    for i in range(1, len(intervals)):
        current = intervals[i]
        prev = merged[-1]

        # Overlap check
        if current[0] <= prev[1]:
            # Extend boundary of previous interval
            prev[1] = max(prev[1], current[1])
        else:
            # No overlap, add as a new distinct interval
            merged.append(current)

    return merged


# Example Walkthrough
if __name__ == "__main__":
    intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]
    print("Merged Intervals:", merge(intervals))
    # Output: [[1, 6], [8, 10], [15, 18]]
```

### Java Implementation

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution {
    public static int[][] merge(int[][] intervals) {
        if (intervals.length <= 1) {
            return intervals;
        }

        // Step 1: Sort intervals by start time
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));

        List<int[]> merged = new ArrayList<>();
        int[] prev = intervals[0];
        merged.add(prev);

        // Step 2: Iterate and merge overlapping intervals
        for (int i = 1; i < intervals.length; i++) {
            int[] current = intervals[i];

            // Overlap check
            if (current[0] <= prev[1]) {
                // Extend boundary of previous interval
                prev[1] = Math.max(prev[1], current[1]);
            } else {
                // No overlap, add as a new distinct interval
                prev = current;
                merged.add(prev);
            }
        }

        return merged.toArray(new int[merged.size()][]);
    }

    public static void main(String[] args) {
        int[][] intervals = {{1, 3}, {2, 6}, {8, 10}, {15, 18}};
        int[][] result = merge(intervals);

        System.out.print("Merged Intervals: ");
        for (int[] interval : result) {
            System.out.print(Arrays.toString(interval) + " ");
        }
        // Output: [1, 6] [8, 10] [15, 18]
    }
}
```