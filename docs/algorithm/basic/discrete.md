# 离散化

排序算法的一个应用是离散化，离散化即把无穷大集合中的若干个元素映射为有限集合以便于统计的方法，实现离散化一般有两种方式；

- 数组，排序去重

```cpp
vector<int> all; // 存储所有待离散化的值
sort(all.begin(), all.end()); // 排序
alls.erase(unique(all.begin(), all.end()), all.end());   // 去重

// 二分求出x对应的离散化的值, 即离散数组的下标
int find(int x) // 找到第一个大于等于x的位置
{
    int l = 0, r = all.size() - 1;
    while (l < r) {
        int mid = l + r >> 1;
        if (all[mid] >= x) r = mid;
        else l = mid + 1;
    }
    return r + 1; // 映射到 1, 2, ...n
}
```

- Map

```cpp
unordered_map<int, int> mp;
int idx = 0;
for (auto &x : nums) {
  if (!mp.count(x)) mp[x] = ++idx; // 映射到 1, 2, ...n
}

// 求离散化后的值
mp[x];
```

例如：

```text
假定有一个无限长的数轴，数轴上每个坐标上的数都是0。
现在，我们首先进行 n 次操作，每次操作将某一位置 x 上的数加 c。
接下来，进行 m 次询问，每个询问包含两个整数l和r，你需要求出在区间[l, r]之间的所有数的和。
```

由于数据很大，无法使用数组来直接存储，因此需要离散化处理。

离散化即 将例如 `[1, 5, 100, 3000, 60000, ...]`等**有序且稀疏**的数列离散到数组中，用下标`[1, 2, 3, 4, 5]`来映射这些数字。要获取这些数字的下标，可以使用二分查找。

```cpp
vector<int> all; // 存储所有待离散化的值
sort(all.begin(), all.end()); // 排序
alls.erase(unique(all.begin(), all.end()), all.end());   // 去重

// 二分求出x对应的离散化的值, 即离散数组的下标
int find(int x) // 找到第一个大于等于x的位置
{
    int l = 0, r = all.size() - 1;
    while (l < r)
    {
        int mid = l + r >> 1;
        if (all[mid] >= x) r = mid;
        else l = mid + 1;
    }
    return r + 1; // 映射到1, 2, ...n
}
```

例题代码：

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

const int N = 3e5 + 7;
using PII = pair<int, int>;

int n, m, a[N], s[N];
vector<int> all;
vector<PII> add, query;

int find(int x) {
    int l = 0, r = all.size() - 1;
    while (l < r) {
        int mid = l + r >> 1;
        if (all[mid] >= x) r = mid;
        else l = mid + 1;
    }
    return r + 1;
}
int main() {
    scanf("%d%d", &n, &m);
    for (int i = 0; i < n; i++) {
        int x, c;
        scanf("%d%d", &x, &c);
        all.push_back(x);
        add.push_back({x, c});
    }
    for (int i = 0; i < m; i++) {
        int l, r;
        scanf("%d%d", &l, &r);
        all.push_back(l);
        all.push_back(r);
        query.push_back({l, r});
    }
    sort(all.begin(), all.end());
    all.erase(unique(all.begin(), all.end()), all.end());

    for (auto &p : add) {
        int i = find(p.first);
        a[i] += p.second;
    }

    for (int i = 1; i <= all.size(); i++) s[i] = s[i - 1] + a[i];

    for (auto &p : query) {
        int l = find(p.first), r = find(p.second);
        printf("%d\n", s[r] - s[l - 1]);
    }
    return 0;
}
```

## 相关题目

- [AcWing 103. 电影](https://www.acwing.com/problem/content/description/105/)
