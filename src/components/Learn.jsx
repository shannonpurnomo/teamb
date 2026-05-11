import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";

export default function Learn({ setPage }) {
  const [selectedMetric, setSelectedMetric] = useState("accuracy");

  const accuracyData = [
    { month: "Jan", accuracy: 71 },
    { month: "Feb", accuracy: 74 },
    { month: "Mar", accuracy: 79 },
    { month: "Apr", accuracy: 83 },
    { month: "May", accuracy: 87 },
    { month: "Jun", accuracy: 89 },
  ];

  const approvalData = [
    { month: "Jan", rate: 58 },
    { month: "Feb", rate: 62 },
    { month: "Mar", rate: 68 },
    { month: "Apr", rate: 72 },
    { month: "May", rate: 74 },
    { month: "Jun", rate: 76 },
  ];

  const modificationData = [
    { month: "Jan", rate: 18 },
    { month: "Feb", rate: 16 },
    { month: "Mar", rate: 14 },
    { month: "Apr", rate: 13 },
    { month: "May", rate: 12 },
    { month: "Jun", rate: 10 },
  ];

  const calibrationData = [
    { name: "Used", value: 15, color: "#22c55e" },
    { name: "Unused", value: 85, color: "#ef4444" },
  ];

  const segmentAccuracy = [
    { name: "Family", accuracy: 91, trend: "+3%" },
    { name: "Couple", accuracy: 84, trend: "+2%" },
    { name: "Student", accuracy: 78, trend: "+5%" },
    { name: "Solo", accuracy: 82, trend: "+1%" },
    { name: "Pass Holder", accuracy: 94, trend: "+2%" },
  ];

  const recentLearnings = [
    { id: 1, title: "Weather weight adjusted", description: "Heavy rain forecast was too high → accuracy improved 2%", date: "2024-06-10", status: "applied" },
    { id: 2, title: "Family bundle preference", description: "Manager reduced voucher from HK$50 to HK$40 → logged as preference", date: "2024-06-09", status: "applied" },
    { id: 3, title: "Guardrail calibration", description: "±15% limit triggered only 3 times → suggested loosening to ±20%", date: "2024-06-01", status: "pending_review" },
    { id: 4, title: "Post-execution learning", description: "20% bundle + HK$40 voucher recorded as effective for light rain", date: "2024-05-28", status: "applied" },
  ];

  const getChartData = () => {
    if (selectedMetric === "accuracy") return { data: accuracyData, key: "accuracy", color: "#22c55e", title: "Forecast Accuracy Trend" };
    if (selectedMetric === "approval") return { data: approvalData, key: "rate", color: "#3b82f6", title: "Approval Rate Trend" };
    return { data: modificationData, key: "rate", color: "#f59e0b", title: "Manual Modification Rate Trend" };
  };

  const chartInfo = getChartData();

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-4">📚 AI Learning Layer — Performance Dashboard</h2>
        <p className="text-gray-600 mb-6">
          The system continuously learns from prediction errors, manager feedback, deployment outcomes, and rule calibration.
        </p>

        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-slate-50 rounded-2xl p-4">
            <div className="text-sm text-gray-500">Forecast Accuracy</div>
            <div className="text-3xl font-bold text-blue-600">87%</div>
            <div className="text-xs text-green-600 mt-1">↑ +5% vs last month</div>
            <div className="text-xs text-gray-400 mt-1">MAPE: 13%</div>
          </div>
          <div className="bg-slate-50 rounded-2xl p-4">
            <div className="text-sm text-gray-500">Approval Rate</div>
            <div className="text-3xl font-bold text-green-600">74%</div>
            <div className="text-xs text-green-600 mt-1">↑ +8% vs last month</div>
            <div className="text-xs text-gray-400 mt-1">Human trust increasing</div>
          </div>
          <div className="bg-slate-50 rounded-2xl p-4">
            <div className="text-sm text-gray-500">Modification Rate</div>
            <div className="text-3xl font-bold text-yellow-600">12%</div>
            <div className="text-xs text-green-600 mt-1">↓ -3% vs last month</div>
            <div className="text-xs text-gray-400 mt-1">AI learning manager preferences</div>
          </div>
          <div className="bg-slate-50 rounded-2xl p-4">
            <div className="text-sm text-gray-500">Rollback Time</div>
            <div className="text-3xl font-bold text-red-500">5 min</div>
            <div className="text-xs text-gray-500 mt-1">Target: &lt;10 min ✓</div>
          </div>
        </div>
      </div>

      {/* Chart Selection */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="flex-between" style={{ marginBottom: "20px" }}>
          <h3 className="text-xl font-bold">📈 Learning Metrics Trend</h3>
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => setSelectedMetric("accuracy")}
              className={`primary-btn btn-sm ${selectedMetric === "accuracy" ? "" : "btn-outline"}`}
              style={{ background: selectedMetric === "accuracy" ? "#22c55e" : "transparent", color: selectedMetric === "accuracy" ? "white" : "#64748b" }}
            >
              Accuracy
            </button>
            <button
              onClick={() => setSelectedMetric("approval")}
              className={`primary-btn btn-sm ${selectedMetric === "approval" ? "" : "btn-outline"}`}
              style={{ background: selectedMetric === "approval" ? "#3b82f6" : "transparent", color: selectedMetric === "approval" ? "white" : "#64748b" }}
            >
              Approval Rate
            </button>
            <button
              onClick={() => setSelectedMetric("modification")}
              className={`primary-btn btn-sm ${selectedMetric === "modification" ? "" : "btn-outline"}`}
              style={{ background: selectedMetric === "modification" ? "#f59e0b" : "transparent", color: selectedMetric === "modification" ? "white" : "#64748b" }}
            >
              Modification Rate
            </button>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartInfo.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={chartInfo.key} name={chartInfo.title} stroke={chartInfo.color} strokeWidth={3} dot={{ r: 5, fill: chartInfo.color }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Guardrail Utilization */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h3 className="text-xl font-bold mb-4">🛡️ Guardrail Utilization</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={calibrationData} dataKey="value" outerRadius={90} label>
                  {calibrationData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ marginTop: "12px", fontSize: "0.85rem", color: "#64748b", textAlign: "center" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <div style={{ width: "12px", height: "12px", backgroundColor: "#22c55e", borderRadius: "2px" }}></div>
                Used Rules (15%) - Rules that were triggered
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <div style={{ width: "12px", height: "12px", backgroundColor: "#ef4444", borderRadius: "2px" }}></div>
                Unused Rules (85%) - Rules never triggered
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h3 className="text-xl font-bold mb-4">📊 Segment Forecast Accuracy</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={segmentAccuracy}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="accuracy" fill="#38bdf8" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Rule Calibration Suggestions - dengan tombol Go To */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <h3 className="text-xl font-bold mb-5">⚙️ Rule Calibration Suggestions</h3>
        <div className="space-y-4">
          <div className="bg-slate-50 rounded-2xl p-4">
            <div className="flex-between">
              <div>
                <div className="font-bold">Loosen Magnitude Cap</div>
                <div className="text-sm text-gray-600">±15% cap triggered only 3 times in 6 months</div>
                <div className="text-xs text-gray-400 mt-1">Suggestion: ±20%</div>
              </div>
              <button className="primary-btn btn-sm" onClick={() => setPage("govern")}>Go to Govern →</button>
            </div>
          </div>
          <div className="bg-slate-50 rounded-2xl p-4">
            <div className="flex-between">
              <div>
                <div className="font-bold">Improve Viral Event Prediction</div>
                <div className="text-sm text-gray-600">Social buzz prediction accuracy only 68%</div>
                <div className="text-xs text-gray-400 mt-1">Need more training data</div>
              </div>
              <button className="primary-btn btn-sm" onClick={() => setPage("sense")}>Go to Sense →</button>
            </div>
          </div>
          <div className="bg-slate-50 rounded-2xl p-4">
            <div className="flex-between">
              <div>
                <div className="font-bold">Optimize Family Bundle Strategy</div>
                <div className="text-sm text-gray-600">Family bundles outperform couple bundles by 14%</div>
                <div className="text-xs text-gray-400 mt-1">Reallocate discount budget</div>
              </div>
              <button className="primary-btn btn-sm" onClick={() => setPage("optimize")}>Go to Optimize →</button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Learnings Log */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <h3 className="text-xl font-bold mb-4">📋 Recent Learnings & Audit Trail</h3>
        <div className="space-y-3">
          {recentLearnings.map((item) => (
            <div key={item.id} className="border-b border-gray-100 pb-3 last:border-0">
              <div className="flex-between">
                <div>
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-sm text-gray-600">{item.description}</div>
                  <div className="text-xs text-gray-400 mt-1">{item.date}</div>
                </div>
                <div>
                  <span
                    className={`badge ${item.status === "applied" ? "green" : "orange"}`}
                    style={{ fontSize: "0.7rem" }}
                  >
                    {item.status === "applied" ? "✓ Applied" : "⏳ Pending Review"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}