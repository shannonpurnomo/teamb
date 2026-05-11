import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function Simulate({ selectedBundle }) {
  // Jika tidak ada bundle yang dipilih, gunakan default
  const bundle = selectedBundle || {
    name: "Rainy-Day Family Bundle",
    agentScores: { rev: 88, ops: 84, trust: 91 },
    impact: "+12% revenue uplift",
    weights: { rev: 30, ops: 50, trust: 20 },
  };

  const revenueScore = bundle.agentScores?.rev || 88;
  const opsScore = bundle.agentScores?.ops || 84;
  const trustScore = bundle.agentScores?.trust || 91;

  // Bobot berdasarkan bundle yang dipilih
  const weights = bundle.weights || { rev: 30, ops: 50, trust: 20 };
  
  // Alasan bobot berdasarkan bundle
  const getWeightReason = () => {
    if (bundle.name?.includes("Family")) return "Rainy day scenario — priority on flow control to avoid indoor overcrowding";
    if (bundle.name?.includes("Peak")) return "Peak holiday scenario — operations weight increased for crowd control";
    if (bundle.name?.includes("Night")) return "Off-peak scenario — revenue weight increased to fill capacity";
    return "Default weighting based on scenario detection";
  };

  const weightReason = getWeightReason();

  const totalScore = (revenueScore * weights.rev) / 100 + (opsScore * weights.ops) / 100 + (trustScore * weights.trust) / 100;

  let verdict = "";
  let verdictColor = "";
  if (revenueScore < 60 || opsScore < 60 || trustScore < 60) {
    verdict = "Forced Rejection";
    verdictColor = "#dc2626";
  } else if (totalScore >= 85) {
    verdict = "Recommended";
    verdictColor = "#22c55e";
  } else if (totalScore >= 70) {
    verdict = "Conditional Approval";
    verdictColor = "#f59e0b";
  } else {
    verdict = "Intercept & Optimize";
    verdictColor = "#ea580c";
  }

  const beforeAfter = [
    { name: "Revenue", before: 82, after: Math.round(revenueScore) },
    { name: "Occupancy", before: 91, after: 74 },
    { name: "Queue Time", before: 88, after: 55 },
    { name: "Guest Satisfaction", before: 69, after: 90 },
  ];

  const radarData = [
    { subject: "Revenue Agent", score: revenueScore, fullMark: 100 },
    { subject: "Operations Agent", score: opsScore, fullMark: 100 },
    { subject: "Trust Agent", score: trustScore, fullMark: 100 },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-2">📐 Simulate — Multi-Agent Sandbox</h2>
        <p className="text-gray-600 mb-6">
          Simulating <strong>{bundle.name}</strong> — AI runs thousands of digital visitor simulations before deployment.
        </p>

        {/* Current Bundle Info */}
        <div style={{ background: "#eef6fc", borderRadius: "16px", padding: "16px", marginBottom: "24px", borderLeft: "4px solid #1f6e7e" }}>
          <div className="flex-between">
            <div>
              <div style={{ fontSize: "0.8rem", color: "#64748b" }}>SIMULATING BUNDLE</div>
              <div style={{ fontSize: "1.3rem", fontWeight: "bold", color: "#1f6e7e" }}>{bundle.name}</div>
              <div style={{ fontSize: "0.85rem", color: "#475569" }}>{bundle.impact}</div>
            </div>
            <div className="badge blue">AI Generated Strategy</div>
          </div>
        </div>

        {/* Agent Scores */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-50 rounded-2xl p-5">
            <div className="text-sm text-gray-500 mb-2">Revenue Agent (Srev)</div>
            <div className="text-4xl font-bold text-blue-600 mb-2">{revenueScore}</div>
            <ul className="text-sm text-gray-600">
              <li>• Revenue Growth: +5.2%</li>
              <li>• Conversion Stable</li>
              <li>• Refund Risk Reduced</li>
            </ul>
          </div>
          <div className="bg-slate-50 rounded-2xl p-5">
            <div className="text-sm text-gray-500 mb-2">Operations Agent (Sops)</div>
            <div className="text-4xl font-bold text-cyan-600 mb-2">{opsScore}</div>
            <ul className="text-sm text-gray-600">
              <li>• Queue Time ↓ 18%</li>
              <li>• Comfortable Capacity</li>
              <li>• Crowd Flow Improved</li>
            </ul>
          </div>
          <div className="bg-slate-50 rounded-2xl p-5">
            <div className="text-sm text-gray-500 mb-2">Trust Agent (Strust)</div>
            <div className="text-4xl font-bold text-green-600 mb-2">{trustScore}</div>
            <ul className="text-sm text-gray-600">
              <li>• Fairness Index High</li>
              <li>• No PR Risk</li>
              <li>• Churn Probability Low</li>
            </ul>
          </div>
        </div>

        {/* Weights Display with Reason */}
        <div style={{ background: "#f1f5f9", borderRadius: "20px", padding: "20px", marginBottom: "24px" }}>
          <div className="flex-between">
            <h3 className="font-bold">⚖️ Current Agent Weights</h3>
            <div className="text-sm text-gray-500">{weightReason}</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginTop: "16px" }}>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{weights.rev}%</div>
              <div className="text-sm text-gray-600">Revenue Agent</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-600">{weights.ops}%</div>
              <div className="text-sm text-gray-600">Operations Agent</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{weights.trust}%</div>
              <div className="text-sm text-gray-600">Trust Agent</div>
            </div>
          </div>
        </div>

        {/* Final Score & Verdict */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 mb-8">
          <div className="text-sm opacity-70 mb-2">Final Weighted Score</div>
          <div className="text-6xl font-black mb-4">{Math.round(totalScore)}</div>
          <div className={`text-2xl font-bold`} style={{ color: verdictColor }}>{verdict}</div>
          <div className="mt-4 text-sm text-slate-300">
            Formula: (Srev × Wrev) + (Sops × Wops) + (Strust × Wtrust) = ({revenueScore} × {weights.rev}%) + ({opsScore} × {weights.ops}%) + ({trustScore} × {weights.trust}%)
          </div>
        </div>

        {/* Radar Chart */}
        <h3 className="text-xl font-bold mb-4">🤖 Agent Performance Radar</h3>
        <div style={{ height: "400px", width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tickCount={5} />
              <Radar name="Agent Scores" dataKey="score" fill="#3b82f6" fillOpacity={0.5} stroke="#2563eb" strokeWidth={2} />
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Before vs After Chart */}
        <h3 className="text-xl font-bold mb-4 mt-8">📊 Before vs After Impact Analysis</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={beforeAfter}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="before" name="Before Strategy" fill="#ef4444" radius={[10, 10, 0, 0]} />
              <Bar dataKey="after" name="After Strategy" fill="#22c55e" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}