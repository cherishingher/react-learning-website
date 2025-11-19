#include <algorithm>
#include <iostream>
#include <numeric>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, idxTallest, h, r;
    if (!(cin >> n >> idxTallest >> h >> r)) {
        return 0;
    }

    vector<int> lefts;
    vector<int> rights;
    lefts.reserve(r);
    rights.reserve(r);
    for (int k = 0; k < r; k++) {
        int a, b;
        cin >> a >> b;
        if (a == b) {
            continue;
        }
        if (a > b) {
            swap(a, b);
        }
        lefts.push_back(a);
        rights.push_back(b);
    }

    int m = static_cast<int>(lefts.size());
    vector<int> order(m);
    iota(order.begin(), order.end(), 0);
    sort(order.begin(), order.end(), [&](int x, int y) {
        if (lefts[x] != lefts[y]) {
            return lefts[x] < lefts[y];
        }
        return rights[x] < rights[y];
    });

    vector<pair<int, int>> segments;
    int lastLeft = -1;
    int lastRight = -1;
    for (int idx : order) {
        int L = lefts[idx];
        int R = rights[idx];
        if (L == lastLeft && R == lastRight) {
            continue;
        }
        lastLeft = L;
        lastRight = R;
        segments.push_back({L, R});
    }

    vector<int> tall(n + 1, h);
    for (const auto& seg : segments) {
        for (int pos = seg.first + 1; pos < seg.second; pos++) {
            tall[pos] -= 1;
        }
    }

    for (int i = 1; i <= n; i++) {
        cout << tall[i] << "\n";
    }

    return 0;
}
