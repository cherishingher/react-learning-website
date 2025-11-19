import { useState } from "react";
import "./Playground.css";

const DEFAULT_CPP = `#include <iostream>
#include <string>
using namespace std;

int main() {
    string name;
    cout << "请输入您的姓名: ";
    cin >> name;
    cout << "Hello, " << name << "!" << endl;
    cout << "欢迎使用 C++ 在线编译器！" << endl;
    return 0;
}`;

export default function Playground() {
  const [code, setCode] = useState(DEFAULT_CPP);
  const [stdin, setStdin] = useState("World");
  const [out, setOut] = useState("");
  const [running, setRunning] = useState(false);

  const run = async () => {
    setRunning(true);
    setOut("");
    try {
      const r = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language: "cpp", source: code, stdin }),
      });
      const data = await r.json();
      
      // 格式化输出结果
      let result = "";
      
      if (data.status) {
        result += `# 执行状态: ${data.status}\n\n`;
      }
      
      if (data.compile_output?.trim()) {
        result += `# 编译错误\n${data.compile_output}\n\n`;
      }
      
      if (data.stderr?.trim()) {
        result += `# 运行时错误\n${data.stderr}\n\n`;
      }
      
      if (data.stdout?.trim()) {
        result += `# 程序输出\n${data.stdout}\n\n`;
      }
      
      if (data.time && data.time !== "0") {
        result += `# 执行时间: ${data.time}秒\n`;
      }
      
      setOut(result || "（无输出）");
    } catch (e) {
      setOut("Run failed: " + e.message);
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="pg-wrap">
      <h1>C++ 在线编译器</h1>
      <div className="pg-grid">
        <div className="pg-panel">
          <div className="pg-label">源代码</div>
          <textarea className="pg-code" value={code} onChange={e=>setCode(e.target.value)} />
        </div>
        <div className="pg-panel">
          <div className="pg-label">标准输入</div>
          <textarea className="pg-stdin" value={stdin} onChange={e=>setStdin(e.target.value)} />
          <button className="pg-run" disabled={running} onClick={run}>
            {running ? "运行中…" : "运行"}
          </button>
          <div className="pg-label">输出</div>
          <pre className="pg-out">{out}</pre>
        </div>
      </div>
    </div>
  );
}
