---
title: "Factorials of Large"
description: "Compute large factorials by multiplying and storing individual digits."
category: "DSA"
slug: "factorials-of-large"
date: "2026-09-30"
---

# Factorials of Large

Given an integer n, find its factorial. Return a list of integers denoting the digits that make up the factorial of n.

Input: n = 5

Output: [1, 2, 0]

Factorials of Large Numbers requires computing the exact value of N! for large integers (e.g., N = 100, 500, 1000). Since standard integer data types (like 32-bit or 64-bit integers) overflow quickly, the result must be represented and multiplied digit-by-digit using an array or vector.

## Key Intuition & Strategy

- **Digit-by-Digit Multiplication:** Treat an array/list as a big-integer where each element holds a single digit.
- **Schoolbook Multiplication:** Multiply each digit in the array by the number X (from 2 to N), maintaining a carry.
- **Propagate the Carry:** For each digit at position i:
  - Compute prod = (digits[i] * X) + carry.
  - Update digits[i] = prod % 10.
  - Update carry = prod // 10.
- **Append Remaining Carry:** When done iterating over all existing digits, append any remaining digits of carry to the end of the array.
- **Reversal:** Storing digits in reverse order (least significant digit at index 0) makes appending carry digits much easier O(1). Reverse the array at the end to get the final result.

## Algorithm Logic

1. Initialize: Create a list res = [1] representing 1! = 1.
2. Outer Loop: For each integer x from 2 to N:
   - Initialize carry = 0.
   - Inner Loop: For each index i from 0 to len(res) - 1:
     - prod = res[i] * x + carry
     - res[i] = prod % 10
     - carry = prod // 10
   - Carry Propagation: While carry > 0:
     - Append carry % 10 to res.
     - carry //= 10
3. Final Result: Reverse res to restore the most-significant-to-least-significant digit order and return it.

### Python Implementation

(Note: Python automatically handles arbitrarily large integers natively, but interviewers expect the explicit digit-array multiplication logic shown below).

```python
def factorial(n: int) -> list[int]:
    res = [1]  # Represents 1!

    for x in range(2, n + 1):
        carry = 0
        for i in range(len(res)):
            prod = res[i] * x + carry
            res[i] = prod % 10
            carry = prod // 10

        while carry > 0:
            res.append(carry % 10)
            carry //= 10

    # Reverse to get digits from most significant to least significant
    res.reverse()
    return res


# Example Walkthrough
if __name__ == "__main__":
    n = 5
    print("Factorial of 5:", factorial(5))  # Output: [1, 2, 0]
```

### Java Implementation

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Solution {
    public static List factorial(int n) {
        List res = new ArrayList<>();
        res.add(1); // Represents 1!

        for (int x = 2; x <= n; x++) {
            int carry = 0;
            for (int i = 0; i < res.size(); i++) {
                int prod = res.get(i) * x + carry;
                res.set(i, prod % 10);
                carry = prod / 10;
            }

            while (carry > 0) {
                res.add(carry % 10);
                carry /= 10;
            }
        }

        // Reverse to get digits from most significant to least significant
        Collections.reverse(res);
        return res;
    }

    public static void main(String[] args) {
        int n = 5;
        System.out.println("Factorial of 5: " + factorial(n)); // Output: [1, 2, 0]
    }
}
```

## Complexity Analysis

Time Complexity: O(N x d), where d is the number of digits in N!.

According to Stirling's approximation, d ~ O(NlogN).

Therefore, the outer loop runs N times and the inner loop runs up to d times, giving an overall time complexity of O(N^2 logN).

Space Complexity: O(d) = O(N logN) auxiliary space required to store the d digits of N! in the output array.