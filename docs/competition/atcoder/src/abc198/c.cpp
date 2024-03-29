// Problem: C - Compass Walking
// Contest: AtCoder - AtCoder Beginner Contest 198
// URL: https://atcoder.jp/contests/abc198/tasks/abc198_c
// Memory Limit: 1024 MB
// Time Limit: 2000 ms

#include <algorithm>
#include <cmath>
#include <cstdio>
#include <cstring>
#include <iostream>
#include <map>
#include <queue>
#include <set>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <vector>
using namespace std;
#define it insert
#define pob pop_back
#define pub push_back
#define emb emplace_back
#define all(v) (v).begin(), (v).end()
#define mkp(a, b) make_pair(a, b)
using LL = long long;
using VI = vector<int>;
using VVI = vector<vector<int>>;
using PII = pair<int, int>;
using PIL = pair<int, LL>;
using PLL = pair<LL, LL>;
const double EPS = 1e-6;
const int MOD = 1e9 + 7;
const int INF = 0x3f3f3f3f;
const int N = 1e5 + 7;

LL r, x, y;

int main() {
    cin >> r >> x >> y;
    LL d = sqrt(x * x + y * y);
    int ans;
    if (d == r)
        ans = 1;
    else if (d <= r + r)
        ans = 2;
    else
        ans = (d + r - 1) / r;
    cout << ans;
    return 0;
}