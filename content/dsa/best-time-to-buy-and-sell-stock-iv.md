---
title: "Best Time to Buy and Sell Stock IV"
description: "Maximize stock-trading profit with at most k transactions."
category: "DSA"
slug: "best-time-to-buy-and-sell-stock-iv"
date: "2026-09-30"
---

# Best Time to Buy and Sell Stock IV

You are given an integer array prices where prices[i] is the price of a given stock on the ith day, and an integer k.

Find the maximum profit you can achieve. You may complete at most k transactions: i.e. you may buy at most k times and sell at most k times.

Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

Best Time to Buy and Sell Stock IV generalizes Stock III by extending the maximum number of allowed transactions from 2 to k.

## Key Intuition & Strategy

- **Core Goal:** You can buy and sell a stock at most k times, but you must sell a stock before buying it again.
- **Tracking Financial States:** On any given day, for each transaction j (from 1 up to k), you can be in one of two financial states:
  - **Holding State (buy[j]):** You just bought the stock for the j-th time. Your net cash equals the profit from the (j-1)-th sale minus today's stock price.
  - **Cash State (sell[j]):** You just sold the stock for the j-th time. Your net cash equals your state in buy[j] plus today's stock price.
- **Dynamic Transitions:** As you go through each day's price, you continuously update your best possible balance for all k transactions.
- **Unlimited Transactions Optimization (k >= n / 2):** Since buying and selling takes at least 2 days, having k >= n / 2 means you have enough transactions to capture every single price increase. In this case, you don't need complex tracking—simply add up every positive price jump (prices[i] - prices[i - 1]).

## Algorithm Logic

1. **Edge Case / Optimization:**
   - If prices is empty or k = 0, return 0.
   - If k >= n / 2, perform a simple greedy pass: sum all positive differences prices[i] - prices[i - 1] for i from 1 to n - 1.
2. **Initialize DP Arrays:**
   - buy array of size k initialized to -(infinity) (representing the cost/profit balance after buying).
   - sell array of size k initialized to 0 (representing profit after selling).
3. **Iterate Prices:** For each price p in prices:
   - For each transaction index j from 0 to k - 1:
     - prev_sell = sell[j - 1] if j > 0 else 0.
     - buy[j] = max(buy[j], prev_sell - p) → Choose between keeping your previous hold balance or buying today using profits from the (j-1)-th sale.
     - sell[j] = max(sell[j], buy[j] + p) → Choose between keeping your previous sell balance or selling today at price p.
4. Return sell[k - 1].

### Python Implementation

```python
def max_profit(k: int, prices: list[int]) -> int:
    if not prices or k == 0:
        return 0

    n = len(prices)

    # Optimization: Unlimited transactions if k >= n // 2
    if k >= n // 2:
        return sum(max(prices[i] - prices[i - 1], 0) for i in range(1, n))

    # General state arrays for k transactions
    buy = [float("-inf")] * k
    sell = [0] * k

    for p in prices:
        for j in range(k):
            prev_sell = sell[j - 1] if j > 0 else 0
            buy[j] = max(buy[j], prev_sell - p)
            sell[j] = max(sell[j], buy[j] + p)

    return sell[-1]


# Example Walkthrough
if __name__ == "__main__":
    k = 2
    prices = [3, 2, 6, 5, 0, 3]
    print("Maximum Profit:", max_profit(k, prices))  # Output: 7
```

### Java Implementation

```java
import java.util.Arrays;

public class Solution {
    public static int maxProfit(int k, int[] prices) {
        if (prices == null || prices.length == 0 || k == 0) {
            return 0;
        }

        int n = prices.length;

        // Optimization: Unlimited transactions if k >= n / 2
        if (k >= n / 2) {
            int maxProfit = 0;
            for (int i = 1; i < n; i++) {
                if (prices[i] > prices[i - 1]) {
                    maxProfit += prices[i] - prices[i - 1];
                }
            }
            return maxProfit;
        }

        // General state arrays for k transactions
        int[] buy = new int[k];
        Arrays.fill(buy, Integer.MIN_VALUE);
        int[] sell = new int[k];

        for (int p : prices) {
            for (int j = 0; j < k; j++) {
                int prevSell = (j > 0) ? sell[j - 1] : 0;
                buy[j] = Math.max(buy[j], prevSell - p);
                sell[j] = Math.max(sell[j], buy[j] + p);
            }
        }

        return sell[k - 1];
    }

    public static void main(String[] args) {
        int k = 2;
        int[] prices = {3, 2, 6, 5, 0, 3};
        System.out.println("Maximum Profit: " + maxProfit(k, prices)); // Output: 7
    }
}
```

## Complexity Analysis

Time Complexity: O(n x k) — For each of the n days, we iterate through k transactions. When k >= n / 2, it runs in O(n) time.

Space Complexity: O(k) — Space needed for buy and sell state arrays of size k.