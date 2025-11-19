#include <iostream>
#include <set>
#include <algorithm>
using namespace std;

int main() {
    int N, I, H, R;
    cin >> N >> I >> H >> R;
    
    int diff[10005] = {0}; // 差分数组
    set<pair<int, int>> seen; // 去重：避免重复处理同一区间
    
    for (int i = 0; i < R; i++) {
        int A, B;
        cin >> A >> B;
        
        // 确保 A < B
        if (A > B) swap(A, B);
        
        // 如果这个视线关系已经处理过，跳过
        if (seen.count({A, B})) continue;
        seen.insert({A, B});
        
        // 区间 [A+1, B-1] 的奶牛身高都要减1
        if (A + 1 <= B - 1) {
            diff[A + 1]--;  // 区间左端点-1
            diff[B]++;      // 区间右端点+1（差分恢复）
        }
    }
    
    // 通过差分数组还原每头奶牛的实际身高
    int delta = 0;
    for (int i = 1; i <= N; i++) {
        delta += diff[i];
        cout << H + delta << endl;
    }
    
    return 0;
}



